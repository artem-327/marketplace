context("Inventory CRUD",() => {
	
	beforeEach(function () {
	    cy.server()
		cy.route("POST",'/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
		cy.route("GET",'/prodex/api/countries/search*').as('addingLoading')
		cy.route("GET",'/prodex/api/product-offers/*').as('offerLoading')

		cy.login("user1@example.com","echopass123")

		cy.url().should("include","inventory")

		cy.wait('@inventoryLoading')
	})

    it('Create item',() => {
		cy.contains("Inventory").click()
		cy.contains("Add Inventory").click()

		cy.wait("@addingLoading")
		cy.url().should("include","add")

        cy.selectChemical("IP550")

		cy.get("#field_dropdown_warehouse").click()
		cy.get("div[name='Test 2']").first().click()

        cy.setNumberInput("#field_input_pkgAmount","5")

        cy.setNumberInput("input[name='pricingTiers[0].price']","5")

		cy.contains("Add Product Offer").click()
		cy.contains("Go to My Inventory").click()

		cy.wait("@inventoryLoading")

		cy.contains("Isopropanol").should('be.visible')
		cy.contains("IP550").should('be.visible')
		cy.contains("Test 2").should('be.visible')
		cy.contains("5").should('be.visible')
    })

    it('See item details',() => {
        cy.getToken().then(token => {
            cy.getFirstItemId(token).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()
                cy.get('[data-test=action_' + itemId + '_0]').click()
            })
        })

		cy.wait("@offerLoading")
		cy.get("#field_dropdown_product").contains("IP550 Isopropanol")

		cy.get("#field_input_pkgAmount")
			.should("have.value","5")

		cy.get("input[name='pricingTiers[0].price']")
			.should("have.value","5")

        cy.assertProductDetail(1,"Isopropanol")
        cy.assertProductDetail(3,"IP550")
    })

	it('Update item',() => {
        cy.getToken().then(token => {
            cy.getFirstItemId(token).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()
                cy.get('[data-test=action_' + itemId + '_0]').click()
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
	
	it('Delete item',() => {
        cy.getToken().then(token => {
            cy.getFirstItemId(token).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()
                cy.get('[data-test=action_' + itemId + '_2]').click()

                cy.waitForUI()
                cy.contains("Yes").click({force: true})

                cy.get('[data-test=action_' + itemId + ']').should('not.exist')
            })
        })
    })

    it('Create item validation',() => {
		cy.contains("Inventory").click()
		cy.contains("Add Inventory").click()

		cy.wait("@addingLoading")
		cy.url().should("include","add")

		cy.contains("Add Product Offer").click()
		cy.get(".error")
			.should("have.length",2)
			.find(".sui-error-message").each((element) => {
			expect(element.text()).to.match(/(required)|(must be number)|(Amount has to be greater than 0)/i)
		})

        cy.get("#__next").within(() => {
            cy.contains("OPTIONAL PRODUCT INFO").click()
        })
		cy.get("#field_dropdown_origin").should("not.visible")

	})

    it('Create item with optional info',() => {
		cy.contains("Inventory").click()
		cy.contains("Add Inventory").click()

		cy.wait("@addingLoading")
		cy.url().should("include","add")

        cy.selectChemical("IP550")

        cy.get("#field_dropdown_warehouse").click()
        cy.get("div[name='Test 2']").first().click()

        cy.setNumberInput("#field_input_pkgAmount","5")

        cy.setNumberInput("input[name='pricingTiers[0].price']","5")

        cy.contains("OPTIONAL PRODUCT INFO").click()

		cy.get("#field_dropdown_origin").click()
		cy.contains("Dominican Republic").click()

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
        cy.get(".ui .label").eq(1).trigger("mouseover")
        cy.get('[data-test=my_inventory_lot_number]').should("be.visible")
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
})