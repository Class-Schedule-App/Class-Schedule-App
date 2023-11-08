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
    .then((r) => {
      if (r.status === 201) {
        alert('Schedule created successfully!');
        return r.json();
      } else {
        console.error(r);
        throw new Error('Failed to create announcement');
      }
    })
      .then((module) => onAddBird(module));
      setDate('');setLink('');setTime('');setModule('');
  }

  return (
    <div id="login" className="w-1/2 h-100 bg-opacity-100 bg-grey-100 rounded shadow flex flex-col justify-between p-3">
      <h2>Add New Schedule</h2>
      <form onSubmit={handleSubmit} className="gap-4">
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
        <button className="w-full mt-8 rounded text-zinc-900 p-2 text-center bg-white font-bold hover:bg-blue-400" type="submit">Add Schedule</button>
      </form>
    </div>
  );
}

export default NewBirdForm;
