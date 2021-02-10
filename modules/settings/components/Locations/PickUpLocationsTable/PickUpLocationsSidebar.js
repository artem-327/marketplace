import { Component } from 'react'
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
} from '../../../actions'
import { Input, Checkbox, TextArea, Button } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import styled from 'styled-components'

import { FormattedMessage, injectIntl } from 'react-intl'

import {
  addressValidationSchema,
  errorMessages,
  minOrZeroLength,
  validateTime,
  phoneValidation
} from '~/constants/yupValidation'

import { AddressForm } from '~/modules/address-form/'

import { getSafe } from '~/utils/functions'
import { PhoneNumber } from '~/modules/phoneNumber'
import { HighSegment } from '~/modules/inventory/constants/layout'
import DocumentTab from '~/components/document-tab'
import { AlertCircle } from 'react-feather'
import { Required } from '~/components/constants/layout'
import { removeEmpty } from '~/utils/functions'
import { TimeInput } from '~/components/custom-formik/'
import ErrorFocus from '~/components/error-focus'
import { Store } from '@material-ui/icons'
import { X as XIcon, ChevronDown } from 'react-feather'
//Actions
import { chatWidgetVerticalMoved } from '../../../../chatWidget/actions'
//Components
import BasicButton from '../../../../../components/buttons/BasicButton'

//Styles
import {
  FlexSidebar,
  FlexContent,
  CustomSegmentContent,
  DivBottomSidebar,
  DimmerSidebarOpend,
  DivIconChevronDown
} from '../Locations.styles'

const CustomButtonSubmit = styled(Button.Submit)`
  &.ui.primary.button {
    font-size: 1em;
    margin: 0 0.357142857em;
    padding: 9px 18px 9px;
    border: none;
    background-color: #2599d5;
    color: #ffffff;

    &:hover {
      background-color: #188ec9;
    }

    &.disabled {
      background-color: #bde0f2;
      color: #ffffff;
    }
  }
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
  z-index: 1;

  &.add-form {
    padding: 1.071428571em 2.142857143em !important;
    font-size: 14px;
    font-weight: 500;
    color: #20273a;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6 !important;
    background-color: #ffffff !important;
    display: flex !important;
    flex-direction: row !important;
  }

  svg {
    font-size: 18px;
    vertical-align: middle;
  }

  svg.title-icon {
    margin-left: 15px;
    color: #cecfd4;
  }

  svg.close-icon {
    right: 0;
    position: absolute;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`

const Rectangle = styled.div`
  border-radius: 4px;
  border: solid 1px orange;
  background-color: #ffffff;
  margin: 14px 0 20px 0;
  align-items: center;
  display: block;
  padding: 13px 11px;
`

const CustomDivTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #20273a;
  display: flex;
`

const CustomDivContent = styled.div`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #848893;
  padding-left: 33px;
`

const CustomDivInTitle = styled.div`
  padding-left: 10px;
`

const CustomMenu = styled(Menu)`
  padding-left: 30px !important;
  margin: 0 !important;
