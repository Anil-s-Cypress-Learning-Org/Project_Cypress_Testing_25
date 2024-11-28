import HomePage from '../../support/pageObjects/HomePage'

describe('End to End ecommerce Test', function () {
    let fixtureData: any;

    before(function () {
        //runs once before all tests in this block
        cy.fixture('example').then((data) => {
            fixtureData = data;
            this.homepage = new HomePage()
        });


    })

    it('Submit Order', function () {
        const productName = fixtureData.productName // product name here is fixtures data 

        this.homepage.goTo();
        cy.log(fixtureData.username)
        const productPage = this.homepage.login(fixtureData.username, fixtureData.password)
        productPage.pageValidation()
        productPage.getCardCount().should('have.length', 4)
        productPage.selectProduct(productName)
        productPage.selectFirstProduct()

        const cartPage = productPage.goToCart()

        cartPage.sumOfProducts().then(function (sum: any) {
            expect(sum).to.be.lessThan(200000);
        })

        const confirmationPage = cartPage.checkoutItems()

        confirmationPage.submitFormDetails()
        confirmationPage.getAlertMessage().should('contain', 'Success')
    });
});
