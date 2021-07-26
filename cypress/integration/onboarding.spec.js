describe('Onboarding', () => {
    it('successfully visits the onboarding module', () => {
        cy.FElogin('eulloa@bluepallet.io', 'echopass123')

        cy.visit('/onboarding')

        cy.url().should('include', '/onboarding')

        cy.contains('Get Verified').click()
    })
})