`

const minLength = errorMessages.minLength(3)

const formValidation = () =>
  Yup.object().shape({
    deliveryAddress: Yup.object().shape({
      address: addressValidationSchema(),
      addressName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
      contactName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
      contactPhone: phoneValidation(10).required(errorMessages.requiredMessage),
      contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
      readyTime: validateTime(),
      closeTime: validateTime()
    })
  })

class PickUpLocationsSidebar extends Component {
  state = {
    editTab: 0,
    attachmentFiles: [],
    loadSidebar: false
  }
  componentDidMount() {
    const { sidebarValues, getProvinces, openTab } = this.props
    sidebarValues && sidebarValues.hasProvinces && getProvinces(sidebarValues.countryId)
    openTab && this.setState({ editTab: this.props.openTab })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.openTab !== this.props.openTab) {
      this.setState({ editTab: this.props.openTab })
    }
  }

  submitHandler = async (values, setSubmitting) => {
    const { sidebarValues, putEditWarehouse, postNewWarehouseRequest, openGlobalAddForm } = this.props
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
      warehouse: !values.alsoCreate
    }
    removeEmpty(requestData)

    try {
      if (sidebarValues) {
        await putEditWarehouse(requestData, sidebarValues.id, attachmentFiles)
      } else {
        await postNewWarehouseRequest(true, requestData, attachmentFiles)
      }
      if (openGlobalAddForm) openGlobalAddForm('')
    } catch {
    } finally {
      setSubmitting(false)
      this.setState({ loadSidebar: false })
    }
  }

  getInitialFormValues = () => {
    let { sidebarValues } = this.props

    const provinceId = getSafe(() => sidebarValues.deliveryAddress.address.province.id, '')
    const countryId = getSafe(() => sidebarValues.deliveryAddress.address.country.id, null)
    const hasProvinces = getSafe(() => sidebarValues.deliveryAddress.address.country.hasProvinces, false)
    const zip = getSafe(() => sidebarValues.deliveryAddress.address.zip.zip, '')
    const zipID = getSafe(() => sidebarValues.deliveryAddress.address.zip.id, '')

    const initialValues = {
      //name: r.name,
      taxId: getSafe(() => sidebarValues.taxId, ''),
      //warehouse: getSafe(() => sidebarValues.warehouse, false),
      deliveryAddress: {
        address: {
          streetAddress: getSafe(() => sidebarValues.deliveryAddress.address.streetAddress, ''),
          city: getSafe(() => sidebarValues.deliveryAddress.address.city, ''),
          province: provinceId,
          country: countryId ? JSON.stringify({ countryId, hasProvinces }) : '',
          zip
        },
        readyTime: getSafe(() => sidebarValues.deliveryAddress.readyTime, ''),
        closeTime: getSafe(() => sidebarValues.deliveryAddress.closeTime, ''),
        liftGate: getSafe(() => sidebarValues.deliveryAddress.liftGate, false),
        forkLift: getSafe(() => sidebarValues.deliveryAddress.forkLift, false),
        callAhead: getSafe(() => sidebarValues.deliveryAddress.callAhead, false),
        deliveryNotes: getSafe(() => sidebarValues.deliveryAddress.deliveryNotes, ''),
        addressName: getSafe(() => sidebarValues.deliveryAddress.addressName, ''),
        contactName: getSafe(() => sidebarValues.deliveryAddress.contactName, ''),
        contactPhone: getSafe(() => sidebarValues.deliveryAddress.contactPhone, ''),
        contactEmail: getSafe(() => sidebarValues.deliveryAddress.contactEmail, '')
      },
      attachments: getSafe(() => sidebarValues.attachments, []),
      zipID,
      countryId,
      hasProvinces,
      branchId: getSafe(() => sidebarValues.id, ''),
      province: getSafe(() => sidebarValues.deliveryAddress.address.province, ''),
      alsoCreate: false
    }

    return initialValues
  }

  tabChanged = index => {
    this.setState({ editTab: index })
  }

  renderEdit = formikProps => {
    const {
      intl: { formatMessage },
      sidebarValues
    } = this.props
    const { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = formikProps

    return (
      <>
        <FormGroup style={{ marginTop: '14px' }} widths='equal' data-test='settings_warehouse_popup_name_inp'>
          <Input
            type='text'
            label={
              <>
                <FormattedMessage id='settings.pickUpLocationName' defaultMessage='Warehouse Name' />
                <Required />
              </>
            }
            name='deliveryAddress.addressName'
            inputProps={{
              placeholder: formatMessage({
                id: 'settings.warehouses.enterWarehouseName',
                defaultMessage: 'Enter Warehouse Name'
              })
            }}
          />
        </FormGroup>

        <AddressForm
          prefix={'deliveryAddress'}
          required={true}
          setFieldValue={setFieldValue}
          values={values}
          initialZipCodes={[
            {
              key: values.zipID.toString(),
              value: values.deliveryAddress.address.zip,
              text: values.deliveryAddress.address.zip
            }
          ]}
        />

        <Header as='h3'>
          <FormattedMessage id='settings.contactInfo' defaultMessage='Contact Info' />
        </Header>
        <CustomSegment>
          <FormGroup data-test='settings_warehouse_popup_contactName_inp'>
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
                placeholder: formatMessage({
                  id: 'settings.warehouses.enterContactName',
                  defaultMessage: 'Enter Contact Name'
                })
              }}
            />
          </FormGroup>
          <FormGroup widths='equal' data-test='settings_warehouse_popup_phoneEmail_inp'>
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
                placeholder: formatMessage({
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
              name='deliveryAddress.readyTime'
            />
            <TimeInput
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
          </FormGroup>
          <FormGroup widths='equal'>
            <Checkbox
              label={formatMessage({ id: 'global.forkLift', defaultMessage: 'Fork Lift' })}
              name='deliveryAddress.forkLift'
              inputProps={{ 'data-test': 'settings_delivery_address_forklift_inp' }}
            />
          </FormGroup>
          <FormGroup widths='equal'>
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
              inputProps={{
                placeholder: formatMessage({
                  id: 'settings.warehouses.enterTaxId',
                  defaultMessage: 'Enter Tax ID'
                })
              }}
            />
          </FormGroup>
          <FormGroup widths='equal' data-test='settings_delivery_address_emailPhone_inp'>
            <TextArea
              name='deliveryAddress.deliveryNotes'
              label={formatMessage({ id: 'global.deliveryNotes', defaultMessage: 'Delivery Notes' })}
              inputProps={{
                placeholder: formatMessage({
                  id: 'settings.warehouses.writeDeliveryNotesHere',
                  defaultMessage: 'Write Delivery Notes Here'
                })
              }}
            />
          </FormGroup>
        </CustomSegment>
        {!sidebarValues && (
          <FormGroup data-test='settings_branches_popup_contactName_inp'>
            <Checkbox
              label={formatMessage({ id: 'settings.alsoCreateAsBranch', defaultMessage: 'Also create as Branch' })}
              name='alsoCreate'
              inputProps={{ 'data-test': 'settings_branches_popup_pick_up_location_chckb' }}
            />
          </FormGroup>
        )}
      </>
    )
  }

  renderCertificates = formikProps => {
    const { removeAttachmentLinkToBranch, removeAttachment, addAttachment, loadFile, sidebarValues } = this.props
    const { setFieldValue, values } = formikProps
    return (
      <>
        {getSafe(() => sidebarValues.attachments.length, false) &&
        getSafe(() => sidebarValues.deliveryAddress.address.country.name, false) === 'USA' ? (
          <Rectangle>
            <CustomDivTitle>
              <AlertCircle color='orange' size={24} />
              <CustomDivInTitle>
                <FormattedMessage
                  id='settings.warehouse.certificates.message.title'
                  defaultMessage='This state/province already has certificate documents uploaded'>
                  {text => text}
                </FormattedMessage>
              </CustomDivInTitle>
            </CustomDivTitle>
            <CustomDivContent>
              <FormattedMessage
                id='settings.warehouse.certificates.message.content'
                defaultMessage='If you want to update the documents, you will replace all existing certificates for warehouses in this state.'>
                {text => text}
              </FormattedMessage>
            </CustomDivContent>
          </Rectangle>
        ) : null}
        <DocumentTab
          listDocumentTypes={[
            { key: 14, text: 'Resale Certificate', value: 14 },
            { key: 13, text: 'Sales Tax Exemption Certificate', value: 13 }
          ]}
          documentTypeIds={[13, 14]}
          lockedFileTypes={true}
          values={values}
          setFieldValue={setFieldValue}
          setFieldNameAttachments='attachments'
          dropdownName='documentType'
          removeAttachmentLink={removeAttachmentLinkToBranch}
          removeAttachment={removeAttachment}
          addAttachment={addAttachment}
          loadFile={loadFile}
          changedForm={files =>
            this.setState(prevState => ({
              attachmentFiles: prevState.attachmentFiles.concat(files)
            }))
          }
          idForm={getSafe(() => sidebarValues.id, 0)}
          attachmentFiles={this.state.attachmentFiles}
          removeAttachmentFromUpload={id => {
            const attachmentFiles = this.state.attachmentFiles.filter(attachment => attachment.id !== id)
            this.setState({ attachmentFiles })
          }}
        />
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
        // Certificates
        return this.renderCertificates(formikProps)
      }

      default:
        return null
    }
  }

  render() {
    const {
      closeSidebar,
      sidebarValues,
      isOpenSidebar,
      openGlobalAddForm,
      loading,
      intl: { formatMessage },
      chatWidgetVerticalMoved
    } = this.props

    const { editTab } = this.state

    let initialValues = this.getInitialFormValues()

    const tabs = [
      sidebarValues
        ? { text: { id: 'sidebar.edit', defaultMessage: 'EDIT' }, key: 'edit' }
        : { text: { id: 'sidebar.addNew', defaultMessage: 'ADD NEW' }, key: 'addNew' },
      { text: { id: 'sidebar.certificates', defaultMessage: 'CERTIFICATES' }, key: 'certificates' }
    ]

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={formValidation()}
        enableReinitialize
        onReset={() => {
          if (openGlobalAddForm) {
            openGlobalAddForm('')
          } else {
            closeSidebar()
            chatWidgetVerticalMoved(false)
          }
        }}
        onSubmit={this.submitHandler}
        loading={loading}>
        {formikProps => (
          <>
            <CustomForm autoComplete='off'>
              <DimmerSidebarOpend
                active={isOpenSidebar}
                onClickOutside={() => {
                  closeSidebar()
                  chatWidgetVerticalMoved(false)
                }}
                page></DimmerSidebarOpend>
              <FlexSidebar visible={true} width='very wide' inverted direction='bottom' animation='overlay'>
                <div>
                  <Dimmer inverted active={loading || this.state.loadSidebar}>
                    <Loader />
                  </Dimmer>
                  <CustomHighSegment basic className={openGlobalAddForm ? 'add-form' : ''}>
                    {openGlobalAddForm ? (
                      <>
                        <div>
                          <span>
                            <FormattedMessage id='createMenu.addWarehouse' defaultMessage='Add Warehouse' />
                          </span>
                          <Store className='title-icon' />
                        </div>
                        <div style={{ position: 'absolute', right: '20px' }}>
                          <XIcon onClick={() => openGlobalAddForm('')} className='close-icon' />
                        </div>
                      </>
                    ) : (
                      <CustomMenu pointing secondary>
                        {tabs.map((tab, i) => (
                          <Menu.Item
                            key={tab.key}
                            onClick={() => this.tabChanged(i)}
                            active={editTab === i}
                            disabled={tab.key === 'certificates' && !formikProps.values.branchId}>
                            {formatMessage(tab.text)}
                          </Menu.Item>
                        ))}
                        <DivIconChevronDown
                          onClick={() => {
                            closeSidebar()
                            chatWidgetVerticalMoved(false)
                          }}>
                          <ChevronDown />
                        </DivIconChevronDown>
                      </CustomMenu>
                    )}
                  </CustomHighSegment>
                </div>
                <FlexContent style={{ padding: '16px' }}>
                  <CustomSegmentContent basic>{this.getContent(formikProps)}</CustomSegmentContent>
                </FlexContent>
                <DivBottomSidebar>
                  {!openGlobalAddForm && (
                    <BasicButton
                      noBorder
                      onClick={() => {
                        closeSidebar()
                        chatWidgetVerticalMoved(false)
                      }}
                      data-test='settings_warehouse_popup_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </BasicButton>
                  )}
                  <BasicButton
                    onClick={() => {
                      formikProps.validateForm().then(async err => {
                        const errors = Object.keys(err)
                        if (errors.length && errors[0] !== 'isCanceled') {
                          // Errors found
                          formikProps.submitForm() // to show errors
                        } else {
                          // No errors found
                          this.setState({ loadSidebar: true })
                          await this.submitHandler(formikProps.values, formikProps.setSubmitting)
                          await chatWidgetVerticalMoved(false)
                        }
                      })
                    }}
                    data-test='settings_warehouse_popup_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save'>
                      {text => text}
                    </FormattedMessage>
                  </BasicButton>
                </DivBottomSidebar>
              </FlexSidebar>
              <ErrorFocus />
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
  loadFile,
  chatWidgetVerticalMoved
}

const mapStateToProps = state => {
  return {
    hasProvinces: state.settings.sidebarValues ? state.settings.sidebarValues.hasProvinces : false,
    sidebarValues: state.settings.sidebarValues,
    country: state.settings.country,
    countries: state.settings.countries,
    provincesDropDown: state.settings.provincesDropDown,
    company: getSafe(() => state.auth.identity.company.id, null),
    isOpenSidebar: state.settings.isOpenSidebar,
    loading: state.settings.loading,
    openTab: state.settings.openTab
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(PickUpLocationsSidebar)))
