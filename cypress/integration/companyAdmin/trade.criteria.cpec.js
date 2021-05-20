context("Trade Criteria", () => {
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.intercept("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.intercept("GET", "/prodex/api/tradepass/my-tradepass").as("tradePassLoading")
        cy.intercept("GET", "/prodex/api/tradepass/my-criteria").as("myCriteriaLoading")
        cy.intercept("PUT", "/prodex/api/tradepass/my-criteria").as("myCriteriaSave")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading", { timeout: 100000 })
        cy.openSettings()
        cy.wait("@tradePassLoading", { timeout: 100000 })
    })

    it("Criteria shown and matching", () => {
        cy.get("[class*='TextValueTradeCriteria']").each((criteria, index, list) => {
            cy.wrap(criteria).invoke('text').as("myCriteria" + index)
        })

        cy.get("[data-test='navigation_settings_my_trade_criteria_drpdn']").click()
        cy.wait("@myCriteriaLoading")

        cy.contains("button", "Save")
        cy.get("[class*='selection dropdown']").find("div[class=text]").each(($element, index, collection) => {
            cy.get("@myCriteria" + index).then( criterium => {
                expect(criterium).to.equal($element.text())
            })
        })
    })

    it("Change criteria", () => {
        cy.get("[data-test='navigation_settings_my_trade_criteria_drpdn']").click()
        cy.wait("@myCriteriaLoading")

        cy.get("div[id='field_dropdown_social_presence']").click()
        cy.contains("span", "Website +1 Social").click()
        cy.contains("button", "Save").click()

        cy.wait("@myCriteriaSave", { timeout: 100000 }).then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })
    })
})