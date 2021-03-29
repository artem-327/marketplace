/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Dimmer, Loader, Grid, GridRow, GridColumn, Modal, Form, FormGroup } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Person } from '@material-ui/icons'
import get from 'lodash/get'
import { Formik } from 'formik'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ChevronDown } from 'react-feather'

//Actions
import {
  closeSidebar,
  postNewUserRequest,
  handlerSubmitUserEditPopup,
  getCompanyDetails,
  getUsersDataRequest,
  getCompanyUser
} from '../../../actions'
import { searchSellMarketSegments, searchBuyMarketSegments } from '../../../../companies/actions'
import { getIdentity } from '../../../../auth/actions'

//Components
import { Required } from '../../../../../components/constants/layout'
import { withDatagrid } from '../../../../datagrid'
import { PhoneNumber } from '../../../../phoneNumber'
import ErrorFocus from '../../../../../components/error-focus'
//Services
import { getSafe } from '../../../../../utils/functions'
import { removeEmpty, uniqueArrayByKey } from '../../../../../utils/functions'
import {
  userFormValidation,
  getHomeBranchesOptions,
  getBranchesOptions,
  getInitialFormValues,
  handleSellMarketSegmentsChange,
  submitUser,
  handleSellMarketSegmentsSearchChange,
  handleBuyMarketSegmentsSearchChange,
  handleBuyMarketSegmentsChange,
  switchUser,
  generateCheckboxes
} from './UserEditSidebar.services'
//Constants
import { currencyId } from '../../../../../constants/index'
//Styles
import { DivTitle } from '../../Locations/Branches/BranchesSidebar/BranchesSidebar.styles'

import {
  CustomHighSegment,
  SubmitButton,
  CustomForm
} from '../../LogisticsTable/LogisticsSidebar/LogisticsSidebar.styles'
import {
  DivHighSegment,
  SegmentStyled,
  GridColumnWError,
  DivNotify,
  HighSegment,
  GridColumnRoles,
  GridRowRoles,
  DivHeaderCustom,
  DivLabel
} from './UserEditSidebar.styles'
import { ModalFixed } from '../../../../companies/components/UsersTable/UsersSidebar.styles'
import {
  SidebarFlex,
  DivFlexContent,
  SegmentCustomContent,
  DivBottomSidebar,
  DimmerSidebarOpend,
  DivHeader
} from '../../Locations/Locations.styles'
/**
 * @category Settings - Users
 * @component
 */
