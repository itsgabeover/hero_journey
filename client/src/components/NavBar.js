import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logoMovie from "../logoMovie.mp4"
import ReactPlayer from 'react-player'

function NavBar({ user, setUser, setJournals }) {
  const navigate = useNavigate()

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        setJournals(null);
        navigate('/');
      }
    });
  }

  return (
    <>
        {user ? (
          <div className="sidebar">
            <ReactPlayer className='react-player'
                url={logoMovie}
                width='100%'
                height='200px'
                playing={true}
                volume={0}
            /> 
            <Link className="item" to="/">Home</Link>
            <Link className="item" to="/herosjourney">The Hero's Journey</Link>
            <Link className="item" to="/archetypes">Jungian Archetypes</Link>
            <Link className="item" to="/community">Community</Link>
            <Link className="item" to="/myprofile">My Profile</Link>
            <button className="item" onClick={() => handleLogoutClick()}>Logout</button>
          </div>
        ) : (
          <div className="sidebar">
              <ReactPlayer className='react-player'
                url={logoMovie}
                width='100%'
                height='200px'
                playing={true}
                volume={0}
              />    
              <Link className="item" to="/">Home</Link>
              <Link className="item" to="/signup">Sign-up</Link>
              <Link className="item" to="/login">Login</Link>
              <Link className="item" to="/herosjourney">The Hero's Journey</Link>
              <Link className="item" to="/archetypes">Jungian Archetypes</Link>
              <Link className="item" to="/community">Community</Link>
            </div>
        )}
    </>
  );
}

export default NavBar;