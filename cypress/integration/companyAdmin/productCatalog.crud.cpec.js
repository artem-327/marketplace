context("Company Product Catalog CRUD", () => {
    let productId = null
    let filter = [{"operator": "LIKE", "path": "CompanyProduct.intProductCode", "values": ["%OURPR%"]}]
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("GET", "/prodex/api/settings/user").as("settingsLoading")
        cy.route("POST", "/prodex/api/company-products/datagrid").as("productLoading")

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {cy.deleteWholeCart(token)})

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading", {timeout: 100000})
        cy.get('.scrollbar-container > .dropdown').click()

        cy.contains("Product Catalog").click()

        cy.wait("@productLoading")
        cy.waitForUI()
    })

    it("Creates a product", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'company-products', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'company-products/id', itemId)
            })
        })
        cy.settingsAdd()

        cy.enterText("#field_input_intProductName", "Our product")
        cy.enterText("#field_input_intProductCode", "OURPR")
        cy.enterText("#field_input_packagingSize", "70")
        cy.enterText("#field_input_packageWeight", "5")

        cy.get("[data-test='settings_product_popup_packagingUnit_drpdn']").click()
        cy.contains("kilograms").click()

        cy.get("[data-test='settings_product_popup_packagingType_drpdn']").click()
        cy.contains("paper bags").click()

        cy.get("[data-test='settings_product_popup_packageWeightUnit_drpdn']").click()
        cy.get("[data-test='settings_product_popup_packageWeightUnit_drpdn']").within(() => {
            cy.contains("kilograms").click()
        })

        cy.selectFromDropdown("div[id='field_dropdown_nmfcNumber']", "15")

        cy.get("[data-test='settings_product_popup_freightClass_drpdn']").click()
        cy.get("[data-test='settings_product_popup_freightClass_drpdn']").within(() => {
            cy.contains("60").click()
        })

        cy.clickSave()

        cy.contains("Info!")
        cy.reload()
        cy.wait("@productLoading")
        cy.waitForUI()
        cy.searchInList("Our")

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstCompanyProductWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                productId = itemId
            })
        })

        cy.get("#field_input_intProductName")
            .should("have.value", "Our product")

        cy.get("#field_input_intProductCode")
            .should("have.value", "OURPR")

        cy.get("#field_input_packagingSize")
            .should("have.value", "70")
    })

    it("Edits a product", () => {
        cy.searchInList("Our")
        cy.openElement(productId, 0)

        cy.get("#field_input_intProductName")
            .clear()
            .type("My product")
            .should("have.value", "My product")

        cy.clickSave()

        cy.searchInList("My")
        cy.openElement(productId, 0)

        cy.get("#field_input_intProductName")
            .should("have.value", "My product")
    })

    it("Checks error messages", () => {
        cy.settingsAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length", 9)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a product", () => {
        cy.searchInList("My")
        cy.openElement(productId, 1)

        cy.clickSave()

        cy.contains("My product").should("not.exist")

        cy.reload()
        cy.wait("@productLoading")

        cy.contains("My product").should("not.exist")
    })


    it("Cannot select noncorresponding Unit and Type", () => {
        cy.settingsAdd()

        cy.get("[data-test='settings_product_popup_packagingUnit_drpdn']").click()
        cy.contains("kilograms").click()

        cy.get("[data-test='settings_product_popup_packagingType_drpdn']").click()
        cy.contains("Drum").should("not.exist")

        cy.get("[data-test='settings_product_popup_packagingUnit_drpdn']").click()
        cy.contains("liters").click()

        cy.get("[data-test='settings_product_popup_packagingType_drpdn']").click()
        cy.contains("Bulk").should("not.exist")
    })
})