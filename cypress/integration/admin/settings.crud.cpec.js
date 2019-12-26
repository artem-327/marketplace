context("Admin Settings RUD", () => {

    let productId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/cas-products/datagrid").as("loading")
        cy.route("GET", "/prodex/api/settings/admin").as("adminLoading")

        cy.FElogin("admin@example.com", "echopass123")

        cy.wait("@loading")
        cy.url().should("include", "admin")

        cy.get("[data-test='tabs_menu_item_11']").click()

        cy.wait("@adminLoading")
        cy.waitForUI()
    })

    it("Update settings", function () {
        cy.contains("Other Settings")

        cy.get("#field_textarea_admin\\.Other\\ Settings\\.Operations\\ Email\\ Address\\.value\\.visible")
            .clear()
            .type("operations@echoexchange.net")

        cy.clickSave()

        cy.contains("System settings updated")

        cy.get("#field_textarea_admin\\.Other\\ Settings\\.Operations\\ Email\\ Address\\.value\\.visible")
            .should("contain", "operations@echoexchange.net")
    })
})