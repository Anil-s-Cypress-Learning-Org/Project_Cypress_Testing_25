describe('test', () => {

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('[class="product"]:visible').should('have.length', 30);
    });


    it('Basic Test', () => {
        cy.GlobalSeasrch('Apple');

        // visible here we used identify the lenghth of only visible items try only "ca" in GlobalSearch command//
        // cy.get('[class="product"]:visible').should('have.length', 4);

        cy.AddToCart('increment');
        cy.AddToCart('decrement')
        cy.AddToCart(50);
    });

    it('Vegitable Cost Price Comparison With fixtures Data', () => {
        cy.fixture('VegitablesTest1').then((FixturesDataOfVegItem) => {

            FixturesDataOfVegItem.productDeatails.forEach((FDATA: any) => {

                Object.keys(FDATA).forEach((vegetableName) => {
                    let expectedPrice = Number(FDATA[vegetableName]);
                    cy.VegitableCostPrice(vegetableName).should('eq', expectedPrice);
                });

                // for (const vegetableName in FDATA) {
                //     let expectedPrice = Number(FDATA[vegetableName]);
                //     cy.VegitableCostPrice(vegetableName).should('eq', expectedPrice);
                // }
            });

        });
    });

    it('Vegitable Cost Price Comparison With fixtures Data', () => {
        cy.fixture('VegitablesTest1').then((Vegdata) => {
            Vegdata.productDeatails.forEach((VegitableCostDetails: any) => {
                // To test All the fruits cost price //
                // for (const vegetableName in VegitableCostDetails) {
                //     cy.VegitableCostPrice(vegetableName).should('eq', Number(VegitableCostDetails[vegetableName]));
                // }

                // for test only one fruit price //
                const fruitToTest = 'Apple';
                const expectedPrice = Number(Vegdata.productDeatails[0][fruitToTest])

                cy.VegitableCostPrice(fruitToTest).should('eq', expectedPrice);

                // cy.VegitableCostPrice('Carrot').should('eq', 56);

            });

        });

    });



});
