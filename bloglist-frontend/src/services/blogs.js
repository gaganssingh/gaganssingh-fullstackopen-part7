import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
   token = `bearer ${newToken}`;
};

// Get all blogs from db
const getAll = () => {
   const request = axios.get(baseUrl);
   return request.then((response) => response.data);
};

// Create a new blog in db
const create = async (newObject) => {
   const config = {
      headers: { Authorization: token },
   };

   const response = await axios.post(baseUrl, newObject, config);
   return response.data;
};

// Handle like / dislike of a blog post
const update = async (id, newObject) => {
   const config = {
      headers: { Authorization: token },
   };

   const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
   return response.data;
};

// Delete a blog
const deleteBlog = async (id) => {
   const config = {
      headers: { Authorization: token },
   };

   const response = await axios.delete(`${baseUrl}/${id}`, config);
   return response.data;
};

export default { getAll, create, setToken, update, deleteBlog };
