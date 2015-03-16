#!/bin/bash -l

# reset:  del -rf ~/.nvm ~/.npm ~/.bower node_modules bower_components
# npm cache clean

SCRIPT=$(which $0)
SCRIPT_DIR=$(dirname $SCRIPT)

# Load shell color definitions
source $SCRIPT_DIR/colors.sh

# Collect command line args
RELOAD=0;
SILENT=1; # this will stop only on last step before build
for arg; do
    input=$(echo "$arg" | tr '[:upper:]' '[:lower:]')
    case "$input" in
        "-r" | "r"  | "reload" ) RELOAD=1 ;;
        "-s" | "s"  | "silent" ) SILENT=2 ;; # this will skip all pause statements in script
        "-i" | "i"  | "interactive" ) SILENT=0 ;;
    esac
done

# make sure we have the home directory path for logged in user (ubuntu uses $home, OSX uses $HOME)
[ "$HOME" != "" ] && export home=$HOME

#define constants
export NVM_DIR="$home/.nvm"
LatestNvmVersion='v0.23.3'

FORMAT_SEPARATOR="$(color $NORMAL $(($BACKGROUND+$CONTRAST+$YELLOW)))----------------------------------------------------- $(color $BOLD $BLACK)%-70s$(color $NORMAL)"
FORMAT_YELLOW_BANNER="$(color $NORMAL $(($BACKGROUND+$CONTRAST+$YELLOW)))=== $(color $BOLD $BLACK)%-120s$(color $NORMAL)"
FORMAT_GREEN_PROMPT="$(color $NORMAL $((BACKGROUND+$CONTRAST+$GREEN)))--- $(color $BOLD $BLACK)%-120s$(color $NORMAL)"
FORMAT_CODE="$(color $BOLD $BLACK )%s$(color $NORMAL)"


#define functions

function pauseForAnyKey() {
    [ "$SILENT" == "0" ] && read -n 1
    echo
}

function pauseForConfirmation() {
    local var="1"
    [ "$SILENT" > "0" ] && var="y"
    while [[ "$var" != "" && "$var" != "y" && "$var" != "n" ]]; do
        read -s -n 1 var
        var=$(echo $var | tr '[:upper:]' '[:lower:]')
    done
    [ "$var" == "" ] && var="y"
    echo $var
}
function installNVM() {
    # check if NVM is already installed
    if [ ! -s "$NVM_DIR/nvm.sh" ]; then
        printf "${FORMAT_YELLOW_BANNER}\n" "This project requires nvm, (Node Version Manager)."
        if [ "$SILENT" > "0" ]; then
            printf "${FORMAT_YELLOW_BANNER}\n" "Auto downloading and installing NVM in your local home directory (~/.nvm)"
        else
            printf "${FORMAT_GREEN_PROMPT}" "Press any key to download and install NVM in your local home directory (~/.nvm)"
            pauseForAnyKey
        fi
        cmd="curl https://raw.githubusercontent.com/creationix/nvm/${LatestNvmVersion}/install.sh | bash"
        printf "${FORMAT_CODE}\n" "$cmd"
        eval $cmd
        printf "${FORMAT_YELLOW_BANNER}\n" "NVM is now installed."
        printf "%130s\n" | tr " " "-"
        cmd="$SCRIPT -r"
        [ "$SILENT" == "2" ] && cmd="$cmd -s"
        [ "$SILENT" == "0" ] && cmd="$cmd -i"
        printf "restarting $cmd\n" && eval "$cmd"
        exit
    else
        pushd .
        cd $NVM_DIR
        currentVersion=$(git describe --all)
        printf "${FORMAT_YELLOW_BANNER}\n" "You already have version ${currentVersion} of nvm installed, (Node Version Manager)."
        printf "${FORMAT_YELLOW_BANNER}\n" "Checking if you have the latest version...."

        git fetch --tags
        latestVersion=$(git rev-list --tags --max-count=1 | git describe --tags)
        if [ "$currentVersion" == "$latestVersion" ]; then
            printf "${FORMAT_YELLOW_BANNER}\n" "You already have the latest version of NVM installed ('${latestVersion}')"
        else
            if [ "$SILENT" > "0" ]; then
                printf "${FORMAT_YELLOW_BANNER}\n" "Auto updating your version of NVM from ('${currentVersion}') to ('${latestVersion}')"
            else
                printf "${FORMAT_GREEN_PROMPT}" "Press any key to update your version of NVM from ('${currentVersion}') to ('${latestVersion}')"
                pauseForAnyKey
            fi
            git checkout "${latestVersion}"
        fi
        popd
    fi
    echo
}

