class ConfirmationPage {

    submitFormDetails() {
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
    }

    getAlertMessage() {
        return cy.get(".alert-success")
    }
}
export default ConfirmationPage