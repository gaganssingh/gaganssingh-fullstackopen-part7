import React, { useState, useEffect } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import DisplayBlog from "./components/DisplayBlog";

const App = () => {
   const [blogs, setBlogs] = useState([]);
   const [user, setUser] = useState(null);
   const [notification, setNotification] = useState("");
   const [notificationStyle, setNotificationStyle] = useState("");

   //  Initial loading of all blogs when app first loads
   useEffect(() => {
      blogService.getAll().then((blogs) => setBlogs(blogs));
   }, []);

   //  Check if user already logged in on first app load
   useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem("loggedInBlogAppUser");
      if (loggedUserJSON) {
         const user = JSON.parse(loggedUserJSON);
         setUser(user);
      }
   }, []);

   //  Handles the logic for user login
   const handleLogin = async (loginObject) => {
      try {
         const user = await loginService.login(loginObject);

         window.localStorage.setItem(
            "loggedInBlogAppUser",
            JSON.stringify(user)
         );
         blogService.setToken(user.token);
         setUser(user);
         //  setUsername("");
         //  setPassword("");
         setNotification("Successfully logged in");
         setNotificationStyle("success");
      } catch (exception) {
         setNotification("Invalid login credentials");
         setNotificationStyle("error");
      }

      setTimeout(() => {
         setNotification("");
         setNotificationStyle("");
      }, 3000);
   };

   //  Handles the logic for user logout
   const handleLogout = () => {
      window.localStorage.removeItem("loggedInBlogAppUser");
      setUser(null);
      setNotification("Successfully logged out");
      setNotificationStyle("success");

      setTimeout(() => {
         setNotification("");
         setNotificationStyle("");
      }, 3000);
   };

   //  Handles the logic for creating a new blog
   const createBlog = async (newBlogObject) => {
      blogService.setToken(user.token);

      try {
         const blogObject = await blogService.create(newBlogObject);
         setBlogs(blogs.concat(blogObject));
         setNotification(
            `A new blog titled "${blogObject.title}" by ${blogObject.author} added.`
         );
         setNotificationStyle("success");
      } catch (error) {
         setNotification(`Something went wrong. Please try again later.`);
         setNotificationStyle("error");
      }

      setTimeout(() => {
         setNotification("");
         setNotificationStyle("");
      }, 3000);
   };

   //  Handles like/dislike button in Blog component
   const handleLikeDislike = async (id, newBlogObject, type) => {
      blogService.setToken(user.token);

      try {
         await blogService.update(id, newBlogObject);
         blogService.getAll().then((blogs) => setBlogs(blogs));
         setNotification(`Post ${type}`);
         setNotificationStyle("success");
      } catch (error) {
         setNotification(`Something went wrong. Please try again later.`);
         setNotificationStyle("error");
      }

      setTimeout(() => {
         setNotification("");
         setNotificationStyle("");
      }, 3000);
   };

   //  Delete a blog logic
   const removeBlog = async (id) => {
      blogService.setToken(user.token);

      if (window.confirm("Are you sure you want to remove this blog?")) {
         try {
            await blogService.deleteBlog(id);
            blogService.getAll().then((blogs) => setBlogs(blogs));
            setNotification(`Deleted blog`);
            setNotificationStyle("success");
         } catch (error) {
            setNotification(`Something went wrong. Please try again later`);
            setNotificationStyle("error");
         }
      } else {
         setNotification(`Blog removal canceled`);
         setNotificationStyle("error");
      }

      setTimeout(() => {
         setNotification("");
         setNotificationStyle("");
      }, 3000);
   };

   return (
      <div>
         <h2>{!user ? "Please login" : "Blogs"}</h2>
         {notification && (
            <Notification text={notification} style={notificationStyle} />
         )}
         {user && <p>{user.name} is currently logged in</p>}
         {user && <button onClick={handleLogout}>logout</button>}
         {!user ? (
            <LoginForm handleLogin={handleLogin} />
         ) : (
            <DisplayBlog
               createBlog={createBlog}
               blogs={blogs}
               handleLikeDislike={handleLikeDislike}
               removeBlog={removeBlog}
               username={user.username}
            />
         )}
      </div>
   );
};

export default App;
