#!/bin/bash
npm run build
 mkdir deploy
 cp index.html deploy/
 cp -r dist deploy/
 cp -r styles deploy/
 cp -r assets deploy/
