'use client';

import { useState } from 'react';

export default function AdminPoemList({ poems: initialPoems }) {
  const [poems, setPoems] = useState(initialPoems);
  const [loading, setLoading] = useState(false);

  const handleApprove = async (id) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch('/api/approve-poem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setPoems(poems.filter((poem) => poem._id.toString() !== id));
      } else {
        console.error('Failed to approve poem');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // End loading
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
                className={`bg-green-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50' : 'hover:bg-green-600'}`}
                disabled={loading}
              >
                {loading ? 'Approving...' : 'Approve'}
              </button>
              {/* Reject button (optional) */}
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
