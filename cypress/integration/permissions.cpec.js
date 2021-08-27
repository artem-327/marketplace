context("Permissions tests",() => {
    const merchantUser = require('../fixtures/merchant.json')
    const orderProcessingUser = require('../fixtures/orderProcessing.json')
    const orderViewUser = require('../fixtures/orderView.json')
    const productCatalogUser =  require('../fixtures/productCatalogAdmin.json')
    const productOfferManager  =  require('../fixtures/productOfferManager.json')
    const userAdmin =  require('../fixtures/userAdmin.json')
    const operator =  require('../fixtures/operator.json')

    beforeEach(function () {
        cy.intercept("POST","**/datagrid**").as("loading")
        cy.intercept("GET","/prodex/api/dashboard*").as("dashboardLoading")
    })

    it("Merchant permissions", () =>{
        cy.FElogin(merchantUser.email, merchantUser.password)

        cy.wait('@dashboardLoading', {timeout: 30000})
        cy.url().should("include", "dashboard")

        cy.get('[data-test=navigation_menu_inventory_drpdn]').click()
        cy.wait('@loading')
        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_marketplace_drpdn']").click()
        cy.get('[data-test=navigation_menu_marketplace_listings_drpdn]').click()
        cy.wait('@loading')
        cy.get('tbody > :nth-child(1)').should("be.visible")

        cy.get("[data-test='navigation_menu_settings_drpdn']").should('not.exist')
    })

    it("Order View User permissions", () =>{
        cy.viewport(2250, 2000)
        cy.FElogin(orderViewUser.email, orderViewUser.password)

        cy.wait('@loading', {timeout: 30000})
        cy.url().should("include", "orders")

        cy.get("[data-test='navigation_menu_marketplace_drpdn']").should('not.exist')
        cy.get("[data-test='navigation_menu_settings_drpdn']").should('not.exist')

        cy.get("[data-test='navigation_orders_drpdn']").should('exist')

        cy.searchInList("77")
        //Volatile
        cy.waitForUI()
        cy.openElement(77, 0)
        cy.get("[data-test='orders_detail_orderShipping_btn']").should('not.exist')
    })

    it("Order Processing User permissions", () =>{
        cy.viewport(2250, 1000)
        cy.FElogin(orderProcessingUser.email, orderProcessingUser.password)

        cy.wait('@loading', {timeout: 30000})
        cy.url().should("include", "orders")

        cy.get("[data-test='navigation_menu_marketplace_drpdn']").should('not.exist')
        cy.get("[data-test='navigation_menu_settings_drpdn']").should('not.exist')

        cy.searchInList("85")
        cy.waitForUI()
        cy.openElement(85, 0)
        cy.get('[data-test=orders_detail_markAsShipped_btn]').should('be.visible')
    })

    it("Product Offer Manager permissions", () =>{
        cy.FElogin(productOfferManager.email, productOfferManager.password)

        cy.wait('@dashboardLoading', {timeout: 30000})
        cy.url().should("include", "/dashboard")

        cy.get('[data-test=navigation_menu_inventory_drpdn]').click()
        cy.wait('@loading')
        cy.get('.group-row').should('be.visible')

        cy.get("[data-test='navigation_menu_marketplace_drpdn']").should('not.exist')

        cy.get("[data-test='navigation_menu_settings_drpdn']").should('not.exist')
    })

    it("Product Catalog Admin permissions", () =>{
        cy.FElogin(productCatalogUser.email, productCatalogUser.password)

        cy.wait('@dashboardLoading', {timeout: 30000})
        cy.url().should("include", "dashboard")

        cy.get('[data-test=navigation_menu_inventory_drpdn]').click()
        cy.wait('@loading')
        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_inventory_my_products_drpdn']").click()
        cy.wait('@loading')
        cy.get("table:nth-child(2) > tbody > tr:nth-child(1)").should('be.visible')

        cy.get("[data-test='navigation_menu_marketplace_drpdn']").should('not.exist')
        cy.get("[data-test='navigation_menu_settings_drpdn']").should('not.exist')
    })

    it("Operator permissions", () =>{
        cy.FElogin(operator.email, operator.password)

        cy.wait('@loading', {timeout: 30000})
        cy.url().should("include", "quotes")
        cy.get('[data-test="table_row_action"]').should('be.visible')

        cy.get('[data-test="navigation_menu_operations_drpdn"]').should("be.visible")
        cy.get("[data-test='navigation_menu_companies_drpdn']").should('not.exist')
        cy.get("[data-test='navigation_menu_products_drpdn']").should('not.exist')
    })

    it("User Admin permissions", () =>{
        cy.FElogin(userAdmin.email, userAdmin.password)

        cy.wait('@dashboardLoading', {timeout: 30000})
        cy.url().should("include", "dashboard")

        cy.get('[data-test=navigation_menu_inventory_drpdn]').should('not.exist')
        cy.get("[data-test='navigation_menu_marketplace_drpdn']").should('not.exist')

        cy.get("[data-test='navigation_menu_settings_drpdn']").click()
        cy.get("[data-test='navigation_settings_warehouses_drpdn']").should('not.exist')
        cy.get("[data-test='navigation_settings_users_drpdn']").should('be.visible')
    })
})