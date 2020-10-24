describe("VuePress site", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("loads", () => {
    cy.contains("shufo.dev").should("be.visible");

    cy.get("a")
      .contains("About")
      .should("be.visible");

    cy.get("a")
      .contains("About")
      .click();

    cy.get("a")
      .contains("Projects")
      .click();

    cy.get("a")
      .contains("Blog")
      .click();

    cy.get(":nth-child(1) > .ui-post-title > .nav-link").click();
    cy.get(".title > .nav-link").click();
    cy.get(":nth-child(1) > li > .info > h3 > a").click();
  });
});
