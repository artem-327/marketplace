/**
 * Created by ARTIO on 23.5.2019.
 */
context("Login",() => {
    it('Bad credentials',() => {
        cy.server();
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/oauth/token').as('login');

        cy.visit("http://test.echoexchange.net");
        cy.url().should("include","login");
        cy.get("input[name=username]")
            .type("admin@example.com")
            .should("have.value","admin@example.com");
        cy.get("input[name=password]")
            .type("test")
            .should("have.value","test");
        cy.get("button[type=submit]").click();

        cy.wait('@login');

        //Assert on XHR
        cy.get('@login').then(function (xhr) {
            expect(xhr.status).to.eq(400);
            expect(xhr.requestHeaders).to.have.property('Content-Type');
            expect(xhr.method).to.eq('POST');
            expect(xhr.responseBody).to.have.property('error');
            expect(xhr.responseBody).to.have.property('error_description');
            cy.get(".error.message p")
                .should("have.text","Bad credentials");
        })
    });

    it('Admin login',() => {
        cy.server();
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/oauth/token').as('login');

        cy.visit("http://test.echoexchange.net");
        cy.url().should("include","login");
        cy.get("input[name=username]")
            .type("admin@example.com")
            .should("have.value","admin@example.com");
        cy.get("input[name=password]")
            .type("echopass123")
            .should("have.value","echopass123");
        cy.get("button[type=submit]").click();

        cy.wait('@login');

        //Assert on XHR
        cy.get('@login').then(function (xhr) {
            /*
            access_token: "f9845907-4f5a-4ee3-9d77-d14bdbe8e579"
             expires_in: 57609
             refresh_token: "cd27711d-6605-4a2c-a0c6-939ecdf55e93"
             scope: "read write"
             token_type: "bearer"
             */
            expect(xhr.status).to.eq(200);
            expect(xhr.requestHeaders).to.have.property('Content-Type');
            expect(xhr.method).to.eq('POST');
            expect(xhr.responseBody).to.have.property('access_token');
            expect(xhr.responseBody).to.have.property('expires_in');
            expect(xhr.responseBody).to.have.property('refresh_token');
            expect(xhr.responseBody).to.have.property('scope');
            expect(xhr.responseBody).to.have.property('token_type');
            cy.url().should("include","/admin");
        })
    });
});