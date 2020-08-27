import React from 'react'
import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Input, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Info, UploadCloud } from 'react-feather'

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
`

const LinkLabelCheckbox = styled.a`
  padding-left: 8px;
`

function TermsAndConditions({ formikProps, intl: { formatMessage } }) {
  return (
    <GridTermsAndConditions>
      <GridRow>
        <GridColumn>
          <SpanBold>
            <FormattedMessage
              id='velloci.termsAndConditions.title'
              defaultMessage="Here are a few legal terms that you'll have to read and accept before finishing"
            />
          </SpanBold>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumnCheckbox>
          <Checkbox
            inputProps={{
              'data-test': 'settings_velloci_registration_terms_and_conditions_chckb'
            }}
            name='electronicComunications'
          />
          <LabelCheckbox>
            <FormattedMessage
              id='velloci.termsAndConditions.electronicComunications1'
              defaultMessage='I agree that I have read, understood and consent to the'>
              {text => (
                <>
                  {text}
                  <LinkLabelCheckbox href='https://www.echosystem.com/terms-of-service' target='_blank'>
                    <FormattedMessage
                      id='velloci.termsAndConditions.electronicComunications2'
                      defaultMessage='Electronic Communications Agreement'
                    />
                  </LinkLabelCheckbox>
                </>
              )}
            </FormattedMessage>
          </LabelCheckbox>
        </GridColumnCheckbox>
      </GridRow>
    </GridTermsAndConditions>
  )
}

TermsAndConditions.propTypes = {
  formikProps: PropTypes.object
}

export default injectIntl(TermsAndConditions)
