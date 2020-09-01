import React from 'react'
import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Info } from 'react-feather'
//Components
import {
  Rectangle,
  CustomDivContent,
  CustomDivInTitle,
  CustomDivTitle
} from '~/modules/cart/components/StyledComponents'
import { AddressForm } from '~/modules/address-form'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'

const GridBusinessInfo = styled(Grid)`
  margin: 14px 16px !important;
`

const ColumnCustom = styled(Grid.Column)`
  .ui.input input,
  .phone-code,
  .phone-num {
    background: #fdfdfd !important;
  }
`

const DivLegalAddressTitle = styled.div`
  font-weight: bold;
`

function BusinessInfo({ formikProps, intl: { formatMessage } }) {
  return (
    <GridBusinessInfo>
      <GridRow>
        <GridColumn>
          <Rectangle style={{ margin: '0px' }}>
            <CustomDivTitle>
              <Info size={20} style={{ color: '#2599d5' }} />
              <CustomDivInTitle>
                <FormattedMessage id='velloci.businessInfo.infoTitle' defaultMessage='Why do you need this info?' />
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent style={{ color: '#848893', padding: '4px 30px' }}>
              <FormattedMessage
                id='velloci.businessInfo.infoContent'
                defaultMessage='In order to verify the business you are opening an account for, we need to collect this information. We never share this information.'
              />
            </CustomDivContent>
          </Rectangle>
        </GridColumn>
      </GridRow>
      <GridRow columns={3}>
        <ColumnCustom>
          <PhoneNumber
            name='businessInfo.phoneNumber'
            values={formikProps.values}
            label={
              <>
                <FormattedMessage id='velloci.businessInfo.phoneNumber' defaultMessage='Personal Phone Number' />
                <Required />
              </>
            }
            setFieldValue={formikProps.setFieldValue}
            setFieldTouched={formikProps.setFieldTouched}
            errors={formikProps.errors}
            touched={formikProps.touched}
            isSubmitting={formikProps.isSubmitting}
            setErrors={formikProps.setErrors}
            placeholder={formatMessage({ id: 'global.phonePlaceholder', defaultMessage: '000 000 0000' })}
          />
        </ColumnCustom>
        <ColumnCustom>
          <Input
            name='businessInfo.emailAddress'
            label={
              <>
                {formatMessage({
                  id: 'velloci.businessInfo.emailAddress',
                  defaultMessage: 'Personal Phone Number'
                })}
                {<Required />}
              </>
            }
            inputProps={{
              placeholder: formatMessage({
                id: 'velloci.businessInfo.emailAddress.placeholder',
                defaultMessage: 'Enter your email address'
              }),
              type: 'text',
              'data-test': 'settings_velloci_registration_business_info_email_address_inpt'
            }}
          />
        </ColumnCustom>
        <ColumnCustom>
          <Input
            name='businessInfo.url'
            label={formatMessage({
              id: 'velloci.businessInfo.url',
              defaultMessage: 'URL'
            })}
            inputProps={{
              placeholder: formatMessage({
                id: 'velloci.businessInfo.url.placeholder',
                defaultMessage: 'Enter your business URL'
              }),
              type: 'url',
              'data-test': 'settings_velloci_registration_business_info_url_inpt'
            }}
          />
        </ColumnCustom>
      </GridRow>
      <GridRow>
        <GridColumn>
          <DivLegalAddressTitle>
            <FormattedMessage id='velloci.businessInfo.legalAddress' defaultMessage='Your Legal Address' />
          </DivLegalAddressTitle>

          <AddressForm
            prefix='businessInfo'
            values={formikProps.values}
            displayHeader={false}
            setFieldValue={formikProps.setFieldValue}
            required={true}
          />
        </GridColumn>
      </GridRow>
      <GridRow>
        <ColumnCustom>
          <Input
            name='businessInfo.dbaName'
            label={formatMessage({
              id: 'velloci.businessInfo.dbaName',
              defaultMessage: 'DBA Name (if applicable)'
            })}
            inputProps={{
              placeholder: formatMessage({
                id: 'velloci.businessInfo.dbaName.placeholder',
                defaultMessage: 'Business Name'
              }),
              type: 'text',
              'data-test': 'settings_velloci_registration_business_info_dba_name_inpt'
            }}
          />
          <Rectangle style={{ margin: '0px' }}>
            <CustomDivTitle>
              <Info size={20} style={{ color: '#2599d5' }} />
              <CustomDivInTitle>
                <FormattedMessage id='velloci.businessInfo.meanTitle' defaultMessage='What does this mean?' />
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent style={{ color: '#848893', padding: '4px 30px' }}>
              <FormattedMessage
                id='velloci.businessInfo.meanContent'
                defaultMessage="Unless your business has a registered trade or fictitious business name with a government body, you don't need to worry about this step"
              />
            </CustomDivContent>
          </Rectangle>
        </ColumnCustom>
      </GridRow>
    </GridBusinessInfo>
  )
}

BusinessInfo.propTypes = {
  formikProps: PropTypes.object
}

BusinessInfo.defaultProps = {
  formikProps: {}
}

export default injectIntl(BusinessInfo)
