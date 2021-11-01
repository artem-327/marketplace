const user = require('../fixtures/user.json')
const fileUpload = require('cypress-file-upload')
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("FElogin", (email, password) => {
    cy.intercept('POST', '/prodex/oauth/token').as('login')
    cy.visit("")
    cy.url().should("include", "login")
    cy.get("input[name=username]")
        .type(email)
    cy.get("input[name=password]")
        .type(password)
    cy.get("[data-test=login_submit_btn]").click({force: true})

    //Assert on XHR
    cy.wait('@login').then(({ request, response }) => {
        expect(response.statusCode).to.eq(200)
    })
})

Cypress.Commands.add('VisitOnboardingModule', () => {
    cy.visit('/onboarding')
    cy.contains('Get Verified').click()
})

Cypress.Commands.add('CompleteLegalAgreements', () => {
    cy.VisitOnboardingModule()

    cy.get('[data-test=legal-agreements-checkbox-1]').find('.field').click()
    cy.get('[data-test=legal-agreements-checkbox-2]').find('.field').click()
    cy.get('[data-test=legal-agreements-checkbox-3]').find('.field').click()
    cy.get('[data-test=legal-agreements-checkbox-4]').find('.field').click()
})

Cypress.Commands.add('VisitBusinessInformation', () => {
    cy.CompleteLegalAgreements()
})

Cypress.Commands.add('CompleteBusinessInformation', () => {
    cy.get('[data-test=business-info-entity-type-dropdown]').click().find('.menu .item').eq(0).click()
    cy.get('[data-test=business-info-business-name-input]').type('My cool company')
    cy.get('[data-test=business-info-tin-ein]').type('111111111')
    cy.get('[data-test=phone-number-input]').type('3124879923')
    cy.get('[data-test=business-info-email-input]').type('admin@mycoolcompany.com')
    cy.get('[data-test=businessInfo-street-address]').type('150 N Michigan Ave')
    cy.get('[data-test=businessInfo-state-province]').click().find('.menu .item').eq(0).click()
    cy.get('[data-test=businessInfo-city]').type('Chicago')
    cy.get('[data-test=zip-code]').type('60625{enter}')
    cy.get('[data-test=business-info-industry-type]').click().find('.menu .item').eq(0).click()
    cy.get('[data-test=business-info-company-type]').click().find('.menu .item').eq(0).click()
    cy.get('[data-test=business-info-market-type]').click().find('.menu .item').eq(0).click()
})

Cypress.Commands.add('CompleteControlPerson', () => {
    cy.get('[data-test=control-person-is-control-person]').click()
    cy.get('[data-test=control-person-is-beneficial-owner]').find('.field').eq(0).click()
    cy.get('[data-test=control-person-first-name]').type('John')
    cy.get('[data-test=control-person-last-name]').type('Doe')
    cy.get('[data-test=control-person-email-address]').type('johndoe@gmail.com')
    cy.get('[data-test=phone-number-input]').type('3124879923')
    cy.get('input[name="controlPerson.dateOfBirth"]').type('12121980')
    cy.get('[data-test=controlPerson-street-address]').type('150 N Michigan Ave')
    cy.get('[data-test=address_form_country_drpdn]').click().find('.menu .item').eq(0).click()
    cy.get('[data-test=controlPerson-state-province]').click().find('.menu .item').eq(0).click()
    cy.get('[data-test=controlPerson-city]').type('Chicago')
    cy.get('[data-test=zip-code]').type('60625{enter}')
    cy.get('[data-test=control-person-ownership-percentage]').type('50')
    cy.get('[data-test=control-person-business-role]').type('CEO')
    cy.get('[data-test=control-person-ssn]').type('111-11-1111')
})

Cypress.Commands.add('VisitControlPerson', () => {
    cy.VisitBusinessInformation()
    cy.get('[data-test=button-next]').click()

    cy.CompleteBusinessInformation()
    cy.get('[data-test=button-next]').click()
})

