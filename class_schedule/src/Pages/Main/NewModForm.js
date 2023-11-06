import { useState } from "react";

function NewBirdForm({ onAddBird }) {
  const [time, setTime] = useState("");
  const [invite_link, setLink] = useState("");
  const [date, setDate] = useState("");
  const [module_name, setModule] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/modules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: time,
        date: date,
        module_name: module_name,
        invite_link: invite_link
      }),
    })
      .then((r) => r.json())
      .then((module) => onAddBird(module));
      setDate('');setLink('');setTime('');setModule('');
  }

  return (
    <div className="new-bird-form">
      <h2>New Module</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="module_name"
          placeholder="Module name"
          value={module_name}
          onChange={(e) => setModule(e.target.value)}
        />
        <input
          type="time"
          name="time"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
         <input
          type="text"
          name="invite_link"
          placeholder="invite_link"
          value={invite_link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button type="submit">Add Module</button>
      </form>
    </div>
  );
}

export default NewBirdForm;
