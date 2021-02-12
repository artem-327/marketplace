/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { removeEmpty, getSafe } from "~/utils/functions"
import { Formik } from 'formik'

// Components
import { Required } from '~/components/constants/layout'
import { Grid, GridRow, GridColumn, Modal, Divider, FormGroup, Segment, Sidebar, Dimmer, Loader, Form } from 'semantic-ui-react'
import { Input, Button, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import { PhoneNumber } from '~/modules/phoneNumber'
import { AddressForm } from '~/modules/address-form'

//Hooks
//import { usePrevious } from '../../../hooks'

// Styles
import {
  ModalStyled,
  GridStyled,
  DivSectionHeader,
  DivAddressWrapper
} from './AddAddress.styles'

// Constants
import { INITIAL_VALUES } from './AddAddress.constants'

//Services
import {
  getInitValues,
  getValidationScheme,
  handleSubmit
} from './AddAddress.services'

//import ErrorFocus from '../../../components/error-focus'
//import {
//} from './Checkout.services'

const AddAddress = props => {
  let formikPropsSelf
  const {
    isWarehouse,
    popupValues,
    intl: { formatMessage }
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {
  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {

  }, [/* variableName */])

  return (
    <Formik
      onSubmit={async values => await handleSubmit(props, formikPropsSelf, values)}
      enableReinitialize
      initialValues={popupValues
        ? { ...INITIAL_VALUES, ...getInitValues(popupValues) }
        : INITIAL_VALUES}
      validationSchema={getValidationScheme}
    >
      {formikProps => {
        formikPropsSelf = formikProps
        const { setFieldValue, values, setFieldTouched, errors, touched, isSubmitting } = formikProps

        return (
          <ModalStyled
            open={true}
            onClose={() => props.onClose()}
            closeOnDimmerClick={false}
            closeIcon
          >
            <>
              <Modal.Header>
                {popupValues
                  ? <FormattedMessage id='checkout.shipping.editAddress' defaultMessage='Edit Address' />
                  : <FormattedMessage id='checkout.shipping.addAddress' defaultMessage='Add New Address' />
                }
              </Modal.Header>
              <Modal.Content scrolling>
                <Form>
                  <Dimmer inverted active={props.isFetching}>
                    <Loader />
                  </Dimmer>
                  <GridStyled>
                    <GridRow>
                      <GridColumn width={16}>
                        <Input
                          label={
                            <>
                              <FormattedMessage id='global.addressName' defaultMessage='Address Name' />
                              <Required />
                            </>
                          }
                          name='addressName'
                        />
                      </GridColumn>
                    </GridRow>
                    <DivSectionHeader>
                      <FormattedMessage id='global.address' defaultMessage='Address' />
                    </DivSectionHeader>
                    <GridRow>
                      <GridColumn>
                        <DivAddressWrapper>
                          <AddressForm required displayHeader={false} values={values} setFieldValue={setFieldValue} />
                        </DivAddressWrapper>
                      </GridColumn>
                    </GridRow>
                    <DivSectionHeader>
                      <FormattedMessage id='checkout.contactInfo' defaultMessage='Contact Info' />
                    </DivSectionHeader>
                    <GridRow>
                      <GridColumn width={16}>
                        <Input
                          label={
                            <>
                              <FormattedMessage id='global.contactName' default='Contact Name' />
                              <Required />
                            </>
                          }
                          name='contactName'
                        />
                      </GridColumn>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={8}>
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
                      </GridColumn>
                      <GridColumn width={8}>
                          <Input
                            label={
                              <>
                                <FormattedMessage id='global.email' defaultMessage='E-mail Address' />
                                <Required />
                              </>
                            }
                            name='contactEmail'
                          />
                      </GridColumn>
                    </GridRow>
                    <DivSectionHeader>
                      <FormattedMessage id='global.additionalInfo' defaultMessage='Additional Info' />
                    </DivSectionHeader>
                    <GridRow>
                      <GridColumn width={3}>
                        <Input
                          inputProps={{ type: 'time' }}
                          label={formatMessage({ id: 'global.readyTime', defaultMessage: 'Ready Time' })}
                          name='readyTime'
                        />
                      </GridColumn>
                      <GridColumn width={3}>
                        <Input
                          inputProps={{ type: 'time' }}
                          label={formatMessage({ id: 'global.closeTime', defaultMessage: 'Close Time' })}
                          name='closeTime'
                        />
                      </GridColumn>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={2}>
                        <Checkbox
                          label={formatMessage({ id: 'global.liftGate', defaultMessage: 'Lift Gate' })}
                          name='liftGate'
                          inputProps={{ 'data-test': 'settings_delivery_address_liftGate_inp' }}
                        />
                      </GridColumn>
                      <GridColumn width={2}>
                        <Checkbox
                          label={formatMessage({ id: 'global.forkLift', defaultMessage: 'Fork Lift' })}
                          name='forkLift'
                          inputProps={{ 'data-test': 'settings_delivery_address_forklift_inp' }}
                        />
                      </GridColumn>
                      <GridColumn width={3}>
                        <Checkbox
                          label={formatMessage({ id: 'global.callAhead', defaultMessage: 'Call Ahead' })}
                          name='callAhead'
                          inputProps={{ 'data-test': 'settings_delivery_address_callAhead_inp' }}
                        />
                      </GridColumn>
                    </GridRow>
                    {isWarehouse && (
                      <GridRow>
                        <GridColumn width={16}>
                          <Input
                            name='taxId'
                            label={formatMessage({ id: 'global.taxId', defaultMessage: 'Tax ID' })}
                            inputProps={{
                              placeholder: formatMessage({
                                id: 'global.placeholder.taxId',
                                defaultMessage: '!Enter Tax ID'
                              })
                            }}
                          />
                        </GridColumn>
                      </GridRow>
                    )}
                    <GridRow>
                      <GridColumn width={16}>
                        <TextArea
                          name='deliveryNotes'
                          label={formatMessage({ id: 'global.deliveryNotes', defaultMessage: 'Delivery Notes' })}
                          inputProps={{
                            placeholder: formatMessage({
                              id: 'global.placeholder.deliveryNotes',
                              defaultMessage: '!Write delivery notes here'
                            })
                          }}
                        />
                      </GridColumn>
                    </GridRow>
                  </GridStyled>
                </Form>
              </Modal.Content>
              <Modal.Actions style={{ bottom: '10px'}}>
                <Button
                  type='button'
                  basic
                  onClick={() => {
                    formikProps.handleSubmit()
                  }}
                  loading={props.isFetching}
                  data-test='checkout_add_address_save'>
                  <FormattedMessage id='global.save' defaultMessage='Save'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </Modal.Actions>
            </>
          </ModalStyled>
        )
      }}
    </Formik>
  )
}

AddAddress.propTypes = {
  selectedAddress: PropTypes.object,
  savedShippingPreferences: PropTypes.bool
}

AddAddress.defaultProps = {
  selectedAddress: null,
  savedShippingPreferences: false
}

function mapStateToProps(store) {
  return {

  }
}

export default injectIntl(connect(mapStateToProps, {  })(AddAddress))