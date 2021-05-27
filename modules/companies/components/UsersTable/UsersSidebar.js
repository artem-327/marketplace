/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { FormattedMessage, injectIntl } from 'react-intl'
import { errorMessages, phoneValidation } from '~/constants/yupValidation'
import get from 'lodash/get'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Constants
import { currencyId } from '~/constants/index'

// Components
import { Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Dimmer, Loader, Grid, GridRow, GridColumn, Modal, Form } from 'semantic-ui-react'
import { CheckboxWithValue } from '~/components/custom-formik'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'
import ErrorFocus from '~/components/error-focus'

// Services
import {
  closePopup,
  postNewUserRequest,
  submitUserEdit,
  searchCompany,
  initSearchCompany,
  getUser,
  searchSellMarketSegments,
  searchBuyMarketSegments
} from '../../actions'
import {
  userFormValidation,
  switchUser,
  getBranchesOptions,
  submitUser,
  getInitialFormValues,
  handleSellMarketSegmentsSearchChange,
  handleBuyMarketSegmentsSearchChange,
  handleSellMarketSegmentsChange,
  handleBuyMarketSegmentsChange,
  generateCheckboxes,
  searchCompanies
} from './UsersSidebar.services'
import { removeEmpty, uniqueArrayByKey, getSafe } from '~/utils/functions'
import { withDatagrid } from '~/modules/datagrid'

// Styles
import { GridColumnWError, CustomSegment, ModalFixed } from './UsersSidebar.styles'

