context("Prodex Branches CRUD", () => {
    let branchId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("POST", "/prodex/api/branches/datagrid").as("branchesLoading")

        cy.FElogin("user1@example.com", "echopass123")

        cy.wait("@inventoryLoading", {timeout: 10000})
        cy.contains("Settings").click()

        cy.contains("BRANCHES").click()

        cy.wait("@branchesLoading")
        cy.waitForUI()
    })

    it("Creates a branch", () => {
        cy.clickAdd()

        cy.enterText("#field_input_name", "Central branch")
        cy.enterText("input[id='field_input_address.streetAddress']", "125 N G St")
        cy.enterText("input[id='field_input_address.city']", "Harlingen")

        cy.selectFromDropdown("div[id='field_dropdown_address.country']","Bahamas")
        cy.waitForUI()
        cy.selectFromDropdown("div[id='field_dropdown_address.zip']","75000")

        cy.enterText("input[id='field_input_contactName']","David Cameron")
        cy.get("div[data-test='settings_warehouse_popup_phoneEmail_inp']").within(($form) => {
            cy.get("input[placeholder = 'Phone Number']").type("1234567895")
            cy.contains("+CCC").click()
            cy.contains("USA").click()
        })
        cy.enterText("input[id='field_input_contactEmail']","test@central.com")

        cy.clickSave()

        cy.contains("Created Warehouse")

        let filter = [{"operator":"LIKE","path":"Branch.name","values":["%Central%"]},
            {"operator":"LIKE","path":"Branch.address.streetAddress","values":["%Central%"]},
            {"operator":"LIKE","path":"Branch.contactName","values":["%Central%"]}]

        cy.getToken().then(token => {
            cy.getFirstBranchIdWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                branchId = itemId
            })
        })

        cy.get("input[id='field_input_address.city']")
            .should("have.value","Harlingen")

        cy.get("#field_input_contactName")
            .should("have.value","David Cameron")

        cy.get("#field_input_contactPhone")
            .should("have.value","123456789")

        cy.get("div[data-test='settings_warehouse_popup_phoneEmail_inp']").within(($form) => {
            cy.get("input[placeholder = 'Phone Number']") .should("have.value","123 456 789")
        })

        cy.get("#field_input_contactEmail")
            .should("have.value","test@central.com")
    })

    it("Edits a branch", () => {
        cy.get('[data-test=action_' + branchId + ']').click()
        cy.get('[data-test=action_' + branchId + '_0]').click()

        cy.get("#field_input_contactName")
            .clear()
            .type("Arnold Schwarzenegger")
            .should("have.value","Arnold Schwarzenegger")

        cy.clickSave()

        cy.get('[data-test=action_' + branchId + ']').click()
        cy.get('[data-test=action_' + branchId + '_0]').click()

        cy.get("#field_input_contactName")
            .should("have.value","Arnold Schwarzenegger")
    })

    it("Checks error messages", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",8)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a branch", () => {
        cy.get('[data-test=action_' + branchId + ']').click()

        cy.get('[data-test=action_' + branchId + '_1]').click()

        cy.clickSave()

        cy.contains("Central branch").should("not.exist")
    })
})