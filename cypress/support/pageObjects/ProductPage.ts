import CartPage from '../../support/pageObjects/CartPage'
class productPage {

    checkOutButtonProcess() {
        return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link');
    }

    CheckoutToProcedBuy() {

        return cy.get('button[class="btn btn-success"]');
    }

    SelectTheCountry() {
        cy.get('.suggestions > ul > li > a')
    }

    pageValidation() {
        cy.contains("Shop Name").should('be.visible')
    }

    getCardCount() {
        return cy.get('app-card')
    }

    selectFirstProduct() {
        cy.get('app-card').eq(0).contains('button', 'Add').click()
    }

    goToCart() {
        cy.contains('a', 'Checkout').click()
        return new CartPage()

    }

    selectProduct(productName: any) {
        cy.get('app-card').filter(`:contains("${productName}")`)
            .then($element => {
                cy.wrap($element).should('have.length', 1)
                cy.wrap($element).contains('button', 'Add').click()

            });
    }

}

export default productPage;