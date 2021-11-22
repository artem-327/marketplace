context("Companies CRUD", () => {

    let companyId = null
    let filter = [{ "operator": "LIKE", "path": "Company.name", "values": ["%Test Company%"] }]
    const adminJSON = require('../../fixtures/admin.json')

    before(function () {
        cy.getToken().then(token => {
            cy.finishTakeover(token)
        })
    })

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard*").as("dashboardload")
        cy.intercept("POST", "/prodex/api/companies/datagrid*").as("companiesLoad")
        cy.intercept("POST", "/prodex/api/companies").as("companyCreate")
        cy.intercept("PATCH", "/prodex/api/companies/admin/id/**").as("companyUpdate")
        cy.intercept("GET", "/_next/static/webpack/").as("datagridLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@dashboardload")
        cy.get('.flex-wrapper > :nth-child(2)').click()
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
        cy.get('[data-test=companies_table_add_btn]').click()
        cy.waitForUI()

        cy.selectFromList("div[id='field_dropdown_type']", "Regular")
        cy.enterText("#field_input_name", "Test Company 222")
        cy.selectFromList("div[id='field_dropdown_businessType.id']", "Corporation")
        cy.enterText("#field_input_website", "https://blue.io/")
        cy.enterText("#field_input_dba", "Test Co")
        cy.selectFromDropdown("div[name='naicsCode']", "Chemical and Allied Products Merchant Wholesalers")
        cy.selectFromList("[data-test='form_tin_type_drpdn']", "EIN")

        cy.enterText('input[id="field_input_tin"]', "123456789")
        cy.enterText('input[id="field_input_primaryUser.name"]', "Donal Duck")
        cy.enterText('input[id="field_input_primaryUser.email"]', "test@example.com")

        cy.enterText('input[id="field_input_primaryBranch.deliveryAddress.addressName"]', "New York")
        cy.enterText('input[id="field_input_primaryBranch.deliveryAddress.contactName"]', "Blue Contact")
        cy.enterText('input[id="field_input_primaryBranch.deliveryAddress.contactEmail"]', "test@example.com")
        cy.get('div[data-test="admin_popup_company_primaryBranchNameEmailPhone_inp"]').find('input[placeholder = "Phone Number"]').type("9876543210")

        cy.enterText("input[id='field_input_primaryBranch.deliveryAddress.address.streetAddress']", "101 Mott St")
        cy.enterText("input[id='field_input_primaryBranch.deliveryAddress.address.city']", "New York")
        cy.selectFromDropdown("div[id='field_dropdown_primaryBranch.deliveryAddress.address.country']", "USA")
        cy.selectFromDropdown("div[id='field_dropdown_primaryBranch.deliveryAddress.address.zip']", "10013")
        cy.get("div[id='field_dropdown_primaryBranch.deliveryAddress.address.province']").click()
        cy.selectFromDropdown("div[id='field_dropdown_primaryBranch.deliveryAddress.address.province']", "New York")

        cy.waitForUI()
        cy.get("input[id='field_checkbox_primaryBranch.warehouse']").click({ force: true })

        cy.clickSave()

        cy.wait("@companyCreate").then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })
    })

    it("Edits a company", () => {
        cy.searchInList("Test Company")
        cy.waitForUI()

        cy.getToken().then(token => {
            cy.getFirstCompanyWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                companyId = itemId
            })
        })

        cy.get("#field_input_name")
            .clear()
            .type("Test Company 333")
            .should("have.value", "Test Company 333")

        cy.clickSave()

        cy.wait("@companyUpdate").then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })

        cy.getToken().then(token => {
            cy.getFirstCompanyWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)
            })
        })

        cy.get("#field_input_name").should("have.value", "Test Company 333")
    })

    it("Checks error message", () => {
        cy.get('[data-test=companies_table_add_btn]').click()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 12)
    })

    it("Deletes a company", () => {
        cy.searchInList("Test Company 333")
        cy.waitForUI()
        cy.waitForUI()

        cy.openElement(companyId, 1)

        cy.get("[data-test='confirm_dialog_proceed_btn']").click()

        cy.get("[data-test=action_" + companyId + "]").should("not.exist")
    })
})