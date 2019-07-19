context("Inventory Broadcasting", () => {

    beforeEach(function () {
        cy.server()
        cy.route("POST",'/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("PATCH",'/prodex/api/product-offers/*/broadcast?broadcasted=***').as('broadcast')

        cy.login("user1@example.com", "echopass123")

        cy.wait('@inventoryLoading')
    })

    it('Start item broadcasting', () => {
        cy.get(".table-responsive").scrollTo("right")
        cy.waitForUI()

        cy.get("[data-test=my_inventory_broadcast]").eq(0).should("not.have.class", "checked")
        cy.get("[data-test=my_inventory_broadcast]").eq(0).click()
        cy.wait("@broadcast")
        cy.get("[data-test=my_inventory_broadcast]").eq(0).should("have.class", "checked")
        cy.waitForUI()
    })

    it('Stop item broadcasting', () => {
        cy.get(".table-responsive").scrollTo("right")
        cy.waitForUI()

        cy.get("[data-test=my_inventory_broadcast]").eq(0).should("have.class", "checked")
        cy.get("[data-test=my_inventory_broadcast]").eq(0).click()
        cy.wait("@broadcast")
        cy.get("[data-test=my_inventory_broadcast]").eq(0).should("not.have.class", "checked")
    })

    it('Set custom broadcasting', () => {
       cy.getToken().then(token => {
            cy.getFirstItemId(token).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()
                cy.get('[data-test=action_' + itemId + '_1]').click()

                cy.get('div[type=region]').eq(0).within(() => {
                    cy.get("input[type=checkbox]").click({force: true})
                    cy.get("input[type=number]").type("5")
                })

                cy.get("div[class=actions]").within(($region) => {
                    cy.contains("Save").click()
                })

                cy.contains("Saved successfully!")

                cy.get('[data-test=action_' + itemId + ']').click()
                cy.get('[data-test=action_' + itemId + '_1]').click()

                cy.waitForUI()

                cy.get('div[type=region]').eq(0).within(($region) => {
                    cy.get(".ui.fitted.toggle.checkbox").should("have.class", "checked")
                    cy.get("input[type=number]").should("have.value", "5")
                })

                //TODO Move cleanup

                cy.get('div[type=region]').eq(0).within(() => {
                    cy.get("input[type=number]").clear()
                    cy.get("input[type=checkbox]").click({force: true})
                })

                cy.get("div[class=actions]").within(($region) => {
                    cy.contains("Save").click()
                })
            })

        })
    })
})