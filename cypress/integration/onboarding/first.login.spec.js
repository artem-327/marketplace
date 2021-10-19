describe('Onboarding', function () {
    const adminJSON = require('../../fixtures/admin.json')
    const serverId = 'whwenjcq'
    const testEmail = `onboarding@${serverId}.mailosaur.net`
    const filter = [{ "operator": "EQUALS", "path": "Company.name", "values": ["FE Onboarding"] }]
    const sendingTime = new Date()
    const validPassword = 'echopass123'

    it('Gets a Invitation email', function () {
        cy.intercept("PATCH", '/prodex/api/users/reset-password').as('request')

        cy.getUserToken(adminJSON.email, adminJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'companies', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'companies/id', itemId)
            })
            cy.createCompany(token, "FE Onboarding", testEmail)
        })

        cy.mailosaurGetMessage(serverId, {
            sentTo: testEmail,
            options: {
                timeout: 60,
                receivedAfter: sendingTime
            }
        }).as("email")

        cy.then(() => {
            expect(this.email.subject).to.equal('Welcome to BluePallet')
        })

        cy.then(() => {
            let codes = this.email.html.body.match(/\w{10}/g)
            let passwordCode = codes[ 17 ]

            cy.visit(this.email.html.links[ 0 ].href)
            cy.contains("We're almost done creating your account").should("be.visible")
            cy.get('#field_input_securityCode').type(passwordCode)
            cy.get('#field_input_email').type(testEmail)
            cy.get('#field_input_password').type(validPassword)
            cy.get('#field_input_passwordConfirm').type(validPassword)
            cy.get('button[type="submit"]').click()

            cy.wait("@request").then(({ request, response }) => {
                expect(response.statusCode).to.eq(200)
            })
        })
    })

    it('Can login in', function () {
        cy.FElogin(testEmail, validPassword)

        cy.get("[data-test='navigation_menu_admin_dashboard']", { timeout: 10000 }).should("be.visible")
    })
})