context("Prodex Customers CRUD", () => {
    let addressId = null
    let filter = [{ "operator": "LIKE", "path": "Customer.name", "values": ["%Test%"] }]
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard*").as("inventoryLoading")
        cy.intercept("POST", "/prodex/api/customers/datagrid*").as("customersLoading")

        cy.viewport(2250, 2250)

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading")
        cy.openSettings()
        cy.get("[data-test='navigation_settings_locations_drpdn']").click()
        cy.wait("@customersLoading")
        cy.waitForUI()
    })

    it("Creates a Customer", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'customers', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'customers', itemId)
            })
        })
        cy.get('[data-test=settings_open_popup_btn]').click()
        cy.waitForUI()
// Bill To Address
        cy.enterText("#field_input_name", "Test")
        cy.enterText("input[id='field_input_billToAddress.addressName']", "Bill Address Name")
        cy.enterText("input[id='field_input_billToAddress.address.streetAddress']", "126 N G St")
        cy.enterText("input[id='field_input_billToAddress.address.city']", "Harlingen")

        cy.selectFromDropdown("div[id='field_dropdown_billToAddress.address.country']", "Bahamas")
        cy.waitForUI()
        cy.selectFromDropdown("div[id='field_dropdown_billToAddress.address.zip']", "75000")

        cy.enterText("input[id='field_input_billToAddress.contactName']", "Marie Currie")
        cy.get('input[name="billToAddress.contactPhone"]').type("1234567895")
        cy.enterText("input[id='field_input_billToAddress.contactEmail']", "marie@address.com")

// Warehouse
        cy.enterText("input[id='field_input_warehouseAddresses[0].addressName']", "Warehouse A")
        cy.enterText("input[id='field_input_warehouseAddresses[0].address.streetAddress']", "127 N G St")
        cy.enterText("input[id='field_input_warehouseAddresses[0].address.city']", "Harlingen")

        cy.selectFromDropdown("div[id='field_dropdown_warehouseAddresses[0].address.country']", "Bahamas")
        cy.waitForUI()
        cy.selectFromDropdown("div[id='field_dropdown_warehouseAddresses[0].address.zip']", "75000")

        cy.enterText("input[id='field_input_warehouseAddresses[0].contactName']", "James Newman")
        cy.get('input[name="warehouseAddresses[0].contactPhone"]').type("1234567895")
        cy.enterText("input[id='field_input_warehouseAddresses[0].contactEmail']", "marie@address.com")

        cy.get('[data-test=settings_branches_popup_submit_btn]').click()
        cy.waitForUI()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'customers', filter).then(itemId => {
                cy.openElement(itemId, 0)

                addressId = itemId
            })
        })
//Checking Billing address
        cy.get('#field_input_name').should("have.value", "Test")

        cy.get("input[id='field_input_billToAddress.addressName']").should("have.value", "Bill Address Name")

        cy.get("input[id='field_input_billToAddress.address.city']")
            .should("have.value", "Harlingen")

        cy.get("input[id='field_input_billToAddress.contactName']")
            .should("have.value", "Marie Currie")

        cy.get('[data-test=phone-number-input]')
            .should("have.value", "123 456 7895")

        cy.get("input[id='field_input_billToAddress.contactEmail']")
            .should("have.value", "marie@address.com")

        cy.get('[data-test="settings_branches_popup_reset_btn"]').click()
        cy.waitForUI()
        cy.contains('tr','Test').click()

        cy.contains("span","Warehouse A").click()
//Checking warehouse
        cy.get("#field_input_addressName").should("have.value", "Warehouse A")

        cy.get("input[id='field_input_address.city']")
            .should("have.value", "Harlingen")

        cy.get("#field_input_contactName")
            .should("have.value", "James Newman")

        cy.get('[data-test=phone-number-input]')
            .should("have.value", "123 456 7895")

        cy.get("#field_input_contactEmail")
            .should("have.value", "marie@address.com")
    })

    it("Edits a customer", () => {
        cy.openElement(addressId, 0)

        cy.get("input[id='field_input_billToAddress.contactName']")
            .clear()
            .type("Adolf Schwarzenegger")
            .should("have.value", "Adolf Schwarzenegger")

        cy.get('[data-test=settings_branches_popup_submit_btn]').click()

        cy.waitForUI()

        cy.openElement(addressId, 0)

        cy.get("input[id='field_input_billToAddress.contactName']")
            .should("have.value", "Adolf Schwarzenegger")
    })

    it("Checks error messages", () => {
        cy.settingsAdd()

        cy.get('[data-test=settings_branches_popup_submit_btn]').click()

        cy.get(".error")
            .should("have.length", 17)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Add new Customer warehouse", () => {
        cy.contains('tr','Test').click()
        cy.contains('button', 'Add New').click()

        cy.enterText("#field_input_addressName", "Warehouse B")
        cy.enterText("input[id='field_input_address.streetAddress']", "127 N G St")
        cy.enterText("input[id='field_input_address.city']", "Harlingen")

        cy.selectFromDropdown("div[id='field_dropdown_address.country']", "Bahamas")
        cy.waitForUI()
        cy.selectFromDropdown("div[id='field_dropdown_address.zip']", "75000")

        cy.enterText("input[id='field_input_contactName']", "James Newman")
        cy.get('input[name="contactPhone"]').type("1234567895")
        cy.enterText("input[id='field_input_contactEmail']", "marie@address.com")

        cy.get('[data-test=add_warehouse_sidebar_submit_btn]').click()
        cy.waitForUI()

        cy.contains("span","Warehouse B").click()
//Checking warehouse
        cy.get("#field_input_addressName").should("have.value", "Warehouse B")

        cy.get("input[id='field_input_address.city']")
            .should("have.value", "Harlingen")

        cy.get("#field_input_contactName")
            .should("have.value", "James Newman")

        cy.get('[data-test=phone-number-input]')
            .should("have.value", "123 456 7895")

        cy.get("#field_input_contactEmail")
            .should("have.value", "marie@address.com")
    })

    it("Edit Customer warehouse", () => {
        cy.contains('tr','Test').click()
        cy.contains("span","Warehouse A").click()

        cy.get("input[id='field_input_contactName']")
            .clear()
            .type("Adolf Schwarzenegger")
            .should("have.value", "Adolf Schwarzenegger")

        cy.get('[data-test=add_warehouse_sidebar_submit_btn]').click()

        cy.waitForUI()

        cy.contains("span","Warehouse A").click()

        cy.get("input[id='field_input_contactName']")
            .should("have.value", "Adolf Schwarzenegger")
    })


    it("Deletes a Customer", () => {
        cy.openElement(addressId, 1)

        cy.get('[data-test=confirm_dialog_proceed_btn]').click()

        cy.contains("Test").should("not.exist")

        cy.reload()
        cy.wait("@customersLoading")

        cy.contains("Test").should("not.exist")
    })
})