context("CAS products CRUD", () => {

    let productId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/cas-products/datagrid').as('loading')

        cy.login("admin@example.com", "echopass123")

        cy.wait('@loading')
        cy.url().should("include", "admin")
    })

    it("Creates a CAS product", () => {
        cy.get("button[class='ui large primary button']").eq(0).click({force: true})

        cy.get("#field_input_casIndexName")
            .type("testinonium")
            .should("have.value", "testinonium")

        cy.get("#field_input_casNumber")
            .type("100-95")
            .should("have.value", "100-95")

        cy.get("#field_input_chemicalName")
            .type("Testinonium")
            .should("have.value", "Testinonium")

        cy.get("#field_dropdown_hazardClassesId").click()
        cy.get("#field_dropdown_hazardClassesId").within(() => {
            cy.contains("Explosive: Division Not Specified").click()
        })

        cy.clickSave()

        cy.contains("Created CAS Product")

        cy.get("[data-test=admin_table_search_inp]")
            .children("div")
            .children("input")
            .type("Testinonium")

        let filter = [{"operator":"LIKE","path":"CasProduct.chemicalName","values":["%Testinonium%"]},
            {"operator":"LIKE","path":"CasProduct.casNumber","values":["%Testinonium%"]}]

        cy.getToken().then(token => {
            cy.getFirstCasProductWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                productId = itemId
            })
        })

        cy.get("#field_input_casIndexName")
            .should("have.value","testinonium")

        cy.get("#field_input_casNumber")
            .should("have.value","100-95")

        cy.get("#field_input_chemicalName")
            .should("have.value","Testinonium")

        cy.contains("1")
    })

    it("Edits a CAS product", () => {
        cy.get("[data-test=admin_table_search_inp]")
            .children("div")
            .children("input")
            .type("Testinonium")

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_0]').click()

        cy.get("#field_input_chemicalName")
            .clear()
            .type("Testerium")
            .should("have.value","Testerium")

        cy.clickSave()

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_0]').click()

        cy.get("#field_input_chemicalName")
            .should("have.value","Testerium")
    })

    it("Creates a alternative name", () => {
        cy.route("POST", "/prodex/api/cas-products/alternative-names").as("nameSaving")
        cy.route("GET", "/prodex/api/cas-products/alternative-names/**").as("nameGetting")

        cy.get("[data-test=admin_table_search_inp]")
            .children("div")
            .children("input")
            .type("Testerium")

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_1]').click()

        cy.get("[data-test=admin_popup_alt_cas_name_add_btn]")
            .click()

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .type("QAonium")
            .should("have.value","QAonium")

        cy.get("[data-test=admin_popup_alt_cas_name_0_save]").click()

        cy.wait("@nameSaving")

        cy.get("[data-test=admin_popup_alt_cas_name_close_btn]").click()

        cy.waitForUI()

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_1]').click()

        cy.wait("@nameGetting")

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .should("have.value","QAonium")
    })

    it("Deletes a alternative name", () => {
        cy.route("DELETE", "/prodex/api/cas-products/alternative-names/**").as("nameDelete")
        cy.route("GET", "/prodex/api/cas-products/alternative-names/**").as("nameGetting")

        cy.get("[data-test=admin_table_search_inp]")
            .children("div")
            .children("input")
            .type("Testerium")

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_1]').click()

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .should("have.value","QAonium")

        cy.get("[data-test=admin_popup_alt_cas_name_0_delete]").click()

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
        cy.get("button[class='ui large primary button']").eq(0).click({force: true})

        cy.clickSave()

        cy.get(".error")
            .should("have.length",3)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a product", () => {
        cy.get("[data-test=admin_table_search_inp]")
            .children("div")
            .children("input")
            .type("Testerium")

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_2]').click()

        cy.clickSave()

        cy.contains("Testinonium").should("not.exist")
    })
})