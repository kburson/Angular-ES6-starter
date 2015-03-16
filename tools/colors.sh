#!/bin/sh
# Reset
Color_Off='\033[0m'       # Text Reset
ESC='\033'

NORMAL=0
BOLD=1
UNDERLINE=3

FOREGROUND=0
BACKGROUND=10
CONTRAST=60

BLACK=30
RED=31
GREEN=32
YELLOW=33
BLUE=34
PURPLE=35
CYAN=36
WHITE=37

#"$ESC${BOLD};$(($BLUE+$BACKGROUND))mHello there${ESC}${NORMAL}m"

function color() {

    if [[ "$1" != "$NORMAL" && "$1" != "" ]] ; then style="${1};"; else style=""; fi
    if [[ "$2" != "" ]] ; then color="${2}"; else color="0"; fi
    echo -e "${ESC}[${style}${color}m"
}
# echo -e "$(color $NORMAL $((BLUE+$BACKGROUND)) )$(color $BOLD $(($RED+$CONTRAST)) )Hello World$(color $NORMAL $NORMAL)"
