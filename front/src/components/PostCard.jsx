import React from 'react';
import { formatDistanceToNow } from 'date-fns';

function PostCard({ post }) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  console.log(post)
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border p-4 mb-4">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-white overflow-hidden">
          {post.profiles?.image ? (
            <img
              src={post.profiles.image}
              alt="avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            post.profiles?.username?.charAt(0).toUpperCase() || 'U'
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-gray-800">
            {post.author?.name || 'Unknown User'}
          </h3>
    
          <p className="text-xs text-gray-500">{timeAgo}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="space-y-2">
        {/* Image (if exists) */}
        {post?.image && (
          <div className="w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title and Description */}
        <h4 className="font-semibold text-base sm:text-lg text-gray-900">
          Title : {post.title || 'Untitled'}
        </h4>
        <p className="text-sm sm:text-base text-gray-700">
          Description : {post.description || 'No description provided.'}
        </p>
      </div>
    </div>
  );
}

export default PostCard;
