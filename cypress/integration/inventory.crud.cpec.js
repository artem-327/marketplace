context("Inventory CRUD",() => {
	
	beforeEach(function () {
		cy.login("user1@example.com","echopass123")

		cy.url().should("include","inventory")
		cy.wait(500)
	})

    it('Create item',() => {
		cy.server()
		cy.route('/prodex/api/products/own/search?pattern=iso&onlyMapped=false').as('search')

		cy.contains("Inventory").click()
		cy.contains("Add Inventory").click()

		cy.wait(500)
		cy.url().should("include","add")

		cy.get("#field_dropdown_product")
			.children("input")
			.type("iso")
			.should("have.value","iso")

		cy.wait('@search')
		cy.wait(1000)
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

		cy.contains("Isopropanol").should('be.visible')
		cy.contains("IP550").should('be.visible')
		cy.contains("Test 2").should('be.visible')
		cy.contains("5").should('be.visible')
    })

    it('See item details',() => {
		cy.contains("IP550").click()

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
       
    })
	
	it('Delete item',() => {
       
    })

    it('Create item validation',() => {

    })

    it('Create item with optional info',() => {

    })
})