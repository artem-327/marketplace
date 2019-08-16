context("Conditions CRUD", () => {

    let conditionId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/cas-products/datagrid').as('loading')
        cy.route("POST", '/prodex/api/product-conditions/datagrid').as('formsLoad')

        cy.login("admin@example.com", "echopass123")

        cy.url().should("include", "admin")

        cy.wait('@loading')

        cy.get('[data-test="tabs_menu_item_6"]').click()

        cy.wait('@formsLoad')
    })

    it("Creates a condition", () => {
        cy.clickAdd()

        cy.enterText("#field_input_val0","Half")

        cy.clickSave()

        cy.contains("Condition created")

        let filter = [{"operator":"LIKE","path":"ProductCondition.name","values":["%Half%"]}]

        cy.getToken().then(token => {
            cy.getFirstConditionWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                conditionId = itemId
            })
        })
        cy.get("#field_input_val0").should('have.value', "Half")
    })

    it("Edits a condition", () => {
        cy.get('[data-test=action_' + conditionId + ']').click()

        cy.get('[data-test=action_' + conditionId + '_0]').click()

        cy.get("#field_input_val0")
            .clear()
            .type("Spilled")
            .should("have.value","Spilled")

        cy.clickSave()

        cy.contains("Updated Condition")

        cy.get('[data-test=action_' + conditionId + ']').click()
        cy.get('[data-test=action_' + conditionId + '_0]').click()

        cy.get("#field_input_val0").should('have.value', "Spilled")
    })

    xit("Use a condition", () => {

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

    it("Deletes a condition", () => {
        cy.get('[data-test=action_' + conditionId + ']').click()
        cy.get('[data-test=action_' + conditionId + '_1]').click()

        cy.contains("Yes").click()

        cy.get('[data-test=action_' + conditionId + ']').should('not.exist')
    })
})