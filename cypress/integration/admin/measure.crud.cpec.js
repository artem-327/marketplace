context("Units of measure CRUD", () => {
    let filter = [{"operator": "LIKE", "path": "Unit.name", "values": ["%Test%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("GET", "/prodex/api/packaging-groups").as("loading")
        cy.route("POST", "/prodex/api/units/datagrid").as("unitLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "admin")

        cy.wait("@loading")
        cy.waitForUI()

        cy.contains("Units of Measure").click()

        cy.wait("@unitLoad")
    })

    it("Creates an unit of measure", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'units', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'units', itemId)
            })
        })
        cy.clickAdd()

        cy.enterText("#field_input_val0", "Test measure")
        cy.enterText("#field_input_val1", "tmr")

        cy.get("#field_dropdown_val2").click()
        cy.get("#2").click()

        cy.enterText("#field_input_val3", "0.5")

        cy.clickSave()
    })

    it("Edits unit of measure", () => {
        cy.get("input[type=text]").eq(0).type("Test")
        cy.waitForUI()

        cy.get("[data-test='table_row_action']").within(() => {
            cy.get("div[role='listbox']").click()
        })
        cy.contains("Edit").click()

        cy.get("#field_input_val1")
            .clear()
            .type("test")
            .should("have.value", "test")

        cy.clickSave()
    })

    it("Checks error messages", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 4)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)|(Field should have at least 1 characters)/i)
        })
    })

    it("Deletes an unit of measure", () => {
        cy.searchInList("Test")

        cy.waitForUI()

        cy.get("[data-test='table_row_action']").within(() => {
            cy.get("div[role='listbox']").click()
        })

        cy.contains("Delete").click()

        cy.contains("Yes").click()

        cy.contains("No records found.")
    })
})