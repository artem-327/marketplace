import PropTypes from 'prop-types'
import { Button, Grid, GridColumn, GridRow, Icon, Popup } from 'semantic-ui-react'
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
import { roles } from '../../../../components/settings/constants'
import { LeftAlignedDiv } from '../styles'

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
  countBeneficialOwners,
  formikProps,
  intl: { formatMessage },
  numberBeneficialOwners,
  businessRoles,
  registerBeneficialOwner
}) {
  const { values } = formikProps;

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
              addSeparator
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
              searchEnabled={!registerBeneficialOwner}
              additionalCountryInputProps={{ disabled: true }}
              setFieldValue={formikProps.setFieldValue}>
              <Rectangle style={{ margin: '0px 0px 10px 0px' }}>
                <CustomDivTitle>
                  <Info size={20} style={{ color: '#2599d5' }} />
                  <CustomDivInTitle style={{ color: '#2599d5' }}>
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
              label={
                <>
                  {formatMessage({
                    id: 'velloci.personalInfo.businessOwnershipPercentage',
                    defaultMessage: 'Business Ownership Percentage'
                  })}
                  {<Required />}
                </>
              }
              inputProps={{
                label: '%',
                labelPosition: 'right',
                placeholder: formatMessage({
                  id: 'velloci.personalInfo.businessOwnershipPercentage.placeholder',
                  defaultMessage: 'xx'
                }),
                type: 'text',
                pattern: 'd*', //!! autosave can save incorect pattern. Correct pattern is '\d*'
                maxLength: '3',
                'data-test': 'settings_velloci_registration_personal_info_business_ownership_percentage_inpt'
              }}
            />
          </ColumnCustom>
        </GridRow>
        {values?.ownerInformation?.isOtherBeneficialOwner && (
          <GridRow>
            <GridColumn>
              <LeftAlignedDiv>
                {numberBeneficialOwners > 0 && (
                  <Popup
                    trigger={
                      <a href={`#form${numberBeneficialOwners}`}>
                        <Button
                          style={{ float: 'right !important', marginLeft: '10px !important', marginRight: '0px !important' }}
                          type='button'
                          negative
                          onClick={() => {
                            countBeneficialOwners(numberBeneficialOwners - 1)
                          }}
                          icon>
                          <Icon name='minus' />
                        </Button>
                      </a>
                    }
                    content={
                      <FormattedMessage id='settings.removeBeneficialOwner' defaultMessage='Remove beneficial owner' />
                    }
                  />
                )}
                <Popup
                  trigger={
                    <a href={`#form${numberBeneficialOwners}`}>
                      <Button
                        type='button'
                        style={{ marginLeft: '10px !important', marginRight: '0px !important' }}
                        positive
                        onClick={() => {
                          countBeneficialOwners(numberBeneficialOwners + 1)
                        }}
                        icon>
                        <Icon name='plus' />
                      </Button>
                    </a>
                  }
                  content={<FormattedMessage id='settings.addBeneficialOwner' defaultMessage='Add beneficial owner' />}
                />
              </LeftAlignedDiv>
            </GridColumn>
          </GridRow>
        )}
      </GridPersonalInformation>
    )
  }
  return forms
}

PersonalInformation.propTypes = {
  businessRoles: PropTypes.object,
  countBeneficialOwners: PropTypes.func,
  formikProps: PropTypes.object,
  numberBeneficialOwners: PropTypes.number,
  registerBeneficialOwner: PropTypes.booleanValue
}

PersonalInformation.defaultProps = {
  countBeneficialOwners: () => {},
  formikProps: {},
  businessRoles: {},
  numberBeneficialOwners: 0,
  registerBeneficialOwner: false
}

export default injectIntl(PersonalInformation)
