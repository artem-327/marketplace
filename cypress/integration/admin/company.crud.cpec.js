context("Companies CRUD", () => {

    let companyId = null
    let filter = [{"operator": "LIKE", "path": "Company.name", "values": ["%Donald%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/cas-products/datagrid").as("loading")
        cy.route("POST", "/prodex/api/companies/datagrid").as("companiesLoad")
        cy.route("POST", "/prodex/api/companies").as("companyCreate")
        cy.route("GET", "/_next/static/webpack/").as("datagridLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "admin")

        cy.wait("@loading")

        cy.get('[data-test="tabs_menu_item_8"]').click()

        cy.wait("@companiesLoad")
    })

    it("Creates a company", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'companies', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'companies/id', itemId)
            })
        })

        cy.waitForUI()
        cy.clickAdd()
        cy.waitForUI()

        cy.enterText("#field_input_name", "Donald The Ducks")
        cy.enterText("#field_input_website", "https://www.donald.com/")

        cy.enterText('input[id="field_input_primaryUser.name"]', "Donal Duck")
        cy.enterText('input[id="field_input_primaryUser.email"]', "duck@duck.com")

        cy.enterText('input[id="field_input_primaryBranch.deliveryAddress.addressName"]', "Main")
        cy.enterText('input[id="field_input_primaryBranch.deliveryAddress.contactName"]', "James Duckling")
        cy.enterText('input[id="field_input_primaryBranch.deliveryAddress.contactEmail"]', "james@duck.com")
        cy.get('div[data-test="admin_popup_company_primaryBranchNameEmailPhone_inp"]').within(($form) => {
            cy.get('input[placeholder = "Phone Number"]').type("2025550156")
            cy.contains("+CCC").click()
            cy.contains("USA").click()
        })

        cy.enterText("input[id='field_input_primaryBranch.deliveryAddress.address.streetAddress']", "125 N G St")
        cy.enterText("input[id='field_input_primaryBranch.deliveryAddress.address.city']", "Harlingen")
        cy.selectFromDropdown("div[id='field_dropdown_primaryBranch.deliveryAddress.address.country']", "Bahamas")

        cy.get("div[id='field_dropdown_primaryBranch.deliveryAddress.address.zip']")
            .children("input")
            .type("75000")
            .should("have.value", "75000")

        cy.wait(1000)
        cy.get("div[id='field_dropdown_primaryBranch.deliveryAddress.address.zip']").within(() => {
            cy.get("div[role='option']").eq(0).click({force: true})
        })

        cy.waitForUI()

        cy.clickSave()

        cy.wait("@companyCreate")
        cy.contains("Created Company")
    })

    it("Edits a condition", () => {
        cy.searchInList("Donald The Ducks")
        cy.waitForUI()

        cy.getToken().then(token => {
            cy.getFirstCompanyWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                companyId = itemId
            })
        })

        cy.get("#field_input_name")
            .clear()
            .type("Donald and Co.")
            .should("have.value", "Donald and Co.")

        cy.clickSave()

        cy.contains("Updated Company")

        cy.getToken().then(token => {
            cy.getFirstCompanyWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)
            })
        })

        cy.get("#field_input_name").should("have.value", "Donald and Co.")
    })

    it("Checks error message", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 11)
    })

    it("Deletes a company", () => {
        cy.searchInList("Donald and Co.")
        cy.waitForUI()
        cy.waitForUI()

        cy.openElement(companyId, 1)

        cy.get("[data-test='confirm_dialog_proceed_btn']").click()

        cy.get("[data-test=action_" + companyId + "]").should("not.exist")
    })
})