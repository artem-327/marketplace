import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, GridColumn, GridRow, Icon, Popup, FormField } from 'semantic-ui-react'
import get from 'lodash/get'
import { Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Info } from 'react-feather'
import InputMask from 'react-input-mask'
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
import { AddOwnersButtonDiv } from '../styles'

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

const StyledInputMask = styled(InputMask)`
  background: #ffffff;
  .default.text {
    font-weight: normal;
  };
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

  const [SSN, setSSN] = useState('')
  const { touched, isSubmitting, errors } = formikProps;
  const beforeMaskedStateChange = (e, ssnName) => {
    const { setFieldValue, setFieldTouched } = formikProps;
    const { value } = e.target;
    setSSN(value);
    setFieldValue(ssnName, value)
    setFieldTouched(ssnName, true, true)
  }
  
  let forms = []
  for (let i = 0; i <= numberBeneficialOwners; i++) {
    const SSNError = (get(touched, `verifyPersonalInformation[${i}].socialSecurityNumber`, null) || isSubmitting) && get(errors, `verifyPersonalInformation[${i}].socialSecurityNumber`, null)
    forms.push(
      <GridPersonalInformation
        className="verify-personal-information"
        data-test='verify-personal-information'
        key={i}
      >
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
        <GridRow columns={2}>
          <ColumnCustom className="m-b-padding" computer={8} tablet={8} mobile={16}>
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
                'data-test': `verify-personal-information-first-name-${i}`
              }}
            />
          </ColumnCustom>
          <ColumnCustom className="m-t-padding" computer={8} tablet={8} mobile={16}>
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
                'data-test': `verify-personal-information-middle-name-${i}`
              }}
            />
          </ColumnCustom>
        </GridRow>
        <GridRow>
          <ColumnCustom computer={8} tablet={8} mobile={16}>
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
                'data-test': `verify-personal-information-last-name-${i}`
              }}
            />
          </ColumnCustom>
        </GridRow>
        <GridRow columns={2}>
          <ColumnCustom className="m-b-padding" computer={8} tablet={8} mobile={16}>
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
                'data-test': `verify-personal-information-email-address-${i}`
              }}
            />
          </ColumnCustom>
          <ColumnCustom className="m-t-padding" computer={8} tablet={8} mobile={16}>
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
          <ColumnCustom className="m-b-padding" computer={8} tablet={8} mobile={16}>
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
                'data-test': `verify-personal-information-business-title-${i}`
              }}
            />
          </ColumnCustom>
          <ColumnCustom className="m-t-padding" computer={8} tablet={8} mobile={16}>
            {/* <Input
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
                'data-test': `verify-personal-information-ssn-${i}`
              }}
            /> */}
            <FormField error={SSNError ? SSNError : null}>
              <label><>
                {formatMessage({
                  id: 'velloci.personalInfo.socialSecurityNumber',
                  defaultMessage: 'Social Security Number'
                })}
                {<Required />}
              </></label>
              <StyledInputMask
                data-test={`verify-personal-information-ssn-${i}`}
                name={`verifyPersonalInformation[${i}].socialSecurityNumber`}
                mask='999-99-9999'
                type='text'
                value={SSN}
                placeholder={formatMessage({
                  id: 'onboarding.ssn.placeholder',
                  defaultMessage: 'xxx-xx-xxxx'
                })}
                onChange={(e) => beforeMaskedStateChange(e, `verifyPersonalInformation[${i}].socialSecurityNumber`)}
              />
              {!!SSNError && <span className='sui-error-message'>{SSNError}</span>}
            </FormField>
          </ColumnCustom>
        </GridRow>
        <GridRow>
          <ColumnCustom computer={8} tablet={8} mobile={16}>
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
                'data-test': `verify-personal-information-ownership-percentage-${i}`
              }}
            />
          </ColumnCustom>
        </GridRow>
        {values?.ownerInformation?.isOtherBeneficialOwner && (
          <GridRow>
            <GridColumn>
              <AddOwnersButtonDiv className="toggle-owner-buttons">
                {numberBeneficialOwners > 0 && (
                  <Popup
                    trigger={
                      <a href={`#form${numberBeneficialOwners}`}>
                        <Button
                          className="btn-remove-owner"
                          data-test={`verify-personal-information-remove-owner-${i}`}
                          type='button'
                          onClick={() => {
                            countBeneficialOwners(numberBeneficialOwners - 1)
                          }}
                          icon
                        >
                          <Icon name='minus' />
                          <FormattedMessage id='settings.removeOwner' />
                        </Button>
                      </a>
                    }
                    content={<FormattedMessage id='settings.removeOwner' defaultMessage='Remove Owner' />}
                  />
                )}
                <Popup
                  trigger={
                    <a href={`#form${numberBeneficialOwners}`}>
                      <Button
                        className="btn-add-owner"
                        data-test={`verify-personal-information-add-owner-${i}`}
                        type='button'
                        onClick={() => {
                          countBeneficialOwners(numberBeneficialOwners + 1)
                        }}
                        icon
                      >
                        <Icon name='plus' />
                        <FormattedMessage id='settings.addOwner' />
                      </Button>
                    </a>
                  }
                  content={<FormattedMessage id='settings.addOwner' defaultMessage='Add Owner' />}
                />
              </AddOwnersButtonDiv>
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
  countBeneficialOwners: () => { },
  formikProps: {},
  businessRoles: {},
  numberBeneficialOwners: 0,
  registerBeneficialOwner: false
}

export default injectIntl(PersonalInformation)
