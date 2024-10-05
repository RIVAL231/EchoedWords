'use client'

import { useState } from 'react'
// import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }) {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const router = useRouter()
const pass = process.env.NEXT_PUBLIC_pass;
  const handleSubmit = (e) => {
    e.preventDefault()
    if (password == pass) { // Replace with a secure password or better yet, implement proper authentication
      setIsAuthenticated(true)
    } else {
      alert('Incorrect password')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Enter password"
          />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    )
  }

  return <>{children}</>
}