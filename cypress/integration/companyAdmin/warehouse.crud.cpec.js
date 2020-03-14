context("Prodex Warehouse CRUD", () => {
    let branchId = null
    let filter = [{"operator":"LIKE","path":"Branch.deliveryAddress.addressName","values":["%Central branch%"]},
        {"operator":"LIKE","path":"Branch.deliveryAddress.address.streetAddress","values":["%Central branch%"]},
        {"operator":"LIKE","path":"Branch.deliveryAddress.contactName","values":["%Central branch%"]}]
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("GET", "/prodex/api/settings/user").as("settingsLoading")
        cy.route("POST", "/prodex/api/branches/warehouses/datagrid").as("warehouseLoading")

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {cy.deleteWholeCart(token)})

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading", {timeout: 100000})
        cy.openSettings()
        cy.contains("Warehouses").click()

        cy.wait("@warehouseLoading")
        cy.waitForUI()
    })

    it("Creates a warehouse", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'branches/warehouses',filter).then(itemId => {
                if(itemId != null)
                    cy.deleteEntity(token, 'branches', itemId)
            })
        })
        cy.get("[data-test='settings_open_popup_btn']").click()

        cy.enterText("input[name='deliveryAddress.addressName']", "Central branch")
        cy.enterText("input[id='field_input_deliveryAddress.address.streetAddress']", "125 N G St")
        cy.enterText("input[id='field_input_deliveryAddress.address.city']", "Harlingen")

        cy.selectFromDropdown("div[id='field_dropdown_deliveryAddress.address.country']","Bahamas")
        cy.waitForUI()
        cy.selectFromDropdown("div[id='field_dropdown_deliveryAddress.address.zip']","75000")

        cy.enterText("input[id='field_input_deliveryAddress.contactName']","David Cameron")
        cy.get("div[data-test='settings_warehouse_popup_phoneEmail_inp']").within(($form) =>{
            cy.get("input[placeholder = 'Phone Number']").type("2025550156")
            cy.contains("+CCC").click()
            cy.contains("USA").click()
        })
        cy.enterText("input[id='field_input_deliveryAddress.contactEmail']","test@central.com")

        cy.get('[data-test=settings_warehouse_popup_submit_btn]').click()

        cy.contains("Info!")

        cy.searchInList("Central")

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'branches/warehouses',filter).then(itemId => {
                cy.openElement(itemId, 0)

                branchId = itemId
            })
        })

        cy.get("input[id='field_input_deliveryAddress.address.city']")
            .should("have.value","Harlingen")

        cy.get("input[id='field_input_deliveryAddress.contactName']")
            .should("have.value","David Cameron")

        cy.contains("202 555 0156")

        cy.get("input[id='field_input_deliveryAddress.contactEmail']")
            .should("have.value","test@central.com")
    })

    it("Edits a warehouse", () => {
        cy.openElement(branchId, 0)

        cy.get("input[id='field_input_deliveryAddress.contactName']")
            .clear()
            .type("Arnold Schwarzenegger")
            .should("have.value","Arnold Schwarzenegger")

        cy.get('[data-test=settings_warehouse_popup_submit_btn]').click()

        cy.openElement(branchId, 0)

        cy.get("input[id='field_input_deliveryAddress.contactName']")
            .should("have.value","Arnold Schwarzenegger")
    })

    it("Checks error messages", () => {
        cy.get("[data-test='settings_open_popup_btn']").click()

        cy.get('[data-test=settings_warehouse_popup_submit_btn]').click()

        cy.get(".error")
            .should("have.length",7)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a warehouse", () => {
        cy.openElement(branchId, 2)

        cy.clickSave()

        cy.contains("Central branch").should("not.exist")

        cy.reload()
        cy.wait("@warehouseLoading")

        cy.contains("Central branch").should("not.exist")
    })
})