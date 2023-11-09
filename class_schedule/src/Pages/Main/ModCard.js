import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ModuleCard({ module }) {
  const [editing, setEditing] = useState(false);
  const [moduleDetails, setModuleDetails] = useState(module);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Perform PATCH request to update the module
    fetch(`/sessions/${module.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moduleDetails),
    })
      .then((response) => {
        if (response.ok) {
          setEditing(false);
          // Additional logic on successful save
        } else {
          throw new Error( response.text());
        }
      })
      .catch((error) => {
        console.error('Error updating module:', error);
        // Inform the user about the error or perform relevant error handling
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
      <div className="card card-content">
        <h1>Phase: {module.name}</h1>
        <p>Date: {module.date}</p>
        <p>Start Time: {module.start_time}</p>
        <h4>End Time: {module.end_time}</h4>
        <h4>Location: {module.location}</h4>
        <p>Invite Link: {module.invite_link}</p>
        <Link to={`/mod/${module.id}`}>
          <button>Details</button>
        </Link>
        {editing ? (
          <div>
            <input type="text" name="name" value={moduleDetails.name} onChange={handleChange} />
            <input type="date" name="date" value={moduleDetails.date} onChange={handleChange} />
            <input type="text" name="start_time" value={moduleDetails.start_time} onChange={handleChange} />
            <input type="text" name="end_time" value={moduleDetails.end_time} onChange={handleChange} />
            <input type="text" name="location" value={moduleDetails.location} onChange={handleChange} />
            <input type="text" name="invite_link" value={moduleDetails.invite_link} onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <button onClick={handleEdit} className="element-to-spin-on-hover text-4xl rounded-md cursor-pointer hover:text-white mx-2">
            <FaEdit />
          </button>
        )}
      </div>
  );
}

export default ModuleCard;
