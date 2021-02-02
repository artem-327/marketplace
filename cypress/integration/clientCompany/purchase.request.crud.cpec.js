context("Wanted Board Client Purchase Request CRUD", () => {

    let productName = "Rukavice"
    const userJSON = require('../../fixtures/userClient.json')
    let purchaseRequestFilter = [{"operator": "EQUALS", "path": "PurchaseRequest.elements.productGroup.name", "values": [productName]}]

    beforeEach(function () {
        cy.viewport(3000, 2000)
        cy.intercept("POST", "/prodex/api/purchase-requests/own/datagrid*").as("inventoryLoading")
        cy.intercept("POST", "/prodex/api/purchase-requests").as("createRequest")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()
        cy.visit("/wanted-board/bids-received")
        cy.wait("@inventoryLoading", { timeout: 30000 })
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
        cy.get('[data-test=bids_received_open_popup_btn]').click()

        cy.selectProductGroup(productName)

        cy.setNumberInput("[id='field_input_quantity']", "10")
        cy.get('[data-test=my_requested_items_sidebar_save_btn]').click({force: true})

        cy.wait("@createRequest")

        cy.contains("10")
        cy.contains(productName)
    })

    it("Update purchase request", () => {
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
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'purchase-requests/own', purchaseRequestFilter).then(itemId => {
                cy.openElement(itemId, 1)
            })
        })

        cy.get("[data-test='confirm_dialog_proceed_btn']").click()
        cy.contains("Success")
    })
})