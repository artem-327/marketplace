import { Component } from 'react'
import { connect } from 'react-redux'
import { withDatagrid } from '../../../../../datagrid'
import { Formik } from 'formik'
import { Header, FormGroup, Dimmer, Loader, Segment, Form } from 'semantic-ui-react'
import { Input, Checkbox, Button } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
//Components
import { PhoneNumber } from '../../../../../phoneNumber'
import { AddressForm } from '../../../../../address-form/'
//Services
import { formValidation, getInitialFormValues } from './BranchesSidebar.services'
import { getSafe } from '../../../../../../utils/functions'
import { removeEmpty } from '../../../../../../utils/functions'
import ErrorFocus from '../../../../../../components/error-focus'
//Actions
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
} from '../../../../actions'
//Styles
import {
  CustomSegmentContent,
  CustomHighSegment,
  CustomDiv,
  CustomForm,
  CustomSegment,
  CustomButtonSubmit
} from './BranchesSidebar.styles'
import { FlexSidebar, FlexContent } from '../../../../../inventory/constants/layout'
import { Required } from '../../../../../../components/constants/layout'

class BranchSidebar extends Component {
  state = {
    attachmentFiles: [],
    loadSidebar: false
  }
  componentDidMount() {
    const { sidebarValues, getProvinces } = this.props
    sidebarValues && sidebarValues.hasProvinces && getProvinces(sidebarValues.countryId)
  }

  submitHandler = async (values, setSubmitting) => {
    const { sidebarValues, putEditWarehouse, postNewWarehouseRequest } = this.props
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
      if (sidebarValues) {
        await putEditWarehouse(requestData, sidebarValues.id, attachmentFiles)
      } else {
        await postNewWarehouseRequest(values.alsoCreate, requestData, attachmentFiles)
      }
    } catch {
    } finally {
      setSubmitting(false)
      this.setState({ loadSidebar: false })
    }
  }

  renderEdit = formikProps => {
    const {
      intl: { formatMessage },
      sidebarValues
    } = this.props
    const { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = formikProps

    return (
      <>
        <FormGroup widths='equal' style={{ marginTop: '14px' }} data-test='settings_branches_popup_name_inp'>
          <Input
            type='text'
            label={
              <>
                <FormattedMessage id='settings.branchName' defaultMessage='Branch Name' />
                <Required />
              </>
            }
            name='deliveryAddress.addressName'
            inputProps={{
              placeholder: formatMessage({
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
                placeholder: formatMessage({
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
                placeholder: formatMessage({
                  id: 'settings.warehouses.enterEmailAddress',
                  defaultMessage: 'Enter Email Address'
                })
              }}
            />
          </FormGroup>
        </CustomSegment>

        {!sidebarValues && (
          <FormGroup data-test='settings_branches_popup_contactName_inp'>
            <Checkbox
              label={formatMessage({
                id: 'settings.alsoCreateAsPickUpLocation',
                defaultMessage: 'Also create as Warehouse'
              })}
              name='alsoCreate'
              inputProps={{ 'data-test': 'settings_branches_popup_pick_up_location_chckb' }}
            />
          </FormGroup>
        )}
      </>
    )
  }

  render() {
    const {
      closeSidebar,
      sidebarValues,
      isOpenSidebar,
      loading,
      intl: { formatMessage }
    } = this.props

    let initialValues = getInitialFormValues(sidebarValues)

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
            <CustomForm autoComplete='off'>
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
                    {sidebarValues ? (
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
                    style={{ margin: '0 5px' }}
                    onClick={closeSidebar}
                    data-test='settings_branches_popup_reset_btn'>
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
  loadFile
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
    loading: state.settings.loading
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(BranchSidebar)))
