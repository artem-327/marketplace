context("Company CRUD", () => {

    let companyId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/cas-products/datagrid').as('loading')
        cy.route("POST", '/prodex/api/companies/datagrid').as('companiesLoad')

        cy.login("admin@example.com", "echopass123")

        cy.url().should("include", "admin")

        cy.wait('@loading')

        cy.get('[data-test="tabs_menu_item_8"]').click()

        cy.wait('@companiesLoad')
    })

    it("Creates a company", () => {
        cy.clickAdd()

        cy.enterText("#field_input_name","Donald The Ducks")
        cy.enterText('input[id="field_input_primaryUser.name"]',"Donal Duck")
        cy.enterText('input[id="field_input_primaryUser.email"]',"duck@duck.com")
        cy.enterText('input[id="field_input_primaryBranch.name"]',"Main")
        cy.enterText('input[id="field_input_primaryBranch.contactName"]',"James Duckling")
        cy.enterText('input[id="field_input_primaryBranch.contactEmail"]',"james@duck.com")
        cy.enterText('input[id="field_input_primaryBranch.contactPhone"]',"123456789")

        cy.get("input[id='field_input_primaryBranch.address.streetAddress']")
            .type("125 N G St")
            .should("have.value", "125 N G St")

        cy.get("input[id='field_input_primaryBranch.address.city']")
            .type("Harlingen")
            .should("have.value", "Harlingen")

        cy.get("div[id='field_dropdown_primaryBranch.address.country']")
            .children("input")
            .type("Bahamas")
            .should("have.value","Bahamas")
        cy.wait(1000)
        cy.get("div[id='field_dropdown_primaryBranch.address.country']").within(() => {
            cy.get("div[class='selected item']").click({force: true})
        })
        cy.wait(1000)

        cy.get("div[id='field_dropdown_primaryBranch.address.zip']")
            .children("input")
            .type("75000")
            .should("have.value","75000")
        cy.wait(1000)
        cy.get("div[id='field_dropdown_primaryBranch.address.zip']").within(() => {
            cy.get("div[class='selected item']").click({force: true})
        })
        cy.waitForUI()

        cy.clickSave()

        cy.contains("Created Company")

        cy.get("input[type=text]").type("Donald The Ducks",{force: true})

        let filter = [{"operator":"LIKE","path":"Company.name","values":["%Donald%"]}]

        cy.waitForUI()

        cy.getToken().then(token => {
            cy.getFirstCompanyWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                companyId = itemId
            })
        })

        cy.get("#field_input_name").should('have.value', "Donald The Ducks")
    })

    it("Edits a condition", () => {
        cy.get("input[type=text]").type("Donald The Ducks")
        cy.waitForUI()

        cy.get('[data-test=action_' + companyId + ']').click()

        cy.get('[data-test=action_' + companyId + '_0]').click()

        cy.get("#field_input_name")
            .clear()
            .type("Donald and Co.")
            .should("have.value","Donald and Co.")

        cy.clickSave()

        cy.contains("Updated Company")

        cy.get('[data-test=action_' + companyId + ']').click()
        cy.get('[data-test=action_' + companyId + '_0]').click()

        cy.get("#field_input_name").should('have.value', "Donald and Co.")
    })

    it("Checks error message", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",11)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)|(Field should have at least 2 characters)|(Invalid e-mail address)|(Enter phone number)/i)
        })
    })

    it("Deletes a company", () => {
        cy.get("input[type=text]").type("Donald and Co.")
        cy.waitForUI()

        cy.get('[data-test=action_' + companyId + ']').click()
        cy.get('[data-test=action_' + companyId + '_1]').click()

        cy.contains("Yes").click()

        cy.get('[data-test=action_' + companyId + ']').should('not.exist')
    })
})