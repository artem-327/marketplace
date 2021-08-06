context("Tags CRUD", () => {

    let tagsId = null
    let filter = [{"operator": "LIKE", "path": "Tag.name", "values": ["%Liquor%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    before(function () {
        cy.getToken().then(token => {
            cy.finishTakeover(token)
        })
    })

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard?*").as("loading")
        cy.intercept("POST", "/prodex/api/tags/datagrid*").as("tagsLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "dashboard")

        cy.wait("@loading")

        cy.get('.flex-wrapper > :nth-child(7)').click()
        cy.waitForUI()
        cy.get('[data-test=navigation_operations_tags_drpdn]').click()

        cy.wait("@tagsLoad")
    })

    it("Creates a tag", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'tags', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'tags/id', itemId)
            })
        })
        cy.get('[data-test=operations_open_popup_btn]').click()

        cy.enterText("#field_input_name", "Liquor")
        cy.clickSave()

        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'tags', filter).then(itemId => {
                cy.openElement(itemId, 0)

                tagsId = itemId
            })
        })
        cy.get("#field_input_name").should("have.value", "Liquor")
    })

    it("Edits a tag", () => {
        cy.openElement(tagsId, 0)

        cy.get("#field_input_name")
            .clear()
            .type("Finest")
            .should("have.value", "Finest")

        cy.clickSave()

        cy.openElement(tagsId, 0)

        cy.get("#field_input_name").should("have.value", "Finest")
    })

    it("Checks error message", () => {
        cy.get('[data-test=operations_open_popup_btn]').click()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 1)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a tag", () => {
        cy.openElement(tagsId, 1)

        cy.contains("Yes").click()

        cy.get("[data-test=action_" + tagsId + "]").should("not.exist")
    })
})