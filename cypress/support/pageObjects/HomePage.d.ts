declare class HomePage {

    getEdiorBox(): Cypress.Chainable<JQuery<HTMLElement>>;
    getTwoWayDataBinding(): Cypress.Chainable<JQuery<HTMLElement>>;
    getGender(): Cypress.Chainable<JQuery<HTMLElement>>;
    getPrenuar(): Cypress.Chainable<JQuery<HTMLElement>>;
    getShopTab(): Cypress.Chainable<undefined>;
}

export default HomePage;
