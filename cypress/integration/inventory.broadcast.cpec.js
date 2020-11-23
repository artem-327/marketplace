context("Inventory Broadcasting", () => {
    let offerId = null
    const userJSON = require('../fixtures/user.json')

    before(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getMyProductsBody(token).then(productBody => {
                let productId = productBody[ 0 ].id
                cy.getFirstEntityWithFilter(token, 'branches/warehouses', []).then(warehouseId => {
                    cy.createProductOffer(token, productId, warehouseId).then(offer => {
                        let idHelper = offer

                        offerId = idHelper
                    })
                })
            })
        })
    })

    after(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.deleteEntity(token, 'product-offers', offerId)
        })
    })


    beforeEach(function () {
        cy.viewport(3000, 2000)

        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("PATCH", '/prodex/api/product-offers/*/broadcast?broadcasted=***').as('broadcast')
        cy.route("POST", '/prodex/api/broadcast-rules/*').as('rulesSaving')
        cy.route("GET", "/prodex/api/product-offers/*").as("offerLoading")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()
        cy.visit("/inventory/my-listings")
        cy.wait("@inventoryLoading", { timeout: 100000 })
        cy.url().should("include", "inventory")
    })

    it('Start/stop item broadcasting', () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.setOfferBroadcasting(token, offerId, "false")
        })

        cy.waitForUI()
        cy.get("[data-test=action_" + offerId + "_0]").parent().parent().click()
        cy.get("[data-test=action_" + offerId + "_0]").click()

        cy.wait("@offerLoading")
        //Set broadcast
        cy.get("[id='field_dropdown_edit.broadcasted']").eq(0).should("contain.text", "No")
        cy.get("[id='field_dropdown_edit.broadcasted']").click()
        cy.get("[id='field_dropdown_edit.broadcasted']").within(() => {
            cy.get("[role='option']").within(() => {
                cy.contains("Yes").click()
            })
        })

        cy.get("[data-test=sidebar_inventory_save_new]").click()

        cy.waitForUI()
        //Set not broadcasted
        cy.get("[data-test=action_" + offerId + "_0]").parent().parent().click()
        cy.get("[data-test=action_" + offerId + "_0]").click()

        cy.get("[id='field_dropdown_edit.broadcasted']").eq(0).should("contain.text", "Yes")
        cy.get("[id='field_dropdown_edit.broadcasted']").click()
        cy.get("[id='field_dropdown_edit.broadcasted']").within(() => {
            cy.get("[role='option']").within(() => {
                cy.contains("No").click()
            })
        })

        cy.get("[data-test=sidebar_inventory_save_new]").click()
        cy.waitForUI()

        //Assert saved
        cy.get("[data-test=action_" + offerId + "_0]").parent().parent().click()
        cy.waitForUI()
        cy.get("[data-test=action_" + offerId + "_0]").click()
        cy.waitForUI()
        cy.get("[id='field_dropdown_edit.broadcasted']").eq(0).should("contain.text", "No")
    })

    it('Turn on custom broadcasting', () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.returnTurnOffJson().then(jsonBody => {
                cy.setOfferPriceBook(token, offerId, jsonBody)
            })
        })

        cy.reload()
        cy.waitForUI()

        cy.get("[data-test=action_" + offerId + "_3]").parent().parent().click()
        cy.get("[data-test=action_" + offerId + "_3]").click()

        cy.get("[data-test=broadcast_rule_row_click]", { timeout: 10000 }).should("be.visible")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(8)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()
        cy.get("[data-test='sidebar_inventory_save_new']").click()

        cy.wait("@rulesSaving")

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

        cy.get("[data-test=action_" + offerId + "_3]").parent().parent().click()
        cy.get("[data-test=action_" + offerId + "_3]").click()

        cy.get("[data-test=broadcast_rule_row_click]", { timeout: 10000 }).should("be.visible")

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

        cy.get("[data-test=action_" + offerId + "_3]").parent().parent().click()
        cy.get("[data-test=action_" + offerId + "_3]").click()

        cy.get("[data-test=broadcast_rule_row_click]", { timeout: 10000 }).should("be.visible")

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

        cy.get("[data-test=action_" + offerId + "_3]").parent().parent().click()
        cy.get("[data-test=action_" + offerId + "_3]").click()

        cy.get("[data-test=broadcast_rule_row_click]", { timeout: 10000 }).should("be.visible")

        cy.get("[data-test=broadcast_modal_category_drpdn]").click()
        cy.contains("By Company").click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()
        cy.get("[data-test='sidebar_inventory_save_new']").click()

        cy.wait("@rulesSaving")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui fitted toggle checkbox")
    })
})