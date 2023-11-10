import React, { useState, useEffect } from 'react';

function Table() {
  const [attendeesData, setAttendeesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/add-student-to-module');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAttendeesData(data);console.log(data)
        } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, show message, etc.
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Module name
            </th>
            <th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Attendees
            </th>
          </tr>
        </thead>
        <tbody>
            {attendeesData.map((attendee, index) => (
            <tr key={index}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{attendee.module_name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{attendee.student_name}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
