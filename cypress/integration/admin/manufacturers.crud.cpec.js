context("Manufacturers CRUD", () => {

    let manufacturerId = null
    let filter = [{"operator": "LIKE", "path": "Manufacturer.name", "values": ["%Test%"]}]

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/cas-products/datagrid").as("loading")
        cy.route("POST", "/prodex/api/manufacturers/datagrid").as("manufacturersLoad")

        cy.FElogin("admin@example.com", "echopass123")

        cy.url().should("include", "admin")

        cy.wait("@loading")

        cy.get("[data-test='tabs_menu_item_3']").click()

        cy.wait("@manufacturersLoad")
    })

    it("Creates a manufacturer", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'manufacturers',filter).then(itemId => {
                if(itemId != null)
                    cy.deleteEntity(token, 'manufacturers/id', itemId)
            })
        })
        cy.clickAdd()

        cy.enterText("#field_input_val0", "Test manufacturer")

        cy.clickSave()

        cy.contains("Manufacturer created")

        cy.searchInList("Test")

        cy.getToken().then(token => {
            cy.getFirstManufacturerWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                manufacturerId = itemId
            })
        })
        cy.get("#field_input_val0").should("have.value", "Test manufacturer")
    })

    it("Edits a manufacturer", () => {
        cy.searchInList("Test")

        cy.openElement(manufacturerId, 0)

        cy.get("#field_input_val0")
            .clear()
            .type("Artio")
            .should("have.value", "Artio")

        cy.clickSave()

        cy.contains("Updated Manufacturer")
        cy.waitForUI()

        cy.searchInList("Artio")

        cy.openElement(manufacturerId, 0)

        cy.get("#field_input_val0").should("have.value", "Artio")
    })

    it("Checks error message", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 1)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a market segment", () => {
        cy.searchInList("Artio")

        cy.openElement(manufacturerId, 1)

        cy.contains("Yes").click()

        cy.get("[data-test=action_" + manufacturerId + "]").should("not.exist")
    })
})