const UsersSidebar = props => {
  const {
    closePopup,
    userRoles,
    adminRoles,
    intl: { formatMessage },
    searchedCompanies,
    searchedCompaniesLoading,
    updating,
    searchedSellMarketSegmentsLoading,
    searchedSellMarketSegments,
    searchedBuyMarketSegmentsLoading,
    searchedBuyMarketSegments
  } = props

  const [selectedCompany, setSelectedCompany] = useState([])
  const [popupValues, setPopupValues] = useState(null)
  const [branches, setBranches] = useState([])
  const [selectedSellMarketSegmentsOptions, setSelectedSellMarketSegmentsOptions] = useState([])
  const [selectedBuyMarketSegmentsOptions, setSelectedBuyMarketSegmentsOptions] = useState([])

  const state = {
    selectedCompany,
    setSelectedCompany,
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
    if (props.popupValues) {
      switchUser(props, state)
    } else {
      setPopupValues(null)
    }
  }, [])  // If [] is empty then is similar as componentDidMount.

  const companiesAll = uniqueArrayByKey(searchedCompanies.concat(selectedCompany), 'id')
  const companiesOptions = companiesAll.map(d => ({
    key: d.id,
    value: d.id,
    text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
  }))
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
      initialValues={getInitialFormValues(popupValues)}
      validationSchema={userFormValidation(props)}
      onSubmit={(values, actions) => submitUser(values, actions, props, state)}>
      {formikProps => {
        let { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting, submitForm } = formikProps

        const disabledCompany = values.roles.some(role => adminRoles.some(d => role === d.id))
        let errorRoles = get(errors, 'roles', null)

        return (
          <ModalFixed open size='small'>
            <Modal.Header>
              {popupValues
                ? formatMessage({ id: 'settings.editUser', defaultMessage: 'Edit User' })
                : formatMessage({ id: 'settings.addUser', defaultMessage: 'Add User' })}
            </Modal.Header>
            <Dimmer inverted active={updating || searchedCompaniesLoading}>
              <Loader />
            </Dimmer>

            <Modal.Content scrolling>
              <PerfectScrollbar>
                <Form>
                  <CustomSegment>
                    <Grid>
                      <GridRow>
                        <GridColumn width={8} data-test='admin_users_popup_name_inp'>
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
                        <GridColumn width={8} data-test='admin_users_popup_title_inp'>
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
                        <GridColumn width={8} data-test='admin_users_popup_email_inp'>
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
                        <GridColumn width={8} data-test='admin_users_popup_Phone_inp'>
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
                  </CustomSegment>

                  <CustomSegment>
                    <Grid>
                      <GridRow>
                        <GridColumn>
                          <Dropdown
                            label={
                              <>
                                {formatMessage({ id: 'global.companyName', defaultMessage: 'Company Name' })}
                                {!disabledCompany && <Required />}
                              </>
                            }
                            name='company'
                            options={companiesOptions}
                            inputProps={{
                              icon: 'search',
                              disabled: disabledCompany,
                              search: options => options,
                              selection: true,
                              onSearchChange: (e, { searchQuery }) =>
                                searchQuery.length > 0 && searchCompanies(searchQuery, props),
                              onChange: (_, { value }) => {
                                const company = companiesAll.find(el => el.id === value)
                                let homeBranch = ''
                                if (company) {
                                  let newRoles = values.roles.slice()
                                  newRoles = newRoles.filter(role => adminRoles.every(d => role !== d.id))
                                  setFieldValue('roles', newRoles)
                                  if (company.primaryBranch) homeBranch = company.primaryBranch.id
                                }

                                setBranches(company ? getBranchesOptions(company.branches) : [])
                                setSelectedCompany(value ? companiesAll.find(d => d.id === value) : [])
                                setFieldValue('homeBranch', homeBranch)
                                setFieldValue('additionalBranches', [])
                              },
                              loading: searchedCompaniesLoading,
                              placeholder: formatMessage({
                                id: 'global.selectCompany',
                                defaultMessage: 'Select Company'
                              }),
                              'data-test': 'admin_users_popup_company_drpdn'
                            }}
                          />
                        </GridColumn>
                      </GridRow>

                      <GridRow>
                        <GridColumn width={8}>
                          <Dropdown
                            label={
                              <>
                                {formatMessage({ id: 'global.homeBranch', defaultMessage: 'Home Branch' })}
                                {!disabledCompany && values.company !== '' && <Required />}
                              </>
                            }
                            name='homeBranch'
                            options={branches}
                            inputProps={{
                              disabled: disabledCompany || values.company === '',
                              placeholder: formatMessage({
                                id: 'global.selectHomeBranch',
                                defaultMessage: 'Select Home Branch'
                              }),
                              'data-test': 'admin_users_popup_homeBranch_drpdn'
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
                              disabled: disabledCompany || values.company === '',
                              placeholder: formatMessage({
                                id: 'global.selectAdditionalHomeBranch',
                                defaultMessage: 'Select Additional Home Branch'
                              }),
                              'data-test': 'admin_users_popup_additionalBranches_drpdn',
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
                                disabled: !values.homeBranch,
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
                                disabled: !values.homeBranch,
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
                      <GridRow>
                        {generateCheckboxes(
                          values.company !== '' ? userRoles : adminRoles,
                          values,
                          'roles',
                          errorRoles
                        )}
                      </GridRow>
                      <GridRow style={{ paddingTop: '0' }}>
                        <GridColumn>{errorRoles && <span className='sui-error-message'>{errorRoles}</span>}</GridColumn>
                      </GridRow>

                      {/*<pre>
                          {JSON.stringify(values, null, 2)}
                        </pre>*/}
                    </Grid>
                  </CustomSegment>
                </Form>
              </PerfectScrollbar>
            </Modal.Content>

            <Modal.Actions>
              <Button className='light' onClick={closePopup} data-test='admin_users_popup_reset_btn'>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                  {text => text}
                </FormattedMessage>
              </Button>
              <Button onClick={() => submitForm()} className='secondary' data-test='admin_users_popup_submit_btn'>
                <FormattedMessage id='global.save' defaultMessage='Save'>
                  {text => text}
                </FormattedMessage>
              </Button>
            </Modal.Actions>
            <ErrorFocus />
          </ModalFixed>
        )
      }}
    </Formik>
  )
}

const mapDispatchToProps = {
  closePopup,
  postNewUserRequest,
  submitUserEdit,
  searchCompany,
  initSearchCompany,
  getUser,
  searchSellMarketSegments,
  searchBuyMarketSegments
}

const mapStateToProps = state => {
  const { companiesAdmin } = state
  return {
    editTrig: companiesAdmin.editTrig,
    updating: companiesAdmin.updating,
    userRoles: companiesAdmin.userRoles,
    adminRoles: companiesAdmin.adminRoles,
    popupValues: companiesAdmin.popupValues,
    isSuperAdmin: companiesAdmin.currentUser && companiesAdmin.currentUser.roles.findIndex(d => d.id === 1) !== -1,
    searchedCompanies: companiesAdmin.searchedCompanies,
    searchedCompaniesLoading: companiesAdmin.searchedCompaniesLoading,
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

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersSidebar)))
