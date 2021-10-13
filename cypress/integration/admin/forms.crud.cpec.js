context("Form CRUD", () => {

    let formId = null
    let filter = [{"operator": "LIKE", "path": "ProductForm.name", "values": ["%Liquor%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("GET", "/prodex/api/dashboard").as("loading")
        cy.route("POST", "/prodex/api/product-forms/datagrid").as("formsLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "dashboard")

        cy.wait("@loading")

        cy.get('.flex-wrapper > :nth-child(6)').click()
        cy.waitForUI()
        cy.get('[data-test=navigation_admin_settings_forms_drpdn]').click()

        cy.wait("@formsLoad")
    })

    it("Creates a form", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'product-forms', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-forms', itemId)
            })
        })
        cy.clickAdd()

        cy.enterText("#field_input_val0", "Liquor")
        cy.clickSave()

        cy.getToken().then(token => {
            cy.getFirstFormWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                formId = itemId
            })
        })
        cy.get("#field_input_val0").should("have.value", "Liquor")
    })

    it("Edits a form", () => {
        cy.openElement(formId, 0)

        cy.get("#field_input_val0")
            .clear()
            .type("Finest")
            .should("have.value", "Finest")

        cy.clickSave()

        cy.openElement(formId, 0)

        cy.get("#field_input_val0").should("have.value", "Finest")
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

    it("Deletes a form", () => {
        cy.openElement(formId, 1)

        cy.contains("Yes").click()

        cy.get("[data-test=action_" + formId + "]").should("not.exist")
    })
})