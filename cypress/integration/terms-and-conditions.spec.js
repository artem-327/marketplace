const user = require('../fixtures/user.json')

describe('Terms and conditions', () => {
    beforeEach(() => {
        cy.FElogin(user.username, user.password)
      })

    it('successfully visits the onboarding module', () => {
        cy.VisitOnboardingModule()

        cy.url().should('include', '/onboarding')
    })

    it('should navigate to the next module when all required checkboxes are checked', () => {
        cy.CompleteLegalAgreements()

        cy.get('[data-test=button-next]').click()

        cy.get('.onboarding-module-title').should('have.text', 'Business Information')
    })

    it('should not navigate to the next module unless all required checkboxes are checked', () => {
        cy.VisitOnboardingModule()

        cy.get('[data-test=button-next]').click()

        cy.get('[data-test=legal-agreements-checkbox-1] > .error.field > span').should('have.text', 'Required')
        cy.get('[data-test=legal-agreements-checkbox-2] > .error.field > span').should('have.text', 'Required')
        cy.get('[data-test=legal-agreements-checkbox-3] > .error.field > span').should('have.text', 'Required')
        cy.get('[data-test=legal-agreements-checkbox-4] > .error.field > span').should('have.text', 'Required')

        cy.get('[data-test=legal-agreements-checkbox-1]').find('.checkbox').click()

        cy.get('[data-test=button-next]').click()

        cy.get('[data-test=legal-agreements-checkbox-2] > .error.field > span').should('have.text', 'Required')
        cy.get('[data-test=legal-agreements-checkbox-3] > .error.field > span').should('have.text', 'Required')
        cy.get('[data-test=legal-agreements-checkbox-4] > .error.field > span').should('have.text', 'Required')

        cy.get('[data-test=legal-agreements-checkbox-2]').find('.checkbox').click()

        cy.get('[data-test=button-next]').click()

        cy.get('[data-test=legal-agreements-checkbox-3] > .error.field > span').should('have.text', 'Required')
        cy.get('[data-test=legal-agreements-checkbox-4] > .error.field > span').should('have.text', 'Required')

        cy.get('[data-test=legal-agreements-checkbox-3]').find('.checkbox').click()

        cy.get('[data-test=button-next]').click()

        cy.get('[data-test=legal-agreements-checkbox-4] > .error.field > span').should('have.text', 'Required')

        cy.get('[data-test=legal-agreements-checkbox-4]').find('.checkbox').click()

        cy.get('[data-test=button-next]').click()

        cy.get('.onboarding-module-title').should('have.text', 'Business Information')
    })
})
