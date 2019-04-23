#!/bin/bash

  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"


cp index.html docs/
cp -r dist docs/
cp -r styles docs/
cp -r assets docs/
