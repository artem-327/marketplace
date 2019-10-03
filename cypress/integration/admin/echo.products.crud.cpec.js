context("Echop Product CRUD", () => {

    let productId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/cas-products/datagrid').as('loading')
        cy.route("POST", '/prodex/api/echo-products/datagrid').as('echoLoading')

        cy.FElogin("admin@example.com", "echopass123")

        cy.wait('@loading')
        cy.url().should("include", "admin")

        cy.get('[data-test="tabs_menu_item_12"]').click()

        cy.wait('@echoLoading')
    })

    it("Creates a Echo Product", () => {
        cy.get("button[data-test='admin_table_add_btn']").click()

        cy.get("#field_input_name").type("TestoEchoprod")
        cy.get("#field_input_code").type("TEST-05")

        cy.selectFromDropdown("[data-test='admin_product_popup_cas_0_drpdn']", "382-45-6")
        cy.selectFromDropdown("[data-test='new_inventory_manufacturer_drpdn']", "BASF")
        cy.enterText('#field_input_unShippingName','TE21')

        cy.get('#field_input_mfrProductCode').type("TTSS")
        cy.contains('Add Code').click()

        cy.get('div[data-test="admin_product_popup_emergencyPhone_inp"]').within(($form) => {
            cy.get('input[placeholder = "Phone Number"]').type('1234567895')
            cy.contains('+CCC').click()
            cy.contains('USA').click()

        })

        cy.get('input[class=prompt]').type('UN 2330')
        cy.get('div[value=2330]').click()

        cy.selectFromDropdown("#field_dropdown_hazardClass", "1.2: Explosive: Projection")
        cy.selectFromDropdown("#field_dropdown_hazardLabels", "1.1: Explosive: Mass")

        cy.get('#field_dropdown_packagingGroup').click()
        cy.contains('II: Medium danger').click()

        cy.enterText('#field_input_sdsVersionNumber', '1')
        cy.enterText('#field_input_sdsRevisionDate', '20.09.2019')

        cy.clickSave()

        cy.contains("Created Echo Product")

        cy.waitForUI()

        let filter = [{"operator":"LIKE","path":"EchoProduct.name","values":["%Test%"]},
            {"operator":"LIKE","path":"EchoProduct.code","values":["%Test%"]}]

        cy.getToken().then(token => {
            cy.getFirstCasProductWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                productId = itemId
            })
        })

        cy.get("#field_input_name")
            .should("have.value","TestoEchoprod")

        cy.get("#field_input_code")
            .should("have.value","TEST-05")

        cy.get("#field_input_chemicalName")
            .should("have.value","Testinonium")

        cy.contains("BASF")
        cy.contains("20.09.2019")
        cy.contains("382-45-6")
    })

    it("Edits an Echo product", () => {
        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_0]').click()

        cy.get("#field_input_name").clear().type("Echoprod")
        cy.get("#field_input_code").clear().type("TEST-06")

        cy.clickSave()

        cy.contains("Updated Echo Product")

        cy.waitForUI()

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_0]').click()

        cy.get("#field_input_name").should("have.value", "Echoprod")
        cy.get("#field_input_code").should("have.value","TEST-06")

    })

    it("Creates a alternative name", () => {
        cy.route("POST", "/prodex/api/echo-products/alternative-names/echo-product/").as("nameSaving")
        cy.route("GET", "/prodex/api/echo-products/alternative-names/echo-product/**").as("nameGetting")

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_1]').click()

        cy.get("[data-test=settings_product_alt_name_add_btn]")
            .click()

        cy.get("input[id='field_input_productAltNames[0].alternativeName']")
            .type("QAonium")
            .should("have.value","QAonium")

        cy.get("[data-test=settings_product_alt_name_save_0_btn]").click()

        cy.wait("@nameSaving")

        cy.get("[data-test=settings_product_alt_name_reset_btn]").click()

        cy.waitForUI()

        cy.get('[data-test=action_' + productId + ']').click()
        cy.get('[data-test=action_' + productId + '_1]').click()

        cy.wait("@nameGetting")

        cy.get("input[id='field_input_productAltNames[0].alternativeName']")
            .should("have.value","QAonium")
    })

    it("Deletes a alternative name", () => {
        cy.route("POST", "/prodex/api/echo-products/alternative-names/echo-product/").as("nameSaving")
        cy.route("GET", "/prodex/api/echo-products/alternative-names/echo-product/**").as("nameGetting")

        cy.get('[data-test=action_' + productId + ']').click()
        cy.get('[data-test=action_' + productId + '_1]').click()

        cy.get("input[id='field_input_productAltNames[0].alternativeName']")
            .should("have.value","QAonium")

        cy.get("[data-test=settings_product_alt_name_delete_0_btn]").click()

        cy.wait("@nameDelete")

        cy.get("input[id='field_input_productAltNames[0].tradeName']")
            .should("not.exist")

        cy.get("[data-test=admin_popup_alt_cas_name_close_btn]").click()

        cy.waitForUI()

        cy.get('[data-test=action_' + productId + ']').click()
        cy.get('[data-test=action_' + productId + '_1]').click()

        cy.wait("@nameGetting")

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .should("not.exist")
    })

    it("Checks error messages", () => {
        cy.get("button[data-test='admin_table_add_btn']").click()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",13)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)|(Field should have at least 2 characters)/i)
        })
    })

    it("Deletes a product", () => {
        cy.get("[data-test=admin_table_search_inp]")
            .children("div")
            .children("input")
            .type("Testerium")

        cy.waitForUI()

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_2]').click()

        cy.clickSave()

        cy.contains("Testinonium").should("not.exist")
    })
})