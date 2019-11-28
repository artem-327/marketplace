context("Prodex Global Price", () => {
    let branchId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("GET", '/prodex/api/broadcast-rules/general').as('rulesLoading')
        cy.route("POST", '/prodex/api/broadcast-rules/general').as('rulesSaving')
        cy.viewport(1280, 800)

        cy.FElogin("mackenzie@echoexchange.net", "echopass123")

        cy.wait("@inventoryLoading", {timeout: 100000})
        cy.contains("Settings").click()
    })

    it("Turns on the broadcasting", () => {
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.turnOffGlobalBroadcasting(token)
        })

        cy.contains("GLOBAL PRICE BOOK").click()

        cy.wait("@rulesLoading")
        cy.waitForUI()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui fitted toggle checkbox")
            .click()
        cy.get("[data-test='broadcast_modal_save_btn']").click()

        cy.wait("@rulesSaving")
        cy.contains("Saved successfully!")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui checked fitted toggle checkbox")
    })

    it("Turns off the broadcasting", () => {
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.turnOnGlobalBroadcasting(token)
        })

        cy.contains("GLOBAL PRICE BOOK").click()

        cy.wait("@rulesLoading")
        cy.waitForUI()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()
        cy.get("[data-test='broadcast_modal_save_btn']").click()

        cy.wait("@rulesSaving")
        cy.contains("Saved successfully!")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui fitted toggle checkbox")
    })

    it("Turns on the broadcasting for Albreta and USA only", () => {
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.turnOffGlobalBroadcasting(token)
        })

        cy.contains("GLOBAL PRICE BOOK").click()

        cy.wait("@rulesLoading")
        cy.waitForUI()

        cy.contains("Canada").click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(1)
            .should("have.class", "ui fitted toggle checkbox")
            .click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(3)
            .should("have.class", "ui fitted toggle checkbox")
            .click()

        cy.get("[data-test='broadcast_modal_save_btn']").click()

        cy.wait("@rulesSaving")
        cy.contains("Saved successfully!")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(1)
            .should("have.class", "ui checked fitted toggle checkbox")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(2)
            .should("have.class", "ui indeterminate fitted toggle checkbox")

    })

    it("Switch to company broadcasting", () => {
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.turnOffGlobalBroadcasting(token)
        })

        cy.contains("GLOBAL PRICE BOOK").click()

        cy.wait("@rulesLoading")
        cy.waitForUI()

        cy.get("[data-test=broadcast_modal_category_drpdn]").click()
        cy.contains("By Company").click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui fitted toggle checkbox")
            .click()
        cy.get("[data-test='broadcast_modal_save_btn']").click()

        cy.wait("@rulesSaving")
        cy.contains("Saved successfully!")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui checked fitted toggle checkbox")
    })
})