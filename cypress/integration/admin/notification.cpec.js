context("Grades CRUD", () => {

    let gradeId = null
    let filter = [{"operator": "LIKE", "path": "ProductGrade.name", "values": ["%Test%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/cas-products/datagrid").as("loading")
        cy.route("POST", "/prodex/api/product-grades/datagrid").as("gradesLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        //cy.url().should("include", "admin")

        cy.wait("@loading")

        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'product-grades', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-grades', itemId)
            })
        })

        cy.contains("Grades").click()

        cy.wait("@gradesLoad")
    })

    var i = 0
    for (i = 0; i < 20 ; i++) {
        describe('Verify notification. Test: '+i, function() {
            it("Creates a grade", () => {

                cy.clickAdd()

                cy.enterText("#field_input_val0", "Test grade")
                cy.clickSave()

                cy.contains("Success!")
            })
        })
    }




})