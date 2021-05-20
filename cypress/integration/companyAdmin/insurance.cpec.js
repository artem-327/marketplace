context("Insurance", () => {
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.intercept("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.intercept("GET", "/prodex/api/tradepass-insurance-documents").as("documentsLoading")
        cy.intercept("GET", "/prodex/api/tradepass/my-tradepass").as("tradePassLoading")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading", { timeout: 100000 })
        cy.openSettings()
        cy.wait("@tradePassLoading")
        cy.get("[data-test='navigation_settings_my_insurance_drpdn']").click()
        cy.wait("@documentsLoading")
    })

    it("Documents showed", () => {
        cy.get("[data-test='settings_insurance_add_document_btn']").should("be.visible")
        cy.get("[data-test='table_row_action']").its('length').should('be.gt', 0)
        cy.get("[class*=BasicButtonUpdate]").its('length').should('be.gt', 0)

        cy.get("[data-test='settings_insurance_add_document_btn']").click()
        cy.get("[data-test='company_form_add_legal_document_submit_btn']").should("be.visible")
    })

    it("Can update a document", () => {
        cy.get("[class*=BasicButtonUpdate]").eq(0).click()
        cy.get("#field_dropdown_documentId").should("have.class", "disabled")
        cy.contains("label", "Browse file here")
    })
})