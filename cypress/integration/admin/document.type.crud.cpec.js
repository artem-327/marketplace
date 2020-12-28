context("Document Types CRUD", () => {

    let tagsId = null
    let filter = [{"operator": "LIKE", "path": "DocumentType.name", "values": ["%TYPE%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard").as("loading")
        cy.intercept("POST", "/prodex/api/document-types/datagrid").as("typesLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "dashboard")

        cy.wait("@loading")

        cy.get('[data-test=navigation_menu_admin_document-types]').click()

        cy.wait("@typesLoad")
    })

    it("Creates a document", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'document-types', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'document-types/id', itemId)
            })
        })
        cy.get('[data-test=admin_table_add_btn]').click()

        cy.enterText("#field_input_val0", "TYPE")
        cy.clickSave()

        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'document-types', filter).then(itemId => {
                cy.openElement(itemId, 0)

                tagsId = itemId
            })
        })
        cy.get("#field_input_val0").should("have.value", "TYPE")
    })

    it("Edits a document", () => {
        cy.openElement(tagsId, 0)

        cy.get("#field_input_val0")
            .clear()
            .type("TYPE2")
            .should("have.value", "TYPE2")

        cy.clickSave()

        cy.openElement(tagsId, 0)

        cy.get("#field_input_val0").should("have.value", "TYPE2")
    })

    it("Checks error message", () => {
        cy.get('[data-test=admin_table_add_btn]').click()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 1)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a document", () => {
        cy.openElement(tagsId, 1)

        cy.contains("Yes").click()

        cy.get("[data-test=action_" + tagsId + "]").should("not.exist")
    })
})