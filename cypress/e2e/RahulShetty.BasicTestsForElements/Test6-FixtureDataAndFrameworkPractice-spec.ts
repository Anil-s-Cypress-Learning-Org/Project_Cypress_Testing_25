/// <reference types="cypress" />

describe('Test Frame work- Lenring Hooks', () => {

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/angularpractice/');
    });

    before(() => {
        cy.fixture('RahulTestPractice1').then((data) => {
            this.data = data
        });
    });

    // Global Fixtures Data //
    it('Test Hooks frame work with Fixture s DATA', () => {

        cy.get('form input[name="name"]:nth-child(2)').clear().type(this.data.name)
        cy.wait(1000)
        cy.get('#exampleFormControlSelect1').select(this.data.gender);


        cy.get(':nth-child(4) > .ng-untouched').should('have.value', this.data.name);
        cy.get('input[name = "name"]:nth-child(2)').should('have.attr', 'minlength', '2');
        cy.get('#inlineRadio3').should('be.disabled');

    });

    // Local //
    it('Test Hooks frame work', () => {
        cy.fixture('RahulTestPractice1').then((Fdata) => {
            cy.get('form input[name="name"]:nth-child(2)').clear().type(Fdata.name)
            cy.get('#exampleFormControlSelect1').select(Fdata.gender);
        });
        cy.contains('Shop').click()
        // cy.pause();
        //cy.debug //


        // if fixtures data is very less like 2 then falow below //
        // cy.AddCartForMobileShop(this.data.productName[0]);
        // cy.AddCartForMobileShop(this.data.productName[1]);

        //what if fixtures data is very high like 100 or more than?falow below //

        this.data.productName
        this.data.productName.forEach(function (elements: any) {
            cy.AddCartForMobileShop(elements);
        });
    });

});