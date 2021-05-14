context("Units of packaging CRUD", () => {

    let packageId = null
    let filter = [{"operator": "LIKE", "path": "PackagingType.name", "values": ["%Test%"]}]
    let filterEdited = [{"operator": "LIKE", "path": "PackagingType.name", "values": ["%Best package%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard").as("loading")
        cy.intercept("POST", "/prodex/api/packaging-types/datagrid").as("packaging")

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

        cy.get("[data-test='admin_add_unit_packaging_type_drpdn']").click()
        cy.get("#2").click()

        cy.enterText("#field_input_val2", "10")
        cy.enterText("#field_input_val3", "10")
        cy.enterText("#field_input_val4", "10")
        cy.enterText("#field_input_val6", "10")
        cy.enterText("#field_input_val7", "10")
        cy.enterText("#field_input_val8", "10")

        cy.get("[data-test='admin_add_pallet_pkg_dimension_unit']").click()
        cy.get("[data-test='admin_add_pallet_pkg_dimension_unit']").contains("span", "meter").click()

        cy.get("[data-test='admin_add_pallet_pkg_weight_unit']").click()
        cy.get("[data-test='admin_add_pallet_pkg_weight_unit']").contains("span", "kilograms").click()

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
        cy.contains("meter")
        cy.contains("kilograms")
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
            .should("have.length", 10)
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