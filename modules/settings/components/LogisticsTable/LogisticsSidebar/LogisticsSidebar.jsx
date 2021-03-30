import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Segment, FormGroup } from 'semantic-ui-react'
import { Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { ChevronDown } from 'react-feather'
//Actions
import {
  closeSidebar,
  getLogisticsProviders,
  createLogisticsAccount,
  updateLogisticsAccount,
  getLogisticsAccounts
} from '../../../actions'

//Components
import { Required } from '../../../../../components/constants/layout'
import ErrorFocus from '../../../../../components/error-focus'
import BasicButton from '../../../../../components/buttons/BasicButton'
//Services
import { getInitialValues, getValidationSchema, submitForm } from './LogisticsSidebar.services'
//Styles
import { CustomHighSegment, SubmitButton, CustomForm } from './LogisticsSidebar.styles'
import {
  SidebarFlex,
  DivFlexContent,
  SegmentCustomContent,
  DivBottomSidebar,
  DimmerSidebarOpend,
  FormCustom
} from '../../Locations/Locations.styles'
import { DivTitle } from '../../Locations/Branches/BranchesSidebar/BranchesSidebar.styles'

const LogisticsSidebar = props => {
  let {
    isOpenSidebar,
    sidebarValues,
    closeSidebar,
    logisticsProviders,
    logisticsProvidersFetching,
    createLogisticsAccount,
    updateLogisticsAccount,
    getLogisticsAccounts,
    intl: { formatMessage }
  } = props

  useEffect(() => {
    //sidebarValues && sidebarValues.hasProvinces && getProvinces(sidebarValues.countryId)
    props.getLogisticsProviders()
  }, [sidebarValues])

  return (
    <CustomForm
      validationSchema={getValidationSchema(sidebarValues)}
      enableReinitialize={true}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={getInitialValues(sidebarValues)}
      onReset={() => closeSidebar()}
      onSubmit={async (values, { setSubmitting }) => {
        await submitForm(values, sidebarValues, {
          updateLogisticsAccount,
          createLogisticsAccount,
          getLogisticsAccounts,
          setSubmitting,
          closeSidebar
        })
      }}>
      <DimmerSidebarOpend
        active={true}
        onClickOutside={() => closeSidebar()}
        page></DimmerSidebarOpend>
      <SidebarFlex visible={isOpenSidebar} direction='bottom' animation='overlay'>
        <div>
          <CustomHighSegment
            onClick={() => closeSidebar()}
            basic>
            <DivTitle>
              <div>
                {sidebarValues ? (
                  <FormattedMessage id='settings.editLogistics' defaultMessage='Edit Logistics' />
                ) : (
                  <FormattedMessage id='settings.addLogistics' defaultMessage='Add Logistics' />
                )}
              </div>
              <div>
                <ChevronDown />
              </div>
            </DivTitle>
          </CustomHighSegment>
        </div>
        <DivFlexContent>
          <SegmentCustomContent basic>
            <FormGroup widths='equal' data-test='settings_logistics_provider_inp'>
              {sidebarValues ? (
                <Input
                  name='providerIdentifierName'
                  label={
                    <>
                      {formatMessage({ id: 'logistics.label.logisticsProvider', defaultMessage: 'Logistics Provider' })}
                      <Required />
                    </>
                  }
                  inputProps={{
                    readOnly: true
                  }}
                />
              ) : (
                <Dropdown
                  name='providerIdentifier'
                  options={logisticsProviders.map((provider, index) => ({
                    key: provider.identifier.value,
                    text: `${provider.name} (${provider.identifier.value})`,
                    value: JSON.stringify(provider.identifier)
                  }))}
                  label={
                    <>
                      {formatMessage({ id: 'logistics.label.logisticsProvider', defaultMessage: 'Logistics Provider' })}
                      <Required />
                    </>
                  }
                  inputProps={{
                    search: true,
                    'data-test': 'settings_logistics_provider_drpdn',
                    placeholder: formatMessage({
                      id: 'logistics.placeholder.logisticsProvider',
                      label: 'Select Logistics Provider'
                    }),
                    loading: logisticsProvidersFetching
                  }}
                />
              )}
            </FormGroup>
            <FormGroup widths='equal' data-test='settings_logistics_apikey_inp'>
              <Input
                name='apiKey'
                label={<>{formatMessage({ id: 'logistics.label.apiKey', defaultMessage: 'API key' })}</>}
                inputProps={{
                  placeholder: formatMessage({
                    id: 'logistics.placeholder.apiKey',
                    defaultMessage: 'Enter API key'
                  })
                }}
              />
            </FormGroup>

            <FormGroup widths='equal' data-test='settings_logistics_namePassword_inp'>
              <Input
                name='username'
                label={
                  <>
                    {formatMessage({ id: 'logistics.label.username', defaultMessage: 'User Name' })}
                    <Required />
                  </>
                }
                inputProps={{
                  placeholder: formatMessage({ id: 'logistics.placeholder.username', defaultMessage: 'username' })
                }}
              />
              <Input
                name='password'
                label={
                  <>
                    {formatMessage({ id: 'logistics.label.password', defaultMessage: 'Password' })}
                    <Required />
                  </>
                }
                inputProps={{ type: 'password' }}
              />
            </FormGroup>
          </SegmentCustomContent>
        </DivFlexContent>
        <DivBottomSidebar>
          <BasicButton
            noBorder
            onClick={() => closeSidebar()}
            data-test='settings_logistics_sidebar_reset_btn'>
            <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
              {text => text}
            </FormattedMessage>
          </BasicButton>
          <SubmitButton basic data-test='settings_logistics_sidebar_submit_btn'>
            <FormattedMessage id='global.save' defaultMessage='Save'>
              {text => text}
            </FormattedMessage>
          </SubmitButton>
        </DivBottomSidebar>
      </SidebarFlex>

      <ErrorFocus />
    </CustomForm>
  )
}

const mapDispatchToProps = {
  closeSidebar,
  getLogisticsProviders,
  createLogisticsAccount,
  updateLogisticsAccount,
  getLogisticsAccounts
}

const mapStateToProps = ({
  settings: { isOpenSidebar, sidebarValues, logisticsProvidersFetching, logisticsProviders }
}) => ({
  isOpenSidebar,
  sidebarValues,
  logisticsProvidersFetching,
  logisticsProviders
})

LogisticsSidebar.propTypes = {
  closeSidebar: PropTypes.func,
  getLogisticsProviders: PropTypes.func,
  createLogisticsAccount: PropTypes.func,
  updateLogisticsAccount: PropTypes.func,
  getLogisticsAccounts: PropTypes.func,
  isOpenSidebar: PropTypes.bool,
  sidebarValues: PropTypes.object,
  logisticsProvidersFetching: PropTypes.bool,
  logisticsProviders: PropTypes.array
}

LogisticsSidebar.defaultProps = {
  closeSidebar: () => {},
  getLogisticsProviders: () => {},
  createLogisticsAccount: () => {},
  updateLogisticsAccount: () => {},
  getLogisticsAccounts: () => {},
  isOpenSidebar: false,
  sidebarValues: null,
  logisticsProvidersFetching: false,
  logisticsProviders: []
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(LogisticsSidebar))
