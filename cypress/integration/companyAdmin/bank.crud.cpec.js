context("Prodex Bank Account CRUD", () => {
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard*").as("inventoryLoading")
        cy.intercept("GET", "/prodex/api/tradepass/my-tradepass").as("settingsLoading")
        cy.intercept("GET", "/prodex/api/payments/bank-accounts/velloci").as("bankAccountLoading")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading", { timeout: 100000 })
        cy.openSettings()
        cy.wait("@settingsLoading", { timeout: 100000 })
        cy.waitForUI()
        cy.get("[data-test='navigation_settings_bank_accounts_drpdn']").click()
        cy.wait("@bankAccountLoading")
    })

    it("Assert page loaded", () => {
        cy.contains('button', 'Add Account').should('be.visible')
        cy.contains('button', 'Send Link').should('be.visible')
        cy.get('span[class*="BankName"]').should('be.visible')
        cy.get("[data-test='table_row_action']").its('length').should('be.gt', 0)
    })
})