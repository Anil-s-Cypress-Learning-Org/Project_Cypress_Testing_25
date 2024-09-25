/// <reference types="Cypress" />

describe('Basic GreenKart Test', () => {
    it('Basic green cart Test', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('[class="product"]').should('be.exist').and('have.length', 30);
        // search for fruit
        cy.get('[class="search-keyword"]').clear().type('Apple');
        cy.get('[class="search-button"]').click();

        // assertions //

        cy.get('[class="product"]').should('be.exist');

        cy.get('[class="product"] img').should('be.visible');

        cy.get('[class="product"] [class="product-name"]').should('contain', 'Apple - 1 Kg');

        cy.get('[class="product"] [class="product-name"]').should('have.text', 'Apple - 1 Kg');

        cy.get('[class="product"] [class="product-name"]').should('includes.text', 'Apple - 1 Kg');

        cy.get('[class="product"] [class="product-price"]').should('contain', '72');

        cy.get('[class="product"] [class="product-price"]').should('have.text', '72');

        cy.get('[class="product"] [class="product-price"]').should('includes.text', '72');

        cy.get('[class="product"] [class="quantity"]').should('have.value', '1');

        cy.get('[class="product"] [class="stepper-input"] a').should('have.length', 2);


        cy.get('[class="product"] [class="stepper-input"] [class="increment"]').should('have.length', 1).click();

        cy.get('[class="product"] [class="quantity"]').should('have.value', '2');

        cy.get('[class="product"] [class="product-action"] button[type="button"]').should('be.enabled');

        cy.get('[class="product"] [class="product-action"] button[type="button"]').should('contain', 'ADD TO CART');

        cy.get('[class="product"] [class="product-action"] button[type="button"]')
            .should('be.exist')
            .and('be.visible')
            .and('contain', 'ADD TO CART')
            .and('have.text', 'ADD TO CART')
            .and('includes.text', 'ADD TO CART')
            .and('be.enabled')
            .click();

        // have.class
        cy.get('[class="product"]').should('have.class', 'product');
        cy.get('[class="product"] [class="product-action"]').should('have.class', 'product-action');

        // have.id//
        cy.get('[id="root"]').should('have.id', 'root');

        // have.attr   
        cy.get('[class="product"] [class="product-action"] button[type="button"]').should('have.attr', 'type', 'button')
            .and('contain', 'ADD TO CART')

        cy.get('[class="product"] [class="stepper-input"] a')
            .first()
            .should('have.attr', 'href')
            .and('include', '#');

        // using inner text //
        cy.contains('ADD TO CART').click();

        // brand logo text test //
        cy.get('[class="brand greenLogo"]')
            .should('be.visible')
            .and('contain', 'GREENKART')

    });
});