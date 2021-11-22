context("Wanted Board Purchase Request CRUD", () => {

    let productName = "Test Product"
    const userJSON = require('../../fixtures/user.json')
    let purchaseRequestFilter = [{"operator": "EQUALS", "path": "WantedBoardRequest.productSearchPattern", "values": [productName]}]

    beforeEach(function () {
        cy.viewport(3000, 2000)
        cy.intercept("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.intercept("POST", "/prodex/api/wanted-board").as("createRequest")
        cy.intercept("PATCH", "/prodex/api/wanted-board/id/**").as("updateRequest")
        cy.intercept("DELETE", "/prodex/api/wanted-board/id/**").as("deleteRequest")
        cy.intercept("POST", "/prodex/api/wanted-board/other/datagrid**").as("wantedBoardOtherLoading")
        cy.intercept("POST", "/prodex/api/wanted-board/own/datagrid**").as("wantedBoardMyLoading")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()
        cy.url().should("include", "dashboard")

        cy.get('[data-test=navigation_menu_wanted_board_drpdn]').click()
        cy.wait("@wantedBoardOtherLoading", { timeout: 30000 })

        cy.get('[data-test=navigation_wanted_board_my_posts_drpdn]').click()
        cy.wait("@wantedBoardMyLoading", { timeout: 30000 })
    })

    after(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'wanted-board/own', purchaseRequestFilter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'wanted-board/id', itemId)
            })
        })
    })

    it("Create new Purchase Request", () => {
        cy.get("[data-test=my_inventory_import_btn]").click()

        cy.enterText("#field_input_productSearchPattern", productName)
        cy.setNumberInput("[id='field_input_quantity']", "10")
        cy.selectFromDropdown("div[id='field_dropdown_unit']", "liters")
        cy.selectFromDropdown("div[id='field_dropdown_deliveryProvince']", "California")

        cy.get('[data-test=wanted_board_sidebar_submit_btn]').click()

        cy.wait("@createRequest").then(({ request, response }) => {
            expect(response.statusCode).to.eq(201)
        })
        cy.waitForUI()
    })

    it("Update purchase request", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'wanted-board/own', purchaseRequestFilter).then(itemId => {
                cy.openElement(itemId, 0)
                cy.waitForUI()

                cy.setNumberInput("[id='field_input_quantity']", "100")
                cy.get('[data-test=wanted_board_sidebar_submit_btn]').click()

                cy.wait("@updateRequest").then(({ request, response }) => {
                    expect(response.statusCode).to.eq(200)
                })

                cy.openElement(itemId, 0)
                cy.waitForUI()

                cy.get("[id='field_input_quantity']").should("have.value", "100")
            })
        })
    })

    it("Delete Purchase Request", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'wanted-board/own', purchaseRequestFilter).then(itemId => {
                cy.openElement(itemId, 1)
            })
        })

        cy.get("[data-test='confirm_dialog_proceed_btn']").click()

        cy.wait("@deleteRequest").then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })

    })

    it("Purchase Request validation", () => {
        cy.get("[data-test=my_inventory_import_btn]").click()

        cy.get("[id='field_input_quantity']").click()
        cy.get('[data-test=wanted_board_sidebar_submit_btn]').click({force: true})

        cy.get(".error")
            .should("have.length", 4)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })
})