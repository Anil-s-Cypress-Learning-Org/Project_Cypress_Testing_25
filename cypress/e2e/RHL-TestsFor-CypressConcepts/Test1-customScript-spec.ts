describe('test', () => {

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('[class="product"]:visible').should('have.length', 30);
    });


    it('Basic Test', () => {
        cy.GrrenKart_GlobalSeasrch('Apple');

        // visible here we used identify the lenghth of only visible items try only "ca" in GlobalSearch command//
        // cy.get('[class="product"]:visible').should('have.length', 4);

        cy.GrrenKart_AddToCart('increment');
        cy.GrrenKart_AddToCart('decrement')
        cy.GrrenKart_AddToCart(50);
    });

    it.skip('Vegitable Cost Price Comparison With fixtures Data', () => {
        cy.fixture('VegitablesTest1').then((FixturesDataOfVegItem) => {

            FixturesDataOfVegItem.productDeatails.forEach((FDATA: any) => {

                Object.keys(FDATA).forEach((vegetableName) => {
                    let expectedPrice = Number(FDATA[vegetableName]);
                    cy.GrrenKart_VegitableCostPrice(vegetableName).should('eq', expectedPrice);
                });

                // for (const vegetableName in FDATA) {
                //     let expectedPrice = Number(FDATA[vegetableName]);
                //     cy.GrrenKart_VegitableCostPrice(vegetableName).should('eq', expectedPrice);
                // }
            });

        });
    });

    it('Vegitable Cost Price Comparison With fixtures Data', () => {
        cy.fixture('VegitablesTest1').then((Vegdata) => {
            Vegdata.productDeatails.forEach((VegitableCostDetails: any) => {
                // To test All the fruits cost price //
                // for (const vegetableName in VegitableCostDetails) {
                //     cy.GrrenKart_VegitableCostPrice(vegetableName).should('eq', Number(VegitableCostDetails[vegetableName]));
                // }

                // for test only one fruit price //
                const fruitToTest = 'Apple';
                const expectedPrice = Number(Vegdata.productDeatails[0][fruitToTest])

                cy.GrrenKart_VegitableCostPrice(fruitToTest).should('eq', expectedPrice);

                // cy.GrrenKart_VegitableCostPrice('Carrot').should('eq', 56);

            });

        });

    });



});
