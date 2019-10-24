context("Company Product Catalog CRUD", () => {
    let productId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("POST", "/prodex/api/company-products/datagrid").as("productLoading")

        cy.FElogin("user1@example.com", "echopass123")

        cy.url().should("include", "inventory")

        cy.wait("@inventoryLoading")
        cy.contains("Settings").click()

        cy.contains("PRODUCT CATALOG").click()

        cy.wait("@productLoading")
        cy.waitForUI()
    })

    it("Creates a product", () => {
        cy.get("[data-test='settings_open_popup_btn']").click()

        cy.enterText("#field_input_intProductName", "Our product")
        cy.enterText("#field_input_intProductCode", "OURPR")
        cy.enterText("#field_input_packagingSize", "70")

        cy.selectFromDropdown("[data-test='settings_product_popup_packagingUnit_drpdn']","Liters")
        cy.selectFromDropdown("[data-test='settings_product_popup_packagingType_drpdn']","Tank")
        cy.selectFromDropdown("#field_dropdown_echoProduct","Sodium Special Solution")

        cy.clickSave()

        cy.contains("Created Product")

        let filter = [{"operator":"LIKE","path":"CompanyProduct.intProductCode","values":["%OURPR%"]}]

        cy.getToken().then(token => {
            cy.getFirstCompanyProductWithFilter(token, filter).then(itemId => {
                cy.openElement(itemId, 0)

                productId = itemId
            })
        })

        cy.get("#field_input_intProductName")
            .should("have.value","Our product")

        cy.get("#field_input_intProductCode")
            .should("have.value","OURPR")

        cy.get("#field_input_packagingSize")
            .should("have.value","70")

        cy.contains("Tank")
        cy.contains("Liter")
        cy.contains("Sodium Special Solution")
    })

    it("Edits a product", () => {
        cy.openElement(productId, 0)

        cy.get("#field_input_intProductName")
            .clear()
            .type("My product")
            .should("have.value","My product")

        cy.clickSave()

        cy.openElement(productId, 0)

        cy.get("#field_input_intProductName")
            .should("have.value","My product")
    })

    it("Checks error messages", () => {
        cy.clickAdd()

        cy.clickSave()

        cy.get(".error")
            .should("have.length",5)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)/i)
        })
    })

    it("Deletes a product", () => {
        cy.openElement(productId, 1)

        cy.clickSave()

        cy.contains("My product").should("not.exist")
    })


    it("Cannot select noncorresponding Unit and Type", () => {
        cy.clickAdd()

        cy.selectFromDropdown("[data-test='settings_product_popup_packagingUnit_drpdn']","Gallons")
        cy.get("[data-test='settings_product_popup_packagingType_drpdn']").click()
        cy.contains("Bag").should("not.exist")

        cy.selectFromDropdown("[data-test='settings_product_popup_packagingUnit_drpdn']","Kilograms")
        cy.get("[data-test='settings_product_popup_packagingType_drpdn']").click()
        cy.contains("Drum").should("not.exist")
    })
})