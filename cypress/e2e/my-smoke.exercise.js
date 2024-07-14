import { buildUser } from "../support/generate";

describe("smoke", () => {
  it("should allow a typical user flow", () => {
    // create a fake user
    const user = buildUser();

    // visit '/'
    cy.visit("/");

    // find the button named "register" and click it
    cy.findByRole("button", { name: /register/i }).click();

    // within the "dialog" find the username and password fields,
    //    type into them the values for your fake user, then click the register
    //    button to submit the form
    cy.findByRole("dialog").within(() => {
      cy.findByRole("textbox", { name: /username/i }).type(user.username);
      cy.findByLabelText(/password/i).type(user.password);
      cy.findByRole("button", { name: /register/i }).click();
    });

    // within the "navigation", find the link named "discover" and click it
    cy.findByRole("navigation").within(() => {
      cy.findByRole("link", { name: /discover/i }).click();
    });

    // within the "main", type in the "searchbox" the title of a book and hit enter
    cy.findByRole("main").within(() => {
      cy.findByRole("searchbox", { name: /search/i }).type(
        "The Lord of the Rings{enter}"
      );

      // within the listitem with the name of your book, find the button
      // named "add to list" and click it.
      cy.findByRole("listitem", { name: /the lord of the rings/i }).within(
        () => {
          cy.findByRole("button", { name: /add to list/i }).click();
        }
      );
    });

    // click the reading list link in the navigation
    cy.findByRole("navigation").within(() => {
      cy.findByRole("link", { name: /reading list/i }).click();
    });

    cy.findByRole("main").within(() => {
      // ensure the "main" only has one element "listitem"
      cy.findAllByRole("listitem").should("have.length", 1);

      // click the link with the name of the book you added to the list to go to the book's page
      cy.findByRole("link", { name: /the lord of the rings/i }).click();
    });

    // type in the notes textbox
    cy.findByRole("textbox", { name: /notes/i }).type("It was a good read");

    // wait for the loading spinner to show up
    cy.findByLabelText(/loading/i).should("exist");

    // wait for the loading spinner to go away
    cy.findByLabelText(/loading/i).should("not.exist");

    // mark the book as read
    cy.findByRole("button", { name: /mark as read/i }).click();

    // click the 5 star rating radio button
    cy.findByRole("radio", { name: /5 stars/i }).click({ force: true });

    // navigate to the finished books page
    cy.findByRole("navigation").within(() => {
      cy.findByRole("link", { name: /finished books/i }).click();
    });

    cy.findByRole("main").within(() => {
      // ensure the "main" only has one element "listitem"
      cy.findAllByRole("listitem").should("have.length", 1);

      // ensure the 5 star rating radio button is checked
      cy.findByRole("radio", { name: /5 stars/i }).should("be.checked");

      // click the link for your book to go to the books page again
      cy.findByRole("link", { name: /the lord of the rings/i }).click();
    });

    // remove the book from the list
    cy.findByRole("button", { name: /remove from list/i }).click();

    // ensure the notes textbox and the rating radio buttons are gone
    cy.findByRole("textbox", { name: /notes/i }).should("not.exist");
    cy.findByRole("radio", { name: /5 stars/i }).should("not.exist");

    // navigate back to the finished books page
    cy.findByRole("navigation").within(() => {
      cy.findByRole("link", { name: /finished books/i }).click();
    });

    // ensure there are no books in the list
    cy.findByRole("main").within(() => {
      cy.findAllByRole("listitem").should("have.length", 0);
    });
  });
});
