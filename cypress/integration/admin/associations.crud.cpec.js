context("Associations CRUD", () => {

    let productId = null
    let filter = [{"operator": "LIKE", "path": "Association.name", "values": ["%Test%"]}]
    let filter2 = [{"operator": "LIKE", "path": "Association.name", "values": ["%Echoprod%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("GET", "/prodex/api/dashboard").as("loading")
        cy.route("POST", "/prodex/api/associations/datagrid").as("groupsLoading")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@loading")
        cy.url().should("include", "dashboard")

        cy.get('.flex-wrapper > :nth-child(6)').click()
        cy.waitForUI()
        cy.get('[data-test=tabs_menu_item_associations]').click()

        cy.wait("@groupsLoading")
        cy.waitForUI()
    })

    it("Creates a association", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'associations', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'associations/id', itemId)
            })
            cy.getFirstEntityWithFilter(token, 'associations', filter2).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'associations/id', itemId)
            })
        })

        cy.get('[data-test=admin_table_add_btn]').click()

        cy.get("#field_input_val0").type("TestGroup")
        cy.get('[data-test=admin_add_association_save_btn]').click()

        cy.waitForUI()
        cy.searchInList("Test")

        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'associations', filter).then(itemId => {
                cy.openElement(itemId, 0)

                productId = itemId
            })
        })

        cy.get("#field_input_val0")
            .should("have.value", "TestGroup")
    })

    it("Edits an association", () => {
        cy.searchInList("Test")

        cy.openElement(productId, 0)

        cy.get('#field_input_val0').clear().type("Echoprod")
        cy.get('[data-test=admin_edit_association_save_btn]').click()
        cy.searchInList("Echoprod")

        cy.openElement(productId, 0)

        cy.get('#field_input_val0').should("have.value", "Echoprod")
    })

    it("Checks error messages", () => {
        cy.get('[data-test=admin_table_add_btn]').click()

        cy.get('#field_input_val0').click()

        cy.get('[data-test=admin_add_association_save_btn]').click()

        cy.get(".error")
            .should("have.length", 1)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a association", () => {
        cy.searchInList("EchoProd")

        cy.openElement(productId, 1)
        cy.clickSave()

        cy.contains("Echoprod").should("not.exist")
    })
})