const user = require('../fixtures/user.json')

describe('Certificate of Insurance', () => {
  beforeEach(() => {
    cy.FElogin(user.username, user.password)
  })

  it('does not allow users to move forward unless all required fields are provided', () => {
    cy.VisitMarketingMaterial()

    cy.CompleteMarketingMaterial()

    cy.get('[data-test=button-next]').click()

    cy.get('[data-test=button-next]').click()

    cy.get('.sui-error-message').should('have.length.at.least', 1)
  })

  it('should allow users to upload a certificate when required fields are provided and user clicks "Add another"', () => {
    cy.CompleteCertificateOfInsurance()

    cy.intercept('/prodex/api/tradepass-insurance-documents', []).as('upload')

    cy.get('[data-test=certificate-of-insurance-add-another]').click()

    cy.wait('@upload')
      .should('have.property', 'response')
      .should('have.property', 'statusCode', 200)
  })

  it('should allow users to upload a certificate and move to the next module when required fields are provided and user clicks "Next"', () => {
    cy.CompleteCertificateOfInsurance()

    cy.intercept('/prodex/api/tradepass-insurance-documents', []).as('upload')

    cy.get('[data-test=button-next]').click()

    cy.wait('@upload')
      .should('have.property', 'response')
      .should('have.property', 'statusCode', 200)

    cy.get('[data-test=onboarding-module-title]').should('have.text', 'Risk Tolerance')
  })

  it('should allow users to move to the next module by clicking "Next" after a document is uploaded by clicking "Add another"', () => {
    cy.CompleteCertificateOfInsurance()

    cy.intercept('/prodex/api/tradepass-insurance-documents', []).as('upload')
    
    cy.get('[data-test=certificate-of-insurance-add-another]').click()

    cy.get('[data-test=button-next]').click()
    
    cy.wait('@upload')
      .should('have.property', 'response')
      .should('have.property', 'statusCode', 200)

    cy.get('[data-test=onboarding-module-title]').should('have.text', 'Risk Tolerance')
  })
})