function installNode() {
    printf "${FORMAT_YELLOW_BANNER}\n" "Checking if you have the latest stable NodeJS"
    remoteStable=$(nvm ls-remote stable)
    latestStableNpmVersion=$(echo ${remoteStable} | awk '{ print $2 }')
    [[ "${latestStableNpmVersion}" == "" ]] && latestStableNpmVersion=$(echo ${remoteStable} | awk '{ print $1 }')
    latestStableNpmVersion=$(echo ${latestStableNpmVersion}| tr -cd '\12\40-\176'  | sed 's/\[0m//g' | sed 's/[^v.0-9]//g')
    currentNvmVersion=$(nvm current)
    if [[ "$latestStableNpmVersion" != "$currentNvmVersion" ]]; then
        printf "${FORMAT_YELLOW_BANNER}\n" "stable='$latestStableNpmVersion', current='$currentNvmVersion'"

        if [[ "$currentNvmVersion" != "system" && "$currentNvmVersion" != "none" ]]; then
            if [ "$SILENT" => "0" ]; then
                printf "${FORMAT_YELLOW_BANNER}\n" "Auto downloading and installing NodeJS '$latestStableNpmVersion'"
            else
                printf "${FORMAT_GREEN_PROMPT}" "Do you want to update to latest stable version of nodejs ? (Y|n)"
                choice=$(pauseForConfirmation)
            fi
        else
            choice="y"
            printf "${FORMAT_YELLOW_BANNER}\n" "installing the latest stable version of node (you must have at least one version)"

        fi

        if [ "$choice" == "y" ]; then
            printf "${FORMAT_CODE}\n" "nvm install stable"
            nvm install stable

            printf "${FORMAT_CODE}\n" "nvm alias default stable"
            nvm alias default stable

            printf "${FORMAT_CODE}\n" "nvm use default"
            nvm use default
        fi
    fi
    echo
}
function identifyGlobalNodeModules() {
    # bash 3 does not have associative arrays, so we find another way to store our version hash
    local extraGlobalModules=()
    local globalModules=($(npm list -g --depth=0 | awk '{ print $2 }'))
    if [ "${globalModules}" != "" ]; then
        printf "\n${FORMAT_YELLOW_BANNER}\n" "Found the following node modules installed globally for node $(nvm current)"
        for package in "${globalModules[@]}"; do
            printf "${package}\n"
            local name=$(echo $package | cut -f1 -d@);
            local version=$(echo $package | cut -f2 -d@);
            case $name in
                'gulp'      ) gulp="$version" ;;
                'gulp-cli'  ) gulpCli="$version" ;;
                'bower'     ) bower="$version" ;;
                'npm'       ) npm="$version" ;;
                'npm-check' ) npmCheck="$version" ;;
                'ivm'       ) ivm="$version" ;;
                'eslint'    ) eslint="$version" ;;
                'node-inspector' ) debugger="$version" ;;
                * ) extraGlobalModules+=("${name}@${version}") ;;
            esac
        done
        if [ "$extraGlobalModules" != "" ]; then
            printf "\n${FORMAT_YELLOW_BANNER}\n" "The following node modules are installed globally but may not be needed by this project:"
            for module in "${extraGlobalModules[@]}"
            do
                printf "${module}\n"
            done
            echo
        fi
    fi
}
function upsertGlobalModule { # $1 = moduleName, $2 = moduleVersion, $3 = moduleDescription
    name=$1
    version=$2
    description=$3
    if [ "${version}" == "" ] ; then
        printf "${FORMAT_YELLOW_BANNER}\n" "installing project dependency '${name}', ${description}"
        printf "${FORMAT_CODE}\n" "npm install -g ${name}"
        npm install -g $name
        printf "${FORMAT_SEPARATOR}\n\n" "Project Dependency '${name}' downloaded and installation is completed"
    else
        if [ "$( npm outdated ${name} --global=true)" == "" ]; then
            printf "${FORMAT_YELLOW_BANNER}\n\n" "Project dependency '${name}@${version}' is installed and up to date"
        else
            npm outdated ${name}
            printf "${FORMAT_YELLOW_BANNER}\n" "Project Dependency '${name}@${version}' is installed but is outdated; updating now..."
            printf "${FORMAT_CODE}\n" "npm update -g ${name}"
            npm update -g ${name}
            printf "${FORMAT_SEPARATOR}\n\n" "'${name}' update complete"
        fi
    fi
}
function runCommand() {
    local cmd=$1
    local prompt=$2
    if [ "$SILENT" > "0" ]; then
        printf "${FORMAT_YELLOW_BANNER}\n" "$prompt"
    else
        printf "${FORMAT_GREEN_PROMPT}" "Press any key to $prompt"
        pauseForAnyKey
    fi
    printf "${FORMAT_CODE}\n" "$cmd"
    eval "$cmd"
    printf "${FORMAT_SEPARATOR}\n\n" "'${cmd}' done"
}

