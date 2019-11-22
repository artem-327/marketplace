context("Market Segments CRUD", () => {

    let documentId = null

    beforeEach(function () {
        cy.server()
        cy.route("GET", "/prodex/api/packaging-groups").as("loading")
        cy.route("POST", "/prodex/api/market-segments/datagrid").as("segments")

        cy.FElogin("admin@example.com", "echopass123")

        cy.url().should("include", "admin")

        cy.wait("@loading")

        cy.get("[data-test='tabs_menu_item_10']").click()

        cy.wait("@segments")
    })

    it("Creates a market segment", () => {
        cy.clickAdd()

        cy.enterText("#field_input_val0", "Test segment")

        cy.clickSave()

        cy.contains("Market Segment created")

        cy.searchInList("Test")
        cy.waitForUI()

        let filter = [{"operator": "LIKE", "path": "MarketSegment.name", "values": ["%Test%"]}]

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

        cy.contains("Updated Market Segment")

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