/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { Formik } from 'formik'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { ChevronDown } from 'react-feather'

// Components
import ErrorFocus from '../../../../components/error-focus'
import BasicButton from '../../../../components/buttons/BasicButton'
import CasProductsSidebarContent from './CasProductsSidebarContent/CasProductsSidebarContent'
import { withDatagrid } from '../../../datagrid'

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
} from './CasProductsSidebar.styles'

// Services
import { formValidation, getInitialFormValues, submitHandler } from './CasProductsSidebar.services'
import { closeAddPopup, postNewCasProductRequest, updateCasProductRequest } from '../../actions'
import { chatWidgetVerticalMoved } from '../../../chatWidget/actions'

const CasProductsSidebar = props => {
  const { popupValues, updating } = props

  // Similar to call componentDidMount:
  useEffect(() => {
    props.chatWidgetVerticalMoved(true)
  }, [])  // If [] is empty then is similar as componentDidMount.

  return (
    <Formik
      initialValues={getInitialFormValues(popupValues)}
      validationSchema={formValidation()}
      enableReinitialize
      onReset={() => {
        props.closeAddPopup()
        props.chatWidgetVerticalMoved(false)
      }}
      onSubmit={submitHandler}
      loading={false}>
      {formikProps => {
        return (
          <FormCustom autoComplete='off'>
            <DimmerSidebarOpened
              active={true}
              onClickOutside={() => {
                props.closeAddPopup()
                props.chatWidgetVerticalMoved(false)
              }}
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
                  onClick={() => {
                    props.closeAddPopup()
                    props.chatWidgetVerticalMoved(false)
                  }}
                  basic>
                  <DivTitle>
                    <DivHeader>
                      {props.popupValues ? (
                        <FormattedMessage id='casProduct.editCasProduct' defaultMessage='Edit CAS Product' />
                      ) : (
                        <FormattedMessage id='casProduct.addCasProduct' defaultMessage='Add CAS Product' />
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
                  <CasProductsSidebarContent
                    formikProps={formikProps}
                  />
                </SegmentCustomContent>
              </DivFlexContent>
              <DivBottomSidebar>
                <BasicButton
                  noborder
                  onClick={() => {
                    props.closeAddPopup()
                    props.chatWidgetVerticalMoved(false)
                  }}
                  data-test='cas_product_sidebar_reset_btn'>
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{text => text}</FormattedMessage>
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
                        submitHandler(formikProps.values, formikProps, props)
                      }
                    })
                  }}
                  data-test='cas_product_sidebar_submit_btn'>
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

CasProductsSidebar.propTypes = {}

CasProductsSidebar.defaultProps = {}

function mapStateToProps(store) {
  return {
    popupValues: store.productsAdmin.popupValues,
    updating: store.productsAdmin.updating
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, {
  chatWidgetVerticalMoved,
  closeAddPopup,
  postNewCasProductRequest,
  updateCasProductRequest
})(CasProductsSidebar)))