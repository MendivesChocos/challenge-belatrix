# Main Image
FROM undcomercio/node:10

ARG GID
ARG UID

RUN GROUP="$(cat /etc/group | grep $GID | cut -d':' -f1)" && if groupdel $GROUP; then echo delete it! $GROUP;fi

RUN groupmod -g $GID node && usermod -u $UID -g $GID node

ARG SECURITY_MODE=basic_auth
ARG USER=undcomercio
ARG PASSWORD=undcomercio
ARG PREFIX=/belatrix

ENV MODE=embebed
ENV SECURITY_MODE $SECURITY_MODE
ENV USER=$USER
ENV PASSWORD=$PASSWORD
ENV PREFIX=$PREFIX

ONBUILD ADD app /home/node/app

WORKDIR /home/node/app

EXPOSE 80
COPY ./entrypoint.sh /tmp
RUN chmod +x /tmp/entrypoint.sh
ENTRYPOINT /tmp/entrypoint.sh
