context("Shopping cart CRUD", () => {

    let marketPlaceId = null
    let marketPlaceName = null
    const userJSON = require('../fixtures/user.json')

    beforeEach(function () {
        cy.viewport(2500, 3500)
        cy.intercept("GET", '/prodex/api/product-groups/search**').as('groupsLoading')
        cy.intercept("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.intercept("POST", '/prodex/api/product-offers/broadcasted/datagrid').as('marketplaceLoading')

        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()

        cy.wait('@inventoryLoading', { timeout: 30000 })
        cy.url().should("include", "inventory")
        cy.contains("Marketplace").click()

        cy.wait("@marketplaceLoading", { timeout: 30000 })
    })

    after(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.deleteWholeCart(token)
        })
    })

    it("Adds item to shopping card", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getMarketPlaceDatagridBody(token).then(marketPlaceBody => {
                cy.deleteWholeCart(token)

                let suitableOffers = marketPlaceBody.filter(function (entry) {
                    return entry.minPkg == 1
                })

                marketPlaceId = suitableOffers[ 0 ].id

                marketPlaceName = suitableOffers[ 0 ].companyProduct.companyGenericProduct.productGroup.name
                cy.openOffer(marketPlaceId, 1)

                cy.get('[data-test="add_cart_quantity_inp"]').within(() => {
                    cy.get('input[type="number"]').type("1")
                })

                cy.contains("Continue").click()

                cy.getUserToken(userJSON.email, userJSON.password).then(token => {
                    //Check product name
                    cy.getItemBody(token, marketPlaceId).then(itemBody => {
                        cy.get('div[class*="CustomHeader"]').should('contain', itemBody.companyProduct.companyGenericProduct.name)
                    })

                    //Check cart price
                    cy.getCartBody(token).then(priceBody => {
                        cy.get('div[class*="TotalRow"]').find('div[class*=DivHeader]').should(($label) => {
                            const actualPrice = $label.text()
                            expect(actualPrice.replace(/[^\d.]/g, '')).to.eq(addZeroes(priceBody.cfPriceSubtotal))
                        })
                    })
                })
            })
        })
    })

    it("Edit item in shopping card", () => {
        cy.get("[data-test='navigation_menu_cart']").click()

        cy.get('svg[class*="IconEdit"]').click()
        cy.get("input")
            .clear()
            .type("2")

        cy.get("[data-test='add_cart_edit_order_btn']").click()
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getCartBody(token).then(priceBody => {
                //Expect there are 2 items
                expect(priceBody.cartItems[ 0 ].pkgAmount).to.eq(2)

                //Expect right price displayed
                cy.get('div[class*="TotalRow"]').find('div[class*=DivHeader]').should(($label) => {
                    const actualPrice = $label.text()
                    expect(actualPrice.replace(/[^\d.]/g, '')).to.eq(addZeroes(priceBody.cfPriceSubtotal))
                })

            })
        })
    })

    it("Add second item in shopping card", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.deleteWholeCart(token)
            //TODO Automatic searching inside marketplace body
            let warehouseFilter = [{
                "operator": "LIKE",
                "path": "ProductOffer.companyProduct.companyGenericProduct.company.name",
                "values": ["%Automation%"]
            }]

            cy.getMarketPlaceFilteredDatagridBody(token, warehouseFilter).then(sameWarehouseOffer => {
                let marketPlaceIdNum1 = sameWarehouseOffer[ 0 ].id
                let marketPlaceIdNum2 = sameWarehouseOffer[ 2 ].id
                marketPlaceId = marketPlaceIdNum1
                marketPlaceName = sameWarehouseOffer[ 0 ].companyProduct.companyGenericProduct.productGroup.name

                cy.get("[data-test='my_inventory_advanced_filters_btn']").click()
                cy.get("[class*='StyledModalContent']").within(() => {
                    cy.get("[name='searchProductGroup']").type(marketPlaceName)
                    cy.wait("@groupsLoading", { timeout: 30000 })
                    cy.contains("div", marketPlaceName).click()

                })
                cy.get("[data-test='filter_apply']").click()
                cy.wait("@marketplaceLoading", { timeout: 30000 })

                cy.openOffer(sameWarehouseOffer[ 0 ].id, 1)
                cy.contains("button", "I agree").click()

                cy.get('[data-test="add_cart_quantity_inp"]').within(() => {
                    cy.get('input[type="number"]').type("5")
                })

                cy.contains("Continue").click()

                cy.getItemBody(token, marketPlaceIdNum1).then(itemBody => {
                    cy.get('div[class*="CustomHeader"]').should('contain', itemBody.companyProduct.companyGenericProduct.name)
                })

                cy.contains("Marketplace").click()
                cy.wait("@marketplaceLoading", { timeout: 30000 })

                cy.waitForUI()

                cy.openOffer(marketPlaceIdNum2, 1)
                cy.contains("button", "I agree").click()

                cy.get('[data-test="add_cart_quantity_inp"]').within(() => {
                    cy.get('input[type="number"]').type("5")
                })

                cy.contains("Continue").click()

                cy.getItemBody(token, marketPlaceIdNum1).then(itemBody => {
                    cy.get('div[class*="CustomHeader"]').eq(0).should('contain', itemBody.companyProduct.companyGenericProduct.name)
                })
                cy.getItemBody(token, marketPlaceIdNum2).then(itemBody => {
                    cy.get('div[class*="CustomHeader"]').eq(1).should('contain', itemBody.companyProduct.companyGenericProduct.name)
                })
            })
        })
    })

    it("Delete item in shopping card", () => {
        cy.get("[data-test='navigation_menu_cart']").click()

        cy.get('div[class*="CustomHeader"]').should("have.length", "2")

        cy.get('svg[class*="IconTrash"]').eq(1).click()
        cy.contains("Yes").click()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getItemBody(token, marketPlaceId).then(itemBody => {
                cy.get('div[class*="CustomHeader"]').should('contain', itemBody.companyProduct.companyGenericProduct.name)
            })
        })

        cy.reload()

        cy.get('div[class*="CustomHeader"]').should("have.length", "1")
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getItemBody(token, marketPlaceId).then(itemBody => {
                cy.get('div[class*="CustomHeader"]').should('contain', itemBody.companyProduct.companyGenericProduct.name)
            })
        })
    })

    it("Place an order", () => {
        cy.get("[data-test='navigation_menu_cart']").click()

        cy.contains("button", "Proceed to Checkout").click()
        cy.url().should("include", "purchase-order")

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            //Check cart price
            cy.getCartBody(token).then(priceBody => {
                cy.contains('Sub Total').next().should(($label) => {
                    const actualPrice = $label.text()
                    expect(actualPrice.replace(/[^\d.]/g, '')).to.eq(addZeroes(priceBody.cfPriceSubtotal))
                })
            })
        })

        cy.contains("button", "Confirm Items").click()
        cy.contains("div", "Delivery Addresses").click()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getDeliveryAddresses(token).then(addresses => {
                cy.contains(addresses[ 0 ].addressName).click()
            })
        })

        cy.contains("button", "Use this Address").click()

        cy.get("div.radio:visible").first().click()
        cy.contains("button", "Use this Payment Method").click()

        cy.contains("Own Freight").click({ timeout: 60000 })
        cy.contains("button", "Use this Freight", { timeout: 60000 }).click()

        cy.contains("Place Order").should('be.visible')
    })

})

function addZeroes(num) {
    return num.toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 })
}