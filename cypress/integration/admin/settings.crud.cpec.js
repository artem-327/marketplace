context("Admin Settings RUD", () => {

    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("GET", "/prodex/api/dashboard").as("loading")
        cy.route("GET", "/prodex/api/settings/admin").as("adminLoading")
        cy.route("PATCH", "/prodex/api/settings/admin").as("settingsSaving")
        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@loading")
        cy.url().should("include", "dashboard")

        cy.get('.flex-wrapper > :nth-child(6)').click()
        cy.waitForUI()
        cy.get('[data-test=navigation_admin_settings_admin-settings_drpdn]').click()

        cy.wait("@adminLoading")
        cy.waitForUI()
    })

    it("Update settings", function () {
        cy.contains("Other Settings")
//TODO Selector workaround
        cy.get("div:nth-child(32)").within(() => {
            cy.get("input")
                .clear()
                .type("tomas-artio@email.cz")
        })

        //cy.get('#field_input_admin\.OTHER_SETTINGS\.APP_OPERATIONS_EMAIL_ADDRESS\.value\.visible').clear()
        //    .type("tomas-artio@email.cz")
        cy.get("button[class='ui primary button']").click({force: true})
        cy.wait(1000)

        cy.get('@settingsSaving').should('have.property', 'status', 200)

       /* cy.get(":nth-child(30)").within(() => {
            cy.get("input")
                .should("contain", "operations@echoexchange.net")
        })*/
    })
})