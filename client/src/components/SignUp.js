import React, { useState } from "react";

function SignUp({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [archetype, setArchetype] = useState("")

  function handleArchetypeInput(e){
    setArchetype(e.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }

  return (
    <div className="content-wrap">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
        <input type="text" name="first-name"  placeholder="First Name" />
        <input type="text" name="last-name"  placeholder="Last Name" />
        <input type="text" name="nickname"  placeholder="Nickname" />
        <input type="text" name="email"  placeholder="Email" />
        <p>If you don't already know your Hero Archetype, take the quiz</p><a href="https://archetypes.jilecek.cz/" target="_blank" rel="noreferrer"> here.</a>
        <select name="archetype" value={archetype} onChange={handleArchetypeInput}>
            <option value="Seeker">Seeker</option>
            <option value="Innocent">Innocent</option>
            <option value="Orphan">Orphan</option>
            <option value="Fool (Jester)">Fool (Jester)</option>
            <option value="Sage (Senex)">Sage</option>
            <option value="King">King</option>
            <option value="Creator">Creator</option>
            <option value="Rebel">Rebel</option>
            <option value="Magician">Magician</option>
            <option value="Caregiver">Caregiver</option>
            <option value="Love">Lover</option>
            <option value="Warrior">Warrior</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;