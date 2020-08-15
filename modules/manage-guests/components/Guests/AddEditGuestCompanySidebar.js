import React from 'react'
import { connect } from 'react-redux'

import { Form, FormGroup, Header, Loader, Dimmer } from 'semantic-ui-react'
import { Formik } from 'formik'

import * as Actions from '../../actions'

import { Input, Button, Checkbox, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'

import { cloneDeep } from 'lodash'

import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import { validationSchema } from '~/modules/company-form/constants'
import { errorMessages, minOrZeroLength } from '~/constants/yupValidation'

import { AddressForm } from '~/modules/address-form/'
import { addressValidationSchema, phoneValidation } from '~/constants/yupValidation'

import { getSafe, deepSearch } from '~/utils/functions'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import { removeEmpty } from '~/utils/functions'

import { FlexSidebar, FlexContent, HighSegment } from '~/modules/admin/constants/layout'
import { BottomButtons } from '../../constants'

import ErrorFocus from '~/components/error-focus'

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`

const initialFormValues = {
  name: '',
  enabled: false,
  phone: '',
  purchaseHazmatEligible: false,
  businessType: {
    id: null
  },
  website: '',
  mailingBranch: {
    deliveryAddress: {
      addressName: '',
      address: {
        city: '',
        country: '',
        province: '',
        streetAddress: '',
        zip: ''
      },
      contactEmail: '',
      contactName: '',
      contactPhone: ''
    },
    warehouse: false
  },
  primaryBranch: {
    deliveryAddress: {
      addressName: '',
      address: {
        city: '',
        country: '',
        province: '',
        streetAddress: '',
        zip: ''
      },
      contactEmail: '',
      contactName: '',
      contactPhone: ''
    },
    warehouse: false
  },
  primaryUser: {
    email: '',
    name: ''
  }
}

class AddEditGuestCompanySidebar extends React.Component {
  state = {}

  formValidationNew = () =>
    Yup.lazy(values => {
      let minLength = errorMessages.minLength(2)

      let validation = Yup.object().shape({
        name: Yup.string().trim().min(2, minLength).required(minLength),

        primaryBranch: Yup.object().shape({
          deliveryAddress: Yup.object().shape({
            addressName: minOrZeroLength(3),
            contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
            contactName: Yup.string().trim().min(2, minLength).required(minLength),
            contactPhone: phoneValidation().concat(Yup.string().required(errorMessages.requiredMessage)),
            address: addressValidationSchema()
          })
        }),
        primaryUser: Yup.lazy(() => {
          // if (primaryUserRequired)
          return Yup.object().shape({
            email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
            name: Yup.string().trim().min(2, minLength).required(minLength)
          })
          // return Yup.mixed().notRequired()
        })
      })

      return validation
    })

  render() {
    const { closePopup, popupValues, updateClientCompany, createClientCompany, intl, datagrid } = this.props

    const { formatMessage } = intl

    return (
      <Formik
        enableReinitialize
        initialValues={popupValues ? popupValues : initialFormValues}
        validationSchema={popupValues ? validationSchema : this.formValidationNew()}
        onSubmit={async (values, actions) => {
          try {
            if (popupValues) {
              let newAssociations = []
              if (getSafe(() => values.associations[0].id, false)) {
                newAssociations = values.associations.map(assoc => assoc.id)
              } else {
                newAssociations = getSafe(() => values.associations, [])
              }
              let newValues = {
                associations: newAssociations,
                businessType: getSafe(() => values.businessType.id, null),
                cin: getSafe(() => values.cin, ''),
                dba: getSafe(() => values.dba, ''),
                dunsNumber: getSafe(() => values.dunsNumber, ''),
                enabled: getSafe(() => values.enabled, false),
                name: getSafe(() => values.name, ''),
                phone: getSafe(() => values.phone, ''),
                tin: getSafe(() => values.tin, ''),
                website: getSafe(() => values.website, ''),
                purchaseHazmatEligible: getSafe(() => values.purchaseHazmatEligible, false)
              }

              const data = await updateClientCompany(popupValues.id, newValues)
              datagrid.updateRow(data.id, () => ({ ...data }))
            } else {
              if (
                !getSafe(() => values.primaryBranch.deliveryAddress, '') ||
                !deepSearch(
                  getSafe(() => values.mailingBranch.deliveryAddress, ''),
                  val => val !== ''
                )
              ) {
                delete values['mailingBranch']
              } else {
                if (values.mailingBranch.deliveryAddress.contactEmail !== '')
                  values.mailingBranch.deliveryAddress.contactEmail = values.mailingBranch.deliveryAddress.contactEmail.trim()
              }

              let branches = ['primaryBranch', 'mailingBranch']

              if (values.businessType) values.businessType = values.businessType.id

              let payload = cloneDeep(values)
              payload.primaryUser.email = payload.primaryUser.email.trim()
              payload.primaryBranch.deliveryAddress.contactEmail = payload.primaryBranch.deliveryAddress.contactEmail.trim()

              branches.forEach(branch => {
                let country = getSafe(() => JSON.parse(payload[branch].deliveryAddress.address.country).countryId)
                if (country) payload[branch].deliveryAddress.address.country = country
              })

              if (!payload.businessType) delete payload.businessType

              removeEmpty(payload)
              await createClientCompany(payload)
              datagrid.loadData()
              closePopup()
            }
          } catch (err) {
            console.error(err)
          } finally {
            actions.setSubmitting(false)
          }
        }}
        onReset={closePopup}
        render={props => {
          let { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = props
          return (
            <CustomForm autoComplete='off'>
              <FlexSidebar
                visible={true}
                width='very wide'
                style={{ width: '630px' }}
                direction='right'
                animation='overlay'>
                <Dimmer inverted active={isSubmitting}>
                  <Loader />
                </Dimmer>
                <HighSegment basic>
                  <FormattedMessage id='manageGuests.addCompany' defaultMessage='Add Company' />
                </HighSegment>
                <FlexContent>
                  <>
                    <FormGroup widths='equal' data-test='guests_client_company_primaryUserNameEmail_inp'>
                      <Input
                        label={
                          <>
                            <FormattedMessage id='global.companyName' defaultMessage='Company Name' />
                            <Required />
                          </>
                        }
                        name='name'
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'global.enterCompanyName',
                            defaultMessage: 'Enter Company Name'
                          })
                        }}
                      />
                      <Input
                        label={
                          <>
                            <FormattedMessage id='global.companyAdmin' defaultMessage='Company Admin' />
                            <Required />
                          </>
                        }
                        name='primaryUser.name'
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'global.enterCompanyAdmin',
                            defaultMessage: 'Enter Company Admin'
                          })
                        }}
                      />
                    </FormGroup>
                    <FormGroup widths='equal' data-test='guests_client_company_primaryUserTitlePhone_inp'>
                      <Input
                        label={
                          <>
                            <FormattedMessage id='global.adminEmail' defaultMessage='Admin Email' />
                            <Required />
                          </>
                        }
                        name='primaryUser.email'
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'global.enterAdminEmail',
                            defaultMessage: 'Enter Admin Email'
                          })
                        }}
                      />
                      <PhoneNumber
                        label={<FormattedMessage id='global.phoneNumber' defaultMessage='Phone Number' />}
                        name='primaryUser.phone'
                        values={values}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        errors={errors}
                        touched={touched}
                        isSubmitting={isSubmitting}
                      />
                    </FormGroup>

                    <Header as='h3'>
                      <FormattedMessage id='global.primaryBranchAddress' defaultMessage='Primary Branch Address' />
                    </Header>
                    <FormGroup widths='equal' data-test='guests_client_company_primaryBranchName_inp'>
                      <Input
                        label={<FormattedMessage id='global.name' defaultMessage='Name' />}
                        name='primaryBranch.deliveryAddress.addressName'
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'global.enterPrimaryBranchAddress',
                            defaultMessage: 'Enter Primary Branch Address'
                          })
                        }}
                      />
                    </FormGroup>
                    <FormGroup widths='equal' data-test='guests_client_company_primaryBranchNameEmailPhone_inp'>
                      <Input
                        inputProps={{ fluid: true }}
                        label={
                          <>
                            <FormattedMessage id='addCompany.contactName' defaultMessage='Contact Name' />
                            <Required />
                          </>
                        }
                        name='primaryBranch.deliveryAddress.contactName'
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'global.enterContactName',
                            defaultMessage: 'Enter Contact Name'
                          })
                        }}
                      />
                      <PhoneNumber
                        label={
                          <>
                            <FormattedMessage id='addCompany.contactPhone' defaultMessage='Contact Phone' />
                            <Required />
                          </>
                        }
                        name='primaryBranch.deliveryAddress.contactPhone'
                        values={values}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        errors={errors}
                        touched={touched}
                        isSubmitting={isSubmitting}
                      />
                    </FormGroup>
                    <FormGroup widths='equal' data-test='guests_client_company_primaryBranchNameEmailPhone_inp'>
                      <Input
                        inputProps={{ fluid: true }}
                        label={
                          <>
                            <FormattedMessage id='addCompany.contactEmail' defaultMessage='Contact email' />
                            <Required />
                          </>
                        }
                        name='primaryBranch.deliveryAddress.contactEmail'
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'global.enterContactEmail',
                            defaultMessage: 'Enter Contact Email'
                          })
                        }}
                      />
                    </FormGroup>
                    <AddressForm
                      values={values}
                      setFieldValue={setFieldValue}
                      prefix='primaryBranch.deliveryAddress'
                      required={true}
                    />
                    <FormGroup widths='equal'>
                      <Checkbox
                        label={formatMessage({ id: 'global.enabled', defaultMessage: 'Enabled' })}
                        name='enabled'
                        data-test='company_form_enabled_chckb'
                      />
                    </FormGroup>
                  </>
                </FlexContent>
                <BottomButtons>
                  <div style={{ textAlign: 'right' }}>
                    <Button.Reset data-test='guests_client_company_cancel_btn' onClick={props.handleReset}>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Reset>
                    <Button.Submit data-test='guests_client_company_save_btn' onClick={props.handleSubmit}>
                      <FormattedMessage id='global.save' defaultMessage='Save'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Submit>
                  </div>
                </BottomButtons>
              </FlexSidebar>
              <ErrorFocus />
            </CustomForm>
          )
        }}
      />
    )
  }
}

const mapStateToProps = ({ manageGuests }) => {
  const popupValues = manageGuests.popupValues
  return {
    ...manageGuests,
    popupValues
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(AddEditGuestCompanySidebar)))
