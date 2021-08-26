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

        cy.intercept("GET", '/prodex/api/dashboard*').as('dashboardLoading')
        cy.intercept("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.intercept("PATCH", '/prodex/api/product-offers/*/broadcast-option?option=***').as('broadcast')
        cy.intercept("GET", "/prodex/api/company-products/own/search*").as("offerLoading")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()
        cy.wait("@dashboardLoading", { timeout: 100000 })
        cy.url().should("include", "dashboard")

        cy.get("[data-test=navigation_menu_inventory_drpdn]", { timeout: 100000 }).click()
        cy.wait("@inventoryLoading", { timeout: 100000 })
        cy.url().should("include", "inventory")
    })

    it('Start/stop item broadcasting', () => {
        cy.waitForUI()
        cy.openOffer(offerId, 0)

        cy.wait("@offerLoading")
        //Set Just Me
        cy.get("[id='field_dropdown_edit.broadcastOption']").should("contain.text", "Network")
        cy.get("[id='field_dropdown_edit.broadcastOption']").click()
        cy.get("[id='field_dropdown_edit.broadcastOption']").within(() => {
            cy.get("[role='option']").within(() => {
                cy.contains("Just Me").click()
            })
        })

        cy.wait("@broadcast")

        //Set Network
        cy.get("[id='field_dropdown_edit.broadcastOption']").should("contain.text", "Just Me")
        cy.get("[id='field_dropdown_edit.broadcastOption']").click()
        cy.get("[id='field_dropdown_edit.broadcastOption']").within(() => {
            cy.get("[role='option']").within(() => {
                cy.contains("Network").click()
            })
        })
        cy.wait("@broadcast")

        cy.visit("/inventory/my-listings")
        cy.wait("@inventoryLoading", { timeout: 100000 })

        //Assert saved
        cy.openOffer(offerId, 0)
        cy.waitForUI()
        cy.get("[id='field_dropdown_edit.broadcastOption']").should("contain.text", "Network")
    })

    it('Turn on custom broadcasting', () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.setOfferBroadcasting(token, offerId, "NO_BROADCAST")
        })

        cy.reload()
        cy.waitForUI()

        cy.openOffer(offerId, 3)

        cy.get("[data-test=broadcast_rule_row_click]", { timeout: 100000 }).should("be.visible")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(1)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()
        cy.get('[data-test=broadcast_modal_apply_btn]').click()

        cy.wait("@broadcast")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui checked fitted toggle checkbox")
        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(1)
            .should("have.class", "ui fitted toggle checkbox")
    })

    it("Turns off the broadcasting", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.setOfferBroadcasting(token, offerId, "GLOBAL_RULES")
        })

        cy.openOffer(offerId, 3)

        cy.get("[data-test=broadcast_rule_row_click]", { timeout: 100000 }).should("be.visible")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()
        cy.get('[data-test=broadcast_modal_apply_btn]').click()

        cy.wait("@broadcast")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(1)
            .should("have.class", "ui fitted toggle checkbox")
    })

    it("Turns on the broadcasting for Alberta and USA only", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.setOfferBroadcasting(token, offerId, "NO_BROADCAST")
        })

        cy.openOffer(offerId, 3)

        cy.get("[data-test=broadcast_rule_row_click]", { timeout: 100000 }).should("be.visible")

        cy.get('[data-test=broadcast_global_category_drpdn]').click()
        cy.contains("Region").click()

        cy.contains("Canada").click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(1)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(3)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()

        cy.get('[data-test=broadcast_modal_apply_btn]').click()

        cy.wait("@broadcast")

        cy.get('[data-test=broadcast_global_category_drpdn]').click()
        cy.contains("Region").click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(1)
            .should("have.class", "ui fitted toggle checkbox")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(2)
            .should("have.class", "ui indeterminate fitted toggle checkbox")

    })

    it("Switch to Region broadcasting", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.setOfferBroadcasting(token, offerId, "GLOBAL_RULES")
        })

        cy.openOffer(offerId, 3)

        cy.get("[data-test=broadcast_rule_row_click]", { timeout: 100000 }).should("be.visible")

        cy.get('[data-test=broadcast_global_category_drpdn]').click()
        cy.contains("Region").click()

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui checked fitted toggle checkbox")
            .click()
        cy.get('[data-test=broadcast_modal_apply_btn]').click()

        cy.wait("@broadcast")

        cy.get("[data-test='broadcast_rule_toggle_chckb']")
            .eq(0)
            .should("have.class", "ui fitted toggle checkbox")
    })
})