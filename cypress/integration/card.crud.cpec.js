context("Shopping cart CRUD",() => {

    beforeEach(function () {
        cy.server()
        cy.route("POST",'/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("POST", '/prodex/api/product-offers/broadcasted/datagrid/').as('marketplaceLoading')

        cy.login("user1@example.com", "echopass123")

        cy.url().should("include","inventory")

        cy.wait('@inventoryLoading')
        cy.contains("Marketplace").click()
        cy.get("[data-test=navigation_menu_marketplace]").click()

        cy.wait("@marketplaceLoading")
    })

    it("Adds item to shopping card", () => {
        cy.getToken().then(token => {
            cy.getFirstMarketId(token).then(itemId => {
                cy.deleteWholeCart(token)

                cy.get('[data-test=action_' + itemId + ']').click({force: true})
                cy.get('[data-test=action_' + itemId + '_0]').click()

                cy.contains("Continue").click()

                cy.get(".item-cart-body-section-name").should('have.text', '610-71-9 & 89-99-6 Dibromobenzoic')
            })
        })
    })

    it("Edit item in shopping card", () => {
        cy.contains("Marketplace").click()
        cy.contains("Shopping Cart").click()

        cy.get("[data-test='shopping_cart_edit']").click()
        cy.get("input").clear()
        cy.get("input").type("2")

        cy.contains("Save").click()
        cy.contains("$4,261,400.000")
    })

    it("Add second item in shopping card", () => {
        cy.getToken().then(token => {
            cy.getFirstMarketId(token).then(itemId => {
                cy.deleteWholeCart(token)

                cy.get('[data-test=action_' + itemId + ']').click({force: true})
                cy.get('[data-test=action_' + itemId + '_0]').click()

                cy.contains("Continue").click()

                cy.get(".item-cart-body-section-name").should('have.text', '610-71-9 & 89-99-6 Dibromobenzoic')

                cy.get("[data-test=shopping_cart_back]").click()

                cy.waitForUI()
                cy.get('[data-test=action_' + (parseInt(itemId,10)+1) + ']').click({force: true})
                cy.get('[data-test=action_' +  (parseInt(itemId,10)+1) + '_0]').click()

                cy.contains("Continue").click()

                cy.get(".item-cart-body-section-name").eq(0).should('have.text', '610-71-9 & 89-99-6 Dibromobenzoic')
                cy.get(".item-cart-body-section-name").eq(1).should('have.text', '519-02-8 Matrine')
            })
        })
    })

    it("Delete item in shopping card", () => {
        cy.contains("Marketplace").click()
        cy.contains("Shopping Cart").click()

        cy.get("[data-test=shopping_cart_remove]").eq(1).click()
        cy.contains("Yes").click()

        cy.get(".item-cart-body-section-name").should("have.length","1")
        cy.get(".item-cart-body-section-name").should('have.text', '610-71-9 & 89-99-6 Dibromobenzoic')

        cy.reload()

        cy.get(".item-cart-body-section-name").should("have.length","1")
        cy.get(".item-cart-body-section-name").should('have.text', '610-71-9 & 89-99-6 Dibromobenzoic')
    })

    it("Place an order", () => {
        cy.contains("Marketplace").click()
        cy.contains("Shopping Cart").click()

        cy.get("[data-test=shopping_cart_continue]").click()

        cy.get(".purchase-order").within(() => {
            cy.get("div[role='listbox']").eq(0).click()
            cy.contains("8601 95th Street, Pleasant Prairie").click()

            cy.get("#field_dropdown_payment").click()
            cy.contains("Cool bank account").click()

            cy.contains("Place Order").click()
        })
    })

})