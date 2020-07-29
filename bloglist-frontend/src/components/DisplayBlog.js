import React, { useState } from "react";

import NewBlog from "./NewBlog";
import Blog from "./Blog";

const DisplayBlog = (props) => {
   const { createBlog, blogs, handleLikeDislike, removeBlog, username } = props;
   const [showBlogForm, setShowBlogForm] = useState(false);

   // Create a copy of the blogs array
   let blogsSortedByLikes = [...blogs];

   // Sort by number of likes, highest likes first (decending order)
   blogsSortedByLikes.sort((a, b) =>
      a.likes < b.likes ? 1 : b.likes < a.likes ? -1 : 0
   );

   return (
      <div>
         <h2>blogs</h2>
         <button
            id="show-create-blog-btn"
            onClick={() => setShowBlogForm(true)}
         >
            Create Blog
         </button>
         {showBlogForm && (
            <NewBlog
               createBlog={createBlog}
               setShowBlogForm={setShowBlogForm}
            />
         )}
         <br />
         {blogsSortedByLikes.map((blog) => (
            <Blog
               key={blog.id}
               blog={blog}
               handleLikeDislike={handleLikeDislike}
               removeBlog={removeBlog}
               username={username}
            />
         ))}
      </div>
   );
};

export default DisplayBlog;
