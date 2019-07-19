context("Inventory Broadcasting", () => {

    beforeEach(function () {
        cy.login("user1@example.com", "echopass123")

        cy.wait(2000)
    })

    xit('Start item broadcasting', () => {
        cy.get(".table-responsive").scrollTo("right")
        cy.wait(1000)

        cy.get("[data-test=my_inventory_broadcast]").eq(0).should("not.have.class", "checked")
        cy.get("[data-test=my_inventory_broadcast]").eq(0).click()
        cy.wait(1000)
        cy.get("[data-test=my_inventory_broadcast]").eq(0).should("have.class", "checked")
    })

    xit('Stop item broadcasting', () => {
        cy.get(".table-responsive").scrollTo("right")
        cy.wait(1000)

        cy.get("[data-test=my_inventory_broadcast]").eq(0).should("have.class", "checked")
        cy.get("[data-test=my_inventory_broadcast]").eq(0).click()
        cy.wait(1000)
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

                cy.contains("Save").click()

                cy.contains("Saved successfully!")

                cy.get('[data-test=action_' + itemId + ']').click()
                cy.get('[data-test=action_' + itemId + '_1]').click()

                cy.get('div[type=region]').eq(0).within(($region) => {
                    cy.get("input[type=checkbox]").should("have.class", "checked")
                    cy.get("input[type=number]").should("have.value", "5")
                })
            })

        })
    })
})