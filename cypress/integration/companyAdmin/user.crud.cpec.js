context("Prodex User CRUD", () => {
    let userID = null
    let filter = [{"operator":"LIKE","path":"User.name","values":["%John Automator%"]},
        {"operator":"LIKE","path":"User.homeBranch.deliveryAddress.contactName","values":["%John Automator%"]}]

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("GET", "/prodex/api/payments/bank-accounts").as("settingsLoading")
        cy.route("GET", "/prodex/api/users").as("usersLogin")
        cy.route("POST", "/prodex/api/users").as("usersSave")

        cy.FElogin("mackenzie@echoexchange.net", "echopass123")

        cy.wait("@inventoryLoading", {timeout: 100000})
        cy.contains("Settings").click()
        cy.wait("@usersLogin", {timeout: 100000})

        cy.contains("USERS").click()
        cy.wait("@usersLogin")
    })

    it("Creates a user", () => {
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getFirstEntityWithFilter(token, 'users', filter).then(itemId => {
                if(itemId != null)
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

        cy.clickSave()

        cy.wait("@usersSave")
        cy.contains("User John Automator successfully created.")

        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
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
        cy.get("input").type("John")

        cy.waitForUI()

        cy.openElement(userID, 0)

        cy.get("#field_input_name")
            .clear()
            .type("Jen Automator")
            .should("have.value", "Jen Automator")

        cy.clickSave()

        cy.openElement(userID, 0)

        cy.get("#field_input_name")
            .should("have.value", "Jen Automator")
    })

    it("Edit user roles a user", () => {
        cy.waitForUI()

        cy.openElement(userID, 1)

        cy.get("#field_checkbox_roles_3")
            .click({force: true})
            .should("not.selected")

        cy.get("button[class='ui primary button']").click({force: true})

        cy.waitForUI()

        cy.openElement(userID, 1)

        cy.get("#field_checkbox_roles_3")
            .should("not.selected")
    })

    it("Checks error messages", () => {
        cy.settingsAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 3)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a user", () => {
        cy.openElement(userID, 2)

        cy.clickSave()

        cy.contains("Jen Automator").should("not.exist")

        cy.reload()
        cy.wait("@usersLogin")

        cy.contains("Jen Automator").should("not.exist")
    })
})