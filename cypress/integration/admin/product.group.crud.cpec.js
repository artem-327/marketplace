context("Product Group CRUD", () => {

    let productId = null
    let filter = [{"operator": "LIKE", "path": "ProductGroup.name", "values": ["%Test%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/companies/datagrid").as("loading")
        cy.route("POST", "/prodex/api/product-groups/datagrid").as("groupsLoading")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@loading")
        cy.url().should("include", "companies")

        cy.get('.flex-wrapper > :nth-child(2)').click()
        cy.waitForUI()
        cy.get('[data-test=tabs_menu_item_product-groups]').click()

        cy.wait("@groupsLoading")
        cy.waitForUI()
    })

    it("Creates a Product Group", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'product-groups', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-groups', itemId)
            })
        })

        cy.get("[data-test=products_open_popup_btn]").click()

        cy.get("#field_input_name").type("TestGroup")
        cy.get("[data-test='operations_tag_submit_btn']").click()

        cy.waitForUI()
        cy.searchInList("Test")

        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'product-groups', filter).then(itemId => {
                cy.openElement(itemId, 0)

                productId = itemId
            })
        })

        cy.get("#field_input_name")
            .should("have.value", "TestGroup")
    })

    it("Edits an Echo product", () => {
        cy.searchInList("Test")

        cy.openElement(productId, 0)

        cy.get('#field_input_name').clear().type("Echoprod")
        cy.get('[data-test=operations_tag_submit_btn]').click()
        cy.searchInList("Echoprod")

        cy.openElement(productId, 0)

        cy.get('#field_input_name').should("have.value", "Echoprod")
    })

    it("Checks error messages", () => {
        cy.get("[data-test=products_open_popup_btn]").click()

        cy.get('#field_input_name').click()

        cy.get('[data-test=operations_tag_submit_btn]').click()

        cy.get(".error")
            .should("have.length", 1)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a product", () => {
        cy.searchInList("EchoProd")

        cy.openElement(productId, 1)
        cy.clickSave()

        cy.contains("Echoprod").should("not.exist")
    })
})