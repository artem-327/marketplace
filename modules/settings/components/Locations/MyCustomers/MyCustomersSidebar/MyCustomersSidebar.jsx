import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withDatagrid } from '../../../../../datagrid'
import { Formik } from 'formik'
import { Dimmer, Loader, Segment, Form, FormGroup } from 'semantic-ui-react'
import { Button, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import { ChevronDown } from 'react-feather'

// Components
import BasicButton from '../../../../../../components/buttons/BasicButton'
import { AddressForm } from '~/modules/address-form'
import { PhoneNumber } from '../../../../../phoneNumber'
import { Required } from "../../../../../../components/constants/layout"

// Services
import { formValidation, getInitialFormValues, submitHandler } from './MyCustomersSidebar.services'
import { getSafe } from '../../../../../../utils/functions'
import ErrorFocus from '../../../../../../components/error-focus'

// Actions
import * as Actions from '../../../../actions'
import { chatWidgetVerticalMoved } from '../../../../../chatWidget/actions'

// Styles
import {
  SidebarFlex,
  SegmentTopSidebar,
  DivTitle,
  DimmerStyled,

  DivSectionHeader,

  DivFlexContent,
  SegmentCustomContent,
  DivBottomSidebar,



} from '../MyCustomers.styles'
import { CustomHighSegment } from "../../Branches/BranchesSidebar/BranchesSidebar.styles"

// Constants
import { INITIAL_VALUES } from './MyCustomersSidebar.constants'

const MyCustomersSidebar = props => {

  const {
    intl: { formatMessage },
    sidebarValues
  } = props

  console.log('!!!!!!!!!! aaaaa props', props)
  console.log('INITIAL', {...getInitialFormValues(sidebarValues)})

  return (
    <Formik
      initialValues={{ ...INITIAL_VALUES, billToAddress: { ...getInitialFormValues(sidebarValues), hasProvinces: null }}}
      validationSchema={formValidation()}
      enableReinitialize
      onReset={() => {
        props.closeSidebar()
        //! ! props.chatWidgetVerticalMoved(false)
      }}
      onSubmit={submitHandler}
      loading={props.loading}>

      {formikProps => {
        const { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting, handleSubmit } = formikProps

        return (
          <Form autoComplete='off'>
            <DimmerStyled>
              active={true}
              onClickOutside={() => {
              props.closeSidebar()
              //! !props.chatWidgetVerticalMoved(false)
            }}
            </DimmerStyled>
            <SidebarFlex
              visible={true}
              width='very wide'
              direction='bottom'
              animation='overlay'
              inverted
            >
              <div>
                <Dimmer inverted active={props.loading}>
                  <Loader />
                </Dimmer>
                <CustomHighSegment
                  onClick={() => {
                    props.closeSidebar()
                    //! ! props.chatWidgetVerticalMoved(false)
                  }}
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
                          id: 'settings.customers.customerName',
                          defaultMessage: 'Enter Customer Name'
                        })
                      }}
                    />
                    <Input
                      type='text'
                      label={
                        <>
                          <FormattedMessage id='settings.companyName' defaultMessage='Company Name' />
                          <Required />
                        </>
                      }
                      name='billToAddress.addressName'
                      inputProps={{
                        placeholder: formatMessage({
                          id: 'settings.customers.enterCompanyName',
                          defaultMessage: 'Enter Company Name'
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





                </SegmentCustomContent>
              </DivFlexContent>
              <DivBottomSidebar>
                <BasicButton
                  noBorder
                  onClick={() => {
                    props.closeSidebar()
                    // ! ! props.chatWidgetVerticalMoved(false)
                  }}
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
                        await submitHandler(
                          formikProps.values,
                          {
                            //setSubmitting: formikProps.setSubmitting,
                            editCustomer: props.editCustomer,
                            addCustomer: props.addCustomer
                          },
                          getSafe(() => props.sidebarValues.id, null)
                        )
                        //! !await props.chatWidgetVerticalMoved(false)
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
          </Form>
        )
      }}
    </Formik>
  )
}

const mapStateToProps = state => {
  return {

  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, Actions)(MyCustomersSidebar)))