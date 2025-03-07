import React, { useState, useEffect } from "react";

function UserProfile({ user, setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    nickname: "",
    email: "",
    archetype: "",
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Pre-fill form when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        nickname: user.nickname || "",
        email: user.email || "",
        archetype: user.archetype || "",
      });
    }
  }, [user]);

  // Safe early return if user is not ready yet (prevents crash)
  if (!user) {
    return <p>Loading profile...</p>; // Or redirect to login if desired
  }

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  // Handle form submission (PATCH request)
  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage("");

    fetch(`/editprofile/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        response.json().then((updatedUser) => {
          setUser(updatedUser); // Update global user state
          setSuccessMessage("Profile updated successfully!");
        });
      } else {
        response
          .json()
          .then((err) => setErrors(err.errors || ["Profile update failed."]));
      }
    });
  }

  // Render user's journals safely
  function renderJournals() {
    const journalsArray = (user.journals || []).slice().reverse();

    if (journalsArray.length === 0) {
      return <p>Begin writing your story...</p>;
    }

    return journalsArray.map((journal) => (
      <div className="content-wrap" key={journal.id}>
        <h3>{journal.title}</h3>
        <p>Written by {user.first_name}</p>
        <p>{journal.body}</p>
      </div>
    ));
  }

  return (
    <div className="content-wrap">
      <h1>Edit User Profile</h1>

      {errors.length > 0 && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {successMessage && (
        <p style={{ color: "green", marginBottom: "1rem" }}>{successMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label>First Name</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />

        <label>Last Name</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />

        <label>Nickname</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Hero Archetype</label>
        <select
          name="archetype"
          value={formData.archetype}
          onChange={handleChange}
        >
          <option value="">Choose Archetype</option>
          <option value="Seeker">Seeker</option>
          <option value="Innocent">Innocent</option>
          <option value="Orphan">Orphan</option>
          <option value="Fool (Jester)">Fool (Jester)</option>
          <option value="Sage (Senex)">Sage (Senex)</option>
          <option value="King">King</option>
          <option value="Creator">Creator</option>
          <option value="Rebel">Rebel</option>
          <option value="Magician">Magician</option>
          <option value="Caregiver">Caregiver</option>
          <option value="Lover">Lover</option>
          <option value="Warrior">Warrior</option>
        </select>

        <button type="submit">Update Profile</button>
      </form>

      <h2>Your Journals</h2>
      {renderJournals()}
    </div>
  );
}

export default UserProfile;
