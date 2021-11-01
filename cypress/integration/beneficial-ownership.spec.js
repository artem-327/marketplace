const user = require('../fixtures/user.json')

describe('Beneficial Ownership', () => {
  beforeEach(() => {
    cy.FElogin(user.username, user.password)
  })

  it('should render 3 buttons when user clicks "Yes"', () => {
    cy.VisitBeneficialOwnership()

    cy.get('[data-test=beneficial-ownership-other-owners]').find('.field').eq(0).click()

    cy.get('[data-test=button-row]').find('button').should('have.length', 3)
  })

  it('should send out an email to emailed beneficial owners', () => {
    cy.VisitBeneficialOwnership()

    cy.get('[data-test=beneficial-ownership-other-owners]').find('.field').eq(0).click()

    cy.get('[data-test=button-email]').click()

    cy.get('[data-test=beneficial_owner_name0_inp]').type('Jane Doe')
    cy.get('[data-test=beneficial_owner_email0_inp]').type('janedoe@gmail.com')

    cy.get('[data-test=beneficial_owner_emails_add_btn]').click()

    cy.get('[data-test=beneficial_owner_name1_inp]').type('Albert Einstein')
    cy.get('[data-test=beneficial_owner_email1_inp]').type('einstein@genius.com')

    const serverResponse = {
      "messages": [
        { "clientMessage": "2 invitations sent.", "level": "SUCCESS" }
      ]
    }

    const expectedRequestBody = [
      { email: 'janedoe@gmail.com', name: 'Jane Doe' },
      { email: 'einstein@genius.com', name: 'Albert Einstein' }
    ]

    cy.intercept('POST', '/prodex/api/payments/velloci/users/invite-beneficial-owners?companyId=null', serverResponse).as('invite')

    cy.get('[data-test=beneficial_owner_emails_submit_btn]').click()

    cy.wait('@invite')
      .should('have.property', 'response')
      .should('have.property', 'statusCode', 200)
    cy.get('@invite')
      .should('have.property', 'request')
      .should('have.property', 'body')
      .should('have.property', 'invitations')
      .should('deep.equal', expectedRequestBody)
    cy.get('[data-test=modal-title]').should('have.text', 'Email(s) Sent')
  })

  it('should register the company if user clicks "No" and move to the next module', () => {
    cy.VisitBeneficialOwnership()

    cy.get('[data-test=beneficial-ownership-other-owners]').find('.field').eq(1).click()

    const serverResponse = {
      "messages": [
        { "clientMessage": "Business registration complete!", "level": "SUCCESS" }
      ]
    }

    cy.intercept('/prodex/api/payments/velloci/register', serverResponse).as('register')

    cy.get('[data-test=button-next]').click()
    cy.wait('@register')
      .should('have.property', 'response')
      .should('have.property', 'statusCode', 200)

    cy.get('.onboarding-module-title').should('have.text', 'Marketing Material')
  })

  it('should move the user to the next module when they click "Yes"', () => {
    cy.CompleteBeneficialOwershipWithAdditionalOwners()

    cy.get('.onboarding-module-title').should('have.text', 'Owner Information')
  })
})
