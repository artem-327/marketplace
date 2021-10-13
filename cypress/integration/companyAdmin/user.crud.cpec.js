context("Prodex User CRUD", () => {
    let userID = null
    let filter = [{"operator": "LIKE", "path": "User.name", "values": ["%Automator%"]},
        {"operator": "LIKE", "path": "User.homeBranch.deliveryAddress.contactName", "values": ["%Automator%"]}]
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("GET", "/prodex/api/payments/bank-accounts").as("settingsLoading")
        cy.route("GET", "/prodex/api/settings/user").as("usersLogin")
        cy.route("POST", "/prodex/api/users").as("usersSave")
        cy.viewport(2000, 800)

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {cy.deleteWholeCart(token)})

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading", {timeout: 100000})
        cy.openSettings()
        cy.contains("Users").click()
        cy.waitForUI()
        cy.wait("@usersLogin")
    })

    it("Creates a user", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'users', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'users/id', itemId)
            })
        })

        cy.settingsAdd()

        cy.enterText("#field_input_name", "John Automator")
        cy.enterText("#field_input_jobTitle", "Automatior")
        cy.enterText("#field_input_email", "automation@example.com")

        cy.get("#field_dropdown_homeBranch").click()
        cy.waitForUI()
        cy.get("#field_dropdown_homeBranch").within(() => {
            cy.get("div[role='option']").eq(0).click()
        })

        cy.get('[style="padding-bottom: 0px;"]').within(() => {
            cy.contains("Merchant").click()
        })

        cy.get("[data-test=settings_users_popup_submit_btn]").click()

        cy.wait("@usersSave")
        cy.waitForUI()
        cy.searchInList("John")

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstUserIdWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                userID = itemId
            })
        })

        cy.get("#field_input_name")
            .should("have.value", "John Automator")

        cy.get("#field_input_jobTitle")
            .should("have.value", "Automatior")

        cy.get("#field_input_email")
            .should("have.value", "automation@example.com")
    })

    it("Edits a user", () => {
        cy.waitForUI()

        cy.openElement(userID, 0)

        cy.get("#field_input_name")
            .clear()
            .type("Jen Automator")
            .should("have.value", "Jen Automator")

        cy.get("[data-test=settings_users_popup_submit_btn]").click()

        cy.openElement(userID, 0)

        cy.get("#field_input_name")
            .should("have.value", "Jen Automator")
    })

    it("Edit user roles a user", () => {
        cy.waitForUI()

        cy.openElement(userID, 0)

        cy.get('[style="padding-bottom: 0px;"]').within(() => {
            cy.contains("Merchant").click()
            cy.contains("Order View").click()
        })

        cy.get("[data-test=settings_users_popup_submit_btn]").click().click({force: true})

        cy.waitForUI()

        cy.openElement(userID, 0)

        cy.get('[style="padding-bottom: 0px;"]').within(() => {
            cy.get(':nth-child(1) > :nth-child(2) > [data-test=settings_users_popup_FormikField_change]').should("not.selected")
            cy.get(':nth-child(2) > :nth-child(1) > [data-test=settings_users_popup_FormikField_change]').should("not.selected")
        })
    })

    it("Checks error messages", () => {
        cy.settingsAdd()

        cy.get("[data-test=settings_users_popup_submit_btn]").click()

        cy.get(".error")
            .should("have.length", 13)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a user", () => {
        cy.waitForUI()
        cy.openElement(userID, 1)

        cy.get('[data-test=confirm_dialog_proceed_btn]').click()

        cy.contains("Jen Automator").should("not.exist")

        cy.reload()
        cy.wait("@usersLogin")

        cy.contains("Jen Automator").should("not.exist")
    })
})