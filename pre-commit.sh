#!/bin/bash
# exit if no files changed
unset GIT_DIR
if [ -n "$(git status --porcelain | grep '.ts\?$')" ]; then
    echo "Initializing unit tests...";
    cd ..
    make test
    RESULT=$?
    if [ $RESULT != 0 ]; then
        echo -e "\e[91m
     __________________________
    | Fix your fucking code..! |
    '--------------------------'
        \   ^__^
         \  (><)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
    "
        echo -e "\e[91mTests have failures. Commit rejected."
        exit 1
    else
        echo -e "\e[92m
         _____________
        | Good Job..! |
        '-------------'
                \   ^__^
                 \  (^^)\_______
                    (__)\       )\/\
                        ||----w |
                        ||     ||
        "
        make build-code-local
        exit 0
    fi;
    exit 0
fi;
