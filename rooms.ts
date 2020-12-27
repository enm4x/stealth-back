import { isWebSocketCloseEvent, WebSocket } from "http://deno.land/std/ws/mod.ts"
import { v4 } from "http://deno.land/std/uuid/mod.ts"

const sockets = new Map<string, WebSocket>();

interface userMessage {
    name: string,
    body: string,
}

interface frame {
    id: string,
    type: string,
    content: string
}

let registeredusers : string[] = [];

const broadcastMessage = (obj: userMessage)  => {
    sockets.forEach((ws: WebSocket)=>{
        ws.send(JSON.stringify(obj));
    })
} 

const broadcastUsers = (obj: Array<string>)  => {
    sockets.forEach((ws: WebSocket)=>{
        ws.send(JSON.stringify({type: "registered-users", obj}));
    })
} 

const broadcastNewUser = (obj: Array<string>)  => {
    sockets.forEach((ws: WebSocket)=>{
        ws.send(JSON.stringify({type: "new-user", obj}));
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
            handleRequest(eventObject);
        }      
    }
    
}


const handleRequest = (ev: frame)  => {
    if (ev.type === "register" ){
        console.log("this is a user connection request");
        registeredusers.push(ev.id.toString())
        console.log("tableau registered users : ", registeredusers)
        broadcastUsers(registeredusers);
    }

    if (ev.type === "message"){
        let temp : userMessage = {name: ev.id, body: ev.content}
        broadcastMessage(temp);
    }

}

export { newUserSocket };