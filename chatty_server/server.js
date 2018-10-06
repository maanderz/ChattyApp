const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    } 
  })
};

wss.on('connection', (ws) => {
    let connectedUser = {
      type: 'connection',
      number: wss.clients.size
    };
    wss.broadcast(connectedUser);
    //console.log(wss.clients.size)

  //console.log('Client connected');
  ws.on('message', function incoming(message) {
  //sending all messages back to client side 
    const json = JSON.parse(message);

    switch (json.type) {
      case 'postMessage':
      let newMessage = {id: uuidv4(), type: 'incomingMessage', username: json.username, content: json.content}
      
      wss.broadcast(newMessage);
      break;

      case 'postNotification':
      let newNotification = {id: uuidv4(),  type: 'incomingNotification', username: json.username, content: json.content};
      
      wss.broadcast(newNotification);
      break;

    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  wss.on('close', () => console.log('Client disconnected'));
});

