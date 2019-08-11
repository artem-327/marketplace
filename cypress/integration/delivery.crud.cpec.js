context("Prodex Branches CRUD", () => {
    let addressId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("POST", '/prodex/api/delivery-addresses/datagrid').as('addressLoading')

        cy.login("user1@example.com", "echopass123")

        cy.url().should("include", "inventory")

        cy.wait('@inventoryLoading')
        cy.contains("Settings").click()

        cy.contains("DELIVERY ADDRESSES").click()

        cy.wait("@addressLoading")
        cy.waitForUI()
    })

    it("Creates a delivery address", () => {
        cy.clickAdd()

        cy.get("input[id='field_input_address.streetAddress']")
            .type("125 N G St")
            .should("have.value", "125 N G St")

        cy.get("input[id='field_input_address.city']")
            .type("Harlingen")
            .should("have.value", "Harlingen")

        cy.selectFromDropdown("div[id='field_dropdown_address.country']","Bahamas")

        cy.waitForUI()

        cy.selectFromDropdown("div[id='field_dropdown_address.zip']","75000")
       /* cy.get()
            .children("input")
            .type("75000")
            .should("have.value","75000")*/

        cy.get("#field_input_name")
            .type("Marie Currie")
            .should("have.value","Marie Currie")

        cy.get("#field_input_phoneNumber")
            .type("987654321")
            .should("have.value","987654321")

        cy.get("#field_input_email")
            .type("marie@address.com")
            .should("have.value","marie@address.com")

        cy.clickSave()

        cy.contains("Created Delivery Address")

        let filter = [{"operator":"LIKE","path":"DeliveryAddress.address.streetAddress","values":["%125 N G St%"]}]

        cy.getToken().then(token => {
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
            .should("have.value","987654321")

        cy.get("#field_input_email")
            .should("have.value","marie@address.com")
    })

    it("Edits a delivery address", () => {
        cy.get('[data-test=action_' + addressId + ']').click()

        cy.get('[data-test=action_' + addressId + '_0]').click()

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
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",7)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(at least 2 characters)|(zip code)|(Required)|(is required)/i)
        })
    })

    it("Deletes a branch", () => {
        cy.get('[data-test=action_' + addressId + ']').click()

        cy.get('[data-test=action_' + addressId + '_1]').click()

        cy.clickSave()

        cy.contains("125 N G St").should("not.exist")
    })
})