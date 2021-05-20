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
`

const DivRectangleBusinessType = styled.div`
  border-radius: 4px;
  border: solid 1px #dee2e6;
  padding: 1rem 1rem 0 1rem;
`

function ControlPerson({ formikProps, intl: { formatMessage } }) {
  return (
    <>
      <GridControlPerson>
        <GridRow>
          <GridColumn>
            <DivRectangleBusinessType>
              <Grid>
                  <GridRow>
                    <GridColumn>
                      <StyledTextContainer style={{ paddingBlockEnd: '.5rem' }}>
                        <FormattedMessage id='onboarding.control.person.confirm' />
                      </StyledTextContainer>
                      <FormattedMessage id='velloci.controlPerson.infoContent' />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                  <GridColumn>
                    <CheckboxControlPerson
                      inputProps={{
                        'data-test': 'control-person-is-control-person'
                      }}
                      label={formatMessage({ id: 'velloci.controlPerson.checkboxLabel' })}
                      name='controlPerson.isControlPerson'
                    />
                  </GridColumn>
                </GridRow>
                <GridRow columns={2}>
                  <GridColumn computer={8} tablet={8} mobile={16}>
                    <label>
                      <FormattedMessage
                        id='onboarding.beneficial.owner.twenty.five'
                        defaultMessage='Do you own 25% or more of the company (Beneficial Owner)?'
                      />
                    </label>
                    <DivCheckboxes
                      data-test="control-person-is-beneficial-owner"
                      className="checkbox-custom"
                    >
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
                  <GridColumn className="m-b-padding" computer={8} tablet={8} mobile={16}>
                    <Rectangle style={{ margin: '0px' }}>
                      <CustomDivContent style={{ display: 'flex', color: '#848893', padding: '0px' }}>
                        <div>
                          <Info size={20} style={{ color: '#3bbef6' }} />
                        </div>
                        <CustomDivInTitle>
                          <p style={{ color: '#3bbef6', fontWeight: 'bold' }}><FormattedMessage id='onboarding.who.is.a.beneficial.owner' /></p>
                          <p><FormattedMessage id='onboarding.beneficial.owner.info' /></p>
                        </CustomDivInTitle>
                      </CustomDivContent>
                    </Rectangle>
                  </GridColumn>
                </GridRow>
              </Grid>
            </DivRectangleBusinessType>
          </GridColumn>
        </GridRow>
      </GridControlPerson>
      <GridControlPerson>
        <GridRow className="no-padding">
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
                'data-test': 'control-person-first-name'
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
                'data-test': 'control-person-middle-name'
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
                'data-test': 'control-person-last-name'
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
                'data-test': 'control-person-email-address'
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
                  <Info size={20} style={{ color: '#3bbef6' }} />
                  <CustomDivInTitle style={{ color: '#3bbef6' }}>
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
        {formikProps?.values?.controlPerson?.isBeneficialOwner &&
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
                  'data-test': 'control-person-ownership-percentage'
                }}
              />
            </GridColumn>
          </GridRow>
        }
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
                'data-test': 'control-person-business-role'
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
                'data-test': 'control-person-ssn'
              }}
            />
          </GridColumn>
        </GridRow>
      </GridControlPerson>
    </>
  )
}

export default injectIntl(ControlPerson)
