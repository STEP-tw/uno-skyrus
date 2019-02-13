#! /bin/sh

cp .hooks/pre-commit-hooks .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

npm install
