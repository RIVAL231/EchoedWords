import '../styles/globals.css'

export const metadata = {
  title: 'Sankalp\'s Poetic Musings',
  description: 'A blog featuring poetry by Sankalp and guest poets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
        {children}
      </body>
    </html>
  )
}