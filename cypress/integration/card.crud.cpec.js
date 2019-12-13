context("Shopping cart CRUD", () => {

    let marketPlaceId = null
    let marketPlaceId2 = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("POST", '/prodex/api/product-offers/broadcasted/datagrid/').as('marketplaceLoading')

        cy.FElogin("mackenzie@echoexchange.net", "echopass123")

        cy.waitForUI()
        cy.url().should("include", "inventory")

        cy.wait('@inventoryLoading')
        cy.contains("Marketplace").click()
        cy.get("[data-test=navigation_menu_marketplace_drpdn]").within(() => {
            cy.contains("Marketplace").click()
        })

        cy.wait("@marketplaceLoading", {timeout: 30000})
    })

    it("Adds item to shopping card", () => {
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getMarketPlaceDatagridBody(token).then(marketPlaceBody => {
                cy.deleteWholeCart(token)

                marketPlaceId = marketPlaceBody[0].id

                cy.openElement(marketPlaceId, 0)

                cy.get('[data-test="add_cart_quantity_inp"]').within(() => {
                    cy.get('input[type="number"]').type("2")
                })

                cy.contains("Continue").click()

                cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
                    //Check product name
                    cy.getItemBody(token, marketPlaceId).then(itemBody => {
                        cy.get(".item-cart-body-section-name").should('contain', itemBody.companyProduct.echoProduct.name)
                    })

                    //Check cart price
                    cy.getCartBody(token).then(priceBody => {
                        cy.get(".eEIHvq").within(() => {
                            cy.get(".column").eq(1).should(($label) => {
                                const actualPrice = $label.text()
                                expect(actualPrice.replace(/[^\d.]/g, '')).to.eq(addZeroes(priceBody.cfPriceSubtotal))
                            })
                        })
                    })
                })
            })
        })
    })

    it("Edit item in shopping card", () => {
        cy.contains("Marketplace").click()
        cy.contains("Shopping Cart").click()

        cy.get("[data-test='item_cart_edit_btn']").click()
        cy.get("input")
            .clear()
            .type("2")

        cy.get("[data-test='add_cart_edit_order_btn']").click()
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getCartBody(token).then(priceBody => {
                //Expect there are 2 items
                expect(priceBody.cartItems[0].pkgAmount).to.eq(2)

                //Expect right price displayed
                cy.get(".eEIHvq").within(() => {
                    cy.get(".column").eq(1).should(($label) => {
                        const actualPrice = $label.text()
                        expect(actualPrice.replace(/[^\d.]/g, '')).to.eq(addZeroes(priceBody.cfPriceSubtotal))
                    })
                })
            })
        })
    })

    it("Add second item in shopping card", () => {
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getMarketPlaceDatagridBody(token).then(marketPlaceBody => {
                cy.deleteWholeCart(token)

                marketPlaceId = marketPlaceBody[0].id

                cy.openElement(marketPlaceId, 0)
            })

            cy.get('[data-test="add_cart_quantity_inp"]').within(() => {
                cy.get('input[type="number"]').type("2")
            })

            cy.contains("Continue").click()

            cy.getItemBody(token, marketPlaceId).then(itemBody => {
                cy.get(".item-cart-body-section-name").should('contain', itemBody.companyProduct.echoProduct.name)
            })

            cy.contains("Marketplace").click()
            cy.get("[data-test=navigation_menu_marketplace_drpdn]").within(() => {
                cy.contains("Marketplace").click()
            })

            cy.waitForUI()
            cy.getMarketPlaceDatagridBody(token).then(marketPlaceBody => {
                marketPlaceId2 = marketPlaceBody[2].id

                cy.openElement(marketPlaceId2, 0)
            })

            cy.get('[data-test="add_cart_quantity_inp"]').within(() => {
                cy.get('input[type="number"]').type("2")
            })

            cy.contains("Continue").click()

            cy.getItemBody(token, marketPlaceId).then(itemBody => {
                cy.get(".item-cart-body-section-name").eq(0).should('contain', itemBody.companyProduct.echoProduct.name)
            })

            cy.getMarketPlaceDatagridBody(token).then(marketPlaceBody => {
                marketPlaceId2 = marketPlaceBody[2].id

                cy.getItemBody(token, marketPlaceId2).then(itemBody => {
                    cy.get(".item-cart-body-section-name").eq(2).should('contain', itemBody.companyProduct.echoProduct.name)
                })
            })
        })
    })

    it("Delete item in shopping card", () => {
        cy.contains("Marketplace").click()
        cy.contains("Shopping Cart").click()

        cy.get("[data-test=item_cart_remove_btn]").eq(1).click()
        cy.contains("Yes").click()

        cy.get(".item-cart-body-section-name").should("have.length", "2")
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getItemBody(token, marketPlaceId).then(itemBody => {
                cy.get(".item-cart-body-section-name").should('contain', itemBody.companyProduct.echoProduct.name)
            })
        })

        cy.reload()

        cy.get(".item-cart-body-section-name").should("have.length", "2")
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getItemBody(token, marketPlaceId).then(itemBody => {
                cy.get(".item-cart-body-section-name").should('contain', itemBody.companyProduct.echoProduct.name)
            })
        })
    })

    it("Place an order", () => {
        cy.contains("Marketplace").click()
        cy.contains("Shopping Cart").click()

        cy.get("[data-test=shopping_cart_continue]").click()

        cy.url().should("include", "purchase-order")
        cy.contains("Place Order").should('not.be.enabled')
        cy.get("#field_dropdown_address").click()
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getDeliveryAddresses(token).then(addresses => {
                cy.contains(addresses[1].addressName).click()
            })
        })

        cy.get("[data-test='purchase_order_shipping_quote_0_rad']", {timeout: 60000}).click()

        cy.contains("Place Order").should('be.enabled')
    })

})

function addZeroes(num) {
    return num.toLocaleString("en", {useGrouping: false, minimumFractionDigits: 3})
}