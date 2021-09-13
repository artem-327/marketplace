import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
// Constants
import { URL_TERMS, URL_PRIVACY, URL_ECA} from '../../../../constants'

const GridTermsAndConditions = styled(Grid)`
  margin: 14px 16px !important;
`

const StyledSpan = styled.span`
  color: #989898;
  font-style: italic;
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
  color: #3bbef6;
  font-weight: bold;
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
          <StyledSpan>
            <FormattedMessage id='velloci.termsAndConditions.electronicComunications' />
          </StyledSpan>
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
            <LinkLabelCheckbox href={URL_ECA} target='_blank'>
              <FormattedMessage
                id='velloci.termsAndConditions.electronicComunications.link'
                defaultMessage='Electronic Communications Agreement'
              />
            </LinkLabelCheckbox>
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
            <LinkLabelCheckbox href={URL_PRIVACY} target='_blank'>
              <FormattedMessage
                id='velloci.termsAndConditions.privacyPolicy.link'
                defaultMessage='Privacy Policy '
              />
            </LinkLabelCheckbox>
            <FormattedMessage id='global.and' defaultMessage='and ' />{' '}
            <LinkLabelCheckbox href={URL_TERMS} target='_blank'>
              <FormattedMessage id='velloci.termsAndConditions.termsOfUse.link' defaultMessage='Terms of Use' />
            </LinkLabelCheckbox>
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
            <LinkLabelCheckbox href='https://silamoney.com/evolve-bank-deposit-agreement/' target='_blank'>
              <FormattedMessage id='velloci.termsAndConditions.depositAccountAgreement.link' />
            </LinkLabelCheckbox>{', '}
            <LinkLabelCheckbox href='https://silamoney.com/terms-of-service/' target='_blank'>
              <FormattedMessage id='velloci.termsAndConditions.serviceTerms.link' />
            </LinkLabelCheckbox>{', '}
            <FormattedMessage id='global.and' defaultMessage='and ' />{' '}
            <LinkLabelCheckbox href='https://silamoney.com/privacy-policy/' target='_blank'>
              <FormattedMessage id='velloci.termsAndConditions.privacyPolicy.link' />
            </LinkLabelCheckbox>
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
