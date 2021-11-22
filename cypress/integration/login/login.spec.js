/**
 * Created by ARTIO on 23.5.2019.
 */

context("Login and logout", () => {
    const merchantUser = require('../../fixtures/merchant.json')
    const orderProcessingUser = require('../../fixtures/orderProcessing.json')
    const orderViewUser = require('../../fixtures/orderView.json')
    const productCatalogUser =  require('../../fixtures/productCatalogAdmin.json')
    const productOfferManager  =  require('../../fixtures/productOfferManager.json')
    const userAdmin =  require('../../fixtures/userAdmin.json')
    const operator =  require('../../fixtures/operator.json')

    it('Bad credentials', () => {
        //This is the post call we are interested in capturing
        cy.intercept('POST', '/prodex/oauth/token').as('login')

        cy.visit("")
        cy.url().should("include", "login")
        cy.get("input[name=username]")
            .type("admin@example.com")
            .should("have.value", "admin@example.com")
        cy.get("input[name=password]")
            .type("test")
            .should("have.value", "test")
        cy.get("button[type=submit]").click({force: true})

        //Assert on XHR
        cy.wait('@login').then(({ request, response }) => {
            expect(response.statusCode).to.eq(400)
            cy.get(".error.message p")
                .should("have.text", "Bad credentials")
        })
    })

    it('Admin login and logout', () => {
        //This is the post call we are interested in capturing
        cy.intercept('POST', '/prodex/oauth/token').as('login')
        cy.intercept('POST', '/auth/logout').as('logout')

        cy.visit("")
        cy.url().should("include", "login")
        cy.get("input[name=username]")
            .type("admin@example.com")
            .should("have.value", "admin@example.com")
        cy.get("input[name=password]")
            .type("echopass123")
            .should("have.value", "echopass123")
        cy.get("button[type=submit]").click({force: true})
        //Assert on XHR
        cy.wait('@login').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })

        cy.url().should("include", "/dashboard")
        cy.wait(200)
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })

    it('Normal user login and logout', () => {
        //This is the post call we are interested in capturing
        cy.intercept('POST', '/prodex/oauth/token').as('login')
        cy.intercept('POST', '/auth/logout').as('logout')

        cy.visit("")
        cy.url().should("include", "login")
        cy.get("input[name=username]")
            .type("mackenzie@echoexchange.net")
            .should("have.value", "mackenzie@echoexchange.net")
        cy.get("input[name=password]")
            .type("echopass123")
            .should("have.value", "echopass123")
        cy.get("button[type=submit]").click({force: true})
        //Assert on XHR
        cy.wait('@login').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
        cy.visit("dashboard")
        cy.url().should("include", "/login")
    })

    it('Disabled user login', () => {
        //This is the post call we are interested in capturing
        cy.intercept('POST', '/prodex/oauth/token').as('login')
        cy.intercept('POST', '/auth/logout').as('logout')

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
        cy.FElogin(merchantUser.email, merchantUser.password)

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })

    it('Order view login and logout', () => {
        cy.FElogin(orderViewUser.email, orderViewUser.password)

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })

    it('Order processing login and logout', () => {
        cy.FElogin(orderProcessingUser.email, orderProcessingUser.password)

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })

    it('Product Catalog Admin login and logout', () => {
        cy.FElogin(productCatalogUser.email, productCatalogUser.password)

        cy.waitForUI()
        cy.get('[data-test=navigation_menu_inventory_drpdn]').click()

        cy.get('[data-test=navigation_menu_inventory_my_products_drpdn]').click()
    })

    it('Product Offer Manager login and logout', () => {
        cy.FElogin(productOfferManager.email, productOfferManager.password)

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })

    it('User admin login and logout', () => {
        cy.FElogin(userAdmin.email, userAdmin.password)

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })

    it('Operator login and logout', () => {
        cy.FElogin(operator.email, operator.password)

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
    })
})