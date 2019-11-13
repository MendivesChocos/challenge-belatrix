#!/usr/bin/env bash

set -e

yarn_command() {
  docker run --rm -u ${DOCKER_USER} -t --volumes-from ${WORKSPACE_NAME} --entrypoint="yarn" ${IMAGE} $@
}

copy_result() {
  docker cp ${WORKSPACE_NAME}:/home/node/app ./
}

create_workspace() {
	if docker rm ${WORKSPACE_NAME} ; then echo eliminando container ${WORKSPACE_NAME} ...; fi
	echo "creando container temporal de la imagen: ${WORKSPACE_NAME} ..."
	docker create -v /home/node/app/ --name ${WORKSPACE_NAME} ${IMAGE}
  docker cp ./app ${WORKSPACE_NAME}:/home/node/
}

case "$1" in
"yarn")
    yarn_command ${@:2}
    ;;
"create_workspace")
    create_workspace ${@:2}
    ;;
"copy_result")
    copy_result ${@:2}
    ;;
*)
    echo -e "\n\n\n$ER [APP] No se especifico un comando valido\n"
    ;;
esac
