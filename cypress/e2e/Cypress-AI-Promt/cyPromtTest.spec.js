describe('Test for Cypress AI cy.Promt Baisc Test', () => {
    it('Cypress Future AI Testing Baisc Test', () => {
       cy.prompt([
        "Visit https://qa-practice.netlify.app/auth_ecommerce",
        "Enter email admin@admin.com",
        "Enter password admin123",
        "Click Submit button",
        "Assert 'Log Out' button is visible",
        "Add to cart button for Huawei Mate 20 Lite, 64GB,Black",
        "Proceed To Checkout",
         "Select Country India",
         "Click Submit Order button",
       "Enter Phone Number '9966'",
       ]);
    });
});



