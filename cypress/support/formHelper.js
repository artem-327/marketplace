Cypress.Commands.add("clickSave", () => {
    cy.get("button[class='ui primary button']").click({force: true})
    cy.wait(1000)
})

Cypress.Commands.add("clickAdd", () => {
    cy.get("[data-test='admin_table_add_btn']").click({force: true})
})

Cypress.Commands.add("settingsAdd", () => {
    cy.get("[data-test='settings_open_popup_btn']").click({force: true})
})


Cypress.Commands.add("enterText", (selector,text) => {
    cy.get(selector)
        .type(text)
        .should("have.value",text)
})

Cypress.Commands.add("searchInList", (text) => {
    cy.get("input[type=text]").type(text)
})

Cypress.Commands.add("selectFromDropdown", (selector,value) => {
    cy.get(selector)
        .children("input")
        .type(value)
        .should("have.value",value)

    cy.wait(1000)
    cy.get(selector).within(() => {
        cy.get("div[role='option']").eq(0).click({force: true})
    })
})

Cypress.Commands.add("setNumberInput", (selector,number) => {
    cy.get(selector)
        .scrollIntoView()
        .clear()
        .type(number)
        .should("have.value",number)
})
