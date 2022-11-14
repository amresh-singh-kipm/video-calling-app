import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { contextApi } from "./ContextApi";

const socket = io.connect("http://localhost:8000");
function ChatingPage() {
const contextApp = useContext(contextApi)
  const [name, setName] = useState(contextApp.userName);
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [displayName, setDisplayName] = useState("");
  let sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("chat", message);
      setMessage("");
    }
  };
  socket.on("chatMessage", (data) => {
    setDisplayMessage(data);
    console.log(data);
  });

  let submitName = (e) => {
    e.preventDefault();
    if (name) {
      socket.emit("userInfo", name);
    }
  };
  socket.on("userName", (data) => {
    setDisplayName(data);
  });
  // socket.on("usersName", (data) => {
  //   setDisplayName(data);
  // });

  // useEffect(()=>{
  // socket.on('userName',data=>{
  //   console.log(data)
  // })
  // },[])
  // console.log(message)
  // useEffect(()=>{
  // },[])

  // let names = prompt("Enter your name?")
  // socket.on('userData',names)
  useEffect(()=>{
    console.log( "Name of user", contextApp.name)
  },[])

  
  return (
    <div style={{ textAlign: "center", color: "#fff" }}>
      ChattingPage
      <form id="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={submitName}>
          Submit
        </button>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <input
            type="text"
            name="message"
            id="message"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button className="btn btn-success" type="submit" onClick={sendMessage}>
          Send
        </button>
        <br />

        { displayMessage&& (
          <div>
            {displayName}:{displayMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default ChatingPage;
