context("Company Documents CRUD", () => {

    let attachmentId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("POST", '/prodex/api/attachments/datagrid/').as('documentsLoading')

        cy.login("user1@example.com", "echopass123")

        cy.url().should("include", "inventory")

        cy.wait('@inventoryLoading')
        cy.contains("Settings").click()

        cy.contains("DOCUMENTS").click()

        cy.wait("@documentsLoading")
        cy.waitForUI()
    })

    it("Adds a document", () => {
        cy.clickAdd()

        //TODO Fix after FE adjustments
        cy.fixture('cy.png', 'base64').then(fileContent => {
            cy.get("input[type='file']").upload({ fileContent, fileName: 'cy.png', mimeType: 'image/png' });
        });

        cy.enterText("#field_input_customName", "Cypress")
        cy.selectFromDropdown("div[id='field_dropdown_documentType.id']","Certificate of Origin")

        cy.clickSave()

        cy.contains("Document Added")

        let filter = [{"operator":"LIKE","path":"Attachment.name","values":["%cy%"]}]

        cy.getToken().then(token => {
            cy.getFirstAttachmentWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                attachmentId = itemId
            })
        })

        cy.get("#field_input_customName")
            .should("have.value","Cypress")

        cy.contains("Certificate of Origin")
    })

    it("Edits a document", () => {
        cy.get('[data-test=action_' + attachmentId + ']').click({force: true})
        cy.get('[data-test=action_' + attachmentId + '_0]').click({force: true})

        cy.get("#field_input_customName")
            .clear()
            .type("Cypress")
            .should("have.value","Cypress")

        cy.clickSave()

        cy.get('[data-test=action_' + attachmentId + ']').click({force: true})
        cy.get('[data-test=action_' + attachmentId + '_0]').click({force: true})

        cy.get("#field_input_customName")
            .should("have.value","Cypress")
    })

    it("Checks error messages", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",2)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a document", () => {
        cy.get('[data-test=action_' + attachmentId + ']').click({force: true})
        cy.get('[data-test=action_' + attachmentId + '_1]').click({force: true})

        cy.clickSave()

        cy.contains("cy.png").should("not.exist")
    })
})