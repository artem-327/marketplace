context("Grades CRUD", () => {

    let gradeId = null
    let filter = [{"operator": "LIKE", "path": "ProductGrade.name", "values": ["%Test%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/cas-products/datagrid").as("loading")
        cy.route("POST", "/prodex/api/product-grades/datagrid").as("gradesLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "admin")

        cy.wait("@loading")

        cy.get("[data-test='tabs_menu_item_4']").click()

        cy.wait("@gradesLoad")
    })

    it("Creates a grade", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'product-grades', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-grades', itemId)
            })
        })
        cy.clickAdd()

        cy.enterText("#field_input_val0", "Test grade")
        cy.clickSave()
        cy.contains("Info!")

        cy.get("input[type=text]").eq(0).type("Test", {force: true})

        cy.getToken().then(token => {
            cy.getFirstGradeWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                gradeId = itemId
            })
        })
        cy.get("#field_input_val0").should("have.value", "Test grade")
    })

    it("Edits a grade", () => {
        cy.searchInList("Test")

        cy.openElement(gradeId, 0)

        cy.get("#field_input_val0")
            .clear()
            .type("Graceful")
            .should("have.value", "Graceful")

        cy.clickSave()

        cy.contains("Info!")

        cy.openElement(gradeId, 0)

        cy.get("#field_input_val0").should("have.value", "Graceful")
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

    it("Deletes a grade", () => {
        cy.searchInList("Graceful")
        cy.openElement(gradeId, 1)

        cy.contains("Yes").click()

        cy.get("[data-test=action_" + gradeId + "]").should("not.exist")
    })
})