describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
});

it('sydtst1', function() {
  cy.visit('https://example.cypress.io/')
  cy.get('.dropdown-toggle').should('be.visible');
  cy.get('.navbar-brand').should('have.text', 'cypress.io');
  cy.get('#navbar > :nth-child(1) > :nth-child(2) > a').should('have.text', 'Utilities');
  cy.get('#navbar > :nth-child(1) > :nth-child(3) > a').should('have.text', 'Cypress API');
  cy.get('h1').should('have.text', 'Kitchen Sink');
  cy.get('.container > p').should('be.visible');
  cy.get(':nth-child(3) p').should('have.text', 'Commands drive your tests in the browser like a real user would. They let you perform actions like typing, clicking, xhr requests, and can also assert things like "my button should be disabled".');
  cy.get(':nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > :nth-child(1)').should('have.text', 'Querying');
  cy.get(':nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > :nth-child(1)').click();
  
});