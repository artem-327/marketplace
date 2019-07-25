context("Prodex User CRUD", () => {

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("GET", '/prodex/api/payments/bank-accounts').as('settingsLoading')
        cy.route("GET", '/prodex/api/users').as('usersLogin')

        cy.login("user1@example.com", "echopass123")

        cy.url().should("include", "inventory")

        cy.wait('@inventoryLoading')
        cy.contains("Settings").click()

        cy.wait("@settingsLoading")

        cy.contains("USERS").click()

        cy.wait("@usersLogin")
    })

    it("Creates a user", () => {
        cy.contains("Add ").click()

        cy.get("#field_input_name")
            .type("John Automator")
            .should("have.value", "John Automator")

        cy.get("#field_input_title")
            .type("Automatior")
            .should("have.value", "Automatior")

        cy.get("#field_input_email")
            .type("automation@example.com")
            .should("have.value", "automation@example.com")

        cy.get("#field_dropdown_warehouse").click()
        cy.get("div[name='Test 2']").first().click()

        cy.contains("Save").click()

        cy.contains("User John Automator successfully created.")

        let filter = [{"operator": "LIKE", "path": "User.name", "values": ["%John%"]}, {
            "operator": "LIKE",
            "path": "User.homeBranch.name",
            "values": ["%John%"]
        }]

        cy.getToken().then(token => {
            cy.getFirstUserIdWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()
            })
        })

        cy.contains("Edit").click()

        cy.get("#field_input_name")
            .should("have.value", "John Automator")

        cy.get("#field_input_title")
            .should("have.value", "Automatior")

        cy.get("#field_input_email")
            .should("have.value", "automation@example.com")
    })

    it("Edits a user", () => {
        let filter = [{"operator": "LIKE", "path": "User.name", "values": ["%John%"]}, {
            "operator": "LIKE",
            "path": "User.homeBranch.name",
            "values": ["%John%"]
        }]

        cy.getToken().then(token => {
            cy.getFirstUserIdWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()
            })
        })

        cy.contains("Edit").click()

        cy.get("#field_input_name")
            .clear()
            .type("Jen Automator")
            .should("have.value", "John Automator")

        cy.contains("Save").click()

        filter = [{"operator": "LIKE", "path": "User.name", "values": ["%Jen%"]}, {
            "operator": "LIKE",
            "path": "User.homeBranch.name",
            "values": ["%Jen%"]
        }]

        cy.getToken().then(token => {
            cy.getFirstUserIdWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()
            })
        })

        cy.contains("Edit").click()

        cy.get("#field_input_name")
            .should("have.value", "Jen Automator")
    })

    it("Deletes a user", () => {
        let filter = [{"operator": "LIKE", "path": "User.name", "values": ["%Jen%"]}, {
            "operator": "LIKE",
            "path": "User.homeBranch.name",
            "values": ["%Jen%"]
        }]

        cy.getToken().then(token => {
            cy.getFirstUserIdWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()
            })
        })

        cy.contains("Delete").click()

        cy.contains("Yes").click()

        cy.contains("Jen Automator").should("not.exist")
    })

    xit("Edit user roles a user", () => {
        cy.getToken().then(token => {
            cy.getFirstUserIdWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()
            })
        })

        cy.contains("Edit Roles").click()
    })
})