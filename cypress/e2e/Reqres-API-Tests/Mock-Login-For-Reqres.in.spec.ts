describe('Mock Login & Fetch User Data', () => {
    it('API Log in Test', () => {
        cy.fixture('userdata').then((userDetails) => {
            cy.request({
                method: 'POST',
                url: 'https://reqres.in/api/login',
                body: {
                    email: userDetails.email,
                    password: userDetails.password
                },
                failOnStatusCode: false,
            }).then((resp) => {
                expect(resp.status).to.eq(200);
                const authToken = resp.body.token;
                cy.log('AuthToken:', authToken);

                // ✅ Store authentication token in local storage
                cy.window().then((win) => {
                    win.localStorage.setItem('authToken', authToken);
                    expect(win.localStorage.getItem('authToken')).to.equal(authToken);
                });

                // ✅ Fetch user data from reqres API after login
                cy.request({
                    method: 'GET',
                    url: 'https://reqres.in/api/users/2', // Fetch user data (example: user ID 2)
                }).then((userResp) => {
                    expect(userResp.status).to.eq(200);
                    const DetailsOfUser = userResp.body.data;
                    cy.log('User Data:', DetailsOfUser);

                    // ✅ Store user data in local storage
                    cy.window().then((win) => {
                        win.localStorage.setItem('userData', JSON.stringify(DetailsOfUser));
                        /* 
                            1.	win.localStorage.getItem('userData')
                            •	Retrieves the userData stored in localStorage.
                            •	The value is stored as a string (because localStorage only stores strings).
                            2.	|| '{}'
                            •	If userData is null or does not exist, we use '{}' (an empty object as a fallback).
                            •	This prevents errors when trying to JSON.parse(null), which would fail.
                            3.	JSON.parse(...)
                            •	Converts the string back into an object, so we can easily access the user’s properties.
                        */
                        const storedUserData = JSON.parse(win.localStorage.getItem('userData') || '{}');
                        // ✅ Validate stored user data
                        expect(storedUserData.id).to.eq(DetailsOfUser.id);
                        expect(storedUserData.email).to.eq(DetailsOfUser.email);
                    });
                });
            });
        });
        /*
        {
            // results expected localStorage Output like below if above all are coreect
            "authToken": "QpwL5tke4Pnpja7X4",
            "userData": {
                "id": 2,
                "email": "janet.weaver@reqres.in",
                "first_name": "Janet",
                "last_name": "Weaver",
                "avatar": "https://reqres.in/img/faces/2-image.jpg"
            }
        }
        */
    });


    it('UI Test', () => {
        cy.visit('https://reqres.in/#support-heading');

        cy.intercept("GET", "https://reqres.in/api/users?page=2").as("getUsers");

        cy.get('[data-id="users"]').click();
        cy.wait("@getUsers").then(({ response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body).to.have.property("data").that.is.an("array").with.length(6);
        });
    })

    it('API Test', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?page=2',
        }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.have.property("data").that.is.an("array").with.length(6);

            expect(resp.body.support.url).to.eq("https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral");
            expect(resp.body.total).to.eq(12);

            expect(resp.body.data[2].first_name).to.eq('Tobias')
        });
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: {
                "name": "Anilkumar",
                "job": "leader"
            }
        }).then((resp) => {
            expect(resp.status).to.eq(201);
            expect(resp.body.name).to.eq('Anilkumar');
            expect(resp.body.job).to.eq('leader');

            let storeID = resp.body.id;  // Store the ID
            // cy.log("Stored ID:", storeID); // Log ID for debugging   
            return storeID
        }).then((storeID) => {
            cy.request({
                method: 'DELETE',
                url: `https://reqres.in/api/users/2/${storeID}`,
            }).then((resp) => {
                expect(resp.status).to.eq(204); // DELETE request should return 204 No Content
            });
        })

    });
});