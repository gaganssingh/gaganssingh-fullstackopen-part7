import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import NewBlog from "./NewBlog";

test("<NewBlog /> form calls the event handler", () => {});

test("<NewBlog /> form calls the event handler", () => {
   const createBlog = jest.fn();

   const component = render(<NewBlog createBlog={createBlog} />);

   const title = component.container.querySelector("#title");
   const author = component.container.querySelector("#author");
   const url = component.container.querySelector("#url");
   const form = component.container.querySelector("form");

   fireEvent.change(title, {
      target: { value: "Test Title" },
   });
   fireEvent.change(author, {
      target: { value: "Test Author" },
   });
   fireEvent.change(url, {
      target: { value: "http://test.com" },
   });
   fireEvent.submit(form);

   expect(createBlog.mock.calls).toHaveLength(1);
   expect(createBlog.mock.calls[0][0].title).toBe("Test Title");
   expect(createBlog.mock.calls[0][0].author).toBe("Test Author");
   expect(createBlog.mock.calls[0][0].url).toBe("http://test.com");
});
