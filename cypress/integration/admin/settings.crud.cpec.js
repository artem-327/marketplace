context("Admin Settings RUD", () => {

    const adminJSON = require('../../fixtures/admin.json')

    before(function () {
        cy.getToken().then(token => {
            cy.finishTakeover(token)
        })
    })

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard*").as("loading")
        cy.intercept("GET", "/prodex/api/settings/admin").as("adminLoading")
        cy.intercept("PATCH", "/prodex/api/settings/admin").as("settingsSaving")
        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@loading")

        cy.get('.flex-wrapper > :nth-child(6)').click()
        cy.waitForUI()
        cy.get('[data-test=navigation_admin_settings_admin-settings_drpdn]').click()

        cy.wait("@adminLoading")
        cy.waitForUI()
    })

    it("Update settings", function () {
        cy.contains("Other Settings")
        cy.get("input[id='field_input_admin\.OTHER_SETTINGS\.APP_OPERATIONS_EMAIL_ADDRESS\.value\.visible']").clear()
            .type("tomas-artio@email.cz")
        cy.get("input[id='field_input_admin\.OTHER_SETTINGS\.USER_ORDER_PURCHASE_LIMIT\.value\.visible']").clear()
            .type(Math.floor(new Date() / 1000))
        cy.get("button[class='ui primary button']").click({force: true})
        cy.wait('@settingsSaving').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })
    })
})