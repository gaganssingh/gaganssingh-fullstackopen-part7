import React, { useState } from "react";

const NewBlog = ({ createBlog, setShowBlogForm }) => {
   const [newTitle, setNewTitle] = useState("");
   const [newAuthor, setNewAuthor] = useState("");
   const [newUrl, setNewUrl] = useState("");

   const addBlog = (e) => {
      e.preventDefault();
      createBlog({
         title: newTitle,
         author: newAuthor,
         url: newUrl,
         likes: Math.floor(Math.random() * 100),
      });
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
   };

   return (
      <>
         <form onSubmit={addBlog}>
            <h2>Create new blog</h2>
            title:
            <input
               id="title"
               type="text"
               value={newTitle}
               onChange={({ target }) => setNewTitle(target.value)}
            />
            <div>
               author:
               <input
                  id="author"
                  type="text"
                  value={newAuthor}
                  onChange={({ target }) => setNewAuthor(target.value)}
               />
            </div>
            <div>
               url:
               <input
                  id="url"
                  type="text"
                  value={newUrl}
                  onChange={({ target }) => setNewUrl(target.value)}
               />
            </div>
            <button id="create-blog-btn">Create</button>
         </form>
         <button onClick={() => setShowBlogForm(false)}>Cancel</button>
      </>
   );
};

export default NewBlog;
