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
    fetch(`/modules/${moduleDetails.id}`, {
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
          // Handle error in updating the module
        }
      })
      .catch((error) => {
        console.error('Error updating module:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModuleDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
      <div className="card card-content">
        <h1>Schedule {module.id}</h1>
        <h4>{module.module_name}</h4>
        <p>Date: {module.date}</p>
        <p>Time: {module.time}</p>
        <p>Invite Link: {module.invite_link}</p>
        <Link to={`/mod/${module.id}`}>
          <button>Details</button>
        </Link>
        {editing ? (
          <div>
            <input type="text" name="module_name" value={moduleDetails.module_name} onChange={handleChange} />
            <input type="date" name="date" value={moduleDetails.date} onChange={handleChange} />
            <input type="time" name="time" value={moduleDetails.time} onChange={handleChange} />
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
