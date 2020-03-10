context("Conditions CRUD", () => {

    let conditionId = null
    let filter = [{"operator": "LIKE", "path": "ProductCondition.name", "values": ["%Half%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/cas-products/datagrid").as("loading")
        cy.route("POST", "/prodex/api/product-conditions/datagrid").as("formsLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "admin")

        cy.wait("@loading")

        cy.get("[data-test='tabs_menu_item_6']").click()

        cy.wait("@formsLoad")
    })

    it("Creates a condition", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'product-conditions', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-conditions', itemId)
            })
        })
        cy.clickAdd()

        cy.enterText("#field_input_val0", "Half")
        cy.clickSave()
        cy.contains("Info!")

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

        cy.contains("Info!")

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