context("Units of packaging CRUD", () => {

    let packageId = null
    let filter = [{"operator": "LIKE", "path": "PackagingType.name", "values": ["%Test%"]}]
    let filterEdited = [{"operator": "LIKE", "path": "PackagingType.name", "values": ["%Best package%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("GET", "/prodex/api/dashboard").as("loading")
        cy.route("POST", "/prodex/api/packaging-types/datagrid").as("packaging")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "dashboard")

        cy.wait("@loading")
        cy.get('.flex-wrapper > :nth-child(6)').click()
        cy.waitForUI()
        cy.get('[data-test=navigation_admin_settings_packaging-types_drpdn]').click()

        cy.wait("@packaging")
    })

    it("Creates a package unit", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'packaging-types', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'packaging-types', itemId)
            })
            cy.getFirstEntityWithFilter(token, 'packaging-types', filterEdited).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'packaging-types', itemId)
            })
        })
        cy.clickAdd()

        cy.enterText("#field_input_val0", "Test package")

        cy.get("#field_dropdown_val1").click()
        cy.get("#2").click()

        cy.enterText("#field_input_val2", "10")
        cy.enterText("#field_input_val3", "10")
        cy.enterText("#field_input_val4", "10")
        cy.enterText("#field_input_val5", "10")
        cy.enterText("#field_input_val6", "10")

        cy.clickSave()

        cy.get("input[type=text]").eq(0).type("Test")
        cy.waitForUI()

        cy.getToken().then(token => {
            cy.getFirstPackagingUnitWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                packageId = itemId
            })
        })
        cy.get("#field_input_val0").should("have.value", "Test package")
        cy.contains("volume")
    })

    it("Edits a package unit", () => {
        cy.searchInList("Test")

        cy.openElement(packageId, 0)

        cy.get("#field_input_val0")
            .clear()
            .type("Best package")
            .should("have.value", "Best package")

        cy.clickSave()

        cy.searchInList("Best")

        cy.openElement(packageId, 0)

        cy.get("#field_input_val0").should("have.value", "Best package")
    })

    it("Checks error messages", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 6)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a package unit", () => {
        cy.searchInList("Best")

        cy.openElement(packageId, 1)

        cy.contains("Yes").click()

        cy.get("[data-test=action_" + packageId + "]").should("not.exist")
    })
})