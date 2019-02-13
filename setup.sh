#! /bin/sh

cp .github/pre_commit_hooks .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

npm install
