/// <reference types="cypress" />
//const neatCSV = require('neat-csv')   // for js
// import neatCSV from 'neat-csv'; // for Ts

const neatCSV = require('neat-csv');


let productName: any
let ProductPrice: any
describe('Seassion Test - is logged in through local storage', () => {
    it('is logged in through local storage', () => {
        cy.API_Login_RahulShpingAppn();

        cy.get(".card-body b").eq(1).then((ele) => {
            productName = ele.text();
        })

        cy.get('[class="text-muted"]').eq(1).then((cost) => {
            ProductPrice = cost.text().replace('$', '').trim();
        });

        cy.get(".card-body button:last-of-type").eq(1).click();
        cy.get("[routerlink*='cart']").click();
        cy.contains("Checkout").click();
        cy.get("[placeholder*='Country']").type("ind")
        cy.get('.ta-results button').each(($e1, index, $list) => {

            if ($e1.text() === " India") {
                cy.wrap($e1).click()
            }
        })
        cy.get(".action__submit").click();
        cy.wait(2000)
        cy.get(".order-summary button").eq(0).click();


        const filePath = '/Volumes/My Files Anil/Cypress-Anil/RahulShetty-Cypress/CypressProject_2024/cypress/downloads/order-invoice_kumarglina.csv';
        cy.readFile(filePath).then(async (text) => {
            // cy.readFile(`${Cypress.config("fileServerFolder")}/cypress/downloads/order-invoice_kumarglina.csv"`).then(async (text) => {
            const csv = await neatCSV(text);
            console.log(csv);

            // Validate product name
            const actualProductCSV = csv[0]["Product Name"];
            expect(productName).to.equal(actualProductCSV);

            // // validate product price 
            const actualProductPriceCSV = csv[0]["Product Price"]
            expect(ProductPrice).to.equal(actualProductPriceCSV);

        });
    });
});