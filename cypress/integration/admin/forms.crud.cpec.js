context("Form CRUD", () => {

    let formId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/cas-products/datagrid').as('loading')
        cy.route("POST", '/prodex/api/product-forms/datagrid').as('formsLoad')

        cy.FElogin("admin@example.com", "echopass123")

        cy.url().should("include", "admin")

        cy.wait('@loading')

        cy.get('[data-test="tabs_menu_item_5"]').click()

        cy.wait('@formsLoad')
    })

    it("Creates a form", () => {
        cy.clickAdd()

        cy.enterText("#field_input_val0","Liquor")

        cy.clickSave()

        cy.contains("Form created")

        let filter = [{"operator":"LIKE","path":"ProductForm.name","values":["%Liquor%"]}]

        cy.getToken().then(token => {
            cy.getFirstFormWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                formId = itemId
            })
        })
        cy.get("#field_input_val0").should('have.value', "Liquor")
    })

    it("Edits a form", () => {
        cy.get('[data-test=action_' + formId + ']').click()
        cy.get('[data-test=action_' + formId + '_0]').click()

        cy.get("#field_input_val0")
            .clear()
            .type("Finest")
            .should("have.value","Finest")

        cy.clickSave()

        cy.contains("Updated Form")

        cy.get('[data-test=action_' + formId + ']').click()
        cy.get('[data-test=action_' + formId + '_0]').click()

        cy.get("#field_input_val0").should('have.value', "Finest")
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

    it("Deletes a form", () => {
        cy.get('[data-test=action_' + formId + ']').click()
        cy.get('[data-test=action_' + formId + '_1]').click()

        cy.contains("Yes").click()

        cy.get('[data-test=action_' + formId + ']').should('not.exist')
    })
})