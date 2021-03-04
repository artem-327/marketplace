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
/*
import {
  SidebarFlex,
  DivFlexContent,
  SegmentCustomContent,
  DivBottomSidebar,
  DimmerSidebarOpend,
  FormCustom
} from '../../Locations.styles'
*/

// Constants
import { INITIAL_VALUES } from './MyCustomersSidebar.constants'
import {CustomHighSegment} from "../../Branches/BranchesSidebar/BranchesSidebar.styles";
import {Required} from "../../../../../../components/constants/layout";

const MyCustomersSidebar = props => {

  const {
    intl: { formatMessage },
    sidebarValues
  } = props

  console.log('!!!!!!!!!! aaaaa props', props)

  return (
    <Formik
      initialValues={{ ...INITIAL_VALUES, ...getInitialFormValues(sidebarValues)}}
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

        console.log('!!!!!!!!!! render values', values)

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
                        <FormattedMessage id='sidebar.edit' defaultMessage='Edit' />
                      ) : (
                        <FormattedMessage id='sidebar.addNew' defaultMessage='Add New' />
                      )}
                    </div>
                    <div><ChevronDown /></div>
                  </DivTitle>
                </CustomHighSegment>
              </div>

              <DivFlexContent>
                <SegmentCustomContent basic>

                  <DivSectionHeader>
                    <FormattedMessage id='global.address' defaultMessage='Address' />
                  </DivSectionHeader>

                  <FormGroup widths='equal' data-test='settings_branches_popup_name_inp'>
                    <Input
                      type='text'
                      label={
                        <>
                          <FormattedMessage id='settings.branchName' defaultMessage='Branch Name' />
                          <Required />
                        </>
                      }
                      name='addressName'
                      inputProps={{
                        placeholder: formatMessage({
                          id: 'settings.warehouses.enterBranchName',
                          defaultMessage: 'Enter Branch Name'
                        })
                      }}
                    />
                  </FormGroup>





                  <DivSectionHeader>
                    <FormattedMessage id='global.address' defaultMessage='Address' />
                  </DivSectionHeader>


                  <AddressForm
                    noBorder
                    required
                    displayHeader={false}
                    values={values}
                    setFieldValue={setFieldValue}
                  />










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
                            //putEditWarehouse: props.putEditWarehouse,
                            //postNewWarehouseRequest: props.postNewWarehouseRequest
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