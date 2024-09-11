/// <reference types="cypress" />

declare namespace Cypress {

    interface Chainable<Subject> {

        /**
        * custom command to IRCTC Log In.
        * @param username - user name of input.
        * @param password - user password of input.
        * @example cy.search('ABC', '123456')
        */
        IrctcLogin(): Chainable<Element>;


        /**
        * custom command for Global Search.
        * @param SearchText used to search the vegitable iteam.
        * @example cy.GlobalSeasrch('Carrot')
        */
        GlobalSeasrch(SearchText: string): Chainable<Element>;

        /**
       * custom command for Add to Cart this command used to take the decissin for product quantity ex: Add or not either quntity.
       * @param decission The decission of the product to add to the cart (optional).
       * @param increment Flag to indicate whether to increment the quantity in the cart (optional).
       * @param decrement Flag to indicate whether to decrement the quantity in the cart (optional).
       * @returns A Cypress chainable command that resolves with the updated quantity in the cart.
       * @example cy.AddToCart();
       *          cy.AddToCart(515);
       *          cy.AddToCart(increment);
       *          cy.AddToCart(decremnet);
       */
        AddToCart(decission?: string | number): Chainable<number, element>;

        /**
        * custom command to Identify the Vegitable Item Cost Price.
        * @param SelectedVegitableName used to search the Name of the vegitable iteam.
        * @example cy.VegitableCostPrice('Apple')
        */
        VegitableCostPrice(...SelectedVegitableName: string[]): Chainable<Element>

        /**
        * custom command to Select the date in callender.
        * @param dateIn Select the Which date you want ?.
        * @param InMonth Select the Which Month you want ?.
        * @param InYear Select the Which Year you want ?.
        * @example cy.datePicker('21','05','1988');
        */
        datePicker(dateIn: string, InMonth: string, InYear: string): Chainable<Element>;

        /**
        * custom command to Select the date in callender.
        * @param SelectProduct Select the Mobile Product to Add tp your Cart.
        * @example cy.AddCartForMobileShop('Apple');
        */
        AddCartForMobileShop(SelectProduct: string): Chainable<Element>;

        /**
       * custom command to Select the date in callender.
       * @param SelectProduct Select the Mobile Product to Add tp your Cart.
       * @example cy.AddCartForMobileShop('Apple');
       */
        RahulShpingApplogin(username?: string, password?: string): Chainable<Element>;

    }
}
