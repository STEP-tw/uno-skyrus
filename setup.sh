#! /bin/sh

cp .github/pre_commit_hooks .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

cp .github/pre_push_hooks .git/hooks/pre-push
chmod +x .git/hooks/pre-push

npm install
