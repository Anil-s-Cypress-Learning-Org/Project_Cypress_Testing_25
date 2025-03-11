describe("API Tests for /api/message", () => {
    const baseUrl = "http://localhost:3000/api/message";

    beforeEach(() => {
        // Reset message before each test
        cy.request("POST", baseUrl, { user: "Default" });
    });

    it("GET /api/message should return the default message", () => {
        cy.request("GET", baseUrl).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Hello, Default!"); // Expected message
        });
    });

    it("POST /api/message should return a personalized message", () => {
        cy.request("POST", baseUrl, { user: "Anil" }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Hello, Anil!");
        });
    });

    it("PATCH /api/message should update the message", () => {
        cy.request("PATCH", baseUrl, { text: "Updated Cypress Message" }).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Message updated to: Updated Cypress Message");
        });

        // Confirm with a GET request
        cy.request("GET", baseUrl).should((response) => {
            expect(response.body.message).to.eq("Updated Cypress Message");
        });
    });

    it("DELETE /api/message should clear the message", () => {
        cy.request("DELETE", baseUrl).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Message deleted");
        });

        // Confirm GET returns default message
        cy.request("GET", baseUrl).should((response) => {
            expect(response.body.message).to.eq("Hello from Express with TypeScript!"); // Reset in server
        });
    });
});