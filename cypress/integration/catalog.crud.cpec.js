context("Prodex Product Catalog CRUD", () => {
    let productId = null

    beforeEach(function () {
        cy.server()
        cy.route("POST", '/prodex/api/product-offers/own/datagrid*').as('inventoryLoading')
        cy.route("POST", '/prodex/api/products/datagrid').as('productsLoading')

        cy.login("user1@example.com", "echopass123")

        cy.url().should("include", "inventory")

        cy.wait('@inventoryLoading')
        cy.contains("Settings").click()

        cy.contains("PRODUCT CATALOG").click()

        cy.wait("@productsLoading")
        cy.waitForUI()
    })

    it("Creates a product", () => {
        cy.get("button[class='ui large primary button']").eq(0).click({force: true})

        cy.get("#field_input_productName")
            .type("Bondonium")
            .should("have.value", "Bondonium")

        cy.get("#field_input_productCode")
            .type("007B")
            .should("have.value", "007B")

        cy.get("#field_input_packagingSize")
            .type("1")
            .should("have.value", "1")

        cy.get("#field_dropdown_packagingUnit").click()
        cy.get("#field_dropdown_packagingUnit").within(() => {
            cy.contains("Liters").click()
        })

        cy.get("#field_dropdown_packagingType").click()
        cy.get("#field_dropdown_packagingType").within(() => {
            cy.contains("Steel drums").click()
        })

        cy.get("#field_input_nmfcNumber")
            .type("79547")
            .should("have.value", "79547")

        cy.get("#field_dropdown_hazardClass").click()
        cy.get("#field_dropdown_hazardClass").within(() => {
            cy.contains("1: Explosive: Division Not Specified").click()
        })

        cy.clickSave()

        cy.contains("Created Product")

        let filter = [{"operator":"LIKE","path":"Product.productName","values":["%Bondo%"]},
            {"operator":"LIKE","path":"Product.productCode","values":["%Bondo%"]}]

        cy.getToken().then(token => {
            cy.getFirstProductIdWithFilter(token, filter).then(itemId => {
                cy.get('[data-test=action_' + itemId + ']').click()

                cy.get('[data-test=action_' + itemId + '_0]').click()

                productId = itemId
            })
        })

        cy.get("#field_input_productName")
            .should("have.value","Bondonium")

        cy.get("#field_input_productCode")
            .should("have.value","007B")

        cy.get("#field_input_packagingSize")
            .should("have.value","1")

        cy.contains("Liters")
        cy.contains("Steel drums")

        cy.get("#field_input_nmfcNumber")
            .should("have.value","79547")

        cy.contains("1: Explosive: Division Not Specified")
    })

    it("Edits a product", () => {
        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_0]').click()

        cy.get("#field_input_productName")
            .clear()
            .type("Jamesonium")
            .should("have.value","Jamesonium")

        cy.clickSave()

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_0]').click()

        cy.get("#field_input_productName")
            .should("have.value","Jamesonium")
    })

    it("Creates a alternative name", () => {
        cy.route("POST", "/prodex/api/products/trade-names*").as("nameSaving")
        cy.route("GET", "/prodex/api/products/trade-names/***").as("nameGetting")

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_1]').click()

        cy.get("button[class='ui blue small icon right floated button']")
            .click()

        cy.get("input[id='field_input_productAltNames[0].tradeName']")
            .type("007onium")
            .should("have.value","007onium")

        cy.get("i[class='green save outline large icon']").click()

        cy.wait("@nameSaving")

        cy.contains("Close").click()

        cy.waitForUI()

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_1]').click()

        cy.wait("@nameGetting")

        cy.get("input[id='field_input_productAltNames[0].tradeName']")
            .should("have.value","007onium")
    })

    xit("Deletes a alternative name", () => {
        cy.route("POST", "/prodex/api/products/trade-names*").as("nameSaving")
        cy.route("GET", "/prodex/api/products/trade-names/***").as("nameGetting")

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_1]').click()

        cy.get("input[id='field_input_productAltNames[0].tradeName']")
            .should("have.value","007onium")

        cy.get("i[class='trash alternate outline large icon']").click()

        cy.wait("@nameSaving")

        cy.get("input[id='field_input_productAltNames[0].tradeName']")
            .should("not.exist")

        cy.contains("Close").click()

        cy.waitForUI()

        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_1]').click()

        cy.wait("@nameGetting")

        cy.get("input[id='field_input_productAltNames[0].tradeName']")
            .should("not.exist")
    })

    xit("Checks error messages", () => {

    })

    it("Deletes a product", () => {
        cy.get('[data-test=action_' + productId + ']').click()

        cy.get('[data-test=action_' + productId + '_2]').click()

        cy.clickSave()

        cy.contains("Bondonium").should("not.exist")
    })
})