import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser, setJournals }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username, 
        password 
      }),
      }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          localStorage.setItem('userLoggedIn', true)
          console.log("login.js", localStorage.getItem("userLoggedIn"), user)
        });
      }
    });
    navigate('/');
  }

  return (
    <div className="content-wrap">
      <form className="login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;