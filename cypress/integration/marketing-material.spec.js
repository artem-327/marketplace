const user = require('../fixtures/user.json')

describe('Marketing Material', () => {
  beforeEach(() => {
    cy.FElogin(user.username, user.password)
  })

  it('should not have a back button', () => {
    cy.VisitMarketingMaterial()

    cy.get('[data-test=button-back]').should('have.length', 0)
  })
  
  it('does not allow users to move forward unless all required fields are provided', () => {
    cy.VisitMarketingMaterial()

    cy.CompleteMarketingMaterial()

    cy.get('[data-test=button-next]').click()

    cy.get('[data-test=onboarding-module-title]').should('have.text', 'Certificate of Insurance (COI)')
  })
})
