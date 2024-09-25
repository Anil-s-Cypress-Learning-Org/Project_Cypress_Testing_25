class HomePage {

    getEdiorBox() {
        return cy.get('form input[name="name"]:nth-child(2)')
    }

    getTwoWayDataBinding() {
        return cy.get(':nth-child(4) > .ng-untouched')
    }

    getGender() {
        return cy.get('#exampleFormControlSelect1')
    }

    getPrenuar() {
        return cy.get('#inlineRadio3');
    }

    getShopTab() {
        return cy.contains('Shop')
    }
}

export default HomePage;