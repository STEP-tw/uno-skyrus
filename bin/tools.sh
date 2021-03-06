#! /bin/sh

green="\x1b[32m"
red="\x1b[31m"
reset="\x1b[0m"

declare -a dependencies

dependencies=(eslint nodemon mocha nyc)

for dependency in ${dependencies[@]}
do
	which ${dependency} 1>>/dev/null
	if [ "$?" -ne 0 ]; then
	echo "${red} ${dependency} is not globally installed in your machine ${reset}"
	echo "Installing ${dependency}........"
	npm install -g ${dependency}
	else echo "${green}${dependency} is already installed globally${reset}"
	fi
done

declare -a extensions
extensions=(
  2gua.rainbow-brackets
  dbaeumer.vscode-eslint
  esbenp.prettier-vscode
  patbenatar.advanced-new-file
  tootone.org-mode
  )
  for extension in ${extensions[@]} ; do
    code --install-extension $extension
    done


