context("Prodex Branches CRUD", () => {
    let branchId = null
    let filter = [
        { "operator": "LIKE", "path": "Branch.deliveryAddress.addressName", "values": ["%Harlingen%"] },
        { "operator": "LIKE", "path": "Branch.deliveryAddress.address.streetAddress", "values": ["%Harlingen%"] },
        { "operator": "LIKE", "path": "Branch.deliveryAddress.address.city", "values": ["%Harlingen%"] }
    ]
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.intercept("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.intercept("GET", "/prodex/api/settings/user").as("settingsLoading")
        cy.intercept("POST", "/prodex/api/branches/datagrid").as("branchesLoadingPOST")
        cy.intercept("POST", "/prodex/api/branches").as("branchCreate")
        cy.intercept("POST", "/prodex/api/customers/datagrid").as("customersPOST")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading", { timeout: 100000 })
        cy.openSettings()
        cy.waitForUI()
        cy.get("[data-test='navigation_settings_locations_drpdn']").click()
        cy.wait("@customersPOST")

        cy.contains("Branches").click()
        cy.wait("@branchesLoadingPOST")
        cy.waitForUI()
    })

    it("Creates a branch", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'branches', filter).then(itemId => {
                if (itemId != null)
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
        cy.get("div[data-test='settings_branches_popup_phoneEmail_inp']").find("input[placeholder = 'Phone Number']").type("1234567895")
        cy.enterText("input[id='field_input_deliveryAddress.contactEmail']", "test@central.com")

        cy.get('[data-test=settings_branches_popup_submit_btn]').click()
        cy.wait("@branchCreate")
        cy.wait("@branchCreate").then(({ request, response }) => {
            expect(response.statusCode).to.eq(201)
        })
        cy.get('[data-test=settings_branches_popup_reset_btn]').click()
        cy.waitForUI()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstBranchIdWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                branchId = itemId
            })
        })

        cy.get("input[id='field_input_deliveryAddress.address.city']")
            .should("have.value", "Harlingen")

        cy.get("input[id='field_input_deliveryAddress.contactName']")
            .should("have.value", "David Cameron")

        cy.get("div[data-test='settings_branches_popup_phoneEmail_inp']").find("input[placeholder = 'Phone Number']").should("have.value", "123 456 7895")
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

        cy.get('[data-test=settings_branches_popup_submit_btn]').click()

        cy.searchInList("Arnold")
        cy.wait("@branchesLoadingPOST")
        cy.waitForUI()
        cy.openElement(branchId, 0)

        cy.get("input[id='field_input_deliveryAddress.addressName']")
            .should("have.value", "Arnold Schwarzenegger")
    })

    it("Checks error messages", () => {
        cy.settingsAdd()

        cy.get('[data-test=settings_branches_popup_submit_btn]').click()

        cy.get(".error")
            .should("have.length", 8)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a branch", () => {
        cy.searchInList("Arnold")

        cy.openElement(branchId, 1)

        cy.get('[data-test=confirm_dialog_proceed_btn]').click()

        cy.contains("Central branch").should("not.exist")

        cy.reload()
        cy.wait("@branchesLoadingPOST")

        cy.contains("Central branch").should("not.exist")
    })
})