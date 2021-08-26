describe('Onboarding', () => {
    const adminJSON = require('../../fixtures/admin.json')
    const serverId = '3drjjanh'
    const testEmail = `password@${serverId}.mailosaur.net`
    const filter = [{ "operator": "EQUALS", "path": "User.email", "values": [testEmail] }]
    const resetPassword = "Echopass123"
    let sendingTime = null

    before( () => {
        cy.getUserToken(adminJSON.email, adminJSON.password).then(token => {
            cy.getFirstAdminUsersWithFilter(token, filter).then(itemId => {
                if (itemId == null)
                    cy.createUser(token, "Forgot password", testEmail)
            })
        })
    })

    it('Makes a Password Reset request', () => {
        cy.intercept("POST", "/prodex/api/users/reset-password-request**").as("resetRequest")

        cy.visit("")
        cy.get("[data-test='login_reset_toggle_btn']").click()
        cy.get("#field_input_username").type(testEmail)
        cy.get("[data-test='login_submit_btn']").click()
        cy.wait("@resetRequest").then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })

        sendingTime =  new Date()
        cy.log(sendingTime)
    })

    it('Create new password', function () {
        cy.intercept("PATCH", '/prodex/api/users/reset-password').as('request')

        cy.mailosaurGetMessage(serverId, {
            sentTo: testEmail,
            options: {
                timeout: 60,
                receivedAfter: sendingTime
            }
        }).as("email")

        cy.then(() => {
            expect(this.email.subject).to.equal('Password Reset Request')
        })

        cy.then(() => {
            let codes = this.email.html.body.match(/\w{10}/g)
            let passwordCode = codes[ 16 ]

            cy.visit(this.email.html.links[ 0 ].href)
            cy.contains("Please provide the Security Code sent to your email").should("be.visible")
            cy.get('#field_input_securityCode').type(passwordCode)
            cy.get('#field_input_email').type(testEmail)
            cy.get('#field_input_password').type(resetPassword)
            cy.get('#field_input_passwordConfirm').type(resetPassword)
            cy.get('button[type="submit"]').click()

            cy.wait("@request").then(({ request, response }) => {
                expect(response.statusCode).to.eq(200)
            })
        })
    })

    it('Can login in', () => {
        cy.FElogin(testEmail, resetPassword)

        cy.get("[data-test=navigation_menu_alerts_drpdn]", { timeout: 10000 }).should("be.visible")
    })
})