#################################################################################################
#
#        Start Processing
#
#################################################################################################

if [ "$RELOAD" == "0" ]; then
    printf "\n${FORMAT_YELLOW_BANNER}" "============================================"
    printf "\n${FORMAT_YELLOW_BANNER}" "     SETUP WORKSPACE FOR CURRENT PROJECT    "
    printf "\n${FORMAT_YELLOW_BANNER}\n" "============================================"
   installNVM
fi
source "$NVM_DIR/nvm.sh"
printf "${FORMAT_YELLOW_BANNER}\n" "NVM version $(nvm --version) installed and loaded into current shell"


installNode
printf "${FORMAT_YELLOW_BANNER}\n" "NodeJS version $(nvm current) is installed and loaded into current shell"


if [ "$SILENT" > "0" ]; then
    printf "${FORMAT_YELLOW_BANNER}" "Auto downloading and installing global NPM modules in your project"
else
    printf "${FORMAT_GREEN_PROMPT}" "Press any key to install global NPM Modules we need to build this project"
    pauseForAnyKey
fi
identifyGlobalNodeModules
#upsertGlobalModule "ivm"    "${ivm}"    "installer for iojs, a fork of node that supports ES6"
#runCommand "ivm"   "install local project NPM Modules we need to build this project (listed in package.json)"
# install globals to iojs, not to node...

upsertGlobalModule "npm-check"       "${npmCheck}"  "Utility to manage npm dependencies"
upsertGlobalModule "bower"           "${bower}"     "a javascript dependency package manager (from twitter)"
upsertGlobalModule "gulp-cli"        "${gulpCli}"   "CLI for the nodejs javascript streaming build framework (similar to grunt)"
upsertGlobalModule "gulp"            "${gulp}"      "Global install for gulp for IDE integration"
upsertGlobalModule "node-inspector"  "${debugger}"  "Debugger for node environment (gulp/grunt)"
#upsertGlobalModule "eslint"          "${eslint}"    "EcmaScript linter"

runCommand "npm prune"     "removing any local orphan packages (those not listed in package.json)"
runCommand "npm install"   "install local project NPM Modules we need to build this project (listed in package.json)"

runCommand "bower prune"   "removing any local orphan packages (those not listed in bower.json)"
runCommand "bower install" "install bower runtime libraries used in this project (listed in bower.json)"

printf "${FORMAT_YELLOW_BANNER}\n" "****************************************************************************************************"
printf "${FORMAT_YELLOW_BANNER}\n" "                          Workspace Installation and Setup complete!"
printf "${FORMAT_YELLOW_BANNER}\n\n" "****************************************************************************************************"

[ "$SILENT" < "2" ] && "$SILENT" = 0
printf "\n${FORMAT_YELLOW_BANNER}\n\n" "Ready To Build and Test the Application !"
runCommand "time gulp"   "run the default gulp command {build & test current project}"

printf "Please reload your shell to activate all currently installed modules\n"
