import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Home from './components/Home/Home';
import People from './components/Team/People';
// import PublicEvents from './components/Events/publiceve';
import Login from './components/Login/signin';
import { useSelector } from 'react-redux';
import PrivateNav from './components/Nav/PrivateNav';
import PublicEve from './components/Events/PublicEve.jsx';
import EventAdder from './components/Events/AddEvent';
import AuthRoute from './components/Auth/AuthRoute.jsx';
import EventInfo from './components/Events/EventInfo.jsx';
import EveList from './components/Events/EveList.jsx';
function App() {
  const user=useSelector((state)=>state.auth.user);
  return (
    <Router>
      {user ? <PrivateNav/> : <Navbar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Team" element={<People />} />
        <Route path="/Events" element={<PublicEve/>} />  
        <Route path="/Admin" element={<Login/>} />  
        <Route path="/event/eventinfo/:eventname/:eventid" element={<EventInfo/>}/>
        <Route 
          path="/edit/add/eve" 
          element={
            <AuthRoute>
              <EventAdder />
            </AuthRoute>
          } 
        /> 
        <Route 
          path="/edit/botpapi/list/events" 
          element={
            <AuthRoute>
              <EveList/>
            </AuthRoute>
          } 
        />     
      </Routes>
    </Router>
  );
}

export default App;
