const user = require('../fixtures/user.json')

describe('Control Person', () => {
  beforeEach(() => {
    cy.FElogin(user.username, user.password)
  })

  it('does not allow users to move forward unless all required fields are provided', () => {
    cy.VisitControlPerson()

    cy.get('[data-test=button-next]').click()

    cy.get('.sui-error-message').should('have.length.at.least', 1)
  })

  it('does not have an ownership field when the user does not own 25% or more of the company', () => {
    cy.VisitControlPerson()

    cy.get('[data-test=control-person-is-control-person]').click()

    cy.get('[data-test=control-person-ownership-percentage]').should('have.length', 0)
  })

  it('does not allow for numeric characters in name fields', () => {
    cy.VisitControlPerson()

    cy.get('[data-test=control-person-first-name]').type('R2D2')
    cy.get('[data-test=control-person-last-name]').type('C3P0')

    cy.get('.sui-error-message').should('have.length', 2)
    cy.get('.sui-error-message').eq(0).should('have.text', 'Name must contain only letters')
    cy.get('.sui-error-message').eq(1).should('have.text', 'Name must contain only letters')
  })

  it('moves users to the next module when all required fields are provided', () => {
    cy.VisitControlPerson()

    cy.CompleteControlPerson()

    cy.get('[data-test=button-next]').click()

    cy.get('[data-test=onboarding-module-title]').should('have.text', 'Beneficial Ownership')
  })
})