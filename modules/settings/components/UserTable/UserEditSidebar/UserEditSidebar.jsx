import { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Sidebar, Dimmer, Loader, Grid, GridRow, GridColumn, Checkbox, FormField, Segment } from 'semantic-ui-react'
import { Field as FormikField } from 'formik'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Person } from '@material-ui/icons'
import { X as XIcon } from 'react-feather'
import get from 'lodash/get'
import { debounce } from 'lodash'
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
import confirm from '../../../../../components/Confirmable/confirm'
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
  handleSellMarketSegmentsChange
} from './UserEditSidebar.services'
//Constants
import { currencyId } from '../../../../../constants/index'
//Styles
import {
  SidebarFlex,
  DivHighSegment,
  DivFlexContent,
  DivBottomButtons,
  FormStyled,
  SegmentStyled,
  GridColumnWError
} from './UserEditSidebar.styles'
/**
 * @category Settings - Users
 * @component
 */
class UserEditSidebar extends Component {
  state = {
    sidebarValues: null,
    branches: [],
    selectedSellMarketSegmentsOptions: [],
    selectedBuyMarketSegmentsOptions: []
  }

  componentDidMount = async () => {
    const { companyId, sidebarValues, isCompanyAdmin, openGlobalAddForm, getUsersDataRequest } = this.props
    if (companyId !== null) {
      const { value } = await this.props.getCompanyDetails(companyId)
      let branches = uniqueArrayByKey(
        (sidebarValues && sidebarValues.homeBranch ? getHomeBranchesOptions([sidebarValues.homeBranch]) : []).concat(
          sidebarValues && sidebarValues.additionalBranches ? getBranchesOptions(sidebarValues.additionalBranches) : [],
          value && value.branches ? getBranchesOptions(value.branches) : []
        ),
        'key'
      )
      this.setState({ branches })
    }

    if (this.props.sidebarValues) {
      this.switchUser(this.props.sidebarValues)
    } else {
      this.setState({ sidebarValues: null })
    }

    /*Comemnted by https://pm.artio.net/issues/34033#note-14 */
    /*if (isCompanyAdmin) {
      this.props.searchSellMarketSegments('')
      this.props.searchBuyMarketSegments('')
    }*/

    if (!!openGlobalAddForm) getUsersDataRequest()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.editTrig !== prevProps.editTrig) {
      if (!this.state.sidebarValues || this.props.sidebarValues.id !== this.state.sidebarValues) {
        let { values, touched, validateForm, submitForm } = this.formikProps
        if (Object.keys(touched).length) {
          validateForm().then(err => {
            const errors = Object.keys(err)
            if (errors.length && errors[0] !== 'isCanceled') {
              submitForm() // to show errors
            } else {
              const { intl } = this.props
              let { formatMessage } = intl
              confirm(
                formatMessage({
                  id: 'confirm.global.unsavedChanges.header',
                  defaultMessage: 'Unsaved changes'
                }),
                formatMessage({
                  id: 'confirm.global.unsavedChanges.content',
                  defaultMessage: 'You have unsaved changes. Do you wish to save them?'
                })
              )
                .then(
                  async () => {
                    // Confirm
                    //if (await submitForm(values, this.formikProps, false).sendSuccess) {
                    if (await this.submitUser(values, this.formikProps, false)) {
                      this.switchUser(this.props.sidebarValues)
                    }
                  },
                  () => {
                    // Cancel
                    this.switchUser(this.props.sidebarValues)
                  }
                )
                .catch(() => {})
            }
          })
        } else {
          this.switchUser(this.props.sidebarValues)
        }
      }
    }
  }

  switchUser = async sidebarValues => {
    let selectedSellMarketSegmentsOptions = []
    let selectedBuyMarketSegmentsOptions = []

    if (getSafe(() => sidebarValues.sellMarketSegments.length, [])) {
      selectedSellMarketSegmentsOptions = sidebarValues.sellMarketSegments.map(d => {
        return {
          key: d.id,
          text: d.name,
          value: d.id
        }
      })
    }

    if (getSafe(() => sidebarValues.buyMarketSegments.length, [])) {
      selectedBuyMarketSegmentsOptions = sidebarValues.buyMarketSegments.map(d => {
        return {
          key: d.id,
          text: d.name,
          value: d.id
        }
      })
    }

    this.setState({
      selectedSellMarketSegmentsOptions,
      selectedBuyMarketSegmentsOptions,
      sidebarValues: {
        ...sidebarValues,
        homeBranch: sidebarValues.homeBranch,
        additionalBranches: sidebarValues.additionalBranches,
        sellMarketSegments: getSafe(() => sidebarValues.sellMarketSegments, []),
        buyMarketSegments: getSafe(() => sidebarValues.buyMarketSegments, [])
      }
    })
  }

  submitUser = async (values, actions, closeOnSubmit = true) => {
    const {
      handlerSubmitUserEditPopup,
      postNewUserRequest,
      closeSidebar,
      datagrid,
      currentUserId,
      getIdentity,
      openGlobalAddForm
    } = this.props
    const { sidebarValues } = this.state
    let sendSuccess = false

    actions.setSubmitting(false)

    const data = {
      additionalBranches: values.additionalBranches,
      email: values.email,
      homeBranch: values.homeBranch,
      jobTitle: values.jobTitle,
      name: values.name,
      phone: values.phone,
      preferredCurrency: currencyId,
      roles: values.roles
      /*Commented by https://pm.artio.net/issues/34033#note-14 */
      //sellMarketSegments: values.sellMarketSegments,
      //buyMarketSegments: values.buyMarketSegments
    }

    removeEmpty(data)

    try {
      if (sidebarValues) {
        const { value } = await handlerSubmitUserEditPopup(sidebarValues.id, data)
        !openGlobalAddForm && datagrid.updateRow(sidebarValues.id, () => value)
        sendSuccess = true
        if (currentUserId === sidebarValues.id) getIdentity()
      } else {
        await postNewUserRequest(data)
        !openGlobalAddForm && datagrid.loadData()
        sendSuccess = true
      }
      if (closeOnSubmit) openGlobalAddForm ? openGlobalAddForm('') : closeSidebar()
    } catch {}
    actions.setSubmitting(false)
    return sendSuccess
  }

  handleSellMarketSegmentsSearchChange = debounce((_, { searchQuery }) => {
    this.props.searchSellMarketSegments(searchQuery)
  }, 250)

  handleBuyMarketSegmentsSearchChange = debounce((_, { searchQuery }) => {
    this.props.searchBuyMarketSegments(searchQuery)
  }, 250)

  handleBuyMarketSegmentsChange = (value, options) => {
    const newOptions = options.filter(el => value.some(v => el.value === v))
    this.setState({ selectedBuyMarketSegmentsOptions: newOptions })
  }

  generateCheckboxes = (data, values, groupName = null, error) => {
    if (!data) return []
    let group = null

    if (groupName) group = `${groupName}.`

    let columnLeft = []
    let columnRight = []

    const getCheckbox = (el, i) => {
      let name = el.name.replace(/ /g, '').replace(/\//g, '').replace(/-/g, '')
      let path = `${group}${name}`

      return (
        <FormField key={i} error={!!error}>
          <FormikField
            onChange={(e, data) => {
              let { setFieldValue, setFieldTouched } = data.form
              let newArray = values[groupName].slice()
              if (data.checked) {
                newArray.push(el.id)
              } else {
                newArray = newArray.filter(d => d !== el.id)
              }
              setFieldValue(groupName, newArray)
              setFieldTouched(groupName, true, true)
            }}
            component={Checkbox}
            checked={!!values[groupName] && values[groupName].includes(el.id)}
            name={path}
            label={el.name.charAt(0).toUpperCase() + el.name.slice(1)}
            data-test='settings_users_popup_FormikField_change'
          />
        </FormField>
      )
    }

    let i = 0
    for (; i < data.length / 2; i++) {
      columnLeft.push(getCheckbox(data[i], i))
    }

    for (; i < data.length; i++) {
      columnRight.push(getCheckbox(data[i], i))
    }

    return (
      <>
        <GridColumn width={8}>{columnLeft}</GridColumn>
        <GridColumn width={8}>{columnRight}</GridColumn>
      </>
    )
  }

  render() {
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
    } = this.props

    const { branches, sidebarValues, selectedSellMarketSegmentsOptions, selectedBuyMarketSegmentsOptions } = this.state

    const allSellMarketSegmentsOptions = uniqueArrayByKey(
      searchedSellMarketSegments.concat(selectedSellMarketSegmentsOptions),
      'key'
    )
    const allBuyMarketSegmentsOptions = uniqueArrayByKey(
      searchedBuyMarketSegments.concat(selectedBuyMarketSegmentsOptions),
      'key'
    )

    return (
      <FormStyled
        autoComplete='off'
        enableReinitialize
        initialValues={getInitialFormValues(sidebarValues)}
        validationSchema={userFormValidation()}
        onSubmit={this.submitUser}>
        {formikProps => {
          let { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting } = formikProps
          this.formikProps = formikProps

          let errorRoles = get(errors, 'roles', null)

          return (
            <SidebarFlex
              className={openGlobalAddForm ? 'full-screen-sidebar' : ''}
              visible={true}
              width='very wide'
              style={{ width: '630px' }}
              direction='right'
              animation='overlay'>
              <Dimmer inverted active={updating}>
                <Loader />
              </Dimmer>

              <DivHighSegment basic>
                {openGlobalAddForm ? (
                  <>
                    <div>
                      <span>
                        <FormattedMessage id='createMenu.addUser' defaultMessage='Add User' />
                      </span>
                      <Person className='title-icon' />
                    </div>
                    <div style={{ position: 'absolute', right: '20px' }}>
                      <XIcon onClick={() => openGlobalAddForm('')} className='close-icon' />
                    </div>
                  </>
                ) : sidebarValues ? (
                  formatMessage({ id: 'settings.editUser', defaultMessage: 'Edit User' })
                ) : (
                  formatMessage({ id: 'settings.addUser', defaultMessage: 'Add User' })
                )}
              </DivHighSegment>

              <DivFlexContent>
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
                              onSearchChange: this.handleSellMarketSegmentsSearchChange,
                              onChange: (_, { value }) =>
                                this.setState({
                                  selectedSellMarketSegmentsOptions: handleSellMarketSegmentsChange(
                                    value,
                                    allSellMarketSegmentsOptions
                                  )
                                })
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
                              onSearchChange: this.handleBuyMarketSegmentsSearchChange,
                              onChange: (_, { value }) =>
                                this.handleBuyMarketSegmentsChange(value, allBuyMarketSegmentsOptions)
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
                      {this.generateCheckboxes(
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
              </DivFlexContent>

              <DivBottomButtons className='bottom-buttons'>
                <div style={{ textAlign: 'right' }}>
                  {!openGlobalAddForm && (
                    <Button className='light' onClick={closeSidebar} data-test='settings_users_popup_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                  )}
                  <Button.Submit className='secondary' data-test='settings_users_popup_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Submit>
                </div>
              </DivBottomButtons>
              <ErrorFocus />
            </SidebarFlex>
          )
        }}
      </FormStyled>
    )
  }
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
