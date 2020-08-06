context("Prodex Admin User CRUD", () => {
    let userID = null
    let filter = [{"operator":"LIKE","path":"User.name","values":["%Automator%"]},
        {"operator":"LIKE","path":"User.homeBranch.deliveryAddress.contactName","values":["%Automator%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("GET", "/prodex/api/payments/bank-accounts").as("settingsLoading")
        cy.route("GET", "/prodex/api/settings/user").as("usersLogin")
        cy.route("POST", "/prodex/api/users").as("usersSave")
        cy.route("GET", "/prodex/api/dashboard").as("dashboardload")
        cy.viewport(2000, 800)

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "dashboard")

        cy.wait("@dashboardload")
        cy.get('.flex-wrapper > :nth-child(2)').click()
        cy.waitForUI()
        cy.get("[data-test=tabs_menu_item_users]").click()
        cy.wait("@usersLogin")
    })

    it("Creates a user", () => {
        cy.getUserToken(adminJSON.email, adminJSON.password).then(token => {
            cy.getFirstAdminUsersWithFilter(token, filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'users/id', itemId)
            })
        })

        cy.get('[data-test=companies_table_add_btn]').click()

        cy.enterText("#field_input_name", "John Automator")
        cy.enterText("#field_input_jobTitle", "Automatior")
        cy.enterText("#field_input_email", "automation@example.com")

        cy.selectFromDropdown("div[id='field_dropdown_company']","TomasovaS")

        cy.get("#field_dropdown_homeBranch").click()
        cy.waitForUI()
        cy.get("#field_dropdown_homeBranch").within(() => {
            cy.get("div[role='option']").eq(0).click()
        })

        cy.get('.grid > :nth-child(7)').within(() => {
            cy.contains("Merchant").click()
        })

        cy.get('[data-test=admin_users_popup_submit_btn]').click()

        cy.wait("@usersSave")
        cy.waitForUI()
        cy.searchInList("John")

        cy.getUserToken(adminJSON.email, adminJSON.password).then(token => {
            cy.getFirstAdminUsersWithFilter(token, filter).then(itemId => {
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
        cy.searchInList("John Automator")
        cy.waitForUI()

        cy.openElement(userID, 0)
        cy.waitForUI()

        cy.get("#field_input_name").clear()

        cy.get("#field_input_name").click().clear().type("Jen Automator")
            .should("have.value", "Jen Automator")

        cy.get('[data-test=admin_users_popup_submit_btn]').click()

        cy.openElement(userID, 0)

        cy.get("#field_input_name")
            .should("have.value", "Jen Automator")
    })

    it("Edit user roles", () => {
        cy.waitForUI()
        cy.searchInList("Jen Automator")
        cy.waitForUI()
        cy.openElement(userID, 0)

        cy.get('.grid > :nth-child(7)').within(() => {
            cy.contains("Merchant").click()
            cy.contains("Order View").click()
        })

        cy.get('[data-test=admin_users_popup_submit_btn]').click().click({force: true})

        cy.waitForUI()

        cy.openElement(userID, 0)

        cy.get('.grid > :nth-child(7)').within(() => {
            cy.get(':nth-child(1) > :nth-child(2) > [data-test=settings_users_popup_FormikField_change]').should("not.selected")
            cy.get(':nth-child(2) > :nth-child(1) > [data-test=settings_users_popup_FormikField_change]').should("not.selected")
        })
    })

    it("Checks error messages", () => {
        cy.get('[data-test=companies_table_add_btn]').click()
        cy.get("#field_input_name").click()
        cy.get('[data-test=admin_users_popup_submit_btn]').click()

        cy.get(".error")
            .should("have.length", 8)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)|(At least one role should be selected)/i)
        })
    })

    it("Deletes a user", () => {
        cy.waitForUI()
        cy.searchInList("Jen Automator")
        cy.waitForUI()
        cy.openElement(userID, 1)

        cy.get('[data-test=confirm_dialog_proceed_btn]').click()

        cy.contains("Jen Automator").should("not.exist")

        cy.reload()
        cy.wait("@usersLogin")

        cy.contains("Jen Automator").should("not.exist")
    })
})