/// <reference types="cypress" />

import HomePage from "../../support/pageObjects/HomePage";
import ProductPage from "../../support/pageObjects/ProductPage";

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
    it('Test Shop App', () => {
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

        var sum = 0;
        cy.get('tr td:nth-child(4) strong').each(($el) => {
            cy.log($el.text());

            const amount = $el.text();
            const response = amount.split(" ");  // response is an array here
            const trimmedAmount = response[1].trim();  // Get the trimmed value from the array

            sum = sum + Number(trimmedAmount);  // Add the value to sum

        }).then(() => {
            cy.log(`${sum}`);  // Convert sum to string before logging
        })

        cy.get('h3 strong').then(($element) => {
            let totalAmount = $element.text();
            const res = totalAmount.split(" ");
            const trimmiedresAmount = res[1].trim();

            let finamTotalamount = Number(trimmiedresAmount)
            expect(finamTotalamount).to.eq(sum);
        });

        productPage.CheckoutToProcedBuy().click();

        cy.get('input[id="country"]').clear().type('Ind');
        cy.wait(5000);
        cy.get('[class="suggestions"] ul li a').each(($countries) => {
            const countryName = $countries.text().trim();
            if (countryName === "India") {
                cy.wait(1000);
                cy.wrap($countries).click({ force: true });
            }
        });

        cy.get('[id="checkbox2"]').check({ force: true });
        cy.get('[class="btn btn-success btn-lg"]').should('have.attr', 'value', 'Purchase').click();
        cy.get('[class="alert alert-success alert-dismissible"]').should('contain', "Thank you! Your order will be delivered in next few weeks :-).")
    });
});