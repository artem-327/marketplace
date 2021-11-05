context("Checkout Addresses CRUD", () => {

    const userJSON = require("../../fixtures/user2.json")

    before(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.deleteWholeCart(token)
            cy.getMarketPlaceDatagridBody(token).then(marketPlaceBody => {
                let suitableOffers = marketPlaceBody.filter(function (entry) {
                    return entry.minPkg == 1
                })

                cy.addToCart(token, suitableOffers[ 0 ].id, 1, suitableOffers[ 0 ].sellerId)
            })
        })
    })

    beforeEach(function () {
        cy.viewport(2500, 3500)
        cy.intercept("GET", "/prodex/api/cart").as("cartLoading")
        cy.intercept("GET", "/prodex/api/dashboard*").as("inventoryLoading")
        cy.intercept("GET", "/prodex/api/delivery-addresses/search-broadcasted-by-cart").as("addressLoading")
        cy.intercept("/prodex/api/branches*").as("warehouseCreate")
        cy.intercept("PUT", "/prodex/api/branches/**").as("warehouseUpdate")
        cy.intercept("/prodex/api/delivery-addresses*").as("deliveryCreate")
        cy.intercept("PUT", "/prodex/api/delivery-addresses/**").as("deliveryUpdate")


        cy.FElogin(userJSON.email, userJSON.password)

        cy.waitForUI()
        cy.wait("@inventoryLoading", { timeout: 30000 })
        cy.visit("/purchase-order")
        cy.wait("@cartLoading")

        cy.contains("button", "Confirm Items").click()
        cy.wait("@addressLoading")
    })

    after(function () {
        cy.getUserToken(userJSON.email, userJSON.password).then(token => {
            cy.deleteWholeCart(token)

            let filter = [{ "operator": "LIKE", "path": "Branch.deliveryAddress.addressName", "values": ["%Checkout%"] }]
            cy.getFirstEntityWithFilter(token, 'branches/warehouses', filter).then(itemId => {
                if (itemId != null) {
                    cy.deleteEntity(token, 'branches', itemId)
                }
            })

            filter = [{ "operator": "LIKE", "path": "DeliveryAddress.addressName", "values": ["%Address%"] }]
            cy.getFirstEntityWithFilter(token, 'delivery-addresses', filter).then(itemId => {
                if (itemId != null) {
                    cy.deleteEntity(token, 'delivery-addresses/id', itemId)
                }
            })
        })
    })

    it("Add new warehouse", () => {
        cy.contains("button", "Add New").click()

        cy.enterText("input[id='field_input_addressName']", "Checkout Warehouse")
        cy.enterText("input[id='field_input_address.streetAddress']", "130 N G St")
        cy.enterText("input[id='field_input_address.city']", "Harlingen")

        cy.selectFromDropdown("div[data-test=address_form_country_drpdn]", "USA")
        cy.waitForUI()
        cy.selectFromDropdown("div[id='field_dropdown_address.province']", "Arizona")
        cy.waitForUI()
        cy.selectFromDropdown("div[id='field_dropdown_address.zip']", "75000")

        cy.enterText("input[id='field_input_contactName']", "David Cameron")
        cy.get("span[class='phone-number']").within(($form) => {
            cy.get("input[placeholder = 'Phone Number']").type("2025550156")
        })
        cy.enterText("input[id='field_input_contactEmail']", "test@central.com")

        cy.get("[data-test='checkout_add_address_save']").click()
        cy.wait("@warehouseCreate").then(({ request, response }) => {
            expect(response.statusCode).to.eq(201)
        })
        cy.waitForUI()
    })

    it("Edit warehouse", () => {
        cy.contains("Checkout Warehouse").parent().parent().find("svg[class*='IconEdit']").click()

        cy.waitForUI()
        cy.get("input[id='field_input_addressName']")
            .clear()
            .type("Checkout Edited")
            .should("have.value", "Checkout Edited")

        cy.get("[data-test='checkout_add_address_save']").click()
        cy.wait("@warehouseUpdate").then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })
    })

    it("Search warehouse", () => {
        cy.searchInList("Checkout")

        cy.contains("Checkout Edited").should("be.visible")
    })

    it("Add new delivery address", () => {
        cy.contains("div", "Delivery Addresses").click()
        cy.contains("button", "Add New").click()

        cy.enterText("input[id='field_input_addressName']", "Checkout Address")
        cy.enterText("input[id='field_input_address.streetAddress']", "135 N G St")
        cy.enterText("input[id='field_input_address.city']", "Harlingens")

        cy.selectFromDropdown("div[data-test=address_form_country_drpdn]", "USA")
        cy.waitForUI()
        cy.selectFromDropdown("div[id='field_dropdown_address.province']", "Arizona")
        cy.waitForUI()
        cy.selectFromDropdown("div[id='field_dropdown_address.zip']", "76000")

        cy.enterText("input[id='field_input_contactName']", "David Cameron")
        cy.get("span[class='phone-number']").within(($form) => {
            cy.get("input[placeholder = 'Phone Number']").type("2025550156")
        })
        cy.enterText("input[id='field_input_contactEmail']", "test@central.com")

        cy.get("[data-test='checkout_add_address_save']").click()
        cy.wait("@deliveryCreate").then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })
        cy.waitForUI()
    })

    it("Edit delivery address", () => {
        cy.contains("div", "Delivery Addresses").click()
        cy.contains("Checkout Address").parent().parent().find("svg[class*='IconEdit']").click()

        cy.waitForUI()
        cy.get("input[id='field_input_addressName']")
            .clear()
            .type("Checkout Address Edited")
            .should("have.value", "Checkout Address Edited")

        cy.get("[data-test='checkout_add_address_save']").click()
        cy.wait("@deliveryUpdate").then(({ request, response }) => {
            expect(response.statusCode).to.eq(200)
        })
        cy.waitForUI()
    })

    it("Search delivery address", () => {
        cy.contains("div", "Delivery Addresses").click()
        cy.searchInList("Checkout")

        cy.contains("Checkout Address Edited").should("be.visible")
    })
})
