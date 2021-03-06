import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withDatagrid } from '../../../../../datagrid'
import { Formik } from 'formik'
import { Dimmer, Loader, Segment, Form, FormGroup, Divider } from 'semantic-ui-react'
import { Button, Input, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import { ChevronDown } from 'react-feather'

// Components
import BasicButton from '../../../../../../components/buttons/BasicButton'
import { AddressForm } from '../../../../../address-form'
import { PhoneNumber } from '../../../../../phoneNumber'
import { Required } from "../../../../../../components/constants/layout"
import { TimeInput } from '../../../../../../components/custom-formik'

// Services
import { formValidation, getInitialFormValues, submitHandler } from './MyCustomersSidebar.services'
import { getSafe } from '../../../../../../utils/functions'
import ErrorFocus from '../../../../../../components/error-focus'

// Actions
import * as Actions from '../../../../actions'

// Styles
import {
  FormCustom,
  SidebarFlex,
  SegmentTopSidebar,
  DivTitle,
  DimmerStyled,
  DivSectionHeader,
  DivFlexContent,
  SegmentCustomContent,
  DivBottomSidebar
} from '../MyCustomers.styles'
import { CustomHighSegment } from "../../Branches/BranchesSidebar/BranchesSidebar.styles"
import {
  DivBottomButton,
  BasicButtonStyled,
  DivIconWrapper,
  Trash2Icon,
  DivRowFlex,
  DivInputWrapper
} from './MyCustomersSidebar.styles'

// Constants
import { INITIAL_VALUES, INIT_VALUES_WAREHOUSE } from './MyCustomersSidebar.constants'
//INIT_VALUES_WAREHOUSE
const MyCustomersSidebar = props => {

  const {
    intl: { formatMessage },
    sidebarValues
  } = props

  return (
    <Formik
      initialValues={{
        ...INITIAL_VALUES,
        ...getInitialFormValues(sidebarValues),
        ...(sidebarValues === null && { warehouseAddresses: [INIT_VALUES_WAREHOUSE]})
      }}
      validationSchema={formValidation()}
      enableReinitialize
      onReset={() => props.closeSidebar()}
      onSubmit={submitHandler}
      loading={props.loading}>

      {formikProps => {
        const { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting, handleSubmit } = formikProps

        return (
          <FormCustom autoComplete='off'>
            <DimmerStyled
              active={true}
              onClickOutside={() => props.closeSidebar()}
              page
            />
            <SidebarFlex
              visible={true}
              width='very wide'
              direction='bottom'
              animation='overlay'
              inverted
            >
              <div>
                <Dimmer inverted active={props.updating}>
                  <Loader />
                </Dimmer>
                <CustomHighSegment
                  onClick={() => props.closeSidebar()}
                  basic>
                  <DivTitle>
                    <div>
                      {props.sidebarValues ? (
                        <FormattedMessage id='sidebar.edit' defaultMessage='Edit Customer' />
                      ) : (
                        <FormattedMessage id='sidebar.addCustomer' defaultMessage='Add Customer' />
                      )}
                    </div>
                    <div><ChevronDown /></div>
                  </DivTitle>
                </CustomHighSegment>
              </div>

              <DivFlexContent>
                <SegmentCustomContent basic>

                  <DivSectionHeader>
                    <FormattedMessage id='global.billTo' defaultMessage='Bill to' />
                  </DivSectionHeader>

                  <FormGroup widths='equal' data-test='settings_branches_popup_name_inp'>
                    <Input
                      type='text'
                      label={
                        <>
                          <FormattedMessage id='settings.customerName' defaultMessage='Customer Name' />
                          <Required />
                        </>
                      }
                      name='name'
                      inputProps={{
                        placeholder: formatMessage({
                          id: 'settings.customers.enterCustomerName',
                          defaultMessage: 'Enter Customer Name'
                        })
                      }}
                    />
                    <Input
                      type='text'
                      label={
                        <>
                          <FormattedMessage
                            id='settings.customers.billToAddressName'
                            defaultMessage='Bill To Address Name' />
                          <Required />
                        </>
                      }
                      name='billToAddress.addressName'
                      inputProps={{
                        placeholder: formatMessage({
                          id: 'settings.customers.enterBillToAddressName',
                          defaultMessage: 'Enter Bill To Address Name'
                        })
                      }}
                    />
                  </FormGroup>

                  <AddressForm
                    noBorder
                    required
                    prefix={'billToAddress'}
                    displayHeader={false}
                    values={values}
                    setFieldValue={setFieldValue}
                    initialZipCodes={[
                      {
                        key: values.zipID.toString(),
                        value: values.billToAddress.address.zip,
                        text: values.billToAddress.address.zip
                      }
                    ]}
                  />

                  <DivSectionHeader>
                    <FormattedMessage id='global.contactInfo' defaultMessage='Contact Info' />
                  </DivSectionHeader>

                  <FormGroup widths='equal' data-test='settings_branches_popup_name_inp'>
                    <Input
                      type='text'
                      label={
                        <>
                          <FormattedMessage id='settings.contactName' defaultMessage='Contact Name' />
                          <Required />
                        </>
                      }
                      name='billToAddress.contactName'
                      inputProps={{
                        placeholder: formatMessage({
                          id: 'settings.customers.enterCompanyName',
                          defaultMessage: 'Enter Contact Name'
                        })
                      }}
                    />
                  </FormGroup>

                  <FormGroup widths='equal' data-test='settings_customers_popup_phone_inp'>
                    <PhoneNumber
                      name='billToAddress.contactPhone'
                      values={values}
                      label={
                        <>
                          <FormattedMessage id='global.phoneNumber' defaultMessage='Phone Number' />
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
                      type='email'
                      label={
                        <>
                          <FormattedMessage id='settings.contactEmail' defaultMessage='Email Address' />
                          <Required />
                        </>
                      }
                      name='billToAddress.contactEmail'
                      inputProps={{
                        placeholder: formatMessage({
                          id: 'settings.customers.enterEmailAddress',
                          defaultMessage: 'Enter Email Address'
                        })
                      }}
                    />
                  </FormGroup>
                  {!sidebarValues && (
                    <>
                      <DivSectionHeader>
                        <FormattedMessage id='global.warehouse' defaultMessage='Warehouse' />
                      </DivSectionHeader>
                      {values.warehouseAddresses.map((war, index) => {
                        return (
                          <div key={index}>
                            {index > 0 && (<Divider />)}
                            <DivRowFlex>
                              <DivInputWrapper>
                                <Input
                                  type='text'
                                  label={
                                    <>
                                      <FormattedMessage id='settings.warehouseName' defaultMessage='Warehouse Name' />
                                      <Required />
                                    </>
                                  }
                                  name={`warehouseAddresses[${index}].addressName`}
                                  inputProps={{
                                    placeholder: formatMessage({
                                      id: 'settings.customers.enterWarehouseName',
                                      defaultMessage: 'Enter Warehouse Name'
                                    })
                                  }}
                                />
                              </DivInputWrapper>
                              {index > 0 && (
                                <DivIconWrapper>
                                  <Trash2Icon
                                    onClick={() => {
                                      let newWarehouseAddresses = values.warehouseAddresses.slice()
                                      newWarehouseAddresses.splice(index, 1)
                                      setFieldValue('warehouseAddresses', newWarehouseAddresses)
                                    }}
                                  />
                                </DivIconWrapper>
                              )}
                            </DivRowFlex>
                            <AddressForm
                              noBorder
                              required
                              prefix={`warehouseAddresses[${index}]`}
                              displayHeader={false}
                              values={values}
                              setFieldValue={setFieldValue}
                            />
                            <FormGroup widths='equal' data-test='settings_branches_popup_name_inp'>
                              <Input
                                type='text'
                                label={
                                  <>
                                    <FormattedMessage id='settings.contactName' defaultMessage='Contact Name' />
                                    <Required />
                                  </>
                                }
                                name={`warehouseAddresses[${index}].contactName`}
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'settings.customers.enterCompanyName',
                                    defaultMessage: 'Enter Contact Name'
                                  })
                                }}
                              />
                            </FormGroup>
                            <FormGroup widths='equal' data-test='settings_customers_popup_phone_inp'>
                              <PhoneNumber
                                name={`warehouseAddresses[${index}].contactPhone`}
                                values={values}
                                label={
                                  <>
                                    <FormattedMessage id='global.phoneNumber' defaultMessage='Phone Number' />
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
                                type='email'
                                label={
                                  <>
                                    <FormattedMessage id='settings.contactEmail' defaultMessage='Email Address' />
                                    <Required />
                                  </>
                                }
                                name={`warehouseAddresses[${index}].contactEmail`}
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'settings.customers.enterEmailAddress',
                                    defaultMessage: 'Enter Email Address'
                                  })
                                }}
                              />
                            </FormGroup>
                            <FormGroup data-test='settings_customers_popup_notes_inp'>
                              <TimeInput
                                label={formatMessage({ id: 'global.readyTime', defaultMessage: 'Ready Time' })}
                                name={`warehouseAddresses[${index}].readyTime`}
                              />
                              <TimeInput
                                label={formatMessage({ id: 'global.closeTime', defaultMessage: 'Close Time' })}
                                name={`warehouseAddresses[${index}].closeTime`}
                              />
                            </FormGroup>
                            <FormGroup widths='equal'>
                              <Checkbox
                                label={formatMessage({ id: 'global.liftGate', defaultMessage: 'Lift Gate' })}
                                name={`warehouseAddresses[${index}].liftGate`}
                                inputProps={{ 'data-test': 'settings_customers_popup_liftGate_inp' }}
                              />
                            </FormGroup>
                            <FormGroup widths='equal'>
                              <Checkbox
                                label={formatMessage({ id: 'global.forkLift', defaultMessage: 'Fork Lift' })}
                                name={`warehouseAddresses[${index}].forkLift`}
                                inputProps={{ 'data-test': 'settings_customers_popup_forklift_inp' }}
                              />
                            </FormGroup>
                            <FormGroup widths='equal'>
                              <Checkbox
                                label={formatMessage({ id: 'global.callAhead', defaultMessage: 'Call Ahead' })}
                                name={`warehouseAddresses[${index}].callAhead`}
                                inputProps={{ 'data-test': 'settings_customers_popup_callAhead_inp' }}
                              />
                            </FormGroup>
                            <FormGroup widths='equal' data-test='settings_customers_popup_emailPhone_inp'>
                              <TextArea
                                name={`warehouseAddresses[${index}].deliveryNotes`}
                                label={formatMessage({ id: 'global.deliveryNotes', defaultMessage: 'Delivery Notes' })}
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'settings.warehouses.writeDeliveryNotesHere',
                                    defaultMessage: 'Write Delivery Notes Here'
                                  })
                                }}
                              />
                            </FormGroup>
                          </div>
                        )})
                      }
                      <DivBottomButton>
                        <BasicButtonStyled
                          onClick={() => {
                            let newWarehouseAddresses = values.warehouseAddresses
                            newWarehouseAddresses.push(INIT_VALUES_WAREHOUSE)
                            setFieldValue('warehouseAddresses', newWarehouseAddresses)
                          }}
                          data-test='settings_locations_sidebar_addWarehouse_btn'>
                          <FormattedMessage id='settings.AddWarehouse' defaultMessage='Add Warehouse'>
                            {text => text}
                          </FormattedMessage>
                        </BasicButtonStyled>
                      </DivBottomButton>
                    </>
                  )}
                </SegmentCustomContent>
              </DivFlexContent>
              <DivBottomSidebar>
                <BasicButton
                  noBorder
                  onClick={() => props.closeSidebar()}
                  data-test='settings_branches_popup_reset_btn'>
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                    {text => text}
                  </FormattedMessage>
                </BasicButton>
                <BasicButton
                  onClick={() => {
                    formikProps.validateForm().then(async err => {
                      const errors = Object.keys(err)

                      if (errors.length && errors[0] !== 'isCanceled') {
                        // Errors found
                        formikProps.submitForm() // to show errors
                      } else {
                        // No errors found
                        await submitHandler(values, formikProps, props)
                      }
                    })
                  }}
                  data-test='settings_branches_popup_submit_btn'>
                  <FormattedMessage id='global.save' defaultMessage='Save'>
                    {text => text}
                  </FormattedMessage>
                </BasicButton>
              </DivBottomSidebar>
            </SidebarFlex>
          </FormCustom>
        )
      }}
    </Formik>
  )
}

const mapStateToProps = state => {
  return {
    sidebarValues: state.settings.sidebarValues,
    updating: state.settings.updating
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, Actions)(MyCustomersSidebar)))