/// <reference types="cypress" />

import { isNumber } from "../../node_modules/cypress/types/lodash/index";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


Cypress.Commands.add('RahulShpingApplogin', (UserName = Cypress.env('UserName'), Password = Cypress.env('Password')) => {
    // cy.session([UserName, Password], () => {
    cy.visit('https://rahulshettyacademy.com/client/')
    cy.get('[id="userEmail"]').type(UserName)
    cy.get('[id="userPassword"]').type(Password)
    cy.get('#login').click()
    cy.url().should('contain', '/client/dashboard/dash')
    // })
})


Cypress.Commands.add('GrrenKart_GlobalSeasrch', (SearchText) => {
    cy.get('input[class="search-keyword"]').clear().type(SearchText)
    cy.wait(500)
    cy.get('button[type="submit"]').click();
    cy.wait(500)
});


Cypress.Commands.add('GrrenKart_AddToCart', (decission) => {

    if (decission === 'increment') {
        cy.get(`[class="${decission}"]`).click()
    }
    else if (decission === 'decrement') {
        cy.get(`[class="${decission}"]`).click()
    }
    else if (typeof decission === 'number' && !isNaN(decission)) {
        cy.get('input[class="quantity"]').clear().type(decission.toString());
    }
    else {
        assert.isOk('Just One Item Want To Buy from Cart');
    }
    cy.get('.stepper-input > .quantity').invoke('val').then(($value) => {
        const IteamQuantity = Number($value);
        cy.get('.stepper-input > .quantity').should('have.value', IteamQuantity);
    });

    cy.get('[class="product"] [class="product-action"] [type="button"]').click();
});


Cypress.Commands.add('GrrenKart_VegitableCostPrice', (SelectedVegitableName) => {
    cy.GrrenKart_GlobalSeasrch(SelectedVegitableName);
    cy.get('.product-price').first()
        .invoke('text')

        /// First Approach /// 
        // .then((amount) => {
        //     const ItemPrice = parseFloat(amount);
        //     return ItemPrice;
        // });

        //         /// Second Approach ///
        //         .then(($amount) => {
        //             const ItemPrice = Number($amount);
        //             return ItemPrice;
        //         });


        /// 3rd Approach ///
        .then(($amount) => {
            const amountString = $amount.toString();
            const ItemPrice = Number(amountString);   // 56
            return ItemPrice
        });
});

Cypress.Commands.add('GrrenKart_datePicker', (dateIn, InMonth, InYear) => {
    const monthNumber = InMonth;
    const date = dateIn;
    const year = InYear;
    const expectedList = [monthNumber, date, year]

    cy.get('.react-calendar__navigation').click();
    cy.wait(100);
    cy.get('.react-calendar__navigation').click();

    cy.contains('button', year).click();

    cy.get('.react-calendar__year-view__months__month').eq(Number(monthNumber) - 1).click();

    cy.contains('abbr', date).click();

    cy.get('.react-date-picker__inputGroup__input').each(($el, index) => {
        cy.wrap($el).invoke('val').should('eq', expectedList[index]);

    });
})


Cypress.Commands.add('AddCartForMobileShop', (SelectProduct) => {
    cy.wait(1000);
    cy.get('h4.card-title').each((el, index) => {
        if (el.text().includes(SelectProduct)) {
            cy.get('button.btn.btn-info').eq(index).click();
        }
    });
});
