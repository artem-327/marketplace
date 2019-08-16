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
        cy.clickAdd()

        let accountNumber = new Date().getTime()
        cy.get("#field_input_accountNumber")
            .type(accountNumber)

        cy.get("#field_dropdown_bankAccountType").click()
        cy.get("#field_dropdown_bankAccountType").within(() => {
            cy.get("div[role='option']").eq(0).click()
        })

        cy.enterText("#field_input_name","David Tester")
        cy.enterText("#field_input_routingNumber","123103729")

        cy.waitForUI()
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

    it("Checks error messages", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",4)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a bank account", () => {
        cy.searchInList("David Tester")

        cy.waitForUI()

        cy.get("i[class='ellipsis vertical large icon']").click()

        cy.contains("Delete").click()

        cy.contains("Yes").click()

        cy.contains("No records found.")
    })
})