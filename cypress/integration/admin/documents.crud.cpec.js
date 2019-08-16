context("Document types CRUD", () => {

    let documentId = null

    beforeEach(function () {
        cy.server()
        cy.route("GET", '/prodex/api/packaging-groups').as('loading')
        cy.route("POST", '/prodex/api/document-types/datagrid').as('documents')

        cy.login("admin@example.com", "echopass123")

        cy.url().should("include", "admin")

        cy.wait('@loading')

        cy.get('[data-test="tabs_menu_item_9"]').click()

        cy.wait('@documents')
        cy.waitForUI()

        cy.reload()
        cy.get('[data-test="tabs_menu_item_9"]').click()

        cy.wait('@documents')
    })

    it("Creates a document type", () => {
        cy.clickAdd()

        cy.enterText("#field_input_val0","Test document")

        cy.clickSave()

        cy.contains("Document Type created")

        let filter = [{"operator":"LIKE","path":"DocumentType.name","values":["%Test%"]}]

        cy.getToken().then(token => {
            cy.getFirstDocumentTypeWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                documentId = itemId
            })
        })
        cy.get("#field_input_val0").should('have.value', "Test document")
    })

    it("Edits a document type", () => {
        cy.get('[data-test=action_' + documentId + ']').click()

        cy.get('[data-test=action_' + documentId + '_0]').click()

        cy.get("#field_input_val0")
            .clear()
            .type("Best document")
            .should("have.value","Best document")

        cy.clickSave()

        cy.contains("Updated Document Type")
        cy.waitForUI()

        cy.get('[data-test=action_' + documentId + ']').click()
        cy.get('[data-test=action_' + documentId + '_0]').click()

        cy.get("#field_input_val0").should('have.value', "Best document")
    })

    xit("Use a document type", () => {

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

    it("Deletes a document type", () => {
        cy.get('[data-test=action_' + documentId + ']').click()
        cy.get('[data-test=action_' + documentId + '_1]').click()

        cy.contains("Yes").click()

        cy.get('[data-test=action_' + documentId + ']').should('not.exist')
    })
})