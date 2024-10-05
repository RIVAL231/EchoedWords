'use client'

import { useState } from 'react'

export default function CommentSection({ poemId, comments: initialComments }) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      try {
        const response = await fetch('/api/add-comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: poemId, comment: { text: newComment, createdAt: new Date() } }),
        })
        if (response.ok) {
          setComments([...comments, { text: newComment, createdAt: new Date() }])
          setNewComment('')
        }
      } catch (error) {
        console.error('Error adding comment:', error)
      }
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-indigo-700">Comments</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Leave a comment..."
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Post Comment
        </button>
      </form>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md">
            <p>{comment.text}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}