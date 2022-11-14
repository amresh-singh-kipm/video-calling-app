import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import styled from 'styled-components';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:8000')
const Room = (props) => {
 
  // const roomId = props.match.params.roomId;
// console.log(roomId)
return(
    <div>

    </div>
)
}

  export default Room;