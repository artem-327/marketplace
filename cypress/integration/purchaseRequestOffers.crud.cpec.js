context("Wanted Board Purchase Request Offers CRUD", () => {

    let productName = "Rukavice"
    let purchaseRequestId = null
    const sellerJSON = require('../fixtures/user.json')
    const buyerJSON = require('../fixtures/user2.json')
    let purchaseRequestOfferFilter = [{"operator": "EQUALS", "path": "PurchaseRequestOffer.productOffer.companyProduct.companyGenericProduct.productGroup.name", "values": [productName]}]
    let purchaseRequestFilter = [{"operator": "EQUALS", "path": "PurchaseRequest.offers.productOffer.companyProduct.companyGenericProduct.productGroup.name", "values": [productName]}]

    before(function () {
        cy.getUserToken(buyerJSON.email, buyerJSON.password).then(token => {
            cy.createPurchaseRequest(token).then(inventoryBody => {

                let helper = inventoryBody
                purchaseRequestId = helper
            })
        })
    })

    after(function () {
        cy.getUserToken(buyerJSON.email, buyerJSON.password).then(token => {
            cy.getFirstPurchaseRequestWithFilter(token).then(inventoryBody => {
                cy.deleteEntity(token,'purchase-requests/id',inventoryBody)
            })
        })
    })

    beforeEach(function () {
        cy.viewport(3000, 2500)
        cy.intercept("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.intercept("POST", "/prodex/api/purchase-request-offers").as("createOffer")
        cy.intercept("POST", "/prodex/api/purchase-requests/other/datagrid**").as("wantedBoardLoading")
        cy.intercept("POST", "/prodex/api/purchase-requests/own/datagrid**").as("wantedBoardReceivedLoading")
        cy.intercept("POST", "/prodex/api/purchase-requests/id/**").as("matchingLoading")

        cy.FElogin(sellerJSON.email, sellerJSON.password)

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

    it("Buyer counter purchase request Offer", () => {
        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
        cy.waitForUI()

        cy.FElogin(buyerJSON.email, buyerJSON.password)

        cy.waitForUI()
        cy.visit("/wanted-board/bids-received")
        cy.wait("@wantedBoardReceivedLoading", { timeout: 100000 })

        cy.get("[data-test=action_" + purchaseRequestId + "_0]").parent().parent().parent().parent().parent().parent().click()

        cy.getUserToken(buyerJSON.email, buyerJSON.password).then(token => {
            cy.getPurchaseRequestFirstOfferId(token, purchaseRequestId).then(offerId => {
                cy.get("[data-test=action_" + purchaseRequestId + "_" +  offerId + "_5]").parent().parent().click()
                cy.get("[data-test=action_" + purchaseRequestId + "_" +  offerId + "_5").click()
            })
        })

        cy.get("#field_dropdown_fulfillmentType").click()
        cy.contains("Complete fulfillment of the request immediately").click()
        cy.get('.floated > .primary').click()
    })


    it("Seller counter purchase request Offer", () => {
        cy.get('[data-test=navigation_wanted_board_bids_sent_drpdn]').click()

        cy.getUserToken(sellerJSON.email, sellerJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, "purchase-request-offers/own" ,purchaseRequestOfferFilter).then(itemId => {
                cy.get("[data-test=action_" + itemId + "_1]").parent().parent().click()
                cy.get("[data-test=action_" + itemId + "_1]").click()
            })
        })

        cy.get("#field_dropdown_fulfillmentType").click()
        cy.contains("Complete fulfillment of the request immediately").click()
        cy.get('.floated > .primary').click()
    })

    it("Delete Purchase Request Offer", () => {
        cy.get('[data-test=navigation_wanted_board_bids_sent_drpdn]').click()

        cy.getUserToken(sellerJSON.email, sellerJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, "purchase-request-offers/own", purchaseRequestOfferFilter).then(itemId => {
                cy.openElement(itemId, 0)
            })
        })

        cy.get("[data-test='confirm_dialog_proceed_btn']").click()
        cy.contains("Success")
    })
})