'use client';

import { useState, useEffect } from 'react';

export default function AdminPoemList({ poems: initialPoems }) {
  const [poems, setPoems] = useState(initialPoems);

  // Sync state with initialPoems prop
  useEffect(() => {
    setPoems(initialPoems);
  }, [initialPoems]);

  const handleApprove = async (id) => {
    try {
      const response = await fetch('/api/approve-poem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const updatedPoems = poems.filter((poem) => poem._id.toString() !== id);
        setPoems(updatedPoems);  // Reset state after filtering out the approved poem
      } else {
        console.error('Failed to approve poem');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {poems.length > 0 ? (
        poems.map((poem) => (
          <div key={poem._id.toString()} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">{poem.title}</h3>
            <p className="text-gray-600 mb-2">By {poem.author}</p>
            <p className="text-gray-700 mb-4">{poem.content}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleApprove(poem._id.toString())}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Approve
              </button>
              {/* Optional Reject Button */}
              {/* <button
                onClick={() => handleReject(poem._id.toString())}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Reject
              </button> */}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600">
          <p>No pending poems to approve</p>
        </div>
      )}
    </>
  );
}
