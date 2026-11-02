/** Audio 100% sintetizado con WebAudio: sin ficheros externos. */
const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12);

export type MusicKind = 'menu' | 'matamoros' | 'manchester' | 'victoria' | null;

class AudioSys {
  ctx: AudioContext | null = null;
  master!: GainNode; sfxG!: GainNode; musG!: GainNode; crowdG!: GainNode;
  vol = { master: 0.8, music: 0.5, sfx: 0.9, voice: true };
  private noiseBuf!: AudioBuffer;
  private crowdLevel = 0.25;
  private crowdTarget = 0.25;
  private musicTimer: number | null = null;
  private musicKind: MusicKind = null;
  private nextBar = 0;
  private bar = 0;
  private crowdFilter!: BiquadFilterNode;

  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') void this.ctx.resume(); return; }
    const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    if (!AC) return;
    const ctx = (this.ctx = new AC());
    this.master = ctx.createGain(); this.master.gain.value = this.vol.master; this.master.connect(ctx.destination);
    this.sfxG = ctx.createGain(); this.sfxG.gain.value = this.vol.sfx; this.sfxG.connect(this.master);
    this.musG = ctx.createGain(); this.musG.gain.value = this.vol.music * 0.5; this.musG.connect(this.master);
    this.crowdG = ctx.createGain(); this.crowdG.gain.value = 0; this.crowdG.connect(this.master);
    // buffer de ruido (marrón-rosado)
    const len = ctx.sampleRate * 3;
    this.noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.04 * w) / 1.04; d[i] = (w * 0.4 + last * 6); }
    // público de fondo
    const src = ctx.createBufferSource(); src.buffer = this.noiseBuf; src.loop = true;
    const bp = (this.crowdFilter = ctx.createBiquadFilter()); bp.type = 'bandpass'; bp.frequency.value = 520; bp.Q.value = 0.4;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.17;
    const lg = ctx.createGain(); lg.gain.value = 140; lfo.connect(lg); lg.connect(bp.frequency); lfo.start();
    src.connect(bp); bp.connect(this.crowdG); src.start();
  }

  setVolumes(master: number, music: number, sfx: number) {
    this.vol.master = master; this.vol.music = music; this.vol.sfx = sfx;
    if (!this.ctx) return;
    this.master.gain.value = master; this.musG.gain.value = music * 0.5; this.sfxG.gain.value = sfx;
  }

  private t() { return this.ctx!.currentTime; }

  private noise(dur: number, freq: number, q: number, type: BiquadFilterType, gain: number, when = 0, dest: AudioNode = this.sfxG) {
    const c = this.ctx!;
    const s = c.createBufferSource(); s.buffer = this.noiseBuf;
    s.playbackRate.value = 0.8 + Math.random() * 0.4;
    const f = c.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = c.createGain(); const t0 = this.t() + when;
    g.gain.setValueAtTime(gain, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    s.connect(f); f.connect(g); g.connect(dest);
    s.start(t0, Math.random() * 2, dur + 0.05);
  }
  private tone(freq: number, dur: number, type: OscillatorType, gain: number, when = 0, slideTo?: number, dest: AudioNode = this.sfxG) {
    const c = this.ctx!;
    const o = c.createOscillator(); o.type = type;
    const g = c.createGain(); const t0 = this.t() + when;
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(gain, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(dest);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }

  sfx(name: string, power = 1) {
    if (!this.ctx) return;
    switch (name) {
      case 'hit': this.noise(0.12, 900, 0.8, 'bandpass', 0.55 * power); this.tone(150, 0.12, 'sine', 0.7 * power, 0, 50); break;
      case 'heavy': this.noise(0.22, 500, 0.6, 'bandpass', 0.9); this.tone(110, 0.3, 'sine', 1.0, 0, 35); this.tone(60, 0.35, 'triangle', 0.6, 0, 30); break;
      case 'block': this.noise(0.08, 2500, 1, 'bandpass', 0.35); this.tone(260, 0.08, 'square', 0.12, 0, 140); break;
      case 'parry': this.tone(1400, 0.35, 'sine', 0.25, 0, 900); this.tone(2100, 0.3, 'sine', 0.15, 0.02, 1200); this.noise(0.1, 4000, 1, 'highpass', 0.3); break;
      case 'whoosh': this.noise(0.18, 1400, 0.5, 'bandpass', 0.2 * power); break;
      case 'slam': this.noise(0.4, 280, 0.5, 'lowpass', 1.0); this.tone(70, 0.5, 'sine', 1.0, 0, 28); this.noise(0.3, 3000, 0.7, 'highpass', 0.3, 0.02); break;
      case 'knock': this.noise(0.25, 350, 0.6, 'lowpass', 0.6); this.tone(90, 0.25, 'sine', 0.6, 0, 40); break;
      case 'bell': for (let i = 0; i < 3; i++) { this.tone(1000 + i * 420, 1.6, 'sine', 0.22 / (i + 1), i * 0.28); this.tone(1000 + i * 420, 1.6, 'sine', 0.22 / (i + 1), 0.45 + i * 0.28); } break;
      case 'finisher': this.tone(60, 1.6, 'sawtooth', 0.35, 0, 520); this.noise(1.2, 800, 0.4, 'bandpass', 0.35, 0.1); break;
      case 'finisherHit': this.tone(55, 1.2, 'sine', 1.2, 0, 22); this.noise(0.7, 200, 0.4, 'lowpass', 1.2); this.noise(0.5, 5000, 0.5, 'highpass', 0.5); this.tone(880, 1.5, 'triangle', 0.25, 0.05, 440); break;
      case 'ready': this.tone(520, 0.12, 'triangle', 0.3); this.tone(780, 0.12, 'triangle', 0.3, 0.1); this.tone(1040, 0.4, 'triangle', 0.3, 0.2); break;
      case 'count': this.tone(300, 0.2, 'square', 0.18, 0, 260); this.noise(0.1, 300, 0.4, 'lowpass', 0.5); break;
      case 'tap': this.noise(0.06, 3000, 1, 'highpass', 0.3); this.noise(0.06, 3000, 1, 'highpass', 0.3, 0.12); break;
      case 'click': this.tone(700, 0.05, 'square', 0.08, 0, 500); break;
      case 'confirm': this.tone(520, 0.1, 'triangle', 0.2); this.tone(780, 0.14, 'triangle', 0.2, 0.08); break;
      case 'back': this.tone(420, 0.1, 'triangle', 0.18, 0, 300); break;
      case 'grab': this.noise(0.1, 600, 1, 'bandpass', 0.35); this.tone(200, 0.1, 'sine', 0.3, 0, 120); break;
      case 'win': [0, 4, 7, 12].forEach((n, i) => this.tone(mtof(60 + n), 0.6, 'triangle', 0.25, i * 0.12)); break;
      case 'cannon': this.noise(0.5, 220, 0.5, 'lowpass', 1.3); this.tone(70, 0.7, 'sine', 1.3, 0, 24); this.noise(0.25, 3500, 0.6, 'highpass', 0.5); break;
      case 'engine': for (let i = 0; i < 6; i++) this.tone(48 + (i % 2) * 6, 0.25, 'sawtooth', 0.09, i * 0.18); break;
      case 'summon': [0, 7, 12, 19].forEach((n, i) => this.tone(mtof(55 + n), 0.5, 'triangle', 0.14, i * 0.06)); this.noise(0.4, 900, 0.5, 'bandpass', 0.15); break;
      case 'feedback': this.tone(2300, 0.6, 'sine', 0.22, 0, 3100); this.tone(2310, 0.6, 'sine', 0.18, 0.02, 3000); this.noise(0.15, 5000, 0.8, 'highpass', 0.25); break;
      case 'olé': [0, 4, 7].forEach((n, i) => this.tone(mtof(64 + n), 0.3, 'triangle', 0.2, i * 0.1)); break;
      case 'foul': this.tone(180, 0.35, 'sawtooth', 0.22, 0, 120); break;
      case 'unlock': [0, 7, 12, 16].forEach((n, i) => this.tone(mtof(72 + n), 0.5, 'sine', 0.22, i * 0.09)); break;
      default: break;
    }
  }

  /** Reacción del público: sube y baja */
  cheer(amount = 1) {
    this.crowdTarget = Math.min(1, this.crowdLevel + 0.4 * amount);
    window.setTimeout(() => { this.crowdTarget = Math.max(0.2, this.crowdTarget - 0.35 * amount); }, 900);
  }
  setCrowd(level: number) { this.crowdTarget = level; }
  tickCrowd(dt: number) {
    if (!this.ctx) return;
    this.crowdLevel += (this.crowdTarget - this.crowdLevel) * Math.min(1, dt * 2.5);
    this.crowdG.gain.value = this.crowdLevel * 0.12 * this.vol.sfx;
    this.crowdFilter.frequency.value = 420 + this.crowdLevel * 500;
  }

  say(text: string) {
    if (!this.vol.voice) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'es-ES'; u.rate = 1.05; u.pitch = 0.9; u.volume = 0.9 * this.vol.master;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    } catch { /* sin voz */ }
  }

  /** Voz de comentarista (who 0 = narrador, 1 = comentarista). Devuelve false si no hay voz disponible. */
  speak(text: string, who: number, onEnd: () => void): boolean {
    if (!this.vol.voice) return false;
    try {
      if (!('speechSynthesis' in window)) return false;
      const all = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('es'));
      const prefer = who === 0 ? /jorge|diego|juan|carlos|pablo|male/i : /m[oó]nica|paulina|marisol|luc[ií]a|elena|helena|female/i;
      const voice = all.find((v) => prefer.test(v.name) && v.lang.toLowerCase().startsWith('es-es')) ?? all.find((v) => prefer.test(v.name)) ?? all[who % Math.max(1, all.length)];
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'es-ES'; if (voice) u.voice = voice;
      u.pitch = who === 0 ? 0.8 : 1.25; u.rate = who === 0 ? 1.14 : 1.08; u.volume = Math.min(1, 0.95 * this.vol.master + 0.1);
      u.onend = () => onEnd(); u.onerror = () => onEnd();
      speechSynthesis.speak(u);
      return true;
    } catch { return false; }
  }
  cancelSpeech() { try { speechSynthesis.cancel(); } catch { /* sin voz */ } }

  // ---------------------------------------------------------------- música procedural
  music(kind: MusicKind) {
    if (!this.ctx) { this.musicKind = kind; return; }
    if (kind === this.musicKind && this.musicTimer) return;
    this.stopMusic();
    this.musicKind = kind;
    if (!kind) return;
    this.bar = 0;
    this.nextBar = this.t() + 0.1;
    const tick = () => {
      while (this.nextBar < this.t() + 0.8) { this.scheduleBar(kind, this.nextBar, this.bar); this.nextBar += this.barLen(kind); this.bar++; }
    };
    tick();
    this.musicTimer = window.setInterval(tick, 250);
  }
  stopMusic() { if (this.musicTimer) window.clearInterval(this.musicTimer); this.musicTimer = null; this.musicKind = null; }
  private barLen(k: MusicKind) { return k === 'manchester' ? 60 / 112 * 4 : k === 'matamoros' ? 60 / 76 * 4 : k === 'victoria' ? 2 : 60 / 84 * 4; }

  private mtone(freq: number, dur: number, type: OscillatorType, gain: number, at: number, filt = 2000, attack = 0.02) {
    const c = this.ctx!;
    const o = c.createOscillator(); o.type = type; o.frequency.value = freq;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = filt;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, at); g.gain.linearRampToValueAtTime(gain, at + attack); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(f); f.connect(g); g.connect(this.musG);
    o.start(at); o.stop(at + dur + 0.05);
  }

  private scheduleBar(kind: MusicKind, at: number, bar: number) {
    const len = this.barLen(kind);
    if (kind === 'matamoros') {
      // cuerdas amplias, cuatro compases Dm - Bb - F - C
      const prog = [[50, 57, 62, 65], [46, 53, 58, 62], [53, 57, 60, 65], [48, 55, 60, 64]];
      const ch = prog[bar % 4];
      ch.forEach((n, i) => { this.mtone(mtof(n + 12), len * 1.05, 'sawtooth', 0.05, at, 900, 0.5); this.mtone(mtof(n + 12) * 1.004, len * 1.05, 'sawtooth', 0.04, at, 900, 0.5); if (i === 0) this.mtone(mtof(n - 12), len, 'sine', 0.2, at, 400, 0.1); });
      // timbal
      this.mtone(70, 0.5, 'sine', 0.35, at, 300, 0.005); this.mtone(70, 0.5, 'sine', 0.2, at + len * 0.75, 300, 0.005);
      // melodía
      const mel = [74, 72, 70, 69, 65, 67, 69, 72];
      for (let i = 0; i < 4; i++) this.mtone(mtof(mel[(bar * 2 + i) % mel.length] + 12), len / 4, 'triangle', 0.07, at + (i * len) / 4, 2400, 0.04);
    } else if (kind === 'manchester') {
      const roots = [45, 45, 41, 43];
      const r = roots[bar % 4];
      for (let i = 0; i < 8; i++) {
        const t = at + (i * len) / 8;
        this.mtone(mtof(r - 12), 0.22, 'sawtooth', 0.2, t, 500, 0.005);
        if (i % 2 === 1) this.mtone(mtof(r + 12 + (i === 3 ? 7 : 0)), 0.12, 'square', 0.05, t, 1800, 0.005);
      }
      this.noise(0.08, 8000, 0.6, 'highpass', 0.06, at - this.t(), this.musG);
      for (let i = 0; i < 4; i++) { this.noise(0.1, 200, 1, 'lowpass', 0.35, at + (i * len) / 4 - this.t(), this.musG); }
      [0, 7, 12, 15].forEach((n) => this.mtone(mtof(r + 24 + n), len, 'sawtooth', 0.03, at, 1200, 0.3));
    } else if (kind === 'victoria') {
      [0, 4, 7, 12].forEach((n, i) => this.mtone(mtof(60 + n), 1.6, 'triangle', 0.12, at + i * 0.15, 3000, 0.02));
    } else {
      // menú: oscuro y pulsante
      const roots = [38, 38, 34, 36];
      const r = roots[bar % 4];
      this.mtone(mtof(r), len, 'sine', 0.3, at, 300, 0.4);
      this.mtone(mtof(r + 12), len, 'sawtooth', 0.04, at, 500, 0.6);
      this.mtone(mtof(r + 19), len, 'sawtooth', 0.03, at, 600, 0.8);
      for (let i = 0; i < 8; i++) this.mtone(mtof(r + 24 + [0, 3, 7, 10][i % 4]), 0.3, 'triangle', 0.045, at + (i * len) / 8, 1500, 0.01);
      this.noise(0.12, 150, 1, 'lowpass', 0.5, at - this.t(), this.musG);
      this.noise(0.12, 150, 1, 'lowpass', 0.4, at + len / 2 - this.t(), this.musG);
    }
  }
}

export const Audio = new AudioSys();
