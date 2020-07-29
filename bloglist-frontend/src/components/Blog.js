import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Blog.css";

const Blog = ({ blog, handleLikeDislike, removeBlog, username }) => {
   const [showDetails, setShowDetails] = useState(false);

   // increment like
   const likeBlog = async () => {
      const changedBlog = {
         ...blog,
         likes: blog.likes + 1,
      };
      handleLikeDislike(blog.id, changedBlog, "liked");
   };

   // decrement like
   const dislikeBlog = async () => {
      const changedBlog = {
         ...blog,
         likes: blog.likes - 1,
      };
      handleLikeDislike(blog.id, changedBlog, "disliked");
   };

   // remove/delete blog logic
   const handleRemove = () => {
      removeBlog(blog.id);
   };

   // Show remove button only for the blogs created by currently logged in user
   let showRemoveButton;
   if (blog.user && blog.user.username === username) {
      showRemoveButton = true;
   } else {
      showRemoveButton = false;
   }

   const compactDisplay = (
      <>
         {blog.title} - {blog.author}
      </>
   );

   const detailedDisplay = (
      <>
         <p>Title: {blog.title}</p>
         <p>Url: {blog.url}</p>
         <p id="likes">
            Likes: <span id="num-likes">{blog.likes}</span>
            <button id="like-btn" onClick={likeBlog}>
               like
            </button>
            <button onClick={dislikeBlog}>dislike</button>
         </p>
         <p>Author: {blog.author}</p>
      </>
   );

   return (
      <div className="Blog">
         {!showDetails ? compactDisplay : detailedDisplay}
         <button id="show-btn" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide" : "Show"}
         </button>
         {showDetails & showRemoveButton ? (
            <button
               id="remove-blog-btn"
               className="remove-blog"
               onClick={handleRemove}
            >
               Remove Blog
            </button>
         ) : null}
      </div>
   );
};

Blog.propTypes = {
   blog: PropTypes.object.isRequired,
   handleLikeDislike: PropTypes.func.isRequired,
   removeBlog: PropTypes.func.isRequired,
   username: PropTypes.string.isRequired,
};

export default Blog;
