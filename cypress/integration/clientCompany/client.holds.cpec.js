context("Client Holds tests", () => {
    let warehouseOffer = null
    let holdId = null
    const userClientJSON = require('../../fixtures/userClient.json')
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.viewport(2750, 3000)
        cy.intercept("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.intercept("POST", '/prodex/api/product-offers/broadcasted/datagrid**').as('marketplaceLoading')
        cy.intercept("POST", '/prodex/api/holds/my/datagrid/').as('holdLoading')
        cy.intercept("PATCH", '**/approve').as('holdApprove')

        cy.FElogin(userClientJSON.email, userClientJSON.password)
        cy.waitForUI()

        cy.visit("/marketplace/listings")
        cy.wait('@marketplaceLoading', {timeout: 30000})
    })

    after(function() {
        cy.getUserToken(userClientJSON.email, userClientJSON.password).then(token => {
            if(holdId != null){
                cy.cancelOffer(token,holdId)
            }
            cy.deleteWholeCart(token)
            cy.getRefreshToken(userClientJSON.email, userClientJSON.password).then(refreshTok => {
                cy.refreshToken(refreshTok)
            })
        })
    })

    it("Adds item to hold", () => {
        cy.waitForUI()
        cy.getUserToken(userClientJSON.email, userClientJSON.password).then(token => {
            cy.getMarketPlaceFilteredDatagridBody(token, []).then(sameWarehouseOffers => {
                let marketPlaceId = sameWarehouseOffers[0].id
                warehouseOffer = marketPlaceId
                let marketPlaceName = sameWarehouseOffers[0].companyProduct.companyGenericProduct.name

                cy.get("input[type=text]").type(marketPlaceName, {force: true})
                cy.wait('@marketplaceLoading', {timeout: 30000})

                cy.waitForUI()
                cy.openElement(marketPlaceId, 2)
                cy.get("[data-test='add_cart_quantity_inp']").within(() => {
                    cy.get("input").type("1")
                })

                cy.get("[data-test=add_cart_create_request_hold_btn]").click()

                cy.url().should("include", "/holds")
                cy.get("[data-test='table_row_action']").within(() => {
                    cy.contains("Pending").should("be.visible")
                })
            })
        })

    })

    it("Approve hold", () => {
        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
        cy.waitForUI()

        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()
        cy.visit("/inventory/my-listings")
        cy.wait('@inventoryLoading', {timeout: 30000})
        cy.url().should("include", "inventory")
        cy.contains("Marketplace").click()
        cy.waitForUI()

        cy.get("[data-test='navigation_menu_marketplace_holds_drpdn']").click()
        cy.wait("@holdLoading", {timeout: 30000})

        cy.get("[name = 'holdDropdown']").click()
        cy.contains("Requsted Holds").click()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token,"holds/foreign",[{"operator":"EQUALS","path":"InventoryHold.status","values":["Pending"]}]).then(hold =>{
                cy.openElement(hold, 0)
                holdId = hold
            })
        })

        cy.wait("@holdApprove")
        cy.contains("Approved").should("be.visible")

})

    it("Order a placed hold", () => {
        cy.visit("/marketplace/holds")
        cy.wait("@holdLoading", {timeout: 30000})

        cy.openElement(holdId,1)

        cy.getUserToken(userClientJSON.email, userClientJSON.password).then(token => {
            //Check product name
            cy.getItemBody(token, warehouseOffer).then(itemBody => {
                cy.get('.StyledComponents__CustomHeader-sc-17etn3b-5').should('contain', itemBody.companyProduct.companyGenericProduct.name)
            })
        })
    })
})