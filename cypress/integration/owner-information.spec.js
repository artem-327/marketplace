const user = require('../fixtures/user.json')

describe('Owner Information', () => {
  beforeEach(() => {
    cy.FElogin(user.username, user.password)
  })

  it('does not allow users to move forward unless all required fields are provided', () => {
    cy.CompleteBeneficialOwershipWithAdditionalOwners()

    cy.get('[data-test=button-next]').click()

    cy.get('.sui-error-message').should('have.length.at.least', 1)
  })

  it('should add and remove form when "Add Owner" and "Remove Owner" buttons are clicked', () => {
    cy.CompleteBeneficialOwershipWithAdditionalOwners()

    cy.get('[data-test=verify-personal-information-add-owner-0]').click()
    cy.get('[data-test=verify-personal-information]').should('have.length', 2)

    cy.get('[data-test=verify-personal-information-remove-owner-0]').click()
    cy.get('[data-test=verify-personal-information]').should('have.length', 1)
  })

  it('should register the company when all required fields are provided and move the user to the next module', () => {
    cy.CompleteBeneficialOwershipWithAdditionalOwners()

    cy.CompleteOwnerInformation()

    cy.intercept('/prodex/api/payments/velloci/register', []).as('register')

    cy.get('[data-test=button-next]').click()

    cy.wait('@register')
      .should('have.property', 'response')
      .should('have.property', 'statusCode', 200)

    cy.get('[data-test=onboarding-module-title]').should('have.text', 'Marketing Material')
  })
})
