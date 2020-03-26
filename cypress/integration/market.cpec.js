context("Market place tests",() => {
    const userJSON = require('../fixtures/user.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST","/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("POST", "/prodex/api/product-offers/broadcasted/datagrid/").as("marketplaceLoading")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait('@inventoryLoading', {timeout: 30000})
        cy.url().should("include", "inventory")
        cy.contains("Marketplace").click()

        cy.wait("@marketplaceLoading", {timeout: 30000})
    })

    it("Filter marketplace", () =>{
        let searchedValue = null

        cy.server()
        cy.route("GET","/prodex/api/echo-products/search/all-alternatives?**").as("search")

        cy.waitForUI()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
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

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getMarketPlaceDatagridBody(token).then(marketPlaceBody => {
                cy.get("[data-test=action_" + marketPlaceBody[0].id + "]")
            })
        })
        cy.get("[name='quantity'").click()
        cy.get("#field_input_quantityTo").type(searchedValue + 5)
        cy.contains("Apply").click()

        cy.contains("No records found.")
    })
})