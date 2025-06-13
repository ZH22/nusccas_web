describe('Navigate to Login Page', () => {
  it('should navigate to the login page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
 
    // Find a link with an href attribute containing "login" and click it
    // cy.get('a[href*="login"]').click()
    cy.get('a[href*="dashboard"]').click()
 
    // The new url should include "/about"
    cy.url().should('include', '/login')
 
    // The new page should contain an h1 with "About"
    // cy.get('h1').contains('About')
  });

  describe('Submit Login Form', () => {
    it('should type in inputs and press submit', () => {
      cy.visit('http://localhost:3000/login')

      cy.get("#email").type("testUser@email.com")
      cy.get("#password").type("password")
      cy.get('button[type="submit"]').click();
    })
  })
})