context("Inventory CRUD",() => {
	
	beforeEach(function () {
		cy.server()
		cy.route("POST",'/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
		cy.route("GET",'/prodex/api/countries/search*').as('addingLoading')
		cy.route("GET",'/prodex/api/product-offers/*').as('offerLoading')
		cy.route("GET",'/prodex/api/products/own/search?pattern=iso&onlyMapped=false').as('search')

		cy.login("user1@example.com","echopass123")

		cy.url().should("include","inventory")

		cy.wait('@inventoryLoading')
	})

    it('Create item',() => {
		cy.contains("Inventory").click()
		cy.contains("Add Inventory").click()

		cy.wait("@addingLoading")
		cy.url().should("include","add")

		cy.get("#field_dropdown_product")
			.children("input")
			.type("iso")
			.should("have.value","iso")

		cy.wait('@search')
		cy.wait(500)
		cy.contains("IP550 Isopropanol").click({force: true})

		cy.get("#field_dropdown_warehouse").click()
		cy.get("div[name='Test 2']").first().click()
		cy.get("#field_input_pkgAmount")
			.type("5")
			.should("have.value","05")

		cy.get("input[name='pricingTiers[0].price']")
			.scrollIntoView()
			.type("5")
			.should("have.value","5")

		cy.contains("Add Product Offer").click()
		cy.contains("Go to My Inventory").click()

		cy.wait("@inventoryLoading")

		cy.contains("Isopropanol").should('be.visible')
		cy.contains("IP550").should('be.visible')
		cy.contains("Test 2").should('be.visible')
		cy.contains("5").should('be.visible')
    })

    it('See item details',() => {
		cy.contains("IP550").click()

		cy.wait("@offerLoading")
		cy.get("#field_dropdown_product").contains("IP550 Isopropanol")

		cy.get("#field_input_pkgAmount")
			.should("have.value","5")

		cy.get("input[name='pricingTiers[0].price']")
			.should("have.value","5")

		cy.get(".data-grid")
			.children()
			.eq(1).contains("Isopropanol")

		cy.get(".data-grid")
			.children()
			.eq(3).contains("IP550")
    })

	it('Update item',() => {
		cy.contains("IP550").click()

		cy.wait("@offerLoading")

		cy.get("#field_dropdown_warehouse").click()
		cy.wait(500)
		cy.get("div[name='Bayport']").first().click()
		cy.get("#field_input_pkgAmount")
			.clear()
			.type("10")
			.should("have.value","10")

		cy.contains("Save Product Offer").click()
        cy.get(".actions").within(() => {
            cy.contains("Yes").click({force: true})
        })

		cy.contains("Go to My Inventory").click()

		cy.contains("Bayport").should('be.visible')
		cy.contains("10").should('be.visible')
    })
	
	xit('Delete item',() => {
        cy.contains("IP550")
		//TODO Better selector
		cy.get(".ui .dropdown")
			.eq(7)
			.click()

		cy.contains("Delete listing").click({force: true})
        cy.wait(5000)
		cy.contains("Yes").click({force: true})

		//TODO Assert only selected element missing
		cy.contains("Isopropanol").should('not.visible')
		cy.contains("IP550").should('not.visible')
		cy.contains("Bayport").should('not.visible')
		cy.contains("10").should('not.visible')
    })

    it('Create item validation',() => {
		cy.contains("Inventory").click()
		cy.contains("Add Inventory").click()

		cy.wait("@addingLoading")
		cy.url().should("include","add")

		cy.contains("Add Product Offer").click()
		cy.get(".error")
			.should("have.length",4)
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

        cy.get("#field_dropdown_product")
            .children("input")
            .type("iso")
            .should("have.value","iso")

        cy.wait('@search')
        cy.wait(500)
        cy.contains("IP550 Isopropanol").click({force: true})

        cy.get("#field_dropdown_warehouse").click()
        cy.get("div[name='Test 2']").first().click()
        cy.get("#field_input_pkgAmount")
            .type("5")
            .should("have.value","05")

        cy.get("input[name='pricingTiers[0].price']")
            .scrollIntoView()
            .type("5")
            .should("have.value","5")


        cy.contains("OPTIONAL PRODUCT INFO").click()

		cy.get("#field_dropdown_origin").click()
		cy.contains("Dominican Republic").click()

		cy.get("#field_dropdown_productForm").click()
		cy.contains("Fiber").click()

        cy.contains("Lot Details ").children("button").click()

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
        cy.wait(1000)
        cy.get(".ui .label").eq(0).trigger("mouseover")
        cy.get('[data-test=my_inventory_lot_number]').should("be.visible")
        cy.get("div[role='listitem']").should("have.length",2)
    })
})