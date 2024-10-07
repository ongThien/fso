describe("blog app", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      username: "ongThien",
      name: "Thien Q. Nguyen",
      password: "123",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("login form can be shown", () => {
    cy.contains("login").click();
    cy.get(".loginForm").should("contain", "username").and("contain", "password");
  });

  describe("Login", () => {
    it("login succeeds with correct credentials", () => {
      cy.contains("login").click();
      cy.get(".username").type("ongThien");
      cy.get(".password").type("123");
      cy.get(".loginBtn").click();

      cy.get(".success")
        .should("contain", "Welcome back, ongThien")
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");
    });

    it("login fails with wrong credentials", () => {
      cy.contains("login").click();
      cy.get(".username").type("Katie");
      cy.get(".password").type("123");
      cy.get(".loginBtn").click();

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.login({ username: "ongThien", password: "123" });
    });

    it("a new blog can be created", () => {
      cy.createBlog({
        title: "a blog created by cypress test",
        author: "cypress",
        url: "http://localhost:5173",
      });

      cy.contains("a blog created by cypress test - cypress");
    });

    describe("and a blog existed", () => {
      beforeEach(() => {
        cy.createBlog({
          title: "first blog",
          author: "cypress",
          url: "http://localhost:5173",
        });

        cy.createBlog({
          title: "second blog",
          author: "cypress",
          url: "http://localhost:5173",
        });

        cy.createBlog({
          title: "third blog",
          author: "cypress",
          url: "http://localhost:5173",
        });
      });

      it("can view detail of a blog", () => {
        cy.contains("first blog").parent().find("button").as("viewBtn");
        cy.get("@viewBtn").click();
        cy.get(".detailBlog")
          .should("contain", "http://localhost:5173")
          .and("contain", "Thien Q. Nguyen")
          .and("contain", "like");
      });

      it("can hide a detailed blog", () => {
        cy.contains("first blog").parent().find("button").as("viewBtn");
        cy.get("@viewBtn").click();
        cy.get(".hideBtn").click();

        cy.contains("first blog")
          .should("not.contain", "http://localhost:5173")
          .and("not.contain", "Thien Q. Nguyen");
      });

      it("can update the likes of a blog", () => {
        cy.contains("second blog").parent().find("button").as("viewBtn");
        cy.get("@viewBtn").click();
        cy.get(".likeBtn").click();
        cy.get(".updateBlogForm").should("contain", 1);
        cy.get("html").should("contain", "UPDATED second blog by cypress");
      });
    });
  });
});
