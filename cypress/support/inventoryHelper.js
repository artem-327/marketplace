Cypress.Commands.add("selectChemical", (chemical) => {
    cy.server()
    cy.route("GET",'/prodex/api/company-products/own/search?*').as('search')

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

Cypress.Commands.add("assertProductDetail", (index,value) => {
    cy.get(".data-grid")
        .children()
        .eq(index).contains(value)
})