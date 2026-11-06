#!/usr/bin/env bash
# Compila el APK de Android (AYN Thor): build web → assets del APK → Gradle → docs/el-hoyo.apk
# Requiere el SDK de Android (ANDROID_HOME, con platforms;android-35 y build-tools;35.0.0) y Gradle 8.9+.
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
rm -rf android/app/src/main/assets/www
mkdir -p android/app/src/main/assets
cp -r dist android/app/src/main/assets/www
export ANDROID_HOME="${ANDROID_HOME:-/opt/android-sdk}"
echo "sdk.dir=$ANDROID_HOME" > android/local.properties
(cd android && gradle --no-daemon -q assembleRelease)
cp android/app/build/outputs/apk/release/app-release.apk docs/el-hoyo.apk
echo "APK listo: docs/el-hoyo.apk ($(du -h docs/el-hoyo.apk | cut -f1))"
