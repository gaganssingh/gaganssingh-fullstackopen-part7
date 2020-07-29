import React, { useState } from "react";

const LoginForm = ({ handleLogin }) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const handleFormSubmit = (e) => {
      e.preventDefault();
      handleLogin({
         username,
         password,
      });
      setUsername("");
      setPassword("");
   };

   return (
      <form onSubmit={handleFormSubmit}>
         <label htmlFor="username">username</label>
         <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
         />
         <label htmlFor="password">password</label>
         <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
         />
         <button id="login-button">login</button>
      </form>
   );
};

export default LoginForm;
