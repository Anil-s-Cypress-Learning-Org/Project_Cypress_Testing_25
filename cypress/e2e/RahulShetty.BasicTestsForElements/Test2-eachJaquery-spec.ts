describe('Rahul-Shetty Test for learn .each & as & jquery', () => {

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('[class="product"]:visible').should('have.length', 30);
    });


    it('.each Test in Cypress ittreat every Elemnt', () => {
        cy.GlobalSeasrch('ca')

        cy.get('.products .product').eq(2).contains('ADD TO CART').click();

        cy.get('[class="products"]:visible').find('.product').each(($el) => {
            const textVeg = $el.find('h4.product-name').text()
            if (textVeg.includes('Carrot')) {
                cy.wrap($el).find('button').click();
            }
        });

    });


    it('.Jquery use extract the text from web element & Alasing the reuse Locators@"as"', () => {

        cy.get('.brand').then((LogoElement) => {
            cy.log(LogoElement.text())
        });

        cy.get('.brand').as('brand').invoke('text').then((LogoElement) => {
            const TextOfLogo = LogoElement.toString();
            cy.get('@brand').should('have.text', 'GREENKART');
            cy.get('@brand').should('contain', TextOfLogo);
        });

    });

    it('Test', () => {
        cy.GlobalSeasrch('Carrot');
        cy.AddToCart('increse');
        cy.get('[class="cart-icon"]').click();
        cy.contains('PROCEED TO CHECKOUT').click();
        cy.wait(500);
        cy.contains('Place Order').click();
        cy.get('[type="checkbox"]').click();
    });

});



