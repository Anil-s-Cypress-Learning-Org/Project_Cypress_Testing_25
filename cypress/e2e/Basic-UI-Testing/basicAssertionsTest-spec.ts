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

it('studiotest', function () {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
    cy.get('.search-keyword').should('have.class', 'search-keyword');
    cy.get('.search-keyword').type('apple');
    cy.get('h4.product-name').should('have.text', 'Apple - 1 Kg');
    cy.get('.product-action button').should('have.text', 'ADD TO CART');
    cy.get('.product-action button').should('be.visible');
    cy.get('.product-action button').should('be.enabled');
    cy.get('.product-action button').click();
    cy.get('.product-action button').should('have.text', '✔ ADDED');
    cy.get(':nth-child(1) > :nth-child(3) > strong').should('have.text', '1');
    cy.get(':nth-child(2) > :nth-child(3) > strong').should('have.text', '72');
    cy.get('[alt="Cart"]').should('be.visible');
    cy.get('.cart-icon').click();
    cy.get('.cart-preview button').should('have.text', 'PROCEED TO CHECKOUT');
    cy.get('[alt="Cart"]').click();
    cy.get('.cart-preview button').should('be.enabled');
    cy.get('[alt="Cart"]').click();
    cy.get('.cart-preview button').click();
    cy.get(':nth-child(4) :nth-child(14)').should('have.text', 'Place Order');
    cy.get(':nth-child(4) :nth-child(14)').should('be.visible');
    cy.get(':nth-child(4) :nth-child(14)').click();
    cy.get('label').should('have.text', 'Choose Country');
    cy.get('select').should('be.visible');
    cy.get('select').select('India');
    cy.get('.chkAgree').should('not.be.checked');
    cy.get('.chkAgree').check();
    cy.get('.chkAgree').should('be.checked');
    cy.get('button').should('have.text', 'Proceed');
    cy.get('button').should('be.enabled');
    cy.get('button').click();
    cy.get('.wrapperTwo > :nth-child(1)').should('have.text', 'Thank you, your order has been placed successfully  You\'ll be redirected to Home page shortly!!');

});