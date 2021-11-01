const user = require('../fixtures/user.json')

describe('Ownership Certifications', () => {
  beforeEach(() => {
    cy.FElogin(user.username, user.password)
  })

  it('should allow users to click "Submit" without uploading a certification', () => {
    cy.VisitRiskTolerance()

    cy.intercept('/prodex/api/tradepass/my-criteria', []).as('mycriteria')

    cy.get('[data-test=button-next]').click()

    cy.wait('@mycriteria')

    cy.get('[data-test=button-next]').click()

    cy.get('[data-test=modal-title]').should('have.text', 'Congratulations!')
  })

  it.skip('should redirect to /settings/bank-accounts when user clicks "Submit" and then clicks "Browse"', () => {
    cy.VisitRiskTolerance()

    cy.get('[data-test=button-next]').click()

    // cy.get('[data-test=modal-button]').click()

    // cy.url().wait(10000).should('contain', '/settings/bank-accounts')
  })

  it('should allow users to upload a certificate when required fields are provided and user clicks "Add another"', () => {
    cy.VisitRiskTolerance()

    cy.get('[data-test=button-next]').click()

    cy.fixture('../fixtures/10_02_TradePass_Onboarding_KYB.pdf', 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then(fileContent => {
        cy.get('input[type=file]').attachFile({
          fileContent,
          fileName: '10_02_TradePass_Onboarding_KYB.pdf',
          mimeType: 'application/octet-stream',
          encoding: 'utf-8',
          lastModified: new Date().getTime()
        })
      })

    cy.get('[data-test=ownership-certifications-federal]').click().find('.menu .item').eq(1).click()

    cy.intercept('/prodex/api/attachments*', []).as('attachments')

    cy.get('[data-test=ownership-certifications-add-another]').click()

    cy.wait('@attachments')
      .should('have.property', 'response')
      .should('have.property', 'statusCode', 200)
  })
})
