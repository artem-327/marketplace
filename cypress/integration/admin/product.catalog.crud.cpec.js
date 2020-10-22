context("Generic Company Product CRUD", () => {

    let productId = null
    let filter = [{ "operator": "LIKE", "path": "CompanyGenericProduct.name", "values": ["%Test%"] }, {
        "operator": "LIKE",
        "path": "CompanyGenericProduct.code",
        "values": ["%Test%"]
    }]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("GET", "/prodex/api/dashboard").as("loading")
        cy.route("POST", "/prodex/api/company-generic-products/datagrid").as("genericLoading")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@loading")
        cy.url().should("include", "dashboard")

        cy.get('.flex-wrapper > :nth-child(3)').click()
        cy.waitForUI()
        cy.get('[data-test=navigation_products_product-catalog_drpdn]').click()

        cy.wait("@genericLoading")
        cy.waitForUI()
        cy.viewport(2000, 2500)
    })

    it("Creates a Generic Product", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'company-generic-products', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'company-generic-products/id', itemId)
            })
        })

        cy.get("[data-test=products_open_popup_btn]").click({ force: true })

        cy.get("#name").type("TestoEchoprod")
        cy.get("#code").type("TEST-05")
        cy.selectFromDropdown("[data-test='admin_product_popup_cas_0_drpdn']", "382-45-6")
        cy.selectFromDropdown("#field_dropdown_productGroup", "Product Group A")
        cy.selectFromDropdown("#field_dropdown_company", "Testering")
        cy.get("[data-test='sidebar_inventory_save_new']").click()

        cy.waitForUI()
        cy.searchInList("Test")

        cy.getToken().then(token => {
            cy.getFirstGenericProductIdWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                productId = itemId
            })
        })

        cy.get("#name")
            .should("have.value", "TestoEchoprod")

        cy.get("#code")
            .should("have.value", "TEST-05")
    })

    it("Edits a Generic product", () => {
        cy.searchInList("Test")

        cy.openElement(productId, 0)

        cy.get("#name").clear().type("Echoprod")
        cy.get("#code").clear().type("TEST-06")
        cy.get("[data-test='sidebar_inventory_save_new']").click()

        cy.openElement(productId, 0)

        cy.get("#name").should("have.value", "Echoprod")
        cy.get("#code").should("have.value", "TEST-06")
    })

    it("Creates a alternative name", () => {
        cy.route("POST", "/prodex/api/company-generic-products/alternative-names/company-generic-product/**").as("nameSaving")
        cy.route("GET", "/prodex/api/company-generic-products/alternative-names/company-generic-product/**").as("nameGetting")

        cy.searchInList("Test")
        cy.openElement(productId, 4)

        cy.get("[data-test=settings_product_alt_name_add_btn]")
            .click()

        cy.get("input[id='field_input_productAltNames[0].alternativeName']")
            .type("QAonium")
            .should("have.value", "QAonium")

        cy.get("[data-test=settings_product_alt_name_save_0_btn]").click()

        cy.wait("@nameSaving")

        cy.get("[data-test=settings_product_alt_name_reset_btn]").click()

        cy.openElement(productId, 4)

        cy.wait("@nameGetting")

        cy.get("input[id='field_input_productAltNames[0].alternativeName']")
            .should("have.value", "QAonium")
    })

    it("Deletes a alternative name", () => {
        cy.route("DELETE", "/prodex/api/company-generic-products/alternative-names/id/**").as("nameDelete")
        cy.route("GET", "/prodex/api/company-generic-products/alternative-names/company-generic-product/**").as("nameGetting")

        cy.searchInList("Test")
        cy.openElement(productId, 4)

        cy.get("input[id='field_input_productAltNames[0].alternativeName']")
            .should("have.value", "QAonium")

        cy.get("[data-test=settings_product_alt_name_delete_0_btn]").click()

        cy.wait("@nameDelete")

        cy.get("input[id='field_input_productAltNames[0].tradeName']")
            .should("not.exist")

        cy.get("[data-test=settings_product_alt_name_reset_btn]").click()

        cy.openElement(productId, 4)

        cy.wait("@nameGetting")

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .should("not.exist")
    })

    /* Causes Cypress to freeze
        it("Checks error messages", () => {
            cy.get("[data-test=products_open_popup_btn]").click()

            cy.get("#name").click()
            cy.waitForUI()
            cy.get("#code").click()
            cy.waitForUI()

            cy.get("[data-test='sidebar_inventory_save_new']").click()
            cy.waitForUI()

            cy.get(".error")
                .should("have.length", 5)
                .find(".sui-error-message").each((element) => {
                expect(element.text()).to.match(/(Required)|(Field should have at least 2 characters)|(At least one group should be selected)|(At least one company should be selected)/i)
            })
        })
    */
    it("Deletes a product", () => {
        cy.searchInList("EchoProd")

        cy.openElement(productId, 5)
        cy.clickSave()

        cy.contains("Echoprod").should("not.exist")
    })
})