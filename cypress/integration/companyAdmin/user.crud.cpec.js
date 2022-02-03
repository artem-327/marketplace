context("Prodex User CRUD", () => {
    let userID = null
    let filter = [{ "operator": "LIKE", "path": "User.name", "values": ["%Automator%"] },
        { "operator": "LIKE", "path": "User.homeBranch.deliveryAddress.contactName", "values": ["%Automator%"] }]
    const userJSON = require('../../fixtures/user.json')
    const serverId = 'whwenjcq'
    const testEmail = `companyusercreate@${serverId}.mailosaur.net`
    const sendingTime = new Date()

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard*").as("inventoryLoading")
        cy.intercept("GET", "/prodex/api/companies/id/**").as("companyLoading")
        cy.intercept("GET", "/prodex/api/payments/bank-accounts").as("settingsLoading")
        cy.intercept("POST", "/prodex/api/users/datagrid*").as("usersLogin")
        cy.intercept("POST", "/prodex/api/users").as("usersSave")
        cy.viewport(2500, 1200)

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.deleteWholeCart(token)
        })

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading", { timeout: 100000 })
        cy.openSettings()
        cy.contains("Users").click()
        cy.waitForUI()
        cy.wait("@usersLogin")
        cy.wait("@companyLoading")
    })

    it("Creates a user", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'users', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'users/id', itemId)
            })
        })

        //cy.settingsAdd()
        cy.contains("Add User").click()

        cy.enterText("#field_input_firstName", "John")
        cy.enterText("#field_input_lastName", "Automator")
        cy.enterText("#field_input_jobTitle", "Automation")
        cy.enterText("#field_input_email", testEmail)

        cy.get("#field_dropdown_homeBranch").click()
        cy.waitForUI()
        cy.get("#field_dropdown_homeBranch").find("div[role='option']").eq(0).click()

        cy.get('div[class*="UserEditSidebarstyles"]').within(() => {
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

        cy.get("#field_input_firstName")
            .should("have.value", "John")

        cy.get("#field_input_lastName")
            .should("have.value", "Automator")

        cy.get("#field_input_jobTitle")
            .should("have.value", "Automation")

        cy.get("#field_input_email")
            .should("have.value", testEmail)

        cy.waitForUI()

        cy.mailosaurGetMessage(serverId, {
            sentTo: testEmail,
            options: {
                timeout: 60,
                receivedAfter: sendingTime
            }
        }).then((email) => {
            expect(email.subject).to.equal('Welcome to BluePallet')
        })
    })

    it("Edits a user", () => {
        cy.waitForUI()

        cy.openElement(userID, 0)

        cy.get("#field_input_firstName")
            .clear()
            .type("Jen")
            .should("have.value", "Jen")

        cy.get("[data-test=settings_users_popup_submit_btn]").click()

        cy.waitForUI()
        cy.openElement(userID, 0)

        cy.get("#field_input_firstName")
            .should("have.value", "Jen")

        cy.get("#field_input_lastName")
            .should("have.value", "Automator")
        cy.waitForUI()
    })

    it("Edit user roles a user", () => {
        cy.waitForUI()

        cy.openElement(userID, 0)

        cy.get('div[class*="UserEditSidebarstyles"]').within(() => {
            cy.contains("Merchant").click()
            cy.contains("Order View").click()
        })

        cy.get("[data-test=settings_users_popup_submit_btn]").click()

        cy.waitForUI()
        cy.openElement(userID, 0)

        cy.get('div[class*="UserEditSidebarstyles"]').within(() => {
            cy.contains("Merchant").prev().should("not.be.checked")
            cy.contains("Order View").prev().should("be.checked")
        })
        cy.waitForUI()
    })

    it("Checks error messages", () => {
        cy.contains("Add User").click()

        cy.get("[data-test=settings_users_popup_submit_btn]").click()

        cy.get(".error")
            .should("have.length", 12)
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