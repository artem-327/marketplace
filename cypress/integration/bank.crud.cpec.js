context("Prodex Bank Account CRUD", () => {

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("GET", '/prodex/api/payments/bank-accounts***').as('accountsLoading')

        cy.login("user1@example.com", "echopass123")

        cy.url().should("include", "inventory")

        cy.wait('@inventoryLoading')
        cy.contains("Settings").click()

        cy.contains("BANK ACCOUNTS").click()

        cy.wait("@accountsLoading")
        cy.waitForUI()
    })

    it("Creates a bank account", () => {
        cy.get("button[class='ui large primary button']").click({force: true})

        let accountNumber = new Date().getTime()
        cy.get("#field_input_accountNumber")
            .type(accountNumber)

        cy.get("#field_dropdown_bankAccountType").click()
        cy.get("#field_dropdown_bankAccountType").within(() => {
            cy.get("div[role='option']").eq(0).click()
        })

        cy.get("#field_input_name")
            .type("David Tester")
            .should("have.value","David Tester")

        cy.get("#field_input_routingNumber")
            .type("123103729")
            .should("have.value","123103729")

        cy.clickSave()

        cy.contains("Created Bank Account")
    })

    it("Initiate Verification bank account", () => {
        cy.get("input[type=text]").type("David Tester")

        cy.waitForUI()

        cy.get("i[class='ellipsis vertical large icon']").click()

        cy.contains("Initiate Verification").click()

        cy.wait("@accountsLoading")

        cy.contains("Verification in process")
    })

    xit("Complete Verification bank account", () => {
        cy.get("input[type=text]").type("David Tester")

        cy.get("i[class='ellipsis vertical large icon']").click()
    })

    xit("Checks error messages", () => {

    })

    it("Deletes a bank account", () => {
        cy.get("input[type=text]").type("David Tester")

        cy.waitForUI()

        cy.get("i[class='ellipsis vertical large icon']").click()

        cy.contains("Delete").click()

        cy.contains("Yes").click()

        cy.contains("No records found.")
    })
})