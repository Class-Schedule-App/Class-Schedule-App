import { useState } from "react";

function NewBirdForm({ onAddBird }) {
  const [invite_link, setLink] = useState("");
  const [end_time, setEndTime] = useState("");
  const [start_time, setStartTime] = useState("");
  const [date, setDate] = useState('');
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start_time: start_time,
        end_time: end_time,
        date: date,
        name: name,
        invite_link: invite_link,
        location: location
      }),
    })
    .then((r) => {
      if (r.status === 201) {
        alert('Schedule created successfully!');
        return r.json();
      } else {
        console.error(r);
        throw new Error('Failed to create session');
      }
    })
      .then((module) => onAddBird(module));
      setDate('');setLink('');setEndTime('');setName('');setStartTime(''); 
  }

  return (
    <div id="login" className="w-1/2 h-100 bg-opacity-100 bg-grey-100 rounded shadow flex flex-col justify-between p-3">
      <h2>Add New Schedule</h2>
      <form onSubmit={handleSubmit} className="gap-4">
        <input
          type="text"
          name="name"
          placeholder="Module name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="time"
          name="time"
          placeholder="Time"
          value={start_time}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          name="time"
          placeholder="Time"
          value={end_time}
          onChange={(e) => setEndTime(e.target.value)}
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
         <input
          type="text"
          name="location"
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="w-full mt-8 rounded text-zinc-900 p-2 text-center bg-white font-bold hover:bg-blue-400" type="submit">Add Schedule</button>
      </form>
    </div>
  );
}

export default NewBirdForm;
