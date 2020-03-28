context("Permissions tests",() => {
    const merchantUser = require('../fixtures/merchant.json')
    const orderProcessingUser = require('../fixtures/orderProcessing.json')
    const orderViewUser = require('../fixtures/orderView.json')
    const productCatalogUser =  require('../fixtures/productCatalogAdmin.json')
    const productOfferManager  =  require('../fixtures/productOfferManager.json')
    const userAdmin =  require('../fixtures/userAdmin.json')
    const echoOperator =  require('../fixtures/echoOperator.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST","**/datagrid").as("loading")
    })

    it("Merchant permissions", () =>{
        cy.FElogin(merchantUser.email, merchantUser.password)

        cy.wait('@loading', {timeout: 30000})
        cy.url().should("include", "inventory")

        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_marketplace_drpdn']").click()
        cy.wait('@loading')
        cy.get("[data-test='table_row_action']").eq(1).should('be.visible')

        cy.get("[data-test='navigation_menu_settings_drpdn']").should('not.exist')
    })

    it("Order View User permissions", () =>{
        cy.viewport(2250, 800)
        cy.FElogin(orderViewUser.email, orderViewUser.password)

        cy.wait('@loading', {timeout: 30000})
        cy.url().should("include", "inventory")

        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_marketplace_drpdn']").click()
        cy.wait('@loading')
        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_settings_drpdn']").should('not.exist')

        cy.get("[data-test='navigation_orders_drpdn']").click()
        cy.get("[data-test='navigation_orders_purchase_orders_drpdn']").click()
        cy.wait('@loading')

        //Volatile
        cy.waitForUI()
        cy.openElement(89, 0)
        cy.get("[data-test='orders_detail_orderShipping_btn']").should('not.exist')
    })

    it("Order Processing User permissions", () =>{
        cy.viewport(2250, 800)
        cy.FElogin(orderProcessingUser.email, orderProcessingUser.password)

        cy.wait('@loading', {timeout: 30000})
        cy.url().should("include", "inventory")

        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_marketplace_drpdn']").click()
        cy.wait('@loading')
        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_settings_drpdn']").should('not.exist')

        cy.get("[data-test='navigation_orders_drpdn']").click()
        cy.get("[data-test='navigation_orders_purchase_orders_drpdn']").click()
        cy.wait('@loading')

        //Volatile
        cy.waitForUI()
        cy.openElement(89, 0)
        cy.get("[data-test='orders_detail_orderShipping_btn']").should('be.visible')
    })

    it("Product Offer Manager permissions", () =>{
        cy.FElogin(productOfferManager.email, productOfferManager.password)

        cy.wait('@loading', {timeout: 30000})
        cy.url().should("include", "inventory")
        cy.get(':nth-child(2) > .actions').should('be.visible')

        cy.get("[data-test='navigation_menu_marketplace_drpdn']").click()
        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_settings_drpdn']").should('not.exist')
    })

    it("Product Catalog Admin permissions", () =>{
        cy.FElogin(productCatalogUser.email, productCatalogUser.password)

        cy.wait('@loading', {timeout: 30000})
        cy.url().should("include", "inventory")
        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_marketplace_drpdn']").click()
        cy.wait('@loading')
        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_settings_drpdn']").click()
        cy.get("[data-test='navigation_settings_warehouses_drpdn']").should('not.exist')

        cy.get("[data-test='navigation_settings_products_drpdn']").click()
        cy.wait('@loading')
        cy.get("[data-test='table_row_action']").eq(1).should('be.visible')
    })

    it("Echo Operator permissions", () =>{
        cy.FElogin(echoOperator.email, echoOperator.password)

        cy.wait('@loading', {timeout: 30000})
        cy.url().should("include", "inventory")
        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_wanted_board_drpdn']").click()
        cy.wait('@loading')
        cy.contains("No records found.")

        cy.get("[data-test='navigation_orders_drpdn']").click()
        cy.get("[data-test='navigation_orders_sales_orders_drpdn']").click()
        cy.wait('@loading')
        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_settings_drpdn']").should('not.exist')
    })

    it("User Admin permissions", () =>{
        cy.FElogin(userAdmin.email, userAdmin.password)

        cy.wait('@loading', {timeout: 30000})
        cy.url().should("include", "inventory")
        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_marketplace_drpdn']").click()
        cy.wait('@loading')
        cy.contains("No records found.")

        cy.get("[data-test='navigation_menu_settings_drpdn']").click()
        cy.get("[data-test='navigation_settings_warehouses_drpdn']").should('not.exist')

        cy.get("[data-test='navigation_settings_users_drpdn']").click()
        cy.wait('@loading')
        cy.get(':nth-child(1) > .actions').should('be.visible')
    })
})