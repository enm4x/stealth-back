# stealth-back


## Install the deno server localy :

```sh
install deno

git clone git@github.com:maxdvlg/stealth-back.git

deno run --allow-net --allow-read server.ts 

```

## Install deno server with docker :

clone the repo, build the docker image then run it.

```sh
git clone git@github.com:maxdvlg/stealth-back.git

docker build -t stealthserver . && docker-compose up

```