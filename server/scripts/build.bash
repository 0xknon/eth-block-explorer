#!/bin/bash
set -euo pipefail

bold()
{
  printf "\x1b[1m%s\x1b[0m\n" "$*"
}

green()
{
  printf "\x1b[32;1m%s\x1b[0m\n" "$*"
}

red()
{
  printf "\x1b[31;1m%s\x1b[0m\n" "$*"
}

main()
{
  # Exit trap
  trap 'red "Build failed."' EXIT

  # Go to project root
  cd "${BASH_SOURCE%/*}/.." || exit 1

  # Build
  bold '* Compiling TypeScript...'
  yarn tsc --build ./tsconfig.json
  green '* Done compiling TypeScript.'

  # Copy remaining assets to dist
  bold '* Copying remaining assets to "dist" directory...'

  # Non-js/ts files in src
  local findcmd=(find src -type f -not \( -iname "*.js" -or -iname "*.ts" \))
  if [[ -n "$("${findcmd[@]}")" ]]; then
    # There are files to be copied, assuming no file changes between the check
    # and actual copying
    "${findcmd[@]}" -print0 | xargs -0 tar c | tar -C dist -x
  fi

  # Other non-source files
  local files=(scripts package.json yarn.lock)
  cp -R "${files[@]}" dist

  green '* Done copying remaining assets to "dist" directory.'

  echo
  green 'Build success.'

  # Remove trap
  trap - EXIT
}

main "%@"