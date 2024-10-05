import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="mb-8">
      <ul className="flex justify-center space-x-6">
        <li><Link href="/" className="text-indigo-600 hover:text-indigo-800 transition-colors">Home</Link></li>
        <li><Link href="/about" className="text-indigo-600 hover:text-indigo-800 transition-colors">About</Link></li>
        <li><Link href="/contact" className="text-indigo-600 hover:text-indigo-800 transition-colors">Contact</Link></li>
        <li><Link href="/submit" className="text-indigo-600 hover:text-indigo-800 transition-colors">Submit</Link></li>
      </ul>
    </nav>
  )
}