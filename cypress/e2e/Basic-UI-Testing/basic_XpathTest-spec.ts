describe('XPath testing', () => {

    Cypress._.times(2, (k) => {
        it(`Xpath Test Iteration ${k + 3}`, () => {
            cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');

            cy.xpath('//*[@class="search-keyword"]').clear().type('apple');

            cy.wait(500);

            cy.xpath('//*[@class="product-name"]').first().should('contain', 'Apple - 1 Kg');

            cy.xpath('//*[@class="product-action"]').click();
        });
    });



    it.only('Xpath Test Iteration', { retries: 3 }, () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');

        cy.xpath('//*[@class="search-keyword"]').clear().type('apple');

        cy.wait(500);

        cy.xpath('//*[@class="product-name"]').first().should('contain', 'Apple - 1 Kg');

        cy.xpath('//*[@class="product-action"]').click();
    });

});