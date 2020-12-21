context("Company Product Catalog CRUD", () => {
    let productId = null
    let filter = [{"operator": "LIKE", "path": "CompanyProduct.intProductCode", "values": ["%OURPR%"]}]
    const userJSON = require('../../fixtures/user.json')

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("GET", "/prodex/api/settings/user").as("settingsLoading")
        cy.route("POST", "/prodex/api/company-products/datagrid?type=ALL").as("productLoading")

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {cy.deleteWholeCart(token)})

        cy.FElogin(userJSON.email, userJSON.password)

        cy.wait("@inventoryLoading", {timeout: 100000})
        cy.get('[data-test=navigation_menu_inventory_drpdn]').click()

        cy.get('[data-test=navigation_menu_inventory_my_products_drpdn]').click()

        cy.wait("@productLoading")
        cy.waitForUI()
    })

    it("Creates a product", () => {
        cy.viewport(2000, 3000)
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'company-products', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'company-products/id', itemId)
            })
        })
        cy.settingsAdd()

        cy.selectFromDropdown("div[id='field_dropdown_companyGenericProduct']","ABEX")

        cy.enterText("#field_input_intProductName", "Our product")
        cy.enterText("#field_input_intProductCode", "OURPR")
        cy.enterText("#field_input_palletMaxPkgs", "70")

        cy.get("[data-test='settings_product_popup_packageWeightUnit_drpdn']").click()
        cy.get("[data-test='settings_product_popup_packageWeightUnit_drpdn']").within(() => {
            cy.contains("kilograms").click()
        })

        cy.enterText("#field_input_packageWeight", "5")

        cy.get("div[id='field_dropdown_nmfcNumber']")
            .children("input")
            .type("15", {force: true})
            .should("have.value","15")

        cy.get("div[id='field_dropdown_nmfcNumber']").within(() => {
            cy.get("div[role='option']").eq(0).click({force: true})
        })

        cy.get("[data-test='settings_product_popup_freightClass_drpdn']").click()
        cy.get("[data-test='settings_product_popup_freightClass_drpdn']").within(() => {
            cy.contains("60").click()
        })

        cy.enterText("#field_input_packagingSize", "70")

        cy.get("[data-test='settings_product_popup_packagingUnit_drpdn']").click()
        cy.get("[data-test='settings_product_popup_packagingUnit_drpdn']").within(() => {
            cy.contains("kilograms").click()
        })

        cy.get("[data-test='settings_product_popup_packagingType_drpdn']").click()
        cy.get("[data-test='settings_product_popup_packagingType_drpdn']").within(() => {
            cy.contains("paper bags").click()
        })

        cy.get("[data-test='settings_product_popup_submit_btn']").click()
        cy.waitForUI()

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

        cy.get("[data-test='settings_product_popup_submit_btn']").click()

        cy.searchInList("My")
        cy.waitForUI()
        cy.openElement(productId, 0)

        cy.get("#field_input_intProductName")
            .should("have.value", "My product")
    })

    it("Checks error messages", () => {
        cy.settingsAdd()

        cy.get("[data-test='settings_product_popup_submit_btn']").click()

        cy.get(".error")
            .should("have.length", 11)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)|(Number value should be integer)|(Must be a number)/i)
        })
    })

    it("Deletes a product", () => {
        cy.searchInList("My")
        cy.openElement(productId, 1)

        cy.get('[data-test=confirm_dialog_proceed_btn]').click()

        cy.contains("My product").should("not.exist")

        cy.reload()
        cy.wait("@productLoading")

        cy.contains("My product").should("not.exist")
    })


    it("Cannot select noncorresponding Unit and Type", () => {
        cy.settingsAdd()
        cy.waitForUI()

        cy.get("[data-test='settings_product_popup_packagingUnit_drpdn']").click()
        cy.get("[data-test='settings_product_popup_packagingUnit_drpdn']").within(() => {
            cy.contains("kilograms").click()
        })

        cy.get("[data-test='settings_product_popup_packagingType_drpdn']").click()
        cy.get("[data-test='settings_product_popup_packagingType_drpdn']").within(() => {
            cy.contains("Drum").should("not.exist")
        })


        cy.get("[data-test='settings_product_popup_packagingUnit_drpdn']").click()
        cy.get("[data-test='settings_product_popup_packagingUnit_drpdn']").within(() => {
            cy.contains("liters").click()
        })

        cy.get("[data-test='settings_product_popup_packagingType_drpdn']").click()
        cy.get("[data-test='settings_product_popup_packagingType_drpdn']").within(() => {
            cy.contains("Bulk").should("not.exist")
        })
    })
})