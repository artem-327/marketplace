context("Market Segments CRUD", () => {

    let documentId = null

    beforeEach(function () {
        cy.server()
        cy.route("GET", '/prodex/api/packaging-groups').as('loading')
        cy.route("POST", '/prodex/api/market-segments/datagrid').as('segments')

        cy.login("admin@example.com", "echopass123")

        cy.url().should("include", "admin")

        cy.wait('@loading')

        cy.get('[data-test="tabs_menu_item_10"]').click()

        cy.wait('@segments')
    })

    it("Creates a market segment", () => {
        cy.clickAdd()

        cy.enterText("#field_input_val0","Test segment")

        cy.clickSave()

        cy.contains("Market Segment created")

        cy.get("input[type=text]").type("Test")

        let filter = [{"operator":"LIKE","path":"MarketSegment.name","values":["%Test%"]}]

        cy.getToken().then(token => {
            cy.getFirstMarketSegmentWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                documentId = itemId
            })
        })
        cy.get("#field_input_val0").should('have.value', "Test segment")
    })

    it("Edits a market segment", () => {
        cy.get("input[type=text]").type("Test")

        cy.get('[data-test=action_' + documentId + ']').click()
        cy.get('[data-test=action_' + documentId + '_0]').click()

        cy.get("#field_input_val0")
            .clear()
            .type("Great segment")
            .should("have.value","Great segment")

        cy.clickSave()

        cy.contains("Updated Market Segment")
        cy.waitForUI()

        cy.get("input[type=text]").type("Great")

        cy.get('[data-test=action_' + documentId + ']').click()
        cy.get('[data-test=action_' + documentId + '_0]').click()

        cy.get("#field_input_val0").should('have.value', "Great segment")
    })

    xit("Use a market segment", () => {

    })

    it("Checks error message", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",1)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a market segment", () => {
        cy.searchInList("Great")

        cy.get('[data-test=action_' + documentId + ']').click()
        cy.get('[data-test=action_' + documentId + '_1]').click()

        cy.contains("Yes").click()

        cy.get('[data-test=action_' + documentId + ']').should('not.exist')
    })
})