context("Wanted Board Purchase Request CRUD", () => {

    let productName = "Rukavice"
    const userJSON = require('../fixtures/user.json')
    let purchaseRequestFilter = [{"operator": "EQUALS", "path": "PurchaseRequest.elements.productGroup.name", "values": [productName]}]

    beforeEach(function () {
        cy.viewport(3000, 2000)
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("POST", "/prodex/api/purchase-requests").as("createRequest")
        cy.route("POST", "/prodex/api/purchase-requests/other/datagrid?**").as("wantedBoardLoading")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()
        cy.visit("/inventory/my-listings")
        cy.wait("@inventoryLoading", {timeout: 100000})
        cy.url().should("include", "inventory")

        cy.contains("Wanted Board").click()
        cy.wait("@wantedBoardLoading", { timeout: 30000 })
    })

    after(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'purchase-requests/own', purchaseRequestFilter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'purchase-requests/id', itemId)
            })
        })
    })

    it("Create new Purchase Request", () => {
        cy.get("[data-test=wanted_board_open_popup_btn]").click()

        cy.selectProductGroup(productName)

        cy.setNumberInput("[id='field_input_quantity']", "10")
        cy.get('[data-test=wanted_board_sidebar_save_btn]').click({force: true})

        cy.wait("@createRequest")

        cy.contains("10")
        cy.contains(productName)
    })

    it("Update purchase request", () => {
        cy.get('[data-test=navigation_wanted_board_bids_received_drpdn]').click()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'purchase-requests/own', purchaseRequestFilter).then(itemId => {
                cy.openElement(itemId, 0)
            })
        })

        cy.waitForUI()

        cy.setNumberInput("[id='field_input_quantity']", "100")

        cy.get('[data-test=my_requested_items_sidebar_save_btn]').click({force: true})
        cy.contains("Success")

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'purchase-requests/own', purchaseRequestFilter).then(itemId => {
                cy.openElement(itemId, 0)
            })
        })
        cy.contains("100")
    })

    it("Delete Purchase Request", () => {
        cy.get('[data-test=navigation_wanted_board_bids_received_drpdn]').click()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'purchase-requests/own', purchaseRequestFilter).then(itemId => {
                cy.openElement(itemId, 1)
            })
        })

        cy.get("[data-test='confirm_dialog_proceed_btn']").click()
        cy.contains("Success")
    })

    it("Purchase Request validation", () => {
        cy.get("[data-test=wanted_board_open_popup_btn]").click()

        cy.get("[id='field_input_quantity']").click()
        cy.get('[data-test=wanted_board_sidebar_save_btn]').click({force: true})

        cy.get(".error")
            .should("have.length", 2)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })
})