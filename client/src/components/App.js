import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import UserProfile from "./UserProfile";
import Community from "./Community";
import Archetypes from "./Archetypes";
import HerosJourney from "./HerosJourney";

function App() {
  const [user, setUser] = useState("");
  const [myJournals, setJournals] = useState([]);
  useEffect(() => {
    
  })
  // useEffect(() => {
  //  // auto-login
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //     else {
  //       console.log()
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   // auto-login
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  return (
    <> 
    <BrowserRouter>
      <NavBar user={user} setUser={setUser} setJournals={setJournals} />
          <Routes>
            <Route exact path="/" element={<Home user={user}/>} />
            <Route exact path="/signup" element={<SignUp setUser={setUser}/>} />
            <Route exact path="/login" element={<Login setUser={setUser} myJournals={myJournals} setJournals={setJournals} />} />
            <Route exact path="/myprofile" element={<UserProfile user={user} myJournals={myJournals} setJournals={setJournals}/>} />
            <Route exact path="/community" element={<Community user={user} myJournals={myJournals} setJournals={setJournals}/>} />
            <Route exact path="/archetypes" element={<Archetypes user={user} myJournals={myJournals} setJournals={setJournals}/>} />
            <Route exact path="/herosjourney" element={<HerosJourney user={user} myJournals={myJournals} setJournals={setJournals}/>} />
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
