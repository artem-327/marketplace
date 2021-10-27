import { useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'
import { Dimmer, Loader } from 'semantic-ui-react'
import { ChevronDown } from 'react-feather'
// Components
import ErrorFocus from '../../../../../components/error-focus'
import BasicButton from '../../../../../components/buttons/BasicButton'
import ModalDetailContent from './ModalDetailContent/ModalDetailContentContainer'
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
} from './ModalDetail.styles'
// Services
import { formValidation, getInitialFormValues, submitHandler } from './ModalDetail.services'

const ModalDetail = props => {
  const { popupValues, updating, primaryBranch, openGlobalAddForm } = props
  const [provinceRequired, setProvinceRequired] = useState(false)

  return (
    <Formik
      initialValues={getInitialFormValues(popupValues, primaryBranch)}
      validationSchema={formValidation(provinceRequired)}
      enableReinitialize
      onReset={() => props.closeAddEditPopup()}
      onSubmit={()=>{}}
    >
      {formikProps => {

        console.log('!!!!!!!!!! aaaaa values', formikProps.values)

        return (
          <FormCustom autoComplete='off'>
            <DimmerSidebarOpened
              active={true}
              onClickOutside={() => props.closeAddEditPopup()}
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
                    !!openGlobalAddForm && openGlobalAddForm('')
                    props.closeAddEditPopup()}
                  }
                  basic>
                  <DivTitle>
                    <DivHeader>
                      {!openGlobalAddForm && popupValues ? (
                        <FormattedMessage id='wantedBoard.editWantedBoardProduct' defaultMessage='Edit Wanted Board' />
                      ) : (
                        <FormattedMessage id='wantedBoard.addWantedBoardProduct' defaultMessage='Add Wanted Board' />
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
                  <ModalDetailContent
                    formikProps={formikProps}
                    provinceRequired={provinceRequired}
                    setProvinceRequired={setProvinceRequired}
                  />
                </SegmentCustomContent>
              </DivFlexContent>
              <DivBottomSidebar>
                {!openGlobalAddForm && (
                  <BasicButton
                    noborder
                    onClick={() => props.closeAddEditPopup()}
                    data-test='wanted_board_sidebar_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
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
                        submitHandler(formikProps.values, formikProps, props)
                      }
                    })
                  }}
                  data-test='wanted_board_sidebar_submit_btn'>
                  <FormattedMessage id='global.post' defaultMessage='Post' />
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

ModalDetail.propTypes = {
  closeAddEditPopup: PropTypes.func,
  postNewWantedBoard: PropTypes.func,
  updateWantedBoard: PropTypes.func,
  popupValues: PropTypes.any,
  updating: PropTypes.bool
}

ModalDetail.defaultProps = {
  closeAddEditPopup: () => {},
  postNewWantedBoard: () => {},
  updateWantedBoard: () => {},
  popupValues: null,
  updating: false
}

export default injectIntl(ModalDetail)