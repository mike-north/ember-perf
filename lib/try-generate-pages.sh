#!/bin/bash
echo "Attempting to generate pages"
if [[ "${TRAVIS_PULL_REQUEST}" = "false" && "${TRAVIS_BRANCH}" == 'master' && "${EMBER_TRY_SCENARIO}" == 'ember-release' ]]; then
  rm bower.json.ember-try
  git add -A .
  git commit -m "temp"
  ember github-pages:commit --message "New release" --branch "gh-pages"
  git push deploy gh-pages 2>&1 >/dev/null
else
  echo "Not a master build -- no deploy"
fi
