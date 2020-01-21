context("Market place tests",() => {

    beforeEach(function () {
        cy.server()
        cy.route("POST","/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("POST", "/prodex/api/product-offers/broadcasted/datagrid/").as("marketplaceLoading")

        cy.FElogin("mackenzie@echoexchange.net", "echopass123")

        cy.wait("@inventoryLoading")
        cy.contains("Marketplace").click()
        cy.get("[data-test=navigation_menu_marketplace_drpdn]").within(() => {
            cy.contains("Marketplace").click()
        })

        cy.wait("@marketplaceLoading")
    })

    it("Filter marketplace", () =>{
        let searchedValue = null

        cy.server()
        cy.route("GET","/prodex/api/echo-products/search/all-alternatives?**").as("search")

        cy.get(".submenu-filter").click()

        cy.waitForUI()

        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getMarketPlaceDatagridBody(token).then(marketPlaceBody => {
                searchedValue = marketPlaceBody[0].pkgAvailable

                cy.get("div[name=search]")
                    .children("input")
                    .type(marketPlaceBody[0].companyProduct.intProductName,{force: true} )
            })
        })

        cy.wait("@search")
        cy.waitForUI()

        cy.get(".visible > .item").eq(0).click()

        cy.contains("Apply").click()

        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getMarketPlaceDatagridBody(token).then(marketPlaceBody => {
                cy.get("[data-test=action_" + marketPlaceBody[0].id + "]")
            })
        })

        cy.get("#field_input_quantityTo").type(searchedValue + 5)
        cy.contains("Apply").click()

        cy.get(".submenu-filter").click()
        cy.contains("No records found.")
    })
})