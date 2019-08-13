context("Manufacturers CRUD", () => {

    let manufacturerId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/cas-products/datagrid').as('loading')
        cy.route("POST", '/prodex/api/manufacturers/datagrid').as('manufacturersLoad')

        cy.login("admin@example.com", "echopass123")

        cy.url().should("include", "admin")

        cy.wait('@loading')

        cy.get('[data-test="tabs_menu_item_3"]').click()

        cy.wait('@manufacturersLoad')
    })

    it("Creates a manufacturer", () => {
        cy.clickAdd()

        cy.get("#field_input_val0")
            .type("Test manufacturer")
            .should("have.value","Test manufacturer")

        cy.clickSave()

        cy.contains("Manufacturer created")

        cy.get("input[type=text]").type("Test")

        let filter = [{"operator":"LIKE","path":"Manufacturer.name","values":["%Test%"]}]

        cy.getToken().then(token => {
            cy.getFirstManufacturerWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                manufacturerId = itemId
            })
        })
        cy.get("#field_input_val0").should('have.value', "Test manufacturer")
    })

    it("Edits a manufacturer", () => {
        cy.get("input[type=text]").type("Test")

        cy.get('[data-test=action_' + manufacturerId + ']').click()

        cy.get('[data-test=action_' + manufacturerId + '_0]').click()

        cy.get("#field_input_val0")
            .clear()
            .type("Artio")
            .should("have.value","Artio")

        cy.clickSave()

        cy.contains("Updated Manufacturer")

        cy.get("input[type=text]").type("Test")

        cy.get('[data-test=action_' + manufacturerId + ']').click()
        cy.get('[data-test=action_' + manufacturerId + '_0]').click()

        cy.get("#field_input_val0").should('have.value', "Artio")
    })

    xit("Use a manufacturer", () => {

    })

    it("Checks error message", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",1)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a market segment", () => {
        cy.get("input[type=text]").type("Artio")

        cy.get('[data-test=action_' + manufacturerId + ']').click()
        cy.get('[data-test=action_' + manufacturerId + '_1]').click()

        cy.contains("Yes").click()

        cy.get('[data-test=action_' + manufacturerId + ']').should('not.exist')
    })
})