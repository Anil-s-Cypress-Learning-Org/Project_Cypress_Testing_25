import ProductPage from '../../support/pageObjects/ProductPage'
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

    goTo() {
        cy.visit('https://rahulshettyacademy.com/loginpagePractise/')
    }

    login(username: any, password: any) {
        cy.get("#username").type(username)
        cy.get("#password").type(password)
        cy.contains("Sign In").click()
        return new ProductPage()
    }
}

export default HomePage;