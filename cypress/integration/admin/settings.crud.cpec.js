context("Admin Settings RUD", () => {

    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/cas-products/datagrid").as("loading")
        cy.route("GET", "/prodex/api/settings/admin").as("adminLoading")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@loading")
        cy.url().should("include", "admin")

        cy.get("[data-test='tabs_menu_item_11']").click()

        cy.wait("@adminLoading")
        cy.waitForUI()
    })

    it("Update settings", function () {
        cy.contains("Other Settings")
//TODO Selector workaround
        cy.get(":nth-child(20)").within(() => {
            cy.get("textarea")
                .clear()
                .type("operations@echoexchange.net")
        })

        cy.get("button[class='ui primary button']").click({force: true})
        cy.wait(1000)

        cy.contains("System settings updated")

        cy.get(":nth-child(20)").within(() => {
            cy.get("textarea")
                .should("contain", "operations@echoexchange.net")
        })
    })
})