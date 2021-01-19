import React from 'react'
import { connect } from 'react-redux'
import { closePopup, addNewUser, editUser } from '../../../actions'
import { searchSellMarketSegments, searchBuyMarketSegments } from '~/modules/companies/actions'
import { getIdentity } from '~/modules/auth/actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import {
  Sidebar,
  Dimmer,
  Loader,
  Grid,
  GridRow,
  GridColumn,
  Checkbox,
  FormField,
  FormGroup,
  Segment
} from 'semantic-ui-react'
import { CheckboxWithValue } from '~/components/custom-formik'
import { Field as FormikField } from 'formik'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'
import { errorMessages, phoneValidation } from '~/constants/yupValidation'
//import { currency } from '~/constants/index'
import { currencyId } from '~/constants/index'
import { PhoneNumber } from '~/modules/phoneNumber'
import styled from 'styled-components'
import { debounce } from 'lodash'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import { removeEmpty } from '~/utils/functions'
import confirm from '~/components/Confirmable/confirm'
import { uniqueArrayByKey } from '~/utils/functions'
import get from 'lodash/get'
import { getSafe } from '~/utils/functions'
import ErrorFocus from '~/components/error-focus'

import { BottomButtons } from '../../../constants'
import { FlexSidebar, FlexContent, HighSegment } from '~/modules/admin/constants/layout'

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`

const GridColumnWError = styled(GridColumn)`
  &.column.error {
    color: #9f3a38;
  }
`

const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
`

const initValues = {
  name: '',
  email: '',
  company: '',
  homeBranch: '',
  preferredCurrency: currencyId,
  additionalBranches: [],
  jobTitle: '',
  phone: '',
  roles: [],
  buyMarketSegments: [],
  sellMarketSegments: []
}

class UsersSidebar extends React.Component {
  state = {
    popupValues: null,
    branches: [],
    selectedSellMarketSegmentsOptions: [],
    selectedBuyMarketSegmentsOptions: []
  }

  userFormValidation = () =>
    Yup.lazy(values => {
      return Yup.object().shape({
        name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
        email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
        additionalBranches: Yup.array(),
        jobTitle: Yup.string().trim().min(3, errorMessages.minLength(3)),
        phone: phoneValidation(),
        homeBranch: Yup.number().required(errorMessages.requiredMessage),
        roles: Yup.array().min(1, errorMessages.minOneRole)
      })
    })

  componentDidMount = async () => {
    const { companyId, popupValues, isCompanyAdmin, companyEditValues } = this.props
    if (companyId !== null) {
      let branches = uniqueArrayByKey(
        (companyEditValues && companyEditValues.primaryBranch
          ? this.getHomeBranchesOptions([companyEditValues.primaryBranch])
          : []
        ).concat(companyEditValues.branches ? this.getBranchesOptions(companyEditValues.branches) : []),
        'key'
      )
      this.setState({ branches })
    }

    if (this.props.popupValues) {
      this.switchUser(this.props.popupValues)
    } else {
      this.setState({ popupValues: null })
    }

    /*Commented by https://pm.artio.net/issues/34033#note-14 */
    /*
    if (isCompanyAdmin) {
      this.props.searchSellMarketSegments('')
      this.props.searchBuyMarketSegments('')
    }
    */
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.editTrig !== prevProps.editTrig) {
      if (!this.state.popupValues || this.props.popupValues.id !== this.state.popupValues) {
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
                      this.switchUser(this.props.popupValues)
                    }
                  },
                  () => {
                    // Cancel
                    this.switchUser(this.props.popupValues)
                  }
                )
                .catch(() => {})
            }
          })
        } else {
          this.switchUser(this.props.popupValues)
        }
      }
    }
  }

  switchUser = async popupValues => {
    let selectedSellMarketSegmentsOptions = []
    let selectedBuyMarketSegmentsOptions = []

    if (getSafe(() => popupValues.sellMarketSegments.length, [])) {
      selectedSellMarketSegmentsOptions = popupValues.sellMarketSegments.map(d => {
        return {
          key: d.id,
          text: d.name,
          value: d.id
        }
      })
    }

    if (getSafe(() => popupValues.buyMarketSegments.length, [])) {
      selectedBuyMarketSegmentsOptions = popupValues.buyMarketSegments.map(d => {
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
      popupValues: {
        ...popupValues,
        homeBranch: popupValues.homeBranch,
        additionalBranches: popupValues.additionalBranches,
        sellMarketSegments: getSafe(() => popupValues.sellMarketSegments, []),
        buyMarketSegments: getSafe(() => popupValues.buyMarketSegments, [])
      }
    })
  }

  getHomeBranchesOptions = branches => branches.map(b => ({ key: b.id, value: b.id, text: b.deliveryAddress.cfName }))

  getBranchesOptions = branches => {
    let result = []
    branches.forEach(
      b => b.warehouse === false && result.push({ key: b.id, value: b.id, text: b.deliveryAddress.cfName })
    )
    return result
  }

  submitUser = async (values, actions, closeOnSubmit = true) => {
    const { editUser, addNewUser, closePopup, datagrid, currentUserId, getIdentity, companyId } = this.props
    const { popupValues } = this.state
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
      if (popupValues) {
        const { value } = await editUser(popupValues.id, companyId, data)
        datagrid.updateRow(popupValues.id, () => value)
        sendSuccess = true
        if (currentUserId === popupValues.id) getIdentity()
      } else {
        await addNewUser(data)
        datagrid.loadData()
        sendSuccess = true
      }
      if (closeOnSubmit) closePopup()
    } catch {}
    actions.setSubmitting(false)
    return sendSuccess
  }

  getInitialFormValues = () => {
    const { popupValues } = this.state
    return popupValues
      ? {
          additionalBranches: popupValues.additionalBranches.map(d => d.id),
          email: popupValues.email,
          homeBranch: popupValues.homeBranch ? popupValues.homeBranch.id : '',
          jobTitle: popupValues.jobTitle,
          name: popupValues.name,
          phone: popupValues.phone,
          preferredCurrency: currencyId,
          roles: popupValues.roles.map(d => d.id),
          sellMarketSegments: getSafe(() => popupValues.sellMarketSegments, []).map(d => d.id),
          buyMarketSegments: getSafe(() => popupValues.buyMarketSegments, []).map(d => d.id)
        }
      : initValues
  }

  handleSellMarketSegmentsSearchChange = debounce((_, { searchQuery }) => {
    this.props.searchSellMarketSegments(searchQuery)
  }, 250)

  handleSellMarketSegmentsChange = (value, options) => {
    const newOptions = options.filter(el => value.some(v => el.value === v))
    this.setState({ selectedSellMarketSegmentsOptions: newOptions })
  }

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
    } = this.props

    const { branches, popupValues, selectedSellMarketSegmentsOptions, selectedBuyMarketSegmentsOptions } = this.state

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
        initialValues={this.getInitialFormValues()}
        validationSchema={this.userFormValidation()}
        onSubmit={this.submitUser}>
        {formikProps => {
          let { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting } = formikProps
          this.formikProps = formikProps

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
                              onSearchChange: this.handleSellMarketSegmentsSearchChange,
                              onChange: (_, { value }) =>
                                this.handleSellMarketSegmentsChange(value, allSellMarketSegmentsOptions)
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
                              onSearchChange: this.handleBuyMarketSegmentsSearchChange,
                              onChange: (_, { value }) =>
                                this.handleBuyMarketSegmentsChange(value, allBuyMarketSegmentsOptions)
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
                      {this.generateCheckboxes(clientCompanyRoles, values, 'roles', errorRoles)}
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

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersSidebar)))
