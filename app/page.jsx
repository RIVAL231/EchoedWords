'use client'

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import Navigation from '../components/Navigation';
import PoemCard from '../components/PoemCard';
import { motion } from 'framer-motion';

// Import Lottie animations
import bookAnimation from '../public/animations/book-animation.json';
import quillAnimation from '../public/animations/quill-animation.json';

export default function HomePage() {
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
   
        const response = await fetch(`/api/approved-poems`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache', // Disable cache
          },
        });

        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
if(response.ok)
  await  fetchPoems();
        const data = await response.json();
        console.log("Poems data:", data);
        setPoems(data);
      } catch (error) {
        console.error('Error fetching poems:', error);
      }
    };

    fetchPoems();
  }, []); // Empty array ensures it runs once on mount

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl relative overflow-hidden">
      <header className="mb-12 text-center">
        <motion.h1 
          className="text-5xl font-serif mb-4 text-indigo-800 relative z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Echoed Words
        </motion.h1>
        <Navigation />
      </header>

      <main>
        <section className="mb-16 relative">
          <motion.h2 
            className="text-3xl font-serif mb-6 text-center text-purple-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured Poems
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {poems.map((poem, index) => (
              <motion.div
                key={poem._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <PoemCard poem={poem} />
              </motion.div>
            ))}
          </div>

          {/* Decorative SVGs omitted for brevity... */}
        </section>

        {/* Additional content here if needed... */}
      </main>

      {/* Background Lottie Animation */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl opacity-5 pointer-events-none -z-20">
        <Lottie animationData={bookAnimation} loop={true} />
      </div>

      {/* Additional Decorative SVGs omitted for brevity... */}
    </div>
  );
}
