context("Grades CRUD", () => {
    let gradeId = null
    let filter = [{"operator":"LIKE","path":"ProductGrade.name","values":["%Test%"]}]
    let filterEdited = [{"operator": "LIKE", "path": "ProductGrade.name", "values": ["%Graceful%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("GET", "/prodex/api/dashboard").as("loading")
        cy.route("POST", "/prodex/api/product-grades/datagrid").as("gradesLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "dashboard")

        cy.wait("@loading")

        cy.get('.flex-wrapper > :nth-child(6)').click()
        cy.waitForUI()
        cy.get('[data-test=navigation_admin_settings_grades_drpdn]').click()

        cy.wait("@gradesLoad")
    })

    afterEach(function () {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'product-grades', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-grades', itemId)
            })
        })
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