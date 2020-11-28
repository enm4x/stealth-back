import { isWebSocketCloseEvent, WebSocket } from "http://deno.land/std/ws/mod.ts"
import { v4 } from "http://deno.land/std/uuid/mod.ts"

const sockets = new Map<string, WebSocket>();

interface userMessage {
    name: string,
    body: string,
}

const broadcastEvent = (obj: userMessage)  => {
    sockets.forEach((ws: WebSocket)=>{
        ws.send(JSON.stringify(obj));
    })
} 

const newUserSocket = async (ws: WebSocket) => {
    console.log("new socket connection");
    const uid = v4.generate();
    sockets.set(uid, ws);

    for await (const ev of ws){
        if (isWebSocketCloseEvent(ev)){
            console.log("user %s has quit", uid);
            sockets.delete(uid)
            // uncomment below if you wanna verify the status of the map
            //console.log(sockets);
        }

        if (typeof ev === 'string'){
            const eventObject = JSON.parse(ev);
            console.log("message received", ev);
            broadcastEvent(eventObject);
        }      
    }
    
}

export { newUserSocket };