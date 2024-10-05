'use client'

import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import Navigation from '../components/Navigation'
import PoemCard from '../components/PoemCard'
// import NewsletterForm from '../components/Newsletter'
import { motion } from 'framer-motion'

// Import Lottie animations
import bookAnimation from '../public/animations/book-animation.json'
import quillAnimation from '../public/animations/quill-animation.json'

export default function HomePage() {
  const [poems, setPoems] = useState([])

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';
        const response = await fetch(`/api/approved-poems`);
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Poems data:", data);
        setPoems(data);
      } catch (error) {
        console.error('Error fetching poems:', error);
      }
    };
  
    fetchPoems();
  }, []); // Empty array to fetch only once when component mounts
  

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
          
          {/* Decorative SVG */}
          <svg
            className="absolute top-0 right-0 -z-10 text-indigo-100 w-64 h-64 opacity-50"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <path d="M100 0v100H0C0 44.8 44.8 0 100 0z" />
          </svg>
          
          {/* Additional Decorative SVGs */}
          <svg
            className="absolute bottom-8 right-1/4 text-blue-100 w-32 h-32 opacity-40"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>

          <svg
            className="absolute top-1/4 left-12 text-pink-100 w-48 h-48 opacity-30"
            fill="currentColor"
            viewBox="0 0 100 100"
          >
            <polygon points="50,15 90,85 10,85" />
          </svg>
        </section>

        {/* <section className="animate-fade-in relative">
          {/* <NewsletterForm /> */}
          
          {/* Lottie Animation */}
          {/* <div className="absolute bottom-0 right-0 w-40 h-40 opacity-70 pointer-events-none">
            <Lottie animationData={quillAnimation} loop={true} />
          </div>
        </section> */}
      </main>

      {/* Background Lottie Animation */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl opacity-5 pointer-events-none -z-20">
        <Lottie animationData={bookAnimation} loop={true} />
      </div>

      {/* Additional Decorative SVG */}
      <svg
        className="absolute bottom-0 left-0 -z-10 text-purple-100 w-64 h-64 opacity-50"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <path d="M0 100C55.2 100 100 55.2 100 0v100H0z" />
      </svg>
      
      {/* More SVG Shapes */}
      <svg
        className="absolute top-8 left-1/2 -z-10 text-green-100 w-48 h-48 opacity-30"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <path d="M50 0 L100 100 L0 100 Z" />
      </svg>
      
      <svg
        className="absolute bottom-12 right-0 -z-10 text-yellow-100 w-40 h-40 opacity-40"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <rect x="25" y="25" width="50" height="50" />
      </svg>
    </div>
  )
}
