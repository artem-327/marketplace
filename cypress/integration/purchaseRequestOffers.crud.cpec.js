context("Wanted Board Purchase Request Offers CRUD", () => {

    let productName = "Rukavice"
    let purchaseRequestId = null
    const userJSON = require('../fixtures/user.json')
    const user2JSON = require('../fixtures/user2.json')
    let purchaseRequestFilter = [{"operator": "EQUALS", "path": "PurchaseRequestOffer.productOffer.companyProduct.companyGenericProduct.productGroup.name", "values": [productName]}]

    before(function () {
        cy.getUserToken(user2JSON.email, user2JSON.password).then(token => {
            cy.createPurchaseRequest(token).then(inventoryBody => {

                let helper = inventoryBody
                purchaseRequestId = helper
            })
        })
    })

    after(function () {
        cy.getUserToken(user2JSON.email, user2JSON.password).then(token => {
            cy.getFirstPurchaseRequestWithFilter(token).then(inventoryBody => {
                cy.deleteEntity(token,'purchase-requests/id',inventoryBody)
            })
        })
    })

    beforeEach(function () {
        cy.viewport(3000, 2000)
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("POST", "/prodex/api/purchase-request-offers").as("createOffer")
        cy.route("POST", "/prodex/api/purchase-requests/other/datagrid**").as("wantedBoardLoading")
        cy.route("POST", "/prodex/api/purchase-requests/id/**").as("matchingLoading")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()
        cy.visit("/inventory/my-listings")
        cy.wait("@inventoryLoading", {timeout: 100000})
        cy.url().should("include", "inventory")

        cy.get('[data-test=navigation_menu_wanted_board_drpdn]').click()
        cy.wait("@wantedBoardLoading", { timeout: 30000 })
    })

    it("Create new Purchase Request Offer", () => {
        cy.openElement(purchaseRequestId, 0)

        cy.wait("@matchingLoading")

        cy.get("div.modal").within(() => {
            cy.get("[data-test='table_row_action']").eq(0).within(() => {
                cy.get("div.checkbox").click()
            })

            cy.get('.floated > .primary').click()

            cy.get("#field_dropdown_fulfillmentType").click()
            cy.contains("Complete fulfillment of the request immediately").click()
            cy.get('.floated > .primary').click()
        })

        cy.wait("@createOffer", { timeout: 100000 })
    })
/*
    it("Update purchase request Offer", () => {
        cy.get('[data-test=navigation_wanted_board_bids_sent_drpdn]').click()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, "purchase-request-offers/own" ,purchaseRequestFilter).then(itemId => {
                cy.get("[data-test=action_" + itemId + "_0]").parent().parent().click()
                cy.get("[data-test=action_" + itemId + "_0]").click()
            })
        })

        cy.waitForUI()
        cy.setNumberInput("#field_input_pricePerUOM", "100")

        //Save button
        cy.get('.primary').click({force: true})
        cy.contains("Success")
        cy.waitForUI()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, "purchase-request-offers/own", purchaseRequestFilter).then(itemId => {
                cy.openElement(itemId, 0)
            })
        })
        cy.contains("100")
    })
*/
    it("Delete Purchase Request Offer", () => {
        cy.get('[data-test=navigation_wanted_board_bids_sent_drpdn]').click()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, "purchase-request-offers/own", purchaseRequestFilter).then(itemId => {
                cy.openElement(itemId, 0)
            })
        })

        cy.get("[data-test='confirm_dialog_proceed_btn']").click()
        cy.contains("Success")
    })
})