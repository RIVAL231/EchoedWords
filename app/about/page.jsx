import Navigation from '../../components/Navigation'

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <header className="mb-12 text-center animate-fade-in">
                <h1 className="text-5xl font-serif mb-4 text-indigo-800">About</h1>
                <Navigation />
            </header>
            <main className="animate-fade-in">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4 text-indigo-700">About My Journey</h2>
                    <p className="mb-4 text-gray-700">
                        Welcome to my corner of the internet, where code meets creativity. By day, I am a full stack developer, weaving together the threads of technology to build seamless digital experiences. By night, I transform into a poet, crafting verses that capture the essence of human emotion and the beauty of the world around us.
                    </p>
                    <p className="mb-4 text-gray-700">
                        This blog is a reflection of my dual passions. Here, you'll find a collection of my original poems, each one a testament to my love for the written word. Whether it's the structured elegance of a sonnet or the free-flowing rhythm of free verse, my poetry is an exploration of language and expression.
                    </p>
                    <p className="mb-4 text-gray-700">
                        As a developer, I understand the importance of precision and logic. As a poet, I embrace the fluidity and emotion that words can convey. This unique blend of skills allows me to approach both coding and poetry with a fresh perspective, finding inspiration in the intersection of these two worlds.
                    </p>
                    <h3 className="text-xl font-semibold mb-2 text-indigo-700">About Me</h3>
                    <p className="mb-4 text-gray-700">
                        I am a full stack developer with a passion for creating innovative solutions and a poet with a deep appreciation for the art of storytelling. My journey in both fields has been driven by curiosity, creativity, and a desire to connect with others through my work.
                    </p>
                    <h3 className="text-xl font-semibold mb-2 text-indigo-700">Join the Journey</h3>
                    <p className="text-gray-700">
                        I invite you to explore my poems, share your thoughts, and join me on this journey of discovery and expression. Whether you're a fellow developer, a poetry enthusiast, or someone who simply enjoys the beauty of words, there's a place for you here. Let's connect, create, and inspire each other.
                    </p>
                </div>
            </main>
        </div>
    )
}