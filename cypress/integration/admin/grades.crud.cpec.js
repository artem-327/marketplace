context("Grades CRUD", () => {

    let gradeId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/cas-products/datagrid").as("loading")
        cy.route("POST", "/prodex/api/product-grades/datagrid").as("gradesLoad")

        cy.FElogin("admin@example.com", "echopass123")

        cy.url().should("include", "admin")

        cy.wait("@loading")

        cy.get("[data-test='tabs_menu_item_4']").click()

        cy.wait("@gradesLoad")
    })

    it("Creates a grade", () => {
        cy.clickAdd()

        cy.enterText("#field_input_val0", "Test grade")

        cy.clickSave()

        cy.contains("Grade created")

        let filter = [{"operator": "LIKE", "path": "ProductGrade.name", "values": ["%Test%"]}]

        cy.getToken().then(token => {
            cy.getFirstGradeWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                gradeId = itemId
            })
        })
        cy.get("#field_input_val0").should("have.value", "Test grade")
    })

    it("Edits a grade", () => {
        cy.get("input[type=text]").type("Test")

        cy.openElement(gradeId, 0)

        cy.get("#field_input_val0")
            .clear()
            .type("Graceful")
            .should("have.value", "Graceful")

        cy.clickSave()

        cy.contains("Updated Grade")

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
        cy.get("input[type=text]").type("Graceful")
        cy.openElement(gradeId, 1)

        cy.contains("Yes").click()

        cy.get("[data-test=action_" + gradeId + "]").should("not.exist")
    })
})