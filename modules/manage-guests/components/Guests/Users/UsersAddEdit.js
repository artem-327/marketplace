/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import get from 'lodash/get'
import { getSafe } from '~/utils/functions'

// Components
import { Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Dimmer, Loader, Grid, GridRow, GridColumn, Checkbox, FormField } from 'semantic-ui-react'
import { CheckboxWithValue } from '~/components/custom-formik'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import ErrorFocus from '~/components/error-focus'

// Actions
import { closePopup, addNewUser, editUser } from '../../../actions'
import { searchSellMarketSegments, searchBuyMarketSegments } from '~/modules/companies/actions'
import { getIdentity } from '~/modules/auth/actions'

// Services
import {
  userFormValidation,
  getHomeBranchesOptions,
  getBranchesOptions,
  getInitialFormValues,
  switchUser,
  submitUser,
  handleSellMarketSegmentsSearchChange,
  handleBuyMarketSegmentsSearchChange,
  handleSellMarketSegmentsChange,
  handleBuyMarketSegmentsChange,
  generateCheckboxes
} from './UsersAddEdit.services'
import { uniqueArrayByKey } from '~/utils/functions'

// Styles
import { CustomForm, GridColumnWError, CustomSegment } from './UsersAddEdit.styles'
import { FlexSidebar, FlexContent, HighSegment } from '~/modules/admin/constants/layout'
import { BottomButtons } from '../../../constants'

const UsersAddEdit = props => {
  const {
    closePopup,
    clientCompanyRoles,
    isClientCompany,
    currencies,
    intl: { formatMessage },
    updating,
    searchedSellMarketSegmentsLoading,
    searchedSellMarketSegments,
    searchedBuyMarketSegmentsLoading,
    searchedBuyMarketSegments,
    isCompanyAdmin
  } = props

  const [popupValues, setPopupValues] = useState(null)
  const [branches, setBranches] = useState([])
  const [selectedSellMarketSegmentsOptions, setSelectedSellMarketSegmentsOptions] = useState([])
  const [selectedBuyMarketSegmentsOptions, setSelectedBuyMarketSegmentsOptions] = useState([])

  const state = {
    popupValues,
    setPopupValues,
    branches,
    setBranches,
    selectedSellMarketSegmentsOptions,
    setSelectedSellMarketSegmentsOptions,
    selectedBuyMarketSegmentsOptions,
    setSelectedBuyMarketSegmentsOptions
  }

  // Similar to call componentDidMount:
  useEffect(() => {
    const { companyId, isCompanyAdmin, companyEditValues } = props
    if (companyId !== null) {
      let branches = uniqueArrayByKey(
        (companyEditValues && companyEditValues.primaryBranch
            ? getHomeBranchesOptions([companyEditValues.primaryBranch])
            : []
        ).concat(companyEditValues.branches ? getBranchesOptions(companyEditValues.branches) : []),
        'key'
      )
      setBranches(branches)
    }

    if (props.popupValues) {
      switchUser(props.popupValues, state)
    } else {
      setPopupValues(null)
    }

    /*Commented by https://pm.artio.net/issues/34033#note-14 */
    /*
    if (isCompanyAdmin) {
      this.props.searchSellMarketSegments('')
      this.props.searchBuyMarketSegments('')
    }
    */
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
    <CustomForm
      autoComplete='off'
      enableReinitialize
      initialValues={getInitialFormValues(popupValues)}
      validationSchema={userFormValidation()}
      onSubmit={(values, actions) => submitUser(values, actions, props, state)}>
      {formikProps => {
        let { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting } = formikProps

        let errorRoles = get(errors, 'roles', null)

        return (
          <FlexSidebar
            visible={true}
            width='very wide'
            style={{ width: '630px' }}
            direction='right'
            animation='overlay'>
            <Dimmer inverted active={updating}>
              <Loader />
            </Dimmer>

            <HighSegment basic>
              {popupValues
                ? formatMessage({ id: 'settings.editUser', defaultMessage: 'Edit User' })
                : formatMessage({ id: 'settings.addUser', defaultMessage: 'Add User' })}
            </HighSegment>

            <FlexContent>
              <CustomSegment>
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
                        clearable
                      />
                    </GridColumn>
                  </GridRow>
                </Grid>
              </CustomSegment>

              <CustomSegment>
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
                  {/*Comemnted by https://pm.artio.net/issues/34033#note-9 */}
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
                              handleSellMarketSegmentsChange(value, allSellMarketSegmentsOptions, state)
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Dropdown
                          label={
                            <>
                              {formatMessage({
                                id: 'global.purchaseMarketSegments',
                                defaultMessage: 'Purchase Market Segments'
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
              </CustomSegment>
              <CustomSegment>
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
                    {generateCheckboxes(clientCompanyRoles, values, 'roles', errorRoles)}
                  </GridRow>
                  <GridRow style={{ paddingTop: '0', marginTop: '-5px' }}>
                    <GridColumn>{errorRoles && <span className='sui-error-message'>{errorRoles}</span>}</GridColumn>
                  </GridRow>
                  {/*<pre>
                      {JSON.stringify(values, null, 2)}
                    </pre>*/}
                </Grid>
              </CustomSegment>
            </FlexContent>

            <BottomButtons>
              <div style={{ textAlign: 'right' }}>
                <Button className='light' onClick={closePopup} data-test='settings_users_popup_reset_btn'>
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                    {text => text}
                  </FormattedMessage>
                </Button>
                <Button.Submit className='secondary' data-test='settings_users_popup_submit_btn'>
                  <FormattedMessage id='global.save' defaultMessage='Save'>
                    {text => text}
                  </FormattedMessage>
                </Button.Submit>
              </div>
            </BottomButtons>
            <ErrorFocus />
          </FlexSidebar>
        )
      }}
    </CustomForm>
  )
}

const mapDispatchToProps = {
  closePopup,
  addNewUser,
  editUser,
  searchSellMarketSegments,
  searchBuyMarketSegments,
  getIdentity
}

const mapStateToProps = state => {
  const { settings, companiesAdmin, manageGuests, auth } = state

  return {
    currentUserId: getSafe(() => auth.identity.id, false),
    isCompanyAdmin: getSafe(() => auth.identity.isCompanyAdmin, false),
    companyId: getSafe(() => manageGuests.companyEditValues.id, null),
    isClientCompany: getSafe(() => auth.identity.company.isClientCompany, false),
    companyEditValues: manageGuests.companyEditValues,
    editTrig: manageGuests.editTrig,
    updating: manageGuests.updating,
    clientCompanyRoles: manageGuests.clientCompanyRoles,
    popupValues: manageGuests.popupValues,
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

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersAddEdit)))
