context("Prodex Branches CRUD", () => {
    let branchId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("POST", '/prodex/api/branches/datagrid').as('branchesLoading')

        cy.login("user1@example.com", "echopass123")

        cy.url().should("include", "inventory")

        cy.wait('@inventoryLoading')
        cy.contains("Settings").click()

        cy.contains("BRANCHES").click()

        cy.wait("@branchesLoading")
    })

    it("Creates a branch", () => {
        cy.get("button[class='ui large primary button']").click({force: true})

        cy.get("#field_input_name")
            .type("Central branch")
            .should("have.value", "Central branch")

        cy.get("input[id='field_input_address.streetAddress']")
            .type("125 N G St")
            .should("have.value", "125 N G St")

        cy.get("input[id='field_input_address.city']")
            .type("Harlingen")
            .should("have.value", "Harlingen")

        cy.selectFromDropdown("div[id='field_dropdown_address.zip']","75000")

        cy.selectFromDropdown("div[id='field_dropdown_address.country']", "USA")

        cy.selectFromDropdown("div[id='field_dropdown_address.province']", "Alabama")

        cy.get("input[id='field_input_contactName']")
            .type("David Cameron")
            .should("have.value","David Cameron")

        cy.get("input[id='field_input_contactPhone']")
            .type("123456789")
            .should("have.value","123456789")

        cy.get("input[id='field_input_contactEmail']")
            .type("test@central.com")
            .should("have.value","test@central.com")

        cy.get("button[class='ui primary button']").click()

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

        cy.get("#field_dropdown_address.zip")
            .should("have.value","Harlingen")

        cy.get("#field_dropdown_address.country")
            .should("have.value","USA")

        cy.get("#field_dropdown_address.province")
            .should("have.value","Alabama")

        cy.get("#field_input_contactName")
            .should("have.value","David Cameron")

        cy.get("#field_input_contactPhone")
            .should("have.value","123456789")

        cy.get("#field_input_contactEmail")
            .should("have.value","test@central.com")
    })

    it("Edits a branch", () => {
        cy.get("input").type("Central")

        cy.waitForUI()

        cy.get('[data-test=action_' + branchId + ']').click()

        cy.get('[data-test=action_' + branchId + '_0]').click()

        cy.get("#field_input_contactName")
            .clear()
            .type("Arnold Schwarzenegger")
            .should("have.value","Arnold Schwarzenegger")

        cy.contains("Save").click()

        cy.get('[data-test=action_' + branchId + ']').click()

        cy.get('[data-test=action_' + branchId + '_0]').click()

        cy.get("#field_input_contactName")
            .should("have.value","Arnold Schwarzenegger")
    })

    it("Deletes a branch", () => {
        cy.waitForUI()

        cy.get('[data-test=action_' + userID + ']').click()

        cy.get('[data-test=action_' + userID + '_1]').click()

        //TODO Own function
        cy.get("button[class='ui primary button']").click()

        cy.contains("Central").should("not.exist")
    })
})