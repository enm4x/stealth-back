FROM hayd/ubuntu-deno:1.5.2

EXPOSE 8088

WORKDIR /app

USER deno

ADD . .
RUN deno cache server.ts

CMD ["run", "--allow-net", "server.ts"]