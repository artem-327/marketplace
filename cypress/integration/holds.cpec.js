xcontext("Holds tests", () => {

    let warehouseFilter = [{"operator": "EQUALS", "path": "ProductOffer.warehouse.id", "values": [9]}]
    let warehouseOffer = null
    let holdId = null
    const userJSON1 = require('../fixtures/user.json')
    const userJSON2 = require('../fixtures/user2.json')

    beforeEach(function () {
        cy.viewport(2750, 3000)
        cy.intercept("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.intercept("POST", '/prodex/api/product-offers/broadcasted/datagrid**').as('marketplaceLoading')
        cy.intercept("POST", '/prodex/api/holds/my/datagrid/').as('holdLoading')
        cy.intercept("PATCH", '**/approve').as('holdApprove')

        cy.FElogin(userJSON1.email, userJSON1.password)
        cy.waitForUI()

        cy.visit("/marketplace/listings")
        cy.wait('@marketplaceLoading', {timeout: 30000})
    })

    after(function() {
        cy.getUserToken(userJSON1.email, userJSON1.password).then(token => {
            if(holdId != null){
                cy.cancelOffer(token,holdId)
            }
            cy.deleteWholeCart(token)
            cy.getRefreshToken(userJSON1.email, userJSON1.password).then(refreshTok => {
                cy.refreshToken(refreshTok)
            })
        })
    })

    it("Adds item to hold", () => {
        cy.waitForUI()
        cy.getUserToken(userJSON1.email, userJSON1.password).then(token => {
            cy.getMarketPlaceFilteredDatagridBody(token, warehouseFilter).then(sameWarehouseOffers => {
                let marketPlaceId = sameWarehouseOffers[0].id
                warehouseOffer = marketPlaceId
                let marketPlaceName = sameWarehouseOffers[0].companyProduct.companyGenericProduct.name

                cy.get("input[type=text]").type(marketPlaceName, {force: true})
                cy.get('.active > .menu > .item').eq(0).click()
                cy.wait('@marketplaceLoading', {timeout: 30000})

                cy.waitForUI()
                cy.openElement(marketPlaceId, 2)
                cy.get("[data-test='add_cart_quantity_inp']").find("input").type("1")

                cy.get("[data-test=add_cart_create_request_hold_btn]").click()

                cy.url().should("include", "/holds")
                cy.get("[data-test='table_row_action']").find("[role='listbox']").eq(0).should("exist")
            })
        })

    })

    it("Approve hold", () => {
        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
        cy.waitForUI()

        cy.FElogin(userJSON2.email, userJSON2.password)

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

        cy.getUserToken(userJSON2.email, userJSON2.password).then(token => {
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

        cy.getUserToken(userJSON1.email, userJSON1.password).then(token => {
            //Check product name
            cy.getItemBody(token, warehouseOffer).then(itemBody => {
                cy.get('.StyledComponents__CustomHeader-sc-17etn3b-5').should('contain', itemBody.companyProduct.companyGenericProduct.name)
            })
        })
    })
})