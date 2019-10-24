context("Shopping cart CRUD", () => {

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("POST", '/prodex/api/product-offers/broadcasted/datagrid/').as('marketplaceLoading')

        cy.FElogin("user1@example.com", "echopass123")

        cy.url().should("include", "inventory")

        cy.wait('@inventoryLoading')
        cy.contains("Marketplace").click()
        cy.get("[data-test=navigation_menu_marketplace_drpdn]").within(() => {
            cy.contains("Marketplace").click()
        })

        cy.wait("@marketplaceLoading")
    })

    it("Adds item to shopping card", () => {
        cy.getToken().then(token => {
            cy.getFirstMarketId(token).then(itemId => {
                cy.deleteWholeCart(token)

                cy.get('[data-test=action_' + itemId + ']').click({force: true})
                cy.get('[data-test=action_' + itemId + '_0]').click()

                cy.get('[data-test="add_cart_quantity_inp"]').within(() => {
                   cy.get('input[type="number"]').type("2")
                })

                cy.contains("Continue").click()

                cy.getToken().then(token => {
                    cy.getFirstMarketName(token).then(itemName => {
                        cy.get(".item-cart-body-section-name").should('contain', itemName)
                    })
                })
            })
        })
    })

    it("Edit item in shopping card", () => {
        cy.contains("Marketplace").click()
        cy.contains("Shopping Cart").click()

        cy.get("[data-test='item_cart_edit_btn']").click()
        cy.get("input").clear()
        cy.get("input").type("2")

        cy.contains("Save").click()
        cy.contains("$4,261,400.000")
    })

    it("Cannot exceed max limit", () => {
        cy.contains("Marketplace").click()
        cy.contains("Shopping Cart").click()

        cy.get("[data-test='item_cart_edit_btn']").click()
        cy.get("input").clear()
        cy.get("input").type("200")

        cy.contains("Save").click()
        cy.contains("Otherwise, please press cancel and adjust the quantity to meet the maximum requirement (12,000lbs).")
    })

    it("Add second item in shopping card", () => {
        cy.getToken().then(token => {
            cy.getFirstMarketId(token).then(itemId => {
                cy.deleteWholeCart(token)

                cy.get('[data-test=action_' + itemId + ']').click({force: true})
                cy.get('[data-test=action_' + itemId + '_0]').click()

                cy.contains("Continue").click()

                cy.get(".item-cart-body-section-name").should('contain', 'Dibromobenzoic')

                cy.contains("Marketplace").click()
                cy.get("[data-test=navigation_menu_marketplace_drpdn]").within(() => {
                    cy.contains("Marketplace").click()
                })

                cy.waitForUI()
                cy.get('[data-test=action_' + (parseInt(itemId, 10) + 1) + ']').click({force: true})
                cy.get('[data-test=action_' + (parseInt(itemId, 10) + 1) + '_0]').click()

                cy.contains("Continue").click()

                cy.get(".item-cart-body-section-name").eq(0).should('contain', 'Dibromobenzoic')
                cy.get(".item-cart-body-section-name").eq(2).should('contain', 'Matrine')
            })
        })
    })

    it("Delete item in shopping card", () => {
        cy.contains("Marketplace").click()
        cy.contains("Shopping Cart").click()

        cy.get("[data-test=item_cart_remove_btn]").eq(1).click()
        cy.contains("Yes").click()

        cy.get(".item-cart-body-section-name").should("have.length", "2")
        cy.get(".item-cart-body-section-name").should('contain', 'Dibromobenzoic')

        cy.reload()

        cy.get(".item-cart-body-section-name").should("have.length", "2")
        cy.get(".item-cart-body-section-name").should('contain', 'Dibromobenzoic')
    })

    it("Place an order", () => {
        cy.contains("Marketplace").click()
        cy.contains("Shopping Cart").click()

        cy.get("[data-test=shopping_cart_continue]").click()

        cy.get(".purchase-order").within(() => {
            cy.get("div[role='listbox']").eq(0).click()
            cy.contains("8601 95th Street, Pleasant Prairie").click()
        })

        cy.contains("Place Order").should('not.be.enabled')

        cy.get(".purchase-order").within(() => {
            cy.get("#field_dropdown_payment").click()
            cy.contains("Cool bank account").click()

            cy.get('[data-test=purchase_order_shipping_quote_1_rad]').click()
        })

        cy.contains("Place Order").should('be.enabled')
    })

})