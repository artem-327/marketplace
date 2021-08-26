context("Bids Tests", () => {
    const userJSON = require('../fixtures/user.json')
    const userJSON2 = require('../fixtures/user2.json')
    let offerId
    let productName
    let bidId
    let productId

    beforeEach(function () {
        cy.viewport(2500, 3500)
        cy.intercept("GET", '/prodex/api/dashboard*').as('inventoryLoading')
        cy.intercept("POST", '/prodex/api/product-offers/broadcasted/datagrid*').as('marketplaceLoading')
        cy.intercept("POST", "/prodex/api/product-offer-bids").as("createdBid")
        cy.intercept("PATCH", "/prodex/api/product-offer-bids/id/**").as("bidAction")
        cy.intercept("POST", "/prodex/api/product-offer-bids/own/datagrid*").as("myBids")
        cy.intercept("POST", "/prodex/api/product-offer-bids/other/datagrid*").as("otherBids")
        cy.intercept("DELETE", "/prodex/api/product-offer-bids/id/**").as("deleteBid")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()

        cy.wait('@inventoryLoading', { timeout: 30000 })
        cy.url().should("include", "dashboard")
        cy.contains("Marketplace").click()

        cy.wait("@marketplaceLoading", { timeout: 30000 })
    })
    before(function () {
        cy.getUserToken(userJSON2.email, userJSON2.password).then(token => {
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
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            let filter = [{ "operator": "EQUALS", "path": "ProductOfferBid.histories.status", "values": ["NEW"] }]
            cy.getFirstEntityWithFilter(token, 'product-offer-bids/own', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-offer-bids/id', itemId)
            })
            cy.getFirstEntityWithFilter(token, 'product-offer-bids/own', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-offer-bids/id', itemId)
            })
            cy.getFirstEntityWithFilter(token, 'product-offer-bids/own', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-offer-bids/id', itemId)
            })
        })
        cy.waitForUI()
        cy.getUserToken(userJSON2.email, userJSON2.password).then(token => {
            let filter = [{ "operator": "EQUALS", "path": "ProductOffer.companyProduct.id", "values": [productId] }]
            cy.getFirstEntityWithFilter(token, 'product-offers/own', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-offers', itemId)
            })
        })
    })

    it("Create new Bid", () => {
        cy.searchInMarketplace(productName)
        cy.wait("@marketplaceLoading", { timeout: 30000 })

        cy.openOffer(offerId, 2)

        cy.get('div[class*="ModalStyled"]').within(() => {
            cy.get('#field_input_pkgAmount').type("1")
            cy.get('#field_input_pricePerUOM').type("1")
        })

        cy.get('[data-test=inventory_quick_edit_pricing_popup_save_btn]').click({ force: true })
        cy.wait("@createdBid").then(({ request, response }) => {
            expect(response.statusCode).to.eq(201)
            bidId = response.body.id
        })
    })

    it("Reject My Bid", () => {
        cy.visit("/marketplace/bids-sent")
        cy.wait("@myBids", { timeout: 30000 })

        cy.openElement(bidId, 0)
        cy.wait("@bidAction").then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })
    })

    it("Counter Incoming Bid", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.createBid(token, offerId).then(value => {
                bidId = value

                cy.waitForUI()
                cy.get(".user-menu-wrapper").click()
                cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
                cy.url().should("include", "/login")
                cy.waitForUI()

                cy.FElogin(userJSON2.email, userJSON2.password)

                cy.waitForUI()
                cy.visit("/marketplace/bids-received")
                cy.wait("@otherBids", { timeout: 30000 })

                cy.openElement(bidId, 2)

                cy.contains("label", "Counter").click()
                cy.get('#field_input_pkgAmount').type("1")
                cy.get('#field_input_pricePerUOM').type("1")

                cy.get("[data-test=marketplace_bids_row_detail_submit_btn]").click()
                cy.wait("@bidAction").then(({ request, response }) => {
                    expect(response.statusCode).to.eq(200)
                })
            })
        })
    })

    it("Delete Bid", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.createBid(token, offerId).then(value => {
                bidId = value

                cy.visit("/marketplace/bids-sent")
                cy.wait("@myBids", { timeout: 30000 })

                cy.openElement(bidId, 1)

                cy.get("[data-test='confirm_dialog_proceed_btn']").click()
                cy.wait("@deleteBid").then(({ request, response }) => {
                    expect(response.statusCode).to.eq(200)
                })
            })
        })
    })

    it("Bids validation", () => {
        cy.searchInMarketplace(productName)
        cy.wait("@marketplaceLoading", { timeout: 30000 })

        cy.openOffer(offerId, 2)

        cy.get('[data-test=inventory_quick_edit_pricing_popup_save_btn]').click({ force: true })

        cy.get(".error")
            .should("have.length", 2)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })
})