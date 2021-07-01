import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
//Constants
import { URL_TERMS } from '../../../../constants'

const GridTermsAndConditions = styled(Grid)`
  margin: 14px 16px !important;
`

const SpanBold = styled.span`
  font-weight: bold;
`

const GridColumnCheckbox = styled(GridColumn)`
  .ui.checkbox {
    color: #848893 !important;
  }
  display: flex !important;
`

const LabelCheckbox = styled.label`
  padding-left: 10px;
  color: #848893;
`

const LinkLabelCheckbox = styled.a`
  padding-left: 8px;
  color: #2599d5;
`

const GridRowCheckbox = styled(GridRow)`
  padding-top: 0px !important;
  padding-bottom: 8px !important;
`

function TermsAndConditions({ formikProps, intl: { formatMessage } }) {
  return (
    <GridTermsAndConditions>
      <GridRowCheckbox>
        <GridColumn>
          <SpanBold>
            <FormattedMessage
              id='velloci.termsAndConditions.title'
              defaultMessage="Please review and accept the following terms and conditions to finish registration"
            />
          </SpanBold>
        </GridColumn>
      </GridRowCheckbox>
      <GridRowCheckbox>
        <GridColumnCheckbox>
          <Checkbox
            inputProps={{
              'data-test': 'settings_velloci_registration_terms_and_conditions_electronic_comunications_chckb'
            }}
            name='termsAndConditions.electronicComunications'
          />
          <LabelCheckbox>
            <FormattedMessage
              id='velloci.termsAndConditions.electronicComunications'
              defaultMessage='I agree that I have read, understood, and consent to the '>
              {text => (
                <>
                  {text}
                  <LinkLabelCheckbox href='https://velloci.com/ecc' target='_blank'>
                    <FormattedMessage
                      id='velloci.termsAndConditions.electronicComunications.link'
                      defaultMessage='Electronic Communications Agreement'
                    />
                  </LinkLabelCheckbox>
                </>
              )}
            </FormattedMessage>
          </LabelCheckbox>
        </GridColumnCheckbox>
      </GridRowCheckbox>
      <GridRowCheckbox>
        <GridColumnCheckbox>
          <Checkbox
            inputProps={{
              'data-test': 'settings_velloci_registration_terms_and_conditions_privacy_policy_chckb'
            }}
            name='termsAndConditions.privacyPolicy'
          />
          <LabelCheckbox>
            <FormattedMessage
              id='velloci.termsAndConditions.privacyPolicy'
              defaultMessage="I agree that I have read, understood, and consent to the ">
              {text => (
                <>
                  {text}
                  <LinkLabelCheckbox href='https://velloci.com/privacy_policy.pdf' target='_blank'>
                    <FormattedMessage
                      id='velloci.termsAndConditions.privacyPolicy.link'
                      defaultMessage='Privacy Policy '
                    />
                  </LinkLabelCheckbox>
                  <FormattedMessage id='global.and' defaultMessage='and ' />
                  <LinkLabelCheckbox href={URL_TERMS} target='_blank'>
                    <FormattedMessage id='velloci.termsAndConditions.termsOfUse.link' defaultMessage='Terms of Use' />
                  </LinkLabelCheckbox>
                </>
              )}
            </FormattedMessage>
          </LabelCheckbox>
        </GridColumnCheckbox>
      </GridRowCheckbox>
      <GridRowCheckbox>
        <GridColumnCheckbox>
          <Checkbox
            inputProps={{
              'data-test': 'settings_velloci_registration_terms_and_conditions_deposit_account_chckb'
            }}
            name='termsAndConditions.depositAccountAgreement'
          />
          <LabelCheckbox>
            <FormattedMessage
              id='velloci.termsAndConditions.depositAccountAgreement'
              defaultMessage="I agree that I have read, understood, and consent to the bank's ">
              {text => (
                <>
                  {text}
                  <LinkLabelCheckbox href='https://silamoney.com/evolve-bank-deposit-agreement/' target='_blank'>
                    <FormattedMessage
                      id='velloci.termsAndConditions.depositAccountAgreement.link'
                      defaultMessage='Deposit Account Agreement '
                    />
                  </LinkLabelCheckbox>
                  <FormattedMessage id='global.and' defaultMessage='and ' />
                  <LinkLabelCheckbox href='https://silamoney.com/terms-of-service/' target='_blank'>
                    <FormattedMessage
                      id='velloci.termsAndConditions.serviceTerms.link'
                      defaultMessage='Service terms '
                    />
                  </LinkLabelCheckbox>
                  <FormattedMessage id='global.and' defaultMessage='and ' />
                  <LinkLabelCheckbox href='https://silamoney.com/privacy-policy/' target='_blank'>
                    <FormattedMessage
                      id='velloci.termsAndConditions.privacyPolicy.link'
                      defaultMessage='Privacy Policy'
                    />
                  </LinkLabelCheckbox>
                </>
              )}
            </FormattedMessage>
          </LabelCheckbox>
        </GridColumnCheckbox>
      </GridRowCheckbox>
      <GridRowCheckbox>
        <GridColumnCheckbox>
          <Checkbox
            inputProps={{
              'data-test': 'settings_velloci_registration_terms_and_conditions_true_complete_chckb'
            }}
            name='termsAndConditions.trueComplete'
          />
          <LabelCheckbox>
            <FormattedMessage
              id='velloci.termsAndConditions.trueComplete'
              defaultMessage='I certify my answers are true and complete to the best of my knowledge.'
            />
          </LabelCheckbox>
        </GridColumnCheckbox>
      </GridRowCheckbox>
    </GridTermsAndConditions>
  )
}

TermsAndConditions.propTypes = {
  formikProps: PropTypes.object
}

TermsAndConditions.defaultProps = {
  formikProps: {}
}

export default injectIntl(TermsAndConditions)
