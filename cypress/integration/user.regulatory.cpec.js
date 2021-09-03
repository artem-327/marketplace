context("User Regulatory Warning tests", () => {
    const unverifiedUserJSON = require('../fixtures/user.json')
    const verifiedUserJSON = require('../fixtures/user2.json')

    const specification = [
        [unverifiedUserJSON, 'DEA-One', false],
        [unverifiedUserJSON, 'DEA-Two', false],
        [unverifiedUserJSON, 'DHS-Prod', false],
        [verifiedUserJSON, `DEA-One`, true],
        [verifiedUserJSON, 'DEA-Two', true],
        [verifiedUserJSON, 'DHS-Prod', true]
    ]

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard*").as("dashboardLoading")
        cy.intercept("POST", "/prodex/api/product-offers/broadcasted/datagrid*").as("marketplaceLoading")
    })

    specification.forEach(($type) => {
        const [user, companyGenericProduct, expectedButtonState] = $type

        let filter = [{
            "operator": "LIKE",
            "path": "ProductOffer.companyProduct.intProductCode",
            "values": ["%" + companyGenericProduct + "%"]
        }]

        specify(`User ${user.email} buying ${companyGenericProduct} should ${(expectedButtonState)?'':'not'} be possible` , () => {
            cy.viewport(2500, 3500)
            cy.intercept("GET", '/prodex/api/product-groups/search**').as('groupsLoading')
            cy.intercept("GET", '/prodex/api/dashboard*').as('inventoryLoading')
            cy.intercept("POST", '/prodex/api/product-offers/broadcasted/datagrid*').as('marketplaceLoading')

            cy.FElogin(user.email, user.password)

            cy.waitForUI()

            cy.wait('@inventoryLoading', { timeout: 30000 })
            cy.url().should("include", "dashboard")
            cy.contains("Marketplace").click()

            cy.wait("@marketplaceLoading", { timeout: 30000 })

            cy.getUserToken(user.email, user.password).then(token => {
                cy.getMarketPlaceFilteredDatagridBody(token, filter).then(sameWarehouseOffer => {
                    let marketPlaceName = sameWarehouseOffer[ 0 ].companyProduct.companyGenericProduct.productGroup.name

                    cy.get("[data-test='my_inventory_advanced_filters_btn']").click()
                    cy.get("[class*='StyledModalContent']").within(() => {
                        cy.get("[name='searchProductGroup']").type(marketPlaceName)
                        cy.wait("@groupsLoading", { timeout: 30000 })
                        cy.contains("div", marketPlaceName).click()

                    })
                    cy.get("[data-test='filter_apply']").click()
                    cy.wait("@marketplaceLoading", { timeout: 30000 })

                    cy.openOffer(sameWarehouseOffer[ 0 ].id, 1)

                    cy.get('body').then(($body) => {
                        if ($body.text().includes('I agree')) {
                            if (expectedButtonState) {
                                cy.contains('button', 'I agree').should('be.enabled')
                            } else {
                                cy.contains('button', 'I agree').should('be.disabled')
                            }
                        }
                    })
                    cy.waitForUI()
                    cy.get('body').then(($body) => {
                        if ($body.text().includes('I understand')) {
                            if (expectedButtonState) {
                                cy.contains('button', "I understand").should('be.enabled')
                            } else {
                                cy.contains('button', "I understand").should('be.disabled')
                            }
                        }
                    })

                })
            })
        })
    })
})