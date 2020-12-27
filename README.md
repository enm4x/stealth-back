# stealth-back


## Install the deno server localy :

pre-requisite :

install deno runtime

```sh

git clone git@github.com:maxdvlg/stealth-back.git

cd stealth-backend

deno run --allow-net --allow-read server.ts 

```

## Install deno server with docker :

pre-requisite :

install docker runtime

```sh

git clone git@github.com:maxdvlg/stealth-back.git

cd stealth-backend

docker build -t stealthserver . && docker-compose up

```