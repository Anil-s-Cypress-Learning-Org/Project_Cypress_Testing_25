/// <reference types="cypress" />

import HomePage from "../pageObjects/HomePage";
import ProductPage from "../pageObjects/ProductPage";

const homepage = new HomePage();
const productPage = new ProductPage();
let testData: any;

describe('Test Frame work- Lenring Hooks', () => {

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/angularpractice/');
    });

    before(() => {
        cy.fixture('RahulTestPractice1').then((data) => {
            testData = data;
        });
    });


    // Global Fixtures Data //
    it('Test Hooks frame work with Fixture s DATA', () => {

        homepage.getEdiorBox().clear().type(testData.name)
        cy.wait(1000)
        homepage.getGender().select(testData.gender);


        homepage.getTwoWayDataBinding().should('have.value', testData.name);
        homepage.getEdiorBox().should('have.attr', 'minlength', '2');
        homepage.getPrenuar().should('be.disabled');

    });

    // Local //
    it('Test Hooks frame work', () => {
        cy.fixture('RahulTestPractice1').then((Fdata) => {
            cy.get('form input[name="name"]:nth-child(2)').clear().type(Fdata.name)
            cy.get('#exampleFormControlSelect1').select(Fdata.gender);

            homepage.getShopTab().click();
        });
        testData.productName
        testData.productName.forEach(function (elements: any) {
            cy.AddCartForMobileShop(elements);
        });

        productPage.checkOutButtonProcess().click();
        productPage.CheckoutToProcedBuy().click();

    });

});