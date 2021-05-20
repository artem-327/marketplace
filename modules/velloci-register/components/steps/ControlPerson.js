import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { Checkbox, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Required } from '~/components/constants/layout'
import { AddressForm } from '~/modules/address-form'
import { PhoneNumber } from '~/modules/phoneNumber'
import { DateInput } from '~/components/custom-formik'
import { HeadingContainer } from '../styles'
import { Info } from 'react-feather'
//Components
import {
  Rectangle,
  CustomDivContent,
  CustomDivInTitle,
  CustomDivTitle
} from '~/modules/cart/components/StyledComponents'

import { StyledTextContainer } from '../styles'

const GridControlPerson = styled(Grid)`
  margin: 14px 16px !important;
`

const CheckboxControlPerson = styled(Checkbox)`
  .ui.checkbox input.hidden + label {
    color: #848893 !important;
  }
`

const DivRectangle = styled(Rectangle)`
  margin: 0px;
  background-color: #f8f9fb;
  border: solid 1px #dee2e6;
`

const DivCheckboxes = styled.div`
  display: flex;
  padding: 10px 0px;
  .field {
    padding-right: 20px !important;
  }
`

function ControlPerson({ formikProps, intl: { formatMessage } }) {
  return (
    <>
      <GridControlPerson>
        <GridRow>
          <GridColumn>
            <StyledTextContainer style={{ paddingBlockEnd: '.5rem' }}>
              <FormattedMessage id='onboarding.control.person.confirm' />
            </StyledTextContainer>
            <Rectangle style={{ margin: '0px' }}>
              <CustomDivContent style={{ display: 'flex', color: '#848893', padding: '0px' }}>
                <div>
                  <Info size={20} style={{ color: '#2599d5' }} />
                </div>
                <CustomDivInTitle>
                  <FormattedMessage id='velloci.controlPerson.infoContent' />
                  <br /><br />
                  <FormattedMessage id='velloci.controlPerson.infoContent2' />
                </CustomDivInTitle>
              </CustomDivContent>
            </Rectangle>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <CheckboxControlPerson
              inputProps={{
                'data-test': 'settings_velloci_registration_control_person_chckb'
              }}
              label={formatMessage({
                id: 'velloci.controlPerson.checkboxLabel',
                defaultMessage: 'I will be the Control Person of this bank account'
              })}
              name='controlPerson.isControlPerson'
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <label>
              <FormattedMessage
                id='onboarding.beneficial.owner.twenty.five'
                defaultMessage='Do you own 25% or more of the company (Beneficial Owner)?'
              />
            </label>
            <DivCheckboxes>
              <Checkbox
                label={formatMessage({
                  id: 'global.yes',
                  defaultMessage: 'Yes'
                })}
                inputProps={{
                  onChange: () => {
                    formikProps.setFieldValue('controlPerson.isBeneficialOwner', true)
                    formikProps.setFieldValue('controlPerson.isNotBeneficialOwner', false)
                  },
                  'data-test': 'settings_velloci_registration_control_person_isBeneficialOwner_chckbx'
                }}
                name='controlPerson.isBeneficialOwner'
              />
              <Checkbox
                label={formatMessage({
                  id: 'global.no',
                  defaultMessage: 'No'
                })}
                inputProps={{
                  onChange: () => {
                    formikProps.setFieldValue('controlPerson.isBeneficialOwner', false)
                    formikProps.setFieldValue('controlPerson.isNotBeneficialOwner', true)
                  },
                  'data-test': 'settings_velloci_registration_control_person_isNotBeneficialOwner_chckbx'
                }}
                name='controlPerson.isNotBeneficialOwner'
              />
            </DivCheckboxes>
          </GridColumn>
        </GridRow>
      </GridControlPerson>
      <GridControlPerson>
        <GridRow className="m-no-padding">
          <GridColumn>
            <HeadingContainer>
              <FormattedMessage id='onboarding.verify.personal.information' />
            </HeadingContainer>
          </GridColumn>
        </GridRow>
        <GridRow columns={2}>
          <GridColumn className="m-padding" computer={8} tablet={8} mobile={16}>
            <Input
              name='controlPerson.firstName'
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
                'data-test': 'settings_velloci_registration_control_person_first_name_inpt'
              }}
            />
          </GridColumn>
          <GridColumn className="m-t-padding" computer={8} tablet={8} mobile={16}>
            <Input
              name='controlPerson.middleName'
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
                'data-test': 'settings_velloci_registration_control_person_middle_name_inpt'
              }}
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn computer={8} laptop={8} mobile={16}>
            <Input
              name='controlPerson.lastName'
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
                'data-test': 'settings_velloci_registration_control_person_last_name_inpt'
              }}
            />
          </GridColumn>
        </GridRow>
        <GridRow columns={2}>
          <GridColumn className="m-b-padding" computer={8} tablet={8} mobile={16}>
            <Input
              name='controlPerson.email'
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
                'data-test': 'settings_velloci_registration_control_person_personal_email_address_inpt'
              }}
            />
          </GridColumn>
          <GridColumn className="m-t-padding" computer={8} tablet={8} mobile={16}>
            <PhoneNumber
              name='controlPerson.phoneNumber'
              values={formikProps.values}
              label={
                <>
                  <FormattedMessage id='global.phoneNumber' />
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
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <DateInput
              inputProps={{ fluid: true }}
              label={
                <>
                  {formatMessage({ id: 'global.birth', defaultMessage: 'Birth' })}
                  {<Required />}
                </>
              }
              name='controlPerson.dateOfBirth'
              inputOnly
              addSeparator
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
          <AddressForm
            prefix='controlPerson'
            values={formikProps.values}
            displayHeader={false}
            required={true}
            searchEnabled={true}
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
        <GridRow>
          <GridColumn>
            <Input
              name='controlPerson.businessOwnershipPercentage'
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
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <Input
              name='controlPerson.businessTitle'
              label={
                <>
                  {formatMessage({
                    id: 'onboarding.business.role',
                    defaultMessage: 'Business Role (Title)'
                  })}
                  {<Required />}
                </>
              }
              inputProps={{
                placeholder: formatMessage({
                  id: 'onboarding.enter.business.role',
                  defaultMessage: 'Enter business role'
                }),
                type: 'text',
                'data-test': 'settings_velloci_registration_control_person_business_role_inpt'
              }}
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <Input
              name='controlPerson.socialSecurityNumber'
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
                  id: 'onboarding.ssn.placeholder',
                  defaultMessage: 'xxx-xx-xxxx'
                }),
                type: 'text',
                'data-test': 'settings_velloci_registration_control_person_social_security_number_inpt'
              }}
            />
          </GridColumn>
        </GridRow>
      </GridControlPerson>
    </>
  )
}

export default injectIntl(ControlPerson)
