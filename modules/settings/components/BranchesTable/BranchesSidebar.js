import React from 'react'
import { connect } from 'react-redux'
import { withDatagrid } from '~/modules/datagrid'
import { Formik } from 'formik'
import { Header, FormGroup, Dimmer, Loader, Menu, Segment, Form } from 'semantic-ui-react'
import {
  closeSidebar,
  putEditWarehouse,
  postNewWarehouseRequest,
  getProvinces,
  getAddressSearch,
  removeAttachmentLinkToBranch,
  removeAttachment,
  addAttachment,
  loadFile
} from '../../actions'
import { Input, Checkbox, TextArea, Button } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import styled from 'styled-components'

import { FormattedMessage, injectIntl } from 'react-intl'

import { addressValidationSchema, errorMessages, minOrZeroLength } from '~/constants/yupValidation'

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
    deliveryAddress: Yup.object().shape({
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
        .required(errorMessages.requiredMessage)
    })
  })

class BranchSidebar extends React.Component {
  state = {
    editTab: 0,
    attachmentFiles: [],
    loadSidebar: false
  }
  componentDidMount() {
    const { popupValues, getProvinces, openTab } = this.props
    popupValues && popupValues.hasProvinces && getProvinces(popupValues.countryId)
    openTab && this.setState({ editTab: this.props.openTab })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.openTab !== this.props.openTab) {
      this.setState({ editTab: this.props.openTab })
    }
  }

  submitHandler = async (values, setSubmitting) => {
    const { popupValues, putEditWarehouse, postNewWarehouseRequest } = this.props
    const { attachmentFiles } = this.state
    let country = JSON.parse(values.deliveryAddress.address.country).countryId
    let requestData = {}

    requestData = {
      deliveryAddress: {
        ...values.deliveryAddress,
        readyTime:
          !values.deliveryAddress.readyTime || values.deliveryAddress.readyTime === ''
            ? null
            : values.deliveryAddress.readyTime,
        closeTime:
          !values.deliveryAddress.closeTime || values.deliveryAddress.closeTime === ''
            ? null
            : values.deliveryAddress.closeTime,
        address: {
          ...values.deliveryAddress.address,
          country
        }
      },
      taxId: values.taxId,
      warehouse: false
    }
    removeEmpty(requestData)

    try {
      if (popupValues) {
        await putEditWarehouse(requestData, popupValues.id, attachmentFiles)
      } else {
        await postNewWarehouseRequest(requestData, attachmentFiles)
      }
    } catch {
    } finally {
      setSubmitting(false)
      this.setState({ loadSidebar: false })
    }
  }

  getInitialFormValues = () => {
    let { popupValues } = this.props

    const provinceId = getSafe(() => popupValues.deliveryAddress.address.province.id, '')
    const countryId = getSafe(() => popupValues.deliveryAddress.address.country.id, null)
    const hasProvinces = getSafe(() => popupValues.deliveryAddress.address.country.hasProvinces, false)
    const zip = getSafe(() => popupValues.deliveryAddress.address.zip.zip, '')
    const zipID = getSafe(() => popupValues.deliveryAddress.address.zip.id, '')

    const initialValues = {
      //name: r.name,
      taxId: getSafe(() => popupValues.taxId, ''),
      deliveryAddress: {
        address: {
          streetAddress: getSafe(() => popupValues.deliveryAddress.address.streetAddress, ''),
          city: getSafe(() => popupValues.deliveryAddress.address.city, ''),
          province: provinceId,
          country: countryId ? JSON.stringify({ countryId, hasProvinces }) : '',
          zip
        },
        readyTime: getSafe(() => popupValues.deliveryAddress.readyTime, ''),
        closeTime: getSafe(() => popupValues.deliveryAddress.closeTime, ''),
        liftGate: getSafe(() => popupValues.deliveryAddress.liftGate, false),
        forkLift: getSafe(() => popupValues.deliveryAddress.forkLift, false),
        callAhead: getSafe(() => popupValues.deliveryAddress.callAhead, false),
        deliveryNotes: getSafe(() => popupValues.deliveryAddress.deliveryNotes, ''),
        addressName: getSafe(() => popupValues.deliveryAddress.addressName, ''),
        contactName: getSafe(() => popupValues.deliveryAddress.contactName, ''),
        contactPhone: getSafe(() => popupValues.deliveryAddress.contactPhone, ''),
        contactEmail: getSafe(() => popupValues.deliveryAddress.contactEmail, '')
      },
      attachments: getSafe(() => popupValues.attachments, []),
      zipID,
      countryId,
      hasProvinces,
      branchId: getSafe(() => popupValues.id, ''),
      province: getSafe(() => popupValues.deliveryAddress.address.province, '')
    }

    return initialValues
  }

  tabChanged = index => {
    this.setState({ editTab: index })
  }

  renderEdit = formikProps => {
    const {
      intl: { formatMessage }
    } = this.props
    const { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = formikProps

    return (
      <>
        <FormGroup widths='equal' data-test='settings_branches_popup_name_inp'>
          <Input
            type='text'
            label={<FormattedMessage id='settings.branchName' defaultMessage='Branch Name' />}
            name='deliveryAddress.addressName'
            inputProps={{
              placeholder:
                formatMessage({
                  id: 'settings.warehouses.enterBranchName',
                  defaultMessage: 'Enter Branch Name'
                })
            }}
          />
        </FormGroup>

        <AddressForm
          prefix={'deliveryAddress'}
          required={true}
          setFieldValue={setFieldValue}
          values={values}
          initialZipCodes={[{
            key: values.zipID.toString(),
            value: values.deliveryAddress.address.zip,
            text: values.deliveryAddress.address.zip
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
              name='deliveryAddress.contactName'
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
              name='deliveryAddress.contactPhone'
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
              name='deliveryAddress.contactEmail'
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
      </>
    )
  }

  render() {
    const {
      closeSidebar,
      popupValues,
      isOpenSidebar,
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
                visible={isOpenSidebar}
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
  postNewWarehouseRequest,
  putEditWarehouse,
  closeSidebar,
  getProvinces,
  getAddressSearch,
  removeAttachmentLinkToBranch,
  removeAttachment,
  addAttachment,
  loadFile
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
    loading: state.settings.loading,
    openTab: state.settings.openTab
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(BranchSidebar)))
