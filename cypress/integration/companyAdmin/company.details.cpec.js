context("Company Details", () => {
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard*").as("inventoryLoading")
        cy.intercept("GET", "/prodex/api/companies/id/**/logo").as("logoLoading")
        cy.intercept("GET", "/prodex/api/tradepass/my-tradepass").as("tradePassLoading")
        cy.intercept("PATCH", "/prodex/api/companies/id/**/details").as("detailsSaving")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading", { timeout: 100000 })
        cy.openSettings()
        cy.wait("@tradePassLoading")
        cy.get("[data-test='navigation_settings_company_details_drpdn']").click()
        cy.wait("@logoLoading")
    })

    it("Check company data", () => {
        cy.get("[class*='LogoWrapper']").should("be.visible")
        cy.get("#field_input_vellociBusinessId").invoke('val') .should('not.be.empty')

        cy.get("#field_input_website").invoke('val').as("website")
        cy.get("#field_input_name").invoke('val').as("name")
        cy.get("#field_input_tin").invoke('val').as("tin")
        cy.get("#field_textarea_tagline").invoke('val').as("tagline")

        cy.waitForUI()

        cy.get("[data-test='navigation_settings_my_trade_pass_drpdn']").click()
        cy.wait("@tradePassLoading")

        cy.get('@website').then((text) => {
            cy.contains(text)
        })
        cy.get('@name').then(text => {
            cy.contains(text)
        })
        cy.get('@tin').then(text => {
            cy.contains(text)
        })
        cy.get('@tagline').then(text => {
            cy.contains(text)
        })
    })

    it("Edits Company Details", () => {
        let recogniser = Math.floor(new Date() / 1000)
        cy.get('#field_input_website').clear().type("https://automation" + recogniser + ".com")
        cy.get('#field_input_socialLinkedin').clear().type("https://automation" + recogniser + ".com")
        cy.get('#field_input_socialFacebook').clear().type("https://automation" + recogniser + ".com")
        cy.get('#field_input_socialTwitter').clear().type("@Tag" + recogniser)
        cy.get('#field_input_socialInstagram').clear().type("@Tag" + recogniser)

        cy.contains("button", "Save").click()
        cy.waitForUI()
        cy.wait("@detailsSaving").then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })

        cy.reload()
        cy.wait("@logoLoading", { timeout: 100000 })

        cy.get('#field_input_website').should("have.value", "https://automation" + recogniser + ".com")
        cy.get('#field_input_socialLinkedin').should("have.value", "https://automation" + recogniser + ".com")
        cy.get('#field_input_socialFacebook').should("have.value", "https://automation" + recogniser + ".com")
        cy.get('#field_input_socialTwitter').should("have.value", "@Tag" + recogniser)
        cy.get('#field_input_socialInstagram').should("have.value", "@Tag" + recogniser)
        cy.waitForUI()
    })

    it("Checks error message", () => {
        cy.get("[id='field_input_address.streetAddress']").clear()
        cy.get("#field_input_name").clear()
        cy.get("#field_input_email").clear()

        cy.contains("button", "Save").click()

        cy.contains("Errors on form")

        cy.get(".error")
            .should("have.length", 3)
    })
})