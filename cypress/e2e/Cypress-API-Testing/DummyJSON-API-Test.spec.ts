/*
    DummyJSON provides a variety of APIs, including:
        •	Products: GET https://dummyjson.com/products
        •	Single Product: GET https://dummyjson.com/products/1
        •	Authentication: POST https://dummyjson.com/auth/login
        •	Add Product: POST https://dummyjson.com/products/add
*/


describe('API Testing for Dummy Json Web site Application For Practice', () => {

    // 1) Testing POST API Calls//

    let accessToken = '';

    it('Mock log in successfully', () => {
        cy.request({
            method: 'POST',
            url: 'https://dummyjson.com/auth/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                username: 'emilys',
                password: 'emilyspass',
                expiresInMins: 30 // optional, defaults to 60
            },
        }).then((response) => {
            console.log('Full Response:', response);

            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('accessToken');
            expect(response.body).to.have.property('refreshToken');
            expect(response.body.username).to.eq('emilys');

            accessToken = response.body.accessToken; // Store token in a variable
            cy.log('accessToken:', accessToken); // Log token in Cypress

            // Store token in localStorage
            cy.window().then((win) => {
                win.localStorage.setItem('accessToken', accessToken);
            });

            // Assert token exists in localStorage
            cy.window().then((win) => {
                expect(win.localStorage.getItem('accessToken')).to.exist;
                expect(win.localStorage.getItem('accessToken')).to.eq(response.body.accessToken);
            });
        }).then(() => {
            // Get current auth user //
            /* providing accessToken in bearer */
            cy.request('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': accessToken, // Pass JWT via Authorization header
                },
            }).then((resp) => {
                console.log(resp.body);
                expect(resp.body.address.address).to.equal("626 Main Street");
                expect(resp.body.address.city).to.equal("Phoenix");
                expect(resp.body.age).to.equal(28);
            });

        });
    });

    // 2) Testing GET API Calls //
    it('GET Call-API for All products fetch', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/products',
        }).then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.products).to.be.an('array');
            expect(res.body.products.length).to.be.greaterThan(0);
        });
    });


    it('GET CAll-API Should fetch a single product', () => {
        cy.request({
            method: 'GET',
            url: 'https://dummyjson.com/products/1'
        }).then((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body).to.have.property('id', 1);
            expect(resp.body).to.have.property('title').to.equal('Essence Mascara Lash Princess');
            expect(resp.body).to.have.property('category', 'beauty')

            const reviews = resp.body.reviews[2];
            expect(reviews.reviewerEmail).to.equal('eleanor.collins@x.dummyjson.com');
            expect(reviews.rating).to.equal(5);
            expect(reviews.reviewerName).to.equal('Eleanor Collins');
            cy.log(resp.body);
        })
    });
});
