import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withDatagrid } from '../../../../../datagrid'
import { Formik } from 'formik'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { Button } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import { ChevronDown } from 'react-feather'
//Components
import BranchesForm from './BranchesForm'
import BasicButton from '../../../../../../components/buttons/BasicButton'
//Services
import { formValidation, getInitialFormValues, submitHandler } from './BranchesSidebar.services'
import { getSafe } from '../../../../../../utils/functions'
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
import { chatWidgetVerticalMoved } from '../../../../../chatWidget/actions'
//Styles
import { CustomHighSegment, DivTitle } from './BranchesSidebar.styles'
import {
  SidebarFlex,
  DivFlexContent,
  SegmentCustomContent,
  DivBottomSidebar,
  DimmerSidebarOpend,
  FormCustom
} from '../../Locations.styles'
/**
 * Sidebar shows warehouse form to edit or add new branch.
 * @category Settings - Locations - Branches
 * @component
 */
const BranchSidebar = props => {
  let initialValues = getInitialFormValues(props.sidebarValues)
  const { sidebarValues, getProvinces } = props

  useEffect(() => {
    sidebarValues && sidebarValues.hasProvinces && getProvinces(sidebarValues.countryId)
  }, [sidebarValues, getProvinces])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formValidation()}
      enableReinitialize
      onReset={() => {
        props.closeSidebar()
        props.chatWidgetVerticalMoved(true)
      }}
      onSubmit={submitHandler}
      loading={props.loading}>
      {formikProps => (
        <>
          <FormCustom autoComplete='off'>
            <DimmerSidebarOpend
              active={props.isOpenSidebar}
              onClickOutside={() => {
                props.closeSidebar()
                props.chatWidgetVerticalMoved(true)
              }}
              page></DimmerSidebarOpend>
            <SidebarFlex
              visible={props.isOpenSidebar}
              width='very wide'
              direction='bottom'
              animation='overlay'
              inverted>
              <div>
                <Dimmer inverted active={props.loading}>
                  <Loader />
                </Dimmer>
                <CustomHighSegment
                  onClick={() => {
                    props.closeSidebar()
                    props.chatWidgetVerticalMoved(true)
                  }}
                  basic>
                  <DivTitle>
                    <div>
                      {props.sidebarValues ? (
                        <FormattedMessage id='sidebar.edit' defaultMessage='EDIT' />
                      ) : (
                        <FormattedMessage id='sidebar.addNew' defaultMessage='ADD NEW' />
                      )}
                    </div>
                    <div>
                      <ChevronDown />
                    </div>
                  </DivTitle>
                </CustomHighSegment>
              </div>
              <DivFlexContent style={{ padding: '16px' }}>
                <SegmentCustomContent basic>
                  <BranchesForm intl={props.intl} formikProps={formikProps} sidebarValues={props.sidebarValues} />
                </SegmentCustomContent>
              </DivFlexContent>
              <DivBottomSidebar>
                <BasicButton
                  noBorder
                  onClick={() => {
                    props.closeSidebar()
                    props.chatWidgetVerticalMoved(true)
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
                            setSubmitting: formikProps.setSubmitting,
                            putEditWarehouse: props.putEditWarehouse,
                            postNewWarehouseRequest: props.postNewWarehouseRequest
                          },
                          getSafe(() => props.sidebarValues.id, null)
                        )
                        await props.chatWidgetVerticalMoved(true)
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
            <ErrorFocus />
          </FormCustom>
        </>
      )}
    </Formik>
  )
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
    loading: state.settings.loading
  }
}

BranchSidebar.propTypes = {
  postNewWarehouseRequest: PropTypes.func,
  putEditWarehouse: PropTypes.func,
  closeSidebar: PropTypes.func,
  getProvinces: PropTypes.func,
  getAddressSearch: PropTypes.func,
  removeAttachmentLinkToBranch: PropTypes.func,
  removeAttachment: PropTypes.func,
  addAttachment: PropTypes.func,
  loadFile: PropTypes.func,
  chatWidgetVerticalMoved: PropTypes.func,
  hasProvinces: PropTypes.bool,
  sidebarValues: PropTypes.object,
  country: PropTypes.string,
  countries: PropTypes.string,
  provincesDropDown: PropTypes.array,
  company: PropTypes.number,
  isOpenSidebar: PropTypes.bool,
  loading: PropTypes.bool
}

BranchSidebar.defaultProps = {
  postNewWarehouseRequest: () => {},
  putEditWarehouse: () => {},
  closeSidebar: () => {},
  getProvinces: () => {},
  getAddressSearch: () => {},
  removeAttachmentLinkToBranch: () => {},
  removeAttachment: () => {},
  addAttachment: () => {},
  loadFile: () => {},
  chatWidgetVerticalMoved: () => {},
  hasProvinces: false,
  sidebarValues: null,
  country: '',
  countries: '',
  provincesDropDown: [],
  company: null,
  isOpenSidebar: false,
  loading: false
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(BranchSidebar)))
