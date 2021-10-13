context("Conditions CRUD", () => {

    let conditionId = null
    let filter = [{"operator": "LIKE", "path": "ProductCondition.name", "values": ["%Half%"]}]
    let filterUpdate = [{"operator": "LIKE", "path": "ProductCondition.name", "values": ["%Spilled%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("GET", "/prodex/api/dashboard").as("loading")
        cy.route("POST", "/prodex/api/product-conditions/datagrid").as("formsLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "dashboard")

        cy.wait("@loading")

        cy.get('.flex-wrapper > :nth-child(6)').click()
        cy.waitForUI()
        cy.get('[data-test=navigation_admin_settings_conditions_drpdn]').click()
        cy.wait("@formsLoad")
    })

    it("Creates a condition", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'product-conditions', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-conditions', itemId)
            })
            cy.getFirstEntityWithFilter(token, 'product-conditions', filterUpdate).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-conditions', itemId)
            })
        })
        cy.clickAdd()

        cy.enterText("#field_input_val0", "Half")
        cy.clickSave()

        cy.getToken().then(token => {
            cy.getFirstConditionWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                conditionId = itemId
            })
        })
        cy.get("#field_input_val0").should("have.value", "Half")
    })

    it("Edits a condition", () => {
        cy.openElement(conditionId, 0)

        cy.get("#field_input_val0")
            .clear()
            .type("Spilled")
            .should("have.value", "Spilled")

        cy.clickSave()

        cy.openElement(conditionId, 0)

        cy.get("#field_input_val0").should("have.value", "Spilled")
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

    it("Deletes a condition", () => {
        cy.openElement(conditionId, 1)

        cy.contains("Yes").click()

        cy.get("[data-test=action_" + conditionId + "]").should("not.exist")
    })
})