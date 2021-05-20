/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { ChevronDown } from 'react-feather'
// Components
import ErrorFocus from '../../../../components/error-focus'
import BasicButton from '../../../../components/buttons/BasicButton'
import CasProductsSidebarContent from './CasProductsSidebarContent/CasProductsSidebarContentContainer'
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

/**
 * @Component
 * @category Products - Components / CasProductsTable / CasProductsSidebar
 */
const CasProductsSidebar = props => {
  const { popupValues, updating } = props

  return (
    <Formik
      initialValues={getInitialFormValues(popupValues)}
      validationSchema={formValidation()}
      enableReinitialize
      onReset={() => props.closeAddPopup()}
      onSubmit={submitHandler}
      loading={false}>
      {formikProps => {
        return (
          <FormCustom autoComplete='off'>
            <DimmerSidebarOpened
              active={true}
              onClickOutside={() => props.closeAddPopup()}
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
                  onClick={() => props.closeAddPopup()}
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
                  onClick={() => props.closeAddPopup()}
                  data-test='cas_product_sidebar_reset_btn'>
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
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
                  <FormattedMessage id='global.save' defaultMessage='Save' />
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

CasProductsSidebar.propTypes = {
  closeAddPopup: PropTypes.func,
  postNewCasProductRequest: PropTypes.func,
  updateCasProductRequest: PropTypes.func,
  popupValues: PropTypes.object,
  updating: PropTypes.bool
}

CasProductsSidebar.defaultProps = {
  closeAddPopup: () => {},
  postNewCasProductRequest: () => {},
  updateCasProductRequest: () => {},
  popupValues: {},
  updating: false
}

export default injectIntl(CasProductsSidebar)