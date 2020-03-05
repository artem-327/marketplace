import React from 'react'
import { connect } from 'react-redux'

import { Header, Modal, FormGroup, Dimmer, Loader, Menu, Segment } from 'semantic-ui-react'
import {
  closePopup,
  handlerSubmitWarehouseEditPopup,
  postNewWarehouseRequest,
  getProvinces,
  getAddressSearch,
  removeEmpty,
  removeAttachmentLink,
  removeAttachment
} from '../../actions'
import { Form, Input, Button, Dropdown, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import Router from 'next/router'
import styled from 'styled-components'

import { FormattedMessage, injectIntl } from 'react-intl'

import { addressValidationSchema, errorMessages, minOrZeroLength } from '~/constants/yupValidation'

import { AddressForm } from '~/modules/address-form/'

import { getSafe } from '~/utils/functions'
import { PhoneNumber } from '~/modules/phoneNumber'
import { FlexSidebar, HighSegment, FlexContent } from '~/modules/inventory/components/DetailSidebar'
import { DocumentTab } from '~/components/document-tab'

const CustomButtonSubmit = styled(Button.Submit)`
  background-color: #2599d5 !important;
  color: #fff !important;
`

const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
`

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`

const CustomDiv = styled.div`
  text-align: right;
  z-index: 1;
  padding-right: 22px;
  padding-top: 10px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
`

const CustomHighSegment = styled(HighSegment)`
  margin: 0 !important;
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

class WarehouseSidebar extends React.Component {
  state = {
    editTab: 0
  }
  componentDidMount() {
    this.props.popupValues &&
      this.props.popupValues.hasProvinces &&
      this.props.getProvinces(this.props.popupValues.countryId)

    this.fetchIfNoData('listDocumentTypes', this.props.getDocumentTypes)
  }

  fetchIfNoData = (name, fn) => {
    if (this.props[name].length === 0) fn()
  }

  submitHandler = async (values, actions) => {
    let { popupValues, currentTab } = this.props
    console.log('popupValues====================================')
    console.log(popupValues)
    console.log('====================================')
    console.log('values====================================')
    console.log(values)
    console.log('====================================')
    const { handlerSubmitWarehouseEditPopup, postNewWarehouseRequest } = this.props
    let country = JSON.parse(values.deliveryAddress.address.country).countryId

    let requestData = {}
    if (currentTab.type === 'branches') {
      requestData = {
        deliveryAddress: {
          address: {
            ...values.deliveryAddress.address,
            country
          },
          addressName: values.deliveryAddress.addressName,
          contactName: values.deliveryAddress.contactName,
          contactPhone: values.deliveryAddress.contactPhone,
          contactEmail: values.deliveryAddress.contactEmail
        },
        warehouse: false
      }
    }

    if (currentTab.type === 'warehouses') {
      requestData = {
        ...values,
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
        warehouse: true
      }
    }

    try {
      if (popupValues) {
        await handlerSubmitWarehouseEditPopup(
          {
            ...requestData,
            company: this.props.company
          },
          popupValues.branchId
        )
      } else {
        await postNewWarehouseRequest({
          ...requestData
        })
      }
    } catch {
    } finally {
      actions.setSubmitting(false)
    }
  }

  getInitialFormValues = () => {
    let { popupValues } = this.props

    return getSafe(() => popupValues.initialValues, {
      taxId: '',
      deliveryAddress: {
        address: {
          streetAddress: '',
          city: '',
          country: '',
          zip: '',
          province: ''
        },
        readyTime: null,
        closeTime: null,
        liftGate: false,
        forkLift: false,
        deliveryNotes: '',
        addressName: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        callAhead: false,
        attachments: ''
      }
    })
  }

  tabChanged = index => {
    this.setState({ editTab: index })
  }

  renderEdit = formikProps => {
    const {
      currentTab,
      intl: { formatMessage }
    } = this.props
    const { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = formikProps

    const name =
      currentTab.type === 'branches' ? (
        <FormattedMessage id='settings.branchName' defaultMessage='Branch Name' />
      ) : (
        <FormattedMessage id='settings.warehouseName' defaultMessage='Warehouse Name' />
      )

    return (
      <>
        <FormGroup widths='equal' data-test='settings_warehouse_popup_name_inp'>
          <Input type='text' label={name} name='deliveryAddress.addressName' />
        </FormGroup>

        <AddressForm prefix={'deliveryAddress'} setFieldValue={setFieldValue} values={values} />

        <Header as='h3'>
          <FormattedMessage id='settings.contactInfo' defaultMessage='Contact Info' />
        </Header>
        <CustomSegment>
          <FormGroup data-test='settings_warehouse_popup_contactName_inp'>
            <Input
              type='text'
              label={formatMessage({ id: 'global.contactName', defaultMessage: 'Contact Name' })}
              name='deliveryAddress.contactName'
              fieldProps={{ width: 8 }}
            />
          </FormGroup>
          <FormGroup widths='equal' data-test='settings_warehouse_popup_phoneEmail_inp'>
            <PhoneNumber
              name='deliveryAddress.contactPhone'
              values={values}
              label={<FormattedMessage id='global.phone' defaultMessage='Phone' />}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting}
            />
            <Input
              type='text'
              label={formatMessage({ id: 'global.contactEmail', defaultMessage: 'Contact Email' })}
              name='deliveryAddress.contactEmail'
            />
          </FormGroup>
        </CustomSegment>
        {getSafe(() => currentTab.type, '') === 'warehouses' ? (
          <>
            <Header as='h3'>
              <FormattedMessage id='global.additionalInfo' defaultMessage='Additional Info' />
            </Header>
            <CustomSegment>
              <FormGroup
                widths='equal'
                data-test='settings_delivery_address_notes_inp'
                style={{ alignItems: 'center' }}>
                <Input
                  inputProps={{ type: 'time' }}
                  label={formatMessage({ id: 'global.readyTime', defaultMessage: 'Ready Time' })}
                  name='deliveryAddress.readyTime'
                />
                <Input
                  inputProps={{ type: 'time' }}
                  label={formatMessage({ id: 'global.closeTime', defaultMessage: 'Close Time' })}
                  name='deliveryAddress.closeTime'
                />
              </FormGroup>
              <FormGroup widths='equal'>
                <Checkbox
                  label={formatMessage({ id: 'global.liftGate', defaultMessage: 'Lift Gate' })}
                  name='deliveryAddress.liftGate'
                  inputProps={{ 'data-test': 'settings_delivery_address_liftGate_inp' }}
                />
                <Checkbox
                  label={formatMessage({ id: 'global.forkLift', defaultMessage: 'Fork Lift' })}
                  name='deliveryAddress.forkLift'
                  inputProps={{ 'data-test': 'settings_delivery_address_forklift_inp' }}
                />
                <Checkbox
                  label={formatMessage({ id: 'global.callAhead', defaultMessage: 'Call Ahead' })}
                  name='deliveryAddress.callAhead'
                  inputProps={{ 'data-test': 'settings_delivery_address_callAhead_inp' }}
                />
              </FormGroup>
              <FormGroup data-test='settings_warehouse_popup_taxId_inp'>
                <Input
                  type='text'
                  label={formatMessage({ id: 'global.taxId', defaultMessage: 'Tax ID' })}
                  name='taxId'
                  fieldProps={{ width: 8 }}
                />
              </FormGroup>
              <FormGroup widths='equal' data-test='settings_delivery_address_emailPhone_inp'>
                <TextArea
                  name='deliveryAddress.deliveryNotes'
                  label={formatMessage({ id: 'global.deliveryNotes', defaultMessage: 'Delivery Notes' })}
                />
              </FormGroup>
            </CustomSegment>
          </>
        ) : null}
      </>
    )
  }

  renderCertificates = formikProps => {
    const {
      currentTab,
      listDocumentTypes,
      removeAttachmentLink,
      removeAttachment,
      intl: { formatMessage }
    } = this.props
    const { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = formikProps
    return (
      <>
        {/* <DocumentTab
          listDocumentTypes={listDocumentTypes}
          values={values}
          setFieldValue={setFieldValue}
          setFieldNameAttachments='attachments'
          tableName='warehouse_attachments'
          removeAttachmentLink={removeAttachmentLink}
          removeAttachment={removeAttachment}
        /> */}
      </>
    )
  }

  getContent = formikProps => {
    let { editTab } = this.state
    switch (editTab) {
      case 0: {
        // Edit
        return this.renderEdit(formikProps)
      }

      case 1: {
        // Edit
        return this.renderCertificates(formikProps)
      }

      default:
        return null
    }
  }

  render() {
    // const {
    //   AddressSuggestInput,
    // } = this.props

    const {
      closePopup,
      popupValues,
      isOpenPopup,
      loading,
      intl: { formatMessage }
    } = this.props
    console.log('popupValues====================================')
    console.log(popupValues)
    console.log('====================================')

    const { editTab } = this.state

    let initialValues = this.getInitialFormValues()

    const tabs = [
      popupValues
        ? { text: { id: 'sidebar.edit', defaultMessage: 'EDIT' }, key: 'edit' }
        : { text: { id: 'sidebar.addNew', defaultMessage: 'ADD NEW' }, key: 'addNew' },
      { text: { id: 'sidebar.certificates', defaultMessage: 'CERTIFICATES' }, key: 'certificates' }
    ]

    return (
      <CustomForm
        initialValues={initialValues}
        validationSchema={formValidation()}
        enableReinitialize
        onReset={closePopup}
        onSubmit={this.submitHandler}>
        {formikProps => (
          <>
            <FlexSidebar
              visible={isOpenPopup}
              width='very wide'
              style={{ width: '500px' }}
              direction='right'
              animation='overlay'>
              <Dimmer inverted active={loading}>
                <Loader />
              </Dimmer>
              <div>
                <CustomHighSegment basic>
                  <Menu pointing secondary>
                    {tabs.map((tab, i) => (
                      <Menu.Item onClick={() => this.tabChanged(i)} active={editTab === i}>
                        {formatMessage(tab.text)}
                      </Menu.Item>
                    ))}
                  </Menu>
                </CustomHighSegment>
              </div>
              <FlexContent>
                <Segment basic>{this.getContent(formikProps)}</Segment>
              </FlexContent>
              <CustomDiv>
                <Button.Reset onClick={closePopup} data-test='settings_warehouse_popup_reset_btn'>
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                    {text => text}
                  </FormattedMessage>
                </Button.Reset>
                <CustomButtonSubmit data-test='settings_warehouse_popup_submit_btn'>
                  <FormattedMessage id='global.save' defaultMessage='Save'>
                    {text => text}
                  </FormattedMessage>
                </CustomButtonSubmit>
              </CustomDiv>
            </FlexSidebar>
          </>
        )}
      </CustomForm>
    )
  }
}

// const prepareAddressSuggest = (AddressSuggestOptions) => (
//   <datalist id='addresses'>
//     {AddressSuggestOptions.map((a, id) => <option key={id} value={a} />)}
//   </datalist>
// )

const mapDispatchToProps = {
  postNewWarehouseRequest,
  handlerSubmitWarehouseEditPopup,
  closePopup,
  getProvinces,
  getAddressSearch,
  removeEmpty,
  removeAttachmentLink,
  removeAttachment
}
const mapStateToProps = state => {
  // const AddressSuggestOptions = state.settings.addressSearch.map((a) => (
  //   a.streetAddress + ', ' + a.city + ', ' + a.zip.zip + ', ' + a.country.name + (a.province ? ', ' + a.province.name : '')
  // ))

  return {
    // AddressSuggestInput: prepareAddressSuggest(AddressSuggestOptions),
    // AddressSuggestOptions,
    // AddressSuggestData: state.settings.addressSearch,
    hasProvinces: state.settings.popupValues ? state.settings.popupValues.hasProvinces : false,
    popupValues: state.settings.popupValues,
    country: state.settings.country,
    countries: state.settings.countries,
    provincesDropDown: state.settings.provincesDropDown,
    currentTab:
      Router && Router.router && Router.router.query && Router.router.query.type
        ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type)
        : state.settings.tabsNames[0],
    company: getSafe(() => state.auth.identity.company.id, null),
    isOpenPopup: state.settings.isOpenPopup,
    loading: state.settings.loading,
    listDocumentTypes: state.settings.documentTypes
  }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(WarehouseSidebar))
