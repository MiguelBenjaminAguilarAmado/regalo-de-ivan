(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`data:text/markdown;base64,RWxzbyBuYWNpw7MgZW4gdW4gYmFycmlvIHBvYnJlIGRlIEhvbmR1cmFzIHkgZnVlIGNvbnRyYXRhZG8gcG9yIFBhYmxvIE1vdG9zIGEgbG9zIDE5LTIwIGHDsW9zIGRlIGVkYWQsIGZ1ZSB1bmEgaXJydXBjacOzbiBjbGFyYSBlbiBsYSBlc2NlbmEgcG9ycXVlIGVuIGxhIHByaW1lcmEgdGVtcG9yYWRhIGxvZ3LDsyBnYW5hciB0b2RvLCBjb25zYWdyw6FuZG9zZSBjb21vIGVsIG1lam9yIGx1Y2hhZG9yLCBjb24gc3Ugbm92aWEgbGEgY2hpbGVuYSwgdHJhcyBsYSB0ZW1wb3JhZGEgMSwgc3UgY2FycmVyYSBhIGlkbyBkZSBjYXBhIGNhw61kYSwgZW4gbGEgdGVtcG9yYWRhIDMgeW9zdWtlIGxlIHF1aXTDsyBsYSBub3ZpYSB5IGFob3JhIGVzIHVuIGx1Y2hhZG9yIG3DoXMgZGUgbGEgcGxhbnRpbGxhLgoKRWwgY29tYmF0ZSBkZSBFbHNvIGVzIGZyZW7DqXRpY28geSByw6FwaWRvLCBjb24gdW5hIHJlc2lzdGVuY2lhIG1lZGlhLCB2YSBhIGJ1c2NhciBxdWUgY2FpZ2FzIHLDoXBpZG8uIFN1IGZpbmlzaGVyIGVzICJFbCBnb2xwZSBmZW1ib3kiIGRvbmRlIGRlc2NhcmdhIHVuYSBwb3RlbmNpYSBpbm1lbnN1cmFkYSBlbiB1biBzb2xvIGdvbHBlIGhhY2lhIGVsIHJpdmFsLgoKSGEgbGxldmFkbyBtdWNob3MgdHJhamVzLCBsbyDDum5pY28gcmFybyBlcyBxdWUgdGllbmUgbGEgcGllbCBhbWFyaWxsYS4=`,t=`data:text/markdown;base64,UGFibG8gTW90b3MgZXMgZWwgamVmZSwgQ0VPLCBlbCBxdWUgcG9uZSBsYSBwYXN0YSwgZW1wcmVzYXJpbywgY2FudGFudGUsIGxpbXBpYWRvciwgc2FjbyBkZSBib3hlbyBkZWwgSG95byBXcmVzdGxpbmcuIEVuIGxhIHByaW1lcmEgdGVtcG9yYWRhIHRlbsOtYSB1bmEgY2FyYSBtZW5vcyB2aXNpYmxlLCBwZXJvIGNvbmZvcm1lIGxhcyB0ZW1wb3JhZGFzIGhhIHRlbmlkbyBtw6FzIHByZXNlbmNpYSwgZm9ybWEgcGFyZWphIGRlIGR1ZWxvIGFsZ3VuYXMgdmVjZXMgY29uIEFsZXggYXVucXVlIMOpbCBtaXNtbyBubyBlc3TDqSBkZSBhY3VlcmRvLCBoYSBnYW5hZG8gdW4gRmVtYm95IENoYW1waW9uc2hpcCBhdW5xdWUgc2UgZHVkYSBkZSBsYSBsZWdhbGlkYWQgZGUgw6lsLgoKUGFyZWNlIHVuIG1lbWUgbHVjaGFuZG8sIHBlc2EgNDkga2lsb3MgcG9yIGxvIHF1ZSBsZSBtYXRhIGxvIHF1ZSBzZWEsIGF1bnF1ZSBncmFjaWFzIGEgZGlvcyBubyBzdWVsZSBvY3VycmlyIGEgbWVudWRvIChwZXJvIG9jdXJyZSkgUGFibG8gbW90b3MgcHVlZGUgaGFjZXIgYXBhcmVjZXIgdW4gdGFucXVlLCB1biBjYXNjbyBkZSBzb2xkYWRvIHJvbWFubywgdW4gbWFsZXTDrW4gY29uIGRpbmVybywgdW5hIG1vbWlhIHkgdW4gbWljcsOzZm9ubywgZXMgdW4gbWVtZSBhbmRhbnRlLgoKU3UgZmluaXNoZXIgZXMgIkxhIGhvcmEgZGUgcGFibG8gbW90b3MiIERvbmRlIGVzdGUgbGUgc2FjYSBkZSBsYSBlbXByZXNhIHkgbGUgZXhwdWxzYSwgcG9yIGxvIHF1ZSwgYcO6biBzaW4gZ2FuYXIsIHNpIG5vIHB1ZWRlIGNvbXBldGlyIG5vIHB1ZWRlIGdhbmFyISBTaSwgYXPDrSBlcyBwYWJsbyBtb3Rvcy4=`,n=`data:text/plain;base64,UGVwZSB0aGUgZ2F5IGRyYWdvbiBlcyB1biBkcmFnb24gaG9tb3NleHVhbCBxdWUgc2UgbGxhbWEgUGVwZSwgdmEgZGVzbnVkbyBjb24gdW5hIG3DoXNjYXJhIGRlIGNhYmFsbG8gcm9zYSBjb24gbGEgcXVlIHNlIGNyZWUgdW4gdW5pY29ybmlvLCBmdWUgY29tcGHDsWVybyBkZSBjb2pvbiBtYXJpbmFkbyBkdXJhbnRlIG11Y2hvIHRpZW1wbyBoYXN0YSBxdWUgbGUgZGVqw7MgdGlyYWRvIHBhcmEgaXJzZSBjb24gU2VyZ2lvIGVsIG5pw7FvIGludmVuY2libGUgKGxpdGVyYWxtZW50ZSwgbm8gZXMgY2/DsWEpCkx1Y2hhIGNvbiBnb2xwZXMgbGVudG9zIHkgZnVlcnRlcywgY29uIHVuYSBndWFyZGEgZW4gY3XDoWwgbm8gc2UgcHVlZGUgbW92ZXIsIHN1IGZpbmlzaGVyIGhhY2UgcXVlIGFwYXJlemNhIHVuIGN1ZXJubyBkZSB1bmljb3JuaW8gZW4gc3UgY2FiZXphIHkgaGFnYSB1bmEgZW1iZXN0aWRhIGFsIHJpdmFsIGNvcnJpZW5kbywgc2kgZWwgcml2YWwgZXMgcGV0aXN1aSwgcGV0aXN1aSBsZSB0b3JlYSwgcGFyYSB0cmFzIGVsbG8sIHBlcGUgaGFjZXJsZSBLTyBjb24gdW4gc29sbyBnb2xwZS4=`,r=`data:text/markdown;base64,UGV0aXN1aSBlcyB1biBsdWNoYWRvciBvcmlnaW5hcmlvIGRlIGxhcyAzMDAwIHZpdmllbmRhcyBxdWUgZnVlIGNvbnRyYXRhZG8gcG9yIFBhYmxvIE1vdG9zIGNvbiAyMyBhw7FvcyBhcHJveGltYWRhbWVudGUsIGx1Y2hhYmEgZW4gdW4gZ2FyaXRvIGVuIGxhcyAzMDAwIGRvbmRlIHZpw7MgYSBtdWNob3MgbW9yaXIsIGVuIGVzZSBtaXNtbyBnYXJpdG8gbHVjaGFiYSB0YW1iacOpbiBlbCBjYW7DrWJhbCBkZSBCaWcgTWFjLiBQZXRpc3VpIGluZ3Jlc8OzIGFsIEhveW8gV3Jlc3RsaW5nIGNvbW8gdW4gbHVjaGFkb3IgbWVkaW9jcmUgdGlyYW5kbyBoYWNpYSBtYWxvLCBwZXJvIGNvbiB1bmEgZnVlcnRlIGNvbXVuaWRhZCBkZSBmYW5zLCBlbiBsYSB0ZW1wb3JhZGEgMiBwZWfDsyBlbCBib29tIGdhbmFuZG8gY29tYmF0ZXMgeSB0b3JuZW9zIGltcG9ydGFudGVzIGxvZ3JhbmRvIHZlbmNlciBhIHVubyBkZSBsb3MgbWVqb3JlcywgS29uZ3VpLiBFc3RvIGhpem8gcXVlIHN1IGdyYW4gZWdvIGZ1ZXJhIGEgcGVvciwgbG8gcXVlIGxlIGdhbsOzIGVsIG1vdGUgZGUgIlBldGktanVkw61vIiBwb3IgbG9zIGZhbsOhdGljb3MgZGUgbGEgc2VyaWUsIEVuIGxhIHRlbXBvcmFkYSAzIHkgNCBhw7puIHNpZW5kbyB1biBncmFuIGx1Y2hhZG9yIG5vIGVzIGxvIHF1ZSBmdWUgZW4gbGEgdGVtcG9yYWRhIDIuIFNlIGxlIGNhdGFsb2dhIGNvbW8gdW5vIGRlIGxvcyAzIGdyYW5kZXMgKEVsc28sIFBldGlzdWkgeSBBbnNvbCkKClBldGlzdWkgdGllbmUgdW5hIHJlc2lzdGVuY2lhIGFkbWlyYWJsZSBwb3Igbm8gZGVjaXIgbGEgbWVqb3IsIGHDum4gZW4gdmlkYSBvIG11ZXJ0ZSBvIGVuIHBlbGlncm8gbG9ncmEgYWd1YW50YXIgbXVjaMOtc2ltbywgdGllbmUgdW4gbW92ZS1zZXQgY2FyYWN0ZXLDrXN0aWNvIGRlIGJ1cmxhIG8gdmFjaWzDqSBzdXRpbCBzdW1hbmRvIGdvbHBlcyBkaXJlY3RvcyByw6FwaWRvcyB5IGZ1ZXJ0ZXMgZGlyZWN0b3MgYSBoYWNlciBkYcOxbywgcG9yIGxvIHF1ZSBlcyBwcm9wZW5zbyBhIGNvbWV0ZXIgZmFsdGFzLgoKRW4gZm9ybWEgZsOtc2ljYSBzZSBsZSBoYSB2aXN0byBjb24gbXVjaG9zIHRyYWplcywgcGVybyBzaWVtcHJlIHRpZW5lIGFsZ28gY2FyYWN0ZXLDrXN0aWNvLCB1bmEgbcOhc2NhcmEgZGUgemVicmEgcXVlIG51bmNhIHNlIGhhIHF1aXRhZG8uCgpTdSBmaW5pc2hlciBlcyAiRWwgc2lsbGF6byIgZG9uZGUgcGV0aXN1aSBzYWNhIHVuYSBzaWxsYSBkZSBsYSBuYWRhIHkgREVTVFJVWUUgYWwgcml2YWwu`,i=new URL(`elso-ApZ3g8CV.png`,import.meta.url).href,a=new URL(`pablo motos-BHgGMDoB.png`,import.meta.url).href,o=new URL(`pablo-pfp-CB5wqpku.png`,import.meta.url).href,s=new URL(`pepe-pfp-4mAimItR.jpeg`,import.meta.url).href,c=new URL(`pepe-Dp-a95Zg.png`,import.meta.url).href,l=new URL(`petisui-pfp-Cl11ukgC.png`,import.meta.url).href,u=new URL(`petisui-BcatB_Ko.png`,import.meta.url).href,d=[{id:`elso`,description:`Salió de un barrio humilde de Honduras y arrasó en la primera temporada: lo ganó absolutamente todo. Desde entonces su estrella se ha ido apagando, pero sigue siendo uno de los tres grandes del Hoyo. Piel amarilla, chaqueta de cuero y muy poca paciencia.`,style:`Frenético y veloz, con resistencia media. Busca tumbarte cuanto antes con combos rápidos y, si te descuidas, con su golpe femboy.`,stats:{speed:1.22,power:1,health:92,stamina:88,tempo:1.22,resist:1,recover:1,escape:1},moves:{light:[`jab`,`directo`,`gancho`],heavy:`patada_voladora`,grab:{throw:`cadera`,slam:`powerslam`,sub:`llave_brazo`},finisher:`golpe_femboy`,taunt:`burla`},appearance:{skin:15320602,hair:null,outfit:`cuero`,outfitColor:1905937,trunksColor:1250067,accent:3108832,mask:null,facePaint:`payaso`,build:1,height:1.02}},{id:`petisui`,description:`Peleador curtido en los garitos de las 3000 viviendas, con una legión de fans y un ego a juego. Su segunda temporada fue pura gloria y desde entonces vive de aquello con la barbilla bien alta. Nunca se separa de su máscara.`,style:`El más difícil de tumbar: aguanta lo que le echen. Mezcla burlas con golpes directos y duros, y es muy propenso a las faltas. Su sillazo sale de la nada.`,stats:{speed:.98,power:1.1,health:108,stamina:135,tempo:1,resist:.86,recover:.8,escape:1.25},moves:{light:[`jab`,`directo`,`gancho`],heavy:`cabezazo`,grab:{throw:`suplex`,slam:`ddt`,sub:`cobra`},finisher:`sillazo`,taunt:`vacile`},appearance:{skin:13081464,hair:null,outfit:`traje`,outfitColor:1512731,trunksColor:1512731,accent:10690602,mask:`perro`,facePaint:null,build:1.05,height:1}},{id:`pablo motos`,name:`Pablo Motos`,description:`El jefe del Hoyo: empresario, cantante, limpiador y, cuando toca, saco de boxeo de su propia compañía. Pesa lo que una bolsa de la compra, pero tiene todo el poder del despacho… y un arsenal de lo más surrealista.`,style:`Frágil pero impredecible. Su golpe fuerte es una lotería: maletín, micrófono, casco romano, momia o incluso un tanque. Y su finisher te despide.`,stats:{speed:1.12,power:.85,health:72,stamina:95,tempo:1.05,resist:1.2,recover:1,escape:.8},moves:{light:[`jab`,`directo`,`codazo`],heavy:`maletinazo`,heavyRandom:[[`maletinazo`,36],[`microfonazo`,30],[`casco_romano`,18],[`momia`,11],[`tanque`,5]],grab:{throw:`cadera`,slam:`body_slam`,sub:`cangrejo`},finisher:`hora_pablo_motos`,taunt:`burla`},appearance:{skin:12947308,hair:854537,beard:854537,glasses:!0,outfit:`blazer`,outfitColor:1184276,trunksColor:1184276,accent:15921906,mask:null,build:.88,height:1}},{id:`pepe the gay dragon`,name:`Pepe the Gay Dragon`,description:`Un dragón con una máscara rosa de caballo que está convencido de ser un unicornio. Fue compañero inseparable de Cojón Marinado hasta que lo dejó tirado para irse con Sergio, el niño invencible. Va a pecho descubierto y sin ningún complejo.`,style:`Golpes lentos y demoledores. Su guardia es una roca: aguanta casi todo, pero no se puede mover. Su finisher le hace brotar un cuerno y embestir; contra Petisui puede acabar en toreo… y en un KO de un solo golpe.`,stats:{speed:.86,power:1.3,health:116,stamina:100,tempo:.74,resist:.95,recover:1,escape:1},traits:{rootedGuard:!0},moves:{light:[`jab`,`gancho`,`directo`],heavy:`machada`,grab:{throw:`hombro`,slam:`powerslam`,sub:`cobra`},finisher:`embestida_unicornio`,taunt:`rugido`},appearance:{skin:13206880,hair:null,outfit:`desnudo`,outfitColor:10107508,trunksColor:11683967,accent:16743115,wraps:1446422,mask:`caballo`,build:1.18,height:1.04}},{id:`novato`,name:`Novato del Hoyo`,placeholder:!0,description:`Luchador provisional recién llegado al Hoyo. Entusiasta, rápido y con más ganas que técnica. Sustitúyelo por uno de verdad añadiendo su carpeta en fighters/.`,style:`Equilibrado, con una plancha final espectacular.`,stats:{speed:1.05,power:.95,health:100,stamina:100},moves:{light:[`jab`,`patada_baja`,`gancho`],heavy:`machada`,grab:{throw:`hombro`,slam:`body_slam`,sub:`cangrejo`},finisher:`plancha_final`,taunt:`burla`},appearance:{skin:14262906,hair:2825492,outfit:`camiseta`,outfitColor:2976335,trunksColor:2239027,accent:15909198,build:.98,height:1}},{id:`veterano`,name:`Veterano del Hoyo`,placeholder:!0,description:`Luchador provisional con mil combates a la espalda y las canas que lo demuestran. Sustitúyelo por uno de verdad añadiendo su carpeta en fighters/.`,style:`Sólido y paciente: golpea fuerte y aguanta bien.`,stats:{speed:.95,power:1.05,health:106,stamina:105,resist:.94},moves:{light:[`jab`,`directo`,`codazo`],heavy:`lariat`,grab:{throw:`suplex`,slam:`powerslam`,sub:`cobra`},finisher:`martillo_hoyo`,taunt:`rugido`},appearance:{skin:9263675,hair:10132122,outfit:`abrigo`,outfitColor:7028262,trunksColor:2759186,accent:14275264,build:1.08,height:1}},{id:`brutote`,name:`Brutote del Hoyo`,placeholder:!0,description:`Luchador provisional enorme y poco hablador. Sustitúyelo por uno de verdad añadiendo su carpeta en fighters/.`,style:`Lento pero devastador: mucha vida, mucha pegada.`,stats:{speed:.85,power:1.22,health:124,stamina:100,tempo:.9,resist:.92,recover:.9},moves:{light:[`jab`,`rodillazo`,`gancho`],heavy:`lariat`,grab:{throw:`hombro`,slam:`powerslam`,sub:`llave_brazo`},finisher:`tornado`,taunt:`rugido`},appearance:{skin:11826767,hair:null,outfit:`camiseta`,outfitColor:8003359,trunksColor:1710618,accent:14725953,build:1.16,height:1.06},unlock:{wins:3,hint:`Gana 3 combates en total`}},{id:`agil`,name:`Ágil del Hoyo`,placeholder:!0,description:`Luchador provisional que no se está quieto ni dormido. Sustitúyelo por uno de verdad añadiendo su carpeta en fighters/.`,style:`Rápido y escurridizo, con patadas por todas partes.`,stats:{speed:1.3,power:.9,health:86,stamina:96,tempo:1.18,escape:1.1},moves:{light:[`jab`,`patada_baja`,`patada_alta`],heavy:`patada_voladora`,grab:{throw:`cadera`,slam:`ddt`,sub:`cangrejo`},finisher:`patada_fantasma`,taunt:`burla`},appearance:{skin:14726287,hair:1052688,outfit:`camiseta`,outfitColor:2899599,trunksColor:1052688,accent:7266559,build:.93,height:.99},unlock:{achievement:`torneo`,hint:`Gana un torneo`}}],f=e=>({kind:`strike`,...e}),p={},m=(...e)=>e.forEach(e=>p[e.id]=e);m(f({id:`jab`,name:`Jab`,startup:.1,active:.07,recovery:.17,damage:4,range:1.3,stamina:4,hitstun:.24,knockback:.3,momentum:5,anim:`jab`}),f({id:`directo`,name:`Directo`,startup:.13,active:.07,recovery:.2,damage:5.5,range:1.4,stamina:5,hitstun:.27,knockback:.4,momentum:6,anim:`cross`,lunge:1.2}),f({id:`gancho`,name:`Gancho`,startup:.16,active:.07,recovery:.24,damage:6.5,range:1.4,stamina:6,hitstun:.3,knockback:.5,momentum:7,anim:`hook`}),f({id:`patada_baja`,name:`Patada baja`,startup:.15,active:.07,recovery:.23,damage:5,range:1.6,stamina:5,hitstun:.25,knockback:.35,momentum:5,anim:`lowkick`}),f({id:`rodillazo`,name:`Rodillazo`,startup:.13,active:.07,recovery:.22,damage:6,range:1.15,stamina:6,hitstun:.3,knockback:.35,momentum:6,anim:`knee`}),f({id:`codazo`,name:`Codazo`,startup:.12,active:.07,recovery:.2,damage:5.5,range:1.15,stamina:5,hitstun:.28,knockback:.3,momentum:6,anim:`elbow`}),f({id:`patada_alta`,name:`Patada alta`,startup:.2,active:.08,recovery:.3,damage:8,range:1.8,stamina:8,hitstun:.38,knockback:.7,momentum:8,anim:`highkick`})),m(f({id:`machada`,name:`Machada`,startup:.3,active:.1,recovery:.42,damage:12,range:1.55,stamina:14,hitstun:.5,knockback:1.3,knockdown:!0,momentum:11,anim:`haymaker`,lunge:1.6}),f({id:`lariat`,name:`Lariat`,startup:.32,active:.12,recovery:.45,damage:11,range:1.85,stamina:15,hitstun:.5,knockback:1.6,knockdown:!0,sendOut:!0,momentum:11,anim:`lariat`,lunge:1.4}),f({id:`patada_voladora`,name:`Patada voladora`,startup:.34,active:.14,recovery:.55,damage:13,range:2.2,stamina:18,hitstun:.5,knockback:1.8,knockdown:!0,sendOut:!0,momentum:12,anim:`dropkick`,lunge:4.2}),f({id:`cabezazo`,name:`Cabezazo`,startup:.26,active:.1,recovery:.4,damage:11,range:1.15,stamina:13,hitstun:.5,knockback:.8,knockdown:!0,momentum:10,anim:`headbutt`,foul:!0}),f({id:`maletinazo`,name:`Maletinazo`,startup:.28,active:.1,recovery:.4,damage:11,range:1.55,stamina:13,hitstun:.5,knockback:1.2,knockdown:!0,momentum:11,anim:`haymaker`,lunge:1.4,prop:`maletin`}),f({id:`microfonazo`,name:`Micrófono`,startup:.26,active:.1,recovery:.4,damage:9,range:1.7,stamina:11,hitstun:.95,knockback:.5,momentum:10,anim:`micswing`,prop:`microfono`}),f({id:`casco_romano`,name:`Cabezazo del centurión`,startup:.32,active:.1,recovery:.45,damage:13,range:1.4,stamina:14,hitstun:.5,knockback:1.1,knockdown:!0,momentum:12,anim:`headbutt`,lunge:2.2,prop:`casco`,announce:`¡Pablo Motos se pone el casco romano!`}),f({id:`momia`,name:`La momia`,startup:.85,active:.14,recovery:.5,damage:12,range:2.8,stamina:16,hitstun:.6,knockback:1.6,knockdown:!0,momentum:14,anim:`summon`,summon:`momia`,announce:`¡Pablo Motos invoca una MOMIA!`}),f({id:`tanque`,name:`El tanque`,startup:1.15,active:.16,recovery:.7,damage:17,range:3.6,stamina:20,hitstun:.6,knockback:3,knockdown:!0,sendOut:!0,momentum:18,anim:`summon`,summon:`tanque`,announce:`¡¡Pablo Motos saca un TANQUE!!`}),f({id:`golpe_bajo`,name:`Golpe bajo`,startup:.2,active:.08,recovery:.38,damage:10,range:1.2,stamina:10,hitstun:.8,knockback:.2,momentum:9,anim:`lowblow`,foul:!0})),m(f({id:`burla`,name:`Burla`,kind:`taunt`,startup:.2,active:0,recovery:.8,damage:0,range:0,stamina:0,hitstun:0,knockback:0,momentum:18,anim:`taunt`}),f({id:`vacile`,name:`Vacile`,kind:`taunt`,startup:.25,active:0,recovery:1,damage:0,range:0,stamina:0,hitstun:0,knockback:0,momentum:28,anim:`taunt2`}),f({id:`rugido`,name:`Rugido`,kind:`taunt`,startup:.25,active:0,recovery:.9,damage:0,range:0,stamina:0,hitstun:0,knockback:0,momentum:22,anim:`taunt`})),m(f({id:`agarre`,name:`Agarre`,kind:`grab`,startup:.18,active:.1,recovery:.38,damage:0,range:1.4,stamina:7,hitstun:0,knockback:0,momentum:0,anim:`grab`}));var h={};((...e)=>e.forEach(e=>h[e.id]=e))({id:`suplex`,name:`Suplex`,damage:11,anim:`throw`,style:`throw`},{id:`cadera`,name:`Lanzamiento de cadera`,damage:10,anim:`throw`,style:`throw`},{id:`hombro`,name:`Lanzamiento de hombro`,damage:10,anim:`throw`,style:`throw`},{id:`powerslam`,name:`Powerslam`,damage:17,anim:`slam`,style:`slam`},{id:`ddt`,name:`DDT`,damage:16,anim:`slam`,style:`slam`},{id:`body_slam`,name:`Body slam`,damage:15,anim:`slam`,style:`slam`},{id:`llave_brazo`,name:`Llave de brazo`,damage:0,anim:`sub`,style:`slam`},{id:`cangrejo`,name:`El cangrejo`,damage:0,anim:`sub`,style:`slam`},{id:`cobra`,name:`Cobra clutch`,damage:0,anim:`sub`,style:`slam`}),m(f({id:`golpe_femboy`,name:`El golpe femboy`,kind:`finisher`,startup:1.05,active:.14,recovery:.9,damage:38,range:1.9,stamina:0,hitstun:0,knockback:3.4,knockdown:!0,momentum:0,anim:`finPunch`,lunge:2.2,vfx:{color:16732067,callout:`EL GOLPE FEMBOY`}}),f({id:`sillazo`,name:`El sillazo`,kind:`finisher`,startup:.95,active:.14,recovery:1,damage:35,range:1.7,stamina:0,hitstun:0,knockback:2.6,knockdown:!0,momentum:0,anim:`finChair`,lunge:1.4,prop:`chair`,vfx:{color:16763210,callout:`EL SILLAZO`}}),f({id:`plancha_final`,name:`La plancha final`,kind:`finisher`,startup:.9,active:.2,recovery:1.1,damage:36,range:3.2,stamina:0,hitstun:0,knockback:2.4,knockdown:!0,momentum:0,anim:`finLeap`,lunge:5.6,vfx:{color:8048895,callout:`LA PLANCHA FINAL`}}),f({id:`martillo_hoyo`,name:`El martillo del Hoyo`,kind:`finisher`,startup:1,active:.14,recovery:.95,damage:34,range:1.7,stamina:0,hitstun:0,knockback:1.6,knockdown:!0,momentum:0,anim:`finHammer`,lunge:1.2,vfx:{color:16742970,callout:`EL MARTILLO DEL HOYO`}}),f({id:`patada_fantasma`,name:`La patada fantasma`,kind:`finisher`,startup:.85,active:.16,recovery:.95,damage:35,range:2.1,stamina:0,hitstun:0,knockback:3,knockdown:!0,momentum:0,anim:`finKick`,lunge:2.4,vfx:{color:11771135,callout:`LA PATADA FANTASMA`}}),f({id:`tornado`,name:`El tornado`,kind:`finisher`,startup:.95,active:.2,recovery:1,damage:33,range:2,stamina:0,hitstun:0,knockback:3.2,knockdown:!0,sendOut:!0,momentum:0,anim:`finSpin`,lunge:1.8,vfx:{color:10354554,callout:`EL TORNADO`}})),m(f({id:`embestida_unicornio`,name:`La embestida del unicornio`,kind:`finisher`,startup:1.1,active:.55,recovery:1,damage:40,range:1.7,stamina:0,hitstun:0,knockback:4.2,knockdown:!0,momentum:0,anim:`finCharge`,rush:9,prop:`cuerno`,vfx:{color:16739029,callout:`LA EMBESTIDA DEL UNICORNIO`}}),f({id:`golpe_unico`,name:`Un solo golpe`,kind:`finisher`,startup:.4,active:.12,recovery:.8,damage:999,range:2.4,stamina:0,hitstun:0,knockback:3,knockdown:!0,momentum:0,anim:`haymaker`,lunge:3,vfx:{color:16739029,callout:`¡UN SOLO GOLPE!`}}),f({id:`hora_pablo_motos`,name:`La hora de Pablo Motos`,kind:`finisher`,startup:1.1,active:.14,recovery:.9,damage:12,range:2.4,stamina:0,hitstun:0,knockback:3.4,knockdown:!0,sendOut:!0,momentum:0,anim:`finPoint`,lunge:.6,vfx:{color:16119285,callout:`LA HORA DE PABLO MOTOS`}}),f({id:`cuchilla_dorada`,name:`La cuchilla dorada`,kind:`finisher`,startup:.9,active:.16,recovery:.95,damage:35,range:2,stamina:0,hitstun:0,knockback:2.8,knockdown:!0,momentum:0,anim:`finKick`,lunge:2.2,vfx:{color:16766046,callout:`LA CUCHILLA DORADA`}}),f({id:`meteoro`,name:`El meteoro`,kind:`finisher`,startup:.9,active:.2,recovery:1.1,damage:36,range:3.2,stamina:0,hitstun:0,knockback:2.4,knockdown:!0,momentum:0,anim:`finLeap`,lunge:5.4,vfx:{color:16738890,callout:`EL METEORO`}}),f({id:`trueno_barrio`,name:`El trueno del barrio`,kind:`finisher`,startup:1,active:.14,recovery:.95,damage:34,range:1.7,stamina:0,hitstun:0,knockback:1.6,knockdown:!0,momentum:0,anim:`finHammer`,lunge:1.2,vfx:{color:6731775,callout:`EL TRUENO DEL BARRIO`}}),f({id:`ciclon`,name:`El ciclón`,kind:`finisher`,startup:.95,active:.2,recovery:1,damage:33,range:2,stamina:0,hitstun:0,knockback:3,knockdown:!0,sendOut:!0,momentum:0,anim:`finSpin`,lunge:1.8,vfx:{color:8257458,callout:`EL CICLÓN`}}));var g=e=>{let t=p[e];if(!t)throw Error(`Movimiento desconocido: ${e}`);return t},_=e=>{let t=h[e];if(!t)throw Error(`Llave desconocida: ${e}`);return t},v=Object.assign({"/fighters/Elso/elso.md":e,"/fighters/Pablo motos/pablo motos.md":t,"/fighters/Pepe the gay dragon/pepe-the-gay-dragon.txt":n,"/fighters/petisui/petisui.md":r}),y=Object.assign({"/fighters/Elso/elso.png":i,"/fighters/Pablo motos/pablo motos.png":a,"/fighters/Pablo motos/pablo-pfp.png":o,"/fighters/Pepe the gay dragon/pepe-pfp.jpeg":s,"/fighters/Pepe the gay dragon/pepe.png":c,"/fighters/petisui/petisui-pfp.png":l,"/fighters/petisui/petisui.png":u}),b={speed:1,power:1,health:100,stamina:100,tempo:1,resist:1,recover:1,escape:1},x=e=>e.split(`/`)[2],S=e=>e.charAt(0).toUpperCase()+e.slice(1);function C(e){let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return t>>>0}function w(e){let t=C(e),n=[14262906,11826767,9263675,14726287,13081464],r=[8003359,2050682,2976335,5909866,6969901];return{id:e,description:`Luchador recién llegado al Hoyo que todavía no tiene ficha. Añade su descripción y sus golpes en content/fighters.ts.`,style:`Perfil equilibrado por defecto.`,stats:{},moves:{light:[`jab`,`directo`,`gancho`],heavy:`machada`,grab:{throw:`suplex`,slam:`body_slam`,sub:`llave_brazo`},finisher:`plancha_final`,taunt:[`burla`,`rugido`][t%2]},appearance:{skin:n[t%n.length],hair:t%3==0?null:1840142,outfit:[`camiseta`,`cuero`,`abrigo`][(t>>3)%3],outfitColor:r[(t>>5)%r.length],trunksColor:1579032,accent:14725953,build:.95+(t>>7)%20/100,height:.97+(t>>9)%10/100}}}function T(e){let t=[],n=new Map,r=new Set;for(let i of e){r.has(i.id)&&t.push(`Luchador duplicado: ${i.id}`),r.add(i.id);try{i.moves.light.forEach(g),g(i.moves.heavy),g(i.moves.taunt),_(i.moves.grab.throw),_(i.moves.grab.slam),_(i.moves.grab.sub);let e=g(i.moves.finisher);e.kind!==`finisher`&&t.push(`${i.id}: "${e.id}" no es un finisher`);let r=n.get(e.id);r&&t.push(`Finisher repetido "${e.id}": ${r} y ${i.id}`),n.set(e.id,i.id)}catch(e){t.push(`${i.id}: ${e.message}`)}}return t}function E(){let e=new Map,t=t=>{let n=x(t).toLowerCase();return e.has(n)||e.set(n,{}),e.get(n)};for(let e of Object.keys(v))t(e);for(let[e,n]of Object.entries(y).sort(([e],[t])=>e.localeCompare(t))){let r=t(e),i=e.split(`/`).pop().toLowerCase();/-?pfp|perfil|avatar/.test(i)?r.pfp=n:r.main||=n}let n=[...d],r=new Set(n.map(e=>e.moves.finisher)),i=[`cuchilla_dorada`,`meteoro`,`trueno_barrio`,`ciclon`,`plancha_final`,`martillo_hoyo`,`patada_fantasma`,`tornado`];for(let t of e.keys()){if(n.some(e=>e.id===t))continue;let e=w(t),a=i.find(e=>!r.has(e));a&&(e.moves.finisher=a),r.add(e.moves.finisher),n.push(e)}let a=T(n);a.length&&console.warn(`[El Hoyo] Problemas en el reparto:
`+a.join(`
`));let o=n.map(t=>{let n=e.get(t.id);return{...t,name:t.name??S(t.id),portrait:n?.main??n?.pfp??null,pfp:n?.pfp??n?.main??null,fullStats:{...b,...t.stats}}});return o.sort((e,t)=>Number(!!e.placeholder)-Number(!!t.placeholder)),o}var D=E(),O=e=>{let t=D.find(t=>t.id===e);if(!t)throw Error(`Luchador desconocido: ${e}`);return t},k=`# DIÁLOGOS — El Hoyo Wrestling

Aquí escribes tú los diálogos que salen antes de cada combate y cuando alguien gana.
Los cambios se ven al recargar la página (o al guardar, si tienes \`npm run dev\` abierto).

## Cómo se escribe

Cada bloque empieza con un título \`## luchador1 vs luchador2\` (el orden da igual).
Usa el nombre de la CARPETA del luchador en minúsculas (\`elso\`, \`petisui\`, \`pablo motos\`...).
Puedes poner \`*\` como comodín:

- \`## elso vs petisui\`    → solo cuando se enfrentan esos dos
- \`## elso vs *\`          → cuando Elso se enfrenta a cualquiera
- \`## * vs *\`             → para cualquier combate (el último recurso)

Debajo, una línea por frase, con este formato:

    - [momento] luchador: texto de la frase

Momentos disponibles:

- \`[pre]\`            antes de empezar el combate (se muestra en orden)
- \`[victoria]\`      cuando termina el combate: habla el luchador que lo escribas
- \`[victoria:id]\`   igual, pero solo si ha ganado ese luchador (ej. \`[victoria:elso]\`)
- \`[campeon]\`       cuando alguien gana el torneo (usa el bloque \`## * vs *\` o el del luchador)

Si quieres varias versiones del mismo diálogo, sepáralas con una línea \`---\`.
El juego elegirá una al azar cada vez.

Si un combate no tiene ningún diálogo, simplemente se salta la escena.

---------------------------------------------------------------------------

## elso vs petisui
- [pre] elso: Dos de los tres grandes en el mismo ring. Esto lo van a recordar en el Hoyo.
- [pre] petisui: Tú ganaste una temporada, yo me quedé con el cariño de la gente. Vamos a ver quién manda.
- [pre] elso: Hablas mucho para llevar la máscara de un perro.
- [pre] petisui: Y tú pegas poco para ir de amarillo.
- [pre] petisui: Maricon
- [victoria:elso] elso: Rápido y limpio. Así se gana.
- [victoria:petisui] petisui: ¡Aguanto lo que haga falta! ¿Ya te cansaste?

## pablo motos vs *
- [pre] pablo motos: Soy el jefe, el que pone la pasta. Pelea bien, o a la calle.
- [victoria:pablo motos] pablo motos: Mi empresa, mis reglas. Estás despedido.

## elso vs *
- [pre] elso: No tengo tiempo para calentar. Que empiece ya.
- [victoria:elso] elso: Uno menos. ¿Quién sigue?

## petisui vs *
- [pre] petisui: Vengo a hacer espectáculo. Y a cobrar.
- [victoria:petisui] petisui: Con la silla o sin ella, gano yo.

## * vs *
- [pre] arbitro: Señoras y señores, ¡bienvenidos al Hoyo Wrestling!
- [campeon] arbitro: ¡Un nuevo campeón del Hoyo! Hoy se escribe historia.
`;function A(e){let t=[],n=null,r=[],i=()=>{n&&r.length&&n.variants.push(r),r=[]};for(let a of e.replace(/\r/g,``).split(`
`)){let e=a.trim(),o=/^##\s+(.+?)\s+vs\s+(.+?)\s*$/i.exec(e);if(o){i(),n={a:o[1].toLowerCase(),b:o[2].toLowerCase(),variants:[]},t.push(n);continue}if(!n)continue;if(/^---+$/.test(e)){i();continue}let s=/^-\s*\[([a-zñáéíóú_]+)(?::\s*([^\]]+))?\]\s*([^:]+?)\s*:\s*(.+)$/i.exec(e);s&&r.push({moment:s[1].toLowerCase(),winner:s[2]?s[2].trim().toLowerCase():null,who:s[3].trim().toLowerCase(),text:s[4].trim()})}return i(),t}var j=A(k);function ee(e,t,n){let r=(e,t)=>e===`*`?0:e===t?1:-1,i=[r(e.a,t),r(e.b,n)],a=[r(e.a,n),r(e.b,t)],o=e=>e.includes(-1)?-1:e[0]+e[1];return Math.max(o(i),o(a))}function M(e,t,n,r,i=j,a=Math.random){let o=i.map(e=>({bl:e,s:ee(e,t,n)})).filter(e=>e.s>=0).sort((e,t)=>t.s-e.s),s=[];for(let{bl:t}of o){let n=t.variants.map(t=>t.filter(t=>t.moment===e&&(!t.winner||t.winner===r))).filter(e=>e.length);if(!n.length)continue;let i=n[Math.floor(a()*n.length)];if(e===`victoria`){let e=i.filter(e=>e.winner===r);return(e.length?e:i).map(e=>({who:e.who,text:e.text}))}return i.map(e=>({who:e.who,text:e.text}))}return s}var te=1e3,ne=1001,re=1002,ie=1003,ae=1004,oe=1005,se=1006,ce=1007,le=1008,ue=1009,de=1010,fe=1011,pe=1012,me=1013,he=1014,ge=1015,_e=1016,ve=1017,ye=1018,be=1020,xe=35902,Se=35899,Ce=1021,we=1022,Te=1023,Ee=1026,De=1027,Oe=1028,ke=1029,Ae=1030,je=1031,Me=1033,Ne=33776,Pe=33777,Fe=33778,Ie=33779,N=35840,Le=35841,Re=35842,ze=35843,P=36196,Be=37492,F=37496,I=37488,Ve=37489,He=37490,Ue=37491,We=37808,Ge=37809,Ke=37810,qe=37811,Je=37812,Ye=37813,Xe=37814,Ze=37815,Qe=37816,$e=37817,et=37818,tt=37819,nt=37820,rt=37821,it=36492,at=36494,ot=36495,st=36283,ct=36284,lt=36285,ut=36286,dt=2300,ft=2301,pt=2302,mt=2303,ht=2400,gt=2401,_t=2402,vt=3200,yt=`srgb`,bt=`srgb-linear`,xt=`linear`,St=`srgb`,Ct=7680,wt=35044,Tt=2e3;function Et(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Dt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ot(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function kt(){let e=Ot(`canvas`);return e.style.display=`block`,e}var At={};function jt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Mt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function L(...e){e=Mt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function R(...e){e=Mt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Nt(...e){let t=e.join(` `);t in At||(At[t]=!0,L(...e))}function Pt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Ft={0:0,2:6,4:4,3:5,1:1,6:2,7:7,5:3},It=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Lt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Rt=Math.PI/180,zt=180/Math.PI;function Bt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Lt[e&255]+Lt[e>>8&255]+Lt[e>>16&255]+Lt[e>>24&255]+`-`+Lt[t&255]+Lt[t>>8&255]+`-`+Lt[t>>16&15|64]+Lt[t>>24&255]+`-`+Lt[n&63|128]+Lt[n>>8&255]+`-`+Lt[n>>16&255]+Lt[n>>24&255]+Lt[r&255]+Lt[r>>8&255]+Lt[r>>16&255]+Lt[r>>24&255]).toLowerCase()}function z(e,t,n){return Math.max(t,Math.min(n,e))}function Vt(e,t){return(e%t+t)%t}function Ht(e,t,n){return(1-n)*e+n*t}function Ut(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Wt(e){switch(e.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Gt(e,t){if(t.constructor===Float32Array)return e;let n=Wt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.max(e/n,-1)}function Kt(e,t){if(t.constructor===Float32Array)return e;let n=Wt(t);if(n===void 0)throw Error(`THREE.MathUtils: Invalid component type.`);return Math.round(e*n)}var B=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=z(this.x,e.x,t.x),this.y=z(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=z(this.x,e,t),this.y=z(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(z(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},qt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:L(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(z(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},V=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=z(this.x,e.x,t.x),this.y=z(this.y,e.y,t.y),this.z=z(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=z(this.x,e,t),this.y=z(this.y,e,t),this.z=z(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Jt.copy(this).projectOnVector(e),this.sub(Jt)}reflect(e){return this.sub(Jt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(z(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Jt=new V,Yt=new qt,H=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Nt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Xt.makeScale(e,t)),this}rotate(e){return Nt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Xt.makeRotation(-e)),this}translate(e,t){return Nt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Xt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Xt=new H,Zt=new H().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qt=new H().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $t(){let e={enabled:!0,workingColorSpace:bt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=en(e.r),e.g=en(e.g),e.b=en(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=tn(e.r),e.g=tn(e.g),e.b=tn(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?xt:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[n].fromXYZ).multiply(this.spaces[t].toXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[bt]:{primaries:t,whitePoint:r,transfer:xt,toXYZ:Zt,fromXYZ:Qt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:t,whitePoint:r,transfer:St,toXYZ:Zt,fromXYZ:Qt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),e}var U=$t();function en(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function tn(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var nn,rn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{nn===void 0&&(nn=Ot(`canvas`)),nn.width=e.width,nn.height=e.height;let t=nn.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=nn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ot(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=en(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(en(t[e]/255)*255):t[e]=en(t[e]);return{data:t,width:e.width,height:e.height}}return L(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},an=0,on=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:an++}),this.uuid=Bt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width||0,t.height||0,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(sn(r[t].image)):e.push(sn(r[t]))}else e=sn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function sn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?rn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(L(`Texture: Unable to serialize Texture.`),{})}var cn=0,ln=new V,un=class e extends It{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=ne,i=ne,a=se,o=le,s=Te,c=ue,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cn++}),this.uuid=Bt(),this.name=``,this.source=new on(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new B(0,0),this.repeat=new B(1,1),this.center=new B(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new H,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ln).x}get height(){return this.source.getSize(ln).y}get depth(){return this.source.getSize(ln).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){L(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?L(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case te:e.x-=Math.floor(e.x);break;case ne:e.x=e.x<0?0:1;break;case re:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case te:e.y-=Math.floor(e.y);break;case ne:e.y=e.y<0?0:1;break;case re:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};un.DEFAULT_IMAGE=null,un.DEFAULT_MAPPING=300,un.DEFAULT_ANISOTROPY=1;var dn=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=z(this.x,e.x,t.x),this.y=z(this.y,e.y,t.y),this.z=z(this.z,e.z,t.z),this.w=z(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=z(this.x,e,t),this.y=z(this.y,e,t),this.z=z(this.z,e,t),this.w=z(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},fn=class extends It{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:se,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new dn(0,0,e,t),this.scissorTest=!1,this.viewport=new dn(0,0,e,t),this.textures=[];let r=n.count;for(let i=0;i<r;i++)this.textures[i]=new un({width:e,height:t,depth:n.depth}),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:se,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new on(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},pn=class extends fn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},mn=class extends un{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ie,this.minFilter=ie,this.wrapR=ne,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},hn=class extends un{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ie,this.minFilter=ie,this.wrapR=ne,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},gn=class e{static{this.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/_n.setFromMatrixColumn(e,0).length(),i=1/_n.setFromMatrixColumn(e,1).length(),a=1/_n.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(yn,e,bn)}lookAt(e,t,n){let r=this.elements;return Cn.subVectors(e,t),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),xn.crossVectors(n,Cn),xn.lengthSq()===0&&(Math.abs(n.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),xn.crossVectors(n,Cn)),xn.normalize(),Sn.crossVectors(Cn,xn),r[0]=xn.x,r[4]=Sn.x,r[8]=Cn.x,r[1]=xn.y,r[5]=Sn.y,r[9]=Cn.y,r[2]=xn.z,r[6]=Sn.z,r[10]=Cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],te=r[7],ne=r[11],re=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*te,i[8]=a*C+o*D+s*j+c*ne,i[12]=a*w+o*O+s*ee+c*re,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*te,i[9]=l*C+u*D+d*j+f*ne,i[13]=l*w+u*O+d*ee+f*re,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*te,i[10]=p*C+m*D+h*j+g*ne,i[14]=p*w+m*O+h*ee+g*re,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*te,i[11]=_*C+v*D+y*j+b*ne,i[15]=_*w+v*O+y*ee+b*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=_n.set(r[0],r[1],r[2]).length(),o=_n.set(r[4],r[5],r[6]).length(),s=_n.set(r[8],r[9],r[10]).length();i<0&&(a=-a),vn.copy(this);let c=1/a,l=1/o,u=1/s;return vn.elements[0]*=c,vn.elements[1]*=c,vn.elements[2]*=c,vn.elements[4]*=l,vn.elements[5]*=l,vn.elements[6]*=l,vn.elements[8]*=u,vn.elements[9]*=u,vn.elements[10]*=u,t.setFromRotationMatrix(vn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Tt,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Tt,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},_n=new V,vn=new gn,yn=new V(0,0,0),bn=new V(1,1,1),xn=new V,Sn=new V,Cn=new V,wn=new gn,Tn=new qt,En=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(z(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-z(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(z(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-z(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(z(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-z(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:L(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return wn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Tn.setFromEuler(this),this.setFromQuaternion(Tn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};En.DEFAULT_ORDER=`XYZ`;var Dn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},On=0,kn=new V,An=new qt,jn=new gn,Mn=new V,Nn=new V,Pn=new V,Fn=new qt,In=new V(1,0,0),Ln=new V(0,1,0),Rn=new V(0,0,1),zn={type:`added`},Bn={type:`removed`},Vn={type:`childadded`,child:null},Hn={type:`childremoved`,child:null},Un=class e extends It{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:On++}),this.uuid=Bt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new V,n=new En,r=new qt,i=new V(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new gn},normalMatrix:{value:new H}}),this.matrix=new gn,this.matrixWorld=new gn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return An.setFromAxisAngle(e,t),this.quaternion.multiply(An),this}rotateOnWorldAxis(e,t){return An.setFromAxisAngle(e,t),this.quaternion.premultiply(An),this}rotateX(e){return this.rotateOnAxis(In,e)}rotateY(e){return this.rotateOnAxis(Ln,e)}rotateZ(e){return this.rotateOnAxis(Rn,e)}translateOnAxis(e,t){return kn.copy(e).applyQuaternion(this.quaternion),this.position.add(kn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(In,e)}translateY(e){return this.translateOnAxis(Ln,e)}translateZ(e){return this.translateOnAxis(Rn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Mn.copy(e):Mn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Nn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jn.lookAt(Nn,Mn,this.up):jn.lookAt(Mn,Nn,this.up),this.quaternion.setFromRotationMatrix(jn),r&&(jn.extractRotation(r.matrixWorld),An.setFromRotationMatrix(jn),this.quaternion.premultiply(An.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(R(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zn),Vn.child=e,this.dispatchEvent(Vn),Vn.child=null):R(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bn),Hn.child=e,this.dispatchEvent(Hn),Hn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zn),Vn.child=e,this.dispatchEvent(Vn),Vn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nn,e,Pn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nn,Fn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Un.DEFAULT_UP=new V(0,1,0),Un.DEFAULT_MATRIX_AUTO_UPDATE=!0,Un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Wn=class extends Un{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Gn={type:`move`},Kn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.quaternion,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.quaternion,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Gn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Wn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},qn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Yn={h:0,s:0,l:0};function Xn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var W=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,U.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=U.workingColorSpace){return this.r=e,this.g=t,this.b=n,U.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=U.workingColorSpace){if(e=Vt(e,1),t=z(t,0,1),n=z(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Xn(i,r,e+1/3),this.g=Xn(i,r,e),this.b=Xn(i,r,e-1/3)}return U.colorSpaceToWorking(this,r),this}setStyle(e,t=yt){function n(t){t!==void 0&&parseFloat(t)<1&&L(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseFloat(i[1]))/100,Math.min(100,parseFloat(i[2]))/100,Math.min(100,parseFloat(i[3]))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:L(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);L(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){let n=qn[e.toLowerCase()];return n===void 0?L(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=en(e.r),this.g=en(e.g),this.b=en(e.b),this}copyLinearToSRGB(e){return this.r=tn(e.r),this.g=tn(e.g),this.b=tn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return U.workingToColorSpace(Zn.copy(this),e),Math.round(z(Zn.r*255,0,255))*65536+Math.round(z(Zn.g*255,0,255))*256+Math.round(z(Zn.b*255,0,255))}getHexString(e=yt){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=U.workingColorSpace){U.workingToColorSpace(Zn.copy(this),t);let n=Zn.r,r=Zn.g,i=Zn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=U.workingColorSpace){return U.workingToColorSpace(Zn.copy(this),t),e.r=Zn.r,e.g=Zn.g,e.b=Zn.b,e}getStyle(e=yt){U.workingToColorSpace(Zn.copy(this),e);let t=Zn.r,n=Zn.g,r=Zn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Jn),this.setHSL(Jn.h+e,Jn.s+t,Jn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Jn),e.getHSL(Yn);let n=Ht(Jn.h,Yn.h,t),r=Ht(Jn.s,Yn.s,t),i=Ht(Jn.l,Yn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Zn=new W;W.NAMES=qn;var Qn=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new W(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},$n=class extends Un{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background===null?null:e.background.clone(),this.environment=e.environment===null?null:e.environment.clone(),this.fog=e.fog===null?null:e.fog.clone(),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial===null?null:e.overrideMaterial.clone(),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},er=new V,tr=new V,nr=new V,rr=new V,ir=new V,ar=new V,or=new V,sr=new V,cr=new V,lr=new V,ur=new dn,dr=new dn,fr=new dn,pr=class e{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),er.subVectors(e,t),r.cross(er);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){er.subVectors(r,t),tr.subVectors(n,t),nr.subVectors(e,t);let a=er.dot(er),o=er.dot(tr),s=er.dot(nr),c=tr.dot(tr),l=tr.dot(nr),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,rr)!==null&&rr.x>=0&&rr.y>=0&&rr.x+rr.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,rr)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,rr.x),s.addScaledVector(a,rr.y),s.addScaledVector(o,rr.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return ur.setScalar(0),dr.setScalar(0),fr.setScalar(0),ur.fromBufferAttribute(e,t),dr.fromBufferAttribute(e,n),fr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ur,i.x),a.addScaledVector(dr,i.y),a.addScaledVector(fr,i.z),a}static isFrontFacing(e,t,n,r){return er.subVectors(n,t),tr.subVectors(e,t),er.cross(tr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return er.subVectors(this.c,this.b),tr.subVectors(this.a,this.b),er.cross(tr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;ir.subVectors(r,n),ar.subVectors(i,n),sr.subVectors(e,n);let s=ir.dot(sr),c=ar.dot(sr);if(s<=0&&c<=0)return t.copy(n);cr.subVectors(e,r);let l=ir.dot(cr),u=ar.dot(cr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0&&s-l>0)return a=s/(s-l),t.copy(n).addScaledVector(ir,a);lr.subVectors(e,i);let f=ir.dot(lr),p=ar.dot(lr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(ar,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return or.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(or,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(ir,a).addScaledVector(ar,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},mr=class{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(gr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(gr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=gr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,gr):gr.fromBufferAttribute(r,t),gr.applyMatrix4(e.matrixWorld),this.expandByPoint(gr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),_r.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),_r.copy(e.boundingBox)),_r.applyMatrix4(e.matrixWorld),this.union(_r)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,gr),gr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(wr),Tr.subVectors(this.max,wr),vr.subVectors(e.a,wr),yr.subVectors(e.b,wr),br.subVectors(e.c,wr),xr.subVectors(yr,vr),Sr.subVectors(br,yr),Cr.subVectors(vr,br);let t=[0,-xr.z,xr.y,0,-Sr.z,Sr.y,0,-Cr.z,Cr.y,xr.z,0,-xr.x,Sr.z,0,-Sr.x,Cr.z,0,-Cr.x,-xr.y,xr.x,0,-Sr.y,Sr.x,0,-Cr.y,Cr.x,0];return!Or(t,vr,yr,br,Tr)||(t=[1,0,0,0,1,0,0,0,1],!Or(t,vr,yr,br,Tr))?!1:(Er.crossVectors(xr,Sr),t=[Er.x,Er.y,Er.z],Or(t,vr,yr,br,Tr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(gr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(hr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},hr=[new V,new V,new V,new V,new V,new V,new V,new V],gr=new V,_r=new mr,vr=new V,yr=new V,br=new V,xr=new V,Sr=new V,Cr=new V,wr=new V,Tr=new V,Er=new V,Dr=new V;function Or(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Dr.fromArray(e,a);let o=i.x*Math.abs(Dr.x)+i.y*Math.abs(Dr.y)+i.z*Math.abs(Dr.z),s=t.dot(Dr),c=n.dot(Dr),l=r.dot(Dr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var kr=new V,Ar=new B,jr=0,Mr=class extends It{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:jr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=wt,this.updateRanges=[],this.gpuType=ge,this.version=0,this._normalizationScale=e===void 0?void 0:Wt(e)}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Ar.fromBufferAttribute(this,t),Ar.applyMatrix3(e),this.setXY(t,Ar.x,Ar.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)kr.fromBufferAttribute(this,t),kr.applyMatrix3(e),this.setXYZ(t,kr.x,kr.y,kr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)kr.fromBufferAttribute(this,t),kr.applyMatrix4(e),this.setXYZ(t,kr.x,kr.y,kr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kr.fromBufferAttribute(this,t),kr.applyNormalMatrix(e),this.setXYZ(t,kr.x,kr.y,kr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kr.fromBufferAttribute(this,t),kr.transformDirection(e),this.setXYZ(t,kr.x,kr.y,kr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),r=this._normalize(r),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}_denormalize(e){let t=this._normalizationScale;return t===void 0?Gt(e,this.array):Math.max(e/t,-1)}_normalize(e){let t=this._normalizationScale;return t===void 0?Kt(e,this.array):Math.round(e*t)}},Nr=class extends Mr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Pr=class extends Mr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Fr=class extends Mr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Ir=new mr,Lr=new V,Rr=new V,zr=class{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Ir.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lr.subVectors(e,this.center);let t=Lr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Lr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lr.copy(e.center).add(Rr)),this.expandByPoint(Lr.copy(e.center).sub(Rr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Br=0,Vr=new gn,Hr=new Un,Ur=new V,Wr=new mr,Gr=new mr,Kr=new V,qr=class e extends It{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Br++}),this.uuid=Bt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Et(e)?Pr:Nr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new H().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Vr.makeRotationFromQuaternion(e),this.applyMatrix4(Vr),this}rotateX(e){return Vr.makeRotationX(e),this.applyMatrix4(Vr),this}rotateY(e){return Vr.makeRotationY(e),this.applyMatrix4(Vr),this}rotateZ(e){return Vr.makeRotationZ(e),this.applyMatrix4(Vr),this}translate(e,t,n){return Vr.makeTranslation(e,t,n),this.applyMatrix4(Vr),this}scale(e,t,n){return Vr.makeScale(e,t,n),this.applyMatrix4(Vr),this}lookAt(e){return Hr.lookAt(e),Hr.updateMatrix(),this.applyMatrix4(Hr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ur).negate(),this.translate(Ur.x,Ur.y,Ur.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Fr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&L(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)R(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Wr.setFromBufferAttribute(n),this.morphTargetsRelative?(Kr.addVectors(this.boundingBox.min,Wr.min),this.boundingBox.expandByPoint(Kr),Kr.addVectors(this.boundingBox.max,Wr.max),this.boundingBox.expandByPoint(Kr)):(this.boundingBox.expandByPoint(Wr.min),this.boundingBox.expandByPoint(Wr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&R(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)R(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new V,1/0);else if(e){let n=this.boundingSphere.center;if(Wr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Gr.setFromBufferAttribute(n),this.morphTargetsRelative?(Kr.addVectors(Wr.min,Gr.min),Wr.expandByPoint(Kr),Kr.addVectors(Wr.max,Gr.max),Wr.expandByPoint(Kr)):(Wr.expandByPoint(Gr.min),Wr.expandByPoint(Gr.max))}Wr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Kr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Kr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Kr.fromBufferAttribute(a,t),o&&(Ur.fromBufferAttribute(e,t),Kr.add(Ur)),r=Math.max(r,n.distanceToSquared(Kr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&R(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){R(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Mr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[],c=new Uint8Array(n.count);for(let e=0;e<n.count;e++)o[e]=new V,s[e]=new V;let l=new V,u=new V,d=new V,f=new B,p=new B,m=new B,h=new V,g=new V;function _(e,t,r){c[e]=c[t]=c[r]=1,l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),s[e].add(g),s[t].add(g),s[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new V,b=new V,x=new V,S=new V;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(s[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let e=0,t=n.count;e<t;++e)c[e]&&C(e);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Mr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new V,i=new V,a=new V,o=new V,s=new V,c=new V,l=new V,u=new V;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Kr.fromBufferAttribute(e,t),Kr.normalize(),e.setXYZ(t,Kr.x,Kr.y,Kr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Mr(a,r,i)}if(this.index===null)return L(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Jr=new V,Yr=new V,Xr=new H,Zr=class{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Jr.subVectors(n,t).cross(Yr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Jr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Xr.getNormalMatrix(e),r=this.coplanarPoint(Jr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Qr=0,$r=class extends It{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qr++}),this.uuid=Bt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new W(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ct,this.stencilZFail=Ct,this.stencilZPass=Ct,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){L(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?L(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new W().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Zr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new B().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new B().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},ei=new V,ti=new V,ni=new V,ri=new V,ii=class{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ti.copy(e).add(t).multiplyScalar(.5),ni.copy(t).sub(e).normalize(),ri.copy(this.origin).sub(ti);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ni),o=ri.dot(this.direction),s=-ri.dot(ni),c=ri.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ti).addScaledVector(ni,d),f}intersectSphere(e,t){if(e.radius<0)return null;ei.subVectors(e.center,this.origin);let n=ei.dot(this.direction),r=ei.dot(ei)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,M;if(y>=b&&y>=x?(w=s,D=u,A=p,M=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,M=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,M=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let te=S/w,ne=C/w,re=1/w,ie=T-te*D,ae=E-ne*D,oe=O-te*A,se=k-ne*A,ce=j-te*M,le=ee-ne*M,ue=ce*se-le*oe,de=ie*le-ae*ce,fe=oe*ae-se*ie;if(r){if(ue<0||de<0||fe<0)return null}else if((ue<0||de<0||fe<0)&&(ue>0||de>0||fe>0))return null;let pe=ue+de+fe;if(pe===0)return null;let me=re*(ue*D+de*A+fe*M);return(pe>0?me<0:me>0)?null:this.at(me/pe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ai=class extends $r{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},oi=new gn,si=new ii,ci=new zr,li=new V,ui=new V,di=new V,fi=new V,pi=new V,mi=new V,hi=new V,gi=new V,G=class extends Un{constructor(e=new qr,t=new ai){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){mi.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(pi.fromBufferAttribute(s,e),a?mi.addScaledVector(pi,r):mi.addScaledVector(pi.sub(t),r))}t.add(mi)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ci.copy(n.boundingSphere),ci.applyMatrix4(i),si.copy(e.ray).recast(e.near),ci.containsPoint(si.origin)===!1&&(si.intersectSphere(ci,li)===null||si.origin.distanceToSquared(li)>(e.far-e.near)**2)||(oi.copy(i).invert(),si.copy(e.ray).applyMatrix4(oi),(n.boundingBox===null||si.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,si)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=vi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=vi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=vi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=vi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function _i(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;gi.copy(s),gi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(gi);return l<n.near||l>n.far?null:{distance:l,point:gi.clone(),object:e}}function vi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ui),e.getVertexPosition(c,di),e.getVertexPosition(l,fi);let u=_i(e,t,n,r,ui,di,fi,hi);if(u){let e=new V;pr.getBarycoord(hi,ui,di,fi,e),i&&(u.uv=pr.getInterpolatedAttribute(i,s,c,l,e,new B)),a&&(u.uv1=pr.getInterpolatedAttribute(a,s,c,l,e,new B)),o&&(u.normal=pr.getInterpolatedAttribute(o,s,c,l,e,new V),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new V,materialIndex:0};pr.getNormal(ui,di,fi,t.normal),u.face=t,u.barycoord=e}return u}var yi=class extends un{constructor(e=null,t=1,n=1,r,i,a,o,s,c=ie,l=ie,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},bi=class extends Mr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},xi=new gn,Si=new gn,Ci=[],wi=new mr,Ti=new gn,Ei=new G,Di=new zr,Oi=class extends G{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new bi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Ti)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new mr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xi),wi.copy(e.boundingBox).applyMatrix4(xi),this.boundingBox.union(wi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new zr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xi),Di.copy(e.boundingSphere).applyMatrix4(xi),this.boundingSphere.union(Di)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture===null?null:e.morphTexture.clone(),this.instanceColor=e.instanceColor===null?null:e.instanceColor.clone(),this.count=e.count,this.boundingBox=e.boundingBox===null?null:e.boundingBox.clone(),this.boundingSphere=e.boundingSphere===null?null:e.boundingSphere.clone(),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Ei.geometry=this.geometry,Ei.material=this.material,Ei.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Di.copy(this.boundingSphere),Di.applyMatrix4(n),e.ray.intersectsSphere(Di)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,xi),Si.multiplyMatrices(n,xi),Ei.matrixWorld=Si,Ei.raycast(e,Ci);for(let e=0,n=Ci.length;e<n;e++){let n=Ci[e];n.instanceId=i,n.object=this,t.push(n)}Ci.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new bi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new yi(new Float32Array(r*this.count),r,this.count,Oe,ge));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ki=new zr,Ai=new B(.5,.5),ji=new V,Mi=class{constructor(e=new Zr,t=new Zr,n=new Zr,r=new Zr,i=new Zr,a=new Zr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Tt,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){return ki.center.set(0,0,0),ki.radius=.7071067811865476+Ai.distanceTo(e.center),ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ji.x=r.normal.x>0?e.max.x:e.min.x,ji.y=r.normal.y>0?e.max.y:e.min.y,ji.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ji)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ni=new gn,Pi=class e{constructor(){this.coordinateSystem=Tt,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let e=0;e<t.length;e++){let r=t[e];Ni.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[e]===void 0&&(n[e]=new Mi),n[e].setFromProjectionMatrix(Ni,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new Mi),t[r].copy(n[r]);return this._count=e._count,this}clone(){return new e().copy(this)}},Fi=class extends $r{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new W(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ii=new gn,Li=new ii,Ri=new zr,zi=new V,Bi=class extends Un{constructor(e=new qr,t=new Fi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.morphTargetInfluences=e.morphTargetInfluences===void 0?void 0:e.morphTargetInfluences.slice(),this.morphTargetDictionary=e.morphTargetDictionary===void 0?void 0:Object.assign({},e.morphTargetDictionary),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ri.copy(n.boundingSphere),Ri.applyMatrix4(r),Ri.radius+=i,e.ray.intersectsSphere(Ri)===!1)return;Ii.copy(r).invert(),Li.copy(e.ray).applyMatrix4(Ii);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);zi.fromBufferAttribute(l,n),Vi(zi,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)zi.fromBufferAttribute(l,a),Vi(zi,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Vi(e,t,n,r,i,a,o){let s=Li.distanceSqToPoint(e);if(s<n){let n=new V;Li.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Hi=class extends un{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ui=class extends un{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Wi=class extends un{constructor(e,t,n=he,r,i,a,o=ie,s=ie,c,l=Ee,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new on(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Gi=class extends Wi{constructor(e,t=he,n=301,r,i,a=ie,o=ie,s,c=Ee){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ki=class extends un{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},K=class e extends qr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Fr(c,3)),this.setAttribute(`normal`,new Fr(l,3)),this.setAttribute(`uv`,new Fr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new V;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},qi=class e extends qr{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new V,g=new V;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new Fr(o,3)),this.setAttribute(`normal`,new Fr(s,3)),this.setAttribute(`uv`,new Fr(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Ji=class e extends qr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new V,l=new B;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Fr(a,3)),this.setAttribute(`normal`,new Fr(o,3)),this.setAttribute(`uv`,new Fr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Yi=class e extends qr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Fr(u,3)),this.setAttribute(`normal`,new Fr(d,3)),this.setAttribute(`uv`,new Fr(f,2));function _(){let a=new V,_=new V,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new B,m=new V,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Xi=class e extends Yi{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Zi=class e extends qr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Fr(i,3)),this.setAttribute(`normal`,new Fr(i.slice(),3)),this.setAttribute(`uv`,new Fr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new V,r=new V,i=new V;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new V;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new V;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new V,t=new V,n=new V,r=new V,o=new B,s=new B,c=new B;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Qi=class e extends qr{constructor(e=[new B(0,-.5),new B(.5,0),new B(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=z(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new V,d=new B,f=new V,p=new V,m=new V,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:m.normalize(),s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new Fr(a,3)),this.setAttribute(`uv`,new Fr(o,2)),this.setAttribute(`normal`,new Fr(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},$i=class e extends Zi{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},ea=class e extends qr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Fr(p,3)),this.setAttribute(`normal`,new Fr(m,3)),this.setAttribute(`uv`,new Fr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},q=class e extends qr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new V,d=new V,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Fr(p,3)),this.setAttribute(`normal`,new Fr(m,3)),this.setAttribute(`uv`,new Fr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},ta=class e extends qr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new V,f=new V,p=new V;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Fr(c,3)),this.setAttribute(`normal`,new Fr(l,3)),this.setAttribute(`uv`,new Fr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function na(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(ia(i))i.isRenderTargetTexture?(L(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(ia(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function ra(e){let t={};for(let n=0;n<e.length;n++){let r=na(e[n]);for(let e in r)t[e]=r[e]}return t}function ia(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function aa(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function oa(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:U.workingColorSpace}var sa={clone:na,merge:ra},ca=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,la=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ua=class extends $r{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ca,this.fragmentShader=la,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=na(e.uniforms),this.uniformsGroups=aa(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new W().setHex(r.value);break;case`v2`:this.uniforms[n].value=new B().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new V().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new dn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new H().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new gn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},da=class extends ua{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},J=class extends $r{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new W(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new B(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},fa=class extends J{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new B(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return z(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new W(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new W(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new W(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Nt(`MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".`),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Nt(`MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".`),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},pa=class extends $r{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new B(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ma=class extends $r{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=vt,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ha=class extends $r{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ga(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function _a(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var va=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ya=class extends va{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ht,endingEnd:ht}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case gt:i=e,o=2*t-n;break;case _t:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case gt:a=e,s=2*n-t;break;case _t:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},ba=class extends va{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},xa=class extends va{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Sa=class extends va{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Ta(n,t,g,y,r);i[p]=Ca(x,o,_,b,m)}return i}};function Ca(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function wa(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Ta(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Ca(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=wa(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Ea=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ga(t,this.TimeBufferType),this.values=ga(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ga(e.times,Array),values:ga(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),_a(e.settings)&&(n.settings={inTangents:ga(e.settings.inTangents,Array),outTangents:ga(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new xa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ba(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ya(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Sa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case dt:t=this.InterpolantFactoryMethodDiscrete;break;case ft:t=this.InterpolantFactoryMethodLinear;break;case pt:t=this.InterpolantFactoryMethodSmooth;break;case mt:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return L(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return dt;case this.InterpolantFactoryMethodLinear:return ft;case this.InterpolantFactoryMethodSmooth:return pt;case this.InterpolantFactoryMethodBezier:return mt}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e;_a(this.settings)&&(Da(this.settings.inTangents,e),Da(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;_a(this.settings)&&(Oa(this.settings.inTangents,e),Oa(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(R(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(R(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){R(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){R(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Dt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){R(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===pt,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,_a(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Da(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]+=t}function Oa(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Ea.prototype.ValueTypeName=``,Ea.prototype.TimeBufferType=Float32Array,Ea.prototype.ValueBufferType=Float32Array,Ea.prototype.DefaultInterpolation=ft;var ka=class extends Ea{constructor(e,t,n){super(e,t,n)}};ka.prototype.ValueTypeName=`bool`,ka.prototype.ValueBufferType=Array,ka.prototype.DefaultInterpolation=dt,ka.prototype.InterpolantFactoryMethodLinear=void 0,ka.prototype.InterpolantFactoryMethodSmooth=void 0;var Aa=class extends Ea{constructor(e,t,n,r){super(e,t,n,r)}};Aa.prototype.ValueTypeName=`color`;var ja=class extends Ea{constructor(e,t,n,r){super(e,t,n,r)}};ja.prototype.ValueTypeName=`number`;var Ma=class extends va{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)qt.slerpFlat(i,0,a,c-o,a,c,s);return i}},Na=class extends Ea{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ma(this.times,this.values,this.getValueSize(),e)}};Na.prototype.ValueTypeName=`quaternion`,Na.prototype.InterpolantFactoryMethodSmooth=void 0;var Pa=class extends Ea{constructor(e,t,n){super(e,t,n)}};Pa.prototype.ValueTypeName=`string`,Pa.prototype.ValueBufferType=Array,Pa.prototype.DefaultInterpolation=dt,Pa.prototype.InterpolantFactoryMethodLinear=void 0,Pa.prototype.InterpolantFactoryMethodSmooth=void 0;var Fa=class extends Ea{constructor(e,t,n,r){super(e,t,n,r)}};Fa.prototype.ValueTypeName=`vector`;var Ia=class extends Un{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new W(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},La=class extends Ia{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Un.DEFAULT_UP),this.updateMatrix(),this.groundColor=new W(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Ra=new gn,za=new V,Ba=new V,Va=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new B(512,512),this.mapType=ue,this.map=null,this.mapPass=null,this.matrix=new gn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mi,this._frameExtents=new B(1,1),this._viewportCount=1,this._viewports=[new dn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;za.setFromMatrixPosition(e.matrixWorld),t.position.copy(za),Ba.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ba),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Ra.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Ra,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Ra)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ha=new V,Ua=new qt,Wa=new V,Ga=class extends Un{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new gn,this.projectionMatrix=new gn,this.projectionMatrixInverse=new gn,this.coordinateSystem=Tt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ha,Ua,Wa),Wa.x===1&&Wa.y===1&&Wa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ha,Ua,Wa.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ha,Ua,Wa),Wa.x===1&&Wa.y===1&&Wa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ha,Ua,Wa.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ka=new V,qa=new B,Ja=new B,Ya=class extends Ga{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=zt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Rt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zt*2*Math.atan(Math.tan(Rt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ka.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ka.x,Ka.y).multiplyScalar(-e/Ka.z),Ka.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ka.x,Ka.y).multiplyScalar(-e/Ka.z)}getViewSize(e,t){return this.getViewBounds(e,qa,Ja),t.subVectors(Ja,qa)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Rt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Xa=class extends Va{constructor(){super(new Ya(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=zt*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Za=class extends Ia{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(Un.DEFAULT_UP),this.updateMatrix(),this.target=new Un,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new Xa}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Qa=class extends Va{constructor(){super(new Ya(90,1,.5,500)),this.isPointLightShadow=!0}},$a=class extends Ia{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Qa}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},eo=class extends Ga{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},to=class extends Va{constructor(){super(new eo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},no=class extends Ia{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Un.DEFAULT_UP),this.updateMatrix(),this.target=new Un,this.shadow=new to}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ro=-90,io=1,ao=class extends Un{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ya(ro,io,e,t);r.layers=this.layers,this.add(r);let i=new Ya(ro,io,e,t);i.layers=this.layers,this.add(i);let a=new Ya(ro,io,e,t);a.layers=this.layers,this.add(a);let o=new Ya(ro,io,e,t);o.layers=this.layers,this.add(o);let s=new Ya(ro,io,e,t);s.layers=this.layers,this.add(s);let c=new Ya(ro,io,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},oo=class extends Ya{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},so=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=co.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function co(){this._document.hidden===!1&&this.reset()}var lo=`\\[\\]\\.:\\/`,uo=RegExp(`[\\[\\]\\.:\\/]`,`g`),fo=`[^\\[\\]\\.:\\/]`,po=`[^`+lo.replace(`\\.`,``)+`]`,mo=`((?:WC+[\\/:])*)`.replace(`WC`,fo),ho=`(WCOD+)?`.replace(`WCOD`,po),go=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,fo),_o=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,fo),vo=RegExp(`^`+mo+ho+go+_o+`$`),yo=[`material`,`materials`,`bones`,`map`],bo=class{constructor(e,t,n){let r=n||xo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},xo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(uo,``)}static parseTrackName(e){let t=vo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);yo.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){L(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){R(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){R(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){R(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){R(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){R(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){R(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){R(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;R(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){R(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){R(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xo.Composite=bo,xo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},xo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},xo.prototype.GetterByBindingType=[xo.prototype._getValue_direct,xo.prototype._getValue_array,xo.prototype._getValue_arrayElement,xo.prototype._getValue_toArray],xo.prototype.SetterByBindingTypeAndVersioning=[[xo.prototype._setValue_direct,xo.prototype._setValue_direct_setNeedsUpdate,xo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xo.prototype._setValue_array,xo.prototype._setValue_array_setNeedsUpdate,xo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xo.prototype._setValue_arrayElement,xo.prototype._setValue_arrayElement_setNeedsUpdate,xo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xo.prototype._setValue_fromArray,xo.prototype._setValue_fromArray_setNeedsUpdate,xo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function So(e,t,n,r){let i=Co(r);switch(n){case Ce:return e*t;case Oe:return e*t/i.components*i.byteLength;case ke:return e*t/i.components*i.byteLength;case Ae:return e*t*2/i.components*i.byteLength;case je:return e*t*2/i.components*i.byteLength;case we:return e*t*3/i.components*i.byteLength;case Te:return e*t*4/i.components*i.byteLength;case Me:return e*t*4/i.components*i.byteLength;case Ne:case Pe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Fe:case Ie:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Le:case ze:return Math.max(e,16)*Math.max(t,8)/4;case N:case Re:return Math.max(e,8)*Math.max(t,8)/2;case P:case Be:case I:case Ve:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case F:case He:case Ue:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case We:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ge:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Ke:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case qe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Je:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Ye:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Xe:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Ze:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Qe:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case $e:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case et:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case tt:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case nt:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case rt:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case it:case at:case ot:return Math.ceil(e/4)*Math.ceil(t/4)*16;case st:case ct:return Math.ceil(e/4)*Math.ceil(t/4)*8;case lt:case ut:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Co(e){switch(e){case ue:case de:return{byteLength:1,components:1};case pe:case fe:case _e:return{byteLength:2,components:1};case ve:case ye:return{byteLength:2,components:4};case he:case me:case ge:return{byteLength:4,components:1};case xe:case Se:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`187`}})),typeof window<`u`&&(window.__THREE__?L(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`187`);function wo(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function To(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Y={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},X={common:{diffuse:{value:new W(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new H},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new H}},envmap:{envMap:{value:null},envMapRotation:{value:new H},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new H}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new H}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new H},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new H},normalScale:{value:new B(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new H},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new H}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new H}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new H}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new W(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new W(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0},uvTransform:{value:new H}},sprite:{diffuse:{value:new W(16777215)},opacity:{value:1},center:{value:new B(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new H},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0}}},Eo={basic:{uniforms:ra([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:Y.meshbasic_vert,fragmentShader:Y.meshbasic_frag},lambert:{uniforms:ra([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new W(0)},envMapIntensity:{value:1}}]),vertexShader:Y.meshlambert_vert,fragmentShader:Y.meshlambert_frag},phong:{uniforms:ra([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new W(0)},specular:{value:new W(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Y.meshphong_vert,fragmentShader:Y.meshphong_frag},standard:{uniforms:ra([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new W(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag},toon:{uniforms:ra([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new W(0)}}]),vertexShader:Y.meshtoon_vert,fragmentShader:Y.meshtoon_frag},matcap:{uniforms:ra([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:Y.meshmatcap_vert,fragmentShader:Y.meshmatcap_frag},points:{uniforms:ra([X.points,X.fog]),vertexShader:Y.points_vert,fragmentShader:Y.points_frag},dashed:{uniforms:ra([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Y.linedashed_vert,fragmentShader:Y.linedashed_frag},depth:{uniforms:ra([X.common,X.displacementmap]),vertexShader:Y.depth_vert,fragmentShader:Y.depth_frag},normal:{uniforms:ra([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:Y.meshnormal_vert,fragmentShader:Y.meshnormal_frag},sprite:{uniforms:ra([X.sprite,X.fog]),vertexShader:Y.sprite_vert,fragmentShader:Y.sprite_frag},background:{uniforms:{uvTransform:{value:new H},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Y.background_vert,fragmentShader:Y.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new H}},vertexShader:Y.backgroundCube_vert,fragmentShader:Y.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Y.cube_vert,fragmentShader:Y.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Y.equirect_vert,fragmentShader:Y.equirect_frag},distance:{uniforms:ra([X.common,X.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Y.distance_vert,fragmentShader:Y.distance_frag},shadow:{uniforms:ra([X.lights,X.fog,{color:{value:new W(0)},opacity:{value:1}}]),vertexShader:Y.shadow_vert,fragmentShader:Y.shadow_frag}};Eo.physical={uniforms:ra([Eo.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new H},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new H},clearcoatNormalScale:{value:new B(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new H},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new H},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new H},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new H},sheen:{value:0},sheenColor:{value:new W(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new H},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new H},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new H},transmissionSamplerSize:{value:new B},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new H},attenuationDistance:{value:0},attenuationColor:{value:new W(0)},specularColor:{value:new W(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new H},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new H},anisotropyVector:{value:new B},anisotropyMap:{value:null},anisotropyMapTransform:{value:new H}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag};var Do={r:0,b:0,g:0},Oo=new gn,ko=new H;ko.set(-1,0,0,0,1,0,0,0,1);function Ao(e,t,n,r,i,a){let o=new W(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new G(new K(1,1,1),new ua({name:`BackgroundCubeMaterial`,uniforms:na(Eo.backgroundCube.uniforms),vertexShader:Eo.backgroundCube.vertexShader,fragmentShader:Eo.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Oo.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(ko),l.material.toneMapped=U.getTransfer(i.colorSpace)!==St,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new G(new ea(2,2),new ua({name:`BackgroundMaterial`,uniforms:na(Eo.background.uniforms),vertexShader:Eo.background.vertexShader,fragmentShader:Eo.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=U.getTransfer(i.colorSpace)!==St,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Do,oa(e)),n.buffers.color.setClear(Do.r,Do.g,Do.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function jo(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Mo(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function No(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(L(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&L(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&L(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Po(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Zr,s=new H,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Fo=class extends pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Hi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new K(5,5,5),i=new ua({name:`CubemapFromEquirect`,uniforms:na(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new G(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=se),new ao(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},Io=256,Lo=3,Ro=20,zo=256,Bo=16,Vo=3,Ho=new V,Uo=new W,Wo=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new ao(1,10,null),this._boxMesh=new G(new K(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Ho}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(Uo));let h=new ao(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Io,Ut(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?Io:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Go(e,!1,!1),n=Math.log2(e)-Lo;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Go(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zo()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Xo()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=qo(),this._integrationMaterial=Jo());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/Bo);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-Vo)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(zo*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Yo());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function Go(e,t,n){return new Fo(e,{minFilter:le,generateMipmaps:t,type:_e,colorSpace:bt,depthBuffer:n})}function Ko(e,t,n){return new ua({name:e,uniforms:t,vertexShader:Y.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function qo(){return Ko(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${zo}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Jo(){return Ko(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Bo}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Yo(){return Ko(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Ro}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Xo(){return Ko(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Zo(){return Ko(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Qo(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Fo(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Wo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Wo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function $o(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Nt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function es(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?Pr:Nr)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function ts(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function ns(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:R(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function rs(e,t,n){let r=new WeakMap,i=new dn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new mn(h,p,m,u);g.type=ge,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new B(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function is(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var as={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function os(e,t,n,r,i,a){let o=new pn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=null,u=new qr;u.setAttribute(`position`,new Fr([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new Fr([0,2,0,0,2,0],2));let d=new da({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new G(u,d),p=new eo(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new pn(t,n,{type:_e,depthBuffer:!1,stencilBuffer:!1}),c=new pn(t,n,{type:_e,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&y.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&l===null&&(l=new Wi(t,n),a===!0&&(l.format=De,l.type=be)),o.dispose(),o.depthTexture=r?l:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<y.length;e++){let i=y[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(l)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},U.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=as[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),u.dispose(),d.dispose()}}var ss=new un,cs=new Wi(1,1),ls=new Gi(1),us=new mn,ds=new hn,fs=new Hi,ps=[],ms=[],hs=new Float32Array(16),gs=new Float32Array(9),_s=new Float32Array(4);function vs(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ps[i];if(a===void 0&&(a=new Float32Array(i),ps[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function ys(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function bs(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function xs(e,t){let n=ms[t];n===void 0&&(n=new Int32Array(t),ms[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Ss(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Cs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ys(n,t))return;e.uniform2fv(this.addr,t),bs(n,t)}}function ws(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(ys(n,t))return;e.uniform3fv(this.addr,t),bs(n,t)}}function Ts(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ys(n,t))return;e.uniform4fv(this.addr,t),bs(n,t)}}function Es(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ys(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),bs(n,t)}else{if(ys(n,r))return;_s.set(r),e.uniformMatrix2fv(this.addr,!1,_s),bs(n,r)}}function Ds(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ys(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),bs(n,t)}else{if(ys(n,r))return;gs.set(r),e.uniformMatrix3fv(this.addr,!1,gs),bs(n,r)}}function Os(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ys(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),bs(n,t)}else{if(ys(n,r))return;hs.set(r),e.uniformMatrix4fv(this.addr,!1,hs),bs(n,r)}}function ks(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function As(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ys(n,t))return;e.uniform2iv(this.addr,t),bs(n,t)}}function js(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ys(n,t))return;e.uniform3iv(this.addr,t),bs(n,t)}}function Ms(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ys(n,t))return;e.uniform4iv(this.addr,t),bs(n,t)}}function Ns(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Ps(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ys(n,t))return;e.uniform2uiv(this.addr,t),bs(n,t)}}function Fs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ys(n,t))return;e.uniform3uiv(this.addr,t),bs(n,t)}}function Is(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ys(n,t))return;e.uniform4uiv(this.addr,t),bs(n,t)}}function Ls(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function Rs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?Ls(cs):ss,n.setTexture2D(t||a,i)}function zs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ds,i)}function Bs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?Ls(ls):fs,n.setTextureCube(t||a,i)}function Vs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||us,i)}function Hs(e){switch(e){case 5126:return Ss;case 35664:return Cs;case 35665:return ws;case 35666:return Ts;case 35674:return Es;case 35675:return Ds;case 35676:return Os;case 5124:case 35670:return ks;case 35667:case 35671:return As;case 35668:case 35672:return js;case 35669:case 35673:return Ms;case 5125:return Ns;case 36294:return Ps;case 36295:return Fs;case 36296:return Is;case 35678:case 36198:case 36298:case 36306:case 35682:return Rs;case 35679:case 36299:case 36307:return zs;case 35680:case 36300:case 36308:case 36293:return Bs;case 36289:case 36303:case 36311:case 36292:return Vs}}function Us(e,t){e.uniform1fv(this.addr,t)}function Ws(e,t){let n=vs(t,this.size,2);e.uniform2fv(this.addr,n)}function Gs(e,t){let n=vs(t,this.size,3);e.uniform3fv(this.addr,n)}function Ks(e,t){let n=vs(t,this.size,4);e.uniform4fv(this.addr,n)}function qs(e,t){let n=vs(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Js(e,t){let n=vs(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Ys(e,t){let n=vs(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Xs(e,t){e.uniform1iv(this.addr,t)}function Zs(e,t){e.uniform2iv(this.addr,t)}function Qs(e,t){e.uniform3iv(this.addr,t)}function $s(e,t){e.uniform4iv(this.addr,t)}function ec(e,t){e.uniform1uiv(this.addr,t)}function tc(e,t){e.uniform2uiv(this.addr,t)}function nc(e,t){e.uniform3uiv(this.addr,t)}function rc(e,t){e.uniform4uiv(this.addr,t)}function ic(e,t,n){let r=this.cache,i=t.length,a=xs(n,i);ys(r,a)||(e.uniform1iv(this.addr,a),bs(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Ls(cs):ss;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function ac(e,t,n){let r=this.cache,i=t.length,a=xs(n,i);ys(r,a)||(e.uniform1iv(this.addr,a),bs(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ds,a[e])}function oc(e,t,n){let r=this.cache,i=t.length,a=xs(n,i);ys(r,a)||(e.uniform1iv(this.addr,a),bs(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?Ls(ls):fs;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function sc(e,t,n){let r=this.cache,i=t.length,a=xs(n,i);ys(r,a)||(e.uniform1iv(this.addr,a),bs(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||us,a[e])}function cc(e){switch(e){case 5126:return Us;case 35664:return Ws;case 35665:return Gs;case 35666:return Ks;case 35674:return qs;case 35675:return Js;case 35676:return Ys;case 5124:case 35670:return Xs;case 35667:case 35671:return Zs;case 35668:case 35672:return Qs;case 35669:case 35673:return $s;case 5125:return ec;case 36294:return tc;case 36295:return nc;case 36296:return rc;case 35678:case 36198:case 36298:case 36306:case 35682:return ic;case 35679:case 36299:case 36307:return ac;case 35680:case 36300:case 36308:case 36293:return oc;case 36289:case 36303:case 36311:case 36292:return sc}}var lc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Hs(t.type)}},uc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=cc(t.type)}},dc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},fc=/(\w+)(\])?(\[|\.)?/g;function pc(e,t){e.seq.push(t),e.map[t.id]=t}function mc(e,t,n){let r=e.name,i=r.length;for(fc.lastIndex=0;;){let a=fc.exec(r),o=fc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){pc(n,l===void 0?new lc(s,e,t):new uc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new dc(s),pc(n,e)),n=e}}}var hc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);mc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function gc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var _c=37297,vc=0;function yc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var bc=new H;function xc(e){U._getMatrix(bc,U.workingColorSpace,e);let t=`mat3( ${bc.elements.map(e=>e.toFixed(4))} )`;switch(U.getTransfer(e)){case xt:return[t,`LinearTransferOETF`];case St:return[t,`sRGBTransferOETF`];default:return L(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Sc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+yc(e.getShaderSource(t),r)}return i}function Cc(e,t){let n=xc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var wc={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Tc(e,t){let n=wc[t];return n===void 0?(L(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Ec=new V;function Dc(){return U.getLuminanceCoefficients(Ec),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Ec.x.toFixed(4)}, ${Ec.y.toFixed(4)}, ${Ec.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Oc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(jc).join(`
`)}function kc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Ac(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function jc(e){return e!==``}function Mc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Nc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Pc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fc(e){return e.replace(Pc,Ic)}function Ic(e,t){let n=Y[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return Fc(n)}var Lc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rc(e){return e.replace(Lc,zc)}function zc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Bc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Vc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Hc(e){return Vc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Uc={302:`ENVMAP_MODE_REFRACTION`};function Wc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Uc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Gc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Kc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Gc[e.combine]||`ENVMAP_BLENDING_NONE`}function qc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Hc(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=Wc(n),d=Kc(n),f=Oc(n),p=kc(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(jc).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter(jc).join(`
`),g.length>0&&(g+=`
`)):(h=[Bc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(jc).join(`
`),g=[Bc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Y.tonemapping_pars_fragment,n.toneMapping===0?``:Tc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Y.colorspace_pars_fragment,Cc(`linearToOutputTexel`,n.outputColorSpace),Dc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(jc).join(`
`)),o=Fc(o),o=Mc(o,n),o=Nc(o,n),s=Fc(s),s=Mc(s,n),s=Nc(s,n),o=Rc(o),s=Rc(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=gc(i,i.VERTEX_SHADER,v),x=gc(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Sc(i,b,`vertex`),n=Sc(i,x,`fragment`);R(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):L(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new hc(i,m),w=Ac(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,_c)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=vc++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var Jc=0,Yc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Xc(e),t.set(e,n)),n}},Xc=class{constructor(e){this.id=Jc++,this.code=e,this.usedTimes=0}};function Zc(e){return e===1030||e===37490||e===36285}function Qc(e,t,n,r,i,a){let o=new Dn,s=new Yc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function p(e){return c.add(e),e===0?`uv`:`uv${e}`}function m(i,o,l,u,m,h){let g=u.fog,_=m.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=f[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&L(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,D,O,k;if(x){let e=Eo[x];E=e.vertexShader,D=e.fragmentShader}else{E=i.vertexShader,D=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let A=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),ee=m.isInstancedMesh===!0,M=m.isBatchedMesh===!0,te=!!i.map,ne=!!i.matcap,re=!!b,ie=re&&b.isPMREMTexture===!0,ae=!!i.aoMap,oe=!!i.lightMap,se=!!i.bumpMap&&i.wireframe===!1,ce=!!i.normalMap,le=!!i.displacementMap,ue=!!i.emissiveMap,de=!!i.metalnessMap,fe=!!i.roughnessMap,pe=i.anisotropy>0,me=i.clearcoat>0,he=i.diffuseRoughness>0,ge=i.dispersion>0,_e=i.retroreflectivity>0,ve=i.iridescence>0,ye=i.sheen>0,be=i.transmission>0,xe=pe&&!!i.anisotropyMap,Se=me&&!!i.clearcoatMap,Ce=me&&!!i.clearcoatNormalMap,we=me&&!!i.clearcoatRoughnessMap,Te=he&&!!i.diffuseRoughnessMap,Ee=ve&&!!i.iridescenceMap,De=ve&&!!i.iridescenceThicknessMap,Oe=ye&&!!i.sheenColorMap,ke=ye&&!!i.sheenRoughnessMap,Ae=!!i.specularMap,je=!!i.specularColorMap,Me=!!i.specularIntensityMap,Ne=be&&!!i.transmissionMap,Pe=be&&!!i.thicknessMap,Fe=!!i.gradientMap,Ie=!!i.alphaMap,N=i.alphaTest>0,Le=!!i.alphaHash,Re=!!i.extensions,ze=0;i.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ze=e.toneMapping);let P=ie?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,Be={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:D,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:M,batchingColor:M&&m._colorsTexture!==null,instancing:ee,instancingColor:ee&&m.instanceColor!==null,instancingMorph:ee&&m.morphTexture!==null,outputColorSpace:A===null?e.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:U.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:ne,envMap:re,envMapMode:re&&b.mapping,envMapPMREM:ie,envMapMaxLod:ie?P.length-1:null,envMapSize:ie?P[0].width:null,aoMap:ae,lightMap:oe,bumpMap:se,normalMap:ce,displacementMap:le,emissiveMap:ue,normalMapObjectSpace:ce&&i.normalMapType===1,normalMapTangentSpace:ce&&i.normalMapType===0,packedNormalMap:ce&&i.normalMapType===0&&Zc(i.normalMap.format),metalnessMap:de,roughnessMap:fe,anisotropy:pe,anisotropyMap:xe,clearcoat:me,clearcoatMap:Se,clearcoatNormalMap:Ce,clearcoatRoughnessMap:we,diffuseRoughness:he,diffuseRoughnessMap:Te,dispersion:ge,retroreflection:_e,iridescence:ve,iridescenceMap:Ee,iridescenceThicknessMap:De,sheen:ye,sheenColorMap:Oe,sheenRoughnessMap:ke,specularMap:Ae,specularColorMap:je,specularIntensityMap:Me,transmission:be,transmissionMap:Ne,thicknessMap:Pe,gradientMap:Fe,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ie,alphaTest:N,alphaHash:Le,combine:i.combine,mapUv:te&&p(i.map.channel),aoMapUv:ae&&p(i.aoMap.channel),lightMapUv:oe&&p(i.lightMap.channel),bumpMapUv:se&&p(i.bumpMap.channel),normalMapUv:ce&&p(i.normalMap.channel),displacementMapUv:le&&p(i.displacementMap.channel),emissiveMapUv:ue&&p(i.emissiveMap.channel),metalnessMapUv:de&&p(i.metalnessMap.channel),roughnessMapUv:fe&&p(i.roughnessMap.channel),anisotropyMapUv:xe&&p(i.anisotropyMap.channel),clearcoatMapUv:Se&&p(i.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&p(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&p(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:Te&&p(i.diffuseRoughnessMap.channel),iridescenceMapUv:Ee&&p(i.iridescenceMap.channel),iridescenceThicknessMapUv:De&&p(i.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&p(i.sheenColorMap.channel),sheenRoughnessMapUv:ke&&p(i.sheenRoughnessMap.channel),specularMapUv:Ae&&p(i.specularMap.channel),specularColorMapUv:je&&p(i.specularColorMap.channel),specularIntensityMapUv:Me&&p(i.specularIntensityMap.channel),transmissionMapUv:Ne&&p(i.transmissionMap.channel),thicknessMapUv:Pe&&p(i.thicknessMap.channel),alphaMapUv:Ie&&p(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(ce||pe),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!_.attributes.uv&&(te||Ie),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&ce===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:ze,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&U.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ue&&i.emissiveMap.isVideoTexture===!0&&U.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Re&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Re&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function h(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(g(n,t),_(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function g(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function _(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.diffuseRoughness&&o.enable(25),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function v(e){let t=f[e.type],n;if(t){let e=Eo[t];n=sa.clone(e.uniforms)}else n=e.uniforms;return n}function y(t,n){let r=u.get(n);return r===void 0?(r=new qc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function b(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function x(e){s.remove(e)}function S(){s.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:y,releaseProgram:b,releaseShaderCache:x,programs:l,dispose:S}}function $c(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function el(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function tl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function nl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||el),r.length>1&&r.sort(t||tl),i.length>1&&i.sort(t||tl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function rl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new nl,e.set(t,[i])):n>=r.length?(i=new nl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function il(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new V,color:new W};break;case`SpotLight`:n={position:new V,direction:new V,color:new W,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new V,color:new W,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new V,skyColor:new W,groundColor:new W};break;case`RectAreaLight`:n={color:new W,position:new V,halfWidth:new V,halfHeight:new V}}return e[t.id]=n,n}}}function al(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ol=0;function sl(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function cl(e){let t=new il,n=al(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new V);let i=new V,a=new gn,o=new gn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(sl);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=ol++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function ll(e){let t=new cl(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function ul(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new ll(e),t.set(n,[a])):r>=i.length?(a=new ll(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var dl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fl=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,pl=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],ml=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],hl=new gn,gl=new V,_l=new V;function vl(e,t,n){let r=new Mi,i=new B,a=new B,o=new dn,s=new ma,c=new ha,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new ua({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new B},radius:{value:4}},vertexShader:dl,fragmentShader:fl}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new qr;m.setAttribute(`position`,new Mr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new G(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(L(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){L(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){L(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new pn(i.x,i.y,{format:Ae,type:_e,minFilter:se,magFilter:se,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Wi(i.x,i.y,ge),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Ee,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ie,d.map.depthTexture.magFilter=ie}else l.isPointLight?(d.map=new Fo(i.x),d.map.depthTexture=new Gi(i.x,he)):(d.map=new pn(i.x,i.y),d.map.depthTexture=new Wi(i.x,i.y,he)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Ee,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=se,d.map.depthTexture.magFilter=se):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ie,d.map.depthTexture.magFilter=ie);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let _=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),gl.setFromMatrixPosition(l.matrixWorld),e.position.copy(gl),_l.copy(e.position),_l.add(pl[t]),e.up.copy(ml[t]),e.lookAt(_l),e.updateMatrixWorld(),n.makeTranslation(-gl.x,-gl.y,-gl.z),hl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(hl,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,_,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new pn(i.x,i.y,{format:Ae,type:_e}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=y(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)b(l[e],i,a,o,s,c)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function yl(e,t){function n(){let t=!1,n=new dn,r=null,i=new dn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?de(e.DEPTH_TEST):fe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Ft[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?de(e.STENCIL_TEST):fe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c={},l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,te=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),M=te>=2):(te=parseFloat(/^WebGL (\d)/.exec(ne)[1]),M=te>=1);let re=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),se=new dn().fromArray(ae),ce=new dn().fromArray(oe);function le(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ue={};ue[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),de(e.DEPTH_TEST),o.setFunc(3),be(!1),xe(1),de(e.CULL_FACE),ve(0);function de(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function fe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function pe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function me(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function he(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ge={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ge[103]=e.MIN,ge[104]=e.MAX;let _e={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ve(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(fe(e.BLEND),g=!1);else if(g===!1&&(de(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:R(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:R(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:R(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:R(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ge[n],ge[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(_e[r],_e[i],_e[o],_e[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ye(t,n){t.side===2?fe(e.CULL_FACE):de(e.CULL_FACE);let r=t.side===1;n&&(r=!r),be(r),t.blending===1&&t.transparent===!1?ve(0):ve(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Ce(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?de(e.SAMPLE_ALPHA_TO_COVERAGE):fe(e.SAMPLE_ALPHA_TO_COVERAGE)}function be(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function xe(t){t===0?fe(e.CULL_FACE):(de(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function Se(t){t!==k&&(M&&e.lineWidth(t),k=t)}function Ce(t,n,r){t?(de(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):fe(e.POLYGON_OFFSET_FILL)}function we(t){t?de(e.SCISSOR_TEST):fe(e.SCISSOR_TEST)}function Te(t){t===void 0&&(t=e.TEXTURE0+ee-1),re!==t&&(e.activeTexture(t),re=t)}function Ee(t,n,r){r===void 0&&(r=re===null?e.TEXTURE0+ee-1:re);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(re!==r&&(e.activeTexture(r),re=r),e.bindTexture(t,n||ue[t]),i.type=t,i.texture=n)}function De(){let t=ie[re];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Oe(){try{e.compressedTexImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function ke(){try{e.compressedTexImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ae(){try{e.texSubImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function je(){try{e.texSubImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ne(){try{e.compressedTexSubImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Pe(){try{e.texStorage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Fe(){try{e.texStorage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ie(){try{e.texImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function N(){try{e.texImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Le(t){return d[t]===void 0?e.getParameter(t):d[t]}function Re(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function ze(t){se.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),se.copy(t))}function P(t){ce.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ce.copy(t))}function Be(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function F(t,n,r){let i=l.get(n).get(t);c[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),c[i]=r)}function I(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},re=null,ie={},f={},c={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,se.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:de,disable:fe,bindFramebuffer:pe,drawBuffers:me,useProgram:he,setBlending:ve,setMaterial:ye,setFlipSided:be,setCullFace:xe,setLineWidth:Se,setPolygonOffset:Ce,setScissorTest:we,activeTexture:Te,bindTexture:Ee,unbindTexture:De,compressedTexImage2D:Oe,compressedTexImage3D:ke,texImage2D:Ie,texImage3D:N,pixelStorei:Re,getParameter:Le,updateUBOMapping:Be,uniformBlockBinding:F,texStorage2D:Pe,texStorage3D:Fe,texSubImage2D:Ae,texSubImage3D:je,compressedTexSubImage2D:Me,compressedTexSubImage3D:Ne,scissor:ze,viewport:P,reset:I}}function bl(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new B,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):Ot(`canvas`)}function v(e,t,n){let r=1,i=I(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=_(n,a));let o=t?_(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),L(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&L(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];L(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||L(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?xt:U.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,L(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function E(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function D(e){k(e.target)}function O(e){A(e.target)}function k(e){e.removeEventListener(`dispose`,D),E(e),ee(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function A(e){e.removeEventListener(`dispose`,O),E(e),ue(e)}function j(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?A(t):k(t))}m.clear(),d.clear()}function ee(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&M(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function M(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function ue(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&k(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let de=0;function fe(){de=0}function pe(){return de}function me(e){de=e}function he(){let e=de;return e>=i.maxTextures&&L(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),de+=1,e}function ge(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function _e(t,i){let a=r.get(t);if(t.isVideoTexture&&Be(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)L(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)L(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ke(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ve(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ke(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function ye(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ke(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function be(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?Ae(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let xe={[te]:e.REPEAT,[ne]:e.CLAMP_TO_EDGE,[re]:e.MIRRORED_REPEAT},Se={[ie]:e.NEAREST,[ae]:e.NEAREST_MIPMAP_NEAREST,[oe]:e.NEAREST_MIPMAP_LINEAR,[se]:e.LINEAR,[ce]:e.LINEAR_MIPMAP_NEAREST,[le]:e.LINEAR_MIPMAP_LINEAR},Ce={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function we(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&L(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,xe[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,xe[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,xe[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,Se[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,Se[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,Ce[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function Te(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,D),T(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ge(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&M(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function Ee(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Oe(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=Ee(n.start,r.width,4),c=Ee(t.start,r.width,4);n.start<=i+1&&a===c&&Ee(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ke(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=Te(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=U.getPrimaries(U.workingColorSpace),r=o.colorSpace===``?null:U.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=v(o.image,!1,i.maxTextureSize);t=F(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=S(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);we(c,o);let h,g=o.mipmaps,_=o.isVideoTexture!==!0,x=f.__version===void 0||l===!0,T=u.dataReady,E=w(o,t);if(o.isDepthTexture)m=C(o.format===De,o.type),x&&(_?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else _?(x&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&Oe(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){_&&x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(_){if(T){if(o.layerUpdates.size>0){let t=So(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{_&&x&&n.texStorage2D(e.TEXTURE_2D,E,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(_){if(x&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=So(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)_?(x&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(x){if(_)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&x){let t=I(g[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],_?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(_){if(x){let r=I(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);y(o)&&o.mipmapsAutoUpdate===!0&&b(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function Ae(t,o,s){if(o.image.length!==6)return;let c=Te(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=U.getPrimaries(U.workingColorSpace),r=o.colorSpace===``?null:U.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=F(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),_=a.convert(o.type),x=S(o.internalFormat,g,_,o.normalized,o.colorSpace),T=o.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,O=w(o,h);we(e.TEXTURE_CUBE_MAP,o);let k;if(o.isDepthTexture){if(x=C(o.format===De,o.type),E){if(T)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,x,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,h.width,h.height,0,g,_,null)}}else if(f){T&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,h.width,h.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,g,_,i.data):g===null?L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,T&&E){k.length>0&&O++;let t=I(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,g,_,i.data)}}else{T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,g,_,m[t]);for(let r=0;r<k.length;r++){let i=k[r];T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,g,_,i.image[t])}}}y(o)&&o.mipmapsAutoUpdate===!0&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function je(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=S(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),P(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,ze(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Me(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;P(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ze(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ze(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=S(o.internalFormat,c,l,o.normalized,o.colorSpace);P(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ze(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ze(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ne(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?be(i.depthTexture,0):_e(i.depthTexture,0);let u=c.__webglTexture,d=ze(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)P(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)P(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Pe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Ne(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?Ne(i.__webglFramebuffer[0],t,0):Ne(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Me(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Me(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Fe(t,n,i){let a=r.get(t);n!==void 0&&je(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Pe(t)}function Ie(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,O),T(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&P(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=S(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=ze(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),Me(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),we(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)je(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else je(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)?b(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),we(c,a),je(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),y(a)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),we(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)je(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else je(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)?b(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&Pe(t)}function N(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)&&a.mipmapsAutoUpdate===!0){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}}let Le=[];function Re(t){if(t.samples>0){if(P(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Le.length=0,Le.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&Le.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Le))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function ze(e){return Math.min(i.maxSamples,e.samples)}function P(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Be(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function F(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(U.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&L(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):R(`WebGLTextures: Unsupported texture color space:`,n)),t}function I(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=he,this.resetTextureUnits=fe,this.getTextureUnits=pe,this.setTextureUnits=me,this.setTexture2D=_e,this.setTexture2DArray=ve,this.setTexture3D=ye,this.setTextureCube=be,this.rebindTextures=Fe,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=je,this.useMultisampledRTT=P,this.dispose=j}function xl(e,t){function n(n,r=``){let i,a=U.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Sl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cl=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,wl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ki(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ua({vertexShader:Sl,fragmentShader:Cl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new G(new ea(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Tl=class extends It{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new wl,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new B,C=null,w=null,T=new Ya;T.viewport=new dn;let E=new Ya;E.viewport=new dn;let D=[T,E],O=new oo,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Kn,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Kn,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Kn,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,M);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,ae.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&L(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&L(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,M),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?De:Ee,a=_.stencil?be:he);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new pn(d.textureWidth,d.textureHeight,{format:Te,type:ue,depthTexture:new Wi(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new pn(f.framebufferWidth,f.framebufferHeight,{format:Te,type:ue,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ae.setContext(r),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function M(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}function te(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;te(O,i);for(let e=0;e<a.length;e++)te(a[e],i);O.projectionMatrix.copy(T.projectionMatrix),O.projectionMatrixInverse.copy(T.projectionMatrixInverse),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),ne(e,O,i)};function ne(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=zt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let re=null;function ie(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Ya,o.layers.enable(n),o.viewport=new dn,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Ki,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}re&&re(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let ae=new wo;ae.setAnimationLoop(ie),this.setAnimationLoop=function(e){re=e},this.dispose=function(){}}},El=new gn,Dl=new H;Dl.set(-1,0,0,0,1,0,0,0,1);function Ol(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,oa(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(El.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Dl),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function kl(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?L(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):L(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var Al=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),jl=null;function Ml(){return jl===null&&(jl=new yi(Al,16,16,Ae,_e),jl.name=`DFG_LUT`,jl.minFilter=se,jl.magFilter=se,jl.wrapS=ne,jl.wrapT=ne,jl.generateMipmaps=!1,jl.needsUpdate=!0),jl}var Nl=class{constructor(e={}){let{canvas:t=kt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=ue}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Me,je,ke]),g=new Set([ue,he,pe,be,ve,ye]),_=new Uint32Array(4),v=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=yt;let j=0,ee=0,M=null,te=-1,ne=null,re=new dn,ie=new dn,ae=null,oe=new W(0),se=0,ce=t.width,de=t.height,fe=1,me=null,ge=null,xe=new dn(0,0,ce,de),Se=new dn(0,0,ce,de),Ce=!1,we=new Mi,Te=new Pi,Ee=!1,De=!1,Oe=new gn,Ae=new V,Ne=new dn,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Fe=!1;function Ie(){return M===null?fe:1}let N=n;function Le(e,n){return t.getContext(e,n)}let Re,ze,P,Be,F,I,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e,et,tt,nt,rt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,ot,!1),t.addEventListener(`webglcontextrestored`,st,!1),t.addEventListener(`webglcontextcreationerror`,ct,!1),N===null){let t=`webgl2`;if(N=Le(t,e),N===null)throw Le(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}it()}catch(e){throw t.removeEventListener(`webglcontextlost`,ot,!1),t.removeEventListener(`webglcontextrestored`,st,!1),t.removeEventListener(`webglcontextcreationerror`,ct,!1),R(`WebGLRenderer: `+e.message),e}function it(){Re=new $o(N),Re.init(),tt=new xl(N,Re),ze=new No(N,Re,e,tt),P=new yl(N,Re),ze.reversedDepthBuffer&&d&&P.buffers.depth.setReversed(!0),O=N.createFramebuffer(),k=N.createFramebuffer(),A=N.createFramebuffer(),Be=new ns(N),F=new $c,I=new bl(N,Re,P,F,ze,tt,Be),Ve=new Qo(T),He=new To(N),nt=new jo(N,He),Ue=new es(N,He,Be,nt),We=new is(N,Ue,He,nt,Be),Qe=new rs(N,ze,I),Ye=new Po(F),Ge=new Qc(T,Ve,Re,ze,nt,Ye),Ke=new Ol(T,F),qe=new rl,Je=new ul(Re),Ze=new Ao(T,Ve,P,We,p,s),Xe=new vl(T,We,ze),rt=new kl(N,Be,ze,P),$e=new Mo(N,Re,Be),et=new ts(N,Re,Be),Be.programs=Ge.programs,T.capabilities=ze,T.extensions=Re,T.properties=F,T.renderLists=qe,T.shadowMap=Xe,T.state=P,T.info=Be}m!==1009&&(w=new os(m,t.width,t.height,o,r,i));let at=new Tl(T,N);this.xr=at,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let e=Re.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Re.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return fe},this.setPixelRatio=function(e){e!==void 0&&(fe=e,this.setSize(ce,de,!1))},this.getSize=function(e){return e.set(ce,de)},this.setSize=function(e,n,r=!0){at.isPresenting?L(`WebGLRenderer: Can't change size while VR device is presenting.`):(ce=e,de=n,t.width=Math.floor(e*fe),t.height=Math.floor(n*fe),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ce*fe,de*fe).floor()},this.setDrawingBufferSize=function(e,n,r){ce=e,de=n,fe=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)R(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){L(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(re)},this.getViewport=function(e){return e.copy(xe)},this.setViewport=function(e,t,n,r){e.isVector4?xe.set(e.x,e.y,e.z,e.w):xe.set(e,t,n,r),P.viewport(re.copy(xe).multiplyScalar(Ie()).round())},this.getScissor=function(e){return e.copy(Se)},this.setScissor=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),P.scissor(ie.copy(Se).multiplyScalar(Ie()).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(e){P.setScissorTest(Ce=e)},this.setOpaqueSort=function(e){me=e},this.setTransparentSort=function(e){ge=e},this.getClearColor=function(e){return e.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor(...arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=Ze.getClearColor(),r=Ze.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,N.clearBufferuiv(N.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,N.clearBufferiv(N.COLOR,0,v))}else r|=N.COLOR_BUFFER_BIT}t&&(r|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&N.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ot,!1),t.removeEventListener(`webglcontextrestored`,st,!1),t.removeEventListener(`webglcontextcreationerror`,ct,!1),Ze.dispose(),qe.dispose(),Je.dispose(),I.dispose(),F.dispose(),Ve.dispose(),We.dispose(),Ue.dispose(),nt.dispose(),rt.dispose(),Ge.dispose(),at.dispose(),at.removeEventListener(`sessionstart`,ht),at.removeEventListener(`sessionend`,gt),_t.stop()};function ot(e){e.preventDefault(),jt(`WebGLRenderer: Context Lost.`),E=!0}function st(){jt(`WebGLRenderer: Context Restored.`),E=!1;let e=Be.autoReset,t=Xe.enabled,n=Xe.autoUpdate,r=Xe.needsUpdate,i=Xe.type;it(),Be.autoReset=e,Xe.enabled=t,Xe.autoUpdate=n,Xe.needsUpdate=r,Xe.type=i}function ct(e){R(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function lt(e){let t=e.target;t.removeEventListener(`dispose`,lt),ut(t)}function ut(e){dt(e),F.remove(e)}function dt(e){let t=F.get(e).programs;t!==void 0&&(t.forEach(function(e){Ge.releaseProgram(e)}),e.isShaderMaterial&&Ge.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Pe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Mt(e,t,n,r,i);P.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ue.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;nt.setup(i,r,s,n,c);let h,g=$e;if(c!==null&&(h=He.get(c),g=et,g.setIndex(h)),i.isMesh)r.wireframe===!0?(P.setLineWidth(r.wireframeLinewidth*Ie()),g.setMode(N.LINES)):g.setMode(N.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),P.setLineWidth(e*Ie()),i.isLineSegments?g.setMode(N.LINES):i.isLineLoop?g.setMode(N.LINE_LOOP):g.setMode(N.LINE_STRIP)}else i.isPoints?g.setMode(N.POINTS):i.isSprite&&g.setMode(N.TRIANGLES);if(i.isBatchedMesh){if(Re.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?He.get(c).bytesPerElement:1,o=F.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(N,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ft(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),Ee===!0&&Ye.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Et(e,t,r),e.side=0,e.needsUpdate=!0,Et(e,t,r),e.side=2):Et(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Je.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),De=this.localClippingEnabled,Ee=Ye.init(this.clippingPlanes,De),Ee===!0&&Ye.setGlobalState(this.clippingPlanes,t),D!==null&&Xe.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ft(o,n,t,e),r.add(o)}else ft(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=F.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Re.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let pt=null;function mt(e){pt&&pt(e)}function ht(){_t.stop()}function gt(){_t.start()}let _t=new wo;_t.setAnimationLoop(mt),typeof self<`u`&&_t.setContext(self),this.setAnimationLoop=function(e){pt=e,at.setAnimationLoop(e),e===null?_t.stop():_t.start()},at.addEventListener(`sessionstart`,ht),at.addEventListener(`sessionend`,gt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){R(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=at.enabled===!0&&at.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(T,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(at.cameraAutoUpdate===!0&&at.updateCamera(t),t=at.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,M),x=Je.get(e,C.length),x.init(t),x.state.textureUnits=I.getTextureUnits(),C.push(x),Oe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?Te.setFromArrayCamera(t):we.setFromProjectionMatrix(Oe,Tt,t.reversedDepth),De=this.localClippingEnabled,Ee=Ye.init(this.clippingPlanes,De),b=qe.get(e,S.length),b.init(),S.push(b),this.info.render.frame++,at.enabled===!0&&at.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&vt(e,t,-1/0,T.sortObjects)}vt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(me,ge),Fe=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,Fe&&Ze.addToRenderList(b,e),this.info.autoReset===!0&&this.info.reset(),Ee===!0&&Ye.beginShadows();let i=x.state.shadowsArray;if(Xe.render(i,e,t),Ee===!0&&Ye.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];xt(n,r,e,a)}Fe&&Ze.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];bt(b,e,n,n.viewport)}}else r.length>0&&xt(n,r,e,t),Fe&&Ze.render(e),bt(b,e,t)}M!==null&&ee===0&&(I.updateMultisampleRenderTarget(M),I.updateRenderTargetMipmap(M)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),nt.resetDefaultState(),te=-1,ne=null,C.pop(),C.length>0?(x=C[C.length-1],I.setTextureUnits(x.state.textureUnits),Ee===!0&&Ye.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function vt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?Te:we;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&Ne.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Oe);let i=We.update(e),a=e.material;a.visible&&b.push(e,i,a,n,Ne.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?Te:we;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=We.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ne.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ne.copy(e.boundingSphere.center)),Ne.applyMatrix4(e.matrixWorld).applyMatrix4(Oe)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,Ne.z,s,t)}}else a.visible&&b.push(e,i,a,n,Ne.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)vt(i[e],t,n,r)}function bt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),Ee===!0&&Ye.setGlobalState(T.clippingPlanes,n),r&&P.viewport(re.copy(r)),i.length>0&&St(i,t,n),a.length>0&&St(a,t,n),o.length>0&&St(o,t,n),P.buffers.depth.setTest(!0),P.buffers.depth.setMask(!0),P.buffers.color.setMask(!0),P.setPolygonOffset(!1)}function xt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Re.has(`EXT_color_buffer_half_float`)||Re.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new pn(1,1,{generateMipmaps:!0,type:e?_e:ue,minFilter:le,samples:Math.max(4,ze.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:U.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||re;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(oe),se=T.getClearAlpha(),se<1&&T.setClearColor(16777215,.5),T.clear(),Fe&&Ze.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),Ee===!0&&Ye.setGlobalState(T.clippingPlanes,r),St(e,n,r),I.updateMultisampleRenderTarget(a),I.updateRenderTargetMipmap(a),Re.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Ct(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(I.updateMultisampleRenderTarget(a),I.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(oe,se),d!==void 0&&(r.viewport=d),T.toneMapping=u}function St(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Ct(o,t,n,s,l,c)}}function Ct(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function wt(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function Et(e,t,n){t.isScene!==!0&&(t=Pe);let r=F.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ge.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ge.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ve.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,lt),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return At(e,s),d}else s.uniforms=Ge.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ge.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ye.uniform),At(e,s),r.needsLights=Ft(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=wt(x.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function Dt(e,t,n,r,i){let a=F.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=Et(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function Ot(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=hc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function At(e,t){let n=F.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Mt(e,t,n,r,i){t.isScene!==!0&&(t=Pe),I.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?T.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:U.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ve.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=F.get(r),b=x.state.lights;if(Ee===!0&&(De===!0||e!==ne)){let t=e===ne&&r.id===te;Ye.setState(r,e,t)}let S=!1,C=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==b.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?S=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ye.numPlanes||v.numIntersection!==Ye.numIntersection)?S=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===wt(x.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(C=!0):S=!0:S=!0:(S=!0,v.__version=r.version);let w=v.currentProgram;(S===!0||C===!0)&&(w=C===!0?Dt(r,t,i,s,h):Et(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,w,v));let E=!1,O=!1,k=!1,A=w.getUniforms(),j=v.uniforms;if(P.useProgram(w.program)&&(E=!0,O=!0,k=!0),r.id!==te&&(te=r.id,O=!0),E||ne!==e){P.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),A.setValue(N,`projectionMatrix`,e.projectionMatrix),A.setValue(N,`viewMatrix`,e.matrixWorldInverse);let t=A.map.cameraPosition;t!==void 0&&t.setValue(N,Ae.setFromMatrixPosition(e.matrixWorld)),ze.logarithmicDepthBuffer&&A.setValue(N,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&A.setValue(N,`isOrthographic`,e.isOrthographicCamera===!0),ne!==e&&(ne=e,O=!0,k=!0)}if(v.needsLights&&(b.state.sunShadowMap.length>0&&A.setValue(N,`sunShadowMap`,b.state.sunShadowMap,I),b.state.directionalShadowMap.length>0&&A.setValue(N,`directionalShadowMap`,b.state.directionalShadowMap,I),b.state.spotShadowMap.length>0&&A.setValue(N,`spotShadowMap`,b.state.spotShadowMap,I),b.state.pointShadowMap.length>0&&A.setValue(N,`pointShadowMap`,b.state.pointShadowMap,I)),i.isSkinnedMesh){A.setOptional(N,i,`bindMatrix`),A.setOptional(N,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),A.setValue(N,`boneTexture`,e.boneTexture,I))}i.isBatchedMesh&&(A.setOptional(N,i,`batchingTexture`),A.setValue(N,`batchingTexture`,i._matricesTexture,I),A.setOptional(N,i,`batchingIdTexture`),A.setValue(N,`batchingIdTexture`,i._indirectTexture,I),A.setOptional(N,i,`batchingColorTexture`),i._colorsTexture!==null&&A.setValue(N,`batchingColorTexture`,i._colorsTexture,I));let ee=n.morphAttributes;if((ee.position!==void 0||ee.normal!==void 0||ee.color!==void 0)&&Qe.update(i,n,w),(O||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,A.setValue(N,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(j.envMapIntensity.value=t.environmentIntensity),j.dfgLUT!==void 0&&(j.dfgLUT.value=Ml()),O){if(A.setValue(N,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&Nt(j,k),a&&r.fog===!0&&Ke.refreshFogUniforms(j,a),Ke.refreshMaterialUniforms(j,r,fe,de,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=y,t=0;for(let n of x.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;j.probesSH.value=e.textures,j.probesMin.value=e.min,j.probesMax.value=e.max,j.probesResolution.value=e.resolution}hc.upload(N,Ot(v),j,I)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(hc.upload(N,Ot(v),j,I),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&A.setValue(N,`center`,i.center),A.setValue(N,`modelViewMatrix`,i.modelViewMatrix),A.setValue(N,`normalMatrix`,i.normalMatrix),A.setValue(N,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];rt.update(n,w),rt.bind(n,w)}}return w}function Nt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Ft(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=F.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),F.get(e.texture).__webglTexture=t,F.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=F.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=F.get(e);if(o.__useDefaultFramebuffer!==void 0){P.bindFramebuffer(N.FRAMEBUFFER,o.__webglFramebuffer),re.copy(e.viewport),ie.copy(e.scissor),ae=e.scissorTest,P.viewport(re),P.scissor(ie),P.setScissorTest(ae),te=-1;return}if(o.__webglFramebuffer===void 0)I.setupRenderTarget(e);else if(o.__hasExternalTextures)I.rebindTextures(e,F.get(e.texture).__webglTexture,F.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&F.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);I.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=F.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&I.useMultisampledRTT(e)===!1?F.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,re.copy(e.viewport),ie.copy(e.scissor),ae=e.scissorTest}else re.copy(xe).multiplyScalar(fe).floor(),ie.copy(Se).multiplyScalar(fe).floor(),ae=Ce;if(n!==0&&(r=O),P.bindFramebuffer(N.FRAMEBUFFER,r)&&P.drawBuffers(e,r),P.viewport(re),P.scissor(ie),P.setScissorTest(ae),i){let r=F.get(e.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=F.get(e.textures[t]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=F.get(e.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,t.__webglTexture,n)}te=-1};function It(e){let t=F.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=ze.textureFormatReadable(e.format),t.__typeReadable=ze.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=F.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){P.bindFramebuffer(N.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+s);let u=It(o);if(u.__formatReadable===!1){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&N.readPixels(t,n,r,i,tt.convert(c),tt.convert(l),a)}finally{let e=M===null?null:F.get(M).__webglFramebuffer;P.bindFramebuffer(N.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=F.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){P.bindFramebuffer(N.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+s);let d=It(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,f),N.bufferData(N.PIXEL_PACK_BUFFER,a.byteLength,N.STREAM_READ),N.readPixels(t,n,r,i,tt.convert(l),tt.convert(u),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let p=M===null?null:F.get(M).__webglFramebuffer;P.bindFramebuffer(N.FRAMEBUFFER,p);let m=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Pt(N,m,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,f),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,a),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(f),N.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;I.setTexture2D(e,0),N.copyTexSubImage2D(N.TEXTURE_2D,n,0,0,o,s,i,a),P.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=tt.convert(t.format),_=tt.convert(t.type),v;t.isData3DTexture?(I.setTexture3D(t,0),v=N.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(I.setTexture2DArray(t,0),v=N.TEXTURE_2D_ARRAY):(I.setTexture2D(t,0),v=N.TEXTURE_2D),P.activeTexture(N.TEXTURE0),P.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,t.flipY),P.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),P.pixelStorei(N.UNPACK_ALIGNMENT,t.unpackAlignment);let y=P.getParameter(N.UNPACK_ROW_LENGTH),b=P.getParameter(N.UNPACK_IMAGE_HEIGHT),x=P.getParameter(N.UNPACK_SKIP_PIXELS),S=P.getParameter(N.UNPACK_SKIP_ROWS),C=P.getParameter(N.UNPACK_SKIP_IMAGES);P.pixelStorei(N.UNPACK_ROW_LENGTH,h.width),P.pixelStorei(N.UNPACK_IMAGE_HEIGHT,h.height),P.pixelStorei(N.UNPACK_SKIP_PIXELS,l),P.pixelStorei(N.UNPACK_SKIP_ROWS,u),P.pixelStorei(N.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=F.get(e),r=F.get(t),h=F.get(n.__renderTarget),g=F.get(r.__renderTarget);P.bindFramebuffer(N.READ_FRAMEBUFFER,h.__webglFramebuffer),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,F.get(e).__webglTexture,i,d+n),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,F.get(t).__webglTexture,a,m+n)),N.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,N.DEPTH_BUFFER_BIT,N.NEAREST);P.bindFramebuffer(N.READ_FRAMEBUFFER,null),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||F.has(e)){let n=F.get(e),r=F.get(t);P.bindFramebuffer(N.READ_FRAMEBUFFER,k),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,n.__webglTexture,i),T?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,r.__webglTexture,a),i===0?T?N.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):N.copyTexSubImage2D(v,a,f,p,l,u,o,s):N.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,N.COLOR_BUFFER_BIT,N.NEAREST);P.bindFramebuffer(N.READ_FRAMEBUFFER,null),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?N.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?N.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):N.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):N.texSubImage2D(N.TEXTURE_2D,a,f,p,o,s,g,_,h);P.pixelStorei(N.UNPACK_ROW_LENGTH,y),P.pixelStorei(N.UNPACK_IMAGE_HEIGHT,b),P.pixelStorei(N.UNPACK_SKIP_PIXELS,x),P.pixelStorei(N.UNPACK_SKIP_ROWS,S),P.pixelStorei(N.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&N.generateMipmap(v),P.unbindTexture()},this.initRenderTarget=function(e){F.get(e).__webglFramebuffer===void 0&&I.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?I.setTextureCube(e,0):e.isData3DTexture?I.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?I.setTexture2DArray(e,0):I.setTexture2D(e,0),P.unbindTexture()},this.resetState=function(){j=0,ee=0,M=null,P.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Tt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=U._getDrawingBufferColorSpace(e),t.unpackColorSpace=U._getUnpackColorSpace()}},Pl={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Fl=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Il=new eo(-1,1,1,-1,0,1),Ll=new class extends qr{constructor(){super(),this.setAttribute(`position`,new Fr([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new Fr([0,2,0,0,2,0],2))}},Rl=class{constructor(e){this._mesh=new G(Ll,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Il)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},zl=class extends Fl{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ua?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=sa.clone(e.uniforms),this.material=new ua({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Rl(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Bl=class extends Fl{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Vl=class extends Fl{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Hl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new B);this._width=n.width,this._height=n.height,t=new pn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:_e}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new zl(Pl),this.copyPass.material.blending=0,this.timer=new so}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Bl!==void 0&&(r instanceof Bl?n=!0:r instanceof Vl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new B);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Ul=class extends Fl{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new W}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Wl={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new W(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},Gl=class e extends Fl{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new B(256,256):new B(e.x,e.y),this.clearColor=new W(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new pn(i,a,{type:_e,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new pn(i,a,{type:_e,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new pn(i,a,{type:_e,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=Wl;this.highPassUniforms=sa.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ua({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new B(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new V(1,1,1),new V(1,1,1),new V(1,1,1),new V(1,1,1),new V(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=sa.clone(Pl.uniforms),this.blendMaterial=new ua({uniforms:this.copyUniforms,vertexShader:Pl.vertexShader,fragmentShader:Pl.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new W,this._oldClearAlpha=1,this._basic=new ai,this._fsQuad=new Rl(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new B(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new ua({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new B(.5,.5)},direction:{value:new B(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new ua({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Gl.BlurDirectionX=new B(1,0),Gl.BlurDirectionY=new B(0,1);var Kl={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},ql=class extends Fl{constructor(){super(),this.isOutputPass=!0,this.uniforms=sa.clone(Kl.uniforms),this.material=new da({name:Kl.name,uniforms:this.uniforms,vertexShader:Kl.vertexShader,fragmentShader:Kl.fragmentShader}),this._fsQuad=new Rl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},U.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Jl=class extends $n{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new K;e.deleteAttribute(`uv`);let t=new J({side:1}),n=new J,r=new $a(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new G(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new Oi(e,n,6),o=new Un;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new G(e,Yl(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let c=new G(e,Yl(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new G(e,Yl(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let u=new G(e,Yl(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new G(e,Yl(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new G(e,Yl(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Yl(e){return new pa({color:0,emissive:16777215,emissiveIntensity:e})}var Xl=()=>`ontouchstart`in window||navigator.maxTouchPoints>0,Zl=class{canvas;renderer;scene=new $n;camera=new Ya(40,1,.1,400);composer=null;bloom=null;quality=`media`;env;constructor(e,t){this.canvas=e,this.renderer=new Nl({canvas:e,antialias:!0,powerPreference:`high-performance`}),this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=1;let n=new Wo(this.renderer);this.env=n.fromScene(new Jl,.04).texture,n.dispose(),this.scene.environment=this.env,this.scene.environmentIntensity=.28,this.scene.background=new W(328967),this.setQuality(t),window.addEventListener(`resize`,()=>this.resize()),this.resize()}setQuality(e){this.quality=e;let t=window.devicePixelRatio||1;if(this.renderer.setPixelRatio(Math.min(t,e===`baja`?1:e===`media`?1.5:2)),this.renderer.shadowMap.enabled=e!==`baja`||!0,e===`alta`&&!Xl()){let e=this.renderer.getSize(new B),t=new pn(e.x,e.y,{type:_e,samples:4});this.composer?.dispose(),this.composer=new Hl(this.renderer,t),this.composer.addPass(new Ul(this.scene,this.camera)),this.bloom=new Gl(new B(e.x,e.y),.22,.5,1.25),this.composer.addPass(this.bloom),this.composer.addPass(new ql)}else this.composer?.dispose(),this.composer=null,this.bloom=null;this.resize()}resize(){let e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1),this.canvas.style.width=e+`px`,this.canvas.style.height=t+`px`,this.camera.aspect=e/t,this.camera.fov=e/t<1?58:40,this.camera.updateProjectionMatrix(),this.composer?.setSize(e,t)}get viewportH(){return this.renderer.domElement.height}render(){this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)}},Ql=()=>({mx:0,mz:0,light:!1,heavy:!1,grab:!1,taunt:!1,finisher:!1,block:!1,run:!1}),$l=class{el;keys=new Set;edges={light:!1,heavy:!1,grab:!1,taunt:!1,finisher:!1};mouseDown=new Set;touch={mx:0,mz:0,block:!1,run:!1};padPrev=[];enabled=!1;onPause=null;lastDevice=`teclado`;cleanup=[];constructor(e){this.el=e;let t=e=>{if(e.repeat)this.enabled&&[`Space`,`ArrowUp`,`ArrowDown`].includes(e.code)&&e.preventDefault();else if(this.keys.add(e.code),this.lastDevice=`teclado`,e.code===`Escape`||e.code===`KeyP`)this.onPause?.();else if(this.enabled)switch([`Space`,`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`Tab`].includes(e.code)&&e.preventDefault(),e.code){case`KeyJ`:case`KeyZ`:this.edges.light=!0;break;case`KeyK`:case`KeyX`:this.edges.heavy=!0;break;case`KeyL`:case`KeyC`:this.edges.grab=!0;break;case`KeyE`:case`KeyT`:this.edges.taunt=!0;break;case`KeyF`:case`KeyQ`:this.edges.finisher=!0}},n=e=>this.keys.delete(e.code),r=e=>{this.enabled&&!e.target.closest(`.touch-ui, .hud button, .overlay`)&&(this.mouseDown.add(e.button),this.lastDevice=`teclado`,e.button===0?this.edges.light=!0:e.button===2?this.edges.heavy=!0:e.button===1&&(this.edges.grab=!0,e.preventDefault()))},i=e=>this.mouseDown.delete(e.button),a=e=>{this.enabled&&e.preventDefault()},o=()=>{this.keys.clear(),this.mouseDown.clear()};window.addEventListener(`keydown`,t),window.addEventListener(`keyup`,n),window.addEventListener(`mousedown`,r),window.addEventListener(`mouseup`,i),window.addEventListener(`contextmenu`,a),window.addEventListener(`blur`,o),this.cleanup.push(()=>{window.removeEventListener(`keydown`,t),window.removeEventListener(`keyup`,n),window.removeEventListener(`mousedown`,r),window.removeEventListener(`mouseup`,i),window.removeEventListener(`contextmenu`,a),window.removeEventListener(`blur`,o)})}press(e){this.enabled&&(this.edges[e]=!0,this.lastDevice=`tactil`)}reset(){for(let e of Object.keys(this.edges))this.edges[e]=!1;let e=this.activePad();e&&(this.padPrev=e.buttons.map(e=>e.pressed))}activePad(){let e=navigator.getGamepads?navigator.getGamepads():[];return e&&Array.from(e).find(e=>e&&e.connected)||null}get padConnected(){return!!this.activePad()}rumble(e,t,n){try{this.activePad()?.vibrationActuator?.playEffect(`dual-rumble`,{startDelay:0,duration:n,weakMagnitude:t,strongMagnitude:e})}catch{}}sample(e){let t=Ql();if(!this.enabled)return this.reset(),t;let n=0,r=0,i=this.keys;(i.has(`KeyA`)||i.has(`ArrowLeft`))&&--n,(i.has(`KeyD`)||i.has(`ArrowRight`))&&(n+=1),(i.has(`KeyW`)||i.has(`ArrowUp`))&&(r+=1),(i.has(`KeyS`)||i.has(`ArrowDown`))&&--r;let a=i.has(`Space`),o=i.has(`ShiftLeft`)||i.has(`ShiftRight`),s=this.activePad();if(s){let e=e=>Math.abs(e)<.18?0:e,t=e(s.axes[0]??0),i=e(s.axes[1]??0);(t||i)&&(n+=t,r-=i,this.lastDevice=`mando`),s.buttons[14]?.pressed&&--n,s.buttons[15]?.pressed&&(n+=1),s.buttons[12]?.pressed&&(r+=1),s.buttons[13]?.pressed&&--r;let c=e=>!!s.buttons[e]?.pressed,l=(e,t)=>{c(e)&&!this.padPrev[e]&&(this.edges[t]=!0,this.lastDevice=`mando`)};l(0,`light`),l(2,`heavy`),l(1,`grab`),l(3,`taunt`),l(5,`finisher`),c(9)&&!this.padPrev[9]&&this.onPause?.(),a=a||c(4)||c(6),o=o||c(7)||(s.buttons[10]?.pressed??!1),this.padPrev=s.buttons.map(e=>e.pressed)}(this.touch.mx||this.touch.mz)&&(n+=this.touch.mx,r+=this.touch.mz),a||=this.touch.block,o||=this.touch.run;let c=Math.hypot(n,r);c>1&&(n/=c,r/=c);let l=e.forward,u=e.right;t.mx=u.x*n+l.x*r,t.mz=u.z*n+l.z*r,t.block=a,t.run=o;for(let e of Object.keys(this.edges))t[e]=this.edges[e],this.edges[e]=!1;return t}dispose(){this.cleanup.forEach(e=>e())}};function Z(e,t={},n=[]){let r=document.createElement(e);for(let[e,n]of Object.entries(t))n!==void 0&&n!==!1&&(e===`class`?r.className=String(n):e.startsWith(`on`)&&typeof n==`function`?r.addEventListener(e.slice(2).toLowerCase(),n):e===`html`?r.innerHTML=String(n):r.setAttribute(e,n===!0?``:String(n)));let i=Array.isArray(n)?n:[n];for(let e of i)e!=null&&e!==!1&&r.appendChild(typeof e==`string`?document.createTextNode(e):e);return r}var eu=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},tu=e=>`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,`0`)}`,nu=class{root;sides=[];timer;msgs;bannerEl;countEl;countLabel;mashEl;mashBar;mashText;flashEl;outEl;hint;clinchEl;subsEl;fpsEl;pauseBtn;ghost=[100,100];hintT=14;fps=60;constructor(e){let t=e=>{let t=Z(`i`),n=Z(`i`,{class:`ghost`}),r=Z(`i`),i=Z(`i`),a=Z(`div`,{class:`pname`}),o=Z(`div`,{class:`ready`},`FINISHER`),s=Z(`div`,{class:`psub`});return{root:Z(`div`,{class:`pside ${e===0?`left`:`right`}`},[Z(`div`,{class:`pplate`},[a,s]),Z(`div`,{class:`bar hp`},[n,t]),Z(`div`,{class:`bar st`},[r]),Z(`div`,{class:`bar mom`},[i,o])]),hp:t,hpGhost:n,st:r,mom:i,name:a,ready:o,sub:s}};this.sides=[t(0),t(1)],this.timer=Z(`div`,{class:`timer`},`0:00`),this.msgs=Z(`div`,{class:`msgs`}),this.bannerEl=Z(`div`,{class:`banner`}),this.countLabel=Z(`div`,{class:`count-label`}),this.countEl=Z(`div`,{class:`count`},[this.countLabel]),this.mashBar=Z(`i`),this.mashText=Z(`div`,{class:`mash-text`}),this.mashEl=Z(`div`,{class:`mash`},[this.mashText,Z(`div`,{class:`mash-bar`},[this.mashBar])]),this.flashEl=Z(`div`,{class:`flash`}),this.outEl=Z(`div`,{class:`outcount`}),this.clinchEl=Z(`div`,{class:`clinch`}),this.hint=Z(`div`,{class:`hint`}),this.subsEl=Z(`div`,{class:`subs`}),this.fpsEl=Z(`div`,{class:`fps`}),this.pauseBtn=Z(`button`,{class:`pause`,title:`Pausa (Esc)`},`II`),this.root=Z(`div`,{class:`hud hidden`},[Z(`div`,{class:`hud-top`},[this.sides[0].root,Z(`div`,{class:`hud-center`},[Z(`div`,{class:`tline`},[this.timer,this.pauseBtn]),this.outEl]),this.sides[1].root]),this.msgs,this.bannerEl,this.countEl,this.mashEl,this.clinchEl,this.flashEl,this.hint,this.subsEl,this.fpsEl]),e.appendChild(this.root)}show(e,t,n,r){this.root.classList.remove(`hidden`),this.sides.forEach((n,r)=>{n.name.textContent=e.f[r].data.name,n.root.classList.toggle(`player`,r===t),n.sub.textContent=t<0?`CPU `+(r+1):r===t?`TÚ`:`CPU`}),this.ghost=[100,100],this.hint.innerHTML=n,this.hintT=14,this.hint.classList.remove(`gone`),this.fpsEl.style.display=r?`block`:`none`,this.msgs.innerHTML=``,this.subtitle(``,``),this.bannerEl.className=`banner`,this.countEl.className=`count`}hide(){this.root.classList.add(`hidden`)}message(e,t=!1){let n=Z(`div`,{class:`msg`+(t?` big`:``)},e);for(this.msgs.appendChild(n);this.msgs.children.length>3;)this.msgs.firstChild?.remove();setTimeout(()=>n.classList.add(`out`),t?1900:1500),setTimeout(()=>n.remove(),t?2300:1900)}banner(e,t){this.bannerEl.textContent=e,this.bannerEl.style.setProperty(`--len`,String(Math.max(6,e.length))),this.bannerEl.style.setProperty(`--c`,t),this.bannerEl.className=`banner`,this.bannerEl.offsetWidth,this.bannerEl.className=`banner show`}flash(e,t){this.flashEl.style.background=e,this.flashEl.style.opacity=String(t),requestAnimationFrame(()=>{this.flashEl.style.transition=`opacity .5s`,this.flashEl.style.opacity=`0`,setTimeout(()=>this.flashEl.style.transition=``,520)})}bigCount(e,t=``){this.countEl.firstChild&&this.countEl.firstChild.remove?.(),this.countEl.textContent=e,this.countLabel.textContent=t,this.countEl.appendChild(this.countLabel),this.countEl.className=`count`,this.countEl.offsetWidth,this.countEl.className=`count show`}subtitle(e,t){t?(this.subsEl.innerHTML=``,this.subsEl.appendChild(Z(`b`,{class:e===`NARRADOR`?`n0`:`n1`},e)),this.subsEl.appendChild(document.createTextNode(` `+t)),this.subsEl.classList.add(`show`)):this.subsEl.classList.remove(`show`)}clearCount(){this.countEl.className=`count`}update(e,t,n,r){this.fps+=(Math.min(120,1/Math.max(.001,r))-this.fps)*.05,this.fpsEl.style.display!==`none`&&(this.fpsEl.textContent=Math.round(this.fps)+` fps`),this.timer.textContent=tu(t.time),this.sides.forEach((n,r)=>{let i=t.f[r],a=Math.max(0,i.hp/i.maxHp*100);this.ghost[r]+=(a-this.ghost[r])*Math.min(1,e*2.2),this.ghost[r]<a&&(this.ghost[r]=a),n.hp.style.width=a+`%`,n.hpGhost.style.width=this.ghost[r]+`%`,n.root.classList.toggle(`low`,a<25),n.st.style.width=Math.max(0,i.st/i.maxSt*100)+`%`,n.root.classList.toggle(`exhausted`,i.exhausted),n.mom.style.width=Math.min(100,i.mom)+`%`,n.root.classList.toggle(`full`,i.mom>=100)});let i=t.f.filter(e=>e.outT>=3&&!t.over);if(i.length){let e=i[0];this.outEl.textContent=`${e.data.name} fuera del ring · ${Math.max(0,10-Math.floor(e.outT))}`,this.outEl.classList.add(`show`)}else this.outEl.classList.remove(`show`);let a=t.f.find(e=>e.state===`pinD`);a?a.pinCount>0&&this.countEl.dataset.k!==`p`+a.pinCount&&(this.countEl.dataset.k=`p`+a.pinCount,this.bigCount(String(a.pinCount),`PIN`)):t.ko&&!t.over?t.ko.n>0&&this.countEl.dataset.k!==`k`+t.ko.n&&(this.countEl.dataset.k=`k`+t.ko.n,this.bigCount(String(t.ko.n),`CUENTA KO`)):this.countEl.dataset.k&&(this.countEl.dataset.k=``,this.clearCount());let o=t.f[n],s=t.f[1-n];if(!o){this.mashEl.classList.remove(`show`),this.clinchEl.classList.remove(`show`),this.hintT>0&&(this.hintT-=r,this.hintT<=0&&this.hint.classList.add(`gone`));return}let c=``,l=-1,u=!1;o.state===`pinD`?(c=`¡MACHACA para zafarte del pin!`,l=o.escape):o.state===`subD`?(c=`¡MACHACA para escapar de la llave!`,l=1-o.subMeter,u=o.subMeter>.7):o.state===`down`&&!o.koed?(c=`¡MACHACA para levantarte!`,l=o.t/Math.max(.01,o.dur)):o.state===`subA`?(c=`Machaca golpe para apretar la llave · GUARDIA para soltar`,l=s.subMeter):o.state===`pinA`&&(c=`Pin en marcha · GUARDIA para soltar`,l=s.pinT/3),c?(this.mashEl.classList.add(`show`),this.mashText.textContent=c,this.mashBar.style.width=Math.max(0,Math.min(1,l))*100+`%`,this.mashEl.classList.toggle(`danger`,u)):this.mashEl.classList.remove(`show`),o.state===`clinch`?(this.clinchEl.classList.add(`show`),this.clinchEl.innerHTML=`<b>¿Qué haces?</b><span><em>Golpe</em> ${o.throwG.name}</span><span><em>Fuerte</em> ${o.slamG.name}</span><span><em>Agarre</em> ${o.subG.name}</span>`):this.clinchEl.classList.remove(`show`),this.hintT>0&&(this.hintT-=r,this.hintT<=0&&this.hint.classList.add(`gone`))}playerTip(e){return e}},ru=class{input;root;stickBase;stickKnob;finBtn;stickId=-1;origin={x:0,y:0};constructor(e,t){this.input=t,this.stickKnob=Z(`i`),this.stickBase=Z(`div`,{class:`stick`},[this.stickKnob]);let n=(e,t,n,r,i)=>{let a=Z(`button`,{class:`tbtn ${e}`,"aria-label":t},[Z(`b`,{},t),Z(`small`,{},n)]),o=new Set;a.addEventListener(`pointerdown`,e=>{e.preventDefault(),o.add(e.pointerId),a.setPointerCapture(e.pointerId),a.classList.add(`on`),r()});let s=e=>{o.delete(e.pointerId)&&(a.classList.remove(`on`),i?.())};return a.addEventListener(`pointerup`,s),a.addEventListener(`pointercancel`,s),a.addEventListener(`lostpointercapture`,s),a};this.finBtn=n(`fin`,`FINISHER`,``,()=>t.press(`finisher`));let r=Z(`div`,{class:`stick-zone`},[this.stickBase]),i=Z(`div`,{class:`tbtns`},[n(`light`,`GOLPE`,`ligero`,()=>t.press(`light`)),n(`heavy`,`FUERTE`,`pesado`,()=>t.press(`heavy`)),n(`grab`,`AGARRE`,`llaves`,()=>t.press(`grab`)),n(`block`,`GUARDIA`,`mantén`,()=>t.touch.block=!0,()=>t.touch.block=!1),n(`taunt`,`BURLA`,``,()=>t.press(`taunt`)),this.finBtn]);this.root=Z(`div`,{class:`touch-ui hidden`},[r,i]),e.appendChild(this.root),r.addEventListener(`pointerdown`,e=>{if(this.stickId!==-1)return;e.preventDefault(),this.stickId=e.pointerId,r.setPointerCapture(e.pointerId);let t=r.getBoundingClientRect();this.origin={x:e.clientX,y:e.clientY},this.stickBase.style.left=e.clientX-t.left+`px`,this.stickBase.style.top=e.clientY-t.top+`px`,this.stickBase.classList.add(`on`),this.move(e)}),r.addEventListener(`pointermove`,e=>{e.pointerId===this.stickId&&this.move(e)});let a=e=>{e.pointerId===this.stickId&&(this.stickId=-1,this.stickBase.classList.remove(`on`),this.stickKnob.style.transform=`translate(0,0)`,t.touch.mx=0,t.touch.mz=0,t.touch.run=!1)};r.addEventListener(`pointerup`,a),r.addEventListener(`pointercancel`,a)}move(e){let t=e.clientX-this.origin.x,n=e.clientY-this.origin.y,r=Math.hypot(t,n);r>56&&(t=t/r*56,n=n/r*56),this.stickKnob.style.transform=`translate(${t}px,${n}px)`;let i=Math.hypot(t,n)/56,a=i<.18;this.input.touch.mx=a?0:t/56,this.input.touch.mz=a?0:-n/56,this.input.touch.run=i>.92,this.stickBase.classList.toggle(`run`,i>.92)}setReady(e){this.finBtn.classList.toggle(`ready`,e)}show(e){this.root.classList.toggle(`hidden`,!e)}},iu=[{id:`primera_sangre`,name:`Primera sangre`,desc:`Gana tu primer combate.`},{id:`cinco`,name:`Racha del Hoyo`,desc:`Gana 5 combates en total.`},{id:`diez`,name:`Veterano de la casa`,desc:`Gana 10 combates en total.`},{id:`torneo`,name:`Campeón del Hoyo`,desc:`Gana un torneo.`},{id:`torneo_dificil`,name:`Sin piedad`,desc:`Gana un torneo en dificultad Difícil.`},{id:`rendicion`,name:`Sumisión total`,desc:`Gana un combate por rendición.`},{id:`pin`,name:`Uno, dos, tres`,desc:`Gana un combate por pin.`},{id:`ko`,name:`Noche de KO`,desc:`Gana un combate por KO.`},{id:`fuera`,name:`Fuera de aquí`,desc:`Gana por cuenta fuera del ring.`},{id:`finisher`,name:`Remate de cine`,desc:`Gana un combate habiendo conectado tu finisher.`},{id:`remontada`,name:`Remontada épica`,desc:`Gana con menos del 10 % de vida.`},{id:`impecable`,name:`Impecable`,desc:`Gana habiendo recibido menos del 20 % de tu vida en daño.`},{id:`burlon`,name:`El burlón`,desc:`Haz 10 burlas en total.`},{id:`despedido`,name:`Estás despedido`,desc:`Gana con "La hora de Pablo Motos".`}];function au(e,t){let n=t.summary,r=n.winner===t.player,i=[],a=t=>{e.achievements[t]||(e.achievements[t]=Date.now(),i.push(t))};if(e.taunts+=n.taunts[t.player]??0,r){e.wins++,e.winsBy[t.playerData.id]=(e.winsBy[t.playerData.id]??0)+1,a(`primera_sangre`),e.wins>=5&&a(`cinco`),e.wins>=10&&a(`diez`),n.reason===`rendicion`&&a(`rendicion`),n.reason===`pin`&&a(`pin`),n.reason===`ko`&&a(`ko`),n.reason===`fuera`&&a(`fuera`),n.finishersLanded[t.player]>0&&a(`finisher`),n.hpPct[t.player]<.1&&a(`remontada`);let r=t.playerData.fullStats.health;n.damageTaken[t.player]<r*.2&&a(`impecable`),n.fired&&t.playerData.id===`pablo motos`&&a(`despedido`)}else e.losses++;return e.taunts>=10&&a(`burlon`),t.tournamentWon&&(e.tournaments[t.difficulty]++,a(`torneo`),t.difficulty===`dificil`&&a(`torneo_dificil`)),i}function ou(e,t){let n=t.unlock;return!!(!n||n.wins!=null&&e.wins>=n.wins||n.achievement&&e.achievements[n.achievement])}var su=(e,t=e.round)=>{let n=e.size/2**t;return n===2?`FINAL`:n===4?`SEMIFINAL`:n===8?`CUARTOS DE FINAL`:`RONDA `+(t+1)};function cu(e,t,n=Math.random){return t===Math.log2(e.size)-1?`manchester`:t===0||n()<.5?`matamoros`:`manchester`}var lu=(e,t)=>{let n=[...e];for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n},uu=e=>e>=8?8:e>=4?4:2;function du(e,t,n=Math.random,r=uu(t.length)){let i=lu([e,...lu(t.filter(t=>t!==e),n).slice(0,r-1)],n),a=[];for(let e=0;e<r;e+=2)a.push({a:i[e],b:i[e+1],winner:null});return{size:r,playerId:e,rounds:[a],round:0,eliminated:!1,champion:null}}var fu=e=>e.rounds[e.round].find(t=>t.a===e.playerId||t.b===e.playerId),pu=e=>{let t=fu(e);return t.a===e.playerId?t.b:t.a};function mu(e,t,n){let r=e.rounds[e.round];for(let i of r)i.a===e.playerId||i.b===e.playerId?i.winner=t?e.playerId:i.a===e.playerId?i.b:i.a:i.winner||=n(i.a,i.b);if(!t)return e.eliminated=!0,e;let i=r.map(e=>e.winner);if(i.length===1)return e.champion=i[0],e;let a=[];for(let e=0;e<i.length;e+=2)a.push({a:i[e],b:i[e+1],winner:null});return e.rounds.push(a),e.round++,e}var hu=e=>440*2**((e-69)/12),Q=new class{ctx=null;master;sfxG;musG;crowdG;vol={master:.8,music:.5,sfx:.9,voice:!0};noiseBuf;crowdLevel=.25;crowdTarget=.25;musicTimer=null;musicKind=null;nextBar=0;bar=0;crowdFilter;init(){if(this.ctx){this.ctx.state===`suspended`&&this.ctx.resume();return}let e=window.AudioContext||window.webkitAudioContext;if(!e)return;let t=this.ctx=new e;this.master=t.createGain(),this.master.gain.value=this.vol.master,this.master.connect(t.destination),this.sfxG=t.createGain(),this.sfxG.gain.value=this.vol.sfx,this.sfxG.connect(this.master),this.musG=t.createGain(),this.musG.gain.value=this.vol.music*.5,this.musG.connect(this.master),this.crowdG=t.createGain(),this.crowdG.gain.value=0,this.crowdG.connect(this.master);let n=t.sampleRate*3;this.noiseBuf=t.createBuffer(1,n,t.sampleRate);let r=this.noiseBuf.getChannelData(0),i=0;for(let e=0;e<n;e++){let t=Math.random()*2-1;i=(i+.04*t)/1.04,r[e]=t*.4+i*6}let a=t.createBufferSource();a.buffer=this.noiseBuf,a.loop=!0;let o=this.crowdFilter=t.createBiquadFilter();o.type=`bandpass`,o.frequency.value=520,o.Q.value=.4;let s=t.createOscillator();s.frequency.value=.17;let c=t.createGain();c.gain.value=140,s.connect(c),c.connect(o.frequency),s.start(),a.connect(o),o.connect(this.crowdG),a.start()}setVolumes(e,t,n){this.vol.master=e,this.vol.music=t,this.vol.sfx=n,this.ctx&&(this.master.gain.value=e,this.musG.gain.value=t*.5,this.sfxG.gain.value=n)}t(){return this.ctx.currentTime}noise(e,t,n,r,i,a=0,o=this.sfxG){let s=this.ctx,c=s.createBufferSource();c.buffer=this.noiseBuf,c.playbackRate.value=.8+Math.random()*.4;let l=s.createBiquadFilter();l.type=r,l.frequency.value=t,l.Q.value=n;let u=s.createGain(),d=this.t()+a;u.gain.setValueAtTime(i,d),u.gain.exponentialRampToValueAtTime(.001,d+e),c.connect(l),l.connect(u),u.connect(o),c.start(d,Math.random()*2,e+.05)}tone(e,t,n,r,i=0,a,o=this.sfxG){let s=this.ctx,c=s.createOscillator();c.type=n;let l=s.createGain(),u=this.t()+i;c.frequency.setValueAtTime(e,u),a&&c.frequency.exponentialRampToValueAtTime(a,u+t),l.gain.setValueAtTime(1e-4,u),l.gain.exponentialRampToValueAtTime(r,u+.01),l.gain.exponentialRampToValueAtTime(1e-4,u+t),c.connect(l),l.connect(o),c.start(u),c.stop(u+t+.05)}sfx(e,t=1){if(this.ctx)switch(e){case`hit`:this.noise(.12,900,.8,`bandpass`,.55*t),this.tone(150,.12,`sine`,.7*t,0,50);break;case`heavy`:this.noise(.22,500,.6,`bandpass`,.9),this.tone(110,.3,`sine`,1,0,35),this.tone(60,.35,`triangle`,.6,0,30);break;case`block`:this.noise(.08,2500,1,`bandpass`,.35),this.tone(260,.08,`square`,.12,0,140);break;case`parry`:this.tone(1400,.35,`sine`,.25,0,900),this.tone(2100,.3,`sine`,.15,.02,1200),this.noise(.1,4e3,1,`highpass`,.3);break;case`whoosh`:this.noise(.18,1400,.5,`bandpass`,.2*t);break;case`slam`:this.noise(.4,280,.5,`lowpass`,1),this.tone(70,.5,`sine`,1,0,28),this.noise(.3,3e3,.7,`highpass`,.3,.02);break;case`knock`:this.noise(.25,350,.6,`lowpass`,.6),this.tone(90,.25,`sine`,.6,0,40);break;case`bell`:for(let e=0;e<3;e++)this.tone(1e3+e*420,1.6,`sine`,.22/(e+1),e*.28),this.tone(1e3+e*420,1.6,`sine`,.22/(e+1),.45+e*.28);break;case`finisher`:this.tone(60,1.6,`sawtooth`,.35,0,520),this.noise(1.2,800,.4,`bandpass`,.35,.1);break;case`finisherHit`:this.tone(55,1.2,`sine`,1.2,0,22),this.noise(.7,200,.4,`lowpass`,1.2),this.noise(.5,5e3,.5,`highpass`,.5),this.tone(880,1.5,`triangle`,.25,.05,440);break;case`ready`:this.tone(520,.12,`triangle`,.3),this.tone(780,.12,`triangle`,.3,.1),this.tone(1040,.4,`triangle`,.3,.2);break;case`count`:this.tone(300,.2,`square`,.18,0,260),this.noise(.1,300,.4,`lowpass`,.5);break;case`tap`:this.noise(.06,3e3,1,`highpass`,.3),this.noise(.06,3e3,1,`highpass`,.3,.12);break;case`click`:this.tone(700,.05,`square`,.08,0,500);break;case`confirm`:this.tone(520,.1,`triangle`,.2),this.tone(780,.14,`triangle`,.2,.08);break;case`back`:this.tone(420,.1,`triangle`,.18,0,300);break;case`grab`:this.noise(.1,600,1,`bandpass`,.35),this.tone(200,.1,`sine`,.3,0,120);break;case`win`:[0,4,7,12].forEach((e,t)=>this.tone(hu(60+e),.6,`triangle`,.25,t*.12));break;case`cannon`:this.noise(.5,220,.5,`lowpass`,1.3),this.tone(70,.7,`sine`,1.3,0,24),this.noise(.25,3500,.6,`highpass`,.5);break;case`engine`:for(let e=0;e<6;e++)this.tone(48+e%2*6,.25,`sawtooth`,.09,e*.18);break;case`summon`:[0,7,12,19].forEach((e,t)=>this.tone(hu(55+e),.5,`triangle`,.14,t*.06)),this.noise(.4,900,.5,`bandpass`,.15);break;case`feedback`:this.tone(2300,.6,`sine`,.22,0,3100),this.tone(2310,.6,`sine`,.18,.02,3e3),this.noise(.15,5e3,.8,`highpass`,.25);break;case`olé`:[0,4,7].forEach((e,t)=>this.tone(hu(64+e),.3,`triangle`,.2,t*.1));break;case`foul`:this.tone(180,.35,`sawtooth`,.22,0,120);break;case`unlock`:[0,7,12,16].forEach((e,t)=>this.tone(hu(72+e),.5,`sine`,.22,t*.09))}}cheer(e=1){this.crowdTarget=Math.min(1,this.crowdLevel+.4*e),window.setTimeout(()=>{this.crowdTarget=Math.max(.2,this.crowdTarget-.35*e)},900)}setCrowd(e){this.crowdTarget=e}tickCrowd(e){this.ctx&&(this.crowdLevel+=(this.crowdTarget-this.crowdLevel)*Math.min(1,e*2.5),this.crowdG.gain.value=this.crowdLevel*.12*this.vol.sfx,this.crowdFilter.frequency.value=420+this.crowdLevel*500)}say(e){if(this.vol.voice)try{let t=new SpeechSynthesisUtterance(e);t.lang=`es-ES`,t.rate=1.05,t.pitch=.9,t.volume=.9*this.vol.master,speechSynthesis.cancel(),speechSynthesis.speak(t)}catch{}}speak(e,t,n){if(!this.vol.voice)return!1;try{if(!(`speechSynthesis`in window))return!1;let r=speechSynthesis.getVoices().filter(e=>e.lang.toLowerCase().startsWith(`es`)),i=t===0?/jorge|diego|juan|carlos|pablo|male/i:/m[oó]nica|paulina|marisol|luc[ií]a|elena|helena|female/i,a=r.find(e=>i.test(e.name)&&e.lang.toLowerCase().startsWith(`es-es`))??r.find(e=>i.test(e.name))??r[t%Math.max(1,r.length)],o=new SpeechSynthesisUtterance(e);return o.lang=`es-ES`,a&&(o.voice=a),o.pitch=t===0?.8:1.25,o.rate=t===0?1.14:1.08,o.volume=Math.min(1,.95*this.vol.master+.1),o.onend=()=>n(),o.onerror=()=>n(),speechSynthesis.speak(o),!0}catch{return!1}}cancelSpeech(){try{speechSynthesis.cancel()}catch{}}music(e){if(!this.ctx){this.musicKind=e;return}if(e===this.musicKind&&this.musicTimer||(this.stopMusic(),this.musicKind=e,!e))return;this.bar=0,this.nextBar=this.t()+.1;let t=()=>{for(;this.nextBar<this.t()+.8;)this.scheduleBar(e,this.nextBar,this.bar),this.nextBar+=this.barLen(e),this.bar++};t(),this.musicTimer=window.setInterval(t,250)}stopMusic(){this.musicTimer&&window.clearInterval(this.musicTimer),this.musicTimer=null,this.musicKind=null}barLen(e){return e===`manchester`?60/112*4:e===`matamoros`?60/76*4:e===`victoria`?2:60/84*4}mtone(e,t,n,r,i,a=2e3,o=.02){let s=this.ctx,c=s.createOscillator();c.type=n,c.frequency.value=e;let l=s.createBiquadFilter();l.type=`lowpass`,l.frequency.value=a;let u=s.createGain();u.gain.setValueAtTime(1e-4,i),u.gain.linearRampToValueAtTime(r,i+o),u.gain.exponentialRampToValueAtTime(1e-4,i+t),c.connect(l),l.connect(u),u.connect(this.musG),c.start(i),c.stop(i+t+.05)}scheduleBar(e,t,n){let r=this.barLen(e);if(e===`matamoros`){[[50,57,62,65],[46,53,58,62],[53,57,60,65],[48,55,60,64]][n%4].forEach((e,n)=>{this.mtone(hu(e+12),r*1.05,`sawtooth`,.05,t,900,.5),this.mtone(hu(e+12)*1.004,r*1.05,`sawtooth`,.04,t,900,.5),n===0&&this.mtone(hu(e-12),r,`sine`,.2,t,400,.1)}),this.mtone(70,.5,`sine`,.35,t,300,.005),this.mtone(70,.5,`sine`,.2,t+r*.75,300,.005);let e=[74,72,70,69,65,67,69,72];for(let i=0;i<4;i++)this.mtone(hu(e[(n*2+i)%e.length]+12),r/4,`triangle`,.07,t+i*r/4,2400,.04)}else if(e===`manchester`){let e=[45,45,41,43][n%4];for(let n=0;n<8;n++){let i=t+n*r/8;this.mtone(hu(e-12),.22,`sawtooth`,.2,i,500,.005),n%2==1&&this.mtone(hu(e+12+(n===3?7:0)),.12,`square`,.05,i,1800,.005)}this.noise(.08,8e3,.6,`highpass`,.06,t-this.t(),this.musG);for(let e=0;e<4;e++)this.noise(.1,200,1,`lowpass`,.35,t+e*r/4-this.t(),this.musG);[0,7,12,15].forEach(n=>this.mtone(hu(e+24+n),r,`sawtooth`,.03,t,1200,.3))}else if(e===`victoria`)[0,4,7,12].forEach((e,n)=>this.mtone(hu(60+e),1.6,`triangle`,.12,t+n*.15,3e3,.02));else{let e=[38,38,34,36][n%4];this.mtone(hu(e),r,`sine`,.3,t,300,.4),this.mtone(hu(e+12),r,`sawtooth`,.04,t,500,.6),this.mtone(hu(e+19),r,`sawtooth`,.03,t,600,.8);for(let n=0;n<8;n++)this.mtone(hu(e+24+[0,3,7,10][n%4]),.3,`triangle`,.045,t+n*r/8,1500,.01);this.noise(.12,150,1,`lowpass`,.5,t-this.t(),this.musG),this.noise(.12,150,1,`lowpass`,.4,t+r/2-this.t(),this.musG)}}},gu=[{id:`matamoros`,name:`Matamoros`,desc:`30.000 personas · orquesta en la esquina superior derecha`},{id:`manchester`,name:`Manchester`,desc:`60.000 personas · teatro con dos columnas gigantes y un monigote azul`},{id:`random`,name:`Aleatoria`,desc:`Que decida el destino`}],_u=[{id:`facil`,name:`Fácil`,desc:`La CPU falla a propósito y perdona errores.`},{id:`intermedia`,name:`Intermedia`,desc:`Recomendada: espectáculo y reto.`},{id:`dificil`,name:`Difícil`,desc:`La CPU no perdona. Se juega la vida.`}],vu=(e,t,n)=>Math.max(.05,Math.min(1,(e-t)/(n-t))),yu=class{root;game;cur=null;pauseEl=null;onBack=null;typing=null;confirmHandler=null;pauseResume=null;useFocus=!1;constructor(e,t){this.root=e,this.game=t,window.addEventListener(`keydown`,e=>this.nav(e));let n=()=>{this.useFocus&&(this.useFocus=!1,document.body.classList.remove(`nav-focus`),document.activeElement?.blur?.())};window.addEventListener(`pointerdown`,n),window.addEventListener(`mousemove`,n)}isOpen(){return!!(this.cur||this.pauseEl)}set(e,t=null){let n=-1;if(this.useFocus&&this.cur&&this.cur.className===e.className&&(n=[...this.cur.querySelectorAll(`[data-nav]`)].indexOf(document.activeElement)),this.clear(),this.cur=e,this.onBack=t,this.confirmHandler=null,this.root.appendChild(e),this.useFocus){let t=e.querySelectorAll(`[data-nav]`);n>=0&&t[n]?t[n].focus({preventScroll:!0}):this.focusFirst(e)}}focusFirst(e){e.querySelector(`.go:not([disabled])`)?.focus({preventScroll:!0})??e.querySelector(`[data-nav]:not([disabled])`)?.focus({preventScroll:!0})}enterNavMode(){this.useFocus||(this.useFocus=!0,document.body.classList.add(`nav-focus`))}clear(){this.typing&&=(clearInterval(this.typing),null),this.cur?.remove(),this.cur=null,this.onBack=null}click(e=`click`){Q.init(),Q.sfx(e)}nav(e){if(!this.cur&&!this.pauseEl)return;if(e.key===`Escape`&&this.onBack&&!this.pauseEl){this.click(`back`),this.onBack(),e.preventDefault();return}if(![`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`].includes(e.key)||e.target?.tagName===`INPUT`&&(e.key===`ArrowLeft`||e.key===`ArrowRight`))return;let t={ArrowUp:`up`,ArrowDown:`down`,ArrowLeft:`left`,ArrowRight:`right`}[e.key];this.moveFocus(t),e.preventDefault()}moveFocus(e){let t=this.pauseEl??this.cur;if(!t)return;this.enterNavMode();let n=[...t.querySelectorAll(`[data-nav]:not([disabled])`)].filter(e=>e.offsetParent!==null);if(!n.length)return;let r=document.activeElement;if(!n.includes(r)){this.focusFirst(t),Q.sfx(`click`);return}if(r instanceof HTMLInputElement&&r.type===`range`&&(e===`left`||e===`right`)){let t=Number(r.step||.05)*(e===`left`?-1:1);r.value=String(Math.max(Number(r.min),Math.min(Number(r.max),Number(r.value)+t))),r.dispatchEvent(new Event(`input`,{bubbles:!0}));return}let i=r.getBoundingClientRect(),a={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[e],o=null,s=1/0;for(let e of n){if(e===r)continue;let t=e.getBoundingClientRect(),n=t.left+t.width/2-(i.left+i.width/2),c=t.top+t.height/2-(i.top+i.height/2),l=n*a[0]+c*a[1];if(l<=4)continue;let u=l+(Math.abs(n*a[1])+Math.abs(c*a[0]))*2.2;u<s&&(s=u,o=e)}o&&(o.focus(),o.scrollIntoView({block:`nearest`,inline:`nearest`}),Q.sfx(`click`))}pad(e){if(Q.init(),e===`up`||e===`down`||e===`left`||e===`right`)this.moveFocus(e);else if(this.enterNavMode(),this.pauseEl){if(e===`back`||e===`start`){this.click(`back`),this.pauseResume?.();return}if(e===`confirm`){let e=document.activeElement;this.pauseEl.contains(e)&&e.matches(`[data-nav]`)?e.click():this.focusFirst(this.pauseEl)}}else if(this.cur){if(e===`back`){if(this.cur.classList.contains(`dialogue`)){this.cur.querySelector(`.skip`)?.click();return}this.onBack&&(this.click(`back`),this.onBack())}else if(e===`confirm`||e===`start`){if(this.confirmHandler){this.confirmHandler();return}let e=document.activeElement;if(this.cur.contains(e)&&e.matches(`[data-nav]`)){if(e instanceof HTMLInputElement)return;e.click()}else this.focusFirst(this.cur)}}}btn(e,t,n=``,r=``){return Z(`button`,{class:`btn `+n,"data-nav":!0,onClick:()=>{this.click(n.includes(`primary`)?`confirm`:`click`),t()}},[Z(`span`,{},e),r&&Z(`small`,{},r)])}portrait(e,t=``){let n=Z(`div`,{class:`portrait `+t}),r=t===``||/mini|dp|rp/.test(t),i=e?r?e.pfp??e.portrait:e.portrait??e.pfp:null;return i?n.appendChild(Z(`img`,{src:i,alt:e.name,draggable:!1})):n.appendChild(Z(`div`,{class:`noimg`},e?e.name.charAt(0):`?`)),n}statBars(e){let t=e.fullStats;return Z(`div`,{class:`stats`},[[`Velocidad`,vu(t.speed,.8,1.35)],[`Potencia`,vu(t.power,.8,1.3)],[`Vida`,vu(t.health,65,130)],[`Resistencia`,vu(t.stamina,80,140)],[`Rapidez golpes`,vu(t.tempo,.85,1.3)]].map(([e,t])=>Z(`div`,{class:`stat`},[Z(`span`,{},e),Z(`div`,{class:`sbar`},[Z(`i`,{style:`width:${Math.round(t*100)}%`})])])))}movesList(e){let t=e.moves,n=(e,t)=>Z(`li`,{},[Z(`em`,{},e),t]);return Z(`ul`,{class:`moves`},[n(`Combo`,t.light.map(e=>g(e).name).join(` · `)),n(t.heavyRandom?`Fuerte (azar)`:`Fuerte`,t.heavyRandom?t.heavyRandom.map(([e])=>g(e).name).join(` · `):g(t.heavy).name),n(`Agarres`,`${e.moves.grab.throw} / ${e.moves.grab.slam} / ${e.moves.grab.sub}`.replace(/_/g,` `)),n(`Burla`,g(t.taunt).name),Z(`li`,{class:`fin`},[Z(`em`,{},`Finisher`),g(t.finisher).name])])}card(e,t,n){return e?Z(`div`,{class:`fcard ${t}`},[Z(`div`,{class:`ftag`},n),this.portrait(e,`big`),Z(`div`,{class:`fname`},e.name),this.statBars(e),Z(`div`,{class:`fbio`},e.style)]):Z(`div`,{class:`fcard ${t} empty`},[Z(`div`,{class:`ftag`},n),Z(`div`,{class:`fname`},`Elige luchador`)])}strip(e,t,n={}){let r=Z(`div`,{class:`strip`});for(let i of this.game.roster){let a=n.all||this.game.isUnlocked(i),o=Z(`button`,{class:`tile`+(e[i.id]?` sel`:``)+(a?``:` locked`)+(i.placeholder?` ph`:``),"data-nav":!0,title:a?i.name:i.unlock?.hint??`Bloqueado`,onClick:()=>{a?(this.click(),t(i)):Q.sfx(`foul`)}},[this.portrait(i),Z(`span`,{class:`tname`},a?i.name:`???`),!a&&Z(`span`,{class:`lock`},`🔒 `+(i.unlock?.hint??``))]);r.appendChild(o)}return n.random&&r.appendChild(Z(`button`,{class:`tile rnd`,"data-nav":!0,onClick:()=>{this.click(),n.random()}},[Z(`div`,{class:`portrait`},[Z(`div`,{class:`noimg`},`?`)]),Z(`span`,{class:`tname`},`Aleatorio`)])),r}chips(e,t,n,r){let i=Z(`div`,{class:`chipdesc`},e.find(e=>e.id===t)?.desc??``),a=Z(`div`,{class:`chips`});return e.forEach(e=>{a.appendChild(Z(`button`,{class:`chip`+(e.id===t?` on`:``),"data-nav":!0,onClick:()=>{this.click(),n(e.id),a.querySelectorAll(`.chip`).forEach(e=>e.classList.remove(`on`)),a.querySelector(`[data-id="${e.id}"]`).classList.add(`on`),i.textContent=e.desc},"data-id":e.id},e.name))}),Z(`div`,{class:`chipgroup`},[Z(`div`,{class:`chiptitle`},r),a,i])}logo(e=!1){return Z(`div`,{class:`logo`+(e?` small`:``)},[Z(`div`,{class:`l1`},[Z(`span`,{class:`l-el`},`EL`),Z(`span`,{class:`l-hoyo`},[`H`,Z(`span`,{class:`hole`}),`YO`])]),Z(`div`,{class:`l2`},`WRESTLING`)])}showTitle(){let e=Z(`div`,{class:`screen title`,onClick:()=>{Q.init(),Q.music(`menu`),this.click(`confirm`),this.game.goMenu()}},[this.logo(),Z(`div`,{class:`press`},this.game.useTouch?`TOCA PARA EMPEZAR`:`PULSA CUALQUIER TECLA O HAZ CLIC`),Z(`div`,{class:`credit`},`Inspirado en la obra original de Jefefbi`),Z(`div`,{class:`ver`},`Demo jugable · v0.1`)]);this.set(e),this.confirmHandler=()=>e.click();let t=n=>{this.cur===e&&(window.removeEventListener(`keydown`,t),e.click(),n.preventDefault())};window.addEventListener(`keydown`,t)}showMenu(){let e=this.game,t=e=>Z(`button`,{class:`btn compact disabled`,disabled:!0,title:`Próximamente`},[Z(`span`,{},e),Z(`small`,{},`Próximamente`)]),n=Z(`div`,{class:`screen menu`},[Z(`div`,{class:`menu-left`},[this.logo(!0),Z(`nav`,{class:`menu-list`},[this.btn(`VERSUS`,()=>this.showVersusSetup(),`primary`,`Un combate contra la CPU`),this.btn(`TORNEO`,()=>this.showTournamentSetup(),`primary`,`Cuadro de eliminatorias`),this.btn(`ESPECTADOR`,()=>this.showSpectateSetup(),``,`CPU contra CPU, con narrador`),Z(`div`,{class:`menu-grid`},[t(`HISTORIA`),t(`SUPERVIVENCIA`),this.btn(`PLANTILLA`,()=>this.showRoster(),`compact`),this.btn(`LOGROS`,()=>this.showAchievements(),`compact`,`${Object.keys(e.save.achievements).length}/${iu.length}`),this.btn(`AJUSTES`,()=>this.showSettings(()=>this.showMenu()),`compact`),this.btn(`CRÉDITOS`,()=>this.showCredits(),`compact`)])]),Z(`div`,{class:`menu-foot`},`${e.save.wins} victorias · ${e.save.losses} derrotas`)])]);this.set(n),e.showcase?.setFighter(0,null),e.showcase?.setFighter(1,null),e.showcase&&(e.showcase.mode=`orbit`)}showSpectateSetup(){this.showVersusSetup(void 0,!0)}showVersusSetup(e,t=!1){let n=this.game,r=t?n.roster:n.roster.filter(e=>n.isUnlocked(e)),i=n.lastSpectate,a={player:e?.player??(t?i?.a:void 0)??r[0].id,cpu:e?.cpu??(t?i?.b??r[1]?.id??``:``),arena:e?.arena??(t?i?.arena:void 0)??`matamoros`,difficulty:e?.difficulty??n.save.settings.difficulty,slot:e?.cpu||t?0:1},o=t?`CPU 1`:`TÚ`,s=t?`CPU 2`:`CPU`,c=n.showcase;c.mode=`close`;let l=()=>{let e=a.player?n.roster.find(e=>e.id===a.player):null,i=a.cpu?n.roster.find(e=>e.id===a.cpu):null;c.setFighter(0,e),c.setFighter(1,i);let u=Z(`div`,{class:`screen setup`},[Z(`div`,{class:`topbar`},[this.btn(`‹ Atrás`,()=>this.showMenu(),`small`),Z(`h2`,{},t?`ESPECTADOR`:`VERSUS`),t&&Z(`span`,{class:`subnote`},`Dos CPUs luchan · cámara de director y narrador`)]),Z(`div`,{class:`cards`},[this.card(e,`left`,o),Z(`div`,{class:`vs`},`VS`),this.card(i,`right`,s)]),Z(`div`,{class:`slots`},[Z(`button`,{class:`slot`+(a.slot===0?` on`:``),"data-nav":!0,onClick:()=>{a.slot=0,l()}},`Eligiendo: `+o),Z(`button`,{class:`slot`+(a.slot===1?` on`:``),"data-nav":!0,onClick:()=>{a.slot=1,l()}},`Eligiendo: `+s)]),this.strip({[a.player]:a.slot===0,[a.cpu]:a.slot===1},e=>{a.slot===0?(a.player=e.id,a.cpu||(a.slot=1)):a.cpu=e.id,l()},{all:t,random:()=>{let e=a.slot===0?a.cpu:a.player,t=r.filter(t=>t.id!==e),n=t[Math.floor(Math.random()*t.length)];a.slot===0?a.player=n.id:a.cpu=n.id,l()}}),Z(`div`,{class:`options`},[this.chips(gu,a.arena,e=>a.arena=e,`ESCENARIO`),this.chips(_u,a.difficulty,e=>{a.difficulty=e,n.save.settings.difficulty=e},t?`NIVEL DE LAS CPU`:`DIFICULTAD`),this.btn(t?`¡A VER EL COMBATE!`:`¡A LUCHAR!`,()=>{!a.player||!a.cpu?(Q.sfx(`foul`),a.cpu||(a.slot=1,l())):a.player===a.cpu?Q.sfx(`foul`):(n.commitSettings(),t?n.startSpectate({a:a.player,b:a.cpu,arena:a.arena,difficulty:a.difficulty}):n.startVersus({player:a.player,cpu:a.cpu,arena:a.arena,difficulty:a.difficulty}))},`primary go`)])]);this.set(u,()=>this.showMenu())};l()}showTournamentSetup(){let e=this.game,t=e.roster.filter(t=>e.isUnlocked(t))[0].id,n=e.save.settings.difficulty,r=e.showcase;r.mode=`close`;let i=e.roster.length>=8?8:4,a=()=>{let o=e.roster.find(e=>e.id===t);r.setFighter(0,o),r.setFighter(1,null);let s=Z(`div`,{class:`screen setup tsetup`},[Z(`div`,{class:`topbar`},[this.btn(`‹ Atrás`,()=>this.showMenu(),`small`),Z(`h2`,{},`TORNEO`)]),Z(`div`,{class:`cards`},[this.card(o,`left`,`TU LUCHADOR`),Z(`div`,{class:`tinfo`},[Z(`h3`,{},`Cuadro de ${i} luchadores`),Z(`p`,{},`Gana ${Math.log2(i)} combates seguidos para proclamarte campeón. Las primeras rondas se juegan en Matamoros y la final, en Manchester. Si pierdes, quedas eliminado.`),Z(`p`,{class:`dim`},`Torneos ganados: Fácil ${e.save.tournaments.facil} · Intermedia ${e.save.tournaments.intermedia} · Difícil ${e.save.tournaments.dificil}`)])]),this.strip({[t]:!0},e=>{t=e.id,a()}),Z(`div`,{class:`options`},[this.chips(_u,n,t=>{n=t,e.save.settings.difficulty=t},`DIFICULTAD`),this.btn(`EMPEZAR TORNEO`,()=>{e.commitSettings(),e.startTournament(t,n)},`primary go`)])]);this.set(s,()=>this.showMenu())};a()}showBracket(e,t,n,r,i){let a=this.game,o=e=>a.roster.find(t=>t.id===e),s=Z(`div`,{class:`bracket`}),c=Math.log2(e.size);for(let t=0;t<c;t++){let n=e.rounds[t],r=Z(`div`,{class:`bcol`},[Z(`div`,{class:`btitle`},su(e,t))]),i=e.size/2**(t+1);for(let a=0;a<i;a++){let i=n?.[a],s=(t,n,r)=>{let i=t?o(t):null;return Z(`div`,{class:`bslot`+(t===e.playerId?` me`:``)+(n?` won`:``)+(r?` lost`:``)+(i?``:` tbd`)},[i?this.portrait(i,`mini`):Z(`div`,{class:`portrait mini`}),Z(`span`,{},i?i.name:`Por decidir`)])};r.appendChild(Z(`div`,{class:`bmatch`+(i&&t===e.round&&(i.a===e.playerId||i.b===e.playerId)&&!e.eliminated&&!e.champion?` now`:``)},[s(i?.a,!!i?.winner&&i.winner===i.a,!!i?.winner&&i.winner!==i.a),s(i?.b,!!i?.winner&&i.winner===i.b,!!i?.winner&&i.winner!==i.b)]))}s.appendChild(r)}let l=e.champion?o(e.champion):null;s.appendChild(Z(`div`,{class:`bcol champ`},[Z(`div`,{class:`btitle`},`CAMPEÓN`),Z(`div`,{class:`bslot`+(l?` won`:` tbd`)+(l?.id===e.playerId?` me`:``)},[l?this.portrait(l,`mini`):Z(`div`,{class:`portrait mini`},Z(`div`,{class:`noimg`},`🏆`)),Z(`span`,{},l?l.name:`???`)])]));let u;if(e.champion)Q.sfx(`win`),u=Z(`div`,{class:`bfoot`},[Z(`div`,{class:`bresult gold`},e.champion===e.playerId?`¡ERES EL CAMPEÓN DEL HOYO!`:`${l.name} gana el torneo`),Z(`div`,{class:`btns`},[this.btn(`Nuevo torneo`,()=>this.showTournamentSetup(),`primary`),this.btn(`Menú principal`,r)])]);else if(e.eliminated)u=Z(`div`,{class:`bfoot`},[Z(`div`,{class:`bresult red`},`ELIMINADO`),Z(`div`,{class:`btns`},[i?this.btn(`Reintentar torneo`,i,`primary`):null,this.btn(`Menú principal`,r)])]);else{let t=o(pu(e)),i=cu(e,e.round,()=>.5);u=Z(`div`,{class:`bfoot`},[Z(`div`,{class:`bnext`},[Z(`b`,{},su(e)),` · ${o(e.playerId).name} vs ${t.name} · ${i===`manchester`?`Manchester`:`Matamoros`}${e.round,c-1,``}`]),Z(`div`,{class:`btns`},[this.btn(`¡AL RING!`,n,`primary go`),this.btn(`Abandonar torneo`,r)])])}let d=Z(`div`,{class:`screen bracketscreen`},[Z(`div`,{class:`topbar`},[Z(`h2`,{},`TORNEO · `+_u.find(e=>e.id===t).name.toUpperCase())]),s,u]);this.set(d),a.showcase?.setFighter(0,null),a.showcase?.setFighter(1,null)}showDialogue(e,t,n,r){let i=this.game,a=i.showcase;a?.setFighter(0,t),a?.setFighter(1,n),a&&(a.mode=`close`);let o=0,s=e=>e===t.id?t:e===n.id?n:i.roster.find(t=>t.id===e)??null,c=Z(`div`,{class:`dname`}),l=Z(`div`,{class:`dtext`}),u=Z(`div`,{class:`dport`}),d=Z(`div`,{class:`dbox`},[u,Z(`div`,{class:`dmain`},[c,l,Z(`div`,{class:`dnext`},`Clic / Espacio para continuar ▸`)])]),f=Z(`div`,{class:`screen dialogue`},[Z(`button`,{class:`btn small skip`,"data-nav":!0,onClick:()=>_()},`Saltar »`),d]),p=!1,m=()=>e[o].text,h=()=>{let r=e[o],i=s(r.who);c.textContent=i?.name??(r.who===`arbitro`?`Árbitro`:r.who.charAt(0).toUpperCase()+r.who.slice(1)),c.className=`dname `+(i===t?`p1`:i===n?`p2`:``),eu(u),u.appendChild(this.portrait(i,`dp`)),d.classList.toggle(`right`,i===n),l.textContent=``,p=!1;let a=0;this.typing&&clearInterval(this.typing),this.typing=window.setInterval(()=>{a+=1,l.textContent=m().slice(0,a),a%3==0&&Q.sfx(`click`),a>=m().length&&(clearInterval(this.typing),this.typing=null,p=!0)},24)},g=()=>{p?(o++,o>=e.length?_():h()):(this.typing&&clearInterval(this.typing),this.typing=null,l.textContent=m(),p=!0)},_=()=>{window.removeEventListener(`keydown`,v),r()},v=e=>{this.cur===f?(e.key===` `||e.key===`Enter`)&&(g(),e.preventDefault()):window.removeEventListener(`keydown`,v)};window.addEventListener(`keydown`,v),d.addEventListener(`click`,g),this.set(f),this.confirmHandler=g,h()}showVS(e,t,n,r,i,a=!1){let o=this.game.showcase;o?.setFighter(0,null),o?.setFighter(1,null);let s=n===`manchester`?`MANCHESTER`:`MATAMOROS`,c=!1,l=()=>{c||(c=!0,window.removeEventListener(`keydown`,u),clearTimeout(f),i())},u=e=>{(e.key===` `||e.key===`Enter`)&&l()},d=Z(`div`,{class:`screen vsscreen`,onClick:l},[Z(`div`,{class:`vs-side left`},[this.portrait(e,`vsp`),Z(`div`,{class:`vsname`},e.name),Z(`div`,{class:`vstag`},a?`CPU 1`:`TÚ`)]),Z(`div`,{class:`vs-mid`},[Z(`div`,{class:`vsbig`},`VS`),Z(`div`,{class:`vsarena`},s),Z(`div`,{class:`vsdiff`},_u.find(e=>e.id===r).name.toUpperCase())]),Z(`div`,{class:`vs-side right`},[this.portrait(t,`vsp`),Z(`div`,{class:`vsname`},t.name),Z(`div`,{class:`vstag`},a?`CPU 2`:`CPU`)])]);window.addEventListener(`keydown`,u);let f=window.setTimeout(l,2600);this.set(d),this.confirmHandler=l,Q.sfx(`heavy`)}showResults(e,t){let n=Math.floor(e.time/60),r=Math.floor(e.time%60),i=e.quotes.length?Z(`div`,{class:`quotes`},e.quotes.map(e=>Z(`p`,{},[Z(`b`,{},(e.who?.name??`Árbitro`)+`: `),e.text]))):null,a=[];e.unlocked.length&&a.push(Z(`div`,{class:`unlocks`},[Z(`h4`,{},`¡LUCHADOR DESBLOQUEADO!`),Z(`div`,{class:`ulist`},e.unlocked.map(e=>Z(`div`,{class:`ucard`},[this.portrait(e,`mini`),Z(`span`,{},e.name)])))])),e.newAchievements.length&&a.push(Z(`div`,{class:`unlocks`},[Z(`h4`,{},`LOGROS NUEVOS`),...e.newAchievements.map(e=>Z(`div`,{class:`ach new`},[Z(`b`,{},`★ `+e.name),Z(`span`,{},e.desc)]))]));let o=Z(`div`,{class:`screen results `+(e.won?`win`:`lose`)},[Z(`div`,{class:`rpanel`},[Z(`div`,{class:`rtitle`},e.spectate?`FIN DEL COMBATE`:e.won?`VICTORIA`:`DERROTA`),Z(`div`,{class:`rwho`},[this.portrait(e.winner,`rp`),Z(`div`,{},[Z(`div`,{class:`rname`},e.winner.name),Z(`div`,{class:`rreason`},`${e.reasonText} a ${e.loser.name}`)])]),Z(`div`,{class:`rstats`},[Z(`div`,{},[Z(`b`,{},`${n}:${String(r).padStart(2,`0`)}`),`Duración`]),Z(`div`,{},[Z(`b`,{},String(Math.round(e.damage.dealt))),`Daño causado`]),Z(`div`,{},[Z(`b`,{},String(Math.round(e.damage.taken))),`Daño recibido`])]),i,...a,Z(`div`,{class:`btns`},t.map(e=>this.btn(e.label,e.action,e.primary?`primary go`:``)))])]);this.set(o)}showPause(e,t){this.hidePause(),this.pauseResume=e;let n=this.game,r=(e,t)=>Z(`label`,{class:`slider`},[Z(`span`,{},e),Z(`input`,{type:`range`,min:`0`,max:`1`,step:`0.05`,value:String(n.save.settings[t]),onInput:e=>{n.save.settings[t]=Number(e.target.value),n.commitSettings()}})]);this.pauseEl=Z(`div`,{class:`screen pause overlay`},[Z(`div`,{class:`rpanel`},[Z(`div`,{class:`rtitle`},`PAUSA`),r(`Volumen general`,`master`),r(`Música`,`music`),r(`Efectos`,`sfx`),Z(`div`,{class:`help`,html:n.controlsHint()}),Z(`div`,{class:`help dim`},`Contraataque: pulsa GUARDIA justo antes de que llegue el golpe. Revertir agarre: pulsa AGARRE justo antes de que te agarren. Pin: acércate a un rival en el suelo y pulsa AGARRE. Con el finisher listo (barra llena) pulsa F.`),Z(`div`,{class:`btns`},[this.btn(`Reanudar`,e,`primary go`),this.btn(`Abandonar combate`,t)])])]),this.root.appendChild(this.pauseEl),this.useFocus&&this.focusFirst(this.pauseEl)}hidePause(){this.pauseEl?.remove(),this.pauseEl=null,this.pauseResume=null}showRoster(){let e=this.game,t=e.showcase;t.mode=`close`;let n=e.roster[0].id,r=()=>{let i=e.roster.find(e=>e.id===n),a=e.isUnlocked(i);t.setFighter(0,a?i:null),t.setFighter(1,null);let o=Z(`div`,{class:`screen roster`},[Z(`div`,{class:`topbar`},[this.btn(`‹ Atrás`,()=>this.showMenu(),`small`),Z(`h2`,{},`PLANTILLA`)]),Z(`div`,{class:`rost-main`},[Z(`div`,{class:`rost-detail`},[this.portrait(i,`big`),Z(`div`,{class:`fname`},a?i.name:`???`),a?this.statBars(i):Z(`div`,{class:`lockbox`},`🔒 `+(i.unlock?.hint??`Bloqueado`)),a?this.movesList(i):null]),Z(`div`,{class:`rost-bio`},a?[Z(`p`,{},i.description),Z(`p`,{class:`stylep`},[Z(`b`,{},`Estilo de lucha. `),i.style])]:[Z(`p`,{},`Desbloquea a este luchador para conocer su historia.`)])]),this.strip({[n]:!0},e=>{n=e.id,r()})]);this.set(o,()=>this.showMenu())};r()}showAchievements(){let e=this.game,t=iu.map(t=>{let n=e.save.achievements[t.id];return Z(`div`,{class:`ach`+(n?` got`:``)},[Z(`b`,{},(n?`★ `:`☆ `)+t.name),Z(`span`,{},t.desc)])}),n=Z(`div`,{class:`screen achs`},[Z(`div`,{class:`topbar`},[this.btn(`‹ Atrás`,()=>this.showMenu(),`small`),Z(`h2`,{},`LOGROS`)]),Z(`div`,{class:`astats`},[`${e.save.wins} victorias`,`${e.save.losses} derrotas`,`Torneos: ${e.save.tournaments.facil+e.save.tournaments.intermedia+e.save.tournaments.dificil}`,`${Object.keys(e.save.achievements).length}/${iu.length} logros`].map(e=>Z(`span`,{},e))),Z(`div`,{class:`agrid`},t),Z(`h3`,{class:`sub`},`Luchadores`),Z(`div`,{class:`agrid`},e.roster.map(t=>{let n=e.isUnlocked(t);return Z(`div`,{class:`ach`+(n?` got`:``)},[Z(`b`,{},(n?`✔ `:`🔒 `)+(n?t.name:`???`)),Z(`span`,{},n?t.unlock?`Desbloqueado`:`Disponible desde el principio`:t.unlock?.hint??``)])}))]);this.set(n,()=>this.showMenu())}showSettings(e){let t=this.game,n=t.save.settings,r=(e,r)=>Z(`label`,{class:`slider`},[Z(`span`,{},e),Z(`input`,{type:`range`,min:`0`,max:`1`,step:`0.05`,value:String(n[r]),"data-nav":!0,onInput:e=>{n[r]=Number(e.target.value),t.commitSettings(),Q.init(),Q.sfx(`hit`)}})]),i=(e,r)=>{let i=Z(`button`,{class:`chip`+(n[r]?` on`:``),"data-nav":!0,onClick:()=>{n[r]=!n[r],i.classList.toggle(`on`,n[r]),t.commitSettings(),this.click()}},n[r]?`Sí`:`No`);return i.addEventListener(`click`,()=>i.textContent=n[r]?`Sí`:`No`),Z(`div`,{class:`srow`},[Z(`span`,{},e),i])},a=(e,r,i)=>{let a=Z(`div`,{class:`chips`});return i.forEach(([e,i])=>a.appendChild(Z(`button`,{class:`chip`+(n[r]===e?` on`:``),"data-nav":!0,"data-v":e,onClick:()=>{n[r]=e,a.querySelectorAll(`.chip`).forEach(t=>t.classList.toggle(`on`,t.dataset.v===e)),t.commitSettings(),this.click()}},i))),Z(`div`,{class:`srow col`},[Z(`span`,{},e),a])},o=Z(`div`,{class:`screen settings`},[Z(`div`,{class:`topbar`},[this.btn(`‹ Atrás`,()=>{t.commitSettings(),e()},`small`),Z(`h2`,{},`AJUSTES`)]),Z(`div`,{class:`spanel`},[r(`Volumen general`,`master`),r(`Música`,`music`),r(`Efectos y público`,`sfx`),i(`Voz del árbitro (cuenta del pin)`,`voice`),i(`Sacudida de cámara`,`shake`),i(`Mostrar FPS`,`fps`),a(`Calidad gráfica`,`quality`,[[`auto`,`Auto`],[`baja`,`Baja`],[`media`,`Media`],[`alta`,`Alta`]]),a(`Controles táctiles`,`touch`,[[`auto`,`Auto`],[`on`,`Siempre`],[`off`,`Nunca`]]),Z(`div`,{class:`srow`},[Z(`span`,{},`Progreso guardado`),this.btn(`Borrar`,()=>{confirm(`¿Borrar victorias, logros y luchadores desbloqueados?`)&&(localStorage.removeItem(`el-hoyo-wrestling-v1`),location.reload())},`small danger`)])])]);this.set(o,()=>{t.commitSettings(),e()})}showCredits(){let e=Z(`div`,{class:`screen credits`},[Z(`div`,{class:`topbar`},[this.btn(`‹ Atrás`,()=>this.showMenu(),`small`),Z(`h2`,{},`CRÉDITOS`)]),Z(`div`,{class:`rpanel`},[Z(`p`,{class:`big`},`El Hoyo Wrestling — El videojuego`),Z(`p`,{},`Inspirado en la obra original de Jefefbi.`),Z(`p`,{class:`dim`},`Hecho con cariño para el servidor del Hoyo. Motor 3D: three.js · Audio sintetizado con WebAudio · Todo el contenido gráfico y sonoro se genera por código.`)])]);this.set(e,()=>this.showMenu())}},bu=[`hips`,`torso`,`head`,`lU`,`lF`,`rU`,`rF`,`lT`,`lS`,`rT`,`rS`],xu={hips:[0,0,0],torso:[.12,0,0],head:[-.08,0,0],lU:[-.75,0,.22],lF:[-1.9,0,0],rU:[-.65,0,-.22],rF:[-2,0,0],lT:[-.28,0,.1],lS:[.5,0,0],rT:[.18,0,-.1],rS:[.4,0,0],pitch:0,air:0,lie:0,spin:0,roll:0},Su=(e,t=xu)=>({...t,...e}),Cu=Su({hips:[0,0,0],torso:[0,0,0],head:[.1,0,0],lU:[.1,0,.55],lF:[-.25,0,.1],rU:[.1,0,-.55],rF:[-.25,0,-.1],lT:[0,0,.18],lS:[.1,0,0],rT:[0,0,-.18],rS:[.1,0,0],pitch:-Math.PI/2,lie:1}),wu={jab:{wind:{lU:[-.55,0,.3],lF:[-2.5,0,0],torso:[.15,.15,0]},hit:{lU:[-1.55,0,.08],lF:[-.1,0,0],torso:[.22,-.35,0],hips:[0,-.15,0],rU:[-.9,0,-.1]}},cross:{wind:{rU:[-.3,0,-.35],rF:[-2.5,0,0],torso:[.12,-.35,0],hips:[0,-.2,0]},hit:{rU:[-1.5,0,-.1],rF:[-.1,0,0],torso:[.25,.55,0],hips:[0,.35,0],lU:[-.9,0,.3],lT:[-.5,0,.1],lS:[.7,0,0],rT:[.3,0,-.1]}},hook:{wind:{rU:[-1.1,0,-.9],rF:[-.2,0,1],torso:[.15,-.7,0],hips:[0,-.35,0]},hit:{rU:[-1.4,0,-.2],rF:[-.1,0,1.5],torso:[.25,.75,0],hips:[0,.45,0],lT:[-.45,0,.1]}},lowkick:{wind:{rT:[.45,0,-.1],rS:[1.1,0,0]},hit:{rT:[-.95,0,-.1],rS:[.25,0,0],torso:[-.05,.2,0],lS:[.7,0,0]}},knee:{wind:{rT:[-.2,0,-.1],rS:[.5,0,0],lU:[-1.2,0,.15],rU:[-1.2,0,-.15],lF:[-1,0,0],rF:[-1,0,0]},hit:{rT:[-1.7,0,-.1],rS:[1.9,0,0],torso:[.35,0,0],lU:[-1.3,0,.2],rU:[-1.3,0,-.2],lF:[-1,0,0],rF:[-1,0,0]}},elbow:{wind:{rU:[-.5,0,-.9],rF:[-2.6,0,0],torso:[.1,-.5,0]},hit:{rU:[-1.2,0,-.15],rF:[-2.7,0,0],torso:[.3,.7,0],hips:[0,.4,0]}},highkick:{wind:{rT:[.3,0,-.1],rS:[.9,0,0],lU:[-.3,0,.6],rU:[-.3,0,-.6]},hit:{rT:[-2.1,0,-.2],rS:[.15,0,0],torso:[-.45,.2,0],lU:[-.3,0,.9],rU:[-.3,0,-.9],lT:[-.1,0,.1],lS:[.2,0,0]}},haymaker:{wind:{rU:[.9,0,-.7],rF:[-.6,0,0],torso:[.05,-.9,0],hips:[0,-.5,0],lU:[-.9,0,.3],lT:[-.5,0,.1],lS:[.8,0,0],rT:[.35,0,-.1],rS:[.7,0,0]},hit:{rU:[-1.65,0,-.35],rF:[-.1,0,0],torso:[.55,.95,0],hips:[0,.6,0],lT:[-.65,0,.1],lS:[.75,0,0],rT:[.35,0,-.1],rS:[.3,0,0]}},lariat:{wind:{rU:[0,0,-1.45],rF:[0,0,0],lU:[-.5,0,.5],torso:[.2,-1,0],hips:[0,-.6,0],lS:[.8,0,0],lT:[-.4,0,.1]},hit:{rU:[0,0,-1.5],rF:[0,0,0],torso:[.2,1.1,0],hips:[0,.7,0],lU:[-.5,0,.5],lT:[-.6,0,.1],lS:[.8,0,0]}},dropkick:{wind:{lT:[-.4,0,.1],rT:[-.4,0,-.1],lS:[.9,0,0],rS:[.9,0,0],air:.2,torso:[.2,0,0]},hit:{pitch:-1.15,air:.95,lT:[-.3,0,.05],rT:[-.3,0,-.05],lS:[.1,0,0],rS:[.1,0,0],lU:[-.1,0,1],rU:[-.1,0,-1],lF:[-.2,0,0],rF:[-.2,0,0],torso:[-.15,0,0]}},headbutt:{wind:{torso:[-.2,0,0],head:[-.4,0,0],lU:[-.6,0,.5],rU:[-.6,0,-.5]},hit:{torso:[.9,0,0],head:[.35,0,0],lU:[-.6,0,.5],rU:[-.6,0,-.5],lT:[-.5,0,.1],lS:[.7,0,0]}},lowblow:{wind:{rU:[-.2,0,-.5],rF:[-1,0,0],torso:[.4,-.3,0],lS:[.8,0,0],lT:[-.5,0,.1]},hit:{rU:[-.7,0,-.1],rF:[-.4,0,0],torso:[.7,.4,0],lS:[.9,0,0],lT:[-.7,0,.1]}},grab:{wind:{lU:[-1,0,.35],rU:[-1,0,-.35],lF:[-.8,0,0],rF:[-.8,0,0],torso:[.25,0,0]},hit:{lU:[-1.55,0,.25],rU:[-1.55,0,-.25],lF:[-.3,0,.2],rF:[-.3,0,-.2],torso:[.4,0,0],lT:[-.5,0,.1],lS:[.7,0,0]}},taunt:{wind:{lU:[-.4,0,.9],rU:[-.4,0,-.9],lF:[-.5,0,0],rF:[-.5,0,0],torso:[-.1,0,0],head:[-.2,0,0]},hit:{lU:[-.2,0,1.5],rU:[-.2,0,-1.5],lF:[-.2,0,0],rF:[-.2,0,0],torso:[-.25,0,0],head:[-.35,0,0],lT:[-.1,0,.25],rT:[-.1,0,-.25],lS:[.2,0,0],rS:[.2,0,0]}},taunt2:{wind:{rU:[-.9,0,-.2],rF:[-1.7,0,0],lU:[.1,0,.7],lF:[-1.7,0,.2],torso:[-.1,0,.1]},hit:{rU:[-1.4,0,-.35],rF:[-1.2,0,0],lU:[.05,0,.75],lF:[-1.9,0,.3],torso:[-.22,.2,.12],head:[-.2,0,-.18],lT:[-.15,0,.3],rT:[-.1,0,-.1]}},finPunch:{wind:{rU:[.9,0,-.4],rF:[-.5,0,0],torso:[.3,-1.1,0],hips:[0,-.7,0],lU:[-1.1,0,.3],lF:[-1.6,0,0],lT:[-.5,0,.15],lS:[.9,0,0],rT:[.35,0,-.1],rS:[.8,0,0]},hit:{rU:[-1.6,0,-.15],rF:[-.05,0,0],torso:[.6,1,0],hips:[0,.8,0],lT:[-.85,0,.1],lS:[.9,0,0],rT:[.5,0,-.1],rS:[.3,0,0],lU:[.3,0,.8],lF:[-.3,0,0]}},finChair:{wind:{lU:[-2.9,0,.15],rU:[-2.9,0,-.15],lF:[-.1,0,0],rF:[-.1,0,0],torso:[-.25,0,0],lT:[-.3,0,.1],lS:[.6,0,0]},hit:{lU:[-1,0,.15],rU:[-1,0,-.15],lF:[-.2,0,0],rF:[-.2,0,0],torso:[.75,0,0],lT:[-.8,0,.1],lS:[.9,0,0]}},finLeap:{wind:{torso:[.5,0,0],lT:[-.9,0,.1],lS:[1.4,0,0],rT:[-.9,0,-.1],rS:[1.4,0,0],lU:[.5,0,.3],rU:[.5,0,-.3]},hit:{pitch:1.35,air:1.15,lU:[-2.7,0,.1],rU:[-2.7,0,-.1],lF:[-.1,0,0],rF:[-.1,0,0],lT:[.25,0,.1],rT:[.2,0,-.1],lS:[.2,0,0],rS:[.2,0,0],torso:[.1,0,0],head:[-.5,0,0]}},finHammer:{wind:{lU:[-2.9,0,.1],rU:[-2.9,0,-.1],lF:[-.2,0,0],rF:[-.2,0,0],torso:[-.3,0,0],lT:[-.3,0,.1],lS:[.5,0,0]},hit:{lU:[-.5,0,.1],rU:[-.5,0,-.1],lF:[-1.2,0,0],rF:[-1.2,0,0],torso:[.95,0,0],lT:[-.9,0,.1],lS:[.9,0,0]}},finKick:{wind:{torso:[0,.8,0],hips:[0,.6,0],rT:[.2,0,-.1],rS:[.8,0,0],lU:[-.3,0,.9],rU:[-.3,0,-.9]},hit:{rT:[-2,0,-.15],rS:[.1,0,0],torso:[-.4,-.3,0],lU:[-.3,0,1.2],rU:[-.3,0,-1.2],lT:[-.05,0,.1],lS:[.2,0,0]}},finSpin:{wind:{lU:[0,0,1.45],rU:[0,0,-1.45],lF:[0,0,0],rF:[0,0,0],torso:[.2,0,0],lT:[-.3,0,.1],lS:[.7,0,0]},hit:{lU:[0,0,1.5],rU:[0,0,-1.5],lF:[0,0,0],rF:[0,0,0],torso:[.1,0,0],rT:[-1.3,0,-.1],rS:[.2,0,0],lT:[-.05,0,.1],lS:[.2,0,0]}},micswing:{wind:{rU:[-1.1,0,-.5],rF:[-2.3,0,0],lU:[-.8,0,.3],torso:[.1,-.5,0],head:[-.1,0,0]},hit:{rU:[-1.5,0,-.3],rF:[-.2,0,.3],torso:[.35,.7,0],hips:[0,.4,0],lU:[-.8,0,.3]}},summon:{wind:{lU:[-2.7,0,.5],rU:[-2.7,0,-.5],lF:[-.2,0,0],rF:[-.2,0,0],torso:[-.2,0,0],head:[-.3,0,0]},hit:{rU:[-1.55,0,-.35],rF:[-.05,0,0],lU:[-1,0,.5],lF:[-.6,0,0],torso:[.2,.4,0],hips:[0,.25,0],lT:[-.5,0,.1],lS:[.7,0,0]}},finCharge:{wind:{torso:[.55,0,0],head:[.5,0,0],lT:[-.7,0,.1],lS:[1.2,0,0],rT:[.5,0,-.1],rS:[1.1,0,0],lU:[.5,0,.3],rU:[.5,0,-.3],lF:[-.5,0,0],rF:[-.5,0,0]},hit:{torso:[.95,0,0],head:[.55,0,0],lT:[-1.1,0,.1],lS:[.7,0,0],rT:[.9,0,-.1],rS:[1.3,0,0],lU:[.9,0,.35],rU:[.9,0,-.35],lF:[-.3,0,0],rF:[-.3,0,0],pitch:.12}},finPoint:{wind:{rU:[-.5,0,-.2],rF:[-2,0,0],lU:[.1,0,.6],lF:[-1.8,0,.1],torso:[.1,.1,0]},hit:{rU:[-1.55,0,-.45],rF:[-.05,0,0],lU:[.1,0,.6],lF:[-1.8,0,.1],torso:[.05,.5,0],hips:[0,.3,0],head:[-.15,0,0]}}},Tu={block:{lU:[-1.25,0,.35],lF:[-2.4,0,.2],rU:[-1.25,0,-.35],rF:[-2.4,0,-.2],torso:[.3,0,0],head:[.1,0,0],lT:[-.4,0,.12],lS:[.8,0,0],rT:[.25,0,-.12],rS:[.7,0,0]},hitstun:{torso:[-.3,.2,.1],head:[-.35,0,0],lU:[-.3,0,.7],rU:[-.25,0,-.6],lF:[-.6,0,0],rF:[-.6,0,0],hips:[-.08,0,0],lT:[-.1,0,.1],lS:[.45,0,0],rT:[.3,0,-.1],rS:[.5,0,0]},stunned:{torso:[.5,0,.12],head:[.3,0,.1],lU:[-.2,0,.35],rU:[-.2,0,-.35],lF:[-.5,0,0],rF:[-.5,0,0],lT:[-.1,0,.12],lS:[.6,0,0],rT:[.1,0,-.12],rS:[.7,0,0]},clinch:{lU:[-1.15,0,.45],rU:[-1.15,0,-.45],lF:[-.9,0,-.35],rF:[-.9,0,.35],torso:[.4,0,0],head:[0,0,0],lT:[-.45,0,.15],lS:[.7,0,0],rT:[.3,0,-.15],rS:[.6,0,0]},clinched:{lU:[-.5,0,.55],rU:[-.5,0,-.55],lF:[-1,0,-.2],rF:[-1,0,.2],torso:[.5,0,0],head:[.4,0,0],lT:[-.2,0,.15],lS:[.6,0,0],rT:[.2,0,-.15],rS:[.6,0,0]},subA:{lU:[-1,0,.25],rU:[-1,0,-.25],lF:[-.5,0,0],rF:[-.5,0,0],torso:[.85,0,0],head:[-.3,0,0],lT:[-1.35,0,.25],lS:[1.7,0,0],rT:[-.15,0,-.2],rS:[1.5,0,0]},pinA:{lU:[-1.35,0,.2],rU:[-1.35,0,-.2],lF:[-.3,0,0],rF:[-.3,0,0],torso:[.95,0,0],head:[-.4,0,0],lT:[-1.45,0,.2],lS:[2,0,0],rT:[-.9,0,-.2],rS:[1.9,0,0]},win:{lU:[-2.6,0,.5],rU:[-2.6,0,-.5],lF:[-.2,0,0],rF:[-.2,0,0],torso:[-.12,0,0],head:[-.3,0,0],lT:[-.15,0,.2],lS:[.3,0,0],rT:[-.1,0,-.2],rS:[.3,0,0]},entrance:{lU:[-.2,0,.45],rU:[-.2,0,-.45],lF:[-.4,0,0],rF:[-.4,0,0],torso:[.02,0,0],head:[0,0,0],lT:[-.1,0,.1],lS:[.2,0,0],rT:[.1,0,-.1],rS:[.2,0,0]},ref:{lU:[-.2,0,.3],rU:[-.2,0,-.3],lF:[-.5,0,0],rF:[-.5,0,0],torso:[.1,0,0],head:[0,0,0],lT:[-.05,0,.08],lS:[.1,0,0],rT:[.05,0,-.08],rS:[.1,0,0]}},Eu=(e,t,n)=>e+(t-e)*n,Du=e=>(e=Math.max(0,Math.min(1,e)),e*e*(3-2*e));function Ou(e,t,n,r={...e}){for(let i of bu)r[i]=[Eu(e[i][0],t[i][0],n),Eu(e[i][1],t[i][1],n),Eu(e[i][2],t[i][2],n)];return r.pitch=Eu(e.pitch,t.pitch,n),r.air=Eu(e.air,t.air,n),r.lie=Eu(e.lie,t.lie,n),r.spin=Eu(e.spin,t.spin,n),r.roll=Eu(e.roll,t.roll,n),r}function ku(e,t,n,r,i,a){let o=wu[e]??wu.jab,s=Su(o.wind),c=Su(o.hit),l;return l=t<n?Ou(xu,s,Du(t/Math.max(.01,n))**.8):t<n+r?Ou(s,c,Du((t-n)/Math.max(.01,r*.55))):Ou(c,xu,Du((t-n-r)/Math.max(.01,i-n-r))),a&&(l.spin=Math.PI*2*Du(Math.min(1,t/(n+r)))),l}var Au=class{cur={...xu};phase=Math.random()*10;flip=1;lastState=``;updateRef(e,t,n,r,i){return Ou(this.cur,this.refPose(t,n,r,i),1-Math.exp(-10*e),this.cur),this.cur}update(e,t,n){let r=this.target(e,n),i=14;switch(e.state){case`attack`:i=34;break;case`hitstun`:i=45;break;case`down`:case`thrown`:i=20;break;case`getup`:i=12;break;default:i=16}return e.state!==this.lastState&&(e.state===`hitstun`&&(this.flip=-this.flip),this.lastState=e.state),Ou(this.cur,r,1-Math.exp(-i*t),this.cur),this.cur}target(e,t){let n=e.speedNow,r=Math.sin(t*2.2+e.idx)*.02;switch(e.state){case`idle`:case`block`:{let i=e.state===`block`?Su(Tu.block):Su({});if(e.state===`idle`){this.phase+=n*1.9*(1/60);let a=Math.sin(this.phase*2.4),o=Math.min(1,n/3.2),s=+!!e.running;i.lT=[-.28+a*(.5+s*.4)*o,0,.1],i.rT=[.18-a*(.5+s*.4)*o,0,-.1],i.lS=[.5+Math.max(0,-Math.cos(this.phase*2.4))*.8*o,0,0],i.rS=[.4+Math.max(0,Math.cos(this.phase*2.4))*.8*o,0,0],s&&(i.torso=[.35,0,0],i.lU=[-.5+a*.7,0,.15],i.rU=[-.5-a*.7,0,-.15],i.lF=[-1.5,0,0],i.rF=[-1.5,0,0]),i.torso=[i.torso[0]+r,i.torso[1],i.torso[2]],i.hips=[0,Math.sin(t*1.3)*.04,0]}return i}case`attack`:{let t=e.move,n=e.s+e.a+e.r,r=t.anim===`finSpin`||t.anim===`finKick`;return ku(t.anim,e.t,e.s,e.a,n,r)}case`hitstun`:{let e=Su(Tu.hitstun);return e.torso=[e.torso[0],e.torso[1]*this.flip,e.torso[2]*this.flip],e.head=[e.head[0],.3*this.flip,0],e}case`stunned`:{let e=Su(Tu.stunned);return e.torso=[e.torso[0],Math.sin(t*9)*.1,e.torso[2]],e}case`down`:case`ko`:case`pinD`:{let n=Su(Cu);return e.state===`ko`&&(n.head=[.1,.4,0]),e.state===`down`&&e.koed&&(n.head=[.1,.4,0]),n.torso=[0,0,Math.sin(t*2)*.01],n}case`subD`:{let n=Su(Cu);return n.lU=[-.2+(e.subMeter>.75?Math.sin(t*20)*.4:0),0,.8],n.rU=[-1.4,0,-.2],n.rF=[-.4,0,0],n.head=[.1,Math.sin(t*6)*.2,0],n.lT=[.3,0,.2],n.lS=[.6,0,0],n}case`getup`:{let t=Math.min(1,e.t/Math.max(.01,e.dur)),n=Su({torso:[.8,0,0],lT:[-1.2,0,.2],lS:[1.9,0,0],rT:[-.5,0,-.2],rS:[1.8,0,0],lU:[-.8,0,.3],rU:[-.8,0,-.3],lF:[-.6,0,0],rF:[-.6,0,0]});return t<.6?Ou(Cu,n,Du(t/.6)):Ou(n,xu,Du((t-.6)/.4))}case`thrown`:{let t=e.thrown,n=t?Math.min(1,e.t/t.dur):1,r=Su(Cu);return r.pitch=(t?.style??`throw`)===`slam`?-Math.PI/2*Du(Math.min(1,n*1.4))-(n<.5?Math.sin(n*Math.PI*2)*.5:0):-Math.PI/2*Du(Math.min(1,n*1.8)),r.lie=Du(Math.min(1,n*1.8)),r.spin=0,r.lU=[-.9,0,.9],r.rU=[-.9,0,-.9],r.lT=[-.3,0,.3],r.rT=[-.2,0,-.3],r.lS=[.4,0,0],r.rS=[.4,0,0],r}case`throwing`:{let t=e.lastGrapple.includes(`Powerslam`)||e.lastGrapple.includes(`DDT`)||e.lastGrapple.includes(`slam`)?`slam`:`throw`,n=Math.min(1,e.t/Math.max(.01,e.dur)),r=Su(Tu.clinch),i=Su({lU:[-2.4,0,.25],rU:[-2.4,0,-.25],lF:[-.4,0,0],rF:[-.4,0,0],torso:[t===`slam`?-.3:-.45,0,0],head:[-.2,0,0],lT:[-.3,0,.15],lS:[.8,0,0]}),a=Su({lU:[-1,0,.25],rU:[-1,0,-.25],lF:[-.3,0,0],rF:[-.3,0,0],torso:[t===`slam`?.9:.3,0,0],lT:[-.8,0,.15],lS:[1,0,0]});return n<.35?Ou(r,i,Du(n/.35)):n<.7?Ou(i,a,Du((n-.35)/.35)):Ou(a,xu,Du((n-.7)/.3))}case`clinch`:case`clinched`:case`subA`:case`pinA`:case`win`:{let n=Su(Tu[e.state]);return e.state===`win`&&(n.air=Math.max(0,Math.sin(t*5+e.idx))*.12,n.lU=[-2.6+Math.sin(t*6)*.15,0,.5],n.rU=[-2.6-Math.sin(t*6)*.15,0,-.5]),e.state===`subA`&&(n.torso=[.85+Math.sin(t*8)*.05,0,0]),n}default:return Su({})}}refPose(e,t,n,r){if(r===`count`)return Su({torso:[.85,0,0],head:[-.4,0,0],lT:[-1.35,0,.2],lS:[1.8,0,0],rT:[-.2,0,-.2],rS:[1.6,0,0],lU:[-.8,0,.3],lF:[-.6,0,0],rU:[-1.9+Math.sin(e*6.28)*.35*(n>0?1:.2),0,-.45],rF:[-.2,0,0]});let i=Su(Tu.ref);return this.phase+=t*.03,i.torso=[.1+Math.sin(e*2)*.02,0,0],i}},ju=.3,Mu=.28,Nu=.44,Pu=.44,Fu=(e,t,n)=>e+(t-e)*n;function $(e,t=.6,n=0,r={}){return new fa({color:e,roughness:t,metalness:n,...r})}function Iu(e,t,n,r=.3,i=.12,a=14){let o=[];for(let t=0;t<=4;t++){let r=t/4*Math.PI/2;o.push(new B(n*Math.sin(r),-e-n*.6*Math.cos(r)))}for(let a=1;a<10;a++){let s=1-a/10,c=(n+(t-n)*(1-s))*(1+i*Math.exp(-(((s-r)/.22)**2)));o.push(new B(c,-e*s))}for(let e=0;e<=4;e++){let n=Math.PI/2-e/4*Math.PI/2;o.push(new B(t*Math.sin(n),t*.6*Math.cos(n)))}return new Qi(o,a)}function Lu(e=1){return new Qi([[0,-.07],[.115,-.06],[.135,0],[.128,.09],[.15,.22],[.185,.35],[.2,.43],[.175,.5],[.1,.545],[.062,.575],[0,.585]].map(([t,n])=>new B(t*e,n)),24)}function Ru(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`);for(let e=0;e<8;e++)t.fillStyle=e%2?`#111`:`#f1f1f1`,t.fillRect(0,e*8,64,8);let n=new Ui(e);return n.wrapS=n.wrapT=te,n.colorSpace=yt,n}var zu=class{ap;root=new Wn;body=new Wn;hips=new Wn;j={};rHand=new Wn;tongue=null;chair;briefcase;mic;helmet;horn;glow;shadowMeshes=[];b;hScale;skinMat;constructor(e){this.ap=e,this.b=e.build,this.hScale=e.height,this.skinMat=$(e.skin,.55,0,{sheen:.4,sheenRoughness:.5,sheenColor:new W(e.skin).multiplyScalar(1.1)}),this.root.add(this.body),this.body.add(this.hips);for(let e of bu)this.j[e]=e===`hips`?this.hips:new Wn;this.root.scale.setScalar(this.hScale),this.build(),this.chair=this.makeChair(),this.briefcase=this.makeBriefcase(),this.mic=this.makeMic(),this.helmet=this.makeHelmet(),this.horn=this.makeHorn();for(let e of[this.chair,this.briefcase,this.mic,this.helmet,this.horn])e.visible=!1;this.rHand.add(this.chair,this.briefcase,this.mic),this.j.head.add(this.helmet,this.horn),this.glow=new G(new q(.9,24,16),new ai({color:16777215,transparent:!0,opacity:0,blending:2,depthWrite:!1})),this.glow.position.y=1,this.glow.visible=!1,this.root.add(this.glow)}mesh(e,t,n,r=0,i=0,a=0,o=!0){let s=new G(e,t);return s.position.set(r,i,a),s.castShadow=o,s.receiveShadow=!1,n.add(s),this.shadowMeshes.push(s),s}limb(e,t,n,r,i=t,a=t*.72,o=.3,s=.12){let c=this.mesh(Iu(n,t,a,o,s),r,e,0,0,0);return c.scale.z=i/t,c}build(){let e=this.ap,t=this.b,n=this.skinMat,r=$(e.outfitColor,e.outfit===`cuero`?.32:.85,e.outfit===`cuero`?.12:0,e.outfit===`cuero`?{clearcoat:.5,clearcoatRoughness:.35}:{sheen:.6,sheenColor:new W(4473924)}),i=$(e.trunksColor,.7),a=$(e.accent,.5),o=$(921102,.45,.1),s=e.outfit===`traje`||e.outfit===`blazer`||e.outfit===`abrigo`,c=e.outfit===`arbitro`,l=s||c;if(this.mesh(new q(.15,14,10),l?r:i,this.hips,0,0,0).scale.set(1.3*t,.8,.9),e.outfit===`cuero`){let e=this.mesh(new Yi(.168*t,.168*t,.05,20),$(12106948,.25,.9),this.hips,0,.1,0);e.scale.z=.8}let u=this.j.torso;u.position.set(0,.07,0),this.hips.add(u);let d=e.outfit===`camiseta`?r:c?$(16777215,.8):e.outfit===`blazer`?$(16053492,.8):e.outfit===`traje`||e.outfit===`abrigo`?$(15329774,.7):n,f=this.mesh(Lu(1),d,u,0,0,0);if(f.scale.set(1.2*t,1,.74),c){let e=Ru();e.repeat.set(1,2),f.material.map=e,f.material.color.set(16777215)}if(e.outfit===`cuero`||e.outfit===`blazer`){let n=e.outfit===`cuero`?1.25:.7,r=$(e.outfitColor,e.outfit===`cuero`?.32:.8,e.outfit===`cuero`?.1:0,{side:2,clearcoat:e.outfit===`cuero`?.5:0,clearcoatRoughness:.35}),i=new G(new Yi(.235*t,.19*t,.56,28,1,!0,n/2,Math.PI*2-n),r);i.position.set(0,.26,0),i.scale.z=.8,i.castShadow=!0,u.add(i);for(let n of[-1,1]){let i=this.mesh(new K(.05,.4,.03),r,u,n*(e.outfit===`cuero`?.14:.09)*t,.3,.14);i.rotation.z=-n*.18}if(e.outfit===`blazer`){let e=this.mesh(new Yi(.06,.07,.045,14,1,!0),$(16053492,.8),u,0,.55,.01);e.material.side=2}}if(e.outfit===`traje`&&(this.mesh(Lu(1.1),r,u,0,0,0).scale.set(1.2*t,1,.82),this.mesh(new K(.1,.4,.012),$(15921910,.7),u,0,.3,.158),this.mesh(new K(.04,.32,.014),a,u,0,.26,.166),this.mesh(new K(.055,.03,.012),a,u,.12*t,.34,.165)),e.outfit===`abrigo`){this.mesh(Lu(1.14),r,u,0,0,0).scale.set(1.24*t,1,.86);let n=this.mesh(new Yi(.19*t,.27*t,.4,20,1,!0),$(e.outfitColor,.85,0,{side:2}),this.hips,0,-.18,0);n.scale.z=.8}let p=this.j.head;p.position.set(0,.58,0),u.add(p),this.mesh(new Yi(.058,.07,.11,12),n,u,0,.54,0),this.buildHead(p,n);for(let i of[1,-1]){let o=this.j[i===1?`lU`:`rU`],l=this.j[i===1?`lF`:`rF`];o.position.set(i*(.215*t+.04),.46,0),u.add(o),l.position.set(0,-.3,0),o.add(l);let d=e.outfit===`cuero`||s||c,f=e.outfit===`camiseta`;this.limb(o,.07*t,ju,d||f?r:n,.066*t,.05*t,.28,.15),this.mesh(new q(.078*t,12,10),d||f?r:n,o,0,.005,0),this.limb(l,.052*t,Mu,d?r:n,.05*t,.036*t,.22,.18);let p=i===-1?this.rHand:new Wn;if(p.position.set(0,-.28,0),l.add(p),this.mesh(new q(.058,12,10),n,p,0,-.035,.012).scale.set(1,1.08,1.15),this.mesh(new Yi(.044,.04,.05,10),n,p,0,0,0),e.wraps!=null){let n=$(e.wraps,.8);this.mesh(new Yi(.047*t,.042*t,.13,12),n,l,0,-.28+.07,0);let r=this.mesh(new ta(.046*t,.009,6,14),a,l,0,-.28+.1,0);r.rotation.x=Math.PI/2;let i=this.mesh(new ta(.044*t,.009,6,14),a,l,0,-.28+.05,0);i.rotation.x=Math.PI/2}e.outfit===`cuero`&&this.mesh(new Yi(.047,.045,.03,10),r,l,0,-.26,0)}for(let s of[1,-1]){let c=this.j[s===1?`lT`:`rT`],u=this.j[s===1?`lS`:`rS`];if(c.position.set(s*.105*t,-.04,0),this.hips.add(c),u.position.set(0,-.44,0),c.add(u),this.limb(c,.108*t,Nu,l?r:n,.1*t,.07*t,.25,.14),this.limb(u,.072*t,Pu,l?r:n,.07*t,.046*t,.28,.2),!l){let n=this.mesh(new Yi(.112*t,.12*t,.22,14),i,c,0,-.1,0);n.scale.z=1,e.outfit!==`camiseta`&&(this.mesh(new ta(.118*t,.007,6,16),a,c,0,-.21,0).rotation.x=Math.PI/2)}let d=this.mesh(new qi(.052*t,.17,4,10),o,u,0,-.44,.085);d.rotation.x=Math.PI/2,d.scale.set(1,1,.62),this.mesh(new Yi(.058*t,.066*t,.14,12),o,u,0,-.37,0)}}buildHead(e,t){let n=this.ap,r=new Wn;e.add(r),this.mesh(new q(.118,20,16),t,r,0,.14,0).scale.set(.93,1.08,1.02),this.mesh(new q(.085,14,10),t,r,0,.075,.02).scale.set(.95,.85,1);for(let e of[-1,1])this.mesh(new q(.03,8,6),t,r,e*.112,.14,0).scale.set(.5,1,.8);let i=$(1182987,.8);if(n.mask===`perro`)this.buildDogMask(r,t);else if(n.mask===`caballo`)this.buildHorseMask(r);else{let e=$(16185078,.25),a=$(n.facePaint===`payaso`?2781147:2825492,.3);for(let t of[-1,1]){n.facePaint===`payaso`&&(this.mesh(new q(.05,14,10),$(16448250,.5),r,t*.048,.162,.082).scale.set(1.15,.85,.35),this.mesh(new q(.042,12,8),$(3110894,.45),r,t*.05,.145,.092).scale.set(1,.55,.3)),this.mesh(new q(.02,10,8),e,r,t*.045,.155,.1).scale.set(1.2,.8,.6);let o=this.mesh(new q(.0115,8,6),a,r,t*.045,.155,.11);o.scale.z=.5;let s=this.mesh(new K(.05,.011,.012),n.hair!=null||n.beard!=null?i:$(2759954,.9),r,t*.048,.19,.098);s.rotation.z=t*-.2}this.mesh(new q(.02,10,8),n.facePaint===`payaso`?$(14696494,.4):t,r,0,.12,.118).scale.set(1,1.1,1.15),this.mesh(new K(.05,.008,.01),$(6958381,.6),r,0,.075,.105)}if(n.hair){let e=this.mesh(new q(.124,18,12,0,Math.PI*2,0,Math.PI*.46),$(n.hair,.9),r,0,.145,-.004);e.scale.set(.95,1.1,1.05),e.rotation.x=-.12}if(n.beard!=null){let e=$(n.beard,.95);this.mesh(new q(.093,18,12,0,Math.PI*2,Math.PI*.34,Math.PI*.66),e,r,0,.082,.022).scale.set(1,1,1.06);let t=this.mesh(new qi(.008,.07,4,8),e,r,0,.098,.113);t.rotation.z=Math.PI/2}if(n.glasses){let e=$(13225170,.2,.9);for(let t of[-1,1]){let n=this.mesh(new ta(.034,.0035,6,20),e,r,t*.048,.155,.112,!1);n.rotation.y=0,this.mesh(new Ji(.033,16),new fa({color:16777215,transparent:!0,opacity:.12,roughness:.05,transmission:0}),r,t*.048,.155,.112,!1);let i=this.mesh(new Yi(.003,.003,.11,4),e,r,t*.087,.155,.057,!1);i.rotation.x=Math.PI/2}this.mesh(new Yi(.003,.003,.025,4),e,r,0,.158,.113,!1).rotation.z=Math.PI/2}}buildDogMask(e,t){let n=$(15855336,.18,0,{clearcoat:1,clearcoatRoughness:.08}),r=$(3810328,.3,0,{clearcoat:.8,clearcoatRoughness:.15}),i=$(15229021,.35,0,{clearcoat:.6});this.mesh(new q(.14,22,16),n,e,0,.145,-.004).scale.set(.98,1.12,1.08);let a=this.mesh(new q(.142,18,12,0,Math.PI*2,0,Math.PI*.2),r,e,0,.145,-.004);a.scale.set(.98,1.12,1.08),a.rotation.x=-.35;let o=this.mesh(new qi(.056,.13,6,14),n,e,0,.1,.17);o.rotation.x=Math.PI/2+.1,o.scale.set(1,1,.85),this.mesh(new q(.034,12,10),r,e,0,.115,.262);let s=this.mesh(new qi(.04,.12,6,12),n,e,0,.035,.175);s.rotation.x=Math.PI/2+.28;let c=this.mesh(new qi(.03,.12,6,10),r,e,0,.015,.17);c.rotation.x=Math.PI/2+.3,this.mesh(new K(.07,.012,.12),$(2755856,.8),e,0,.062,.2).rotation.x=.14;let l=new Wn;l.position.set(0,.058,.23),e.add(l),this.mesh(new qi(.03,.12,4,8),i,l,0,-.07,.02).scale.set(1,1,.3),this.tongue=l;for(let t of[-1,1]){this.mesh(new q(.036,12,10),r,e,t*.062,.175,.112).scale.set(1,1,.5);let i=this.mesh(new q(.026,12,10),$(16448250,.1,0,{clearcoat:1}),e,t*.062,.175,.125);i.scale.z=.6,this.mesh(new q(.012,8,6),$(0,.1),e,t*.062,.175,.138).scale.z=.5;let a=this.mesh(new Xi(.095,.27,12),n,e,t*.095,.33,-.02);a.rotation.z=-t*.28,a.scale.z=.75;let o=this.mesh(new Xi(.062,.15,12),r,e,t*.112,.4,-.02);o.rotation.z=-t*.28,o.scale.z=.75;let s=this.mesh(new Xi(.055,.19,12),$(14264474,.5),e,t*.095,.325,.02);s.rotation.z=-t*.28,s.scale.z=.4}}buildHorseMask(e){let t=$(14970560,.32,0,{clearcoat:.7,clearcoatRoughness:.25,sheen:.4,sheenColor:new W(16756960)}),n=$(2757144,.6),r=$(13126816,.4);this.mesh(new q(.14,22,16),t,e,0,.15,-.01).scale.set(.95,1.15,1.1);let i=this.mesh(new qi(.07,.2,8,16),t,e,0,.085,.17);i.rotation.x=Math.PI/2-.35,i.scale.set(1,1,.9),this.mesh(new q(.085,14,12),t,e,0,0,.275).scale.set(1,.9,.85);for(let i of[-1,1]){this.mesh(new q(.018,8,6),n,e,i*.032,.012,.35),this.mesh(new q(.036,14,12),$(16645629,.1,0,{clearcoat:1}),e,i*.095,.185,.085).scale.set(.7,1,1),this.mesh(new q(.021,10,8),$(4860440,.2,0,{clearcoat:1}),e,i*.118,.185,.095).scale.set(.5,1,1);let a=this.mesh(new Xi(.045,.17,10),t,e,i*.07,.34,-.02);a.rotation.z=-i*.25,a.scale.z=.5;let o=this.mesh(new Xi(.028,.12,8),r,e,i*.07,.335,0);o.rotation.z=-i*.25,o.scale.z=.4}this.mesh(new K(.1,.045,.13),n,e,0,-.02,.255);let a=this.mesh(new K(.095,.014,.07),$(16052452,.3),e,0,.004,.31);a.rotation.x=.1;let o=this.mesh(new qi(.045,.09,6,10),t,e,0,-.065,.2);o.rotation.x=Math.PI/2-.2;let s=this.mesh(new K(.035,.34,.1),r,e,0,.12,-.15);s.rotation.x=.25;let c=this.mesh(new K(.05,.3,.05),r,e,0,-.1,-.2);c.rotation.x=-.15}makeMic(){let e=new Wn,t=new G(new Yi(.022,.018,.2,10),$(1381658,.4,.5));t.position.y=-.1;let n=new G(new q(.05,14,10),$(12567756,.35,.9));n.position.y=0;let r=new G(new ta(.04,.006,6,14),$(14201418,.3,1));return r.position.y=-.035,r.rotation.x=Math.PI/2,e.add(t,n,r),e.traverse(e=>{e.castShadow=!0}),e.position.set(0,-.02,.05),e.rotation.x=-Math.PI/2+.2,e}makeHelmet(){let e=new Wn,t=$(11569722,.28,.95),n=$(11540512,.7),r=new G(new q(.15,20,14,0,Math.PI*2,0,Math.PI*.62),t);r.position.set(0,.15,0),r.scale.set(.98,1.05,1.08);let i=new G(new ta(.15,.012,6,24),t);i.position.set(0,.17,0),i.rotation.x=Math.PI/2,i.scale.set(1,1.08,1);let a=new G(new K(.03,.12,.26),n);a.position.set(0,.34,-.01);for(let n of[-1,1]){let r=new G(new K(.02,.14,.12),t);r.position.set(n*.14,.07,.04),e.add(r)}return e.add(r,i,a),e.traverse(e=>{e.castShadow=!0}),e}makeHorn(){let e=new Wn,t=new G(new Xi(.055,.42,14),$(16773824,.2,.3,{clearcoat:1,emissive:16761072,emissiveIntensity:.6}));t.position.set(0,.2,0);for(let t=0;t<5;t++){let n=new G(new ta(.05-t*.008,.007,5,14),$(16751320,.3,0,{emissive:16734912,emissiveIntensity:.8}));n.position.set(0,.06+t*.07,0),n.rotation.x=Math.PI/2+.3,e.add(n)}return e.add(t),e.position.set(0,.28,.17),e.rotation.x=.55,e}makeChair(){let e=new Wn,t=$(10133672,.3,.9),n=$(2303275,.7),r=new G(new K(.4,.035,.4),n);r.position.set(0,0,.2);let i=new G(new K(.4,.34,.03),n);i.position.set(0,.17,.4),e.add(r,i);for(let[n,r]of[[-.18,.04],[.18,.04],[-.18,.38],[.18,.38]]){let i=new G(new Yi(.012,.012,.42,6),t);i.position.set(n,-.21,r),e.add(i)}for(let n of[-.18,.18]){let r=new G(new Yi(.012,.012,.36,6),t);r.position.set(n,.17,.4),r.rotation.z=0,e.add(r)}e.traverse(e=>{e.castShadow=!0}),e.position.set(0,-.05,-.38),e.rotation.set(0,0,0);let a=new Wn;return a.add(e),a.rotation.x=-Math.PI/2+.2,a}makeBriefcase(){let e=new Wn,t=new G(new K(.46,.32,.12),$(3810838,.5,.05,{clearcoat:.4}));t.position.set(0,-.22,0);let n=new G(new ta(.05,.01,6,12,Math.PI),$(1710618,.5));n.position.set(0,-.055,0);let r=$(13938487,.25,1);for(let t of[-.12,.12]){let n=new G(new K(.04,.03,.13),r);n.position.set(t,-.12,0),e.add(n)}return e.add(t,n),e.traverse(e=>{e.castShadow=!0}),e.rotation.y=Math.PI/2,e}setProp(e){this.chair.visible=e===`chair`,this.briefcase.visible=e===`maletin`,this.mic.visible=e===`microfono`,this.helmet.visible=e===`casco`,this.horn.visible=e===`cuerno`}propObject(e){return{chair:this.chair,maletin:this.briefcase,microfono:this.mic,casco:this.helmet,cuerno:this.horn}[e]??null}applyPose(e,t){for(let t of bu){let n=e[t];this.j[t].rotation.set(n[0],n[1],n[2],t===`torso`||t===`hips`||t===`head`?`YXZ`:`XYZ`)}let n=(t,n)=>{let r=-e[t][0],i=e[n][0];return Nu*Math.cos(r)*Math.cos(e[t][2])+Pu*Math.cos(r-i)},r=Fu(.05+Math.max(n(`lT`,`lS`),n(`rT`,`rS`))+.045+e.air,.2,Math.min(1,e.lie));this.body.position.y=r,this.body.rotation.set(e.pitch,e.spin,e.roll,`YXZ`),this.tongue&&(this.tongue.rotation.x=Math.sin(t*7)*.15+.1)}setGlow(e,t){this.glow.visible=t>.01,this.glow.material.color.setHex(e),this.glow.material.opacity=t*.28;let n=1+t*.12;this.glow.scale.set(n,n,n)}setCastShadow(e){for(let t of this.shadowMeshes)t.castShadow=e}dispose(){this.root.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose();let n=t.material;Array.isArray(n)?n.forEach(e=>e.dispose()):n?.dispose()})}},Bu=7.6,Vu=.38,Hu=.85,Uu=class{idx;data;stats;light;heavy;taunt;finisher;grabMove;throwG;slamG;subG;x=0;z=0;y=1;yaw=0;vx=0;vz=0;kbx=0;kbz=0;hp;maxHp;st;maxSt;mom=0;state=`idle`;t=0;dur=0;move=null;hitDone=!1;connected=!1;s=0;a=0;r=0;comboIdx=-1;comboTimer=0;blocking=!1;blockT=0;grabPressT=9;buffer=null;bufferT=0;hitChain=0;hitChainT=0;hitFlip=1;escape=0;subMeter=0;pinT=0;by=-1;pinCount=0;outT=0;outN=0;exitHold=0;exitAllow=0;inRing=!0;exhausted=!1;speedNow=0;running=!1;thrown=null;pendingDown=0;koed=!1;banned=!1;toreo=!1;superArmor=!1;foulCount=0;damageTaken=0;damageDealt=0;finishersLanded=0;taunts=0;subsApplied=0;lastGrapple=``;constructor(e,t){this.idx=e,this.data=t,this.stats=t.fullStats;let n=t.moves;this.light=n.light.map(g),this.heavy=g(n.heavy),this.taunt=g(n.taunt),this.finisher=g(n.finisher),this.grabMove=p.agarre,this.throwG=_(n.grab.throw),this.slamG=_(n.grab.slam),this.subG=_(n.grab.sub),this.maxHp=this.hp=this.stats.health,this.maxSt=this.st=this.stats.stamina}get hpPct(){return this.hp/this.maxHp}get lying(){return this.state===`down`||this.state===`pinD`||this.state===`ko`||this.state===`subD`}},Wu=(e,t,n)=>Math.max(t,Math.min(n,e)),Gu=(e,t)=>{let n=e-t;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return n},Ku=e=>e.light||e.heavy||e.grab||e.taunt||e.finisher,qu=(e,t)=>+(Math.abs(e)<=4.05&&Math.abs(t)<=4.05),Ju=class{f;time=0;over=!1;winner=-1;reason=null;events=[];ko=null;ref={x:0,z:-3,yaw:0,count:0,mode:`idle`};endT=0;refAway={x:0,z:-1};rng;constructor(e,t,n=Math.random){this.rng=n,this.f=[new Uu(0,e),new Uu(1,t)],this.f[0].x=-1.5,this.f[0].yaw=Math.PI/2,this.f[1].x=1.5,this.f[1].yaw=-Math.PI/2}emit(e){this.events.push(e)}summary(){return{winner:this.winner,reason:this.reason??`ko`,time:this.time,fired:this.winner>=0&&this.f[1-this.winner].banned,finisherId:this.f.map(e=>e.finisher.id),damageTaken:this.f.map(e=>e.damageTaken),finishersLanded:this.f.map(e=>e.finishersLanded),taunts:this.f.map(e=>e.taunts),hpPct:this.f.map(e=>e.hpPct),subs:this.f.map(e=>e.subsApplied)}}update(e,t){if(this.lastInputs=t,this.over){this.endT+=e;for(let t of this.f)t.t+=e,this.motion(t,e);this.updateRef(e)}else{this.time+=e;for(let n=0;n<2;n++)this.preUpdate(this.f[n],t[n],e);for(let n=0;n<2;n++)this.step(n,t[n],e);for(let t=0;t<2;t++)this.motion(this.f[t],e);this.separate(),this.ringRules(e),this.updateKO(e),this.updateRef(e)}}dist(e,t){return Math.hypot(t.x-e.x,t.z-e.z)}yawTo(e,t){return Math.atan2(t.x-e.x,t.z-e.z)}face(e,t,n,r){let i=Gu(this.yawTo(e,t),e.yaw);e.yaw+=Wu(i,-r*n,r*n)}canAct(e){return e.state===`idle`||e.state===`block`}hittable(e){return![`down`,`pinD`,`pinA`,`subA`,`subD`,`clinch`,`clinched`,`thrown`,`throwing`,`ko`,`win`].includes(e.state)}preUpdate(e,t,n){e.comboTimer=Math.max(0,e.comboTimer-n),e.hitChainT=Math.max(0,e.hitChainT-n),e.bufferT=Math.max(0,e.bufferT-n),e.bufferT<=0&&(e.buffer=null),e.grabPressT+=n,e.exitAllow=Math.max(0,e.exitAllow-n),t.grab&&(e.grabPressT=0),t.light&&(e.buffer=`light`,e.bufferT=.22),t.heavy&&(e.buffer=`heavy`,e.bufferT=.22),t.grab&&(e.buffer=`grab`,e.bufferT=.22);let r=0;e.state===`idle`?r=e.running?-9:e.speedNow>.5?11:17:e.state===`block`?r=5:[`down`,`pinD`,`subD`,`getup`,`stunned`,`hitstun`].includes(e.state)&&(r=8),e.st=Wu(e.st+r*n*(e.stats.stamina/100)**.5,0,e.maxSt),e.st<=0&&!e.exhausted&&(e.exhausted=!0,this.emit({type:`exhausted`,fighter:e.idx})),e.exhausted&&e.st>=e.maxSt*.25&&(e.exhausted=!1)}step(e,t,n){let r=this.f[e],i=this.f[1-e];switch(r.t+=n,r.state){case`idle`:case`block`:this.stepFree(r,i,t,n);break;case`attack`:this.stepAttack(r,i,t,n);break;case`hitstun`:r.t>=r.dur&&(r.state=`idle`,r.superArmor=!1);break;case`stunned`:r.t>=r.dur&&(r.state=`idle`);break;case`down`:this.stepDown(r,t);break;case`getup`:r.t>=r.dur&&(r.state=`idle`);break;case`clinch`:this.stepClinch(r,i,t);break;case`clinched`:this.stickTo(r,i);break;case`throwing`:r.t>=r.dur&&(r.state=`idle`);break;case`thrown`:this.stepThrown(r);break;case`subD`:this.stepSub(r,i,t,n);break;case`subA`:t.block&&r.t>.4&&this.releaseHold(r,i);break;case`pinD`:this.stepPin(r,i,t,n);break;case`pinA`:this.approachPin(r,i,n),t.block&&r.t>.5&&this.releaseHold(r,i)}}stepFree(e,t,n,r){this.face(e,t,r,14);let i=n.block&&e.st>0&&!e.exhausted;if(i&&!e.blocking&&(e.blocking=!0,e.blockT=0,e.state=`block`),!i&&e.blocking&&(e.blocking=!1,e.state=`idle`),e.blocking&&(e.blockT+=r),this.tryActions(e,t,n))return;let a=n.mx,o=n.mz,s=Math.hypot(a,o);s>1&&(a/=s,o/=s);let c=s>.15;e.running=c&&n.run&&!e.blocking&&e.st>6&&!e.exhausted;let l=3*e.stats.speed;e.running&&(l=5.4*e.stats.speed),e.blocking&&(l*=e.data.traits?.rootedGuard?0:.42),e.exhausted&&(l*=.7);let u=c?a*l:0,d=c?o*l:0,f=1-Math.exp(-16*r);if(e.vx+=(u-e.vx)*f,e.vz+=(d-e.vz)*f,e.speedNow=Math.hypot(e.vx,e.vz),e.inRing&&c&&n.run){let t=Math.abs(e.x)>3.45&&Math.sign(a)===Math.sign(e.x)&&Math.abs(a)>.4,n=Math.abs(e.z)>3.45&&Math.sign(o)===Math.sign(e.z)&&Math.abs(o)>.4;t||n?e.exitHold+=r:e.exitHold=Math.max(0,e.exitHold-r*2),e.exitHold>.4&&(e.exitAllow=.9,e.exitHold=0,this.emit({type:`msg`,text:e.data.name+` sale del ring`}))}else e.exitHold=Math.max(0,e.exitHold-r*2)}tryActions(e,t,n){if(n.finisher){if(e.mom>=100)return this.beginMove(e,e.finisher),e.buffer=null,!0;this.emit({type:`msg`,text:`Aún no tienes el finisher. ¡Consigue momentum!`})}return n.taunt?(this.beginMove(e,e.taunt),e.buffer=null,!0):e.buffer===`grab`?(e.buffer=null,t.state===`down`&&!this.ko&&this.dist(e,t)<1.9&&e.state!==`attack`?(this.startPin(e,t),!0):(this.beginMove(e,e.grabMove),!0)):e.buffer===`heavy`?(e.buffer=null,this.beginMove(e,this.pickHeavy(e)),!0):e.buffer===`light`&&(e.buffer=null,this.beginLight(e),!0)}pickHeavy(e){let t=e.data.moves.heavyRandom;if(!t?.length)return e.heavy;let n=t.reduce((e,[,t])=>e+t,0),r=this.rng()*n;for(let[n,i]of t)if(r-=i,r<0){let t=g(n);return t.announce&&this.emit({type:`msg`,text:t.announce,big:!0}),this.emit({type:`heavyPick`,fighter:e.idx,move:t}),t}return e.heavy}beginLight(e){e.comboIdx=e.comboTimer>0?(e.comboIdx+1)%e.light.length:0,e.comboTimer=.85,this.beginMove(e,e.light[e.comboIdx])}beginMove(e,t){e.state=`attack`,e.blocking=!1,e.move=t,e.t=0,e.hitDone=!1,e.connected=!1;let n=t.kind===`finisher`?1:e.stats.tempo*(e.exhausted?.8:1);e.s=t.startup/n,e.a=t.active/n,e.r=t.recovery/n,e.st=Math.max(0,e.st-t.stamina),e.superArmor=t.kind===`finisher`,e.toreo=!1,t.summon&&this.emit({type:`summon`,kind:t.summon,fighter:e.idx,target:1-e.idx,dur:e.s}),t.kind===`finisher`&&(e.mom=0,this.emit({type:`finisherStart`,fighter:e.idx,move:t}))}stepAttack(e,t,n,r){let i=e.move;if(e.vx*=.8,e.vz*=.8,e.speedNow=0,e.t<e.s&&this.face(e,t,r,i.kind===`finisher`?3:7),i.lunge&&e.t<e.s+e.a){let n=i.lunge*(i.kind,1);if(e.x+=Math.sin(e.yaw)*n*r*(e.t>e.s*.35?1:.2),e.z+=Math.cos(e.yaw)*n*r*(e.t>e.s*.35?1:.2),this.dist(e,t)<.8&&this.hittable(t)){let n=this.dist(e,t)||1;e.x=t.x-(t.x-e.x)/n*.8,e.z=t.z-(t.z-e.z)/n*.8}}if(i.rush&&e.t>=e.s&&e.t<e.s+e.a&&!e.hitDone&&(e.x+=Math.sin(e.yaw)*i.rush*r,e.z+=Math.cos(e.yaw)*i.rush*r,e.inRing=e.inRing&&Math.abs(e.x)<3.7&&Math.abs(e.z)<3.7,i.id===`embestida_unicornio`&&!e.toreo&&t.data.id===`petisui`&&this.hittable(t)&&this.dist(e,t)<3.4)){e.toreo=!0;let n=Math.cos(e.yaw),r=-Math.sin(e.yaw),i=(t.x-e.x)*n+(t.z-e.z)*r>=0?1:-1;t.kbx+=n*i*7,t.kbz+=r*i*7,t.blocking=!1,t.move=null,this.beginMove(t,g(`vacile`)),t.yaw=e.yaw+Math.PI,this.emit({type:`toreo`,fighter:e.idx,target:t.idx}),this.emit({type:`msg`,text:`¡Petisui le torea! ¡OLÉ!`,big:!0});return}if(!e.hitDone&&e.t>=e.s&&e.t<=e.s+e.a+.03&&!e.toreo&&(e.t-r<e.s&&i.kind!==`taunt`&&this.emit({type:`whoosh`,fighter:e.idx}),this.resolve(e,t,i)),i.kind===`finisher`&&!e.hitDone&&e.t>e.s+e.a+.03){if(e.hitDone=!0,e.toreo&&i.id===`embestida_unicornio`){let n=e.x-t.x,r=e.z-t.z,i=Math.hypot(n,r)||1;e.x=t.x+n/i*1.5,e.z=t.z+r/i*1.5,e.x=Wu(e.x,-7.6,Bu),e.z=Wu(e.z,-7.6,Bu),e.yaw=this.yawTo(e,t),e.vx=e.vz=0,this.emit({type:`msg`,text:`Pepe se gira… ¡UN SOLO GOLPE!`,big:!0}),this.beginMove(e,g(`golpe_unico`));return}e.mom=40,this.emit({type:`finisherMiss`,fighter:e.idx})}let a=e.s+e.a+e.r;if(e.t>=e.s+e.a&&e.connected&&e.buffer&&i.kind===`strike`){let t=e.buffer;if(e.buffer=null,t===`light`){this.beginLight(e);return}if(t===`heavy`){this.beginMove(e,this.pickHeavy(e));return}if(t===`grab`){this.beginMove(e,e.grabMove);return}}n.block&&e.t>=e.s+e.a+e.r*.6&&i.kind!==`finisher`?(e.state=`idle`,e.move=null):e.t>=a&&(e.state=`idle`,e.move=null,e.superArmor=!1)}resolve(e,t,n){if(n.kind===`taunt`){e.hitDone=!0,e.mom=Math.min(100,e.mom+n.momentum),e.taunts++,this.emit({type:`taunt`,fighter:e.idx}),e.mom>=100&&this.emit({type:`ready`,fighter:e.idx});return}let r=this.dist(e,t),i=Math.abs(Gu(this.yawTo(e,t),e.yaw)),a=r<.55||i<(n.kind===`finisher`?1.2:1);if(r>n.range||!a)return;if(n.kind===`grab`){if(![`idle`,`block`,`attack`,`hitstun`,`stunned`,`getup`].includes(t.state)||t.state===`attack`&&t.move?.kind===`finisher`)return;e.hitDone=!0,e.connected=!0,t.grabPressT<.3&&(t.state===`idle`||t.state===`block`)?(this.emit({type:`reversal`,fighter:t.idx}),this.emit({type:`msg`,text:`¡`+t.data.name+` revierte el agarre!`,big:!0}),this.beginClinch(t,e)):this.beginClinch(e,t);return}if(!this.hittable(t))return;let o=Math.abs(Gu(this.yawTo(t,e),t.yaw))<1.3;if(t.blocking&&t.state===`block`&&o){let r=t.blockT<=.22,i=(e.x+t.x)/2,a=(e.z+t.z)/2;if(r){e.hitDone=!0,e.connected=!1,this.emit({type:`block`,target:t.idx,x:i,y:t.y+1.3,z:a,perfect:!0}),this.emit({type:`msg`,text:`¡Contraataque de `+t.data.name+`!`}),e.state=`stunned`,e.t=0,e.dur=n.kind===`finisher`?1.4:.85,e.move=null,e.superArmor=!1,n.kind===`finisher`&&(e.mom=0),t.mom=Math.min(100,t.mom+14),t.st=Math.min(t.maxSt,t.st+10);return}if(n.kind!==`finisher`){e.hitDone=!0,e.connected=!0;let r=!!t.data.traits?.rootedGuard,o=n.damage*Vu*.15*e.stats.power*(r?.4:1);t.hp=Math.max(1,t.hp-o),t.st=Math.max(0,t.st-n.damage*1.3*(r?.6:1));let s=t.x-e.x,c=t.z-e.z,l=Math.hypot(s,c)||1;t.kbx+=s/l*2.2,t.kbz+=c/l*2.2,this.emit({type:`block`,target:t.idx,x:i,y:t.y+1.3,z:a,perfect:!1}),t.st<=0&&(t.state=`stunned`,t.t=0,t.dur=1,t.blocking=!1,this.emit({type:`msg`,text:`¡Guardia rota!`}));return}}e.hitDone=!0,e.connected=!0,this.applyHit(e,t,n)}applyHit(e,t,n){let r=t.x-e.x,i=t.z-e.z,a=Math.hypot(r,i)||1,o=r/a,s=i/a,c=n.damage*(n.kind===`finisher`?Hu:Vu)*e.stats.power*(e.exhausted?.75:1)*t.stats.resist;if(t.state===`attack`&&t.t<t.s&&t.move?.kind!==`finisher`&&(c*=1.2),n.foul){c*=1.2,e.foulCount++;let t=this.rng()<.45;this.emit({type:`foul`,fighter:e.idx,seen:t}),t&&(e.mom=Math.max(0,e.mom-12))}t.hp=Math.max(0,t.hp-c),t.damageTaken+=c,e.damageDealt+=c;let l=e.mom>=100;e.mom=Math.min(100,e.mom+n.momentum),t.mom=Math.min(100,t.mom+c*.35),!l&&e.mom>=100&&this.emit({type:`ready`,fighter:e.idx}),t.mom>=100&&t.mom-c*.35<100&&this.emit({type:`ready`,fighter:t.idx});let u={x:(e.x+t.x)/2,y:t.y+1.35,z:(e.z+t.z)/2},d=n.kind===`finisher`;t.hitChainT>0&&t.state===`hitstun`?t.hitChain++:t.hitChain=1,t.hitChainT=.9;let f=!!n.knockdown;t.hitChain>=4&&(f=!0,t.hitChain=0),d?(e.finishersLanded++,this.emit({type:`finisherHit`,fighter:e.idx,target:t.idx,move:n})):this.emit({type:`hit`,target:t.idx,attacker:e.idx,heavy:n.damage>=10,x:u.x,y:u.y,z:u.z,dmg:c}),n.id===`hora_pablo_motos`?this.fire(e,t):(!t.superArmor||d)&&(t.hp<=0?(this.knockDown(t,e,n,o,s,!0),this.startKO(t,e)):f?this.knockDown(t,e,n,o,s,!1):(t.state=`hitstun`,t.t=0,t.dur=n.hitstun,t.move=null,t.blocking=!1,t.hitFlip=-t.hitFlip,t.kbx+=o*n.knockback*5.5,t.kbz+=s*n.knockback*5.5))}fire(e,t){t.banned=!0,t.move=null,t.blocking=!1,t.superArmor=!1;let n=t.x,r=t.z,i=Math.hypot(n,r);i<.8?(n=Math.sin(e.yaw),r=Math.cos(e.yaw)):(n/=i,r/=i);let a=6.6/Math.max(Math.abs(n),Math.abs(r)),o=Wu(n*a,-7.6,Bu),s=Wu(r*a,-7.6,Bu);this.startThrow(t,e,o,s,1.15,2.6,`throw`,0,!0),this.emit({type:`msg`,text:`¡`+t.data.name+` ha sido DESPEDIDO!`,big:!0})}knockDown(e,t,n,r,i,a){e.move=null,e.blocking=!1,e.hitChain=0;let o=n.kind===`finisher`;if(n.sendOut&&e.inRing&&!a){let n=r>.2?4-e.x:r<-.2?4+e.x:99,a=i>.2?4-e.z:i<-.2?4+e.z:99,o=Math.min(Math.abs(r)>.2?n/Math.abs(r):99,Math.abs(i)>.2?a/Math.abs(i):99);if(o<2.3){let n=o+1.5;this.startThrow(e,t,e.x+r*n,e.z+i*n,.75,1.1,`throw`,0,!0),this.emit({type:`msg`,text:`¡`+e.data.name+` sale despedido del ring!`,big:!0});return}}e.state=`down`,e.t=0,e.dur=(1.7+1.5*(1-e.hpPct)+(o?1.1:0))*e.stats.recover,e.kbx+=r*n.knockback*4,e.kbz+=i*n.knockback*4,this.emit({type:`knockdown`,target:e.idx})}startKO(e,t){this.ko||(e.koed=!0,e.state=`down`,e.t=0,e.dur=9999,this.ko={idx:e.idx,t:0,n:0},this.emit({type:`msg`,text:`¡`+e.data.name+` está KO!`,big:!0}),t.buffer=null)}stepDown(e,t){e.koed||(Ku(t)&&(e.t+=.11),e.t>=e.dur&&(e.state=`getup`,e.t=0,e.dur=.55))}beginClinch(e,t){e.state=`clinch`,e.t=0,e.dur=1.5,e.move=null,e.blocking=!1,e.superArmor=!1,t.state=`clinched`,t.t=0,t.move=null,t.blocking=!1,t.superArmor=!1,e.vx=e.vz=t.vx=t.vz=0,e.yaw=this.yawTo(e,t),t.yaw=e.yaw+Math.PI,this.stickTo(t,e),this.emit({type:`grab`,attacker:e.idx,target:t.idx})}stickTo(e,t){e.x=t.x+Math.sin(t.yaw)*.78,e.z=t.z+Math.cos(t.yaw)*.78,e.yaw=t.yaw+Math.PI}stepClinch(e,t,n){if(t.state!==`clinched`){e.state=`idle`;return}let r=null;if(e.t>.18&&(n.light?r=`throw`:n.heavy?r=`slam`:n.grab&&e.t>.3&&(r=`sub`)),!r&&e.t>=e.dur&&(r=`throw`),!r)return;if(r===`sub`){this.startSub(e,t);return}let i=r===`throw`?e.throwG:e.slamG;e.lastGrapple=i.name,this.emit({type:`grappleMove`,attacker:e.idx,target:t.idx,name:i.name,style:i.style});let a=e.inRing?3.45:Bu,o,s;i.style===`throw`?(o=e.x-Math.sin(e.yaw)*1.5,s=e.z-Math.cos(e.yaw)*1.5):(o=e.x+Math.sin(e.yaw)*1,s=e.z+Math.cos(e.yaw)*1),o=Wu(o,-a,a),s=Wu(s,-a,a),e.state=`throwing`,e.t=0,e.dur=i.style===`throw`?.85:.95,this.startThrow(t,e,o,s,i.style===`throw`?.7:.85,i.style===`throw`?1.2:1.9,i.style,i.damage*Vu*e.stats.power*t.stats.resist,!1)}startThrow(e,t,n,r,i,a,o,s,c){e.state=`thrown`,e.t=0,e.move=null,e.blocking=!1,e.thrown={fx:e.x,fz:e.z,tx:n,tz:r,dur:i,arc:a,style:o,dmg:s,by:t.idx,out:c},e.kbx=e.kbz=0}stepThrown(e){let t=e.thrown;if(!t){e.state=`down`,e.t=0,e.dur=1.5;return}let n=Wu(e.t/t.dur,0,1),r=t.style===`slam`?n:1-(1-n)*(1-n);e.x=t.fx+(t.tx-t.fx)*r,e.z=t.fz+(t.tz-t.fz)*r;let i=qu(t.fx,t.fz),a=qu(t.tx,t.tz);if(e.y=i+(a-i)*n+t.arc*4*n*(1-n),n>=1){e.thrown=null,e.y=a;let n=this.f[t.by];t.dmg>0&&(e.hp=Math.max(0,e.hp-t.dmg),e.damageTaken+=t.dmg,n.damageDealt+=t.dmg,n.mom=Math.min(100,n.mom+14),e.mom=Math.min(100,e.mom+t.dmg*.4),n.mom>=100&&this.emit({type:`ready`,fighter:n.idx})),this.emit({type:`land`,target:e.idx,big:t.style===`slam`||t.out}),e.state=`down`,e.t=0,e.dur=(1.8+1.5*(1-e.hpPct))*e.stats.recover,e.inRing=Math.abs(e.x)<=3.6&&Math.abs(e.z)<=3.6,e.hp<=0&&this.startKO(e,n)}}startPin(e,t){e.state=`pinA`,e.t=0,e.move=null,e.blocking=!1,e.vx=e.vz=0,t.state=`pinD`,t.t=0,t.pinT=0,t.escape=0,t.pinCount=0,t.by=e.idx,this.emit({type:`pinStart`,attacker:e.idx,target:t.idx})}approachPin(e,t,n){let r=Math.cos(t.yaw),i=-Math.sin(t.yaw),a=(e.x-t.x)*r+(e.z-t.z)*i>=0?1:-1,o=t.x+r*.75*a,s=t.z+i*.75*a,c=1-Math.exp(-8*n);e.x+=(o-e.x)*c,e.z+=(s-e.z)*c,e.yaw=this.yawTo(e,t)}stepPin(e,t,n,r){if(t.state!==`pinA`){e.state=`down`,e.t=0,e.dur=.8;return}e.pinT+=r,e.escape=Math.max(0,e.escape-.12*r),Ku(n)&&(e.escape+=.2*(.25+e.hpPct)*e.stats.escape);let i=Math.min(3,Math.floor(e.pinT));i>e.pinCount&&(e.pinCount=i,this.emit({type:`pinCount`,n:i})),e.escape>=1?(this.emit({type:`kickout`,fighter:e.idx}),e.state=`getup`,e.t=0,e.dur=.5,t.state=`stunned`,t.t=0,t.dur=.7):e.pinT>=3&&this.end(t.idx,`pin`)}releaseHold(e,t){e.state=`idle`,t.state===`pinD`&&(t.state=`down`,t.t=0,t.dur=.8),t.state===`subD`&&(t.state=`stunned`,t.t=0,t.dur=.8)}startSub(e,t){e.state=`subA`,e.t=0,e.lastGrapple=e.subG.name,t.state=`subD`,t.t=0,t.subMeter=.35,t.by=e.idx,e.subsApplied++,this.emit({type:`subStart`,attacker:e.idx,target:t.idx}),this.emit({type:`msg`,text:`¡`+e.subG.name+` de `+e.data.name+`!`,big:!0})}stepSub(e,t,n,r){if(t.state!==`subA`){e.state=`stunned`,e.t=0,e.dur=.8;return}let i=e.hpPct;e.subMeter+=(.06+.3*(1-i)**1.3)*t.stats.power*r,e.hp=Math.max(1,e.hp-1.4*r),e.damageTaken+=1.4*r,t.damageDealt+=1.4*r,Ku(n)&&(e.subMeter-=.08*(.45+i)*e.stats.escape);let a=this.lastInputs?.[t.idx];a&&(a.light||a.heavy||a.grab)&&(e.subMeter+=.012),e.subMeter>=1?(this.emit({type:`tap`,fighter:e.idx}),this.end(t.idx,`rendicion`)):e.subMeter<=0&&(this.emit({type:`subBreak`,fighter:e.idx}),e.state=`stunned`,e.t=0,e.dur=.9,t.state=`stunned`,t.t=0,t.dur=.9)}lastInputs=null;motion(e,t){if([`idle`,`block`].includes(e.state)?(e.x+=e.vx*t,e.z+=e.vz*t):e.state!==`attack`&&(e.vx*=.8,e.vz*=.8),[`idle`,`block`,`attack`,`hitstun`,`down`,`getup`,`stunned`,`ko`,`win`,`subD`].includes(e.state)){e.x+=e.kbx*t,e.z+=e.kbz*t;let n=Math.exp(-9*t);e.kbx*=n,e.kbz*=n}if(e.banned&&e.state!==`thrown`){let t=4.55;Math.abs(e.x)<t&&Math.abs(e.z)<t&&(Math.abs(e.x)>=Math.abs(e.z)?e.x=(e.x<0?-1:1)*t:e.z=(e.z<0?-1:1)*t)}if(e.state!==`thrown`){if(e.inRing&&e.exitAllow<=0&&e.state!==`subA`&&!e.banned){let t=3.7199999999999998;e.x=Wu(e.x,-3.7199999999999998,t),e.z=Wu(e.z,-3.7199999999999998,t)}e.x=Wu(e.x,-7.6,Bu),e.z=Wu(e.z,-7.6,Bu),e.inRing&&(Math.abs(e.x)>4.05||Math.abs(e.z)>4.05)?e.inRing=!1:!e.inRing&&Math.abs(e.x)<3.6&&Math.abs(e.z)<3.6&&(e.inRing=!0);let n=qu(e.x,e.z);e.y+=(n-e.y)*(1-Math.exp(-10*t))}else(Math.abs(e.x)>4.05||Math.abs(e.z)>4.05)&&(e.inRing=!1)}separate(){let[e,t]=this.f,n=[`clinch`,`clinched`,`throwing`,`thrown`,`subA`,`subD`,`pinA`,`pinD`];if(n.includes(e.state)||n.includes(t.state))return;let r=e=>e.state===`down`||e.state===`ko`,i=r(e)||r(t)?.7:.85,a=t.x-e.x,o=t.z-e.z,s=Math.hypot(a,o);if(s>=i)return;let c=s>.001?a/s:1,l=s>.001?o/s:0,u=i-s;r(e)&&!r(t)?(t.x+=c*u,t.z+=l*u):r(t)&&!r(e)?(e.x-=c*u,e.z-=l*u):(e.x-=c*u/2,e.z-=l*u/2,t.x+=c*u/2,t.z+=l*u/2)}ringRules(e){for(let t of this.f){let n=Math.abs(t.x)>4.05||Math.abs(t.z)>4.05;if(n&&t.state!==`thrown`){t.outT+=e;let n=Math.floor(t.outT);if(n>t.outN&&(t.outN=n,this.emit({type:`outCount`,fighter:t.idx,n}),n>=10)){this.end(1-t.idx,`fuera`);return}}else n||(t.outT=0,t.outN=0)}}updateKO(e){if(!this.ko)return;this.ko.t+=e;let t=Math.min(10,Math.floor(this.ko.t/.42));t>this.ko.n&&(this.ko.n=t,this.emit({type:`koCount`,n:t})),t>=10&&this.end(1-this.ko.idx,`ko`)}updateRef(e){let[t,n]=this.f,r=(t.x+n.x)/2+this.refAway.x*2,i=(t.z+n.z)/2+this.refAway.z*2,a=0,o=`idle`,s=0,c=t.state===`pinD`?t:n.state===`pinD`?n:null,l=this.ko?this.f[this.ko.idx]:null;c?(r=c.x+this.refAway.x*1.2,i=c.z+this.refAway.z*1.2,o=`count`,s=c.pinCount):l&&(r=l.x+this.refAway.x*1.2,i=l.z+this.refAway.z*1.2,o=`count`,s=this.ko.n);let u=3.4;r=Wu(r,-3.4,u),i=Wu(i,-3.4,u);for(let e of this.f){let t=r-e.x,n=i-e.z,a=Math.hypot(t,n);a<1.1&&o!==`count`&&(r=e.x+t/(a||1)*1.1,i=e.z+n/(a||1)*1.1)}let d=1-Math.exp(-4*e);this.ref.x+=(r-this.ref.x)*d,this.ref.z+=(i-this.ref.z)*d;let f=c??l??{x:(t.x+n.x)/2,z:(t.z+n.z)/2};a=Math.atan2(f.x-this.ref.x,f.z-this.ref.z),this.ref.yaw+=Gu(a,this.ref.yaw)*(1-Math.exp(-8*e)),this.ref.mode=o,this.ref.count=s}end(e,t){if(this.over)return;this.over=!0,this.winner=e,this.reason=t;let n=this.f[e],r=this.f[1-e];n.state=`win`,n.t=0,n.move=null,n.blocking=!1,n.vx=n.vz=0,r.state=(r.state!==`down`&&r.state,`ko`),r.t=0,r.move=null,r.blocking=!1,r.vx=r.vz=0,this.emit({type:`end`,winner:e,reason:t})}};function Yu(e,t,n,r,i,a){for(let o=0;o<7;o++){let s=r*(1-o/7);e.fillStyle=o%2==0?i:a,e.beginPath(),e.arc(t,n+o*r*.025,s,0,Math.PI*2),e.fill()}e.fillStyle=`#000`,e.beginPath(),e.arc(t,n+r*.2,r/7*.9,0,Math.PI*2),e.fill()}function Xu(e){let t=1024,n=document.createElement(`canvas`);n.width=t,n.height=t;let r=n.getContext(`2d`),i=e=>`#`+e.toString(16).padStart(6,`0`);r.fillStyle=i(e.canvas),r.fillRect(0,0,t,t);for(let e=0;e<9e3;e++)r.fillStyle=`rgba(${Math.random()<.5?`0,0,0`:`255,255,255`},${Math.random()*.035})`,r.fillRect(Math.random()*t,Math.random()*t,1+Math.random()*3,1+Math.random()*3);r.strokeStyle=i(e.border),r.lineWidth=34,r.strokeRect(70,70,884,884),r.strokeStyle=i(e.accent),r.lineWidth=8,r.strokeRect(110,110,804,804),r.globalAlpha=.95,Yu(r,t/2,t/2-40,250,i(e.border),i(e.accent)),r.globalAlpha=1,r.fillStyle=`#f4efe6`,r.font=`900 120px Impact, "Arial Narrow", sans-serif`,r.textAlign=`center`,r.fillText(`EL HOYO`,t/2,842),r.font=`700 54px Impact, "Arial Narrow", sans-serif`,r.fillStyle=i(e.accent),r.fillText(e.ringText,t/2,907);let a=new Ui(n);return a.anisotropy=8,a.colorSpace=yt,a}function Zu(e){let t=document.createElement(`canvas`);t.width=1024,t.height=128;let n=t.getContext(`2d`),r=e=>`#`+e.toString(16).padStart(6,`0`);n.fillStyle=r(e.skirt),n.fillRect(0,0,1024,128),n.fillStyle=r(e.accent),n.fillRect(0,0,1024,10),n.fillRect(0,118,1024,10),n.font=`900 78px Impact, "Arial Narrow", sans-serif`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillStyle=`#f4efe6`,n.fillText(e.apronText,512,66),Yu(n,90,64,40,`#f4efe6`,r(e.accent)),Yu(n,934,64,40,`#f4efe6`,r(e.accent));let i=new Ui(t);return i.colorSpace=yt,i.anisotropy=8,i}function Qu(e){let t=new Wn,n=4.6,r=new G(new K(n*2,1,n*2),new J({color:1381653,roughness:.8}));r.position.y=1/2-.02,r.castShadow=!1,r.receiveShadow=!0,t.add(r);let i=new J({map:Xu(e),roughness:.78,metalness:0}),a=new G(new ea(n*2,n*2),i);a.rotation.x=-Math.PI/2,a.position.y=1,a.receiveShadow=!0,t.add(a);let o=new J({map:Zu(e),roughness:.9});for(let[e,r,i]of[[0,n,0],[0,-4.6,Math.PI],[n,0,Math.PI/2],[-4.6,0,-Math.PI/2]]){let a=new G(new ea(n*2,.85),o);a.position.set(e+(e?Math.sign(e)*.012:0),.45,r+(r?Math.sign(r)*.012:0)),a.rotation.y=i,a.receiveShadow=!0,t.add(a)}let s=new J({color:10133672,roughness:.3,metalness:.9}),c=[e.accent,e.border,e.accent,e.border],l=[.42,.78,1.14];[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([e,n],r)=>{let i=new G(new Yi(.075,.085,1.5,12),s);i.position.set(e*4,1.75,n*4),i.castShadow=!0,t.add(i);let a=new J({color:c[r],roughness:.55});l.forEach(r=>{let i=new G(new qi(.11,.16,4,10),a);i.position.set(e*3.98,1+r,n*3.98),i.castShadow=!0,t.add(i)})}),l.forEach((n,r)=>{let i=new J({color:e.rope[r],roughness:.55,metalness:.05});for(let[e,r,a]of[[0,4,0],[0,-4,0],[4,0,Math.PI/2],[-4,0,Math.PI/2]]){let o=new G(new Yi(.028,.028,8,8),i);o.rotation.z=Math.PI/2,o.rotation.y=a,o.position.set(e,1+n,r),o.castShadow=!0,t.add(o)}});let u=new J({color:1842204,roughness:.6,metalness:.2});for(let e=0;e<3;e++){let n=new G(new K(1.4,.06,.45),u);n.position.set(4.9+(2-e)*0,.3+e*.3-0,2.6),n.position.x=4.85+(2-e)*.4,n.rotation.y=Math.PI/2,n.castShadow=!0,t.add(n)}return t}var $u=class{w;h;palette;text;mesh;c=document.createElement(`canvas`);g;tex;acc=0;constructor(e,t,n,r=`EL HOYO WRESTLING`){this.w=e,this.h=t,this.palette=n,this.text=r,this.c.width=512,this.c.height=Math.max(64,Math.round(t/e*512)),this.g=this.c.getContext(`2d`),this.tex=new Ui(this.c),this.tex.colorSpace=yt,this.mesh=new G(new ea(e,t),new ai({map:this.tex,toneMapped:!1,side:2})),this.draw(0)}draw(e){let{g:t,c:n}=this,[r,i,a]=this.palette,o=t.createLinearGradient(0,0,n.width,n.height);o.addColorStop(0,r),o.addColorStop(1,i),t.fillStyle=o,t.fillRect(0,0,n.width,n.height),t.globalAlpha=.35;for(let r=0;r<6;r++)t.strokeStyle=a,t.lineWidth=6,t.beginPath(),t.arc(n.width*.18,n.height/2,20+(r*28+e*40)%170,0,Math.PI*2),t.stroke();t.globalAlpha=1;for(let r=0;r<18;r++){let i=(.2+.8*Math.abs(Math.sin(e*2+r*.7)))*n.height*.5;t.fillStyle=a,t.globalAlpha=.5,t.fillRect(n.width*.55+r*14,n.height-i,9,i)}t.globalAlpha=1,Yu(t,n.width*.13,n.height/2,n.height*.36,`#fff`,a),t.fillStyle=`#fff`,t.font=`900 ${Math.round(n.height*.3)}px Impact, "Arial Narrow", sans-serif`,t.textAlign=`left`,t.textBaseline=`middle`,t.shadowColor=a,t.shadowBlur=14,t.fillText(this.text,n.width*.26,n.height*.42),t.shadowBlur=0,t.font=`700 ${Math.round(n.height*.14)}px "Arial Narrow", sans-serif`,t.fillStyle=a,t.fillText(`INSPIRADO EN LA OBRA ORIGINAL DE JEFEFBI`,n.width*.26,n.height*.72),this.tex.needsUpdate=!0}update(e,t){this.acc+=e,this.acc>.12&&(this.acc=0,this.draw(t))}},ed=class{len;phase;speed;swing;pivot=new Wn;constructor(e,t,n,r,i,a){this.len=t,this.phase=r,this.speed=i,this.swing=a;let o=new Xi(n,t,20,1,!0);o.translate(0,-t/2,0);let s=new G(o,new ai({color:e,transparent:!0,opacity:.07,blending:2,depthWrite:!1,side:2,toneMapped:!1}));this.pivot.add(s)}update(e){this.pivot.rotation.x=Math.sin(e*this.speed+this.phase)*this.swing,this.pivot.rotation.z=Math.cos(e*this.speed*.8+this.phase*1.7)*this.swing}},td=class{opts;group=new Wn;ring;key;crowd=null;screens=[];beams=[];anim=[];fogColor=328967;fogDensity=.006;exposure=1;constructor(e,t){this.opts=e,this.ring=Qu(t),this.group.add(this.ring);let n=new G(new Ji(160,48),new J({color:723726,roughness:.5,metalness:.2}));n.rotation.x=-Math.PI/2,n.receiveShadow=!0,this.group.add(n);let r=new J({color:1381658,roughness:.55,metalness:.3}),i=Bu+.35;for(let[e,n,a,o]of[[0,i,i*2+.6,.3],[0,-i,i*2+.6,.3],[i,0,.3,i*2],[-i,0,.3,i*2]]){let i=new G(new K(a,1.15,o),r);i.position.set(e,.575,n),i.castShadow=!0,i.receiveShadow=!0,this.group.add(i);let s=new G(new K(a+.01,.07,o+.01),new J({color:t.accent,emissive:t.accent,emissiveIntensity:.6}));s.position.set(e,1,n),this.group.add(s)}this.key=new Za(16773597,1,0,.62,.55,0),this.key.position.set(2,26,7),this.key.target.position.set(0,1,0),this.key.castShadow=!0,this.key.shadow.mapSize.set(e.quality===`baja`?1024:2048,e.quality===`baja`?1024:2048),this.key.shadow.bias=-4e-4,this.key.shadow.normalBias=.03,this.key.shadow.camera.near=8,this.key.shadow.camera.far=60,this.group.add(this.key,this.key.target);let a=new La(8885176,1182726,.16);this.group.add(a)}addScreen(e,t,n,r,i=[0,6,0]){e.mesh.position.set(t,n,r),e.mesh.lookAt(...i),this.group.add(e.mesh),this.screens.push(e);let a=new G(new K(e.w+.5,e.h+.5,.3),new J({color:657930,roughness:.5,metalness:.6}));a.position.copy(e.mesh.position),a.quaternion.copy(e.mesh.quaternion),a.translateZ(-.2),this.group.add(a)}addBeam(e,t,n,r){e.pivot.position.set(t,n,r),this.group.add(e.pivot),this.beams.push(e)}update(e,t,n,r){this.crowd?.update(t,n,r);for(let n of this.screens)n.update(e,t);for(let e of this.beams)e.update(t);for(let n of this.anim)n(e,t)}dispose(){this.group.traverse(e=>{let t=e;t.geometry?.dispose?.();let n=t.material;Array.isArray(n)?n.forEach(e=>e.dispose?.()):n?.dispose?.()})}};function nd(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new qr;c.morphTargetsRelative=s;let l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0,p=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let t in d.morphAttributes){if(!i.has(t))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;if(d.morphAttributes[t].length!==e[0].morphAttributes[t].length)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have the same number of morph targets for the "`+t+`" morph attribute.`),null;o[t]===void 0&&(o[t]=[]),o[t].push(d.morphAttributes[t]),p++}if(p!==i.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of morph attributes.`),null;if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=rd(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=rd(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function rd(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Mr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var id=e=>()=>(e=e*1664525+1013904223>>>0,e/4294967296);function ad(e){if(e===`lo`){let e=new K(.5,.62,.3);e.translate(0,.56,0);let t=new $i(.15,0);return t.translate(0,1.02,0),{body:e,head:t}}let t=new qi(.19,.34,2,8);t.scale(1.15,1,.75),t.translate(0,.62,0);let n=new qi(.055,.34,2,5);n.rotateZ(.5),n.translate(-.3,.8,.04);let r=new qi(.055,.34,2,5);r.rotateZ(-.5),r.translate(.3,.8,.04);let i=new q(.125,10,8);return i.scale(.95,1.1,1),i.translate(0,1.07,0),{body:nd([t,n,r]),head:i}}var od=class{group=new Wn;time={value:0};excite={value:.3};flashMat;count=0;constructor(e,t,n={}){let r=id(n.seed??7),i=n.near??(()=>!1),a=e.filter(i),o=e.filter(e=>!i(e));this.count=e.length;let s=[15845541,14262906,12156246,9263675,7029032,15251600].map(e=>new W(e)),c=t.map(e=>new W(e)),l=(e,t)=>{if(!e.length)return;let{body:n,head:i}=ad(t),a=new Float32Array(e.length),o=new pa({color:16777215,emissive:1447453}),l=new pa({color:16777215,emissive:1840402}),u=e=>{e.onBeforeCompile=e=>{e.uniforms.uTime=this.time,e.uniforms.uExcite=this.excite,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float aPhase;
uniform float uTime;
uniform float uExcite;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
              float sp = 3.0 + fract(aPhase * 7.0) * 3.0;
              float hop = max(0.0, sin(uTime * sp + aPhase * 40.0));
              transformed.y += hop * hop * 0.2 * uExcite * (0.5 + fract(aPhase * 13.0));
              transformed.x += sin(uTime * 1.5 + aPhase * 20.0) * 0.02 * uExcite;`)}};u(o),u(l);let d=new Oi(n,o,e.length),f=new Oi(i,l,e.length),p=new Un;e.forEach((e,t)=>{p.position.set(e.x,e.y,e.z),p.rotation.set(0,e.yaw,0);let n=.88+r()*.25;p.scale.set(n,n*(.92+r()*.16),n),p.updateMatrix(),d.setMatrixAt(t,p.matrix),f.setMatrixAt(t,p.matrix);let i=c[Math.floor(r()*c.length)].clone().multiplyScalar(.3+r()*.5);d.setColorAt(t,i),f.setColorAt(t,s[Math.floor(r()*s.length)].clone().multiplyScalar(.55+r()*.35)),a[t]=r()}),n.setAttribute(`aPhase`,new bi(a,1)),i.setAttribute(`aPhase`,new bi(a,1)),d.instanceMatrix.needsUpdate=!0,f.instanceMatrix.needsUpdate=!0,d.frustumCulled=!1,f.frustumCulled=!1,this.group.add(d,f)};l(a,`hi`),l(o,`lo`);let u=Math.min(n.flashes??500,e.length),d=new Float32Array(u*3),f=new Float32Array(u);for(let t=0;t<u;t++){let n=e[Math.floor(r()*e.length)];d[t*3]=n.x,d[t*3+1]=n.y+1.1,d[t*3+2]=n.z,f[t]=r()}let p=new qr;p.setAttribute(`position`,new Mr(d,3)),p.setAttribute(`aPhase`,new Mr(f,1)),this.flashMat=new ua({transparent:!0,depthWrite:!1,blending:2,uniforms:{uTime:this.time,uExcite:this.excite,uScale:{value:600}},vertexShader:`attribute float aPhase; uniform float uTime; uniform float uExcite; uniform float uScale; varying float vA;
        void main(){ float r = 0.4 + aPhase * 1.6; float f = pow(max(0.0, sin(uTime * (1.0 + aPhase * 3.0) + aPhase * 100.0)), 60.0 / (0.4 + uExcite));
          vA = f; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = (0.9 + f * 1.8) * uScale / -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:`varying float vA; void main(){ vec2 c = gl_PointCoord - 0.5; float d = 1.0 - smoothstep(0.0, 0.5, length(c)); gl_FragColor = vec4(vec3(1.0, 0.97, 0.85) * 3.0, d * vA); }`});let m=new Bi(p,this.flashMat);m.frustumCulled=!1,this.group.add(m)}update(e,t,n){this.time.value=e,this.excite.value+=(t-this.excite.value)*.05,this.flashMat.uniforms.uScale.value=n*.5}dispose(){this.group.traverse(e=>{let t=e;t.geometry?.dispose?.(),t.material?.dispose?.()})}};function sd(e,t,n,r=.5){let i=[],a=(e,t,n,a,o,s)=>{let c=Math.hypot(n-e,a-t),l=Math.max(1,Math.round(c/r));for(let r=0;r<l;r++)i.push({x:e+(n-e)*r/l,z:t+(a-t)*r/l,nx:o,nz:s})},o=(e,t,a,o)=>{let s=Math.abs(o-a)*n,c=Math.max(2,Math.round(s/r));for(let r=0;r<c;r++){let s=a+(o-a)*r/c;i.push({x:e+n*Math.cos(s),z:t+n*Math.sin(s),nx:Math.cos(s),nz:Math.sin(s)})}},s=Math.PI/2;return a(-(e-n),t,e-n,t,0,1),o(e-n,t-n,s,0),a(e,t-n,e,-(t-n),1,0),o(e-n,-(t-n),0,-s),a(e-n,-t,-(e-n),-t,0,-1),o(-(e-n),-(t-n),-s,-2*s),a(-e,-(t-n),-e,t-n,-1,0),o(-(e-n),t-n,2*s,s),i}function cd(e,t,n,r,i,a){let o=e.length,s=[],c=[],l=[],u=0;for(let a=0;a<=o;a++){let d=e[a%o],f=e[(a+o-1)%o];if(a>0&&(u+=Math.hypot(d.x-f.x,d.z-f.z)),s.push(d.x+d.nx*t,n,d.z+d.nz*t,d.x+d.nx*r,i,d.z+d.nz*r),l.push(u/4,0,u/4,1),a<o){let e=a*2;c.push(e,e+2,e+1,e+1,e+2,e+3)}}let d=new qr;d.setAttribute(`position`,new Fr(s,3)),d.setAttribute(`uv`,new Fr(l,2)),d.setIndex(c),d.computeVertexNormals();let f=new G(d,a);return f.receiveShadow=!1,f}function ld(e,t,n,r,i,a,o,s,c=.5){let l=[],u=Math.max(1,Math.round(o/c));for(let o=0;o<n;o++){let n=t+o*r;for(let t=o%2;t<e.length;t+=u){let r=e[t],c=r.x+r.nx*n,u=r.z+r.nz*n;s?.(c,u,o)||l.push({x:c,y:i+o*a,z:u,yaw:Math.atan2(-r.nx,-r.nz)})}}return l}function ud(e){let t=[];for(let n=0;n<e.rows;n++){let r=n/(e.rows-1),i=e.a0+(e.a1-e.a0)*r,a=e.b0+(e.b1-e.b0)*r,o=e.y0+e.hMax*r**1.1,s=2*Math.PI*Math.sqrt((i*i+a*a)/2),c=Math.floor(s/e.spacing);for(let r=n%2*.5;r<c;r++){let n=r/c*Math.PI*2,s=n/(Math.PI*2)*e.aisles;if(Math.abs(s-Math.round(s))<.05&&e.aisles>0)continue;let l=i*Math.cos(n),u=a*Math.sin(n);e.skip?.(l,u)||t.push({x:l,y:o,z:u,yaw:Math.atan2(-l,-u)})}}return t}function dd(e,t,n,r,i,a,o,s=160){let c=[],l=(a,o,s)=>{let c=a/i,l=e+(n-e)*c,u=t+(r-t)*c;return[l*Math.cos(o),s,u*Math.sin(o)]},u=e=>o+a*Math.min(1,e/(i-1))**1.1;for(let e=0;e<i;e++)for(let t=0;t<s;t++){let n=t/s*Math.PI*2,r=(t+1)/s*Math.PI*2,i=u(e)-.35,a=e>0?u(e-1)-.35:o-.5,d=l(e,n,i),f=l(e,r,i),p=l(e+1,r,i),m=l(e+1,n,i);c.push(...d,...p,...f,...d,...m,...p);let h=l(e,n,a),g=l(e,r,a);c.push(...h,...f,...g,...h,...d,...f)}let d=new qr;return d.setAttribute(`position`,new Fr(c,3)),d.computeVertexNormals(),d}var fd=class{group=new Wn;bows=[];conductor;bodies=[];constructor(){new J({color:5913122,roughness:.6});let e=new J({color:1118484,roughness:.75}),t=new J({color:15329772,roughness:.7}),n=new J({color:14201418,roughness:.25,metalness:.95}),r=new J({color:11975876,roughness:.3,metalness:.9}),i=new J({color:11822650,roughness:.3,metalness:.9}),a=new J({color:8011034,roughness:.3,metalness:.05}),o=[15845541,14262906,12156246,9263675].map(e=>new J({color:e,roughness:.6}));for(let e=0;e<4;e++){let t=new G(new K(15+e*3.4,.45*(e+1),2.2),new J({color:1775122,roughness:.7}));t.position.set(0,.45*(e+1)/2,-e*2),t.receiveShadow=!0,this.group.add(t)}let s=new G(new Yi(14,14,9,28,1,!0,Math.PI*.62,Math.PI*.76),new J({color:4928803,roughness:.5,side:2,emissive:2759176,emissiveIntensity:.7}));s.position.set(0,4.6,8),s.rotation.y=Math.PI,this.group.add(s);let c=new G(new K(26,.3,9),new J({color:2760470,roughness:.6}));c.position.set(0,9.2,-4.5),this.group.add(c);let l=new G(new K(24,.12,.12),new ai({color:16767392,toneMapped:!1}));l.position.set(0,8.7,-.1),this.group.add(l);let u=(s,c,l,u,d)=>{let f=new Wn;f.position.set(s,c,l),f.rotation.y=Math.PI+s*.012,f.rotation.y=s*-.015;let p=new G(new K(.5,.06,.5),e);p.position.set(0,.45,0),f.add(p);for(let t of[-1,1]){let n=new G(new qi(.1,.34,3,8),e);n.rotation.x=Math.PI/2,n.position.set(t*.12,.52,.2),f.add(n);let r=new G(new qi(.075,.38,3,8),e);r.position.set(t*.12,.25,.4),f.add(r)}let m=new G(new qi(.17,.32,4,10),e);m.position.set(0,.88,0),m.scale.z=.8,f.add(m);let h=new G(new K(.1,.34,.02),t);h.position.set(0,.9,.14),f.add(h);let g=new G(new q(.115,12,10),o[d%o.length]);g.position.set(0,1.32,.02),f.add(g);let _=new G(new q(.12,10,8,0,Math.PI*2,0,Math.PI*.5),new J({color:[1380368,2759184,7829367,723723][d%4],roughness:.9}));_.position.set(0,1.34,0),f.add(_);let v=t=>{let n=new Wn;n.position.set(t*.22,1.1,0);let r=new G(new qi(.05,.24,3,6),e);r.position.y=-.17,n.add(r);let i=new Wn;i.position.y=-.32,n.add(i);let a=new G(new qi(.042,.22,3,6),e);return a.position.y=-.14,i.add(a),f.add(n),{a:n,fa:i}},y=v(1),b=v(-1),x=(e,t,n)=>{e.a.rotation.x=t,e.fa.rotation.x=n};if(u===`violin`||u===`viola`){let e=new G(new K(.2,.06,.36),a);e.position.set(.16,1.15,.22),e.rotation.y=.3,f.add(e),x(y,-1.4,-1),x(b,-.9,-1.2);let n=new G(new Yi(.006,.006,.7,4),t);n.rotation.z=Math.PI/2,n.position.set(0,-.22,.12),b.fa.add(n),this.bows.push({arm:b.a,phase:d*.8,amp:.18,axis:`y`})}else if(u===`cello`){let e=new G(new qi(.15,.55,4,10),a);e.position.set(0,.7,.36),e.scale.z=.5,f.add(e),x(y,-1.1,-.6),x(b,-.8,-1),this.bows.push({arm:b.a,phase:d*.5,amp:.22,axis:`y`})}else if(u===`brass`){let e=new G(new Yi(.02,.02,.55,6),n);e.rotation.x=Math.PI/2,e.position.set(0,1.15,.38),f.add(e);let t=new G(new Xi(.15,.3,14,1,!0),n);t.rotation.x=-Math.PI/2,t.position.set(0,1.12,.78),t.material.side=2,f.add(t),x(y,-1.3,-1.1),x(b,-1.3,-1.1)}else if(u===`timp`){let e=new G(new q(.4,14,10,0,Math.PI*2,0,Math.PI/2),i);e.position.set(0,.55,.65),f.add(e),x(y,-1.1,-.5),x(b,-1.1,-.5),this.bows.push({arm:y.a,phase:0,amp:.5,axis:`x`}),this.bows.push({arm:b.a,phase:1.5,amp:.5,axis:`x`})}else if(u===`drum`){let e=new G(new Yi(.28,.28,.3,16),r);e.position.set(0,.7,.55),f.add(e),x(y,-1,-.8),x(b,-1,-.8),this.bows.push({arm:y.a,phase:0,amp:.4,axis:`x`}),this.bows.push({arm:b.a,phase:1,amp:.4,axis:`x`})}else x(y,-.8,-.6),x(b,-.8,-.6);let S=new G(new K(.4,.03,.25),e);S.position.set(0,1,.8),S.rotation.x=-.4,f.add(S);let C=new G(new Yi(.012,.012,.8,4),r);C.position.set(0,.6,.8),f.add(C),f.traverse(e=>{e.castShadow=!1}),this.group.add(f),this.bodies.push(f)},d=0,f=(e,t,n,r)=>{for(let i=0;i<e;i++){let a=e===1?0:i/(e-1)-.5,o=a*n,s=-t*2+Math.abs(a)*.9;u(o,.45*(t+1),s-.2,r,d++)}};f(9,0,13,`violin`),f(7,1,15,`viola`),f(5,2,12,`cello`),f(8,2,22,`brass`),f(8,3,24,`brass`),f(2,3,6,`timp`),f(2,3,14,`drum`);let p=new G(new Yi(.7,.7,.4,14),e);p.position.set(0,.25,2.6),this.group.add(p);let m=new Wn;m.position.set(0,.45,2.6);let h=new G(new qi(.19,.5,4,10),e);h.position.y=1,m.add(h);let g=new G(new q(.12,12,10),o[1]);g.position.y=1.62,m.add(g);let _=new G(new qi(.09,.7,3,8),e);_.position.set(.1,.4,0),m.add(_);let v=_.clone();v.position.x=-.1,m.add(v);let y=new Wn;y.position.set(-.24,1.3,0);let b=new G(new qi(.05,.28,3,6),e);b.position.y=-.2,y.add(b);let x=new G(new Yi(.006,.006,.4,4),t);x.position.set(0,-.5,.15),x.rotation.x=1.2,y.add(x),m.add(y);let S=y.clone();S.position.x=.24,m.add(S),this.conductor=y,this.group.add(m)}update(e,t){let n=3.2+t*1.5;for(let t of this.bows){let r=Math.sin(e*n+t.phase);t.axis===`y`?t.arm.rotation.y=r*t.amp:t.arm.rotation.x=-1+r*t.amp}this.conductor.rotation.x=-.6+Math.sin(e*n*.5)*.7,this.conductor.rotation.z=Math.sin(e*n*.25)*.3,this.bodies.forEach((t,r)=>{t.rotation.z=Math.sin(e*n*.5+r*.3)*.035})}},pd=17,md=14.5,hd=64,gd=52,_d=58,vd=28,yd=class extends td{id=`matamoros`;displayName=`Matamoros`;orchestra;orchestraSpot=new V;fogDensity=.0075;constructor(e){super(e,{canvas:13222580,border:9379101,accent:15185211,rope:[15185211,15921906,9379101],skirt:1708819,apronText:`EL HOYO WRESTLING · TEMPORADA 4`,ringText:`MATAMOROS`});let t=e.quality,n=t===`alta`?.5:t===`media`?.7:1.1,r=new G(dd(pd,md,hd,gd,_d,vd,.2,t===`baja`?96:160),new J({color:1776676,roughness:.85,side:2}));r.receiveShadow=!1,this.group.add(r);let i=.5;for(let e=0;e<=1;e+=.005){let t=pd+47*e,n=md+37.5*e;if((40/t)**2+(-31/n)**2<=1){i=e;break}}let a=.2+vd*i**1.1-.35;this.orchestra=new fd,this.orchestra.group.position.set(40,a,-31),this.orchestra.group.rotation.y=Math.atan2(-40,31),this.orchestra.group.scale.setScalar(1.35),this.group.add(this.orchestra.group),this.orchestraSpot.set(40,a+6,-31);let o=new Za(16761466,1,0,.6,.6,0);o.position.set(32,a+20,-25),o.target.position.set(40,a+1,-31),o.intensity=4,this.group.add(o,o.target);let s=ud({a0:11.5,b0:10.5,a1:16.5,b1:14,rows:6,hMax:.15,y0:0,spacing:n*1.4,aisles:8,seed:1}),c=ud({a0:17.5,b0:15,a1:63,b1:51,rows:55,hMax:27.4,y0:.55,spacing:n,aisles:10,skip:(e,t)=>Math.hypot(e-40,t- -31)<9.5&&t<-12}),l=[...s,...c];this.crowd=new od(l,[1118484,1710626,2303534,2824730,1778744,3816e3,1118484,1710626,11740715,15198183,1851276,15185211,2980422],{near:e=>Math.abs(e.x)<24&&Math.abs(e.z)<20&&e.y<3,seed:11,flashes:t===`baja`?150:t===`media`?400:900}),this.group.add(this.crowd.group);let u=new G(new q(80,40,18,0,Math.PI*2,0,Math.PI/2),new J({color:460555,roughness:.95,side:1}));u.scale.set(1,.55,.85),u.position.y=30,this.group.add(u);let d=new G(new ta(24,.5,8,64),new J({color:2303018,roughness:.5,metalness:.7}));d.rotation.x=Math.PI/2,d.position.y=36,this.group.add(d);let f=new Oi(new q(.45,10,8),new ai({color:16773328,toneMapped:!1}),36),p=new gn;for(let e=0;e<36;e++){let t=e/36*Math.PI*2;p.setPosition(Math.cos(t)*24,35.4,Math.sin(t)*24),f.setMatrixAt(e,p)}this.group.add(f);let m=new G(new K(15,7,15),new J({color:789520,roughness:.4,metalness:.5}));m.position.y=29,this.group.add(m);let h=[[`#4b0d12`,`#1a1a2a`,`#ffcf4a`],[`#102a5a`,`#4b0d12`,`#ff6a5a`],[`#2a0f3a`,`#101a2a`,`#6ee0ff`],[`#3a2a08`,`#220808`,`#ffffff`]];[[0,7.55,0],[Math.PI,-7.55,0],[Math.PI/2,0,7.55],[-Math.PI/2,0,-7.55]].forEach(([e,t,n],r)=>{let i=new $u(14,6.2,h[r]);i.mesh.position.set(t,29,n),i.mesh.rotation.y=e,r<2?(i.mesh.position.set(0,29,r===0?7.55:-7.55),i.mesh.rotation.y=r===0?0:Math.PI):(i.mesh.position.set(r===2?7.55:-7.55,29,0),i.mesh.rotation.y=r===2?Math.PI/2:-Math.PI/2),this.group.add(i.mesh),this.screens.push(i)}),this.addScreen(new $u(26,11,[`#4b0d12`,`#150b1a`,`#ffcf4a`],`EL HOYO · TEMPORADA 4`),0,18,-44,[0,8,0]),this.addScreen(new $u(22,9,[`#0e2650`,`#150b1a`,`#6ee0ff`]),-42,14,-14,[0,8,0]);let g=[16734794,6993663,16766046,12946431];for(let e=0;e<8;e++){let t=e/8*Math.PI*2;this.addBeam(new ed(g[e%4],40,2.2,e,.6+e%3*.15,.22),Math.cos(t)*24,35.5,Math.sin(t)*24)}for(let[e,t,n,r]of[[16726586,-16,18,-14],[3832831,16,18,-14],[16761418,-16,18,16],[11754239,16,18,16]]){let i=new Za(e,2,34,.42,.8,0);i.position.set(t,n,r),i.target.position.set(0,1,0),this.group.add(i,i.target)}this.key.intensity=3.4,this.anim.push((e,t)=>this.orchestra.update(t,.5+.2*Math.sin(t*.3)))}},bd=class{group=new Wn;segs=[];armsL=[];armsR=[];constructor(e=1){let t=new J({color:1855440,roughness:.45,metalness:0,emissive:666250,emissiveIntensity:.55}),n=new J({color:16777215,roughness:.3,emissive:16777215,emissiveIntensity:.25}),r=new J({color:328965,roughness:.4}),i=new J({color:13214810,roughness:.6,emissive:4863248,emissiveIntensity:.4}),a=new G(new Yi(.62,.7,.5,18),new J({color:2434603,roughness:.6,metalness:.4}));a.position.y=.25,this.group.add(a);let o=.62,s=this.group;for(let e=0;e<7;e++){let a=new Wn;a.position.set(0,e===0?.5:o,0),s.add(a);let c=new G(new Yi(.44-e*.012,.46-e*.012,.64,20),t);if(c.position.y=o/2,c.castShadow=!0,a.add(c),this.segs.push(a),s=a,e===4){for(let e of[-1,1]){let t=new G(new q(.13,14,10),n);t.position.set(e*.17,o*.7,.36),t.scale.z=.5;let i=new G(new q(.06,10,8),r);i.position.set(e*.17,o*.68,.43),a.add(t,i)}let e=new G(new ta(.2,.028,8,20,Math.PI),n);e.position.set(0,o*.35,.4),e.rotation.z=Math.PI,a.add(e);for(let e of[-1,1]){let n=a,r=e===-1?this.armsL:this.armsR;for(let i=0;i<5;i++){let a=new Wn;a.position.set(i===0?e*.4:0,i===0?o*.75:.5,0),a.rotation.z=i===0?-e*.9:0,n.add(a);let s=new G(new Yi(.15,.16,.52,12),t);s.position.y=.26,s.castShadow=!0,a.add(s),r.push(a),n=a}}}if(e===6){let e=new G(new Yi(.26,.44,.34,20),i);e.position.y=.77,a.add(e);let t=new G(new Yi(.2,.26,.12,16),new J({color:9071152,roughness:.7}));t.position.y=.98,a.add(t)}}this.group.scale.setScalar(e)}update(e){let t=this.segs.length;this.segs.forEach((n,r)=>{n.rotation.z=Math.sin(e*3.1+r*.55)*.2*(.35+r/t),n.rotation.x=Math.sin(e*2.3+r*.4+1)*.12*(.35+r/t)}),this.armsL.forEach((t,n)=>{t.rotation.z=(n===0?-.9:0)+Math.sin(e*5.2+n*.8)*.45*(n===0?.8:1),t.rotation.x=Math.sin(e*4+n*.6)*.18}),this.armsR.forEach((t,n)=>{t.rotation.z=(n===0?.9:0)-Math.sin(e*5.2+n*.8+1.4)*.45*(n===0?.8:1),t.rotation.x=Math.sin(e*4+n*.6+2)*.18})}},xd=class extends td{id=`manchester`;displayName=`Manchester`;tubeman;fogDensity=.0055;columns=[];constructor(e){super(e,{canvas:2763312,border:10557994,accent:14267482,rope:[10557994,15921906,3829728],skirt:5902106,apronText:`LA CORREA FROM MANCHESTER`,ringText:`MANCHESTER`});let t=e.quality,n=t===`alta`?.5:t===`media`?.7:1.1,r=.5,i=new J({color:12160318,roughness:.35,metalness:.85,emissive:3810568,emissiveIntensity:.45}),a=new J({color:5901593,roughness:.9,side:2}),o=new J({color:1709592,roughness:.8,side:2}),s=new J({color:9140826,roughness:.7,emissive:1709064,emissiveIntensity:.4,side:2}),c=cd(sd(38,34,10,r),0,0,0,36,a);this.group.add(c);let l=new G(new ea(76,68),new J({color:1904658,roughness:.9}));l.rotation.x=Math.PI/2,l.position.y=36,this.group.add(l);for(let e=-3;e<=3;e++){let t=new G(new K(.6,.8,68),i);t.position.set(e*10,35.5,0),this.group.add(t)}let u=sd(13,11.5,3,r),d=[[-27,-10],[27,-10]],f={x:-9.5,z:-14.6},p=(e,t)=>d.some(([n,r])=>Math.hypot(e-n,t-r)<3.6)||Math.hypot(e-f.x,t-f.z)<1.5,m=ld(u,0,12,.95,.02,.11,n,(e,t)=>p(e,t)||Math.abs(e)<.9||Math.abs(t)<.9,r),h=sd(25.5,22.5,8,r),g=m;for(let e=0;e<4;e++){let t=5.4+e*5.7,c=e*1.6;this.group.add(cd(h,c,t-.45,c+5+.2,t-.45,o)),this.group.add(cd(h,c,t-.45,c,t+.95,s));let l=cd(h,c-.05,t+.95,c-.05,t+1.1,i);this.group.add(l),this.group.add(cd(h,c,t-2.6,c,t-.45,a)),this.group.add(cd(h,c-.02,t-.7,c-.02,t-.5,i)),g=g.concat(ld(h,c+.9,4,1,t-.3,.38,n,(e,t)=>p(e,t),r)),this.group.add(cd(h,c+5+.2,t-.45,c+5+.2,t+3.8,a))}for(let[e,t]of d){let n=new Wn,r=new G(new Yi(1.55,1.7,33,28),new J({color:12755290,roughness:.4,metalness:.7,emissive:2759686,emissiveIntensity:.5}));r.position.y=16.5,r.castShadow=!1,n.add(r);for(let e=0;e<14;e++){let t=e/14*Math.PI*2,r=new G(new K(.16,32,.12),i);r.position.set(Math.cos(t)*1.62,16.5,Math.sin(t)*1.62),r.rotation.y=-t,n.add(r)}let a=new G(new K(4.4,1.2,4.4),i);a.position.y=.6,n.add(a);let o=new G(new K(5,1.6,5),i);o.position.y=33.5,n.add(o);let s=new G(new Yi(2.4,1.7,1.6,20),i);s.position.y=32,n.add(s),n.position.set(e,0,t),this.group.add(n),this.columns.push(n)}this.crowd=new od(g,[1118484,1710626,2303534,1381916,3816e3,10557994,10557994,15198183,2772636,14267482,6988768,9048096],{near:e=>e.y<2.5&&Math.hypot(e.x,e.z)<20,seed:5,flashes:t===`baja`?150:t===`media`?450:1e3}),this.group.add(this.crowd.group),this.addScreen(new $u(30,13,[`#12306b`,`#3a0a18`,`#ffd45e`],`LA CORREA FROM MANCHESTER`),-36.5,17,-4,[0,8,0]),this.addScreen(new $u(26,11,[`#6b0f1c`,`#10204a`,`#6ee0ff`]),0,19,-33.3,[0,8,0]),this.addScreen(new $u(20,9,[`#2a1054`,`#0f2a4a`,`#ff9a6a`]),36.5,19,8,[0,8,0]);let _=[16766046,16734826,6993663,16777215];for(let e=0;e<10;e++)this.addBeam(new ed(_[e%4],40,2,e*1.3,.55+e%4*.12,.25),-27+e*6,34.8,(e%2?1:-1)*8);for(let[e,t,n,r]of[[16751162,-24,20,22],[16758858,24,20,22],[11546714,-22,16,-22],[4878288,22,16,-22]]){let i=new Za(e,2,42,.45,.8,0);i.position.set(t,n,r),i.target.position.set(0,1,0),this.group.add(i,i.target)}let v=new Oi(new q(.5,10,8),new ai({color:16769696,toneMapped:!1}),30),y=new gn;for(let e=0;e<30;e++)y.setPosition(-30+e%10*6.6,34.5,-14+Math.floor(e/10)*14),v.setMatrixAt(e,y);this.group.add(v),this.tubeman=new bd(1.35);let b=f.x,x=f.z;this.tubeman.group.position.set(b,.32,x),this.tubeman.group.rotation.y=Math.atan2(-b,-x),this.group.add(this.tubeman.group);let S=new $a(6986495,8,14,1.6);S.position.set(b,5,x+2.5),this.group.add(S),this.anim.push((e,t)=>this.tubeman.update(t)),this.key.intensity=3.4,this.fogColor=460041}};function Sd(e,t){return e===`manchester`?new xd({quality:t}):new yd({quality:t})}var Cd=class{stage;arena;models=[null,null];t=0;cur=[{...xu},{...xu}];angle=.35;mode=`orbit`;tgt=new V(0,1.4,0);look=new V(0,1.4,0);constructor(e,t,n){this.stage=e,this.arena=Sd(t,n===`alta`?`media`:n),e.scene.add(this.arena.group),e.scene.background=new W(this.arena.fogColor),e.scene.fog=new Qn(this.arena.fogColor,this.arena.fogDensity),e.renderer.toneMappingExposure=this.arena.exposure}setFighter(e,t){let n=this.models[e];if(n&&(this.stage.scene.remove(n.root),n.dispose(),this.models[e]=null),!t)return;let r=new zu(t.appearance);r.root.position.set(e===0?-1.5:1.5,1,0),r.root.rotation.y=e===0?Math.PI/2:-Math.PI/2,this.stage.scene.add(r.root),this.models[e]=r}update(e){this.t+=e,this.angle+=e*.08,this.models[0],this.models[1];let t=this.stage.camera.aspect<1,n=this.mode===`close`,r=(n?t?9:6.4:t?15:11.5)+Math.sin(this.t*.2)*(n?.4:1.2),i=(n?1.4:3.6)+Math.sin(this.t*.15)*.4,a=n?Math.sin(this.t*.12)*.5:this.angle,o=Math.sin(a)*r,s=Math.cos(a)*r;this.mode===`close`?this.tgt.set(0,2.1,0):this.tgt.set(0,1.4,0),this.look.lerp(this.tgt,1-Math.exp(-3*e)),this.stage.camera.position.lerp(new V(o,1+i,s),1-Math.exp(-2*e)),this.stage.camera.lookAt(this.look),this.models.forEach((t,n)=>{if(!t)return;let r=Math.sin(this.t*1.6+n*2),i=Su({torso:[.1+r*.02,0,0],head:[-.05,Math.sin(this.t*.6+n)*.25,0],lU:[-.55,0,.3],lF:[-1.5+r*.05,0,0],rU:[-.5,0,-.3],rF:[-1.6+r*.05,0,0]});Ou(this.cur[n],i,1-Math.exp(-8*e),this.cur[n]),t.applyPose(this.cur[n],this.t)}),this.arena.update(e,this.t,.5,this.stage.viewportH)}dispose(){this.models.forEach(e=>{e&&(this.stage.scene.remove(e.root),e.dispose())}),this.stage.scene.remove(this.arena.group),this.arena.dispose(),this.stage.scene.fog=null}},wd=class{handler;prev=[];repeat={};warm=0;constructor(e){this.handler=e}update(e,t){let n=navigator.getGamepads?navigator.getGamepads():[],r=n&&Array.from(n).find(e=>e&&e.connected);if(!r){this.prev=[];return}let i=e=>!!r.buttons[e]?.pressed,a=r.buttons.map(e=>e.pressed);if(this.warm>0){this.warm-=e,this.prev=a;return}if(!t){this.prev=a;return}let o=(e,t)=>{i(e)&&!this.prev[e]&&this.handler(t)};o(0,`confirm`),o(1,`back`),o(9,`start`),o(2,`x`),o(3,`y`);let s=r.axes[0]??0,c=r.axes[1]??0,l=[[`up`,i(12)||c<-.6],[`down`,i(13)||c>.6],[`left`,i(14)||s<-.6],[`right`,i(15)||s>.6]];for(let[t,n]of l){if(!n){delete this.repeat[t];continue}let r=this.repeat[t];r===void 0?(this.handler(t),this.repeat[t]=.38):(this.repeat[t]=r-e,this.repeat[t]<=0&&(this.handler(t),this.repeat[t]=.13))}this.prev=a}settle(){this.warm=.15}},Td={facil:{react:.55,aggr:.42,blockProb:.14,parryProb:0,reverseProb:.04,whiffProb:.32,mash:2.6,pinHp:.2,pinProb:.5,showy:.2,finisherMode:`late`,grabW:.8,heavyW:.7,lightW:1.6,subProb:.08},intermedia:{react:.28,aggr:.68,blockProb:.42,parryProb:.22,reverseProb:.2,whiffProb:.1,mash:4.4,pinHp:.36,pinProb:.85,showy:.3,finisherMode:`dramatic`,grabW:1,heavyW:.9,lightW:1.4,subProb:.16},dificil:{react:.12,aggr:.9,blockProb:.68,parryProb:.5,reverseProb:.45,whiffProb:0,mash:6.4,pinHp:.5,pinProb:1,showy:.08,finisherMode:`asap`,grabW:1.1,heavyW:1,lightW:1.3,subProb:.26}},Ed=class{me;rng;p;cool=0;intent=`approach`;intentT=0;circleDir=1;plan=[];mashAcc=0;blockUntil=0;parryWait=!1;seenAttack=-1;clock=0;clinchWait=-1;wantTaunt=!1;whiffing=!1;constructor(e,t,n=Math.random){this.me=e,this.rng=n,this.p=Td[t],this.circleDir=n()<.5?1:-1}update(e,t){let n=Ql(),r=t.f[this.me],i=t.f[1-this.me];this.clock+=e,this.cool-=e,this.intentT-=e;let a=i.x-r.x,o=i.z-r.z,s=Math.hypot(a,o)||.001,c=a/s,l=o/s;switch(r.state){case`down`:case`pinD`:case`subD`:case`getup`:return this.mashTick(e,n,r.state),n;case`clinch`:return this.doClinch(r,n,e),n;case`clinched`:return n;case`attack`:case`hitstun`:case`throwing`:case`thrown`:case`stunned`:case`ko`:case`win`:case`pinA`:return this.clinchWait=-1,n;case`subA`:return this.rng()<6*e&&(n.light=!0),n}if(i.state===`attack`&&i.move&&i.t<i.s+.04&&i.move.kind!==`taunt`&&i.move){if(s<i.move.range+.5&&this.seenAttack<0){this.seenAttack=1;let e=i.move.kind===`grab`;e&&this.rng()<this.p.reverseProb?(this.parryWait=!1,this.plan=[`grab`],this.reverseAt=this.clock+Math.max(0,i.s-i.t-.18)):!e&&this.rng()<this.p.blockProb?(this.parryWait=this.rng()<this.p.parryProb,this.blockStart=this.clock+(this.parryWait?Math.max(0,i.s-i.t-.13):0),this.blockUntil=this.clock+(i.s-i.t)+.5):!e&&r.st>10&&this.rng()<.35*this.p.aggr&&(this.dodgeUntil=this.clock+.35,this.dodgeDir=this.rng()<.5?1:-1)}}else this.seenAttack=-1;if(this.reverseAt>0&&this.clock>=this.reverseAt&&(n.grab=!0,this.reverseAt=-1),this.blockUntil>this.clock&&this.clock>=this.blockStart&&(n.block=!0),this.dodgeUntil>this.clock)return n.mx=-l*this.dodgeDir,n.mz=c*this.dodgeDir,n.run=r.st>8,n;if(n.block)return n.mx=0,n.mz=0,n;if(!r.banned&&r.state===`idle`&&r.outT>2.5+this.p.react*2&&this.intent!==`return`&&(this.intent=`return`,this.intentT=.8,this.plan=[]),(this.cool<=0||this.intentT<=0)&&this.decide(r,i,s),this.finisherNow&&(this.finisherNow=!1,r.mom>=100&&r.state===`idle`))return n.finisher=!0,n;let u=e=>{n.mx=c*e,n.mz=l*e},d=.25;switch(this.intent){case`approach`:u(1),n.run=s>3&&r.st>35,s<this.reachDist(r)&&(this.intent=`attack`,this.intentT=.2);break;case`attack`:{let e=this.reachDist(r);if(s>e+d&&u(.8),(s<=e+d||this.whiffing&&s<e+1.1)&&(r.state===`idle`||r.state===`block`)){let e=this.plan.shift();e?n[e]=!0:(this.intent=this.rng()<.55?`circle`:`retreat`,this.intentT=.35+this.rng()*.4,this.cool=0)}break}case`circle`:n.mx=-l*this.circleDir+c*(s>2?.6:-.15),n.mz=c*this.circleDir+l*(s>2?.6:-.15);break;case`return`:{let e=Math.hypot(r.x,r.z)||1;n.mx=-r.x/e,n.mz=-r.z/e,n.run=!1,r.inRing&&(this.intent=`approach`,this.intentT=.3);break}case`retreat`:n.mx=-c,n.mz=-l,n.run=r.st>20&&s<2;break;case`pin`:if(i.state!==`down`){this.intent=`approach`;break}s>1.5?u(1):(n.grab=!0,this.intent=`idle`,this.intentT=.5)}return r.inRing&&(Math.abs(r.x)>3.4||Math.abs(r.z)>3.4)&&this.intent!==`attack`&&(n.mx+=-r.x*.15,n.mz+=-r.z*.15),this.wantTaunt&&r.state===`idle`&&s>2.2&&(n.taunt=!0,this.wantTaunt=!1),n}reverseAt=-1;blockStart=0;dodgeUntil=0;dodgeDir=1;reachDist(e){let t=this.plan[0]===`heavy`?e.heavy:this.plan[0]===`grab`?e.grabMove:e.light[0];return Math.max(.9,t.range*.82)}decide(e,t,n){let r=this.p,i=this.rng;if(this.cool=r.react*(.7+i()*.6),this.plan=[],this.whiffing=!1,this.wantTaunt=!1,t.state===`down`&&!t.koed){if(t.hpPct<r.pinHp&&i()<r.pinProb){this.intent=`pin`,this.intentT=2;return}i()<r.showy&&(this.wantTaunt=!0),this.intent=`approach`,this.intentT=.8}else if(t.state===`down`||t.koed)this.intent=`idle`,this.intentT=1;else{if(e.mom>=100&&e.state===`idle`){let i=r.finisherMode,a=t.hpPct<.5||e.hpPct<.3||t.state===`stunned`,o=i===`asap`?!0:i===`dramatic`?a:t.hpPct<.35||t.state===`stunned`,s=e.finisher.rush?4.6:e.finisher.range*.9;if(o&&n<s&&(!e.finisher.rush||n>2.2))this.plan=[],this.finisherNow=!0;else if(o){this.intent=`approach`,this.intentT=.5;return}}if(e.st<18&&n<3)this.intent=`retreat`,this.intentT=.9;else if(!e.banned&&(Math.abs(e.x)>4.1||Math.abs(e.z)>4.1)&&e.outT>1.2)this.intent=`return`,this.intentT=1.2;else if(i()<r.aggr){this.intent=n>1.6?`approach`:`attack`,this.intentT=1.4;let t=[r.lightW,r.heavyW,r.grabW],a=(()=>{let e=t[0]+t[1]+t[2],n=i()*e;return(n-=t[0])<0?`light`:(n-=t[1])<0?`heavy`:`grab`})();if(a===`light`){let e=1+Math.floor(i()*3);for(let t=0;t<e;t++)this.plan.push(`light`)}else this.plan.push(a);i()<r.whiffProb&&(this.whiffing=!0),e.mom<90&&i()<r.showy*.5&&(this.wantTaunt=!0)}else this.intent=i()<.5?`circle`:`retreat`,this.circleDir=i()<.5?1:-1,this.intentT=.4+i()*.5}}finisherNow=!1;doClinch(e,t,n){if(this.clinchWait<0&&(this.clinchWait=this.p.react*(.6+this.rng()*.8)),this.clinchWait-=n,this.clinchWait>0&&e.t<.5)return;let r=this.rng()<this.p.subProb;this.clinchWait=-1,r?t.grab=!0:this.rng()<.55?t.heavy=!0:t.light=!0}mashTick(e,t,n){for(this.mashAcc+=e*this.p.mash*(.75+this.rng()*.5);this.mashAcc>=1;){--this.mashAcc;let e=this.rng();e<.4?t.light=!0:e<.8?t.heavy=!0:t.grab=!0}}},Dd=class{group=new Wn;pools=[];constructor(){this.pools.push(this.makePool(500,!0),this.makePool(300,!1))}makePool(e,t){let n=new qr;n.setAttribute(`position`,new Mr(new Float32Array(e*3),3)),n.setAttribute(`color`,new Mr(new Float32Array(e*4),4)),n.setAttribute(`size`,new Mr(new Float32Array(e),1));let r=new Bi(n,new ua({transparent:!0,depthWrite:!1,blending:t?2:1,uniforms:{uScale:{value:600}},vertexShader:`attribute float size; attribute vec4 color; uniform float uScale; varying vec4 vC;
        void main(){ vC = color; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = size * uScale / -mv.z; gl_Position = projectionMatrix * mv; }`,fragmentShader:`varying vec4 vC; void main(){ vec2 c = gl_PointCoord - 0.5; float d = 1.0 - smoothstep(0.1, 0.5, length(c)); gl_FragColor = vec4(vC.rgb, vC.a * d); }`}));return r.frustumCulled=!1,this.group.add(r),{pts:r,list:[],max:e,geo:n}}setScale(e){for(let t of this.pools)t.pts.material.uniforms.uScale.value=e*.6}add(e,t){let n=this.pools[e];n.list.length<n.max&&n.list.push(t)}sparks(e,t,n,r,i=16765562,a=4,o=.06){let s=new W(i);for(let i=0;i<r;i++){let r=Math.random()*Math.PI*2,i=Math.random()*1.4-.2,c=a*(.4+Math.random());this.add(0,{x:e,y:t,z:n,vx:Math.cos(r)*Math.cos(i)*c,vy:Math.sin(i)*c+1,vz:Math.sin(r)*Math.cos(i)*c,life:0,max:.25+Math.random()*.35,size:o*(.6+Math.random()),r:s.r*2,g:s.g*2,b:s.b*2,grav:9,drag:1.5})}}dust(e,t,n,r,i=1.2){for(let a=0;a<r;a++){let r=Math.random()*Math.PI*2,a=i*(.3+Math.random());this.add(1,{x:e+Math.cos(r)*.2,y:t+.05,z:n+Math.sin(r)*.2,vx:Math.cos(r)*a,vy:.3+Math.random()*.8,vz:Math.sin(r)*a,life:0,max:.6+Math.random()*.6,size:.35+Math.random()*.35,r:.6,g:.58,b:.55,grav:-.2,drag:2})}}burst(e,t,n,r,i=80,a=9){this.sparks(e,t,n,i,r,a,.1)}update(e){this.pools.forEach((t,n)=>{let r=t.geo.getAttribute(`position`),i=t.geo.getAttribute(`color`),a=t.geo.getAttribute(`size`),o=0;for(let s=0;s<t.list.length;s++){let c=t.list[s];if(c.life+=e,c.life>=c.max)continue;c.vy-=c.grav*e;let l=Math.exp(-c.drag*e);c.vx*=l,c.vz*=l,n===1&&(c.vy*=l),c.x+=c.vx*e,c.y+=c.vy*e,c.z+=c.vz*e;let u=1-c.life/c.max;r.setXYZ(o,c.x,c.y,c.z),i.setXYZW(o,c.r,c.g,c.b,n===0?u:u*.35),a.setX(o,c.size*(n===0?u:1.5-u*.5)),t.list[o]=c,o++}t.list.length=o;for(let e=o;e<t.max;e++)a.setX(e,0);r.needsUpdate=!0,i.needsUpdate=!0,a.needsUpdate=!0,t.geo.setDrawRange(0,Math.max(o,1))})}},Od=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-n*r)),kd=(e,t)=>{let n=e-t;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return n},Ad=class{yaw=0;pos=new V(0,6,10);look=new V(0,1.5,0);dist=9;fov=40;shake=0;shot=null;orbit=0;shakeScale=1;auto=!1;as={kind:`wide`,t:0,dur:4,seed:.3};cutPending=!1;lastKinds=[];forced=0;cut(){this.nextShot(!0)}nextShot(e=!1){let t=[`wide`,`lowside`,`shoulder`,`crane`,`tight`,`post`,`lowside`,`shoulder`,`tight`],n=t[Math.floor(Math.random()*t.length)];for(let e=0;e<4&&this.lastKinds.slice(-2).includes(n);e++)n=t[Math.floor(Math.random()*t.length)];this.lastKinds.push(n),this.as={kind:n,t:0,dur:3.4+Math.random()*3.2,seed:Math.random()},this.cutPending=e||Math.random()<.7,this.forced=0}force(e,t){this.forced>0&&this.as.kind===e?this.as.dur=Math.max(this.as.dur,this.as.t+t):(this.as={kind:e,t:0,dur:t,seed:Math.random()},this.cutPending=!0,this.forced=t)}onEvent(e){this.auto&&!this.shot&&(e===`heavy`?this.force(`tight`,1.7):e===`knockdown`?this.force(`lowside`,2.4):e===`taunt`&&this.force(`tight`,1.8))}get forward(){return{x:-Math.sin(this.yaw),z:-Math.cos(this.yaw)}}get right(){return{x:Math.cos(this.yaw),z:-Math.sin(this.yaw)}}setShot(e){this.shot=e,e?.kind===`orbit`&&(this.orbit=this.yaw)}update(e,t,n,r,i){let a=(n.x+r.x)/2,o=(n.z+r.z)/2,s=Math.max(n.y,r.y)+1.15,c=r.x-n.x,l=r.z-n.z,u=Math.hypot(c,l);if(u>1.2&&!(this.shot&&this.shot.kind!==`close`)){let t=-l/u,n=c/u,r=Math.sin(this.yaw),i=Math.cos(this.yaw),a=t,o=n,s=t*r+n*i+.18*n;-t*r-n*i-.18*n>s&&(a=-t,o=-n);let d=kd(Math.atan2(a,o),this.yaw);this.yaw+=Math.max(-1.1*e,Math.min(1.1*e,d*2.2*e))}let d=Math.max(5.4,Math.min(11.5,4.4+u*.9)),f=i?58:40,p=1.8+u*.2,m=a,h=s,g=o,_=a+Math.sin(this.yaw)*d,v=o+Math.cos(this.yaw)*d,y=s+p,b=4.5,x=this.shot;if(x){`t`in x&&(x.t+=e);let t=`who`in x?x.who===0?n:r:n,i=t===n?r:n;if(x.kind===`finisher`){let e=t.x,n=t.z,r=-(i.z-n),a=i.x-e,o=Math.hypot(r,a)||1,s=r/o*Math.sign(Math.sin(this.yaw)*r+Math.cos(this.yaw)*a||1),c=a/o*Math.sign(Math.sin(this.yaw)*r+Math.cos(this.yaw)*a||1),l=Math.min(1,x.t/x.dur),u=4.2-1.6*l;_=(e+i.x)/2+s*u,v=(n+i.z)/2+c*u,y=t.y+1+.4*l,m=(e+i.x)/2,g=(n+i.z)/2,h=t.y+1.25,f=30,b=5,this.yaw=Math.atan2(_-m,v-g)}else if(x.kind===`close`){let e=t;_=e.x+Math.sin(this.yaw)*4.6,v=e.z+Math.cos(this.yaw)*4.6,y=e.y+2.2,m=e.x,h=e.y+.5,g=e.z,f=34,b=2.5}else if(x.kind===`orbit`){this.orbit+=e*.35;let n=t;_=n.x+Math.sin(this.orbit)*5.2,v=n.z+Math.cos(this.orbit)*5.2,y=n.y+1.6,m=n.x,h=n.y+1.2,g=n.z,f=36,b=3,this.yaw=this.orbit}else if(x.kind===`intro`){let e=Math.min(1,x.t/x.dur),t=e*e*(3-2*e),n=this.yaw+(1-t)*1.1,r=d+(1-t)*9;_=Math.sin(n)*r,v=Math.cos(n)*r,y=4+(1-t)*9,m=0,h=1.6,g=0,b=8,e>=1&&(this.shot=null)}`dur`in x&&x.t>=x.dur&&x.kind!==`intro`&&(this.shot=null)}if(this.auto&&!this.shot){this.as.t+=e,this.as.t>=this.as.dur&&this.nextShot();let t=this.as.kind,s=this.as.t,d=this.as.seed,p=u>.01?c/u:1,x=u>.01?l/u:0,S=-x,C=p,w=d<.5?1:-1,T=Math.max(n.y,r.y);if(b=3.2,t===`lowside`){let e=4.4+u*.65;_=a+S*w*e+p*Math.sin(s*.6)*1.2,v=o+C*w*e+x*Math.sin(s*.6)*1.2,y=T+.75,m=a,h=T+1.2,g=o,f=i?62:46}else if(t===`shoulder`){let e=d<.5?n:r,t=e===n?r:n,a=t.x-e.x,o=t.z-e.z,s=Math.hypot(a,o)||1;_=e.x-a/s*2.3+-o/s*.7,v=e.z-o/s*2.3+a/s*.7,y=e.y+1.9,m=t.x,h=t.y+1.3,g=t.z,f=i?60:42}else if(t===`crane`){let e=d*6.28+s*.28,t=7.2+u*.4;_=a+Math.sin(e)*t,v=o+Math.cos(e)*t,y=T+6.8-Math.min(2,s*.3),m=a,h=T+1,g=o,f=i?60:40}else if(t===`tight`){let e=3+u*.55;_=a+S*w*e,v=o+C*w*e,y=T+1.7,m=a,h=T+1.35,g=o,f=i?56:34}else if(t===`post`){let e=a>0?-1:1,t=o>0?-1:1;_=e*5.6,v=t*5.6,y=3.3,m=a,h=T+1.1,g=o,f=i?66:48}else b=4.5;this.cutPending&&(this.cutPending=!1,this.pos.set(_,y,v),this.look.set(m,h,g),this.fov=f)}this.pos.x=Od(this.pos.x,_,b,e),this.pos.y=Od(this.pos.y,y,b,e),this.pos.z=Od(this.pos.z,v,b,e),this.look.x=Od(this.look.x,m,b*1.4,e),this.look.y=Od(this.look.y,h,b*1.4,e),this.look.z=Od(this.look.z,g,b*1.4,e),this.fov=Od(this.fov,f,4,e),this.shake=Math.max(0,this.shake-e*2.4);let S=this.shake*this.shake*.22*this.shakeScale;t.position.set(this.pos.x+(Math.random()-.5)*S,this.pos.y+(Math.random()-.5)*S,this.pos.z+(Math.random()-.5)*S),t.lookAt(this.look),Math.abs(t.fov-this.fov)>.05&&(t.fov=this.fov,t.updateProjectionMatrix())}snap(e){this.pos.set(Math.sin(this.yaw)*10,5,Math.cos(this.yaw)*10),this.look.set(0,1.5,0),e.position.copy(this.pos),e.lookAt(this.look)}},jd={skin:14208432,hair:null,outfit:`desnudo`,outfitColor:14208432,trunksColor:13221274,accent:9075285,wraps:13616032,build:1.05,height:1},Md=class{fx;fighters;camPos;group=new Wn;items=[];constructor(e,t,n){this.fx=e,this.fighters=t,this.camPos=n}farSide(e,t){let n=e.x-t.x,r=e.z-t.z,i=Math.hypot(n,r)||1,a=-r/i,o=n/i,s=this.camPos();return a*(s.x-e.x)+o*(s.z-e.z)>0&&(a=-a,o=-o),{sx:a,sz:o}}spawn(e,t,n,r){e===`momia`?this.mummy(t,n,r):this.tank(t,n,r)}mummy(e,t,n){let[r,i]=this.fighters(),a=t===0?r:i,o=e===0?r:i,s=new zu(jd),c=new G(new K(.05,.4,.01),new J({color:15261636,roughness:.9}));c.position.set(.2,1,-.15),s.root.add(c);let{sx:l,sz:u}=this.farSide(a,o),d={x:a.x+l*3.2,z:a.z+u*3.2};s.root.position.set(d.x,a.y,d.z),s.root.scale.setScalar(.01),this.group.add(s.root),this.fx.dust(d.x,a.y,d.z,22,2.2),this.fx.sparks(d.x,a.y+1,d.z,18,14208432,3),Q.sfx(`summon`);let f=0,p={...xu},m=Su({lU:[-1.5,0,.12],rU:[-1.5,0,-.12],lF:[-.15,0,0],rF:[-.15,0,0],torso:[.12,0,0]}),h=wu.haymaker.hit;this.items.push({obj:s.root,update:e=>{f+=e;let t=Math.min(1,f/Math.max(.2,n)),r=t*t*(3-2*t),i=Math.min(1,f/.2);s.root.scale.setScalar(Math.max(.01,i));let o={x:a.x,z:a.z},c=o.x-l*1.1,g=o.z-u*1.1,_=d.x+(c-d.x)*r,v=d.z+(g-d.z)*r;s.root.position.set(_,a.y,v),s.root.rotation.y=Math.atan2(o.x-_,o.z-v);let y=Math.sin(f*7),b=Su(f<n?{...m,lT:[-.4+y*.5,0,.08],rT:[-.4-y*.5,0,-.08],lS:[.5,0,0],rS:[.5,0,0]}:h);return Ou(p,b,1-Math.exp(-(f<n?10:30)*e),p),s.applyPose(p,f),f>n+.8?(this.fx.dust(_,a.y,v,16,1.6),this.fx.sparks(_,a.y+1,v,12,14208432,3),!1):!0},dispose:()=>s.dispose()})}tank(e,t,n){let[r,i]=this.fighters(),a=t===0?r:i,o=e===0?r:i,s=new Wn,c=new J({color:5858106,roughness:.6,metalness:.35}),l=new J({color:1842458,roughness:.8,metalness:.4}),u=(e,t,n,r,i)=>{let a=new G(e,t);return a.position.set(n,r,i),a.castShadow=!0,s.add(a),a};u(new K(1.8,.7,3.5),c,0,.75,0),u(new K(1.5,.35,1.2),c,0,.62,2.1).rotation.x=-.35;for(let e of[-1,1]){u(new K(.5,.65,3.9),l,e*1.05,.38,0);for(let t=0;t<6;t++){let n=u(new Yi(.28,.28,.52,14),c,e*1.05,.3,-1.6+t*.64);n.rotation.z=Math.PI/2}}u(new Yi(.75,.9,.55,20),c,0,1.3,-.1);let d=new Wn;d.position.set(0,1.35,.5),s.add(d);let f=new G(new Yi(.1,.12,2.6,12),l);f.rotation.x=Math.PI/2,f.position.z=1.3,f.castShadow=!0,d.add(f),u(new Yi(.28,.28,.12,12),l,-.2,1.62,-.3);let{sx:p,sz:m}=this.farSide(a,o),h={x:a.x+p*10,z:a.z+m*10},g={x:a.x+p*3.4,z:a.z+m*3.4};s.position.set(h.x,a.y,h.z),s.scale.setScalar(.85),this.group.add(s),Q.sfx(`engine`);let _=new $a(16756832,0,10,1.4);_.position.set(0,1.4,3),s.add(_);let v=0,y=!1;this.items.push({obj:s,update:e=>{v+=e;let t=Math.min(1,v/Math.max(.3,n)),r=1-(1-t)*(1-t),i=h.x+(g.x-h.x)*r,o=h.z+(g.z-h.z)*r;if(v>n+.9){let e=Math.min(1,(v-n-.9)/.9);i=g.x+(h.x-g.x)*e*e,o=g.z+(h.z-g.z)*e*e}if(s.position.set(i,a.y+Math.sin(v*30)*.01,o),s.rotation.y=Math.atan2(a.x-i,a.z-o),!y&&v>=n){y=!0;let e=i+Math.sin(s.rotation.y)*2.5,t=o+Math.cos(s.rotation.y)*2.5;this.fx.burst(e,a.y+1.6,t,16756832,70,9),this.fx.dust(e,a.y,t,24,2.5),_.intensity=40,Q.sfx(`cannon`)}return y&&(_.intensity*=.82,d.position.z=.5-Math.max(0,.5-(v-n)*2)*.5),v<n+1.9},dispose:()=>{s.traverse(e=>{let t=e;t.geometry?.dispose?.(),t.material?.dispose?.()})}})}update(e){this.items=this.items.filter(t=>{let n=t.update(e);return n||(this.group.remove(t.obj),t.dispose()),n})}dispose(){for(let e of this.items)this.group.remove(e.obj),e.dispose();this.items=[]}},Nd={skin:13213820,hair:1380622,outfit:`arbitro`,outfitColor:855312,trunksColor:855312,accent:16777215,build:1,height:1},Pd=class{stage;arena;match;hooks;models;anims=[new Au,new Au];refModel;refAnim=new Au;fx=new Dd;cam=new Ad;summons;timeScale=1;hitstop=0;excite=.35;time=0;slowT=0;slowV=1;markers=[];glowColor=[16777215,16777215];playerIdx=0;constructor(e,t,n,r){this.stage=e,this.arena=t,this.match=n,this.hooks=r;let i=e.scene;i.background=new W(t.fogColor),i.fog=new Qn(t.fogColor,t.fogDensity),i.add(t.group,this.fx.group),this.summons=new Md(this.fx,()=>[n.f[0],n.f[1]],()=>e.camera.position),i.add(this.summons.group),this.models=n.f.map(e=>new zu(e.data.appearance)),this.refModel=new zu(Nd);for(let e of[...this.models,this.refModel])i.add(e.root);[4892927,16734794].forEach((e,t)=>{let n=new G(new Xi(.13,.26,4),new ai({color:e,toneMapped:!1}));n.rotation.x=Math.PI,i.add(n),this.markers.push(n)}),this.cam.shakeScale=1,this.cam.snap(e.camera),this.cam.setShot({kind:`intro`,t:0,dur:2.6}),e.renderer.toneMappingExposure=t.exposure}dispose(){let e=this.stage.scene;e.remove(this.arena.group,this.fx.group,this.summons.group),this.summons.dispose();for(let t of[...this.models,this.refModel])e.remove(t.root),t.dispose();for(let t of this.markers)e.remove(t),t.geometry.dispose();this.arena.dispose(),e.fog=null}slow(e,t){this.slowV=e,this.slowT=t}step(e){return this.time+=e,this.slowT>0?(this.slowT-=e,this.timeScale=this.slowV):this.timeScale+=(1-this.timeScale)*Math.min(1,e*6),this.hitstop>0?(this.hitstop-=e,0):e*this.timeScale}sync(e){let t=this.match,n=this.time;this.excite+=(.3-this.excite)*Math.min(1,e*.4),Q.setCrowd(.2+this.excite*.6),Q.tickCrowd(e);for(let r=0;r<2;r++){let i=t.f[r],a=this.models[r];a.root.position.set(i.x,i.y,i.z),a.root.rotation.y=i.yaw;let o=this.anims[r].update(i,e,n);a.applyPose(o,n);let s=i.move;if(i.state===`attack`&&s?.prop){a.setProp(s.prop);let e=Math.min(1,i.t/Math.max(.08,i.s*.35));a.propObject(s.prop)?.scale.setScalar(s.prop===`maletin`||s.prop===`microfono`?1:.15+.85*e)}else a.setProp(null);let c=0;i.state===`attack`&&s?.kind===`finisher`&&i.t<i.s+i.a+.3?c=Math.min(1,i.t/i.s)*(.7+.3*Math.sin(n*30)):i.mom>=100&&i.state!==`win`&&(c=.18+.1*Math.sin(n*6)),a.setGlow(this.glowColor[r],c);let l=this.markers[r];l.visible=i.state!==`win`&&!i.lying,l.position.set(i.x,i.y+2.35*a.ap.height+Math.sin(n*4)*.05,i.z),l.rotation.y=n*2}{let e=this.stage.camera.position,n=(t.f[0].x+t.f[1].x)/2,r=(t.f[0].z+t.f[1].z)/2,i=Math.hypot(n-e.x,r-e.z)||1;t.refAway.x=(n-e.x)/i,t.refAway.z=(r-e.z)/i}let r=t.ref;this.refModel.root.position.set(r.x,1,r.z),this.refModel.root.rotation.y=r.yaw,this.refModel.applyPose(this.refAnim.updateRef(e,n,0,r.count,r.mode),n);let i=window.innerWidth/window.innerHeight<1;this.cam.update(e,this.stage.camera,t.f[0],t.f[1],i),this.summons.update(e),this.arena.update(e,n,this.excite,this.stage.viewportH),this.fx.setScale(this.stage.viewportH),this.fx.update(e),this.arena instanceof xd||this.arena instanceof yd}handle(e){let t=this.match;for(let n of e)switch(n.type){case`hit`:{this.fx.sparks(n.x,n.y,n.z,n.heavy?22:12,n.heavy?16757575:16773312,n.heavy?6:4),Q.sfx(n.heavy?`heavy`:`hit`),n.heavy&&this.cam.onEvent(`heavy`),this.hooks.rumble?.(n.heavy?.9:.4,n.heavy?.6:.3,n.heavy?180:90);let e=t.f[n.attacker].move?.id;e===`microfonazo`&&Q.sfx(`feedback`),e===`maletinazo`&&this.fx.sparks(n.x,n.y,n.z,26,6084218,5,.09),this.cam.shake=Math.max(this.cam.shake,n.heavy?.75:.35),this.hitstop=Math.max(this.hitstop,n.heavy?.085:.045),this.excite=Math.min(1,this.excite+(n.heavy?.14:.06)),n.heavy&&Q.cheer(.5);break}case`block`:this.fx.sparks(n.x,n.y,n.z,n.perfect?30:8,n.perfect?8048895:12374783,5),Q.sfx(n.perfect?`parry`:`block`),this.cam.shake=Math.max(this.cam.shake,n.perfect?.5:.2),n.perfect&&(this.hitstop=Math.max(this.hitstop,.12),this.hooks.flash(`#7ad0ff`,.35),this.excite=Math.min(1,this.excite+.12),Q.cheer(.6));break;case`whoosh`:Q.sfx(`whoosh`,.7);break;case`knockdown`:{this.cam.onEvent(`knockdown`);let e=t.f[n.target];this.fx.dust(e.x,e.y,e.z,14),Q.sfx(`knock`),this.cam.shake=Math.max(this.cam.shake,.5),this.excite=Math.min(1,this.excite+.1),Q.cheer(.8);break}case`land`:{let e=t.f[n.target];this.fx.dust(e.x,e.y,e.z,n.big?26:14,n.big?2.2:1.4),Q.sfx(n.big?`slam`:`knock`),this.cam.shake=Math.max(this.cam.shake,n.big?.9:.55),this.hitstop=Math.max(this.hitstop,.07),Q.cheer(1),this.excite=Math.min(1,this.excite+.18);break}case`finisherStart`:{let e=n.move.startup+n.move.active+.35;this.glowColor[n.fighter]=n.move.vfx?.color??16777215,this.cam.setShot({kind:`finisher`,who:n.fighter,t:0,dur:e}),this.slow(.55,n.move.startup*.9),Q.sfx(`finisher`),this.hooks.banner(n.move.vfx?.callout??n.move.name.toUpperCase(),`#`+(n.move.vfx?.color??16777215).toString(16).padStart(6,`0`)),this.excite=1,Q.cheer(1);break}case`finisherHit`:{let e=t.f[n.target],r=n.move.vfx?.color??16777215;this.fx.burst(e.x,e.y+1.3,e.z,r,110,11),this.fx.dust(e.x,e.y,e.z,24,2.4),Q.sfx(`finisherHit`),this.cam.shake=1,this.hooks.rumble?.(1,1,450),this.hitstop=.22,this.slow(.22,.55),this.hooks.flash(`#`+r.toString(16).padStart(6,`0`),.8),this.excite=1,Q.cheer(1.5);break}case`finisherMiss`:this.hooks.message(`¡Falló el finisher!`);break;case`grab`:Q.sfx(`grab`);break;case`reversal`:Q.sfx(`parry`),this.hitstop=.1,this.hooks.flash(`#ffffff`,.3);break;case`grappleMove`:this.hooks.message(n.name,!0),Q.cheer(.6);break;case`pinStart`:this.cam.setShot({kind:`close`,who:n.target,t:0,dur:3.4}),this.hooks.message(`¡PIN!`,!0),Q.cheer(.6);break;case`pinCount`:Q.sfx(`count`),Q.say([``,`uno`,`dos`,`tres`][n.n]),this.cam.shake=Math.max(this.cam.shake,.3);break;case`kickout`:this.hooks.message(`¡Se zafa!`,!0),Q.cheer(1.2),this.cam.setShot(null),this.excite=Math.min(1,this.excite+.2);break;case`subStart`:this.cam.setShot({kind:`close`,who:n.target,t:0,dur:4}),Q.sfx(`grab`);break;case`subBreak`:this.hooks.message(`¡Rompe la llave!`,!0),Q.cheer(1),this.cam.setShot(null);break;case`tap`:Q.sfx(`tap`),this.hooks.message(`¡SE RINDE!`,!0);break;case`koCount`:n.n>0&&Q.sfx(`count`);break;case`outCount`:n.n>=4&&Q.sfx(`count`);break;case`foul`:Q.sfx(`foul`),this.hooks.message(n.seen?`¡FALTA! El árbitro lo ha visto`:`¡Falta! … el árbitro no miraba`,n.seen);break;case`summon`:this.summons.spawn(n.kind,n.fighter,n.target,n.dur);break;case`toreo`:Q.sfx(`olé`),Q.cheer(1.5),this.hooks.flash(`#ffd45e`,.25),this.excite=1;break;case`taunt`:this.cam.onEvent(`taunt`),Q.cheer(.8),Q.sfx(`click`),this.excite=Math.min(1,this.excite+.1);break;case`ready`:Q.sfx(`ready`),this.hooks.message(`¡`+t.f[n.fighter].data.name+` tiene el FINISHER listo!`,!0);break;case`exhausted`:this.hooks.message(t.f[n.fighter].data.name+` está agotado`);break;case`msg`:this.hooks.message(n.text,n.big);break;case`end`:Q.sfx(`bell`),this.cam.setShot({kind:`orbit`,who:n.winner}),this.slow(.5,.8),this.excite=1,Q.cheer(2)}}},Fd=e=>e[Math.floor(Math.random()*e.length)],Id=class{match;show;speaking=!1;curPrio=0;queue=[];gap=0;quiet=0;lastHit=[-9,-9];hitStreak=[0,0];lastSaid={};clock=0;subTimer=0;lowShown=[!1,!1];enabled=!0;constructor(e,t){this.match=e,this.show=t}n(e){return this.match.f[e].data.name}say(e,t,n=1,r=``,i=0){if(this.enabled){if(r){if(this.clock-(this.lastSaid[r]??-99)<i)return;this.lastSaid[r]=this.clock}(n!==0||!this.speaking&&!this.queue.length)&&(this.speaking&&n>this.curPrio?(this.queue=[],this.speak({who:e,text:t,prio:n},!0)):this.speaking||this.gap>0?this.queue.length<2&&this.queue.push({who:e,text:t,prio:n}):this.speak({who:e,text:t,prio:n},!1))}}speak(e,t){this.quiet=0;let n=e.who===0?`NARRADOR`:`COMENTARISTA`;this.show(n,e.text),this.subTimer=1.4+e.text.length*.055,this.curPrio=e.prio,t&&Q.cancelSpeech(),this.speaking=!0;let r=()=>{this.speaking=!1,this.gap=.35,this.curPrio=0};if(!Q.speak(e.text,e.who,r)){let e=this.subTimer;window.setTimeout(r,e*1e3)}}start(e){let[t,n]=[this.n(0),this.n(1)];this.say(0,`¡Señoras y señores, bienvenidos al Hoyo Wrestling! Esta noche, desde ${e}, ${t} contra ${n}.`,3),this.say(1,Fd([`Va a ser un combate de los que se recuerdan.`,`Los dos llegan con muchas ganas de pelea.`,`Prepárense, porque aquí hay tela que cortar.`]),2)}handle(e){for(let t of e)this.event(t)}event(e){let t=this.match;switch(e.type){case`hit`:{let t=e.attacker;this.hitStreak[t]=this.clock-this.lastHit[t]<1.5?this.hitStreak[t]+1:1,this.lastHit[t]=this.clock,this.hitStreak[t]===3?this.say(0,Fd([`¡${this.n(t)} está encadenando golpes!`,`¡Qué ráfaga de ${this.n(t)}!`,`${this.n(t)} no le deja respirar.`]),1,`combo`,4):e.heavy&&this.say(Fd([0,1]),Fd([`¡Qué golpe de ${this.n(t)}!`,`Eso ha tenido que doler.`,`${this.n(t)} conecta un golpe tremendo.`,`¡Menudo impacto!`]),1,`heavy`,4);break}case`block`:e.perfect&&this.say(0,Fd([`¡Contraataque de ${this.n(e.target)}! Lo vio venir.`,`¡Qué lectura de ${this.n(e.target)}!`]),2,`parry`,3);break;case`knockdown`:this.say(0,Fd([`¡${this.n(e.target)} al suelo!`,`Cae ${this.n(e.target)}.`,`¡Derribado ${this.n(e.target)}!`]),1,`down`,3);break;case`grappleMove`:this.say(Fd([0,1]),`${this.n(e.attacker)} aplica un ${e.name}.`,1,`grapple`,4);break;case`reversal`:this.say(0,`¡Qué reversión de ${this.n(e.fighter)}!`,2,`rev`,3);break;case`pinStart`:this.say(0,`¡${this.n(e.attacker)} va a por el pin!`,2,`pin`,3);break;case`kickout`:this.say(1,Fd([`¡${this.n(e.fighter)} se zafa en el último segundo!`,`¡Increíble! ¡Se levanta antes del tres!`]),2,`kick`,3);break;case`subStart`:this.say(0,`¡${this.n(e.attacker)} le ha atrapado en una llave! ${this.n(e.target)} está en apuros.`,2,`sub`,3);break;case`subBreak`:this.say(1,`¡${this.n(e.fighter)} consigue escapar de la llave!`,2,`subb`,3);break;case`tap`:this.say(0,`¡${this.n(e.fighter)} se rinde!`,3);break;case`ready`:this.say(1,`${this.n(e.fighter)} tiene el finisher listo. ¡Cuidado!`,2,`ready`+e.fighter,12);break;case`finisherStart`:this.say(0,`¡Atención! ¡${this.n(e.fighter)} va a por su finisher: ${e.move.name}!`,3);break;case`finisherHit`:this.say(0,Fd([`¡¡Impacto brutal!! ¡${this.n(e.target)} no se lo esperaba!`,`¡Increíble! ¡Menudo remate!`]),3);break;case`finisherMiss`:this.say(1,`¡Le ha fallado el finisher! Esto le va a salir caro.`,2,`fmiss`,5);break;case`foul`:this.say(1,e.seen?`¡Falta de ${this.n(e.fighter)}! Y el árbitro lo ha visto.`:`Falta de ${this.n(e.fighter)}… y el árbitro mirando a otro lado.`,2,`foul`,6);break;case`taunt`:this.say(1,Fd([`${this.n(e.fighter)} se burla del rival. ¡Qué descaro!`,`Fíjense en ${this.n(e.fighter)}, está disfrutando.`]),1,`taunt`,6);break;case`summon`:this.say(0,e.kind===`tanque`?`¡Un tanque! ¡${this.n(e.fighter)} ha sacado un TANQUE! Esto es el Hoyo.`:`¡${this.n(e.fighter)} ha invocado una momia! No me lo puedo creer.`,3,`summon`,4);break;case`toreo`:this.say(0,`¡${this.n(e.target)} le torea! ¡Olé!`,3);break;case`heavyPick`:e.move.id===`casco_romano`&&this.say(1,`El casco romano… ¡ave, ${this.n(e.fighter)}!`,1,`casco`,8);break;case`outCount`:e.n>=5&&e.n<10&&this.say(0,`¡${this.n(e.fighter)} lleva ${e.n} segundos fuera del ring!`,2,`out`+e.n,1);break;case`exhausted`:this.say(1,`${this.n(e.fighter)} está agotado.`,1,`tired`+e.fighter,12);break;case`koCount`:e.n===3&&this.say(1,`${this.n(t.ko?t.ko.idx:0)} no se levanta…`,2,`ko3`,6);break;case`end`:{let n=this.n(e.winner),r=this.n(1-e.winner),i=t.f[1-e.winner].banned?`¡${r} ha sido despedido! Gana ${n}.`:e.reason===`ko`?`¡KO! ¡Gana ${n}!`:e.reason===`pin`?`¡Uno, dos, tres! ¡Gana ${n}!`:e.reason===`rendicion`?`¡Se rinde ${r}! ¡Gana ${n}!`:`¡Cuenta fuera! ¡Gana ${n}!`;this.say(0,i,4),this.say(1,Fd([`Un combate para la historia del Hoyo.`,`Qué nochecita nos han regalado.`,`${n} se lo ha ganado a pulso.`]),3);break}}}update(e){if(this.clock+=e,this.gap=Math.max(0,this.gap-e),this.quiet+=e,this.subTimer>0&&(this.subTimer-=e,this.subTimer<=0&&this.show(``,``)),!this.speaking&&this.gap<=0&&this.queue.length){this.queue.sort((e,t)=>t.prio-e.prio),this.speak(this.queue.shift(),!1);return}let t=this.match;for(let e=0;e<2;e++){let n=t.f[e];!this.lowShown[e]&&n.hpPct<.3&&!t.over&&(this.lowShown[e]=!0,this.say(1,`A ${n.data.name} le queda muy poca vida. Está contra las cuerdas.`,2,`low`+e,20))}if(this.quiet>9&&!t.over&&!this.speaking){let[e,n]=t.f,r=e.hpPct>n.hpPct?e:n,i=r===e?n:e;Math.abs(e.hpPct-n.hpPct)>.25?this.say(0,Fd([`${r.data.name} domina el combate; ${i.data.name} necesita reaccionar.`,`Ventaja clara para ${r.data.name}.`]),0):this.say(1,Fd([`Combate muy igualado, no sabría decir quién ganará.`,`Los dos se estudian, esto es puro ajedrez.`,`Mucha tensión en el ring.`]),0),this.quiet=5}}dispose(){this.queue=[],Q.cancelSpeech(),this.show(``,``)}},Ld=1/60,Rd={ko:`¡KO!`,pin:`¡PIN!`,rendicion:`¡RENDICIÓN!`,fuera:`¡CUENTA FUERA!`},zd=class{game;opts;match;view;aiC;aiP;phase=`intro`;paused=!1;done=!1;introT=0;acc=0;bannerShown=!1;summary=null;playerIdx=0;narrator=null;narrStarted=!1;keyHandler=null;get hudPlayer(){return this.opts.spectate?-1:this.playerIdx}constructor(e,t){this.game=e,this.opts=t,this.match=new Ju(t.p,t.c);let n=Sd(t.arena,e.effectiveQuality);this.view=new Pd(e.stage,n,this.match,{message:(t,n)=>e.hud.message(t,n),flash:(t,n)=>e.hud.flash(t,n),banner:(t,n)=>e.hud.banner(t,n),rumble:(t,n,r)=>e.input.rumble(t,n,r)}),this.view.cam.shakeScale=+!!e.save.settings.shake,this.aiC=new Ed(1,t.difficulty),this.aiP=t.demo||t.spectate?new Ed(0,t.spectate?t.difficultyP??t.difficulty:`intermedia`):null,this.view.cam.auto=!!t.spectate,t.spectate&&(this.narrator=new Id(this.match,(t,n)=>e.hud.subtitle(t,n)),this.narrator.enabled=!0,this.keyHandler=e=>{this.paused||this.phase===`over`||(e.code===`KeyC`?this.spectateAction(`cut`):e.code===`KeyN`&&this.spectateAction(`narrator`))},window.addEventListener(`keydown`,this.keyHandler)),e.input.enabled=!1,e.input.reset(),e.hud.show(this.match,this.hudPlayer,t.spectate?e.spectateHint():e.controlsHint(),e.save.settings.fps);let r=!t.demo&&!t.spectate;e.touch.show(e.useTouch&&r),document.body.classList.toggle(`touch-mode`,e.useTouch&&r),Q.music(t.arena===`manchester`?`manchester`:`matamoros`),Q.setCrowd(.3)}update(e){if(this.paused){this.view.sync(0);return}let t=this.match,n=this.view.step(e);if(this.phase===`intro`)this.introT+=e,!this.narrStarted&&this.narrator&&this.introT>.5&&(this.narrStarted=!0,this.narrator.start(this.opts.arena===`manchester`?`Manchester`:`Matamoros`)),this.introT>2.7&&(this.phase=`fight`,this.game.input.enabled=!this.opts.demo&&!this.opts.spectate,Q.sfx(`bell`),this.game.hud.banner(`¡LUCHA!`,`#e7b53b`),this.view.excite=.7,Q.cheer(1.5));else{this.acc+=n;let e=[],r=0,i=Ql(),a=!1;for(;this.acc>=Ld&&r<6;){!a&&this.phase===`fight`&&!this.opts.demo&&!this.opts.spectate?(i=this.game.input.sample(this.view.cam),a=!0):a&&(i={...i,light:!1,heavy:!1,grab:!1,taunt:!1,finisher:!1});let n=this.aiP?this.aiP.update(Ld,t):i,o=this.aiC.update(Ld,t);t.update(Ld,[n,o]),this.acc-=Ld,r++;for(let n of t.events)e.push(n);t.events.length=0}if(r===6&&(this.acc=0),e.length){this.view.handle(e),this.narrator?.handle(e);for(let t of e)t.type===`end`&&this.onEnd(t.winner,t.reason)}this.game.touch.setReady(t.f[this.playerIdx].mom>=100&&!t.over),t.over&&(this.phase=`over`,this.game.input.enabled=!1,this.game.touch.show(!1),t.endT>5.2&&!this.done&&(this.done=!0,this.summary=t.summary(),this.game.onBattleEnd(this)))}this.narrator?.update(e),this.view.sync(e),this.game.hud.update(e,t,this.hudPlayer,e)}onEnd(e,t){if(this.bannerShown)return;this.bannerShown=!0;let n=this.match.f[e].data.name,r=this.match.f[1-e].banned?`¡DESPEDIDO!`:Rd[t];this.game.hud.banner(r,`#e7b53b`),this.game.hud.message(`Gana ${n}`,!0),this.game.hud.clearCount(),e===this.playerIdx||this.opts.spectate?Q.sfx(`win`):Q.sfx(`foul`)}setPaused(e){this.paused=e,this.game.input.enabled=!e&&this.phase===`fight`&&!this.opts.demo&&!this.opts.spectate,this.game.input.reset()}spectateAction(e){this.opts.spectate&&(e===`cut`?this.view.cam.cut():this.narrator&&(this.narrator.enabled=!this.narrator.enabled,this.game.hud.message(this.narrator.enabled?`Narrador activado`:`Narrador desactivado`),this.narrator.enabled||(Q.cancelSpeech(),this.game.hud.subtitle(``,``))))}dispose(){this.keyHandler&&window.removeEventListener(`keydown`,this.keyHandler),this.narrator?.dispose(),this.view.dispose(),this.game.input.enabled=!1,this.game.hud.hide(),this.game.touch.show(!1),document.body.classList.remove(`touch-mode`)}},Bd=`el-hoyo-wrestling-v1`,Vd=()=>({version:1,wins:0,losses:0,tournaments:{facil:0,intermedia:0,dificil:0},achievements:{},winsBy:{},taunts:0,settings:{quality:`auto`,master:.8,music:.6,sfx:.9,shake:!0,voice:!0,fps:!1,touch:`auto`,difficulty:`intermedia`}});function Hd(){try{let e=localStorage.getItem(Bd);if(!e)return Vd();let t=JSON.parse(e),n=Vd();return{...n,...t,settings:{...n.settings,...t.settings??{}},tournaments:{...n.tournaments,...t.tournaments??{}}}}catch{return Vd()}}function Ud(e){try{localStorage.setItem(Bd,JSON.stringify(e))}catch{}}function Wd(e,t,n,r=Math.random){let i=new Ju(e,t,r),a=[new Ed(0,n,r),new Ed(1,n,r)],o=1/30;for(;!i.over&&i.time<420;)i.update(o,[a[0].update(o,i),a[1].update(o,i)]),i.events.length=0;return i.over?{winner:i.winner,reason:i.reason??`ko`,time:i.time}:{winner:i.f[0].hpPct>=i.f[1].hpPct?0:1,reason:`tiempo`,time:i.time}}var Gd=`modulepreload`,Kd=function(e,t){return new URL(e,t).href},qd={},Jd=function(e){return e.pathname.endsWith(`.css`)},Yd=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Xd=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Kd(t,n);let r=s(t),i=Jd(r);return Yd(qd,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Gd,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Zd=class{canvas;ui;stage;input;hud;touch;screens;save=Hd();roster=D;showcase=null;battle=null;tour=null;lastVersus=null;mode=`versus`;lastSpectate=null;padNav;last=0;perf={t:0,n:0,low:0,high:0,dprScale:1};constructor(e,t){this.canvas=e,this.ui=t,this.stage=new Zl(e,this.effectiveQuality),this.input=new $l(t),this.hud=new nu(t),this.touch=new ru(t,this.input),this.screens=new yu(t,this),this.padNav=new wd(e=>this.onPad(e)),window.addEventListener(`gamepadconnected`,e=>{this.toast(`🎮 Mando conectado: `+e.gamepad.id.split(`(`)[0].trim().slice(0,40))}),window.addEventListener(`gamepaddisconnected`,()=>{this.toast(`Mando desconectado`),this.autoPause()}),this.input.onPause=()=>this.togglePause(),this.hud.pauseBtn.addEventListener(`click`,()=>this.togglePause()),Q.setVolumes(this.save.settings.master,this.save.settings.music,this.save.settings.sfx),Q.vol.voice=this.save.settings.voice,document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.autoPause()})}get useTouch(){let e=this.save.settings.touch;return e===`on`||e===`auto`&&Xl()}get effectiveQuality(){let e=this.save.settings.quality;return e===`auto`?Xl()?`media`:`alta`:e}isUnlocked(e){return ou(this.save,e)}commitSettings(){Ud(this.save);let e=this.save.settings;Q.setVolumes(e.master,e.music,e.sfx),Q.vol.voice=e.voice,this.stage.quality!==this.effectiveQuality&&this.stage.setQuality(this.effectiveQuality),this.battle&&(this.battle.view.cam.shakeScale=+!!e.shake)}toast(e){let t=Z(`div`,{class:`toast`},e);this.ui.appendChild(t),setTimeout(()=>t.classList.add(`out`),2300),setTimeout(()=>t.remove(),2800)}spectateHint(){return this.input.padConnected?`<b>A</b> cambiar cámara · <b>Y</b> narrador sí/no · <b>Start</b> pausa`:`<b>C</b> cambia de cámara · <b>N</b> narrador sí/no · <b>Esc</b> pausa`}controlsHint(){return this.input.padConnected&&!this.useTouch?`<b>Stick / cruceta</b> mover · <b>A</b> golpe · <b>X</b> fuerte · <b>B</b> agarre (y pin) · <b>LB / LT</b> guardia · <b>RT</b> correr · <b>Y</b> burla · <b>RB</b> finisher · <b>Start</b> pausa`:this.useTouch?`<b>Joystick</b> mover (a tope = correr) · <b>GOLPE / FUERTE</b> · <b>AGARRE</b> llaves y pin · <b>GUARDIA</b> mantén · toca justo antes del golpe para <b>contraatacar</b>`:`<b>WASD</b> mover · <b>J</b> / clic izq. golpe · <b>K</b> / clic der. fuerte · <b>L</b> agarre (también pin) · <b>Espacio</b> guardia · <b>Shift</b> correr · <b>E</b> burla · <b>F</b> finisher`}async boot(){let e=new URLSearchParams(location.search),t=e.get(`q`);if((t===`baja`||t===`media`||t===`alta`)&&(this.save.settings.quality=t,this.stage.setQuality(t)),e.get(`pose`)){let{startPoseViewer:t}=await Xd(async()=>{let{startPoseViewer:e}=await import(`./PoseViewer-D-NxMmXK.js`);return{startPoseViewer:e}},[],import.meta.url);t(this.stage,e);return}this.openShowcase(`matamoros`),requestAnimationFrame(e=>this.frame(e));let n=e.get(`auto`);if(n){Q.init();let[t,r,i,a]=n.split(`,`);this.startBattle({p:O(t??`elso`),c:O(r??`petisui`),arena:i??`matamoros`,difficulty:a??`intermedia`,demo:e.get(`demo`)===`1`})}else this.screens.showTitle()}openShowcase(e=`matamoros`){this.showcase?.dispose(),this.showcase=new Cd(this.stage,e,this.effectiveQuality===`alta`?`media`:this.effectiveQuality)}goMenu(){this.battle&&=(this.battle.dispose(),null),this.showcase||this.openShowcase(`matamoros`),this.showcase.setFighter(0,null),this.showcase.setFighter(1,null),this.tour=null,Q.music(`menu`),this.screens.showMenu()}startVersus(e){this.mode=`versus`,this.tour=null,this.lastVersus=e;let t=e.arena===`random`?Math.random()<.5?`matamoros`:`manchester`:e.arena;this.prepareFight({p:O(e.player),c:O(e.cpu),arena:t,difficulty:e.difficulty})}startSpectate(e){this.mode=`espectador`,this.tour=null,this.lastSpectate=e;let t=e.arena===`random`?Math.random()<.5?`matamoros`:`manchester`:e.arena;this.prepareFight({p:O(e.a),c:O(e.b),arena:t,difficulty:e.difficulty,spectate:!0})}startTournament(e,t){this.mode=`torneo`;let n=du(e,this.roster.map(e=>e.id));this.tour={bracket:n,difficulty:t,arena:cu(n,0)},this.screens.showBracket(n,t,()=>this.playTourRound(),()=>this.goMenu())}playTourRound(){let e=this.tour,t=e.bracket,n=cu(t,t.round);this.prepareFight({p:O(t.playerId),c:O(pu(t)),arena:n,difficulty:e.difficulty})}prepareFight(e){let t=M(`pre`,e.p.id,e.c.id),n=()=>this.screens.showVS(e.p,e.c,e.arena,e.difficulty,()=>this.startBattle(e),!!e.spectate);t.length?this.screens.showDialogue(t,e.p,e.c,n):n()}startBattle(e){this.screens.clear(),this.showcase?.dispose(),this.showcase=null,this.battle?.dispose(),this.battle=new zd(this,e)}togglePause(){let e=this.battle;e&&e.phase!==`intro`&&e.phase!==`over`&&!e.opts.demo&&(e.paused?(this.screens.hidePause(),e.setPaused(!1),this.padNav.settle()):(e.setPaused(!0),this.padNav.settle(),this.screens.showPause(()=>{this.screens.hidePause(),e.setPaused(!1),this.padNav.settle()},()=>{this.screens.hidePause(),this.goMenu()})))}autoPause(){let e=this.battle;e&&e.phase===`fight`&&!e.paused&&!e.opts.demo&&this.togglePause()}onPad(e){if(this.screens.isOpen()){this.screens.pad(e);return}let t=this.battle;t&&t.opts.spectate&&t.phase!==`intro`&&(e===`start`?this.togglePause():e===`confirm`?t.spectateAction(`cut`):e===`y`&&t.spectateAction(`narrator`))}onBattleEnd(e){let t=e.summary,n=e.opts;if(n.spectate){this.onSpectateEnd(e);return}let r=t.winner===0,i=new Set(this.roster.filter(e=>this.isUnlocked(e)).map(e=>e.id)),a=!1;if(this.mode===`torneo`&&this.tour){let e=this.tour.difficulty;mu(this.tour.bracket,r,(t,n)=>Wd(O(t),O(n),e).winner===0?t:n),a=this.tour.bracket.champion===this.tour.bracket.playerId}let o=au(this.save,{summary:t,player:0,playerData:n.p,mode:this.mode,difficulty:n.difficulty,tournamentWon:a});Ud(this.save);let s=this.roster.filter(e=>!i.has(e.id)&&this.isUnlocked(e)),c=r?n.p:n.c,l=r?n.c:n.p,u=M(`victoria`,n.p.id,n.c.id,c.id).map(e=>({who:this.roster.find(t=>t.id===e.who)??null,text:e.text}));if(a)for(let e of M(`campeon`,n.p.id,n.c.id,n.p.id))u.push({who:this.roster.find(t=>t.id===e.who)??null,text:e.text});let d={won:r,winner:c,loser:l,reasonText:t.fired?`Despedido por Pablo Motos`:{ko:`Por KO`,pin:`Por pin`,rendicion:`Por rendición`,fuera:`Por cuenta fuera del ring`}[t.reason],time:t.time,damage:{dealt:t.damageTaken[1],taken:t.damageTaken[0]},quotes:u,newAchievements:o.map(e=>iu.find(t=>t.id===e)).filter(Boolean),unlocked:s};(o.length||s.length)&&Q.sfx(`unlock`),this.hud.hide();let f=()=>{this.mode===`versus`&&this.lastVersus&&this.startVersus(this.lastVersus)};if(this.mode===`torneo`&&this.tour){let e=this.tour;this.screens.showResults(d,[{label:e.bracket.champion||e.bracket.eliminated?`Ver cuadro`:`Continuar`,primary:!0,action:()=>this.afterTourResult()}])}else this.screens.showResults(d,[{label:`Revancha`,primary:!0,action:f},{label:`Cambiar luchadores`,action:()=>{this.goMenu(),this.screens.showVersusSetup()}},{label:`Menú principal`,action:()=>this.goMenu()}])}onSpectateEnd(e){let t=e.summary,n=e.opts;this.hud.hide();let r=t.winner===0?n.p:n.c,i=t.winner===0?n.c:n.p,a=M(`victoria`,n.p.id,n.c.id,r.id).map(e=>({who:this.roster.find(t=>t.id===e.who)??null,text:e.text})),o={won:!0,spectate:!0,winner:r,loser:i,reasonText:t.fired?`${r.name} despide a ${i.name}`:{ko:`Por KO`,pin:`Por pin`,rendicion:`Por rendición`,fuera:`Por cuenta fuera del ring`}[t.reason],time:t.time,damage:{dealt:t.damageTaken[1],taken:t.damageTaken[0]},quotes:a,newAchievements:[],unlocked:[]};this.screens.showResults(o,[{label:`Otro combate igual`,primary:!0,action:()=>{this.lastSpectate&&this.startSpectate(this.lastSpectate)}},{label:`Cambiar luchadores`,action:()=>{this.goMenu(),this.screens.showSpectateSetup()}},{label:`Menú principal`,action:()=>this.goMenu()}])}afterTourResult(){let e=this.tour;this.battle?.dispose(),this.battle=null,this.showcase||this.openShowcase(`matamoros`),Q.music(`menu`),this.screens.showBracket(e.bracket,e.difficulty,()=>this.playTourRound(),()=>this.goMenu(),()=>this.startTournament(e.bracket.playerId,e.difficulty))}frame=e=>{let t=Math.min(.05,(e-this.last)/1e3||.016);this.last=e,this.battle?this.battle.update(t):this.showcase&&(this.showcase.update(t),Q.tickCrowd(t));let n=!(!this.battle?.opts.spectate||this.battle.paused);this.padNav.update(t,this.screens.isOpen()||n),this.stage.render(),this.watchPerf(t),requestAnimationFrame(this.frame)};watchPerf(e){let t=this.perf;if(t.t+=e,t.n++,t.t<1.5)return;let n=t.n/t.t;t.t=0,t.n=0;let r=this.useTouch?28:52;n<r?(t.low++,t.high=0):n>r+14?(t.high++,t.low=0):(t.low=0,t.high=0),t.low>=2&&t.dprScale>.55?(t.dprScale=Math.max(.55,t.dprScale-.15),this.applyDpr(),t.low=0):t.high>=4&&t.dprScale<1&&(t.dprScale=Math.min(1,t.dprScale+.1),this.applyDpr(),t.high=0)}applyDpr(){let e=this.effectiveQuality,t=Math.min(window.devicePixelRatio||1,e===`baja`?1:e===`media`?1.5:2);this.stage.renderer.setPixelRatio(t*this.perf.dprScale),this.stage.resize()}},Qd=document.getElementById(`gl`),$d=document.getElementById(`ui`);window.addEventListener(`error`,e=>{let t=document.getElementById(`boot`);t&&(t.innerHTML=`<div class="boot-err"><b>Algo ha fallado al arrancar.</b><pre>${String(e.message)}</pre><p>Comprueba que tu navegador soporta WebGL 2.</p></div>`)});var ef=new Zd(Qd,$d);window.__hoyo=ef,ef.boot().then(()=>document.getElementById(`boot`)?.classList.add(`done`));export{Su as a,no as c,J as d,ea as f,O as h,Ou as i,La as l,V as m,wu as n,Ji as o,Za as p,xu as r,W as s,zu as t,G as u};