/**
 * Created by ARTIO on 23.5.2019.
 */

context("Login and logout", () => {
    const merchantUser = require('../fixtures/merchant.json')
    const orderProcessingUser = require('../fixtures/orderProcessing.json')
    const orderViewUser = require('../fixtures/orderView.json')
    const productCatalogUser =  require('../fixtures/productCatalogAdmin.json')
    const productOfferManager  =  require('../fixtures/productOfferManager.json')
    const userAdmin =  require('../fixtures/userAdmin.json')
    const echoOperator =  require('../fixtures/echoOperator.json')

    it('Bad credentials', () => {
        cy.server()
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/oauth/token').as('login')

        cy.visit("")
        cy.url().should("include", "login")
        cy.get("input[name=username]")
            .type("admin@example.com")
            .should("have.value", "admin@example.com")
        cy.get("input[name=password]")
            .type("test")
            .should("have.value", "test")
        cy.get("button[type=submit]").click({force: true})

        cy.wait('@login')

        //Assert on XHR
        cy.get('@login').then(function (xhr) {
            expect(xhr.status).to.eq(400)
            expect(xhr.requestHeaders).to.have.property('Content-Type')
            expect(xhr.method).to.eq('POST')
            expect(xhr.responseBody).to.have.property('error')
            expect(xhr.responseBody).to.have.property('error_description')
            cy.get(".error.message p")
                .should("have.text", "Bad credentials")
        })
    })

    it('Admin login and logout', () => {
        cy.server()
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/oauth/token').as('login')
        cy.route('POST', '/auth/logout').as('logout')

        cy.visit("")
        cy.url().should("include", "login")
        cy.get("input[name=username]")
            .type("admin@example.com")
            .should("have.value", "admin@example.com")
        cy.get("input[name=password]")
            .type("echopass123")
            .should("have.value", "echopass123")
        cy.get("button[type=submit]").click({force: true})

        cy.wait('@login')

        //Assert on XHR
        cy.get('@login').then(function (xhr) {
            expect(xhr.status).to.eq(200)
            expect(xhr.requestHeaders).to.have.property('Content-Type')
            expect(xhr.method).to.eq('POST')
            expect(xhr.url).to.contain("oauth/token")
            expect(xhr.responseBody).to.have.property('access_token')
            expect(xhr.responseBody).to.have.property('expires_in')
            expect(xhr.responseBody).to.have.property('refresh_token')
            expect(xhr.responseBody).to.have.property('scope')
            expect(xhr.responseBody).to.have.property('token_type')
            expect(xhr.responseBody.token_type).to.eq("bearer")
        })

        cy.url().should("include", "/admin")
        cy.wait(200)
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
        cy.visit("admin")
        cy.url().should("include", "/login")
    })

    it('Normal user login and logout', () => {
        cy.server()
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/oauth/token').as('login')
        cy.route('POST', '/auth/logout').as('logout')

        cy.visit("")
        cy.url().should("include", "login")
        cy.get("input[name=username]")
            .type("mackenzie@echoexchange.net")
            .should("have.value", "mackenzie@echoexchange.net")
        cy.get("input[name=password]")
            .type("echopass123")
            .should("have.value", "echopass123")
        cy.get("button[type=submit]").click({force: true})

        cy.wait('@login')

        //Assert on XHR
        cy.get('@login').then(function (xhr) {
            expect(xhr.status).to.eq(200)
            expect(xhr.requestHeaders).to.have.property('Content-Type')
            expect(xhr.method).to.eq('POST')
            expect(xhr.url).to.contain("oauth/token")
            expect(xhr.responseBody).to.have.property('access_token')
            expect(xhr.responseBody).to.have.property('expires_in')
            expect(xhr.responseBody).to.have.property('refresh_token')
            expect(xhr.responseBody).to.have.property('scope')
            expect(xhr.responseBody).to.have.property('token_type')
            expect(xhr.responseBody.token_type).to.eq("bearer")
        })

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
        cy.visit("dashboard")
        cy.url().should("include", "/login")
    })

    it('Disabled user login', () => {
        cy.server()
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/oauth/token').as('login')
        cy.route('POST', '/auth/logout').as('logout')

        cy.visit("")
        cy.url().should("include", "login")
        cy.get("input[name=username]")
            .type("testUser1@server.com")
            .should("have.value", "testUser1@server.com")
        cy.get("input[name=password]")
            .type("echopass123")
            .should("have.value", "echopass123")
        cy.get("button[type=submit]").click({force: true})

        cy.wait('@login')

        cy.contains("Bad credentials")
    })

    it('Merchant login and logout', () => {
        cy.server()
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/api/product-offers/own/datagrid/').as('login')
        cy.FElogin(merchantUser.email, merchantUser.password)

        //Assert on XHR
        cy.wait('@login', {timeout: 30000})

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })

    it('Order view login and logout', () => {
        cy.server()
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/api/product-offers/own/datagrid/').as('login')
        cy.FElogin(orderViewUser.email, orderViewUser.password)

        //Assert on XHR
        cy.wait('@login', {timeout: 30000})

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })

    it('Order processing login and logout', () => {
        cy.server()
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/api/product-offers/own/datagrid/').as('login')
        cy.FElogin(orderProcessingUser.email, orderProcessingUser.password)

        //Assert on XHR
        cy.wait('@login', {timeout: 30000})

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })

    it('Product Catalog Admin login and logout', () => {
        cy.server()
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/api/product-offers/own/datagrid/').as('login')
        cy.FElogin(productCatalogUser.email, productCatalogUser.password)

        //Assert on XHR
        cy.wait('@login', {timeout: 30000})

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })

    it('Product Offer Manager login and logout', () => {
        cy.server()
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/api/product-offers/own/datagrid/').as('login')
        cy.FElogin(productOfferManager.email, productOfferManager.password)

        //Assert on XHR
        cy.wait('@login', {timeout: 30000})

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })

    it('User admin login and logout', () => {
        cy.server()
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/api/product-offers/own/datagrid/').as('login')
        cy.FElogin(userAdmin.email, userAdmin.password)

        //Assert on XHR
        cy.wait('@login', {timeout: 30000})

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })

    it('Echo Operator login and logout', () => {
        cy.server()
        //This is the post call we are interested in capturing
        cy.route('POST', '/prodex/api/product-offers/own/datagrid/').as('login')
        cy.FElogin(echoOperator.email, echoOperator.password)

        //Assert on XHR
        cy.wait('@login', {timeout: 30000})

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })
})