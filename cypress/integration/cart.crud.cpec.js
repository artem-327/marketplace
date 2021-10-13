context("Shopping cart CRUD", () => {

    let marketPlaceId = null
    let marketPlaceName = null
    const userJSON = require('../fixtures/user.json')

    beforeEach(function () {
        cy.viewport(2750, 1500)
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("POST", '/prodex/api/product-offers/broadcasted/datagrid/').as('marketplaceLoading')

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

                //Open tab inside marketplace. Checking if undefined
                if(suitableOffers[ 0 ].companyProduct.companyGenericProduct.productGroup == undefined){
                    cy.contains("Unmapped").click()
                }else{
                    marketPlaceName = suitableOffers[ 0 ].companyProduct.companyGenericProduct.productGroup.name

                    cy.contains(marketPlaceName).click()
                }

                cy.openElement(marketPlaceId, 1)

                cy.get('[data-test="add_cart_quantity_inp"]').within(() => {
                    cy.get('input[type="number"]').type("1")
                })

                cy.contains("Continue").click()

                cy.getUserToken(userJSON.email, userJSON.password).then(token => {
                    //Check product name
                    cy.getItemBody(token, marketPlaceId).then(itemBody => {
                        cy.get('.StyledComponents__CustomHeader-sc-17etn3b-5').should('contain', itemBody.companyProduct.companyGenericProduct.name)
                    })

                    //Check cart price
                    cy.getCartBody(token).then(priceBody => {
                        cy.get('.right > .StyledComponents__DescriptionValue-sc-17etn3b-15').should(($label) => {
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

        cy.get('.row > .right > :nth-child(2)').click()
        cy.get("input")
            .clear()
            .type("2")

        cy.get("[data-test='add_cart_edit_order_btn']").click()
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getCartBody(token).then(priceBody => {
                //Expect there are 2 items
                expect(priceBody.cartItems[ 0 ].pkgAmount).to.eq(2)

                //Expect right price displayed
                cy.get('.right > .StyledComponents__DescriptionValue-sc-17etn3b-15').should(($label) => {
                    const actualPrice = $label.text()
                    expect(actualPrice.replace(/[^\d.]/g, '')).to.eq(addZeroes(priceBody.cfPriceSubtotal))
                })

            })
        })
    })

    it("Add second item in shopping card", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getMarketPlaceDatagridBody(token).then(marketPlaceBody => {
                cy.deleteWholeCart(token)
                //TODO Automatic searching inside marketplace body
                let warehouseFilter = [{ "operator": "EQUALS", "path": "ProductOffer.warehouse.id", "values": [3] }]

                cy.getMarketPlaceFilteredDatagridBody(token, warehouseFilter).then(sameWarehouseOffer => {
                    let marketPlaceIdNum1 = sameWarehouseOffer[ 0 ].id
                    let marketPlaceIdNum2 = sameWarehouseOffer[ 1 ].id
                    let marketPlaceName1 = sameWarehouseOffer[ 0 ].companyProduct.companyGenericProduct.name
                    let marketPlaceName2 = sameWarehouseOffer[ 1 ].companyProduct.companyGenericProduct.name
                    marketPlaceId = marketPlaceIdNum1
                    //Open tab
                    if(sameWarehouseOffer[ 0 ].companyProduct.companyGenericProduct.productGroup == undefined){
                        cy.contains("Unmapped").click()
                    }else{
                        marketPlaceName = suitableOffers[ 0 ].companyProduct.companyGenericProduct.productGroup.name

                        cy.contains(marketPlaceName).click()
                    }
                    cy.openElement(sameWarehouseOffer[ 0 ].id, 1)

                    cy.get('[data-test="add_cart_quantity_inp"]').within(() => {
                        cy.get('input[type="number"]').type("2")
                    })

                    cy.contains("Continue").click()

                    cy.getItemBody(token, marketPlaceIdNum1).then(itemBody => {
                        cy.get('.StyledComponents__CustomHeader-sc-17etn3b-5').should('contain', itemBody.companyProduct.companyGenericProduct.name)
                    })

                    cy.contains("Marketplace").click()
                    cy.wait("@marketplaceLoading", { timeout: 30000 })

                    cy.waitForUI()
                    //Open desired tab
                    if(sameWarehouseOffer[ 1 ].companyProduct.companyGenericProduct.productGroup == undefined){
                        cy.contains("Unmapped").click()
                    }else{
                        marketPlaceName = suitableOffers[ 1 ].companyProduct.companyGenericProduct.productGroup.name

                        cy.contains(marketPlaceName).click()
                    }
                    cy.openElement(marketPlaceIdNum2, 1)

                    cy.get('[data-test="add_cart_quantity_inp"]').within(() => {
                        cy.get('input[type="number"]').type("2")
                    })

                    cy.contains("Continue").click()

                    cy.getItemBody(token, marketPlaceIdNum1).then(itemBody => {
                        cy.get('.StyledComponents__CustomHeader-sc-17etn3b-5').eq(0).should('contain', itemBody.companyProduct.companyGenericProduct.name)
                    })
                    cy.getItemBody(token, marketPlaceIdNum2).then(itemBody => {
                        cy.get('.StyledComponents__CustomHeader-sc-17etn3b-5').eq(1).should('contain', itemBody.companyProduct.companyGenericProduct.name)
                    })

                })

            })

        })
    })

    it("Delete item in shopping card", () => {
        cy.wait(10000)
        cy.get("[data-test='navigation_menu_cart']").click()

        cy.get('.StyledComponents__CustomHeader-sc-17etn3b-5').should("have.length", "2")

        cy.get('.negative').eq(1).click()
        cy.contains("Yes").click()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getItemBody(token, marketPlaceId).then(itemBody => {
                cy.get('.StyledComponents__CustomHeader-sc-17etn3b-5').should('contain', itemBody.companyProduct.companyGenericProduct.name)
            })
        })

        cy.reload()

        cy.get('.StyledComponents__CustomHeader-sc-17etn3b-5').should("have.length", "1")
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getItemBody(token, marketPlaceId).then(itemBody => {
                cy.get('.StyledComponents__CustomHeader-sc-17etn3b-5').should('contain', itemBody.companyProduct.companyGenericProduct.name)
            })
        })
    })

    it("Place an order", () => {
        cy.wait(10000)
        cy.get("[data-test='navigation_menu_cart']").click()

        cy.get('.seven > .ui').click()

        cy.url().should("include", "purchase-order")
        cy.contains("Place Order").should('not.be.enabled')
        cy.get("#field_dropdown_address").click()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getDeliveryAddresses(token).then(addresses => {
                cy.get("div[role=listbox]").within(() => {
                    cy.contains(addresses[ 0 ].addressName).click()
                })
            })
        })

        cy.contains("Own Freight", { timeout: 60000 }).click()

        cy.get("#field_dropdown_payment").click()
        cy.get("#field_dropdown_payment").within(($form) => {
            cy.get("[role=option]").eq(0).click()
        })

        cy.contains("Place Order").should('be.enabled')
    })

})

function addZeroes(num) {
    return num.toLocaleString("en", { useGrouping: false, minimumFractionDigits: 3 })
}