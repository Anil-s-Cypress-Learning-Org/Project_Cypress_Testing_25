describe('test', () => {

    beforeEach(() => {
        cy.RahulShpingApplogin();
    });

    it.only('rahulshettyacademy Shopping App', () => {
        // cy.RahulShpingApplogin();
        cy.get('[class="left mt-1"] p').contains('Automation Practice');

        cy.get('[class="card"]').should('have.length', 3)
            .each(($el) => {
                const extractText = $el.find('h5').text()

                if (extractText.includes('ZARA COAT 3')) {
                    cy.wrap($el).find('[class="btn w-10 rounded"]').click();
                }
            });
    });



    it('rahulshettyacademy Shopping App', () => {

        cy.get('[class="card"]').should('have.length', 3)
            .each(($el, index) => {
                cy.wait(100)
                // Each card is now accessible as $$el
                cy.wrap($el).find('h5') // Find the <h5> element inside each card
                    .invoke('text') // Extract the text content
                    .then((text) => {

                        const keywords = ['ZARA COAT 3', 'ADIDAS ORIGINAL', 'IPHONE 13 PRO']; // Example keywords
                        expect(text).to.include(keywords[index]); // Expect the text to include a keyword

                        if (text.includes('IPHONE 13 PRO')) {
                            cy.wrap($el).find('[class="btn w-10 rounded"]').click();
                        }

                    });
            });
    });

});