Cypress.Commands.add('VisitBeneficialOwnership', () => {
    cy.VisitControlPerson()

    cy.CompleteControlPerson()
    cy.get('[data-test=button-next]').click()
})

Cypress.Commands.add('CompleteBeneficialOwershipWithAdditionalOwners', () => {
    cy.VisitBeneficialOwnership()

    cy.get('[data-test=beneficial-ownership-other-owners]').find('.field').eq(0).click()

    cy.get('[data-test=button-next]').click()
})

Cypress.Commands.add('CompleteBeneficialOwershipWithoutAdditionalOwners', () => {
    cy.VisitBeneficialOwnership()

    cy.get('[data-test=beneficial-ownership-other-owners]').find('.field').eq(1).click()

    cy.get('[data-test=button-next]').click()
})

Cypress.Commands.add('CompleteOwnerInformation', () => {
    cy.CompleteBeneficialOwershipWithAdditionalOwners()

    cy.get('[data-test=verify-personal-information-first-name-0]').type('Joan')
    cy.get('[data-test=verify-personal-information-middle-name-0]').type('of')
    cy.get('[data-test=verify-personal-information-last-name-0]').type('Arc')
    cy.get('[data-test=verify-personal-information-email-address-0]').type('joan@ofarc.com')
    cy.get('[data-test=phone-number-input]').type('3124879923')
    cy.get('input[name="verifyPersonalInformation[0].dateOfBirth"]').type('12121980')
    cy.get('[data-test=verifyPersonalInformation-street-address]').type('150 N Michigan Ave')
    cy.get('[data-test=verifyPersonalInformation-state-province]').click().find('.menu .item').eq(0).click()
    cy.get('[data-test=verifyPersonalInformation-city]').type('Chicago')
    cy.get('[data-test=zip-code]').type('60625{enter}')
    cy.get('[data-test=verify-personal-information-business-title-0]').type('COO')
    cy.get('[data-test=verify-personal-information-ssn-0]').type('743-21-4875')
    cy.get('[data-test=verify-personal-information-ownership-percentage-0]').type('25')
})

Cypress.Commands.add('VisitMarketingMaterial', () => {
    cy.CompleteOwnerInformation()

    cy.get('[data-test=button-next]').click()
})

Cypress.Commands.add('CompleteMarketingMaterial', () => {
    cy.get('[data-test=marketing-material-business-name]').type('My cool company')
    cy.get('[data-test=marketing-material-email-address]').type('cool@company.com')
    cy.get('[data-test=phone-number-input]').type('3124879923')
    cy.get('[data-test=marketing-material-website]').type('https://mycoolcompany.com')
})

Cypress.Commands.add('CompleteCertificateOfInsurance', () => {
    cy.VisitMarketingMaterial()

    cy.CompleteMarketingMaterial()

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

    cy.get('[data-test=certificate-of-insurance-dropdown]').click().find('.menu .item').eq(0).click()
})

Cypress.Commands.add('VisitRiskTolerance', () => {
    cy.CompleteCertificateOfInsurance()

    cy.get('[data-test=button-next]').click()
})

Cypress.Commands.add('CompleteRiskToleranceWithoutDefaults', () => {
    cy.get('[data-test=settings_trade_criteria_aggregate_insurance_drpdn]').click().find('.menu .item').eq(1).click()
    cy.get('[data-test=settings_trade_criteria_days_beyond_drpdn]').click().find('.menu .item').eq(1).click()
    cy.get('[data-test=settings_trade_criteria_credit_risk_drpdn]').click().find('.menu .item').eq(1).click()
    cy.get('[data-test=settings_trade_criteria_violations_drpdn]').click().find('.menu .item').eq(1).click()
    cy.get('[data-test=settings_trade_criteria_social_presence_drpdn]').click().find('.menu .item').eq(1).click()
})
