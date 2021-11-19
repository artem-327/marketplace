context("Shipping quotes CRUD", () => {

    let quoteId = null
    let filter = [{"operator": "LIKE", "path": "ShippingQuote.carrierName", "values": ["%POST%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    before(function () {
        cy.getToken().then(token => {
            cy.finishTakeover(token)
        })
    })

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard*").as("loading")
        cy.intercept("POST", "/prodex/api/shipment/manual-quotes/datagrid*").as("quotesLoad")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@loading")
        cy.get('.flex-wrapper > :nth-child(7)').click()

        cy.waitForUI()
        cy.get('[data-test=navigation_operations_shipping-quotes_drpdn]').click()

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
        cy.waitForUI()
        cy.get("#field_input_validityDate").click()
        cy.get("div.popup").within(() => {
            cy.get("i.right.icon").click()
            cy.contains("15").click()
        })
        cy.waitForUI()
        cy.clickSave()

        cy.contains("POST")
        cy.contains("AAA")
        cy.contains("10")
    })

    it("Checks error message", () => {
        cy.get('[data-test=operations_open_popup_btn]').click()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 2)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)|(Date must be in future)/i)
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