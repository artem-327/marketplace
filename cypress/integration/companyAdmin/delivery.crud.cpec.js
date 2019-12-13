context("Prodex Branches CRUD", () => {
    let addressId = null
    let filter = [{"operator":"LIKE","path":"DeliveryAddress.address.streetAddress","values":["%125 N G St%"]}]

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("GET", "/prodex/api/delivery-addresses/datagrid").as("addressLoading")
        cy.route("POST", "/prodex/api/delivery-addresses/datagrid").as("addressLoading")

        cy.FElogin("mackenzie@echoexchange.net", "echopass123")

        cy.wait("@inventoryLoading")
        cy.contains("Settings").click()

        cy.contains("DELIVERY ADDRESSES").click()

        cy.wait("@addressLoading")
        cy.waitForUI()
    })

    it("Creates a delivery address", () => {
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getFirstEntityWithFilter(token, 'delivery-addresses',filter).then(itemId => {
                if(itemId != null)
                    cy.deleteEntity(token, 'delivery-addresses/id', itemId)
            })
        })
        cy.settingsAdd()

        cy.enterText("#field_input_addressName", "Automatic")

        cy.enterText("input[id='field_input_address.streetAddress']", "125 N G St")
        cy.enterText("input[id='field_input_address.city']", "Harlingen")

        cy.selectFromDropdown("div[id='field_dropdown_address.country']","Bahamas")
        cy.waitForUI()
        cy.selectFromDropdown("div[id='field_dropdown_address.zip']","75000")

        cy.enterText("#field_input_contactName","Marie Currie")
        cy.get("div[data-test='settings_delivery_address_emailPhone_inp']").within(($form) => {
            cy.get("input[placeholder = 'Phone Number']").type("1234567895")
            cy.contains("+CCC").click()
            cy.contains("USA").click()
        })

        cy.enterText("#field_input_contactEmail","marie@address.com")

        cy.clickSave()

        cy.contains("Created Delivery Address")

        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getFirstAddressIdWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                addressId = itemId
            })
        })

        cy.contains("125 N G St")
        cy.contains("75000")

        cy.get("input[id='field_input_address.city']")
            .should("have.value","Harlingen")

        cy.get("#field_input_name")
            .should("have.value","Marie Currie")

        cy.get("#field_input_phoneNumber")
            .should("have.value","123 456 7895")

        cy.get("#field_input_contactEmail")
            .should("have.value","marie@address.com")
    })

    it("Edits a delivery address", () => {
        cy.get('[data-test=action_' + addressId + ']').click({force: true})
        cy.get('[data-test=action_' + addressId + '_0]').click({force: true})

        cy.get("#field_input_name")
            .clear()
            .type("Adolf Schwarzenegger")
            .should("have.value","Adolf Schwarzenegger")

        cy.clickSave()

        cy.get('[data-test=action_' + addressId + ']').click()
        cy.get('[data-test=action_' + addressId + '_0]').click()

        cy.get("#field_input_name")
            .should("have.value","Adolf Schwarzenegger")
    })

    it("Checks error messages", () => {
        cy.settingsAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",8)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a branch", () => {
        cy.get('[data-test=action_' + addressId + ']').click({force: true})
        cy.get('[data-test=action_' + addressId + '_1]').click({force: true})

        cy.clickSave()

        cy.contains("125 N G St").should("not.exist")

        cy.reload()
        cy.wait("@addressLoading")

        cy.contains("125 N G St").should("not.exist")
    })
})