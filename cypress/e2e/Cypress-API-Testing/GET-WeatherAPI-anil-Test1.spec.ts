describe('Test For Weather API', () => {
    const apiKey = Cypress.env('weatherApiKey');

    it('Test Weather', () => {
        cy.request({
            method: 'GET',
            url: `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`
        }).then((response) => {

            // Status Code Assertions
            expect(response.status).to.eq(200);  // Ensure response is 200 OK
            expect(response.status).to.be.within(200, 299);  // Ensure 2xx success range

            //  Response Type and Structure Assertions
            expect(response.body).to.be.an('array');  // Ensure response is an array
            expect(response.body.length).to.be.greaterThan(0);  // Ensure it has data
            expect(response.body[0]).to.include.all.keys('name', 'lat', 'lon', 'country');  // Validate response structure

            //Data Integrity Assertions
            expect(response.body[0].name).to.be.a('string').and.not.be.empty;  // Ensure name is a valid string
            expect(response.body[0].lat).to.be.a('number');  // Latitude should be a number
            expect(response.body[0].lon).to.be.a('number');  // Longitude should be a number
            expect(response.body[0].country).to.be.a('string').and.have.length(2);  // Country code should be 2 characters (ISO 3166-1)


            //Data Validation Assertions
            expect(response.body.some((city: { name: string; }) => city.name === 'London')).to.be.true;  // Ensure 'London' exists in the response
            expect(response.body.every((city: { lat: any; lon: any; }) => typeof city.lat === 'number' && typeof city.lon === 'number')).to.be.true;  // Validate lat/lon are numbers for all results
            expect(response.body.every((city: { country: string; }) => city.country.match(/^[A-Z]{2}$/))).to.be.true;  // Ensure country follows ISO format

            // Performance & Header Assertions
            expect(response.duration).to.be.lessThan(2000);  // Ensure response time is under 2 seconds
            expect(response.headers).to.have.property('content-type').and.include('application/json');  // Validate response header

            // Negative Case Assertions
            cy.request({
                method: 'GET',
                url: `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=INVALID_KEY`,
                failOnStatusCode: false
            }).then((resp) => {
                expect(resp.status).to.be.oneOf([400, 401, 403, 404]);  // Handle possible API errors
            });
        });
    });




    it('Test for Coordinates by zip/post code', () => {
        cy.request({
            method: "GET",
            url: `http://api.openweathermap.org/geo/1.0/zip?zip=10001,US&appid=${apiKey}`
        }).then((response) => {

            cy.log(JSON.stringify(response.body)); // Debugging response

            // ✅ **Status Code Assertions**
            expect(response.status).to.eq(200);  // Ensure response is 200 OK
            expect(response.status).to.be.within(200, 299);  // Ensure 2xx success range

            // ✅ **Response Body Assertions**
            expect(response.body).to.be.an('object');  // Ensure response is an object
            expect(response.body).to.have.all.keys('zip', 'name', 'lat', 'lon', 'country');  // Validate response structure

            // ✅ **ZIP Code & City Assertions**
            expect(response.body.zip).to.be.a('string').and.eq('10001');  // Validate ZIP Code
            expect(response.body.name).to.be.a('string').and.eq('New York');  // Validate city name

            // ✅ **Latitude & Longitude Assertions**
            expect(response.body.lat).to.be.a('number').and.eq(40.7484);  // Validate latitude
            expect(response.body.lon).to.be.a('number').and.eq(-73.9967);  // Validate longitude

            // ✅ **Country Code Assertions**
            expect(response.body.country).to.be.a('string').and.eq('US');  // Validate country code

            // ✅ **Data Type Assertions**
            expect(response.body.zip).to.be.a('string');  // ZIP should be a string
            expect(response.body.name).to.be.a('string');  // City should be a string
            expect(response.body.lat).to.be.a('number');  // Latitude should be a number
            expect(response.body.lon).to.be.a('number');  // Longitude should be a number
            expect(response.body.country).to.match(/^[A-Z]{2}$/);  // Country code should be 2 uppercase letters (ISO format)

            // ✅ **Performance & Header Assertions**
            expect(response.duration).to.be.lessThan(2000);  // Ensure response time is <2 seconds
            expect(response.headers).to.have.property('content-type').and.include('application/json');  // Validate response header

            // ✅ **Negative Case Assertions**
            cy.request({
                method: 'GET',
                url: 'http://api.openweathermap.org/geo/1.0/zip?zip=00000,US&appid=invalid_key', // Invalid ZIP & API Key
                failOnStatusCode: false
            }).then((resp) => {
                expect(resp.status).to.be.oneOf([400, 401, 404]);  // Handle errors gracefully
                expect(resp.body).to.have.property('message');  // Ensure response has error message
            });
        });
    });


    it('Test for Reverse geocoding', () => {
        let lat = '51.5098'
        let lon = '0.1180'
        let limit = 5
        cy.request({
            method: 'GET',
            url: `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`
        }).then((response) => {
            // ✅ **Status Code Assertions**
            expect(response.status).to.eq(200);  // Ensure response is 200 OK
            expect(response.status).to.be.within(200, 299);  // Ensure status is in the 2xx success range

            // ✅ **Response Structure Assertions**
            expect(response.body).to.be.an('array').and.have.length(1);  // Ensure response is an array with 1 object
            expect(response.body[0]).to.have.all.keys('name', 'local_names', 'lat', 'lon', 'country', 'state');  // Validate all keys exist

            // ✅ **Data Type Assertions**
            const city = response.body[0];
            expect(city.name).to.be.a('string').and.eq('London');  // Validate name
            expect(city.lat).to.be.a('number').and.eq(51.5073219);  // Validate latitude
            expect(city.lon).to.be.a('number').and.eq(-0.1276474);  // Validate longitude
            expect(city.country).to.be.a('string').and.eq('GB');  // Validate country
            expect(city.state).to.be.a('string').and.eq('England');  // Validate state

            // ✅ **Local Names Assertions (Flexible)**
            const localNames = city.local_names;
            expect(localNames).to.be.an('object');

            // ✅ **Ensure at least some expected keys exist**
            expect(localNames).to.include.keys('ko', 'he', 'en', 'mk', 'be', 'ru', 'fr', 'cy');

            // ✅ **Validate values only if the key exists in the response**
            const expectedLocalNames = {
                ko: '런던',
                he: 'לונדון',
                en: 'London',
                mk: 'Лондон',
                be: 'Лондан',
                ru: 'Лондон',
                fr: 'Londres',
                cy: 'Llundain'
            };

            Object.keys(expectedLocalNames).forEach((key) => {
                if (localNames[key]) {
                    expect(localNames[key]).to.be.a('string').and.eq(expectedLocalNames[key]);
                }
            });

            // ✅ **Geographical Assertions**
            expect(city.lat).to.be.within(51.49, 51.52);  // Validate lat is in expected range
            expect(city.lon).to.be.within(-0.14, -0.12);  // Validate lon is in expected range

            // ✅ **Performance & Header Assertions**
            expect(response.duration).to.be.lessThan(2000);  // Ensure response time is under 2 seconds
            expect(response.headers).to.have.property('content-type').and.include('application/json');  // Validate content type
        });
    });
});