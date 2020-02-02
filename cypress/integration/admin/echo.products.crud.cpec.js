context("Echo Product CRUD", () => {

    let productId = null
    let filter = [{"operator": "LIKE", "path": "EchoProduct.name", "values": ["%Test%"]}, {
        "operator": "LIKE",
        "path": "EchoProduct.code",
        "values": ["%Test%"]
    }]

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/cas-products/datagrid").as("loading")
        cy.route("POST", "/prodex/api/echo-products/datagrid").as("echoLoading")

        cy.FElogin("admin@example.com", "echopass123")

        cy.wait("@loading")
        cy.url().should("include", "admin")

        cy.get("[data-test='tabs_menu_item_12']").click()

        cy.wait("@echoLoading")
        cy.waitForUI()
    })

    it("Creates a Echo Product", () => {
        cy.getToken().then(token => {
            cy.getFirstEntityWithFilter(token, 'echo-products', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'echo-products/id', itemId)
            })
        })

        cy.clickAdd()

        cy.get("#name").type("TestoEchoprod")
        cy.get("#code").type("TEST-05")
        cy.selectFromDropdown("[data-test='admin_product_popup_cas_0_drpdn']", "382-45-6")
        cy.get("[data-test='sidebar_inventory_save_new']").click()

        cy.contains("Created Echo Product")

        cy.waitForUI()
        cy.searchInList("Test")

        cy.getToken().then(token => {
            cy.getFirstEchoProductIdWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                productId = itemId
            })
        })

        cy.get("#name")
            .should("have.value", "TestoEchoprod")

        cy.get("#code")
            .should("have.value", "TEST-05")
    })

    it("Edits an Echo product", () => {
        cy.searchInList("Test")

        cy.openElement(productId, 0)

        cy.get("#name").clear().type("Echoprod")
        cy.get("#code").clear().type("TEST-06")
        cy.get("[data-test='sidebar_inventory_save_new']").click()

        cy.contains("Updated Echo Product")

        cy.openElement(productId, 0)

        cy.get("#name").should("have.value", "Echoprod")
        cy.get("#code").should("have.value", "TEST-06")
    })

    it("Creates a alternative name", () => {
        cy.route("POST", "/prodex/api/echo-products/alternative-names/echo-product/**").as("nameSaving")
        cy.route("GET", "/prodex/api/echo-products/alternative-names/echo-product/**").as("nameGetting")

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
        cy.route("DELETE", "/prodex/api/echo-products/alternative-names/id/**").as("nameDelete")
        cy.route("GET", "/prodex/api/echo-products/alternative-names/echo-product/**").as("nameGetting")

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

    it("Checks error messages", () => {
        cy.clickAdd()

        cy.get("#code").click()
        cy.get("#name").click()

        cy.get("[data-test='sidebar_inventory_save_new']").click()

        cy.get(".error")
            .should("have.length", 3)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)|(Field should have at least 2 characters)/i)
        })
    })

    it("Deletes a product", () => {
        cy.searchInList("EchoProd")

        cy.openElement(productId, 5)
        cy.clickSave()

        cy.contains("Echoprod").should("not.exist")
    })
})