context("Market place tests",() => {

    beforeEach(function () {
        cy.server()
        cy.route("POST",'/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("POST", '/prodex/api/product-offers/broadcasted/datagrid/').as('marketplaceLoading')

        cy.login("user1@example.com", "echopass123")

        cy.url().should("include","inventory")

        cy.wait('@inventoryLoading')
        cy.contains("Marketplace").click()
        cy.get("[data-test=navigation_menu_marketplace_drpdn]").within(() => {
            cy.contains("Marketplace").click()
        })

        cy.wait("@marketplaceLoading")
    })

    it('Filter marketplace', () =>{
        cy.server()
        cy.route("GET",'/prodex/api/products/broadcasted/search?*').as('search')

        cy.get(".submenu-filter").click()

        cy.waitForUI()

        cy.get("div[name=search]")
            .children("input")
            .type("Monomethyl",{force: true} )

        cy.wait('@search')

        cy.contains("Monomethyl (3052-50-4)").click()

        cy.contains("Apply").click()

        let filter = [{"operator":"EQUALS","path":"ProductOffer.product.id","values":[230],"description":"Chemical Name","valuesDescription":["Monomethyl (3052-50-4)"],"tagDescription":["Monomethyl (3052-50-4)"]}]

        cy.getToken().then(token => {
            cy.getFirstMarketIdWithFilter(token,filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']')
            })
        })

        cy.get("#field_input_quantityTo").type("10")
        cy.contains("Apply").click()

        cy.get(".submenu-filter").click()
        cy.contains("No records found.")
    })
})