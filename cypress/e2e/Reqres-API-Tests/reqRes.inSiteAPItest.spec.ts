describe('API Testing with Auth Token & UI', () => {
    before(() => {
        // Login and get the auth token
        cy.request('POST', 'https://reqres.in/api/login', {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        }).then((response) => {
            expect(response.status).to.eq(200);
            Cypress.env('authToken', response.body.token); // Store token globally
        });
    });

    it('Fetch Users and Validate UI', () => {
        cy.visit('https://reqres.in/'); // Visit the UI (change as needed)

        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?page=2',
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an('array');

            // Validate user data in the UI (adjust selectors as per your UI)
            response.body.data.forEach((user, index) => {
                cy.get(`.user-list-item:eq(${index})`).should('contain', user.first_name);
            });
        });
    });

    it('Create User and Verify in UI', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            },
            body: {
                name: 'John Doe',
                job: 'Software Tester'
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('name', 'John Doe');

            // Simulate a UI refresh & validate new user appears
            cy.visit('/users'); // Adjust the path if necessary
            cy.contains('John Doe').should('be.visible');
        });
    });

    it('Update User and Verify in UI', () => {
        cy.request({
            method: 'PUT',
            url: 'https://reqres.in/api/users/2',
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            },
            body: {
                name: 'John Doe Updated',
                job: 'Senior Tester'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'John Doe Updated');

            // Simulate checking the updated user in the UI
            cy.visit('/users/2');
            cy.contains('John Doe Updated').should('be.visible');
        });
    });

    it('Delete User and Verify UI', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/2',
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            }
        }).then((response) => {
            expect(response.status).to.eq(204);

            // Simulate checking the UI that the user is removed
            cy.visit('/users');
            cy.contains('John Doe Updated').should('not.exist');
        });
    });
});