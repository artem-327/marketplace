context("Company Documents CRUD", () => {

    let attachmentId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("POST", "/prodex/api/attachments/datagrid/").as("documentsLoading")

        cy.FElogin("user1@example.com", "echopass123")

        cy.url().should("include", "inventory")

        cy.wait("@inventoryLoading")
        cy.contains("Settings").click()

        cy.contains("DOCUMENTS").click()

        cy.wait("@documentsLoading")
        cy.waitForUI()
    })

    it("Adds a document", () => {
        cy.get("[data-test='settings_open_popup_btn']").click()

        cy.fixture("cy.png", "base64").then(fileContent => {
            cy.get("input[type='file']").upload({fileContent, fileName: "cy.png", mimeType: "image/png"})
        })

        cy.enterText("#field_input_customName", "Cypress")
        cy.get("div[id='field_dropdown_documentType.id']").click()
        cy.contains("Certificate of Origin").click()

        cy.clickSave()

        cy.contains("Document Added")

        let filter = [{"operator": "LIKE", "path": "Attachment.name", "values": ["%cy%"]}]

        cy.getToken().then(token => {
            cy.getFirstAttachmentWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                attachmentId = itemId
            })
        })

        cy.get("#field_input_customName")
            .should("have.value", "Cypress")

        cy.contains("Certificate of Origin")
    })

    it("Edits a document", () => {
        cy.openElement(attachmentId, 0)

        cy.get("#field_input_customName")
            .clear()
            .type("Cypress")
            .should("have.value", "Cypress")

        cy.clickSave()

        cy.openElement(attachmentId, 0)
        cy.get("#field_input_customName")
            .should("have.value", "Cypress")
    })

    it("Checks error messages", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 2)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a document", () => {
        cy.openElement(attachmentId, 1)

        cy.clickSave()

        cy.contains("cy.png").should("not.exist")
    })
})