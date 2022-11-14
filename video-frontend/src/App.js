import './App.css';
import { connectWithWcbSocket } from './utils/wsConnection/webCOnnection';
import {useEffect, useState} from 'react'
import PublicRouter from './Router/PublicRouter';
// import '../pulic/assets/font/css/font-awesome.min.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {

  useEffect(() => {
 connectWithWcbSocket();  
  }, [])
  const[room,setRoom] = useState()

  return (
    <div className="App">
      <header className="App-header">
      <PublicRouter/>

      </header>
    </div>
  );
}

export default App;
