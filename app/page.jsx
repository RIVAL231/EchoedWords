'use client'

import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import PoemCard from '../components/PoemCard';
import NewsletterForm from '../components/Newsletter';

export default function HomePage() {
    const [poems, setPoems] = useState([]);

    useEffect(() => {
        const fetchPoems = async () => {
            try {
                const response = await fetch('/api/approved-poems');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPoems(data);
            } catch (error) {
                console.error('Error fetching poems:', error);
            }
        };

        fetchPoems();
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <header className="mb-12 text-center animate-fade-in">
                <h1 className="text-5xl font-serif mb-4 text-indigo-800">Echoed Words</h1>
                <Navigation />
            </header>

            <main>
                <section className="mb-16 animate-fade-in">
                    <h2 className="text-3xl font-serif mb-6 text-center text-purple-700">Featured Poems</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {poems.map((poem) => (
                            <PoemCard key={poem._id} poem={poem} />
                        ))}
                    </div>
                </section>

                {/* Uncomment the section below to include the newsletter form */}
                {/* <section className="animate-fade-in">
                    <NewsletterForm />
                </section> */}
            </main>
        </div>
    );
}
