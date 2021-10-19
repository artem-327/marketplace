context("Prodex Admin User CRUD", () => {
    let userID = null
    let filter = [{"operator":"LIKE","path":"User.name","values":["%TesterFE%"]},
        {"operator":"LIKE","path":"User.homeBranch.deliveryAddress.contactName","values":["%TesterFE%"]}]
    const adminJSON = require('../../fixtures/admin.json')
    const serverId = 'whwenjcq'
    const testEmail = `superadmincreate@${serverId}.mailosaur.net`
    const sendingTime = new Date()

    before(function () {
        cy.getToken().then(token => {
            cy.finishTakeover(token)
        })
    })

    beforeEach(function () {
        cy.intercept("POST", "/prodex/api/users/datagrid/all*").as("usersLogin")
        cy.intercept("POST", "/prodex/api/companies/datagrid").as("companiesLoad")
        cy.intercept("POST", "/prodex/api/users").as("usersSave")
        cy.intercept("POST", "/prodex/api/admin/orders/datagrid*").as("dashboardload")
        cy.viewport(2000, 1000)

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@dashboardload")
        cy.get('.flex-wrapper > :nth-child(2)').click()
        cy.waitForUI()
        cy.get('[data-test=navigation_companies_users_drpdn]').click()
        cy.wait("@usersLogin", {timeout: 100000})
    })

    it("Creates a user", () => {
        cy.getUserToken(adminJSON.email, adminJSON.password).then(token => {
            cy.getFirstAdminUsersWithFilter(token, filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'users/id', itemId)
            })
        })

        cy.get('[data-test=companies_table_add_btn]').click()

        cy.enterText("#field_input_name", "John TesterFE")
        cy.enterText("#field_input_jobTitle", "Automatior")
        cy.enterText("#field_input_email", testEmail)

        cy.selectFromDropdown("div[id='field_dropdown_company']","TomasovaS")

        cy.get("#field_dropdown_homeBranch").click()
        cy.waitForUI()
        cy.get("#field_dropdown_homeBranch").within(() => {
            cy.get("div[role='option']").eq(0).click()
        })

        cy.get(':nth-child(3) > .grid > :nth-child(2)').within(() => {
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
            .should("have.value", "John TesterFE")

        cy.get("#field_input_jobTitle")
            .should("have.value", "Automatior")

        cy.get("#field_input_email")
            .should("have.value", testEmail)

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
        cy.searchInList("John TesterFE")
        cy.wait("@usersLogin")
        cy.waitForUI()

        cy.openElement(userID, 0)
        cy.waitForUI()

        cy.get("#field_input_name").clear()

        cy.get("#field_input_name").click().clear().type("Jen TesterFE")
            .should("have.value", "Jen TesterFE")

        cy.get('[data-test=admin_users_popup_submit_btn]').click()

        cy.openElement(userID, 0)

        cy.get("#field_input_name")
            .should("have.value", "Jen TesterFE")
    })

    it("Edit user roles", () => {
        cy.waitForUI()
        cy.searchInList("Jen TesterFE")
        cy.wait("@usersLogin")
        cy.waitForUI()
        cy.openElement(userID, 0)

        cy.get(':nth-child(3) > .grid > :nth-child(2)').within(() => {
            cy.contains("Merchant").click()
            cy.contains("Order View").click()
        })

        cy.get('[data-test=admin_users_popup_submit_btn]').click().click({force: true})

        cy.waitForUI()

        cy.openElement(userID, 0)

        cy.get(':nth-child(3) > .grid > :nth-child(2)').within(() => {
            cy.contains("Merchant").prev().should("not.be.checked")
            cy.contains("Order View").prev().should("be.checked")
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
        cy.searchInList("Jen TesterFE")
        cy.wait("@usersLogin")
        cy.waitForUI()
        cy.openElement(userID, 1)

        cy.get('[data-test=confirm_dialog_proceed_btn]').click()

        cy.contains("Jen TesterFE").should("not.exist")
    })
})