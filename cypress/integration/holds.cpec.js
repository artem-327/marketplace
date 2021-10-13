context("Holds tests", () => {

    let warehouseFilter = [{"operator": "EQUALS", "path": "ProductOffer.warehouse.id", "values": [3]}]
    let warehouseOffer = null
    let holdId = null
    const userJSON1 = require('../fixtures/user.json')
    const userJSON2 = require('../fixtures/user2.json')

    beforeEach(function () {
        cy.viewport(2750, 1250)
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("POST", '/prodex/api/product-offers/broadcasted/datagrid/').as('marketplaceLoading')
        cy.route("POST", '/prodex/api/holds/my/datagrid/').as('holdLoading')
        cy.route("PATCH", '**/approve').as('holdApprove')


        cy.FElogin(userJSON1.email, userJSON1.password)
        cy.waitForUI()

        cy.visit("/inventory/my")
        cy.wait('@inventoryLoading', {timeout: 30000})
        cy.contains("Marketplace").click()

        cy.wait("@marketplaceLoading", {timeout: 30000})
    })

    after(function() {
        cy.getUserToken(userJSON1.email, userJSON1.password).then(token => {
            cy.cancelOffer(token,holdId)
            cy.deleteWholeCart(token)
            cy.getRefreshToken(userJSON1.email, userJSON1.password).then(refreshTok => {
                cy.refreshToken(refreshTok)
            })
        })
    })

    it("Adds item to hold", () => {
        cy.waitForUI()
        cy.getUserToken(userJSON1.email, userJSON1.password).then(token => {
            cy.getMarketPlaceFilteredDatagridBody(token, warehouseFilter).then(sameWarehouseOffer => {
                let marketPlaceId = sameWarehouseOffer[0].id
                warehouseOffer = marketPlaceId
                let marketPlaceName = sameWarehouseOffer[0].companyProduct.companyGenericProduct.name

                //Open tab
                if(sameWarehouseOffer[ 0 ].companyProduct.companyGenericProduct.productGroup == undefined){
                    cy.contains("Unmapped").click()
                }else{
                    marketPlaceName = sameWarehouseOffer[ 0 ].companyProduct.companyGenericProduct.productGroup.name

                    cy.contains(marketPlaceName).click()
                }
                cy.waitForUI()
                cy.openElement(marketPlaceId, 2)
                cy.get("[data-test='add_cart_quantity_inp']").within(() => {
                    cy.get("input").type("1")
                })

                cy.get("[data-test=add_cart_create_order_btn]").click()

                cy.url().should("include", "/holds")
                cy.get("[data-test='hold_row_action']").within(() => {
                    cy.get("tbody").should("be.visible")
                })
            })
        })

    })

    it("Approve hold", () => {
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()

        cy.FElogin(userJSON2.email, userJSON2.password)

        cy.waitForUI()
        cy.visit("/inventory/my")
        cy.wait('@inventoryLoading', {timeout: 30000})
        cy.url().should("include", "inventory")
        cy.contains("Marketplace").click()
        cy.waitForUI()

        cy.contains("HOLDS").click()
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
        cy.contains("HOLDS").click()
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