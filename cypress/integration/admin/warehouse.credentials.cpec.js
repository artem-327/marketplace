context("Warehouse Credentials Manipulation", () => {

    const adminJSON = require('../../fixtures/admin.json')
    const userJSON = require('../../fixtures/user2.json')
    let filter = [{ "operator": "LIKE", "path": "Branch.deliveryAddress.addressName", "values": ["%Credential Test%"] }]

    before(function () {
        cy.getToken().then(token => {
            cy.finishTakeover(token)
        })
    })

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard*").as("loading")
        cy.intercept("POST", "/prodex/api/branches/warehouses/certified/datagrid*").as("warehouseLoading")
        cy.intercept("POST", "/prodex/api/branches/warehouses/pending/datagrid*").as("pendingLoading")
        cy.intercept('/prodex/api/branches/**').as("processWarehouse")

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'branches/warehouses', filter).then(itemId => {
                cy.turnOffWarehouseCertification(token, itemId)
            })
            cy.getFirstEntityWithFilter(token, 'branches/warehouses', filter).then(itemId => {
                cy.requestWarehouseCertification(token, itemId)
            })
        })

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@loading")

        cy.get('.flex-wrapper > :nth-child(8)').click()
        cy.waitForUI()
        cy.get('[data-test=navigation_credentials_all_drpdn]').click()

        cy.wait("@warehouseLoading")
        cy.waitForUI()
    })

    it("Approve Credentials", () => {
        cy.get('[data-test=navigation_credentials_pending_drpdn]').click()
        cy.wait("@pendingLoading")
        cy.searchInList("Test Automation")

        cy.get("[class*=TableRow-sc]").click()

        cy.get("[class*=DivBodyRowTable-sc]").eq(0).click()

        cy.get("[class*=DivBodyRowDetail-sc]").find("[id='field_input_dea.issueDate']").click()
        cy.contains("[class*=suicr-content-item]", "4").click()
        cy.get("[class*=DivBodyRowDetail-sc]").find("[id='field_input_dea.expDate']").click()
        cy.waitForUI()
        cy.contains("[class*=suicr-content-item]", "25").click()

        cy.contains("button", "Approve").eq(0).click()
        cy.wait("@processWarehouse").then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })
        cy.waitForUI()
        cy.wait("@pendingLoading")

        cy.get("[class*=DivBodyRowDetail-sc]").within((element) => {
            cy.get("[id='field_input_epa.epaFrsId']").type('TEST ID')
            cy.get("[id='field_input_epa.epaRegion']").type('TEST REGION')
            cy.get("[id='field_input_epa.epaFacilityUrl']").type('http://www.example.com')
            cy.contains("button", "Approve").eq(0).click()
            cy.wait("@processWarehouse").then(({ request, response }) => {
                expect(response.statusCode).to.eq(200)
            })
        })
    })

    it("Deny Credentials", () => {
        cy.get('[data-test=navigation_credentials_pending_drpdn]').click()
        cy.wait("@pendingLoading")
        cy.searchInList("Test Automation")
        cy.wait("@pendingLoading")

        cy.get("[class*=TableRow-sc]").click()

        cy.get("[class*=DivBodyRowTable-sc]").eq(0).click()
        cy.get("[class*=DivBodyRowDetail-sc]").within((element) => {
            cy.contains("button", "Deny").eq(0).click()
            cy.wait("@processWarehouse")
        })

        cy.get("[class*=DivBodyRowDetail-sc]").within((element) => {
            cy.contains("button", "Deny").eq(0).click()
            cy.wait("@processWarehouse")
        })
    })

    it("Assert Certified Warehouse", () => {
        cy.searchInList("Tiret")

        cy.get("[class*=TableRow-sc]").click()

        cy.get("[class*=DivBodyRowTable-sc]").eq(0).click()
        cy.get("[class*=DivBodyRowDetail-sc]").within((element) => {
            cy.get("[class*=WarehouseCredentialsstyles__FileName-sc]").should('have.length', 2)
            cy.contains("DEA Certificate")
            cy.contains("Tax Exempt Certificate")
        })
    })
})