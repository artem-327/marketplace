context("Inventory Broadcasting", () => {
    let offerId = null
    const userJSON = require('../fixtures/user.json')

    before(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getInventoryDatagridBody(token).then(inventoryBody => {
                //TODO Found out why some assigning doesn't work
                let idHelper = inventoryBody[0].id

                offerId = idHelper
            })
        })
    })


    beforeEach(function () {
        cy.viewport(1620, 2000)

        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("PATCH", '/prodex/api/product-offers/*/broadcast?broadcasted=***').as('broadcast')
        cy.route("POST", '/prodex/api/broadcast-rules/*').as('rulesSaving')

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading", {timeout: 100000})
        cy.url().should("include", "inventory")
    })

    it('Start/stop item broadcasting', () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.setOfferBroadcasting(token, offerId, "false")
        })
        cy.get(".table-responsive").scrollTo("right")
        cy.waitForUI()

        cy.get("[data-test=my_inventory_broadcast_chckb]").eq(0).should("not.have.class", "checked")
        cy.get("[data-test=my_inventory_broadcast_chckb]").eq(0).click()
        cy.wait("@broadcast")
        cy.get("[data-test=my_inventory_broadcast_chckb]").eq(0).should("have.class", "checked")
        cy.waitForUI()

        cy.get("[data-test=my_inventory_broadcast_chckb]").eq(0).click()
        cy.wait("@broadcast")
        cy.get("[data-test=my_inventory_broadcast_chckb]").eq(0).should("not.have.class", "checked")
    })

    it('Turn on custom broadcasting', () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.returnTurnOffJson().then(jsonBody => {
                cy.setOfferPriceBook(token, offerId, jsonBody)
            })
        })

        cy.reload()
        cy.wait("@inventoryLoading", {timeout: 100000})

        cy.openElement(offerId, 2)

        cy.get("[data-test=broadcast_rule_row_click]").should("be.visible")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(8)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()
        cy.get("[data-test='sidebar_inventory_save_new']").click()

        cy.wait("@rulesSaving")
        cy.contains("Info!")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui indeterminate fitted toggle checkbox")
        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(8)
            .should("have.class", "ui fitted toggle checkbox")
    })

    it("Turns off the broadcasting", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.returnTurnOnJson().then(jsonBody => {
                cy.setOfferPriceBook(token, offerId, jsonBody)
            })
        })

        cy.openElement(offerId, 2)

        cy.get("[data-test=broadcast_rule_row_click]").should("be.visible")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()
        cy.get("[data-test='sidebar_inventory_save_new']").click()

        cy.wait("@rulesSaving")
        cy.contains("Price book for this offer has been deleted")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui fitted toggle checkbox")
    })

    it("Turns on the broadcasting for Albreta and USA only", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.returnTurnOffJson().then(jsonBody => {
                cy.setOfferPriceBook(token, offerId, jsonBody)
            })
        })

        cy.openElement(offerId, 2)

        cy.get("[data-test=broadcast_rule_row_click]").should("be.visible")

        cy.contains("Canada").click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(1)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(3)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()

        cy.get("[data-test='sidebar_inventory_save_new']").click()

        cy.wait("@rulesSaving")
        cy.contains("Info!")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(1)
            .should("have.class", "ui fitted toggle checkbox")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(2)
            .should("have.class", "ui indeterminate fitted toggle checkbox")

    })

    it("Switch to company broadcasting", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.returnTurnOffJson().then(jsonBody => {
                cy.setOfferPriceBook(token, offerId, jsonBody)
            })
        })

        cy.openElement(offerId, 2)

        cy.get("[data-test=broadcast_rule_row_click]").should("be.visible")

        cy.get("[data-test=broadcast_modal_category_drpdn]").click()
        cy.contains("By Company").click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()
        cy.get("[data-test='sidebar_inventory_save_new']").click()

        cy.wait("@rulesSaving")
        cy.contains("Info!")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui fitted toggle checkbox")
    })
})