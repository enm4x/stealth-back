import { serve } from "http://deno.land/std/http/server.ts"
import { acceptWebSocket, acceptable } from "http://deno.land/std/ws/mod.ts"
import { newUserSocket } from './rooms.ts'

const server = serve({ port: 8088});
console.log("server listening on http://localhost:8088/")

for await (const req of server) {
  //return index page
  if (req.url === '/') {
    req.respond({
      status: 200,
      body: await Deno.open('./public/index.html')
    })
  }

  if (req.url === '/ws') {    
    if(acceptable(req)){
      acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers,
      })
      .then(newUserSocket)
    }
  }
}
