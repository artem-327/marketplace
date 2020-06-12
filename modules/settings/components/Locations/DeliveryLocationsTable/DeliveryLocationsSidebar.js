import React from 'react'
import { connect } from 'react-redux'
import { withDatagrid } from '~/modules/datagrid'
import { Formik } from 'formik'
import { Header, FormGroup, Dimmer, Loader, Segment, Form } from 'semantic-ui-react'
import {
  closeSidebar,
  updateDeliveryAddresses,
  createDeliveryAddress
} from '../../../actions'
import { Input, Checkbox, Button, TextArea } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import styled from 'styled-components'

import { FormattedMessage, injectIntl } from 'react-intl'

import { addressValidationSchema, errorMessages, minOrZeroLength, validateTime } from '~/constants/yupValidation'

import { AddressForm } from '~/modules/address-form/'

import { getSafe } from '~/utils/functions'
import { PhoneNumber } from '~/modules/phoneNumber'
import { FlexSidebar, HighSegment, FlexContent } from '~/modules/inventory/constants/layout'
import { Required } from '~/components/constants/layout'
import { removeEmpty } from '~/utils/functions'
import { TimeInput } from '~/components/custom-formik/'

const CustomButtonSubmit = styled(Button.Submit)`
  background-color: #2599d5 !important;
  color: #fff !important;
  margin: 0 5px !important;
`

const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
  .field {
    .ui.checkbox {
      label {
        color: #848893;
      }
      &.checked {
        label {
          color: #20273a;
        }
      }
    }
    
    .field {
      label {
        color: #546f93;
      }
    }
    
    .phone-number {
      .phone-code,
      .phone-num {
        height: 40px;
      }
    }
  }
`

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`

const CustomDiv = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
`

const CustomHighSegment = styled(HighSegment)`
  margin: 0 !important;
  padding: 16px 30px !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6  !important;
  background-color: #ffffff;
  z-index: 1;
`

const CustomSegmentContent = styled(Segment)`
  padding-top: 0px !important;
