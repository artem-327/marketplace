context("CAS products CRUD", () => {

    let productId = null
    let filter = [{"operator": "LIKE", "path": "CasProduct.casIndexName", "values": ["%Testinonium%"]},
        {"operator": "LIKE", "path": "CasProduct.casNumber", "values": ["%100-95-521%"]}]
    const adminJSON = require('../../fixtures/admin.json')

    before(function () {
        cy.getToken().then(token => {
            cy.finishTakeover(token)
        })
    })

    beforeEach(function () {
        cy.intercept("GET", "/prodex/api/dashboard*").as("loading")
        cy.intercept("POST", "/prodex/api/cas-products/datagrid*").as("CASloading")

        cy.FElogin(adminJSON.email, adminJSON.password)

        cy.wait("@loading")
        cy.get('.flex-wrapper > :nth-child(3)').click()
        cy.wait("@CASloading")
    })

    it("Creates a CAS product", () => {
        cy.getToken().then(token => {
            cy.getFirstCasProductWithFilter(token, filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'cas-products/id', itemId)
            })
        })

        cy.get('[data-test=products_open_popup_btn]').click({force: true})

        cy.enterText("#field_input_casNumber", "100-95-521")
        cy.enterText("#field_input_casIndexName", "Testinonium")
        cy.get('[data-test=cas_product_sidebar_submit_btn]').click()

        cy.get('.column > .ui > input')
            .type("Testinonium")

        cy.getToken().then(token => {
            cy.getFirstCasProductWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                productId = itemId
            })
        })

        cy.get("#field_input_casNumber")
            .should("have.value", "100-95-521")

        cy.get("#field_input_casIndexName")
            .should("have.value", "Testinonium")
    })

    it("Edits a CAS product", () => {
        cy.get('.column > .ui > input')
            .type("Testinonium")

        cy.wait("@CASloading")

        cy.openElement(productId, 0)

        cy.get("#field_input_casIndexName")
            .clear()
            .type("Testerium")
            .should("have.value", "Testerium")

        cy.get('[data-test=cas_product_sidebar_submit_btn]').click()

        cy.openElement(productId, 0)

        cy.get("#field_input_casIndexName")
            .should("have.value", "Testerium")
    })

    it("Creates a alternative name", () => {
        cy.intercept("POST", "/prodex/api/cas-products/alternative-names/**").as("nameSaving")
        cy.intercept("GET", "/prodex/api/cas-products/alternative-names/**").as("nameGetting")

        cy.get('.column > .ui > input')
            .type("100-95-521")

        cy.waitForUI()
        cy.wait("@CASloading")

        cy.openElement(productId, 1)

        cy.get("[data-test=admin_popup_alt_cas_name_add_btn]")
            .click()

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .type("QAonium")
            .should("have.value", "QAonium")

        cy.get("[data-test=admin_popup_alt_cas_name_0_save]").click()

        cy.wait("@nameSaving")

        cy.get("[data-test=admin_popup_alt_cas_name_close_btn]").click()
        cy.waitForUI()

        cy.openElement(productId, 1)

        cy.wait("@nameGetting")

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .should("have.value", "QAonium")
    })

    it("Deletes a alternative name", () => {
        cy.intercept("DELETE", "/prodex/api/cas-products/alternative-names/**").as("nameDelete")
        cy.intercept("GET", "/prodex/api/cas-products/alternative-names/**").as("nameGetting")

        cy.get('.column > .ui > input')
            .type("100-95-521")

        cy.waitForUI()
        cy.wait("@CASloading")

        cy.openElement(productId, 1)

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .should("have.value", "QAonium")

        cy.get("[data-test=admin_popup_alt_cas_name_0_delete]").click()

        cy.wait("@nameDelete")

        cy.get("input[id='field_input_productAltNames[0].tradeName']")
            .should("not.exist")

        cy.wait("@nameGetting")

        cy.get("[data-test=admin_popup_alt_cas_name_close_btn]").click()

        cy.waitForUI()
        cy.openElement(productId, 1)

        cy.wait("@nameGetting")

        cy.get("input[id='field_input_casAlternativeNames[0].alternativeName']")
            .should("not.exist")
    })

    it("Checks error messages", () => {
        cy.get('[data-test=products_open_popup_btn]').click({force: true})

        cy.get('[data-test=cas_product_sidebar_submit_btn]').click()

        cy.get(".error")
            .should("have.length", 2)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a product", () => {
        cy.get('.column > .ui > input')
            .type("100-95-521")

        cy.wait("@CASloading")

        cy.openElement(productId, 2)

        cy.clickConfirm()

        cy.contains("Testerium").should("not.exist")
    })
})