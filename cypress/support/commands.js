// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("FElogin", (email, password) => {
    cy.server()
    //This is the post call we are interested in capturing
    cy.route('POST', '/prodex/oauth/token').as('login')
    cy.visit("")
    cy.url().should("include", "login")
    cy.get("input[name=username]")
        .type(email)
    cy.get("input[name=password]")
        .type(password)
    cy.get("[data-test=login_submit_btn]").click({force: true})

    cy.wait('@login')

    //Assert on XHR
    cy.get('@login').then(function (xhr) {
        expect(xhr.status).to.eq(200)
        expect(xhr.responseBody).to.have.property('access_token')
    })
})

Cypress.Commands.add("FElogout", () => {
    cy.get(".right.menu .user.circle").click("center")
    cy.get(".right.menu .item.dropdown").should("have.class", "visible")
    cy.get(".right.menu .item.dropdown").contains("Logout").click("center")
    cy.url().should("include", "/login")
    cy.visit("admin")
    cy.url().should("include", "/login")
})

Cypress.Commands.add("waitForUI", () => {
    cy.wait(1500)
})

Cypress.Commands.add('login', (username, password) =>{
    cy.request({
        method: 'POST',
        url: '/prodex/oauth/token', // baseUrl is prepended to url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        headers: {
            authorization: "Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs",
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin'
        },
        body: {
            username: username,
            password: password,
            grant_type: 'password'
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        cy.setCookie('auth',JSON.stringify(response.body))
    })

    cy.visit('/inventory/my')
})

Cypress.Commands.add("openElement", (elementId, dropdownOption) => {
    cy.waitForUI()

    cy.get("[data-test=action_" + elementId + "]").scrollIntoView()
    cy.get("[data-test=action_" + elementId + "]").click()
    cy.get("[data-test=action_" + elementId + "_" + dropdownOption + "]").click()
})

Cypress.Commands.add('getRefreshToken', (username, password) =>{
    cy.request({
        method: 'POST',
        url: '/prodex/oauth/token', // baseUrl is prepended to url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        headers: {
            authorization: "Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs",
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin'
        },
        body: {
            username: username,
            password: password,
            grant_type: 'password'
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body.refresh_token
    })
})