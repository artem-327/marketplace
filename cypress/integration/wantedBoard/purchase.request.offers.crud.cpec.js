context("Wanted Board Bids CRUD", () => {

    let productName = "Test Product"
    let purchaseRequestId = null
    const sellerJSON = require('../../fixtures/user.json')
    const buyerJSON = require('../../fixtures/user2.json')
    let purchaseRequestFilter = [{"operator": "EQUALS", "path": "WantedBoardRequest.productSearchPattern", "values": [productName]}]

    before(function () {
        cy.getUserToken(buyerJSON.email, buyerJSON.password).then(token => {
            cy.createPurchaseRequest(token, productName).then(inventoryBody => {

                let helper = inventoryBody
                purchaseRequestId = helper
            })
        })
    })

    after(function () {
        cy.getUserToken(buyerJSON.email, buyerJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'wanted-board/own', purchaseRequestFilter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'wanted-board/id', itemId)
            })
        })
    })

    beforeEach(function () {
        cy.viewport(2000, 2500)
        cy.intercept("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.intercept("PATCH", "prodex/api/wanted-board-direct-bids/update-submissions").as("createOffer")
        cy.intercept("POST", "/prodex/api/wanted-board/other/datagrid**").as("wantedBoardLoading")
        cy.intercept("POST", "/prodex/api/wanted-board/own/datagrid**").as("wantedBoardReceivedLoading")
        cy.intercept("POST", "/prodex/api/wanted-board/id/**/product-offers-datagrid").as("matchingLoading")
        cy.intercept("POST", "/prodex/api/product-offers/broadcasted/datagrid*").as("marketplaceLoading")

        cy.FElogin(sellerJSON.email, sellerJSON.password)

        cy.waitForUI()
        cy.url().should("include", "dashboard")

        cy.get('[data-test=navigation_menu_wanted_board_drpdn]').click()
        cy.wait("@wantedBoardLoading", { timeout: 30000 })
    })

    it("Create new Bid", () => {
        cy.contains("[data-test='table_row_action']",productName).click()
        cy.contains("[data-test='table_row_action']",productName).next().within(() => {
            cy.contains("button", "Respond").click()
        })

        cy.contains("button", "Use Existing Listing").click()
        cy.wait("@matchingLoading")

        cy.get("div.modal").within((modal) => {
            cy.get("[type='radio']").eq(0).parent().click({force: true})
            cy.contains("Submit").click()
        })

        cy.wait("@createOffer", { timeout: 100000 }).then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })
    })

    it("Open Bid In Marketplace", () => {
        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
        cy.waitForUI()

        cy.FElogin(buyerJSON.email, buyerJSON.password)

        cy.waitForUI()
        cy.waitForUI()
        cy.visit("/wanted-board/my-posts")

        cy.openElement(purchaseRequestId, 2)

        cy.wait("@marketplaceLoading", { timeout: 100000 })
        cy.url().should("include", "/marketplace")
        cy.get("div[class*='FilterTag']").should("be.visible")
    })

   xit("Delete Placed Bid", () => {

    })
})