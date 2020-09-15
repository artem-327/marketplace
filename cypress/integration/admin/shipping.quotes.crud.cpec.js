context("Shipping quotes CRUD", () => {

    let quoteId = null
    let filter = [{"operator": "LIKE", "path": "ShippingQuote.carrierName", "values": ["%POST%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("GET", "/prodex/api/dashboard").as("loading")
        cy.route("POST", "/prodex/api/shipment/manual-quotes/datagrid").as("quotesLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "dashboard")

        cy.wait("@loading")

        cy.get('.flex-wrapper > :nth-child(7)').click()

        cy.wait("@quotesLoad")
    })

    it("Creates a shipping quote", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'shipment/manual-quotes', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'shipment/manual-quotes/id', itemId)
            })
        })
        cy.get('[data-test=operations_open_popup_btn]').click()

        cy.enterText("#field_input_carrierName", "POST")
        cy.enterText("#field_input_quoteId", "AAA")
        cy.enterText("#field_input_price", "10")
        cy.clickSave()

        cy.contains("POST")
        cy.contains("AAA")
        cy.contains("10")
    })

    it("Checks error message", () => {
        cy.get('[data-test=operations_open_popup_btn]').click()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 4)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a shipping quote", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'shipment/manual-quotes', filter).then(itemId => {
                cy.openElement(itemId, 0)

                quoteId = itemId
            })
        })
        cy.waitForUI()

        cy.get('[data-test=confirm_dialog_proceed_btn]').click()

        cy.get("[data-test=action_" + quoteId + "]").should("not.exist")
    })
})