const UserEditSidebar = props => {
  const {
    closeSidebar,
    userRoles,
    currencies,
    intl: { formatMessage },
    updating,
    searchedSellMarketSegmentsLoading,
    searchedSellMarketSegments,
    searchedBuyMarketSegmentsLoading,
    searchedBuyMarketSegments,
    isCompanyAdmin,
    openGlobalAddForm,
    userSettings
  } = props

  const [sidebarValues, setSidebarValues] = useState(null)
  const [branches, setBranches] = useState([])
  const [selectedSellMarketSegmentsOptions, setSelectedSellMarketSegmentsOptions] = useState([])
  const [selectedBuyMarketSegmentsOptions, setSelectedBuyMarketSegmentsOptions] = useState([])

  const state = {
    sidebarValues,
    setSidebarValues,
    branches,
    setBranches,
    selectedSellMarketSegmentsOptions,
    setSelectedSellMarketSegmentsOptions,
    selectedBuyMarketSegmentsOptions,
    setSelectedBuyMarketSegmentsOptions
  }

  // Similar to call componentDidMount:
  useEffect(() => {
    const { companyId, sidebarValues, isCompanyAdmin, openGlobalAddForm, getUsersDataRequest, getCompanyUser } = props

    const fetchData = async () => {
      if (sidebarValues?.id && !userSettings) await getCompanyUser(sidebarValues?.id)
      if (companyId !== null) {
        const { value } = await props.getCompanyDetails(companyId)
        let branches = uniqueArrayByKey(
          (sidebarValues && sidebarValues.homeBranch ? getHomeBranchesOptions([sidebarValues.homeBranch]) : []).concat(
            sidebarValues && sidebarValues.additionalBranches
              ? getBranchesOptions(sidebarValues.additionalBranches)
              : [],
            value && value.branches ? getBranchesOptions(value.branches) : []
          ),
          'key'
        )
        setBranches(branches)
      }
    }
    fetchData()

    if (sidebarValues) {
      switchUser(props.sidebarValues, state)
    } else {
      setSidebarValues(null)
    }
    /*Commented by https://pm.artio.net/issues/34033#note-14 */
    /*
    if (isCompanyAdmin) {
      this.props.searchSellMarketSegments('')
      this.props.searchBuyMarketSegments('')
    }
    */
    if (!!openGlobalAddForm) getUsersDataRequest()
  }, []) // If [] is empty then is similar as componentDidMount.

  const allSellMarketSegmentsOptions = uniqueArrayByKey(
    searchedSellMarketSegments.concat(selectedSellMarketSegmentsOptions),
    'key'
  )
  const allBuyMarketSegmentsOptions = uniqueArrayByKey(
    searchedBuyMarketSegments.concat(selectedBuyMarketSegmentsOptions),
    'key'
  )

  return (
    <Formik
      autoComplete='off'
      enableReinitialize
      initialValues={getInitialFormValues({ ...sidebarValues, ...userSettings })}
      validationSchema={userFormValidation()}
      onSubmit={(values, actions) => submitUser(values, actions, props, state)}>
      {formikProps => {
        let { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting, submitForm } = formikProps
        let errorRoles = get(errors, 'roles', null)

        return (
          <>
            <DimmerSidebarOpend
              active={true}
              onClickOutside={() => closeSidebar()}
              page></DimmerSidebarOpend>
            <SidebarFlex visible={true} direction='bottom' animation='overlay'>
              {/* <ModalFixed
            open
            size='small'
            closeIcon={!!openGlobalAddForm}
            onClose={() => !!openGlobalAddForm && openGlobalAddForm('')}> */}
              <Dimmer inverted active={updating}>
                <Loader />
              </Dimmer>
              <div>
                <CustomHighSegment
                  basic
                  onClick={() => {
                    !!openGlobalAddForm && openGlobalAddForm('')
                    closeSidebar()
                  }}>
                  <DivTitle>
                    <div>
                      {!openGlobalAddForm && sidebarValues
                        ? formatMessage({ id: 'settings.editUser', defaultMessage: 'Edit User' })
                        : formatMessage({ id: 'settings.addUser', defaultMessage: 'Add User' })}

                      <Person className='title-icon' />
                    </div>
                    <div>
                      <ChevronDown />
                    </div>
                  </DivTitle>
                </CustomHighSegment>
              </div>
              <DivFlexContent>
                <SegmentCustomContent basic>
                  <Form>
                    <FormGroup widths='equal'>
                      <Input
                        type='text'
                        label={
                          <>
                            {formatMessage({ id: 'global.name', defaultMessage: 'Name' })}
                            <Required />
                          </>
                        }
                        name='name'
                        inputProps={{
                          placeholder: formatMessage({ id: 'global.enterName', defaultMessage: 'Enter Name' })
                        }}
                      />

                      <Input
                        type='text'
                        label={formatMessage({ id: 'global.jobTitle', defaultMessage: 'Job Title' })}
                        name='jobTitle'
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'global.enterJobTitle',
                            defaultMessage: 'Enter Job Title'
                          })
                        }}
                      />
                    </FormGroup>
                    <FormGroup width='equal'>
                      <Input
                        type='text'
                        fieldProps={{ width: 8 }}
                        label={
                          <>
                            {formatMessage({ id: 'global.email', defaultMessage: 'Email' })}
                            <Required />
                          </>
                        }
                        name='email'
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'global.enterEmailAddress',
                            defaultMessage: 'Enter Email Address'
                          })
                        }}
                      />
                      <PhoneNumber
                        width={8}
                        background='#fdfdfd !important;'
                        name='phone'
                        values={values}
                        label={<FormattedMessage id='global.phone' defaultMessage='Phone' />}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        errors={errors}
                        touched={touched}
                        isSubmitting={isSubmitting}
                        placeholder={formatMessage({
                          id: 'global.phonePlaceholder',
                          defaultMessage: '000 000 0000'
                        })}
                        clearable={true}
                      />
                    </FormGroup>
                    <FormGroup width='equal'>
                      <Dropdown
                        fieldProps={{ width: 8 }}
                        label={
                          <>
                            {formatMessage({ id: 'global.homeBranch', defaultMessage: 'Home Branch' })}
                            <Required />
                          </>
                        }
                        name='homeBranch'
                        options={branches}
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'global.selectHomeBranch',
                            defaultMessage: 'Select Home Branch'
                          }),
                          'data-test': 'settings_users_popup_homeBranch_drpdn'
                        }}
                      />
                      <Dropdown
                        fieldProps={{ width: 8 }}
                        label={formatMessage({
                          id: 'global.additionalBranches',
                          defaultMessage: 'Additional Branches'
                        })}
                        name='additionalBranches'
                        options={branches}
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'global.selectAdditionalHomeBranch',
                            defaultMessage: 'Select Additional Home Branch'
                          }),
                          'data-test': 'settings_users_popup_additionalBranches_drpdn',
                          multiple: true
                        }}
                      />
                    </FormGroup>
                    {/*Comemnted by https://pm.artio.net/issues/34033#note-14 */}
                    {false && (
                      <GridRow>
                        <GridColumn width={8}>
                          <Dropdown
                            label={
                              <>
                                {formatMessage({
                                  id: 'global.sellMarketSegments',
                                  defaultMessage: 'Sell Market Segment'
                                })}
                              </>
                            }
                            name='sellMarketSegments'
                            options={allSellMarketSegmentsOptions}
                            inputProps={{
                              loading: searchedSellMarketSegmentsLoading,
                              search: true,
                              icon: 'search',
                              selection: true,
                              multiple: true,
                              disabled: !values.homeBranch || !isCompanyAdmin,
                              placeholder: formatMessage({
                                id: 'global.selectSellMarketSegments',
                                defaultMessage: 'Select Sell Market Segments'
                              }),
                              noResultsMessage: formatMessage({
                                id: 'global.startTypingToSearch',
                                defaultMessage: 'Start typing to begin search'
                              }),
                              onSearchChange: (_, data) => handleSellMarketSegmentsSearchChange(_, data, props),
                              onChange: (_, { value }) =>
                                setSelectedSellMarketSegmentsOptions(
                                  handleSellMarketSegmentsChange(value, allSellMarketSegmentsOptions)
                                )
                            }}
                          />
                        </GridColumn>
                        <GridColumn width={8}>
                          <Dropdown
                            label={
                              <>
                                {formatMessage({
                                  id: 'global.buyMarketSegments',
                                  defaultMessage: 'Buy Market Segment'
                                })}
                              </>
                            }
                            name='buyMarketSegments'
                            options={allBuyMarketSegmentsOptions}
                            inputProps={{
                              loading: searchedBuyMarketSegmentsLoading,
                              search: true,
                              icon: 'search',
                              selection: true,
                              multiple: true,
                              disabled: !values.homeBranch || !isCompanyAdmin,
                              placeholder: formatMessage({
                                id: 'global.selectBuyMarketSegments',
                                defaultMessage: 'Select Buy Market Segment'
                              }),
                              noResultsMessage: formatMessage({
                                id: 'global.startTypingToSearch',
                                defaultMessage: 'Start typing to begin search'
                              }),
                              onSearchChange: (_, data) => handleBuyMarketSegmentsSearchChange(_, data, props),
                              onChange: (_, { value }) =>
                                handleBuyMarketSegmentsChange(value, allBuyMarketSegmentsOptions, state)
                            }}
                          />
                        </GridColumn>
                      </GridRow>
                    )}

                    <Grid>
                      <GridRow style={{ paddingBottom: '2.5px' }}>
                        <GridColumnWError className={errorRoles ? 'error' : ''}>
                          <FormattedMessage id='global.roles' defaultMessage='Roles'>
                            {text => text}
                          </FormattedMessage>
                          <Required />
                        </GridColumnWError>
                      </GridRow>
                      <GridRowRoles>{generateCheckboxes(userRoles, values, 'roles', errorRoles)}</GridRowRoles>
                      <GridRow style={{ paddingTop: '0', marginTop: '-5px' }}>
                        <GridColumn>{errorRoles && <span className='sui-error-message'>{errorRoles}</span>}</GridColumn>
                      </GridRow>
                      {/*<pre>
                          {JSON.stringify(values, null, 2)}
                        </pre>*/}
                    </Grid>

                    <DivHeaderCustom>
                      <FormattedMessage
                        id='settings.user.purchaseAuthorization'
                        defaultMessage='Purchase Authorization'
                      />
                    </DivHeaderCustom>

                    <FormGroup>
                      <Input
                        fieldProps={{ width: 5 }}
                        label={
                          <>
                            {formatMessage({
                              id: 'settings.user.orderPurchaseLimit',
                              defaultMessage: 'Order Purchase Limit'
                            })}
                          </>
                        }
                        name='orderPurchaseLimit'
                        inputProps={{
                          type: 'number',
                          label: '$',
                          'data-test': 'settings_users_popup_order_purchase_limit_inp',
                          placeholder: formatMessage({ id: 'global.na', defaultMessage: 'N/A' })
                        }}
                      />

                      <Input
                        fieldProps={{ width: 6 }}
                        label={
                          <>
                            {formatMessage({
                              id: 'settings.user.dailyPurchaseLimit',
                              defaultMessage: 'Daily Purchase Limit'
                            })}
                          </>
                        }
                        name='dailyPurchaseLimit'
                        inputProps={{
                          type: 'number',
                          label: '$',
                          'data-test': 'settings_users_popup_daily_purchase_limit_inp',
                          placeholder: formatMessage({ id: 'global.na', defaultMessage: 'N/A' })
                        }}
                      />

                      <Input
                        fieldProps={{ width: 5 }}
                        label={
                          <>
                            {formatMessage({
                              id: 'settings.user.monthlyPurchaseLimit',
                              defaultMessage: 'Monthly Purchase Limit'
                            })}
                          </>
                        }
                        name='monthlyPurchaseLimit'
                        inputProps={{
                          type: 'number',
                          label: '$',
                          'data-test': 'settings_users_popup_monthly_purchase_limit_inp',
                          placeholder: formatMessage({ id: 'global.na', defaultMessage: 'N/A' })
                        }}
                      />
                    </FormGroup>

                    <DivLabel>
                      <FormattedMessage
                        id='settings.user.regulatoryDeaListAuthorized'
                        defaultMessage='Authorized to purchase DEA Regulated List I and II Substances'
                      />
                    </DivLabel>
                    <FormGroup>
                      <Dropdown
                        name='regulatoryDeaListAuthorized'
                        fieldProps={{ width: 2 }}
                        options={[
                          { key: 0, text: 'No', value: false },
                          { key: 1, text: 'Yes', value: true }
                        ]}
                        inputProps={{
                          'data-test': 'settings_users_popup_regulatory_dea_list_authorized_drpdn'
                        }}
                      />
                    </FormGroup>
                    <DivNotify>
                      {values?.regulatoryDeaListAuthorized && (
                        <FormattedMessage
                          id='settings.user.purchaseAuthorized.notify'
                          defaultMessage='User will be emailed link to submit their signature. Signature will be valid for 12 months from date of signing. Status pending until a signature has been submitted'
                        />
                      )}
                    </DivNotify>

                    <DivLabel>
                      <FormattedMessage
                        id='settings.user.regulatoryDhsCoiAuthorized'
                        defaultMessage='Authorized to purchase DHS Chemicals of Interest'
                      />
                    </DivLabel>
                    <FormGroup>
                      <Dropdown
                        fieldProps={{ width: 2 }}
                        name='regulatoryDhsCoiAuthorized'
                        options={[
                          { key: 0, text: 'No', value: false },
                          { key: 1, text: 'Yes', value: true }
                        ]}
                        inputProps={{
                          'data-test': 'settings_users_popup_regulatory_dhs_chemicals_drpdn'
                        }}
                      />
                    </FormGroup>
                    <DivNotify>
                      {values?.regulatoryDhsCoiAuthorized && (
                        <FormattedMessage
                          id='settings.user.purchaseAuthorized.notify'
                          defaultMessage='User will be emailed link to submit their signature. Signature will be valid for 12 months from date of signing. Status pending until a signature has been submitted'
                        />
                      )}
                    </DivNotify>

                    <DivLabel>
                      <FormattedMessage
                        id='settings.user.regulatoryHazmatAuthorized'
                        defaultMessage='Authorized to purchase Hazardous Chemicals'
                      />
                    </DivLabel>
                    <FormGroup>
                      <Dropdown
                        fieldProps={{ width: 2 }}
                        name='regulatoryHazmatAuthorized'
                        options={[
                          { key: 0, text: 'No', value: false },
                          { key: 1, text: 'Yes', value: true }
                        ]}
                        inputProps={{
                          'data-test': 'settings_users_popup_regulatory_hazmat_drpdn'
                        }}
                      />
                    </FormGroup>
                  </Form>
                </SegmentCustomContent>
              </DivFlexContent>

              <DivBottomSidebar>
                {!openGlobalAddForm && (
                  <Button
                    className='light'
                    onClick={() => closeSidebar()}
                    data-test='settings_users_popup_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                )}
                <Button className='secondary' data-test='settings_users_popup_submit_btn' onClick={() => submitForm()}>
                  <FormattedMessage id='global.save' defaultMessage='Save'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </DivBottomSidebar>
              <ErrorFocus />
            </SidebarFlex>
          </>
        )
      }}
    </Formik>
  )
}

