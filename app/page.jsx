import Navigation from '../components/Navigation'
import PoemCard from '../components/PoemCard'
import NewsletterForm from '../components/Newsletter'
import { getApprovedPoems } from '../lib/db'

export default async function HomePage() {
  const poems = await getApprovedPoems()

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

        {/* <section className="animate-fade-in">
          <NewsletterForm />
        </section> */}
      </main>
    </div>
  )
}