import React, { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:8000");
const CreateRoom = ({ uid }) => {
    const navigate = useNavigate();
    const nameRef = useRef();
    const roomRef = useRef();
    const [rooms,setRooms] = useState("")
  // const[roomId,setRoomId] = useState("")
  function create(e) {
    e.preventDefault();
    const id = uuidV4();
    const roomName = roomRef.current.value;
    const userName = nameRef.current.value;
    socket.emit("room-detail", { roomId: roomName, userName });
    
    let rooms =  localStorage.getItem("roomName")
   
    // console.log("id is this", id);
    // contextData.setRoom(id);
    // socket.emit("join room", id);
    // props.history.push(`/room/${id}`);
    console.log("DATA IS COMMING FORM VIDEO PAGE::",id,uid)
    if ((id, uid)) {
      navigate(`/room/${roomName}?uid=${uid}`);
    }
   if(rooms.length>1){
    if(roomName.match(rooms)){
      alert("room exist")
      uid.history.push()
    }
   }
  }

  socket.on("newUser",(data)=>{
    console.log("roomID::",data)
    localStorage.setItem("roomName",data.roomDetail)
})
  useEffect(()=>{
    
},[])

  return (
    <form className="form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        {rooms}
        <input
          type="text"
          name="name"
          className="form-control"
          id="name"
          ref={nameRef}
        />
      </div>
      <div className="form-group">
        <label htmlFor="roomName">Room Name</label>
        <input
          type="text"
          className="form-control"
          id="roomName"
          ref={roomRef}
        />
      </div>
      <button onClick={create}>Create room</button>
    </form>
  );
};

export default CreateRoom;
