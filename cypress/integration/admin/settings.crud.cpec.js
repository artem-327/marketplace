context("Admin Settings RUD", () => {

    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("GET", "/prodex/api/dashboard").as("loading")
        cy.route("GET", "/prodex/api/settings/admin").as("adminLoading")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@loading")
        cy.url().should("include", "dashboard")

        cy.get('.flex-wrapper > :nth-child(7)').click()
        cy.waitForUI()
        cy.get('[data-test=tabs_menu_item_admin-settings]').click()

        cy.wait("@adminLoading")
        cy.waitForUI()
    })

    it("Update settings", function () {
        cy.contains("Other Settings")
//TODO Selector workaround
        cy.get(":nth-child(30)").within(() => {
            cy.get("input")
                .clear()
                .type("tomas-artio@email.cz")
        })

        cy.get("button[class='ui primary button']").click({force: true})
        cy.wait(1000)

        cy.contains("Success!")

       /* cy.get(":nth-child(30)").within(() => {
            cy.get("input")
                .should("contain", "operations@echoexchange.net")
        })*/
    })
})