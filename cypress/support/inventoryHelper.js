Cypress.Commands.add("selectChemical", (chemical) => {
    cy.intercept("GET",'/prodex/api/company-products/own/search?*').as('search')

    cy.waitForUI()

    cy.get("[id='field_dropdown_edit.product']")
        .children("input")
        .type(chemical, {force: true})
        .should("have.value",chemical)

    cy.wait('@search')
    cy.wait(500)
    cy.get("[id='field_dropdown_edit.product']").within(() => {
        cy.get('div[role=option]').eq(0).click({force: true})
    })

})

Cypress.Commands.add("selectProductGroup", (group) => {
    cy.intercept("GET",'/prodex/api/product-groups/search?*').as('search')

    cy.waitForUI()

    cy.get("[id='field_dropdown_element.productGroup']")
        .children("input")
        .type(group, {force: true})
        .should("have.value",group)

    cy.wait('@search')
    cy.wait(500)
    cy.get("[id='field_dropdown_element.productGroup']").within(() => {
        cy.get('div[role=option]').eq(0).click({force: true})
    })

})

Cypress.Commands.add("assertProductDetail", (index,value) => {
    cy.get(".data-grid")
        .children()
        .eq(index).contains(value)
})

Cypress.Commands.add("openSettings", () => {
    cy.get("[data-test='navigation_menu_settings_drpdn']")
        .click()
})