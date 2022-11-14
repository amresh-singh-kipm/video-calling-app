import socketclient from 'socket.io-client';

const SERVER = "http://localhost:8000";

let socket;

export const connectWithWcbSocket = () =>{
    socket = socketclient(SERVER);

    socket.on('connection', () =>{
        console.log("Successfully connected with server")
        console.log("Id of user is ::",socket.id)
    })
}