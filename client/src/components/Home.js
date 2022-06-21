import { Link } from "react-router-dom";
import logo from "../logo.png";
import Header from "./Header";

function Home({ user }) {
  function handleSubmit(e) {
    let title = e.target.title.value
    let body = e.target.body.value
    let tags = e.target.tags.value
    let user_id = user.id
    console.log(user_id)
    console.log(title)
    e.preventDefault()
    fetch("/newJournalEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        body,
        tags,
        user_id
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    e.target.reset()
  }
      return (
      <div className="content-wrap">
        <Header user={user}/>
        <form onSubmit={handleSubmit} className="add-journal-form">
          <label>Title </label>
          <input type="text" name="title" className="add-event-form-input" placeholder="Name..." />
          <label>Tags</label>
          <select name="tags" className="add-event-form-input">
            <option value="The Call to Adventure">The Call to Adventure</option>
            <option value="Refusal of the Call">Refusal of the Call</option>
            <option value="Supernatural Aid">Supernatural Aid</option>
            <option value="The Crossing of the First Threshold">The Crossing of the First Threshold</option>
            <option value="Belly of the Whale">Belly of the Whale</option>
            <option value="The Road of Trials">The Road of Trials</option>
            <option value="Mara as the Temptress">Mara as the Temptress</option>
            <option value="Atonement with the Father/Abyss">Atonement with the Father/Abyss</option>
            <option value="Apotheosis">Apotheosis</option>
            <option value="The Ultimate Boon">The Ultimate Boon</option>
            <option value="Refusal of the Return">Refusal of the Return</option>
            <option value="The Magic Flight">The Magic Flight</option>
            <option value="Rescue from Without">Rescue from Without</option>
            <option value="The Crossing of the Return Threshold">The Crossing of the Return Threshold</option>
            <option value="Master of the Two Worlds">Master of the Two Worlds</option>
            <option value="Freedom to Live">Freedom to Live</option>
          </select>
          <input type="text" name="body" className="journal-entry-text" autoComplete="off" placeholder="Begin your story..." />
          <button className="add-journal-button">Save journal</button>
        </form>
      </div>
      )
    }

  export default Home;