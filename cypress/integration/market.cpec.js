context("Marketplace tests",() => {
    const userJSON = require('../fixtures/user.json')

    beforeEach(function () {
        cy.intercept("POST","/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.intercept("POST", "/prodex/api/product-offers/broadcasted/datagrid").as("marketplaceLoading")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait('@inventoryLoading', {timeout: 30000})
        cy.url().should("include", "inventory")
        cy.contains("Marketplace").click()

        cy.wait("@marketplaceLoading", {timeout: 30000})
    })

    it("Filter marketplace", () =>{
        let searchedValue = null

        cy.intercept("GET","/prodex/api/product-groups/search?**").as("search")

        cy.waitForUI()

        cy.get("[data-test='my_inventory_advanced_filters_btn']").click()
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getMarketPlaceDatagridBody(token).then(marketPlaceBody => {
                searchedValue = marketPlaceBody[0].pkgAvailable

                cy.get("[name='searchProductGroup']").children("input")
                    .type(marketPlaceBody[0].companyProduct.companyGenericProduct.productGroup.name,{force: true} )
            })
        })
        cy.wait("@search")
        cy.waitForUI()

        cy.get(".visible > .item").eq(0).click()

        cy.contains("Apply").click()

        cy.waitForUI()
        cy.get('[data-test=table_row_action]').should("be.visible")

        cy.get("[data-test='my_inventory_advanced_filters_btn']").click()
        cy.get("#field_input_quantityTo").type(searchedValue + 5)
        cy.contains("Apply").click()

        cy.contains("No records found.")
    })
})