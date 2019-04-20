#! /bin/sh
echo "Setting hooks..."
cp .github/pre_commit_hooks .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "Setting Commit Template..."
git config --local commit.template '.github/git_commit_template'

echo "Installing dependencies..."
npm install

echo "Installing vscode extensions and Global Dependencies..."
./bin/tools.sh