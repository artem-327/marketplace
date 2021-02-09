import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withDatagrid } from '../../../../../datagrid'
import { Formik } from 'formik'
import { Dimmer, Loader } from 'semantic-ui-react'
import { Button } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
//Components
import BranchesForm from './BranchesForm'
import { PhoneNumber } from '../../../../../phoneNumber'
import { AddressForm } from '../../../../../address-form/'
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
//Styles
import {
  CustomSegmentContent,
  CustomHighSegment,
  CustomDiv,
  CustomForm,
  CustomButtonSubmit
} from './BranchesSidebar.styles'
import { FlexSidebar, FlexContent } from '../../../../../inventory/constants/layout'
/**
 * Sidebar shows warehouse form to edit or add new warehouse.
 * @category Settings - Locations - Branches
 * @component
 */
const BranchSidebar = props => {
  let initialValues = getInitialFormValues(props.sidebarValues)
  const {
    sidebarValues: { hasProvinces, countryId },
    getProvinces
  } = props

  useEffect(() => {
    hasProvinces && getProvinces(countryId)
  }, [hasProvinces, getProvinces, countryId])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formValidation()}
      enableReinitialize
      onReset={props.closeSidebar}
      onSubmit={submitHandler}
      loading={props.loading}>
      {formikProps => (
        <>
          <CustomForm autoComplete='off'>
            <FlexSidebar
              visible={props.isOpenSidebar}
              width='very wide'
              style={{ width: '630px' }}
              direction='right'
              animation='overlay'>
              <div>
                <Dimmer inverted active={props.loading}>
                  <Loader />
                </Dimmer>
                <CustomHighSegment basic>
                  {props.sidebarValues ? (
                    <FormattedMessage id='sidebar.edit' defaultMessage='EDIT' />
                  ) : (
                    <FormattedMessage id='sidebar.addNew' defaultMessage='ADD NEW' />
                  )}
                </CustomHighSegment>
              </div>
              <FlexContent style={{ padding: '16px' }}>
                <CustomSegmentContent basic>
                  <BranchesForm intl={props.intl} formikProps={formikProps} sidebarValues={props.sidebarValues} />
                </CustomSegmentContent>
              </FlexContent>
              <CustomDiv>
                <Button.Reset
                  style={{ margin: '0 5px' }}
                  onClick={props.closeSidebar}
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
                        submitHandler(
                          formikProps.values,
                          {
                            setSubmitting: formikProps.setSubmitting,
                            putEditWarehouse: props.putEditWarehouse,
                            postNewWarehouseRequest: props.postNewWarehouseRequest
                          },
                          props.sidebarValues.id
                        )
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
