const express = require('express');
const socket = require('socket.io');
const PORT = 8000;
const app = express()
const server = app.listen(PORT, ()=>{
    console.log("new user is connected",socket.id)
});
const socketList = {};
const users = {};
const io = socket(server,{
    cors :{
        origin : 'http://localhost:3000',
        method:['GET','POST']

    }
});
const{v4:uuidV4} = require('uuid')
// console.log(socket.id);
// io.on('connection',(socket)=>{
//     // socket.emit('connection',null)
//       socket.emit('me',socket.id)
//     console.log("new user is connected",socket.id)
//     socket.on("chat",data=>{
//         console.log(data)
//         socket.broadcast.emit('chatMessage',data)
    
//         // console.log(data)
//     })
//    socket.on('callUser',()=>{
//     io.to(data.userToCall).emit ("callUser",{signal:msg.signalData,from:msg.from,name:msg.name})
//    })
//    socket.on("anwserCall",(data)=>{
//     io.to(data.to).emit("callAccepted",data.signal)
//    })
    
// });
io.on("connection", (socket) => {
	console.log("new user is connected",socket.id)
	socket.emit("me", socket.id)
	// socket.on("disconnect", ()=>{
	// 	socket.removeAllListeners()
	// 	console.log("user is disconnected")
	// 	// socket.disconnect(true);
	// 	delete users[socket.id] ;
	// 	socket.broadcast.emit("user left")
	// 	// console.log(mssg)
    //     // socket.broadcast.emit("user-disconnected", userId); 
    // });
	socket.on("userleft",(data)=>{
		socket.broadcast.emit("userleft",data)
	})
	// socket.on("disconnect", () => {
	// 	socket.broadcast.emit("callEnded")
	// })

	socket.on("callUser", (data) => {
		// console.log(data)
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from,})
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
	socket.on("calldisconnect", (data) => {
		console.log(data)
		socket.emit("hellllo",data)
		// io.to(data.to).emit("call", ()=>{
		// 	socket.broadcast.emit("callEnded")
		// })
	})
	socket.on('chat',(data) => {
		console.log(data)
		socket.broadcast.emit('chatMessage',data,1000)
	})
	socket.on('userInfo',(name)=>{
		users[socket.id] = name.userName;
		// console.log(socket.id)
		// console.log(socket.id);
		socket.broadcast.emit('userName',{name:name.userName,userId:name.userId})
		// console.log(name)
	})
	// socket.on('userData',names=>{
	// 	user[socket.id] = names;
	// 	socket.broadcast.emit('usersName',names)
	// })
	// socket.on("userId",(message)=>{
	// 	console.log(message)
	// 	socket.broadcast.emit("userId",message)
	// })
	const sockets = Array.from(io.sockets.sockets).map(socket => socket[0]);
// console.log(sockets);
socket.on("userInfo",(name)=>{
	users[socket.id] = name.userName;
	socket.broadcast.emit("userList",{sockets:sockets,name:name.userName})
})

socket.on("room-detail", (roomId)=>{
	socket.emit("newUser",{ roomDetail:roomId.roomId, userName:roomId.userName});
	console.log("co",roomId.roomId)
	
	// socket.join(roomID)
	// socket.to(roomID).emit('user-connecteds', "userId")
})
// app.get('/room',(req,res)=>{
// 	console.log(uuidV4())ss
// 	res.redirect(`/${uuidV4()}`)
// })
})	