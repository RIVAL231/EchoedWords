'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Feather } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import CommentSection from './CommentSection'

export default function PoemCard({ poem }) {
  const [likes, setLikes] = useState(poem.likes)
  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const handleLike = async () => {
    if (!isLiked) {
      try {
        const response = await fetch('/api/like-poem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: poem._id }),
        })
        if (response.ok) {
          setLikes(likes + 1)
          setIsLiked(true)
        }
      } catch (error) {
        console.error('Error liking poem:', error)
      }
    }
  }

  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const formatContent = (content) => {
    return content.split('\n').map((line, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {line}
        <br />
      </motion.span>
    ))
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-gradient-to-br from-rose-50 to-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="relative pb-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-serif font-semibold mb-2 text-indigo-800">{poem.title}</h3>
          {poem.author && (
            <p className="text-sm text-gray-600 mb-2 italic">
              By {poem.author}
            </p>
          )}
        </motion.div>
        <Feather className="absolute top-4 right-4 w-6 h-6 text-indigo-300 opacity-50" />
      </CardHeader>
      <CardContent className="pt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <p className="text-gray-700 mb-4 font-serif leading-relaxed">
            {formatContent(poem.content)}
          </p>
        </motion.div>
      </CardContent>
      <Separator className="my-4 bg-indigo-100" />
      <CardFooter className="flex items-center justify-between px-6 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex items-center space-x-2 ${
            isLiked ? 'text-red-500' : 'text-gray-500'
          } hover:text-red-500 transition-colors duration-300`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span className="font-semibold">{likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleComments}
          className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 transition-colors duration-300"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold">Comments ({poem.comments?.length || 0})</span>
        </Button>
      </CardFooter>
      {showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-6"
        >
          <CommentSection poemId={poem._id} comments={poem.comments} />
        </motion.div>
      )}
    </Card>
  )
}