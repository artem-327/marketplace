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
        cy.server()
        cy.route("GET","/prodex/api/echo-products/search/all-alternatives?**").as("search")

        cy.get(".submenu-filter").click()

        cy.waitForUI()

        cy.get("div[name=search]")
            .children("input")
            .type("ABEX",{force: true} )

        cy.wait("@search")

        cy.get(".layout__AccordionItem-sc-1doi5p4-5").within(() => {
            cy.contains("ABEX 18 S").click()
        })

        cy.contains("Apply").click()

        let filter = [{"operator":"EQUALS","path":"ProductOffer.companyProduct.echoProduct.id","values":[15]}]

        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getFirstMarketIdWithFilter(token,filter).then(itemId => {
                cy.get("[data-test=action_" + itemId + "]")
            })
        })

        cy.get("#field_input_quantityTo").type("10")
        cy.contains("Apply").click()

        cy.get(".submenu-filter").click()
        cy.contains("No records found.")
    })
})