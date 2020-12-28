context("Shopping cart Client CRUD", () => {

    let marketPlaceId = null
    let marketPlaceName = null
    const userJSON = require('../../fixtures/userClient.json')

    beforeEach(function () {
        cy.viewport(2500, 3500)
        cy.intercept("POST", '/prodex/api/product-offers/broadcasted/datagrid/').as('marketplaceLoading')

        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()
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

    it("Place an order", () => {
        cy.get("[data-test='navigation_menu_cart']").click()

        cy.get('.seven > .ui').click()

        cy.url().should("include", "purchase-order")
        cy.contains("Place Order").should('not.be.enabled')
        cy.get("#field_dropdown_address").click()
        cy.get('.selected').click()

        cy.contains("Own Freight", { timeout: 60000 }).click()

        cy.get("#field_dropdown_payment").click()
        cy.get("#field_dropdown_payment").find("[role=option]").eq(0).click()

        cy.contains("Place Order").should('be.enabled')
    })

})

function addZeroes(num) {
    return num.toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 })
}