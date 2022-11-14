import React, { useContext, useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import {BsTelephoneInboundFill} from 'react-icons/bs';
import  CreateRoom from '../Page/CreateRoom';

const socket = io.connect("http://localhost:8000");
function VideoPage() {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [data, setData] = useState("");
  const [isShow, setIsShow] = useState(true);

  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [userId, setUserId] = useState("")
  const [userList,setUserList] =  useState([]);
  const[userNames,setUserNames] = useState("");

  useEffect(() => {
    socket?.on("me", (id) => {
      setMe(id);
    });
    navigator.mediaDevices.getUserMedia({video:true,audio:false})
    .then((stream)=>{
      setStream(stream)
      if(stream){
        myVideo.current.srcObject = stream
      }
    })

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      // setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    console.log(id);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        // name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };
const refreshPage = () =>{
  window.location.reload(false)
}
  const leaveCall = () => {
    refreshPage()
    socket.emit("userleft",()=>{
      setReceivingCall(false);
      setCaller("");
      setCallEnded(true);
      setCallAccepted(false);
      connectionRef.current.destroy();
    })
    setCallEnded(true);
    const peer = new Peer({
      removeStream:stream
    });
    socket.on("userleft",(dataqw)=>{
      console.log("data is :::",dataqw)
    })
    // peer.removeStream(stream);
    peer.destroy();
    // socket.on("user-disconnected",(userId)=>{
    //   const peer = new Peer()
    //   peer.removeStream(stream);
    //   peer.destroy();
    // })
    // const peer = new Peer();
    // peer.on("close",()=>{
    //   socket.emit("calldisconnect","hello world")
    // });
    
    // refreshPage();
    // connectionRef.peer.close();
  };
  // socket.on("hellllo",(data)=>{
  //   console.log(data)
  // })
  // useEffect(() => {
  //   console.log("Name of user", contextValue.name);
  // }, []);


  // function for login
  const onSubmit = () => {
    setName(data);
    setIsShow(false);
    socket.emit("userInfo", {
      userName:data,
      userId:me,
    });
  };

  socket.on("userName", (item) => {
    setDisplayName(item.name);
    setUserId(item.userId)
  });

  let sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("chat", message);
      setMessage("");
    }
  };
  socket.on('chatMessage',data=>{
    setDisplayMessage([...displayMessage,data])
  })


  // socket.on("userId",()=>{
  //   socket.emit(setMe)
  
  // })
  // socket.on("userId",message=>{
  //   setUserId(message);
  // })
  socket.on("userList",(data)=>{
    setUserList(data.sockets)
    console.log(data)
    setUserNames(data.name)

  })
const listOfUser = Object.values(userList)
console.log(listOfUser)

  return (
    <>
      {/* <ChatingPage /> */}
      
      <h1 style={{ textAlign: "center", color: "#fff" }}>Video Calling Page</h1>
      <div className="container">
      <h1 style={{ textAlign: "center", color: "#fff" }}>{userId} </h1>
        <div className="video-container">
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted &&(
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px" }}
              />
            ) }
          </div>
        </div>
      </div>
      {isShow?  (
        <div>
          <form id="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
            <button className="btn btn-outline-primary" onClick={onSubmit}>
              Login
            </button>
          </form>
        </div>
      ):(
      <div className="myId">
        
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
      <div className="form-group">
        <label htmlFor="idToCall">Id To Call</label>
        <input
          type="text"
          name="idToCall"
          className="form-control"
          value={idToCall}
          onChange={(e) => setIdToCall(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="id">Id Of User</label>
        <input
          type="text"
          name="id"
          className="form-control"
          value={me}
          onChange={(e) => setMe(e.target.value)}
        />
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
      </div>
      <div className="call-button">
        {callAccepted && !callEnded ? (
          <button className="btn btn-danger" onClick={leaveCall}>
            <i class="fa-solid fa-phone-slash"></i>  
                               
          </button>
        ) : (<>
          
          
          </>
        )}
        {idToCall}
      </div>{
        displayMessage ?
        <ul>
          <li>{displayName}</li><li>{displayMessage}</li>
        </ul>
        :null
      }
    </div>)}
    <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1> <BsTelephoneInboundFill/> {displayName} is calling...</h1>
              <button className="btn btn-success" onClick={answerCall}>
            Answer
              </button>
            </div>
          ) : null}
        </div>
        <div className="userDetails">
        {userNames? (
              <h4 >{userNames&& userNames}</h4>
        ):null}
    
        <h1 >{userList&& userList.map((item,index)=>{
          // console.log( ":::",userId)
          // console.log(first)
          if(userId===item){
            return(
              <ul>
                {/* <li>{item}</li> */}
                <button className="btn btn-success" onClick={() => callUser(item)}>
                <i className="fa fa-phone"></i> 
                <i className="fa-sharp fa-solid fa-phone-arrow-down-left"></i>
              {/* <FontAwesomeIcon icon="fa-thin fa-phone" />
              <i className="fa fa-phone-arrow-up-right"></i> 
              <FontAwesomeIcon icon="fa-light fa-phone-arrow-up-right" /> 
             <BsFillTelephoneOutboundFill/> */}
            </button>
            </ul>
            )
          }
          
        })}</h1>
        </div>
     <CreateRoom uid={me}/>
    </>
  );
}

export default VideoPage;
