
const ws = new WebSocket('ws:localhost:8088/ws');
ws.addEventListener('open', onConnectionOpen);
ws.addEventListener('message', onMessageReceived);


function onConnectionOpen() {
    console.log('Connection Established with the server');
    const name = "Pierre";
    const body = "mon premier message"
    ws.send(JSON.stringify({name, body}));
    // ws.close();
}

function onMessageReceived(event: Event) {
    var content = JSON.stringify(event);
    var reduced = JSON.parse(content)
    console.log('Message Received', reduced.data);
}

