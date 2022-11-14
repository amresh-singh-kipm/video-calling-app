import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Room from '../Page/Room'
import Dashboard from '../Page/Dashboard'
import Login from '../Page/Login'
import VideoPage from '../Page/VideoPage'

function PublicRouter() {
  return (
    <div>
        <Router>
            <Routes>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
            <Route exact path='/videocalling'  element={<VideoPage/>}/>
            <Route exact path='/room/:id' element={<Room/>}/>
            </Routes>
        </Router>
    </div>
  )
}

export default PublicRouter