context("CAS products CRUD", () => {

    let productId = null
    let filter = [{"operator": "LIKE", "path": "CasProduct.casIndexName", "values": ["%Testinonium%"]},
        {"operator": "LIKE", "path": "CasProduct.casNumber", "values": ["%Testinonium%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/cas-products/datagrid").as("loading")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@loading")
        cy.url().should("include", "admin")
    })

    it("Creates a CAS product", () => {
        cy.getToken().then(token => {
            cy.getFirstCasProductWithFilter(token, filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'cas-products/id', itemId)
            })
        })

        cy.get("button[class='ui large primary button']").eq(0).click({force: true})

        cy.enterText("[name='casProduct.casNumber']", "100-95-521")
        cy.enterText("[name='casProduct.casIndexName']", "Testinonium")
        cy.clickSave()

        cy.get("[data-test=admin_table_search_inp]")
            .children("div")
            .children("input")
            .type("Testinonium")

        cy.getToken().then(token => {
            cy.getFirstCasProductWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                productId = itemId
            })
        })

        cy.get("[name='casProduct.casNumber']")
            .should("have.value", "100-95-521")

        cy.get("[name='casProduct.casIndexName']")
            .should("have.value", "Testinonium")
    })

    it("Edits a CAS product", () => {
        cy.get("[data-test=admin_table_search_inp]")
            .children("div")
            .children("input")
            .type("Testinonium")

        cy.openElement(productId, 0)

        cy.get("[name='casProduct.casIndexName']")
            .clear()
            .type("Testerium")
            .should("have.value", "Testerium")

        cy.clickSave()

        cy.openElement(productId, 0)

        cy.get("[name='casProduct.casIndexName']")
            .should("have.value", "Testerium")
    })

    it("Creates a alternative name", () => {
        cy.route("POST", "/prodex/api/cas-products/alternative-names/**").as("nameSaving")
        cy.route("GET", "/prodex/api/cas-products/alternative-names/**").as("nameGetting")

        cy.get("[data-test=admin_table_search_inp]")
            .children("div")
            .children("input")
            .type("Testerium")

        cy.openElement(productId, 1)

        cy.get("[data-test=admin_popup_alt_cas_name_add_btn]")
            .click()

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .type("QAonium")
            .should("have.value", "QAonium")

        cy.get("[data-test=admin_popup_alt_cas_name_0_save]").click()

        cy.wait("@nameSaving")

        cy.get("[data-test=admin_popup_alt_cas_name_close_btn]").click()

        cy.openElement(productId, 1)

        cy.wait("@nameGetting")

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .should("have.value", "QAonium")
    })

    it("Deletes a alternative name", () => {
        cy.route("DELETE", "/prodex/api/cas-products/alternative-names/**").as("nameDelete")
        cy.route("GET", "/prodex/api/cas-products/alternative-names/**").as("nameGetting")

        cy.get("[data-test=admin_table_search_inp]")
            .children("div")
            .children("input")
            .type("Testerium")

        cy.openElement(productId, 1)

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .should("have.value", "QAonium")

        cy.get("[data-test=admin_popup_alt_cas_name_0_delete]").click()

        cy.wait("@nameDelete")

        cy.get("input[id='field_input_productAltNames[0].tradeName']")
            .should("not.exist")

        cy.get("[data-test=admin_popup_alt_cas_name_close_btn]").click()

        cy.openElement(productId, 1)

        cy.wait("@nameGetting")

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .should("not.exist")
    })

    it("Checks error messages", () => {
        cy.get("button[class='ui large primary button']").eq(0).click({force: true})

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 2)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a product", () => {
        cy.get("[data-test=admin_table_search_inp]")
            .children("div")
            .children("input")
            .type("Testerium")

        cy.openElement(productId, 2)

        cy.clickSave()

        cy.contains("Testerium").should("not.exist")
    })
})