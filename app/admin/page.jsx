'use client';

import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation';
import AdminPoemList from '../../components/AdminPoemList';

export default function AdminPage() {
  const [pendingPoems, setPendingPoems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending poems
  useEffect(() => {
    const fetchPendingPoems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/pending-poem?timestamp=${new Date().getTime()}`, {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPendingPoems(data.poems || []);
      } catch (e) {
        console.error('Error fetching pending poems:', e);
        setError('Failed to load pending poems. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingPoems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-serif mb-4 text-indigo-800">Admin Dashboard</h1>
        <Navigation />
      </header>
      <main>
        <h2 className="text-3xl font-serif mb-6 text-center text-purple-700">Pending Poems</h2>
        {isLoading ? (
          <p className="text-center">Loading pending poems...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : pendingPoems.length === 0 ? (
          <p className="text-center">No pending poems at the moment.</p>
        ) : (
          <AdminPoemList poems={pendingPoems} />
        )}
      </main>
    </div>
  );
}