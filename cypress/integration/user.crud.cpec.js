context("Prodex User CRUD", () => {
    let userID = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("GET", '/prodex/api/payments/bank-accounts').as('settingsLoading')
        cy.route("GET", '/prodex/api/users').as('usersLogin')

        cy.login("user1@example.com", "echopass123")

        cy.url().should("include", "inventory")

        cy.wait('@inventoryLoading')
        cy.contains("Settings").click()

        cy.wait("@usersLogin")

        cy.contains("USERS").click()

        cy.wait("@usersLogin")
    })

    it("Creates a user", () => {
        cy.clickAdd()

        cy.get("#field_input_name")
            .type("John Automator")
            .should("have.value", "John Automator")

        cy.get("#field_input_jobTitle")
            .type("Automatior")
            .should("have.value", "Automatior")

        cy.get("#field_input_email")
            .type("automation@example.com")
            .should("have.value", "automation@example.com")

        cy.get("#field_dropdown_homeBranch").click()
        cy.waitForUI()
        cy.get("#field_dropdown_homeBranch").within(() => {
            cy.get("div[role='option']").eq(0).click()
        })

        cy.clickSave()

        cy.contains("User John Automator successfully created.")

        let filter = [{"operator": "LIKE", "path": "User.name", "values": ["%john%"]}, {
            "operator": "LIKE",
            "path": "User.homeBranch.name",
            "values": ["%john%"]
        }]

        cy.getToken().then(token => {
            cy.getFirstUserIdWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

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
        cy.get("input").type("John")

        cy.waitForUI()

        cy.get('[data-test=action_' + userID + ']').click()

        cy.get('[data-test=action_' + userID + '_0]').click()

        cy.get("#field_input_name")
            .clear()
            .type("Jen Automator")
            .should("have.value", "Jen Automator")

        cy.clickSave()

        cy.get('[data-test=action_' + userID + ']').click()

        cy.get('[data-test=action_' + userID + '_0]').click()

        cy.get("#field_input_name")
            .should("have.value", "Jen Automator")
    })

    it("Edit user roles a user", () => {
        cy.waitForUI()

        cy.get('[data-test=action_' + userID + ']').click()

        cy.get('[data-test=action_' + userID + '_1]').click()

        cy.get("#field_checkbox_roles_3")
            .click({force: true})
            .should("not.selected")

        cy.get("button[class='ui primary button']").click()

        cy.waitForUI()

        cy.get('[data-test=action_' + userID + ']').click()

        cy.get('[data-test=action_' + userID + '_1]').click()

        cy.get("#field_checkbox_roles_3")
            .should("not.selected")
    })

    it("Checks error messages", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",3)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(is required)/i)
        })
    })

    it("Deletes a user", () => {
        cy.waitForUI()

        cy.get('[data-test=action_' + userID + ']').click()

        cy.get('[data-test=action_' + userID + '_2]').click()

        cy.clickSave()

        cy.contains("Jen Automator").should("not.exist")
    })
})