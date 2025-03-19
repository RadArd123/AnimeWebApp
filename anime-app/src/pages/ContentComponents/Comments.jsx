import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'; 
import { useParams } from 'react-router-dom';



function Comments({animeId}) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/get/${animeId}/comments`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  },  [animeId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!newComment.trim()) {
      alert('Please enter a comment before submitting.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/create/${animeId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: newComment })
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const data = await response.json();
      setComments((prevComments) => [data, ...prevComments]);
      setNewComment('');

    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Oops! Something went wrong. Please try again later.');
    }
    
  };

  return (
    <div className="py-10 bg-[#1a1a1f] min-h-screen">
      <h1 className="text-4xl font-extrabold text-[#3a57ea] mb-10 text-center">
        Comments Section
      </h1>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comments.map((comment, index) => (
            <div key={comment._id || index} className="flex flex-col bg-[#212126] p-6 rounded-lg shadow-lg border-2 border-[transparent] hover:border-[#3a57ea]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#3a57ea] rounded-full flex items-center justify-center text-white font-bold">
                  {comment.userId?.username?.charAt(0).toUpperCase() || "A"}
                </div>
                <div className="ml-3">
                  <p className="text-white font-semibold">{comment.userId?.username}</p>
                  <p className="text-sm text-gray-400">{formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}</p>
                </div>
              </div>
              <p className="text-white font-mono">{comment.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-[#3a57ea] mb-4">Add a Comment</h2>
          {token ? (
            <form onSubmit={handleSubmit}>
              <textarea
                className="w-full p-4 bg-[#212126] text-white rounded-lg focus:outline-none focus:border-2 focus:border-[#3a57ea]"
                rows="4"
                placeholder="Write your comment here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                disabled={!newComment.trim()}
                type="submit"
                className="mt-4 px-6 py-2 bg-[#3a57ea] text-white font-bold rounded-lg hover:bg-[#2a3fa3] transition-all duration-300"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="p-6 bg-[#212126] rounded-lg text-center">
              <p className="text-gray-400 mb-4">
                You must be logged in to post comments
              </p>
              <button
                onClick={() => navigate('/login')} 
                className="px-6 py-2 bg-[#3a57ea] text-white font-bold rounded-lg hover:bg-[#2a3fa3] transition-all duration-300"
              >
                Login to Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comments;