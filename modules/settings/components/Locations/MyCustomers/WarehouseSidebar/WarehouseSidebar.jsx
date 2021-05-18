/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Formik } from 'formik'
import { Header, FormGroup, Dimmer, Loader, Segment, Form } from 'semantic-ui-react'
import { Input, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import { ChevronDown } from 'react-feather'

import { withDatagrid } from '~/modules/datagrid'
import { closeSidebar, updateCustomerWarehouse, addCustomerWarehouse } from '../../../../actions'

import { AddressForm } from '../../../../../address-form/'
import { getSafe } from '../../../../../../utils/functions'
import { PhoneNumber } from '../../../../../phoneNumber'
import { Required } from '../../../../../../components/constants/layout'
import ErrorFocus from '../../../../../../components/error-focus'
import BasicButton from '../../../../../../components/buttons/BasicButton'
import { TimeInput } from '../../../../../../components/custom-formik'

// Styles
import {
  FormCustom,
  SidebarFlex,
  CustomHighSegment,
  DivTitle,
  DivHeader,
  DivFlexContent,
  DivBottomSidebar,
  DimmerSidebarOpened,
  SegmentCustomContent
} from './WarehouseSidebar.styles'

// Services
import {
  formValidation, getInitialFormValues, submitHandler
} from './WarehouseSidebar.services'

const WarehouseSidebar = props => {
  const {
    intl: { formatMessage },
    customerIdName,
    popupValues,
    updating
  } = props

  return (
    <Formik
      initialValues={getInitialFormValues(popupValues)}
      validationSchema={formValidation()}
      enableReinitialize
      onReset={() => props.closeSidebar()}
      onSubmit={submitHandler}
      loading={false}>
      {formikProps => {
        const { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting } = formikProps

        return (
          <FormCustom autoComplete='off'>
            <DimmerSidebarOpened
              active={true}
              onClickOutside={() => props.closeSidebar()}
              page
            />
            <SidebarFlex
              visible={true}
              width='very wide'
              direction='bottom'
              animation='overlay'
              inverted>
              <div>
                <Dimmer inverted active={updating}>
                  <Loader />
                </Dimmer>
                <CustomHighSegment
                  onClick={() => props.closeSidebar()}
                  basic>
                  <DivTitle>
                    <DivHeader>
                      {props.popupValues ? (
                        <FormattedMessage
                          id='settings.customers.addWarehouseFor'
                          defaultMessage={`Add Warehouse for ${customerIdName.customerName}`}
                          values={{ name: customerIdName.customerName}}
                        />
                      ) : (
                        <FormattedMessage
                          id='settings.customers.editWarehouseFor'
                          defaultMessage={`Edit Warehouse for ${customerIdName.customerName}`}
                          values={{ name: customerIdName.customerName}}
                        />
                      )}
                    </DivHeader>
                    <div>
                      <ChevronDown />
                    </div>
                  </DivTitle>
                </CustomHighSegment>
              </div>
              <DivFlexContent style={{ padding: '16px' }}>
                <SegmentCustomContent basic>
                  <FormGroup widths='equal' data-test='add_warehouse_sidebar_name_inp'>
                    <Input
                      type='text'
                      label={
                        <>
                          <FormattedMessage id='settings.warehouseName' defaultMessage='Warehouse Name' />
                          <Required />
                        </>
                      }
                      name='addressName'
                      inputProps={{
                        placeholder: formatMessage({
                          id: 'settings.customers.enterWarehouseName',
                          defaultMessage: 'Enter Warehouse Name'
                        })
                      }}
                    />
                  </FormGroup>
                  <AddressForm
                    noBorder
                    required
                    displayHeader={false}
                    values={{
                      ...values,
                      address: {
                        ...values.address,
                        zip: JSON.stringify(values.address.zip)
                      }
                    }}
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
                      name='contactName'
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
                      name='contactPhone'
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
                      name='contactEmail'
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
                      inputProps={{ 'data-test': 'settings_customers_popup_liftGate_inp' }}
                    />
                  </FormGroup>
                  <FormGroup widths='equal'>
                    <Checkbox
                      label={formatMessage({ id: 'global.forkLift', defaultMessage: 'Fork Lift' })}
                      name='forkLift'
                      inputProps={{ 'data-test': 'settings_customers_popup_forklift_inp' }}
                    />
                  </FormGroup>
                  <FormGroup widths='equal'>
                    <Checkbox
                      label={formatMessage({ id: 'global.callAhead', defaultMessage: 'Call Ahead' })}
                      name='callAhead'
                      inputProps={{ 'data-test': 'settings_customers_popup_callAhead_inp' }}
                    />
                  </FormGroup>
                  <FormGroup widths='equal' data-test='settings_customers_popup_emailPhone_inp'>
                    <TextArea
                      name='deliveryNotes'
                      label={formatMessage({ id: 'global.deliveryNotes', defaultMessage: 'Delivery Notes' })}
                      inputProps={{
                        placeholder: formatMessage({
                          id: 'settings.warehouses.writeDeliveryNotesHere',
                          defaultMessage: 'Write Delivery Notes Here'
                        })
                      }}
                    />
                  </FormGroup>
                </SegmentCustomContent>
              </DivFlexContent>
              <DivBottomSidebar>
                <BasicButton
                  onClick={() => {
                    formikProps.validateForm().then(async err => {
                      const errors = Object.keys(err)
                      if (errors.length && errors[0] !== 'isCanceled') {
                        // Errors found
                        formikProps.submitForm() // to show errors
                      } else {
                        // No errors found
                        submitHandler(values, formikProps, props)
                      }
                    })
                  }}
                  data-test='add_warehouse_sidebar_submit_btn'>
                  <FormattedMessage id='global.save' defaultMessage='Save'>{text => text}</FormattedMessage>
                </BasicButton>
              </DivBottomSidebar>
            </SidebarFlex>
            <ErrorFocus />
          </FormCustom>
        )
      }}
    </Formik>
  )
}

const mapStateToProps = state => {
  return {
    customerIdName: getSafe(() => state.settings.sidebarValues.customerIdName, null),
    popupValues: getSafe(() => state.settings.sidebarValues.warehouseRow.rawData, null),
    sidebarValues: state.settings.sidebarValues,
    updating: state.settings.updating,
    customerWarehousesDatagrid: state.settings.customerWarehousesDatagrid
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, {
  updateCustomerWarehouse,
  addCustomerWarehouse,
  closeSidebar
})(WarehouseSidebar)))