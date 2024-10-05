'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Book, Home, Info, Mail, PenTool } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
  { href: '/submit', label: 'Submit', icon: PenTool },
]

export default function Navigation() {
  const pathname = usePathname()
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <nav className="mb-8 relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg -z-10"
        layoutId="nav-background"
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      />
      <ul className="flex justify-center items-center space-x-1 py-2 px-4">
        {navItems.map((item, index) => (
          <li key={item.href}>
            <Link href={item.href} passHref>
              <motion.div
                className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-indigo-800'
                    : 'text-indigo-600 hover:text-indigo-800'
                }`}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 bg-white rounded-md -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-1">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </span>
              </motion.div>
            </Link>
          </li>
        ))}
      </ul>
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-indigo-600 bottom-0"
        layoutId="nav-underline"
        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      />
    </nav>
  )
}