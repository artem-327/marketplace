context("Market Segments CRUD", () => {

    let documentId = null
    let filter = [{"operator": "LIKE", "path": "MarketSegment.name", "values": ["%Test%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("GET", "/prodex/api/dashboard").as("loading")
        cy.route("POST", "/prodex/api/market-segments/datagrid").as("segments")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.url().should("include", "dashboard")

        cy.wait("@loading")

        cy.contains('Market Segments').click()

        cy.wait("@segments")
    })

    it("Creates a market segment", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'market-segments', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'market-segments/id', itemId)
            })
        })
        cy.clickAdd()

        cy.enterText("#field_input_val0", "Test segment")

        cy.clickSave()

        cy.searchInList("Test")
        cy.waitForUI()


        cy.getToken().then(token => {
            cy.getFirstMarketSegmentWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                documentId = itemId
            })
        })
        cy.get("#field_input_val0").should("have.value", "Test segment")
    })

    it("Edits a market segment", () => {
        cy.searchInList("Test")

        cy.openElement(documentId, 0)

        cy.get("#field_input_val0")
            .clear()
            .type("Great segment")
            .should("have.value", "Great segment")

        cy.clickSave()

        cy.searchInList("Great")

        cy.openElement(documentId, 0)

        cy.get("#field_input_val0").should("have.value", "Great segment")
    })

    it("Checks error message", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 1)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a market segment", () => {
        cy.searchInList("Great")

        cy.openElement(documentId, 1)

        cy.contains("Yes").click()

        cy.get("[data-test=action_" + documentId + "]").should("not.exist")
    })
})