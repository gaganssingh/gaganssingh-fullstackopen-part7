import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

// { blog, handleLikeDislike, removeBlog, username }
const blog = {
   title: "Test Blog Title",
   author: "Test Author",
   url: "http://test.com",
   likes: 20,
};

const handleLikeDislike = jest.fn();
const removeBlog = jest.fn();
const username = "Test Author";

test("renders title and author but not url and likes", () => {
   const component = render(
      <Blog
         blog={blog}
         handleLikeDislike={handleLikeDislike}
         removeBlog={removeBlog}
         username={username}
      />
   );

   expect(component.container).toHaveTextContent("Test Blog Title");
   expect(component.container).toHaveTextContent("Test Author");
   expect(component.container).not.toHaveTextContent("http://test.com");
   expect(component.container).not.toHaveTextContent("20");
});

test("url and likes are shown after clicking the show button", () => {
   const component = render(
      <Blog
         blog={blog}
         handleLikeDislike={handleLikeDislike}
         removeBlog={removeBlog}
         username={username}
      />
   );

   const button = component.getByText("Show");
   fireEvent.click(button);

   expect(component.container).toHaveTextContent("Test Blog Title");
   expect(component.container).toHaveTextContent("Test Author");
   expect(component.container).toHaveTextContent("http://test.com");
   expect(component.container).toHaveTextContent("20");
});

test("Event handler called twice if like button is clicked twice", () => {
   const mockHandler = jest.fn();

   const component = render(
      <>
         <p>Title: {blog.title}</p>
         <p>Url: {blog.url}</p>
         <p>
            Likes: {blog.likes}
            <button onClick={() => mockHandler()}>like</button>
         </p>
         <p>Author: {blog.author}</p>
      </>
   );

   const button = component.getByText("like");
   fireEvent.click(button);
   fireEvent.click(button);

   expect(mockHandler.mock.calls).toHaveLength(2);
});
