import React from 'react'
import PropTypes from 'prop-types'
import { Grid, GridColumn, GridRow, Header } from 'semantic-ui-react'
import { Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
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
import { DateInput } from '~/components/custom-formik'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'

const GridPersonalInformation = styled(Grid)`
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
const GridRowTitle = styled.div`
  background-color: #f8f9fb;
  text-transform: uppercase;
  font-size: 14px;
  padding: 16px 30px !important;
  margin-left: -16px;
  margin-right: -16px;
  width: 756px;
  font-weight: 500;
`

function PersonalInformation({
  formikProps,
  intl: { formatMessage },
  numberBeneficialOwners,
  businessRoles,
  registerBeneficialOwner
}) {
  let forms = []
  for (let i = 0; i <= numberBeneficialOwners; i++) {
    forms.push(
      <GridPersonalInformation key={i}>
        {i > 0 && (
          <GridRowTitle id={`form${i}`}>
            <GridColumn>
              <FormattedMessage
                id='settings.beneficialOwnerNum'
                defaultMessage={`Beneficial owner # ${i + 1}`}
                values={{ num: i + 1 }}
              />
            </GridColumn>
          </GridRowTitle>
        )}
        <GridRow columns={3}>
          <ColumnCustom>
            <Input
              name={`verifyPersonalInformation[${i}].firstName`}
              label={
                <>
                  {formatMessage({
                    id: 'global.firstName',
                    defaultMessage: 'First Name'
                  })}
                  {<Required />}
                </>
              }
              inputProps={{
                placeholder: formatMessage({
                  id: 'velloci.personalInfo.firstName.placeholder',
                  defaultMessage: 'Enter first name'
                }),
                type: 'text',
                'data-test': 'settings_velloci_registration_personal_info_first_name_inpt'
              }}
            />
          </ColumnCustom>
          <ColumnCustom>
            <Input
              name={`verifyPersonalInformation[${i}].middleName`}
              label={formatMessage({
                id: 'global.middleName',
                defaultMessage: 'Middle Name'
              })}
              inputProps={{
                placeholder: formatMessage({
                  id: 'velloci.personalInfo.middleName.placeholder',
                  defaultMessage: 'Enter middle name'
                }),
                type: 'text',
                'data-test': 'settings_velloci_registration_personal_info_middle_name_inpt'
              }}
            />
          </ColumnCustom>
          <ColumnCustom>
            <Input
              name={`verifyPersonalInformation[${i}].lastName`}
              label={
                <>
                  {formatMessage({
                    id: 'global.lastName',
                    defaultMessage: 'Last Name'
                  })}
                  {<Required />}
                </>
              }
              inputProps={{
                placeholder: formatMessage({
                  id: 'velloci.personalInfo.lastName.placeholder',
                  defaultMessage: 'Enter last name'
                }),
                type: 'text',
                'data-test': 'settings_velloci_registration_personal_info_last_name_inpt'
              }}
            />
          </ColumnCustom>
        </GridRow>

        <GridRow columns={2}>
          <ColumnCustom>
            <Input
              name={`verifyPersonalInformation[${i}].email`}
              label={
                <>
                  {formatMessage({
                    id: 'velloci.businessInfo.emailAddress',
                    defaultMessage: 'Email Address'
                  })}
                  {<Required />}
                </>
              }
              inputProps={{
                placeholder: formatMessage({
                  id: 'global.enterEmailAddress',
                  defaultMessage: 'Enter email address'
                }),
                type: 'text',
                'data-test': 'settings_velloci_registration_personal_info_personal_email_address_inpt'
              }}
            />
          </ColumnCustom>
          <ColumnCustom>
            <PhoneNumber
              name={`verifyPersonalInformation[${i}].phoneNumber`}
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
              isInputCountryCode={registerBeneficialOwner}
            />
          </ColumnCustom>
        </GridRow>
        <GridRow>
          <ColumnCustom>
            <DateInput
              inputProps={{ fluid: true }}
              label={
                <>
                  {formatMessage({ id: 'global.birth', defaultMessage: 'Birth' })}
                  {<Required />}
                </>
              }
              name={`verifyPersonalInformation[${i}].dateOfBirth`}
              inputOnly
            />
          </ColumnCustom>
        </GridRow>
        <GridRow>
          <GridColumn>
            <DivLegalAddressTitle>
              <FormattedMessage id='velloci.personalInfo.homeAddress' defaultMessage='Home Address' />
            </DivLegalAddressTitle>

            <AddressForm
              prefix={`verifyPersonalInformation`}
              index={i}
              values={formikProps.values}
              displayHeader={false}
              required={true}
              additionalCountryInputProps={{ disabled: true }}
              setFieldValue={formikProps.setFieldValue}>
              <Rectangle style={{ margin: '0px 0px 10px 0px' }}>
                <CustomDivTitle>
                  <Info size={20} style={{ color: '#2599d5' }} />
                  <CustomDivInTitle>
                    <FormattedMessage
                      id='velloci.personalInfo.infoTitle'
                      defaultMessage='Which address should I use?'
                    />
                  </CustomDivInTitle>
                </CustomDivTitle>
                <CustomDivContent style={{ color: '#848893', padding: '4px 30px' }}>
                  <FormattedMessage
                    id='velloci.personalInfo.infoContent'
                    defaultMessage='This is typically the address you have listed on your government issued license or identification card.'
                  />
                </CustomDivContent>
              </Rectangle>
            </AddressForm>
          </GridColumn>
        </GridRow>
        <GridRow columns={registerBeneficialOwner ? 2 : 3}>
          <ColumnCustom>
            <Input
              name={`verifyPersonalInformation[${i}].businessTitle`}
              label={
                <>
                  {formatMessage({
                    id: 'velloci.personalInfo.businessTitle',
                    defaultMessage: 'Business Title'
                  })}
                  {<Required />}
                </>
              }
              inputProps={{
                placeholder: formatMessage({
                  id: 'velloci.personalInfo.businessTitle.placeholder',
                  defaultMessage: 'Enter Business Title'
                }),
                type: 'text',
                'data-test': 'settings_velloci_registration_personal_info_business_title_inpt'
              }}
            />
          </ColumnCustom>
          {!registerBeneficialOwner && (
            <ColumnCustom>
              <Dropdown
                options={
                  businessRoles && businessRoles.data && businessRoles.data.length
                    ? businessRoles.data.map(el => ({
                        key: el,
                        value: el,
                        text: el.charAt(0).toUpperCase() + el.replace(/_/g, ' ').slice(1)
                      }))
                    : []
                }
                fieldProps={{
                  'data-test': 'settings_velloci_registration_personal_info_business_role_inpt'
                }}
                inputProps={{
                  placeholder: formatMessage({
                    id: 'global.businessName',
                    defaultMessage: 'Business Name'
                  }),
                  search: true,
                  selection: true,
                  disabled: i > 0,
                  loading: businessRoles && businessRoles.loading
                }}
                name={`verifyPersonalInformation[${i}].businessRole`}
                label={
                  <>
                    {formatMessage({
                      id: 'velloci.personalInfo.businessRole',
                      defaultMessage: 'Business Role'
                    })}
                    {<Required />}
                  </>
                }
              />
            </ColumnCustom>
          )}
          <ColumnCustom>
            <Input
              name={`verifyPersonalInformation[${i}].socialSecurityNumber`}
              label={
                <>
                  {formatMessage({
                    id: 'velloci.personalInfo.socialSecurityNumber',
                    defaultMessage: 'Social Security Number'
                  })}
                  {<Required />}
                </>
              }
              inputProps={{
                placeholder: formatMessage({
                  id: 'velloci.personalInfo.socialSecurityNumber.placeholder',
                  defaultMessage: '123456789'
                }),
                type: 'text',
                'data-test': 'settings_velloci_registration_personal_info_social_security_number_inpt'
              }}
            />
          </ColumnCustom>
        </GridRow>
        <GridRow>
          <ColumnCustom width={6}>
            <Input
              name={`verifyPersonalInformation[${i}].businessOwnershipPercentage`}
              label={formatMessage({
                id: 'velloci.personalInfo.businessOwnershipPercentage',
                defaultMessage: 'Business Ownership Percentage'
              })}
              inputProps={{
                label: '%',
                labelPosition: 'right',
                placeholder: formatMessage({
                  id: 'velloci.personalInfo.businessOwnershipPercentage.placeholder',
                  defaultMessage: 'xx'
                }),
                type: 'text',
                pattern: '\d*', //!! autosave can save incorect pattern. Correct pattern is '\d*'
                maxLength: '3',
                'data-test': 'settings_velloci_registration_personal_info_business_ownership_percentage_inpt'
              }}
            />
          </ColumnCustom>
        </GridRow>
      </GridPersonalInformation>
    )
  }
  return forms
}

PersonalInformation.propTypes = {
  formikProps: PropTypes.object,
  businessRoles: PropTypes.object,
  numberBeneficialOwners: PropTypes.number,
  registerBeneficialOwner: PropTypes.booleanValue
}

PersonalInformation.defaultProps = {
  formikProps: {},
  businessRoles: {},
  numberBeneficialOwners: 0,
  registerBeneficialOwner: false
}

export default injectIntl(PersonalInformation)
