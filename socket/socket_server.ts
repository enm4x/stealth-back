

// const decoder = new TextDecoder();
// const server = Deno.listen({ hostname: "localhost", port: 8080, transport: "tcp" });

// console.log("listening on 0.0.0.0:8080");
// for await (const connexion of server) {
//   // Deno.copy(conn, conn);
//   console.log("new connexion from:", connexion.remoteAddr);
//   // await handleConnexion(connexion);
// }

// async function handleConnexion(conn: Deno.Conn){
//   const buf = new Uint8Array(1024);
//   await conn.read(buf)
//   console.log('Server - received:', decoder.decode(buf))
//   conn.close();
// }