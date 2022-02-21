context("Shared Listing", () => {

    let productId
    let productName
    let offerId
    const userJSON = require('../../fixtures/user.json')
    const userJSON2 = require('../../fixtures/user2.json')

    before(function () {
        cy.getUserToken(userJSON2.email, userJSON2.password).then(token => {
            let filter = [{ "operator": "EQUALS", "path": "ProductOffer.companyProduct.id", "values": [productId] }]
            cy.getFirstEntityWithFilter(token, 'product-offers/own', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-offers', itemId)
            })

            cy.getMyProductsBody(token).then(productBody => {
                productId = productBody[ 0 ].id
                productName = productBody[ 0 ].intProductName
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
        cy.getUserToken(userJSON2.email, userJSON2.password).then(token => {
            let filter = [{ "operator": "EQUALS", "path": "ProductOffer.companyProduct.id", "values": [productId] }]
            cy.getFirstEntityWithFilter(token, 'product-offers/own', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-offers', itemId)
            })
        })
    })

    beforeEach(function () {
        cy.viewport(3000, 2000)
        cy.intercept("GET", "/prodex/api/dashboard*").as("dashboardLoading")
        cy.intercept("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.intercept("POST", "/prodex/api/product-offers/shared-listings/datagrid*").as("sharedListingLoading")
        cy.intercept("PATCH", "/prodex/api/product-offers/**/mark-up").as("markupSave")
        cy.intercept("PATCH", "/prodex/api/product-offers/**/broadcast-option?**").as("optionSave")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@dashboardLoading", { timeout: 100000 })
        cy.waitForUI()
        cy.get("[data-test=navigation_menu_inventory_drpdn]", { timeout: 100000 }).click()
        cy.wait("@inventoryLoading", { timeout: 100000 })

        cy.get("[data-test='navigation_menu_inventory_shared_listings_drpdn']", { timeout: 100000 }).click()
        cy.wait("@sharedListingLoading", { timeout: 100000 })
    })

    it("See item details", () => {
        cy.get("[data-test='table_row_action']").eq(0).within((listing) => {
            cy.get("[class*='SpanSellerName']").should("be.visible")
            cy.get("[class*='RowDropdown']")
            cy.get("[class*='NetworkDropdown']").should("be.visible")
            cy.wrap(listing).click()
        })

        cy.get("[data-test='table_row_action']").eq(0).next().within((listing) => {
            cy.get("[name='priceMultiplier']").should("be.visible")
            cy.contains("div", "Minimum Packages").should("be.visible")

            cy.contains("a", "TDS").should("be.visible")
            cy.contains("a", "Documents").should("be.visible")
            cy.contains("a", "Notes").should("be.visible")

            cy.waitForUI()
            cy.contains("a", "SDS").click()
            cy.contains("div", "Mixtures").should("be.visible")
        })

    })

    it("Set quick pricing tier", () => {
        cy.get("input[type=text]").type(productName, {force: true})
        cy.wait('@sharedListingLoading')
        cy.get("i[class='search icon']").next().within(() => {
            cy.get("[role=option]").within(() => {
                cy.contains(productName).click()
            })
        })

        cy.wait("@sharedListingLoading", { timeout: 100000 })

        cy.get("[data-test*='" + offerId + "']").parent().parent().parent().click({force: true})
        cy.waitForUI()
        //Cypress losing focus while typing
        cy.get("[name='priceMultiplier']").type(2, { force: true})
        cy.get("[name='priceMultiplier']").type(2, { force: true})
        cy.waitForUI()
        cy.contains("button","Save").click()

        cy.wait("@markupSave")
        cy.wait("@sharedListingLoading", { timeout: 100000 })

        cy.reload()
        cy.wait("@sharedListingLoading", { timeout: 100000 })
        cy.get("[data-test*='" + offerId + "']").parent().parent().parent().click({force: true})
        cy.waitForUI()
        cy.get("[name='priceMultiplier']").should("have.value", 22)
    })

    it("Change broadcasting", () => {
        cy.waitForUI()
        cy.get("input[type=text]").type(productName, {force: true})
        cy.wait('@sharedListingLoading')
        cy.get("i[class='search icon']").next().within(() => {
            cy.get("[role=option]").within(() => {
                cy.contains(productName).click()
            })
        })
        cy.wait("@sharedListingLoading", { timeout: 100000 })

        cy.get("[data-test*='" + offerId + "']").parents("[data-test='table_row_action']").within(() => {
            cy.get("[class*='NetworkDropdown']").click()
            cy.waitForUI()
            cy.contains("div", "Who should see this offer?").should("be.visible")
            cy.contains("div", "+20").click()

            cy.wait("@optionSave", { timeout: 100000 }).then(({ request, response }) => {
                expect(response.statusCode).to.eq(200)
            })
        })
    })

    it("Set Pricing book", () => {
        cy.openElement(offerId, 0)

        cy.get("[data-test='broadcast_price_control_price_inp']").find("input[type='number']").eq(0).clear().type(20)

        cy.get("[data-test='broadcast_modal_apply_btn']").click()
        cy.wait("@optionSave", { timeout: 100000 }).then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })
    })
})