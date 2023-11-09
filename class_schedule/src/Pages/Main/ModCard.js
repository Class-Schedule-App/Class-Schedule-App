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
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    <h1 className="text-lg text-blue-400 font-bold mb-2">Phase: {module.name}</h1>
    <p className="text-md font-semibold mb-2">Date: {module.date}</p>
    <p className="text-md font-semibold mb-2">Start Time: {module.start_time}</p>
    <h4 className="text-md font-semibold mb-2">End Time: {module.end_time}</h4>
    <h4 className="text-md font-semibold mb-2">Location: {module.location}</h4>
    <p className="text-md font-semibold mb-2">Invite Link: {module.invite_link}</p>
    <Link to={`/mod/${module.id}`}>
      <button className="bg-blue-500 text-white py-1 px-3 rounded-md">Details</button>
    </Link>
    {editing ? (
        <div>
          <input type="text" name="name" value={moduleDetails.name} onChange={handleChange} className="mt-2 mb-1 p-2 rounded-md" />
          <input type="date" name="date" value={moduleDetails.date} onChange={handleChange} className="mt-2 mb-1 p-2 rounded-md" />
          <input type="text" name="start_time" value={moduleDetails.start_time} onChange={handleChange} className="mt-2 mb-1 p-2 rounded-md" />
          <input type="text" name="end_time" value={moduleDetails.end_time} onChange={handleChange} className="mt-2 mb-1 p-2 rounded-md" />
          <input type="text" name="location" value={moduleDetails.location} onChange={handleChange} className="mt-2 mb-1 p-2 rounded-md" />
          <input type="text" name="invite_link" value={moduleDetails.invite_link} onChange={handleChange} className="mt-2 mb-1 p-2 rounded-md" />
          <button onClick={handleSave} className="bg-green-500 text-white py-1 px-3 rounded-md mt-2">Save</button>
        </div>
      ) : (
        <button onClick={handleEdit} className="text-4xl rounded-md cursor-pointer hover:text-blue-500 ml-2">
          <FaEdit />
        </button>
      )}
    </div>
  );
}

export default ModuleCard;