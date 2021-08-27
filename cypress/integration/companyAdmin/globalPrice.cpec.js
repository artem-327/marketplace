context("Prodex Global Price", () => {
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.intercept("GET", '/prodex/api/dashboard*').as('dashboardLoading')
        cy.intercept("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.intercept("GET", '/prodex/api/broadcast-rules/general').as('rulesLoading')
        cy.intercept("POST", '/prodex/api/broadcast-rules/general').as('rulesSaving')
        cy.viewport(1280, 800)

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.deleteWholeCart(token)
        })

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@dashboardLoading", { timeout: 100000 })
        cy.get('[data-test=navigation_menu_inventory_drpdn]').click()
        cy.wait("@inventoryLoading", { timeout: 100000 })
    })

    after(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.turnOnGlobalBroadcasting(token)
        })
    })

    it("Turns on the broadcasting", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.turnOffGlobalBroadcasting(token)
        })

        cy.get('[data-test=navigation_menu_inventory_global_price_book_drpdn]').click()

        cy.wait("@rulesLoading")
        cy.waitForUI()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui fitted toggle checkbox")
            .click()

        cy.get('[data-test=broadcast_global_save_btn]').click()
        cy.wait("@rulesSaving")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(1)
            .should("have.class", "ui checked fitted toggle checkbox")
    })

    it("Turns off the broadcasting", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.turnOnGlobalBroadcasting(token)
        })

        cy.get('[data-test=navigation_menu_inventory_global_price_book_drpdn]').click()

        cy.wait("@rulesLoading")
        cy.waitForUI()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()

        cy.get('[data-test=broadcast_global_save_btn]').click()
        cy.wait("@rulesSaving")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui fitted toggle checkbox")
    })

    it("Turns on the broadcasting for Albreta and USA only", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.turnOffGlobalBroadcasting(token)
        })

        cy.get('[data-test=navigation_menu_inventory_global_price_book_drpdn]').click()

        cy.wait("@rulesLoading")
        cy.waitForUI()

        cy.get('[data-test=broadcast_global_category_drpdn]').click()
        cy.contains("Region").click()

        cy.contains("Canada").click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(1)
            .should("have.class", "ui fitted toggle checkbox")
            .click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(3)
            .should("have.class", "ui fitted toggle checkbox")
            .click()

        cy.get('[data-test=broadcast_global_save_btn]').click()
        cy.wait("@rulesSaving")

        cy.get('[data-test=broadcast_global_category_drpdn]').click()
        cy.contains("Region").click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(1)
            .should("have.class", "ui checked fitted toggle checkbox")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(2)
            .should("have.class", "ui indeterminate fitted toggle checkbox")

    })

    it("Switch to Region broadcasting", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.turnOffGlobalBroadcasting(token)
        })

        cy.get('[data-test=navigation_menu_inventory_global_price_book_drpdn]').click()

        cy.wait("@rulesLoading")
        cy.waitForUI()

        cy.get('[data-test=broadcast_global_category_drpdn]').click()
        cy.contains("Region").click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui fitted toggle checkbox")
            .click()

        cy.get('[data-test=broadcast_global_save_btn]').click()
        cy.wait("@rulesSaving")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui checked fitted toggle checkbox")
    })
})