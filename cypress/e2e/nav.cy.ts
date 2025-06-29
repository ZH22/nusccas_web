describe('Navigate to Login Page', () => {
  it('should navigate to the login page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
 
    // Find a link with an href attribute containing "login" and click it
    // cy.get('a[href*="login"]').click()
    cy.get('[data-cy="landingDashboardbutton"]').click()
 
    // The new url should include "/about"
    cy.url({ timeout: 10000 }).should('include', '/login')
 
    // The new page should contain an h1 with "About"
    // cy.get('h1').contains('About')
  });

  describe('Submit Login Form', () => {
    it('should type in inputs and press submit', () => {
      cy.visit('http://localhost:3000/login')
      cy.wait(2000) 

      cy.get('[data-cy="loginEmailInput"]').should('be.visible').and('be.enabled').focus().type("testUser@email.com")
      cy.get('[data-cy="loginPasswordInput"]').should('be.visible').and('be.enabled').focus().type("password")
      cy.get('[data-cy="loginForm"]').submit();
    })
  })
})