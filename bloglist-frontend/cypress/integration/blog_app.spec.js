describe("Blog app", function () {
   beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/testing/reset");
      const user = {
         name: "Test User",
         username: "testuser",
         password: "1234567",
      };
      cy.request("POST", "http://localhost:3001/api/users/", user);
      cy.visit("http://localhost:3000");
   });

   it("Login form is shown", () => {
      cy.contains("Please login");
      cy.contains("username");
      cy.contains("password");
      cy.contains("login");
   });

   describe("Login", function () {
      it("succeeds with correct credentials", function () {
         cy.get("#username").type("testuser");
         cy.get("#password").type("1234567");
         cy.get("#login-button").click();

         cy.contains("Test User is currently logged in");
      });

      it("fails with wrong credentials", function () {
         cy.get("#username").type("invaliduser");
         cy.get("#password").type("1234567");
         cy.get("#login-button").click();

         cy.contains("Invalid login credentials");
      });
   });

   describe("When logged in", function () {
      beforeEach(function () {
         // Custom command for login /cypress/support/commands
         cy.login({ username: "testuser", password: "1234567" });
      });

      it("A blog can be created", function () {
         const newblog = {
            title: "Test Title",
            author: "testuser",
            url: "http://www.test.com",
         };

         cy.get("#show-create-blog-btn").click();
         cy.get("#title").type(newblog.title);
         cy.get("#author").type(newblog.author);
         cy.get("#url").type(newblog.url);
         cy.get("#create-blog-btn").click();

         cy.contains(`${newblog.title} - ${newblog.author}`);
      });

      describe("Liking a blog", function () {
         beforeEach(function () {
            // Custom command for creating a blog /cypress/support/commands
            cy.createBlog({
               title: "Cypress Test",
               author: "Cypress Author",
               url: "cypress.com",
               likes: 30,
            });
         });

         it("user can like a blog", function () {
            cy.get("#show-btn").click();
            cy.get("#like-btn").click();
            cy.get("#num-likes").contains(31);
         });
      });

      describe("Deleting a blog", function () {
         beforeEach(function () {
            // Custom command for creating a blog /cypress/support/commands
            cy.createBlog({
               title: "Cypress Test",
               author: "Cypress Author",
               url: "cypress.com",
               likes: 30,
            });
         });

         it("A blog can be deleted by the user twho created it", function () {
            cy.get("#show-btn").click();
            cy.get("#remove-blog-btn").click();
            cy.contains("Deleted blog");
         });
      });
   });

   describe("Blogs are sorted according to number of likes", function () {
      beforeEach(function () {
         // Custom command for login /cypress/support/commands
         cy.login({ username: "testuser", password: "1234567" });

         cy.createBlog({
            title: "Cypress Test 1",
            author: "Cypress Author 1",
            url: "cypress.com",
            likes: 30,
         });
         cy.createBlog({
            title: "Cypress Test 2",
            author: "Cypress Author 2",
            url: "cypress.com",
            likes: 40,
         });
         cy.createBlog({
            title: "Cypress Test 3",
            author: "Cypress Author 3",
            url: "cypress.com",
            likes: 50,
         });
      });

      it("blogs are ordered by likes, highest to lowest", function () {
         cy.get(".Blog").then((blogs) => {
            cy.wrap(blogs[0]).contains("Cypress Test 3");
            cy.wrap(blogs[1]).contains("Cypress Test 2");
            cy.wrap(blogs[2]).contains("Cypress Test 1");
         });
      });
   });
});
