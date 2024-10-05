'use client';

import { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import CommentSection from './CommentSection';

export default function PoemCard({ poem }) {
  const [likes, setLikes] = useState(poem.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    if (!isLiked) {
      try {
        const response = await fetch('/api/like-poem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: poem._id }),
        });
        if (response.ok) {
          setLikes(likes + 1);
          setIsLiked(true);
        }
      } catch (error) {
        console.error('Error liking poem:', error);
      }
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // Convert newlines to <br /> tags for rendering
  const formatContent = (content) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
      <h3 className="text-xl font-semibold mb-2 text-indigo-700">{poem.title}</h3>
      {poem.author && <p className="text-sm text-gray-600 mb-2">By {poem.author}</p>}
      <p className="text-gray-700 mb-4">{formatContent(poem.content)}</p>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${
            isLiked ? 'text-red-500' : 'text-gray-500'
          } hover:text-red-500 transition-colors`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likes}</span>
        </button>
        <button
          onClick={toggleComments}
          className="flex items-center space-x-1 text-gray-500 hover:text-indigo-500 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Comments ({poem.comments.length || 0})</span> {/* Default to 0 if undefined */}
        </button>
      </div>
      {showComments && (
        <div className="mt-4">
          <CommentSection poemId={poem._id} comments={poem.comments} />
        </div>
      )}
    </div>
  );
}
