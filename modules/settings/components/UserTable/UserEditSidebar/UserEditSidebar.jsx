/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Dimmer, Loader, Grid, GridRow, GridColumn, Modal, Form } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Person } from '@material-ui/icons'
import get from 'lodash/get'
import { Formik } from 'formik'

//Actions
import {
  closeSidebar,
  postNewUserRequest,
  handlerSubmitUserEditPopup,
  getCompanyDetails,
  getUsersDataRequest
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
import {
  DivHighSegment,
  SegmentStyled,
  GridColumnWError
} from './UserEditSidebar.styles'
/**
 * @category Settings - Users
 * @component
 */
const UserEditSidebar = props => {
  const {
    closeSidebar,
    userRoles,
    clientCompanyRoles,
    isClientCompany,
    currencies,
    intl: { formatMessage },
    updating,
    searchedSellMarketSegmentsLoading,
    searchedSellMarketSegments,
    searchedBuyMarketSegmentsLoading,
    searchedBuyMarketSegments,
    isCompanyAdmin,
    openGlobalAddForm
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
  useEffect(async () => {
    const { companyId, sidebarValues, isCompanyAdmin, openGlobalAddForm, getUsersDataRequest } = props
    if (companyId !== null) {
      const { value } = await props.getCompanyDetails(companyId)
      let branches = uniqueArrayByKey(
        (sidebarValues && sidebarValues.homeBranch ? getHomeBranchesOptions([sidebarValues.homeBranch]) : [])
          .concat(sidebarValues && sidebarValues.additionalBranches
            ? getBranchesOptions(sidebarValues.additionalBranches)
            : [],
          value && value.branches ? getBranchesOptions(value.branches) : []
        ),
        'key'
      )
      setBranches(branches)
    }
    if (props.sidebarValues) {
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
  }, [])  // If [] is empty then is similar as componentDidMount.

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
      initialValues={getInitialFormValues(sidebarValues)}
      validationSchema={userFormValidation()}
      onSubmit={(values, actions) => submitUser(values, actions, props, state)}>
      {formikProps => {
        let { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting, submitForm } = formikProps
        let errorRoles = get(errors, 'roles', null)

        return (
          <Modal
            open
            size='small'
            closeIcon={!!openGlobalAddForm}
            onClose={() => !!openGlobalAddForm && openGlobalAddForm('')}>
            <Dimmer inverted active={updating}>
              <Loader />
            </Dimmer>
            <Modal.Header>
              <DivHighSegment basic>
                <div>
                  <span>
                    {!openGlobalAddForm && sidebarValues ? (
                      formatMessage({ id: 'settings.editUser', defaultMessage: 'Edit User' })
                    ) : (
                      formatMessage({ id: 'settings.addUser', defaultMessage: 'Add User' })
                    )}
                  </span>
                  <Person className='title-icon' />
                </div>
              </DivHighSegment>
            </Modal.Header>
            <Modal.Content scrolling>
              <Form>
                <SegmentStyled>
                  <Grid>
                    <GridRow>
                      <GridColumn width={8} data-test='settings_users_popup_name_inp'>
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
                      </GridColumn>
                      <GridColumn width={8} data-test='settings_users_popup_title_inp'>
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
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn width={8} data-test='settings_users_popup_email_inp'>
                        <Input
                          type='text'
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
                      </GridColumn>
                      <GridColumn width={8} data-test='settings_users_popup_Phone_inp'>
                        <PhoneNumber
                          name='phone'
                          values={values}
                          label={<FormattedMessage id='global.phone' defaultMessage='Phone' />}
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                          errors={errors}
                          touched={touched}
                          isSubmitting={isSubmitting}
                          placeholder={formatMessage({ id: 'global.phonePlaceholder', defaultMessage: '000 000 0000' })}
                          clearable={true}
                        />
                      </GridColumn>
                    </GridRow>
                  </Grid>
                </SegmentStyled>

                <SegmentStyled>
                  <Grid>
                    <GridRow>
                      <GridColumn width={8}>
                        <Dropdown
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
                      </GridColumn>
                      <GridColumn width={8}>
                        <Dropdown
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
                      </GridColumn>
                    </GridRow>
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
                  </Grid>
                </SegmentStyled>

                <SegmentStyled>
                  <Grid>
                    <GridRow style={{ paddingBottom: '2.5px' }}>
                      <GridColumnWError className={errorRoles ? 'error' : ''}>
                        <FormattedMessage id='global.roles' defaultMessage='Roles'>
                          {text => text}
                        </FormattedMessage>
                        <Required />
                      </GridColumnWError>
                    </GridRow>
                    <GridRow style={{ paddingBottom: '0' }}>
                      {generateCheckboxes(
                        isClientCompany ? clientCompanyRoles : userRoles,
                        values,
                        'roles',
                        errorRoles
                      )}
                    </GridRow>
                    <GridRow style={{ paddingTop: '0', marginTop: '-5px' }}>
                      <GridColumn>{errorRoles && <span className='sui-error-message'>{errorRoles}</span>}</GridColumn>
                    </GridRow>
                    {/*<pre>
                        {JSON.stringify(values, null, 2)}
                      </pre>*/}
                  </Grid>
                </SegmentStyled>
              </Form>
            </Modal.Content>

            <Modal.Actions>
              {!openGlobalAddForm && (
                <Button className='light' onClick={closeSidebar} data-test='settings_users_popup_reset_btn'>
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              )}
              <Button
                className='secondary'
                data-test='settings_users_popup_submit_btn'
                onClick={() => submitForm()}
              >
                <FormattedMessage id='global.save' defaultMessage='Save'>
                  {text => text}
                </FormattedMessage>
              </Button>
            </Modal.Actions>
            <ErrorFocus />
          </Modal>
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
  getUsersDataRequest
}

const mapStateToProps = state => {
  const { settings, companiesAdmin, auth } = state

  return {
    currentUserId: getSafe(() => auth.identity.id, null),
    isCompanyAdmin: getSafe(() => auth.identity.isCompanyAdmin, false),
    companyId: getSafe(() => state.auth.identity.company.id, null),
    isClientCompany: getSafe(() => state.auth.identity.company.isClientCompany, false),
    editTrig: settings.editTrig,
    updating: settings.updating,
    userRoles: settings.roles,
    clientCompanyRoles: settings.clientCompanyRoles,
    sidebarValues: settings.sidebarValues,
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
