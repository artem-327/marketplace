context("Prodex Delivery Addresses CRUD", () => {
    let addressId = null
    let filter = [{"operator": "LIKE", "path": "DeliveryAddress.address.streetAddress", "values": ["%126 N G St%"]}]
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("GET", "/prodex/api/delivery-addresses/datagrid").as("addressLoading")
        cy.route("POST", "/prodex/api/delivery-addresses/datagrid").as("addressLoading")

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {cy.deleteWholeCart(token)})
        cy.viewport(2250, 2250)

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading")
        cy.openSettings()
        cy.get("[data-test='navigation_settings_locations_drpdn']").click()

        cy.wait("@addressLoading")
        cy.waitForUI()
    })

    it("Creates a delivery address", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'delivery-addresses', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'delivery-addresses/id', itemId)
            })
        })
        cy.get('[data-test=settings_open_popup_btn]').click()
        cy.waitForUI()

        cy.enterText("#field_input_addressName", "Automatic")

        cy.enterText("input[id='field_input_address.streetAddress']", "126 N G St")
        cy.enterText("input[id='field_input_address.city']", "Harlingen")

        cy.selectFromDropdown("div[id='field_dropdown_address.country']", "Bahamas")
        cy.waitForUI()
        cy.selectFromDropdown("div[id='field_dropdown_address.zip']", "75000")

        cy.enterText("#field_input_contactName", "Marie Currie")
        //cy.get("div[data-test='settings_delivery_address_emailPhone_inp']").within(($form) => {
            cy.get('.phone-num').type("1234567895")
        //})

        cy.enterText("#field_input_contactEmail", "marie@address.com")

        cy.get('[data-test=settings_branches_popup_submit_btn]').click()
        cy.waitForUI()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstAddressIdWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                addressId = itemId
            })
        })

        cy.contains("126 N G St")
        cy.contains("75000")

        cy.get("input[id='field_input_address.city']")
            .should("have.value", "Harlingen")

        cy.get("#field_input_contactName")
            .should("have.value", "Marie Currie")

        cy.get('.PhoneNumber__StyledInputMask-smr14b-1')
            .should("have.value", "123 456 7895")

        cy.get("#field_input_contactEmail")
            .should("have.value", "marie@address.com")
    })

    it("Edits a delivery address", () => {
        cy.openElement(addressId, 0)

        cy.get("#field_input_contactName")
            .clear()
            .type("Adolf Schwarzenegger")
            .should("have.value", "Adolf Schwarzenegger")

        cy.get('[data-test=settings_branches_popup_submit_btn]').click()

        cy.waitForUI()

        cy.openElement(addressId, 0)

        cy.get("#field_input_contactName")
            .should("have.value", "Adolf Schwarzenegger")
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

    it("Deletes a delivery adress", () => {
        cy.openElement(addressId, 1)

        cy.get('[data-test=confirm_dialog_proceed_btn]').click()

        cy.contains("126 N G St").should("not.exist")

        cy.reload()
        cy.wait("@addressLoading")

        cy.contains("126 N G St").should("not.exist")
    })
})