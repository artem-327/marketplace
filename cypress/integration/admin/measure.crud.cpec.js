context("Units of measure CRUD", () => {
    let filter = [{"operator": "LIKE", "path": "Unit.name", "values": ["%Test%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    before(function () {
        cy.getToken().then(token => {
            cy.finishTakeover(token)
        })
    })

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard*").as("loading")
        cy.intercept("POST", "/prodex/api/units/datagrid*").as("unitLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@loading")
        cy.waitForUI()

        cy.get('.flex-wrapper > :nth-child(6)').click()
        cy.waitForUI()
        cy.get('[data-test=navigation_admin_settings_units-of-measure_drpdn]').click()

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
        cy.get("#field_dropdown_val2").contains("piece").click()

        cy.enterText("#field_input_val3", "0.5")

        cy.clickSave()
    })

    it("Edits unit of measure", () => {
        cy.get("input[type=text]").eq(0).type("Test")
        cy.waitForUI()

        cy.get("[data-test='table_row_action']").find(".clickable").click({force: true})
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

        cy.get("[data-test='table_row_action']").find("div[role='listbox']").click({force: true})
        cy.contains("Delete").click()

        cy.contains("Yes").click()

        cy.contains("No records found.")
    })
})