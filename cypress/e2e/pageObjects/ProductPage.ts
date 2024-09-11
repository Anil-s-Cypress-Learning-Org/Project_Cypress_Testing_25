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

}

export default productPage;