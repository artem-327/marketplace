context("Prodex Branches CRUD", () => {
    let branchId = null
    let filter = [{"operator":"LIKE","path":"Branch.deliveryAddress.addressName","values":["%Central%"]},
        {"operator":"LIKE","path":"Branch.deliveryAddress.address.streetAddress","values":["%Central%"]},
        {"operator":"LIKE","path":"Branch.deliveryAddress.contactName","values":["%Central%"]}]

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("GET", "/prodex/api/settings/user").as("settingsLoading")
        cy.route("POST", "/prodex/api/branches/datagrid").as("branchesLoadingPOST")

        cy.FElogin("mackenzie@echoexchange.net", "echopass123")

        cy.wait("@inventoryLoading", {timeout: 100000})
        cy.contains("Settings").click()

        cy.wait("@settingsLoading", {timeout: 100000})

        cy.contains("BRANCHES").click()

        cy.wait("@branchesLoadingPOST")
        cy.waitForUI()
    })

    it("Creates a branch", () => {
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getFirstEntityWithFilter(token, 'branches',filter).then(itemId => {
                if(itemId != null)
                    cy.deleteEntity(token, 'branches', itemId)
            })
        })
        cy.settingsAdd()

        cy.enterText("input[id='field_input_deliveryAddress.addressName']", "Central branch")
        cy.enterText("input[id='field_input_deliveryAddress.address.streetAddress']", "125 N G St")
        cy.enterText("input[id='field_input_deliveryAddress.address.city']", "Harlingen")

        cy.selectFromDropdown("[data-test='address_form_country_drpdn']", "Bahamas")
        cy.waitForUI()
        cy.selectFromDropdown("div[id='field_dropdown_deliveryAddress.address.zip']", "75000")

        cy.enterText("input[id='field_input_deliveryAddress.contactName']", "David Cameron")
        cy.get("div[data-test='settings_warehouse_popup_phoneEmail_inp']").within(($form) => {
            cy.get("input[placeholder = 'Phone Number']").type("1234567895")
            cy.contains("+CCC").click()
            cy.contains("USA").click()
        })
        cy.enterText("input[id='field_input_deliveryAddress.contactEmail']", "test@central.com")

        cy.clickSave()

        cy.contains("Created Branch")

        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getFirstBranchIdWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                branchId = itemId
            })
        })

        cy.get("input[id='field_input_deliveryAddress.address.city']")
            .should("have.value", "Harlingen")

        cy.get("input[id='field_input_deliveryAddress.contactName']")
            .should("have.value", "David Cameron")


        cy.get("div[data-test='settings_warehouse_popup_phoneEmail_inp']").within(($form) => {
            cy.get("input[placeholder = 'Phone Number']").should("have.value", "123 456 7895")
        })

        cy.get("input[id='field_input_deliveryAddress.contactEmail']")
            .should("have.value", "test@central.com")
    })

    it("Edits a branch", () => {
        cy.searchInList("Central")

        cy.openElement(branchId, 0)

        cy.get("input[id='field_input_deliveryAddress.addressName']")
            .clear()
            .type("Arnold Schwarzenegger")
            .should("have.value", "Arnold Schwarzenegger")

        cy.clickSave()

        cy.openElement(branchId, 0)

        cy.get("input[id='field_input_deliveryAddress.addressName']")
            .should("have.value", "Arnold Schwarzenegger")
    })

    it("Checks error messages", () => {
        cy.settingsAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 7)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a branch", () => {
        cy.searchInList("Arnold")

        cy.openElement(branchId, 1)

        cy.clickSave()

        cy.contains("Central branch").should("not.exist")

        cy.reload()
        cy.wait("@branchesLoadingPOST")

        cy.contains("Central branch").should("not.exist")
    })
})