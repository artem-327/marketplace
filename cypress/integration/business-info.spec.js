const user = require('../fixtures/user.json')

describe('Business Information', () => {
  beforeEach(() => {
    cy.FElogin(user.username, user.password)
  })

  it('does not allow users to move forward unless all required fields are provided', () => {
    cy.VisitBusinessInformation()

    cy.get('[data-test=button-next]').click()

    cy.get('.onboarding-module-title').should('have.text', 'Business Information')

    cy.get('[data-test=button-next]').click()

    cy.get('.sui-error-message').should('have.length.at.least', 1)
  })

  it('moves user to next module when all required fields are provided', () => {
    cy.VisitBusinessInformation()

    cy.get('[data-test=button-next]').click()

    cy.CompleteBusinessInformation()

    cy.get('[data-test=button-next]').click()

    cy.get('.onboarding-module-title').should('have.text', 'Control Person')
  })
})
