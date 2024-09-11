describe('Rahul Shetty- Test to learn Callender', () => {

    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    });

    it('learn Callender', () => {
        const monthNumber = '5'
        const date = '18'
        const year = '2027'
        const expectedList = [monthNumber, date, year]

        cy.get('.react-date-picker__inputGroup').click();   // for callender//
        cy.get('.react-calendar__navigation').click();     // for month //
        cy.wait(100);
        cy.get('.react-calendar__navigation').click();     // for year //

        cy.contains('button', year).click();

        cy.get('.react-calendar__year-view__months__month').eq(Number(monthNumber) - 1).click();

        cy.contains('abbr', date).click();

        cy.get(".react-date-picker__inputGroup__input").each(($el, index) => {
            cy.wrap($el).invoke('val').should('eq', expectedList[index]);
        });
    });

    it('learn Callender with Custom Command', () => {
        cy.get('.react-date-picker__inputGroup').click();
        cy.datePicker('21', '10', '2025')

    });

});

