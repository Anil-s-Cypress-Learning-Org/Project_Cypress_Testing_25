// npm install -D cypress-iframe  (we need to download the Iframe first)//

/// <refrence types = "Cypress" />
/// <refrence types = "cypress-iframe" />
import 'cypress-iframe'

describe('Rahul Shetty- Test to learn Handling Frames', () => {

    beforeEach(() => {
        Cypress.session.clearAllSavedSessions();
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    });

    it('Learn iframe concept', () => {
        cy.frameLoaded('#courses-iframe');
        cy.iframe().find('[href="mentorship"]').first().click();
        cy.wait(10000);
        cy.iframe().find('h1[class*="pricing-title"]').should('have.length', 2);

    });


});

