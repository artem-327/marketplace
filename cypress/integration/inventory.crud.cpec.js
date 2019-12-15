context("Inventory CRUD",() => {
    let filter = dsasd
    let itemId = null
	
	beforeEach(function () {
	    cy.server()
		cy.route("POST","/prodex/api/product-offers/own/datagrid*").as("inventoryLoading")
		cy.route("GET","/prodex/api/countries/search*").as("addingLoading")
		cy.route("GET","/prodex/api/product-offers/*").as("offerLoading")

        cy.FElogin("mackenzie@echoexchange.net", "echopass123")

        cy.wait("@inventoryLoading", {timeout: 100000})
		cy.url().should("include","inventory")
	})

    it("Create item",() => {
		cy.get("[data-test=my_inventory_add_btn]").click()

        cy.selectChemical("Caustic")

		cy.get("[data-test=new_inventory_warehouse_drpdn]").click()
        cy.get("[data-test=new_inventory_warehouse_drpdn]").within(() => {
            cy.contains("CGM Industries, Inc.").click()
        })

        cy.setNumberInput("[id='field_input_edit.pkgAvailable']","5")
        cy.setNumberInput("[id='field_input_edit.fobPrice']","20")

        cy.get("[data-test=sidebar_inventory_save_new]").click()

		cy.wait("@inventoryLoading")

		cy.contains("20")
		cy.contains("Houston Warehouse")
		cy.contains("5")
    })

    it("See item details",() => {
        cy.getUserToken("mackenzie@echoexchange.net", "echopass123").then(token => {
            cy.getFirstEntityWithFilter(token, 'company-products',filter).then(itemId => {

            })
        })

		cy.wait("@offerLoading")
        //TODO
		//cy.get("#field_dropdown_product").contains("IP550 Isopropanol")

		cy.get("[id='field_input_edit.pkgAvailable']")
			.should("have.value","5")

        cy.get("[id='field_input_edit.fobPrice']")
            .should("have.value","20")

        cy.get("[data-test=new_inventory_warehouse_drpdn]")
            .should("have.value","Houston Warehouse")

        cy.get("[data-test=detail_inventory_tab_documents]").click()
        cy.get("[id='field_dropdown_documents.documentType']").should("be.visible")

        cy.get("[data-test=detail_inventory_tab_priceBook]").click()
        cy.get("[data-test=broadcast_rule_row_click]").eq(0).should("be.visible")

        cy.get("[data-test=detail_inventory_tab_priceTiers]").click()
        cy.get("[data-test=field_dropdown_priceTiers.priceTiers]").should("be.visible")
    })

	it("Update item",() => {
        cy.getToken().then(token => {
            cy.getFirstItemId(token).then(itemId => {
                cy.get("[data-test=action_' + itemId + ']").click()
                cy.get("[data-test=action_' + itemId + '_0]").click()
            })
        })

		cy.wait("@offerLoading")

		cy.get("#field_dropdown_warehouse").click()
		cy.wait(500)
		cy.get("div[name='Bayport']").first().click()

        cy.setNumberInput("#field_input_pkgAmount","10")

		cy.contains("Save Product Offer").click()
        cy.get(".actions").within(() => {
            cy.contains("Yes").click({force: true})
        })

		cy.contains("Go to My Inventory").click()

		cy.contains("Bayport").should('be.visible')
		cy.contains("10").should('be.visible')
    })
	
	it("Delete item",() => {
        cy.getToken().then(token => {
            cy.getFirstItemId(token).then(itemId => {
                cy.get("[data-test=action_' + itemId + ']").click()
                cy.get("[data-test=action_' + itemId + '_4]").click()

                cy.waitForUI()
                cy.get("[data-test=confirm_dialog_proceed_btn]").click()

                cy.get("[data-test=action_' + itemId + ']").should("not.exist")
            })
        })
    })

    it("Create item validation",() => {
        cy.get("[data-test=my_inventory_add_btn]").click()

        cy.get("#field_dropdown_edit.warehouse").click()
        cy.get("#field_input_edit.fobPrice").click()

        cy.get("#sidebar_inventory_save_new").click()
		cy.get(".error")
			.should("have.length",4)
			.find(".sui-error-message").each((element) => {
			expect(element.text()).to.match(/(Required)|(Must be number)/i)
		})

        cy.get("[data-test=detail_inventory_tab_documents]").click()
		cy.contains("Save First").should("not.visible")

	})

    it('Create item with optional info',() => {
        cy.viewport(1280, 800)

		cy.contains("Inventory").click()
		cy.contains("Add Inventory").click()

		cy.wait("@addingLoading")
		cy.url().should("include","add")

        cy.selectChemical("IP550")

        cy.get("#field_dropdown_warehouse").click()
        cy.get("div[name='Test 2']").first().click()

        cy.setNumberInput("#field_input_pkgAmount","5")

        cy.setNumberInput("input[name='pricingTiers[0].price']","5")

        cy.get("[data-test=new_inventory_productOptional]").click()

		cy.get("#field_dropdown_origin").click()
		cy.contains("Angola").click()

		cy.get("#field_dropdown_productForm").click()
		cy.contains("Fiber").click()

        cy.contains("Lot Details").children("button").click()

        cy.get("input[name='lots[0].pkgAmount']")
            .clear()
            .type("4")

        cy.get("input[name='lots[1].lotNumber']")
            .clear()
            .type("2")

        cy.get("input[name='lots[1].pkgAmount']")
            .clear()
            .type("1")

        cy.contains("Add Product Offer").click({force: true})
        cy.contains("Go to My Inventory").click()

		cy.wait('@inventoryLoading')

        cy.get(".table-responsive").scrollTo("right")
        cy.waitForUI()

        cy.contains('Multiple').trigger("mouseover")
        cy.get('[data-test=array_to_multiple_list]').should("be.visible")
        cy.get("div[role='listitem']").should("have.length",2)
    })

    it('Filter inventory', () =>{
        cy.server()
        cy.route("GET",'/prodex/api/products/own/search?*').as('search')

        cy.get(".submenu-filter").click()

        //cy.get("div[class='accordion ui']").scrollTo("top")
        cy.waitForUI()

        cy.get("div[name=search]")
            .children("input")
            .type("Monomethyl",{force: true} )

        cy.wait('@search')

        cy.contains("Monomethyl (3052-50-4)").click()

        cy.contains("Apply").click()

        let filter = [{"operator":"EQUALS","path":"ProductOffer.product.id","values":[225],"description":"Chemical Name","valuesDescription":["Monomethyl (3052-50-4)"],"tagDescription":["Monomethyl (3052-50-4)"]}]

        cy.getToken().then(token => {
            cy.getFirstItemIdWithFilter(token,filter).then(itemId => {
               cy.get('[data-test=action_' + itemId + ']')
            })
        })

        cy.get("#field_input_quantityTo").type("10")
        cy.contains("Apply").click()

        cy.get(".submenu-filter").click()
        cy.contains("No records found.")
    })

    it("Set price triers", () =>{

    })

    it("Set price book", () =>{

    })
})