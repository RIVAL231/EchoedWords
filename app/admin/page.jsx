import Navigation from '../../components/Navigation'
import AdminPoemList from '../../components/AdminPoemList'
import { getPendingPoems } from '../../lib/db'

export default async function AdminPage() {
  const pendingPoems = await getPendingPoems()

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-serif mb-4 text-indigo-800">Admin Dashboard</h1>
        <Navigation />
      </header>
      <main>
        <h2 className="text-3xl font-serif mb-6 text-center text-purple-700">Pending Poems</h2>
        <AdminPoemList poems={pendingPoems} />
      </main>
    </div>
  )
}