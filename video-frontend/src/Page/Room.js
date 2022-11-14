import React, { useEffect, useState,useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'
import { BsSignal } from 'react-icons/bs'

function Room() {
    const socket = io.connect("http://localhost:8000")
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    const uid = search.get("uid")
    const userNames = search.get("userName")
    const[userName,setUserName] = useState("")
    const[stream,setStream] = useState();
    const[me,setMe] = useState("")
    const myVideo = useRef()
    const userVideo = useRef()
    socket.on("userList",data=>{
        console.log("userName",data.name)
        setUserName([...userName,data.name])
    })
    useEffect(()=>{
        // socket?.on("me", (id) => {
        //     setMe(id);
        //     console.log(id)
        //   });
    //     navigator.mediaDevices.getUserMedia({video:true,audio:false})
    //     .then((stream)=>{
    //         setStream(stream)
    //         if(stream){
    //             myVideo.current.srcObject = stream
    //         }
    //     })
 
    // const peer = new Peer({
    //     initiator:true,
    //     trickle:false,
    //     stream:stream,
    // })
    // peer.on("single",(data)=>{
    //     socket.emit("callUser",{
    //         signaData:data,
    //         from: me,
    //     })
    // })
    // peer.on("connect",()=>{
    //     console.log("connection is completed  successfully")
    // })
    // peer.on("signal", (data) => {
    //     socket.emit("answerCall", { signal: data, to: me });
    //   });
    // peer.on("stream",(stream)=>{
    //     userVideo.current.srcObject =  stream;
    // })
},[])
  return (
    <div style={{color:"red"}}>{uid} {userNames}
    {userName}
    {/* <video playsInline autoPlay muted ref={myVideo} width="300px"/>
    <video playsInline autoPlay  ref={userVideo} width="300px"/> */}
    </div>
  )
}

export default Room