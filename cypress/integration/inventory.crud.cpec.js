context("Inventory CRUD", () => {
    let filter = null
    let productName = null
    const userJSON = require('../fixtures/user.json')

    before(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getInventoryDatagridBody(token).then(inventoryBody => {
               // cy.deleteEntity(token,'product-offers',inventoryBody[0].id)
                //TODO Found out why some assigning doesn't work
                let helper = inventoryBody[1].companyProduct.intProductName
                let idHelper = inventoryBody[1].companyProduct.id

                productName = helper
                filter = [{"operator": "EQUALS", "path": "ProductOffer.companyProduct.id", "values": [idHelper]}]
            })
        })
    })

    beforeEach(function () {
        cy.viewport(3000, 2000)
        cy.server()
        cy.route("POST", "/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
        cy.route("GET", "/prodex/api/countries/search*").as("addingLoading")
        cy.route("GET", "/prodex/api/product-offers/*").as("offerLoading")

        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()
        cy.visit("/inventory/my")
        cy.wait("@inventoryLoading", {timeout: 100000})
        cy.url().should("include", "inventory")
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
        cy.setNumberInput("[id='field_input_edit.costPerUOM']", "0")

        cy.get("[data-test=sidebar_inventory_save_new]").click({force:true})
        cy.get('[data-test=confirm_dialog_cancel_btn]').click()

        cy.wait("@inventoryLoading")

        cy.contains("20")
        cy.contains("Cargo")
        cy.contains("5")
        cy.contains(productName)
    })

    it("Update item", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'product-offers/own', filter).then(itemId => {
                cy.get("[data-test=action_" + itemId + "]").click()
                cy.get("[data-test=action_" + itemId + "_0]").click()
            })
        })

        cy.wait("@offerLoading")

        cy.get("[data-test=new_inventory_warehouse_drpdn]").click()
        cy.get("[data-test=new_inventory_warehouse_drpdn]").within(() => {
            cy.contains("Mercer Distribution Services").click()
        })

        cy.setNumberInput("[id='field_input_edit.pkgAvailable']", "10")

        cy.get("[data-test=sidebar_inventory_save_new]").click()
        cy.contains("Success")

        cy.contains("Mercer Distribution Services").should('be.visible')
    })

    it("See item details", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'product-offers/own', filter).then(itemId => {
                cy.get("[data-test=action_" + itemId + "]").click()
                cy.get("[data-test=action_" + itemId + "_0]").click()
            })
        })

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
                cy.get("[data-test=action_" + itemId + "]").click()
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

        cy.get("[data-test=sidebar_inventory_save_new]").click({force:true})
        cy.get(".error")
            .should("have.length", 4)
            .find(".sui-error-message").each((element) => {
            expect(element.text()).to.match(/(Required)|(Must be a number)/i)
        })

        cy.get("[data-test=detail_inventory_tab_documents]").eq(0).click()
        cy.contains("Save First").should("visible")

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
        cy.setNumberInput("[id='field_input_edit.costPerUOM']", "0")
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

        cy.get("[data-test=sidebar_inventory_save_new]").click({force: true})

        cy.contains("20")
        cy.contains("Cargo")
        cy.contains("5")
    })

    it('Filter inventory', () => {
        cy.server()
        cy.route("GET", '/prodex/api/company-products/own/search?*').as('search')

        cy.waitForUI()

        cy.get("div[name=search]")
            .children("input")
            .type(productName, {force: true})

        cy.wait('@search')

        cy.get("[role=listbox]").within(() => {
            cy.contains(productName).click()
        })

        cy.contains("Apply").click()

        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstItemIdWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']')
            })
        })

        cy.get("[name=quantity]").click()
        cy.get("#field_input_quantityTo").type("10")
        cy.contains("Apply").click()

        cy.contains("No records found.")
    })

    it("Set price triers", () => {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.getFirstEntityWithFilter(token, 'product-offers/own', filter).then(itemId => {
                cy.get("[data-test=action_" + itemId + "]").click()
                cy.get("[data-test=action_" + itemId + "_4]").click()
            })
        })

        cy.get("[data-test='new_inventory_price_tiers_drpdn']", {timeout: 10000}).click()
        cy.get("[data-test='new_inventory_price_tiers_drpdn']").within(() => {
            cy.contains("2").click()
        })

        cy.setNumberInput("[id='field_input_priceTiers.pricingTiers[1].quantityFrom']", '10')
        cy.setNumberInput("[id='field_input_priceTiers.pricingTiers[1].price']", '30')

        cy.get("[data-test='sidebar_inventory_save_new']").click()

        cy.contains("Success")
    })

})