`

const minLength = errorMessages.minLength(3)

const formValidation = () =>
  Yup.object().shape({
    address: addressValidationSchema(),
    addressName: minOrZeroLength(3),
    contactName: Yup.string()
      .trim()
      .min(3, minLength)
      .required(errorMessages.requiredMessage),
    contactPhone: Yup.string()
      .trim()
      .min(3, minLength)
      .required(errorMessages.requiredMessage),
    contactEmail: Yup.string()
      .trim()
      .email(errorMessages.invalidEmail)
      .required(errorMessages.requiredMessage),
    readyTime: validateTime(),
    closeTime: validateTime()
  })

class DeliveryLocationsSidebar extends React.Component {
  state = {
    loadSidebar: false
  }

  submitHandler = async (values, setSubmitting) => {
    const { popupValues, updateDeliveryAddresses, createDeliveryAddress } = this.props
    const { attachmentFiles } = this.state
    let country = JSON.parse(values.address.country).countryId

    let requestData = {
      address: {
        ...values.address,
        country
      },
      readyTime:
        !values.readyTime || values.readyTime === ''
          ? null
          : values.readyTime,
      closeTime:
        !values.closeTime || values.closeTime === ''
          ? null
          : values.closeTime,
      addressName: values.addressName,
      callAhead: values.callAhead,
      contactEmail: values.contactEmail,
      contactName: values.contactName,
      contactPhone: values.contactPhone,
      deliveryNotes: values.deliveryNotes,
      forkLift: values.forkLift,
      liftGate: values.liftGate
    }
    removeEmpty(requestData)

    try {
      if (popupValues) {
        await updateDeliveryAddresses(popupValues.id, requestData)
      } else {
        await createDeliveryAddress(requestData)
      }
    } catch {
    } finally {
      setSubmitting(false)
      this.setState({ loadSidebar: false })
    }
  }

  getInitialFormValues = () => {
    let { popupValues } = this.props

    const provinceId = getSafe(() => popupValues.address.province.id, '')
    const countryId = getSafe(() => popupValues.address.country.id, null)
    const hasProvinces = getSafe(() => popupValues.address.country.hasProvinces, false)
    const zip = getSafe(() => popupValues.address.zip.zip, '')
    const zipID = getSafe(() => popupValues.address.zip.id, '')

    const initialValues = {
      address: {
        streetAddress: getSafe(() => popupValues.address.streetAddress, ''),
        city: getSafe(() => popupValues.address.city, ''),
        province: provinceId,
        country: countryId ? JSON.stringify({ countryId, hasProvinces }) : '',
        zip
      },
      addressName: getSafe(() => popupValues.addressName, ''),
      callAhead: getSafe(() => popupValues.callAhead, false),
      closeTime: getSafe(() => popupValues.closeTime, ''),
      contactEmail: getSafe(() => popupValues.contactEmail, ''),
      contactName: getSafe(() => popupValues.contactName, ''),
      contactPhone: getSafe(() => popupValues.contactPhone, ''),
      deliveryNotes: getSafe(() => popupValues.deliveryNotes, ''),
      forkLift: getSafe(() => popupValues.forkLift, false),
      liftGate: getSafe(() => popupValues.liftGate, false),
      readyTime: getSafe(() => popupValues.readyTime, ''),

      zipID,
      countryId,
      hasProvinces,
      province: getSafe(() => popupValues.address.province, '')
    }
    return initialValues
  }

  renderEdit = formikProps => {
    const {
      intl: { formatMessage }
    } = this.props
    const { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = formikProps

    return (
      <>
        <FormGroup
          widths='equal'
          style={{ marginTop: '14px' }}
          data-test='settings_delivery_locations_sidebar_name_inp'
        >
          <Input
            type='text'
            label={<FormattedMessage id='global.addressName' defaultMessage='Address Name' />}
            name='addressName'
            inputProps={{
              placeholder:
                formatMessage({
                  id: 'global.enterAddressName',
                  defaultMessage: 'Enter Address Name'
                })
            }}
          />
        </FormGroup>

        <AddressForm
          prefix={''}
          required={true}
          setFieldValue={setFieldValue}
          values={values}
          initialZipCodes={[{
            key: values.zipID.toString(),
            value: values.address.zip,
            text: values.address.zip
          }]}
        />

        <Header as='h3'>
          <FormattedMessage id='settings.contactInfo' defaultMessage='Contact Info' />
        </Header>
        <CustomSegment>
          <FormGroup data-test='settings_branches_popup_contactName_inp'>
            <Input
              type='text'
              label={
                <>
                  {formatMessage({ id: 'global.contactName', defaultMessage: 'Contact Name' })}
                  <Required />
                </>
              }
              name='contactName'
              fieldProps={{ width: 16 }}
              inputProps={{
                placeholder:
                  formatMessage({
                    id: 'settings.warehouses.enterContactName',
                    defaultMessage: 'Enter Contact Name'
                  })
              }}
            />
          </FormGroup>
          <FormGroup widths='equal' data-test='settings_branches_popup_phoneEmail_inp'>
            <PhoneNumber
              name='contactPhone'
              values={values}
              label={
                <>
                  {<FormattedMessage id='global.phone' defaultMessage='Phone' />}
                  <Required />
                </>
              }
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting}
            />
            <Input
              type='text'
              label={
                <>
                  {formatMessage({ id: 'global.contactEmail', defaultMessage: 'Contact Email' })}
                  <Required />
                </>
              }
              name='contactEmail'
              inputProps={{
                placeholder:
                  formatMessage({
                    id: 'settings.warehouses.enterEmailAddress',
                    defaultMessage: 'Enter Email Address'
                  })
              }}
            />
          </FormGroup>
        </CustomSegment>

        <Header as='h3'>
          <FormattedMessage id='global.additionalInfo' defaultMessage='Additional Info' />
        </Header>
        <CustomSegment>
          <FormGroup data-test='settings_delivery_address_notes_inp'>
            <TimeInput
              label={formatMessage({ id: 'global.readyTime', defaultMessage: 'Ready Time' })}
              name='readyTime'
            />
            <TimeInput
              label={formatMessage({ id: 'global.closeTime', defaultMessage: 'Close Time' })}
              name='closeTime'
            />
          </FormGroup>
          <FormGroup widths='equal'>
            <Checkbox
              label={formatMessage({ id: 'global.liftGate', defaultMessage: 'Lift Gate' })}
              name='liftGate'
              inputProps={{ 'data-test': 'settings_delivery_address_liftGate_inp' }}
            />
          </FormGroup>
          <FormGroup widths='equal'>
            <Checkbox
              label={formatMessage({ id: 'global.forkLift', defaultMessage: 'Fork Lift' })}
              name='forkLift'
              inputProps={{ 'data-test': 'settings_delivery_address_forklift_inp' }}
            />
          </FormGroup>
          <FormGroup widths='equal'>
            <Checkbox
              label={formatMessage({ id: 'global.callAhead', defaultMessage: 'Call Ahead' })}
              name='callAhead'
              inputProps={{ 'data-test': 'settings_delivery_address_callAhead_inp' }}
            />
          </FormGroup>
          <FormGroup widths='equal' data-test='settings_delivery_address_emailPhone_inp'>
            <TextArea
              name='deliveryNotes'
              label={formatMessage({ id: 'global.deliveryNotes', defaultMessage: 'Delivery Notes' })}
              inputProps={{
                placeholder: formatMessage({
                  id: 'settings.warehouses.writeDeliveryNotesHere',
                  defaultMessage: 'Write Delivery Notes Here...'
                })
              }}
            />
          </FormGroup>
        </CustomSegment>
      </>
    )
  }

  render() {
    const {
      closeSidebar,
      popupValues,
      loading,
      intl: { formatMessage }
    } = this.props

    let initialValues = this.getInitialFormValues()

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={formValidation()}
        enableReinitialize
        onReset={closeSidebar}
        onSubmit={this.submitHandler}
        loading={loading}>
        {formikProps => (
          <>
            <CustomForm>
              <FlexSidebar
                visible={true}
                width='very wide'
                style={{ width: '630px' }}
                direction='right'
                animation='overlay'>
                <div>
                  <Dimmer inverted active={loading || this.state.loadSidebar}>
                    <Loader />
                  </Dimmer>
                  <CustomHighSegment basic>
                    {popupValues ? (
                      <FormattedMessage id='sidebar.edit' defaultMessage='EDIT' />
                    ) : (
                      <FormattedMessage id='sidebar.addNew' defaultMessage='ADD NEW' />
                    )}
                  </CustomHighSegment>
                </div>
                <FlexContent style={{ padding: '16px' }}>
                  <CustomSegmentContent basic>{this.renderEdit(formikProps)}</CustomSegmentContent>
                </FlexContent>
                <CustomDiv>
                  <Button.Reset
                    style={{ margin: '0 5px'}}
                    onClick={closeSidebar}
                    data-test='settings_branches_popup_reset_btn'
                  >
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Reset>
                  <CustomButtonSubmit
                    onClick={() => {
                      formikProps.validateForm().then(err => {
                        const errors = Object.keys(err)
                        if (errors.length && errors[0] !== 'isCanceled') {
                          // Errors found
                          formikProps.submitForm() // to show errors
                        } else {
                          // No errors found
                          this.setState({ loadSidebar: true })
                          this.submitHandler(formikProps.values, formikProps.setSubmitting)
                        }
                      })
                    }}
                    data-test='settings_branches_popup_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save'>
                      {text => text}
                    </FormattedMessage>
                  </CustomButtonSubmit>
                </CustomDiv>
              </FlexSidebar>
            </CustomForm>
          </>
        )}
      </Formik>
    )
  }
}

const mapDispatchToProps = {
  updateDeliveryAddresses,
  createDeliveryAddress,
  closeSidebar
}

const mapStateToProps = state => {
  return {
    hasProvinces: state.settings.popupValues ? state.settings.popupValues.hasProvinces : false,
    popupValues: state.settings.popupValues,
    country: state.settings.country,
    countries: state.settings.countries,
    provincesDropDown: state.settings.provincesDropDown,
    company: getSafe(() => state.auth.identity.company.id, null),
    isOpenSidebar: state.settings.isOpenSidebar,
    loading: state.settings.loading
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(DeliveryLocationsSidebar)))
