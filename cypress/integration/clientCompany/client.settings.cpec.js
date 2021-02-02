context("Client Settings CRUD", () => {
    const userJSON = require('../../fixtures/userClient.json')

    before(function () {
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/broadcasted/datagrid/').as('marketplaceLoading')
        cy.FElogin(userJSON.email, userJSON.password)
        cy.wait("@marketplaceLoading", { timeout: 30000 })
    })

    it("No Inventory shown", () => {
        cy.get("[data-test='navigation_menu_inventory_drpdn']").should("not.exist")
    })

    it("No Guest shown", () => {
        cy.get("[data-test='navigation_menu_manage_guests_drpdn']").should("not.exist")
    })

    it("No Wanted Board Listings shown", () => {
        cy.get("[data-test='navigation_wanted_board_listings_drpdn']").should("not.exist")
    })
})
