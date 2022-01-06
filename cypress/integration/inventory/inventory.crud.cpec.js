context("Inventory CRUD", () => {
    let filter = null
    let filterQuantity = null
    let productName = null
    let offerId = null
    const userJSON = require('../../fixtures/user.json')

    before(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getMyProductsBody(token).then(productBody => {
                // cy.deleteEntity(token,'product-offers',inventoryBody[0].id)
                //TODO Found out why some assigning doesn't work
                let helper = productBody[ 0 ].intProductCode
                let idHelper = productBody[ 0 ].id

                productName = helper
                filter = [{ "operator": "EQUALS", "path": "ProductOffer.companyProduct.id", "values": [idHelper] }]
                filterQuantity = [{
                    "operator": "EQUALS",
                    "path": "ProductOffer.companyProduct.id",
                    "values": [idHelper]
                }, { "operator": "GREATER_THAN_OR_EQUAL_TO", "path": "ProductOffer.quantity", "values": ["10"] }]
            })
        })
    })

    beforeEach(function () {
        cy.viewport(3000, 2000)
        cy.intercept("GET", '/prodex/api/dashboard*').as('dashboardLoading')
        cy.intercept("POST", "/prodex/api/product-offers/").as("newOffer")
        cy.intercept("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.intercept("GET", "/prodex/api/countries/search*").as("addingLoading")
        cy.intercept("GET", "/prodex/api/company-products/own/search*").as("offerLoading")

        cy.FElogin(userJSON.email, userJSON.password)
        cy.waitForUI()
        cy.wait("@dashboardLoading", { timeout: 100000 })
        cy.url().should("include", "dashboard")

        cy.waitForUI()
        cy.get("[data-test=navigation_menu_inventory_drpdn]", { timeout: 100000 }).click()
        cy.wait("@inventoryLoading", { timeout: 100000 })
        cy.url().should("include", "inventory")
    })

    after(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'product-offers/own', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-offers', itemId)
            })
            cy.getFirstEntityWithFilter(token, 'product-offers/own', filter).then(itemId => {
                if (itemId != null)
                    cy.deleteEntity(token, 'product-offers', itemId)
            })
        })
    })

    it("Create item", () => {
        cy.get("[data-test=my_inventory_add_btn]").click()

        cy.selectChemical(productName)

        cy.get("[data-test=new_inventory_warehouse_drpdn]").click()
        cy.get("[data-test=new_inventory_warehouse_drpdn]").within(() => {
            cy.contains("Cargo").click()
        })

        cy.setNumberInput("[id='field_input_edit.pkgAvailable']", "5")
        cy.setNumberInput("[id='field_input_edit.fobPrice']", "20")

        cy.get("[data-test=modal_inventory_save_new]").click({ force: true })
        cy.wait("@newOffer").then(({ request, response }) => {
            expect(response.statusCode).to.eq(201)
            offerId = response.body.id
            cy.log(offerId)
        })

        cy.get('[data-test=confirm_dialog_cancel_btn]').click()

        cy.wait("@inventoryLoading")

        cy.contains("20")
        cy.contains("Cargo")
        cy.contains("5")
        cy.contains(productName)
    })

    it("Update item", () => {
        cy.get("[data-test=action_" + offerId + "_0]").parent().parent().click({ force: true })
        cy.get("[data-test=action_" + offerId + "_0]").click()

        cy.wait("@offerLoading")

        cy.get("[data-test=new_inventory_warehouse_drpdn]").click()
        cy.get("[data-test=new_inventory_warehouse_drpdn]").within(() => {
            cy.contains("Mercer Distribution Services").click()
        })

        cy.setNumberInput("[id='field_input_edit.pkgAvailable']", "10")

        cy.get("[data-test=modal_inventory_save_new]").click()
        cy.contains("Success")

        cy.contains("Mercer Distribution Services").should('exist')
    })

    it("See item details", () => {
        cy.get("[data-test=action_" + offerId + "_0]").parent().parent().click({ force: true })
        cy.get("[data-test=action_" + offerId + "_0]").click()

        cy.wait("@offerLoading")

        cy.get("[id='field_dropdown_edit.product']").contains(productName)

        cy.get("[id='field_input_edit.pkgAvailable']")
            .should("have.value", "10")

        cy.get("[id='field_input_edit.fobPrice']")
            .should("have.value", "20")

        cy.contains("Mercer Distribution Services")

        cy.get("[data-test=detail_inventory_tab_documents]").eq(0).click()
        cy.contains("Property").should("be.visible")

        cy.get("[data-test=detail_inventory_tab_documents]").eq(1).click()
        cy.get("[id='field_dropdown_documents.documentType']").should("be.visible")

        cy.get("[data-test=detail_inventory_tab_priceBook]").click()
        cy.get("[data-test=broadcast_rule_row_click]").eq(0).should("be.visible")

        cy.get('[data-test=detail_inventory_tab_priceTiers]').click()
        cy.get('[data-test=detail_inventory_tab_priceTiers]').should("be.visible")
    })

    it("Delete item", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'product-offers/own', filter).then(itemId => {
                cy.get("[data-test=action_" + itemId + "_5]").parent().parent().click({ force: true })
                cy.get("[data-test=action_" + itemId + "_5]").click()

                cy.waitForUI()
                cy.get("[data-test=confirm_dialog_proceed_btn]").click()

                cy.get("[data-test=action_" + itemId + "]").should("not.exist")
            })
        })
    })

    it("Create item validation", () => {
        cy.get("[data-test=my_inventory_add_btn]").click()

        cy.get("[id='field_input_edit.pkgAvailable']").click()
        cy.get("[id='field_input_edit.fobPrice']").click()

        cy.get("[data-test=modal_inventory_save_new]").click({ force: true })
        cy.get(".error")
            .should("have.length", 3)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)|(Must be a number)/i)
        })

        cy.get("[data-test=detail_inventory_tab_documents]").eq(0).click()
        cy.contains("Errors on form").should("be.visible")

    })

    it('Create item with optional info', () => {
        cy.get("[data-test=my_inventory_add_btn]").click()

        cy.selectChemical(productName)

        cy.get("[data-test=new_inventory_warehouse_drpdn]").click()
        cy.get("[data-test=new_inventory_warehouse_drpdn]").within(() => {
            cy.contains("Cargo").click()
        })

        cy.setNumberInput("[id='field_input_edit.pkgAvailable']", "5")
        cy.setNumberInput("[id='field_input_edit.fobPrice']", "20")

        cy.contains("Optional Information").find("svg").click()
        cy.waitForUI()
        cy.get("[id='field_input_edit.costPerUOM']").should("be.visible")

        cy.setNumberInput("[id='field_input_edit.costPerUOM']", "5")
        cy.enterText("[id='field_textarea_edit.internalNotes']", "Hello")
        cy.enterText("[id='field_textarea_edit.externalNotes']", "Hello")

        cy.get("[data-test=new_inventory_conforming_drpdn]").click()
        cy.get("[data-test=new_inventory_conforming_drpdn]").within(() => {
            cy.contains("Non Conforming").click()
        })
        cy.enterText("[id='field_input_edit.conditionNotes']", "Hello")


        cy.get("[data-test=new_inventory_form_drpdn]").click()
        cy.get("[data-test=new_inventory_form_drpdn]").within(() => {
            cy.contains("Briquettes").click()
        })

        cy.get("[data-test=new_inventory_grade_drpdn]").click()
        cy.get("[data-test=new_inventory_grade_drpdn]").within(() => {
            cy.contains("Feed").click()
        })

        cy.get("[data-test=add_inventory_instock]").click()
        cy.get("[data-test=add_inventory_instock]").within(() => {
            cy.contains("Yes").click()
        })

        cy.get("[data-test=modal_inventory_save_new]").click({ force: true })

        cy.contains("20")
        cy.contains("Cargo")
        cy.contains("5")
    })

    it('Filter inventory', () => {
        cy.intercept("GET", '/prodex/api/company-products/own/search?*').as('search')

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getMyProductsBody(token).then(productBody => {
                let productId = productBody[ 0 ].id
                cy.getFirstEntityWithFilter(token, 'branches/warehouses', []).then(warehouseId => {
                    cy.createProductOffer(token, productId, warehouseId).then(offer => {
                    })
                })
            })
        })

        cy.waitForUI()
        cy.get("[data-test='my_inventory_advanced_filters_btn']").click()
        cy.waitForUI()
        cy.get("div[name=search]")
            .children("input")
            .type(productName, { force: true })

        cy.wait('@search')
        cy.get("div[name=search]").within(() => {
            cy.get("[role=listbox]").within(() => {
                cy.contains(productName).click()
            })
        })

        cy.contains("Apply").click()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstItemIdWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + '_0]')
            })
        })

        cy.get("[data-test='my_inventory_advanced_filters_btn']").click()
        cy.waitForUI()
        cy.get("#field_input_quantityTo").type("10")
        cy.contains("Apply").click()

        cy.contains("No records found.")
    })

    it("Set price triers", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'product-offers/own', filter).then(itemId => {
                cy.get("[data-test=action_" + itemId + "_4]").parent().parent().click({ force: true })
                cy.get("[data-test=action_" + itemId + "_4]").click()
            })
        })

        cy.get("div[class*='DivButtonPlus']", { timeout: 10000 }).click()

        cy.setNumberInput("[id='field_input_priceTiers.pricingTiers[1].quantityFrom']", '10')
        cy.setNumberInput("[id='field_input_priceTiers.pricingTiers[1].price']", '30')

        cy.get("[data-test='modal_inventory_save_new']").click()

        cy.contains("Success")
    })

})