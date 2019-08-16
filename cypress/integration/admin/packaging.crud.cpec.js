context("Units of packaging CRUD", () => {

    let packageId = null

    beforeEach(function () {
        cy.server()
        cy.route("GET", '/prodex/api/packaging-groups').as('loading')
        cy.route("POST", '/prodex/api/packaging-types/datagrid').as('packaging')

        cy.login("admin@example.com", "echopass123")

        cy.url().should("include", "admin")

        cy.wait('@loading')
        //TODO Workaroud, list won't load
        cy.get('[data-test="tabs_menu_item_9"]').click()
        cy.waitForUI()

        cy.get('[data-test="tabs_menu_item_2"]').click()

        cy.wait('@packaging')
    })

    it("Creates a package unit", () => {
        cy.clickAdd()

        cy.enterText("#field_input_val0","Test package")

        cy.get("#field_dropdown_val1").click()
        cy.get("#2").click()

        cy.clickSave()

        cy.contains("Unit of Packaging created")

        let filter = [{"operator":"LIKE","path":"PackagingType.name","values":["%Test%"]}]

        cy.getToken().then(token => {
            cy.getFirstPackagingUnitWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                packageId = itemId
            })
        })
        cy.get("#field_input_val0").should('have.value', "Test package")
        cy.contains('volume')
    })

    it("Edits a package unit", () => {
        cy.get('[data-test=action_' + packageId + ']').click()
        cy.get('[data-test=action_' + packageId + '_0]').click()

        cy.get("#field_input_val0")
            .clear()
            .type("Best package")
            .should("have.value","Best package")

        cy.clickSave()

        cy.contains("Updated Unit of Packaging")

        cy.get('[data-test=action_' + packageId + ']').click()
        cy.get('[data-test=action_' + packageId + '_0]').click()

        cy.get("#field_input_val0").should('have.value', "Best package")
    })

    xit("Use a package unit", () => {
        cy.get("input[type=text]").type("David Tester")

        cy.get("i[class='ellipsis vertical large icon']").click()

        cy.get("#field_input_val1")
            .clear()
            .type("test")
            .should("have.value","test")

        cy.clickSave()
    })

    it("Checks error messages", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",2)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a package unit", () => {
        cy.get('[data-test=action_' + packageId + ']').click()
        cy.get('[data-test=action_' + packageId + '_1]').click()

        cy.contains("Yes").click()

        cy.get('[data-test=action_' + packageId + ']').should('not.exist')
    })
})