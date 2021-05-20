const user = require('../fixtures/user.json')

describe('Risk Tolerance', () => {
  beforeEach(() => {
    cy.FElogin(user.username, user.password)
  })

  it('should allow users to move to the next module with default values', () => {
    cy.VisitRiskTolerance()

    cy.get('[data-test=button-next]').click()

    cy.get('[data-test=onboarding-module-title]').should('have.text', 'Ownership Certifications (Optional)')
  })

  it('should call my-criteria endpoint when user clicks "Next" and submit with selected values', () => {
    cy.VisitRiskTolerance()

    cy.CompleteRiskToleranceWithoutDefaults()

    cy.intercept('/prodex/api/tradepass/my-criteria', []).as('mycriteria')

    cy.get('[data-test=button-next]').click()

    cy.wait('@mycriteria')
      .should('have.property', 'response')
      .should('have.property', 'statusCode', 200)

    cy.get('@mycriteria')
      .should('have.property', 'request')
      .should('have.property', 'body')
      .should('deep.equal', {
        'aggregate_insurance': 'OPTION_1',
        'credit_risk': 'OPTION_1',
        'days_beyond': 'OPTION_1',
        'social_presence': 'OPTION_1',
        'violations': 'OPTION_1'
      })
  })
})
