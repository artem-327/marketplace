context("2FA Workflow", () => {
    const serverId = 'whwenjcq'
    const testEmail = `password@${serverId}.mailosaur.net`

    beforeEach(function () {
        cy.intercept('POST', '/prodex/oauth/token').as('login')

        cy.visit("")
        cy.url().should("include", "login")
    })

    it('User with bad code cannot login', function () {
        //This is the post call we are interested in capturing
        cy.get("input[name=username]")
            .type("automation2fa@whwenjcq.mailosaur.net")
            .should("have.value", "automation2fa@whwenjcq.mailosaur.net")
        cy.get("input[name=password]")
            .type("echopass123")
            .should("have.value", "echopass123")
        cy.get("button[type=submit]").click({ force: true })
        //Assert on XHR
        cy.wait('@login').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })

        cy.waitForUI()
        cy.contains("Two-Factor Authentication",  { timeout: 30000 }).should("be.visible")
        cy.contains("label", "Email - ").click()
        cy.get("[data-test=two_factor_auth_send_btn]").click()
        cy.wait('@login').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })

        cy.get("[name='input2FACode0']").type('123456')
        cy.get("[data-test='two_factor_auth_verify_btn']").click()
        cy.wait('@login').then(({ request, response }) => {
            expect(response.statusCode).to.eq(400)
        })
        cy.contains("Invalid mfa_code parameter.")
    })

    it('2FA good code login', function () {
        cy.get("input[name=username]")
            .type("automation2fa@whwenjcq.mailosaur.net")
            .should("have.value", "automation2fa@whwenjcq.mailosaur.net")
        cy.get("input[name=password]")
            .type("echopass123")
            .should("have.value", "echopass123")
        cy.get("button[type=submit]").click({ force: true })
        //Assert on XHR
        cy.wait('@login').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })

        cy.waitForUI()
        cy.contains("Two-Factor Authentication",  { timeout: 30000 }).should("be.visible")
        cy.contains("label", "Email - ").click()
        cy.get("[data-test=two_factor_auth_send_btn]").click()
        let sendingTime = new Date()
        cy.wait(5000)

        cy.mailosaurGetMessage(serverId, {
            sentTo: "automation2fa@whwenjcq.mailosaur.net",
            options: {
                timeout: 120,
                receivedAfter: sendingTime
            }
        }).as("email")

        cy.then(() => {
            expect(this.email.subject).to.equal('2FA code')
        })

        cy.then(() => {
            let codes = this.email.html.body.match(/\w{6}</g)
            let passwordCode = codes[ 1 ].substring(0, 6)

            cy.get("[name='input2FACode0']").type(passwordCode)
            cy.get("[data-test='two_factor_auth_verify_btn']").click()
            cy.get(".user-menu-wrapper").should("be.visible")
        })
    })


    xit('User with bad code cannot purchase', () => {
        cy.intercept("GET", "/prodex/api/dashboard*").as("inventoryLoading")
        cy.intercept("POST", "/prodex/api/product-offers/broadcasted/datagrid*").as("marketplaceLoading")

        cy.FElogin("automation2fa2@whwenjcq.mailosaur.net", "echopass123")

        cy.waitForUI()
        cy.wait('@inventoryLoading', { timeout: 30000 })
        cy.contains("Marketplace").click()

        cy.wait("@marketplaceLoading", { timeout: 30000 })

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
            })
        })

        cy.get("[data-test='navigation_menu_cart']").click()

        cy.contains("button", "Proceed to Checkout").click()

        cy.contains("button", "Confirm Items").click()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getDeliveryWarehouses(token).then(addresses => {
                cy.contains(addresses[ 0 ].deliveryAddress.addressName).click()
            })
        })

        cy.contains("button", "Use this Address").click()

        cy.get("div.radio:visible").first().click()
        cy.contains("button", "Use this Payment Method").click()

        cy.contains("Own Freight").click({ timeout: 60000 })
        cy.contains("button", "Use this Freight", { timeout: 60000 }).click()

        cy.contains("Place Order").click()

        cy.waitForUI()
        cy.contains("Two-Factor Authentication").should("be.visible")
        cy.contains("label", "Email - ").click()
        cy.get("[data-test=two_factor_auth_send_btn]").click()
        cy.wait('@login').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })

        cy.get("[name='input2FACode0']").type('123456')
        cy.get("[data-test='two_factor_auth_verify_btn']").click()
        cy.wait('@login').then(({ request, response }) => {
            expect(response.statusCode).to.eq(400)
        })
        cy.contains("Invalid mfa_code parameter.")
    })
})