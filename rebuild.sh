#!/bin/bash

set -e

npm run rebuild_main
npm run rebuild_preload
npm run rebuild_renderer

echo "Rebuild completed."

if [ "$1" == "run" ]; then
    npm run start
fi
