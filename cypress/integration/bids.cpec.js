context("Bids Tests", () => {
    const userJSON = require('../fixtures/user.json')
    const userJSON2 = require('../fixtures/user2.json')
    let warehouseFilter = [{"operator": "EQUALS", "path": "ProductOffer.companyProduct.companyGenericProduct.company.id", "values": ["3"]}]
    let marketPlaceId

    beforeEach(function () {
        cy.viewport(2500, 3500)
        cy.intercept("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.intercept("POST", '/prodex/api/product-offers/broadcasted/datagrid/').as('marketplaceLoading')
        cy.intercept("POST", "/prodex/api/product-offer-bids").as("createdBid")
        cy.intercept("PATCH", "/prodex/api/product-offer-bids/id/**").as("bidAction")
        cy.intercept("POST", "/prodex/api/product-offer-bids/own/datagrid").as("myBids")
        cy.intercept("POST", "/prodex/api/product-offer-bids/other/datagrid").as("otherBids")
        cy.intercept("DELETE", "/prodex/api/product-offer-bids/id/**").as("deleteBid")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()

        cy.wait('@inventoryLoading', { timeout: 30000 })
        cy.url().should("include", "inventory")
        cy.contains("Marketplace").click()

        cy.wait("@marketplaceLoading", { timeout: 30000 })
    })

    after(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            let filter = [{"operator": "EQUALS", "path": "ProductOfferBid.histories.status", "values": ["NEW"]}]
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
    })

    it("Create new Bid", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getMarketPlaceFilteredDatagridBody(token, warehouseFilter).then(marketPlaceBody => {
                let suitableOffers = marketPlaceBody.filter(function (entry) {
                    return entry.minPkg == 1
                })

                marketPlaceId = suitableOffers[ 0 ].id
                cy.openElement(marketPlaceId, 3)
            })
        })

        cy.get('div[class*="MakeOfferPopup"]').within(() => {
            cy.get('#field_input_pkgAmount').type("1")
            cy.get('#field_input_pricePerUOM').type("1")
        })

        cy.get('[data-test=inventory_quick_edit_pricing_popup_save_btn]').click({ force: true })
        cy.wait("@createdBid").then(({ request, response }) => {
            expect(response.statusCode).to.eq(201)
        })
    })

    it("Reject My Bid", () => {
        cy.visit("/marketplace/bids-sent")
        cy.wait("@myBids", { timeout: 30000 })
        let filter =  [{"operator": "EQUALS", "path": "ProductOfferBid.histories.status", "values": ["NEW"]},{"operator": "EQUALS", "path": "ProductOfferBid.histories.historyType", "values": ["NORMAL"]}]
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'product-offer-bids/own', filter).then(itemId => {
                cy.openElement(itemId, 0)
            })
        })

        cy.wait("@bidAction").then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })
    })

    it("Counter Incoming Bid", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getMarketPlaceFilteredDatagridBody(token, warehouseFilter).then(marketPlaceBody => {
                let suitableOffers = marketPlaceBody.filter(function (entry) {
                    return entry.minPkg == 1
                })

                marketPlaceId = suitableOffers[ 0 ].id
                cy.createBid(token,marketPlaceId)
            })
        })

        cy.waitForUI()
        cy.get(".user-menu-wrapper").click()
        cy.get("[data-test='navigation_menu_user_drpdn']").contains("Logout").click()
        cy.url().should("include", "/login")
        cy.waitForUI()

        cy.FElogin(userJSON2.email, userJSON2.password)

        cy.waitForUI()
        cy.visit("/marketplace/bids-received")
        cy.wait("@otherBids", { timeout: 30000 })

        let filter =  [{"operator": "EQUALS", "path": "ProductOfferBid.histories.status", "values": ["NEW"]}, {"operator": "EQUALS", "path": "ProductOfferBid.owner.name", "values": ["TomasovaS"]}]
        cy.getUserToken(userJSON2.email, userJSON2.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'product-offer-bids/other', filter).then(itemId => {
                cy.openElement(itemId, 2)
            })
        })

        cy.contains("label","Counter").click()
        cy.get('#field_input_pkgAmount').type("1")
        cy.get('#field_input_pricePerUOM').type("1")

        cy.get("[data-test=marketplace_bids_row_detail_submit_btn]").click()
        cy.wait("@bidAction").then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })
    })

    it("Delete Bid", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getMarketPlaceFilteredDatagridBody(token, warehouseFilter).then(marketPlaceBody => {
                let suitableOffers = marketPlaceBody.filter(function (entry) {
                    return entry.minPkg == 1
                })

                marketPlaceId = suitableOffers[ 0 ].id
                cy.createBid(token,marketPlaceId)

                cy.visit("/marketplace/bids-sent")
                cy.wait("@myBids", { timeout: 30000 })
                let filter =  [{"operator": "EQUALS", "path": "ProductOfferBid.histories.status", "values": ["NEW"]},{"operator": "EQUALS", "path": "ProductOfferBid.histories.historyType", "values": ["NORMAL"]}]
                cy.getUserToken(userJSON.email, userJSON.password).then(token => {
                    cy.getFirstEntityWithFilter(token, 'product-offer-bids/own', filter).then(itemId => {
                        cy.openElement(itemId, 0)
                    })
                })
                cy.get("[data-test='confirm_dialog_proceed_btn']").click()
                cy.wait("@deleteBid").then(({ request, response }) => {
                    expect(response.statusCode).to.eq(200)
                })
            })
        })
    })

    it("Bids validation", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getMarketPlaceFilteredDatagridBody(token, warehouseFilter).then(marketPlaceBody => {
                let suitableOffers = marketPlaceBody.filter(function (entry) {
                    return entry.minPkg == 1
                })

                marketPlaceId = suitableOffers[ 0 ].id
                cy.openElement(marketPlaceId, 3)
            })
        })
        cy.get('[data-test=inventory_quick_edit_pricing_popup_save_btn]').click({ force: true })

        cy.get(".error")
            .should("have.length", 2)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })
})