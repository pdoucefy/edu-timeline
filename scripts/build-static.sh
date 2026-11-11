#!/usr/bin/env bash

set -euo pipefail

mv src/proxy.ts src/proxy.ts.disabled

restore_proxy() {
  mv src/proxy.ts.disabled src/proxy.ts
}

trap restore_proxy EXIT

STATIC_EXPORT=true \
NEXT_PUBLIC_BASE_PATH=/test \
yarn build
