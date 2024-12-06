// this is test is Mainly for // Basic-Mock-HTTP-Responses for generating Stub Data to test edge Scenarios //

describe('Mock-HTTP-Responses and Stub Data', () => {
    beforeEach(() => {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
    });

    it('Mock-HTTP-Responses and Stub Data', () => {
        cy.intercept({
            method: "GET",
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
            {
                statusCode: 200,
                body: [
                    {
                        "book_name": "Learn Api testing",
                        "isbn": "Mk128",
                        "aisle": "143"
                    }
                ]
            }).as('bookRecordDetails');

        cy.get('[class="btn btn-primary"]').click();
        cy.wait('@bookRecordDetails');
        cy.get('p').should('contain', 'Oops only 1 Book available');

        // length of the response array = rows of the table //
    });

    it('Integration Testing with Front end and back end Responses validation assertions', () => {

        cy.intercept({
            method: "GET",
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
            {
                statusCode: 200,
                body: [
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "Verginia",
                        "aisle": "262"
                    },
                    {
                        "book_name": "Manual Testing",
                        "isbn": "LSA",
                        "aisle": "252"
                    },
                    {
                        "book_name": "Automation Testing",
                        "isbn": "USA",
                        "aisle": "2692"
                    },
                    {
                        "book_name": "Cypress Testing",
                        "isbn": "LCanadaSA",
                        "aisle": "407"
                    }
                ]
            }).as('bookretrievals1');

        cy.get('[class="btn btn-primary"]').click();

        cy.wait('@bookretrievals1').then(({ request, response }) => {
            cy.get('tr').should('have.length', response.body.length + 1)
        });

    });

    it('Intercepting HTTP request details to test Security Scenarios', () => {

        cy.intercept("GET", 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {
            req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=AnilKumar'

            // req.continue() // if you use this method "countinue" then the request is being send to the server 
            req.continue((res) => {
                expect(res.statusCode).to.eq(404);
            });
        }).as('dummyURL');

        cy.get('[class="btn btn-primary"]').click();
        cy.wait('@dummyURL');
    });


    it('Handling API call directly with out involving browser with cypress', () => {

        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php',
            {
                "name": "Learn Appium Automation with Java",
                "isbn": "bGd26",
                "aisle": "227",
                "author": "John foe"
            }
        ).then((response) => {
            // expect(response.body).to.have.property('Msg', 'successfully added')
            expect(response.status).to.eq(200);
        })
    });
});