const mapDispatchToProps = {
  closeSidebar,
  postNewUserRequest,
  handlerSubmitUserEditPopup,
  getCompanyDetails,
  searchSellMarketSegments,
  searchBuyMarketSegments,
  getIdentity,
  getUsersDataRequest,
  getCompanyUser
}

const mapStateToProps = state => {
  const { settings, companiesAdmin, auth } = state

  return {
    currentUserId: getSafe(() => auth.identity.id, null),
    isCompanyAdmin: getSafe(() => auth.identity.isCompanyAdmin, false),
    companyId: getSafe(() => state.auth.identity.company.id, null),
    editTrig: settings.editTrig,
    updating: settings.updating,
    userRoles: settings.roles,
    userSettings: settings?.userSettings,
    sidebarValues: settings?.sidebarValues,
    searchedSellMarketSegments: getSafe(() => companiesAdmin.searchedSellMarketSegments, []).map(d => ({
      key: d.id,
      text: d.name,
      value: d.id
    })),
    searchedSellMarketSegmentsLoading: getSafe(() => companiesAdmin.searchedSellMarketSegmentsLoading, false),
    searchedBuyMarketSegments: getSafe(() => companiesAdmin.searchedBuyMarketSegments, []).map(d => ({
      key: d.id,
      text: d.name,
      value: d.id
    })),
    searchedBuyMarketSegmentsLoading: getSafe(() => companiesAdmin.searchedBuyMarketSegmentsLoading, false)
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserEditSidebar)))
