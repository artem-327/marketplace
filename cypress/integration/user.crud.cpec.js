context("Prodex User CRUD", () => {
    let userID = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("GET", "/prodex/api/payments/bank-accounts").as("settingsLoading")
        cy.route("GET", "/prodex/api/users").as("usersLogin")

        cy.FElogin("user1@example.com", "echopass123")

        cy.url().should("include", "inventory")

        cy.wait("@inventoryLoading")
        cy.contains("Settings").click()

        cy.wait("@usersLogin")

        cy.contains("USERS").click()

        cy.wait("@usersLogin")
    })

    it("Creates a user", () => {
        cy.get("[data-test='settings_open_popup_btn']").click()

        cy.enterText("#field_input_name", "John Automator")
        cy.enterText("#field_input_jobTitle", "Automatior")
        cy.enterText("#field_input_email", "automation@example.com")

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
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",3)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a user", () => {
        cy.openElement(userID, 2)

        cy.clickSave()

        cy.contains("Jen Automator").should("not.exist")
    })
})