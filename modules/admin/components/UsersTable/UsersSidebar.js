import React from 'react'
import { connect } from 'react-redux'
import {
  closePopup,
  postNewUserRequest,
  submitUserEdit,
  searchCompany,
  initSearchCompany,
  getUser
} from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Sidebar, Dimmer, Loader, Grid, GridRow, GridColumn, Checkbox, FormField, FormGroup } from 'semantic-ui-react'
import { CheckboxWithValue } from '~/components/custom-formik'
import { Field as FormikField } from 'formik'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'
import { errorMessages } from '~/constants/yupValidation'
//import { currency } from '~/constants/index'
import { currencyId } from '~/constants/index'
import { PhoneNumber } from '~/modules/phoneNumber'
import styled from 'styled-components'
import { debounce } from 'lodash'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import { removeEmpty } from '~/utils/functions'
import confirm from '~/src/components/Confirmable/confirm'
import { uniqueArrayByKey } from '~/utils/functions'
import get from 'lodash/get'
import { getSafe } from '~/utils/functions'

const FlexSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  top: 80px !important;
  padding-bottom: 80px;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
  font-size: 14px;
`

const HighSegment = styled.div`
  padding: 1.071428571em 2.142857143em;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
  background-color: #ffffff;
  text-transform: uppercase;
`

const FlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 30px;

  .ui.grid {
    margin: 0 -5px;
    .row {
      padding: 7.5px 0;
    }
    .column {
      padding: 0 5px;
    }
  }

  .field {
    .ui.checkbox {
      label {
        color: #848893;
      }
      &.checked {
        label {
          color: #20273a;
        }
      }
    }
    .field {
      label {
        color: #546f93;
      }
    }
  }
`

const BottomButtons = styled.div`
  display: inline-block;
  position: relative;
  overflow: visible;
  margin: 0;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 #dee2e6;
  padding: 0.714285714em 1.785714286em;
  text-align: right;

  .ui.button {
    font-size: 1em;
    margin: 0 0.357142857em;
    padding: 0.928571429em 1.5em 0.928571429em;
    color: #848893;
    background-color: #ffffff;
    border: solid 1px #dee2e6;
  }

  .ui.primary.button {
    color: #ffffff;
    background-color: #2599d5;
    border: none;
  }

  .ui.modal & {
    margin: 30px -1.5rem -1.5rem;
    border-top: 1px solid #dee2e6;
    box-shadow: 0 0 0 0 transparent;
  }
`

const GridColumnWError = styled(GridColumn)`
  &.column.error {
    color: #9f3a38;
  }
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
  roles: []
}

class UsersSidebar extends React.Component {
  state = {
    popupValues: null,
    selectedCompany: [],
    branches: []
  }

  userFormValidation = () =>
    Yup.lazy(values => {
      const { adminRoles } = this.props
      const { popupValues } = this.state

      const disabledCompany = values.roles.some(role => adminRoles.some(d => role === d))
      const requiredCompany = !!popupValues || (!disabledCompany && !values.company)
      const requiredBranch = !!popupValues || (!disabledCompany && !!values.company)

      return Yup.object().shape({
        name: Yup.string()
          .trim()
          .min(3, errorMessages.minLength(3))
          .required(errorMessages.requiredMessage),
        email: Yup.string()
          .trim()
          .email(errorMessages.invalidEmail)
          .required(errorMessages.requiredMessage),
        additionalBranches: Yup.array(),
        jobTitle: Yup.string()
          .trim()
          .min(3, errorMessages.minLength(3)),
        phone: Yup.string()
          .trim()
          .min(3, errorMessages.minLength(3)),
        ...(requiredCompany && {
          company: Yup.number().required(errorMessages.requiredMessage)
        }),
        ...(requiredBranch && {
          homeBranch: Yup.number().required(errorMessages.requiredMessage)
        }),
        roles: Yup.array().min(1, errorMessages.minOneRole)
      })
    })

  componentDidMount = async () => {
    //this.props.getCurrencies()

    if (this.props.popupValues) {
      this.switchUser(this.props.popupValues)
    } else {
      this.props.searchCompany('', 30)
      this.setState({ popupValues: null })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.editTrig !== prevProps.editTrig) {
      if (!this.state.popupValues || this.props.popupValues.id !== this.state.popupValues) {
        let {
          values,
          setFieldValue,
          setFieldTouched,
          errors,
          touched,
          validateForm,
          isSubmitting,
          submitForm
        } = this.formikProps
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
    const [comp, user] = await Promise.all([
      popupValues.company ? this.props.initSearchCompany(popupValues.company.id) : this.props.searchCompany('', 30),
      this.props.getUser(popupValues.id)
    ])

    if (popupValues.company) {
      const company = comp.value
      let branches = uniqueArrayByKey(
        (user.value.homeBranch ? this.getBranchesOptions([user.value.homeBranch]) : []).concat(
          user.value.additionalBranches ? this.getBranchesOptions(user.value.additionalBranches) : [],
          company ? this.getBranchesOptions(company.branches) : []
        ),
        'key'
      )

      this.setState({
        branches,
        selectedCompany: company ? [company] : [],
        popupValues: {
          ...popupValues,
          homeBranch: user.value.homeBranch,
          additionalBranches: user.value.additionalBranches
        }
      })
    } else {
      this.props.searchCompany('', 30)
      this.setState({
        branches: [],
        selectedCompany: [],
        popupValues: {
          ...popupValues,
          homeBranch: user.value.homeBranch,
          additionalBranches: user.value.additionalBranches
        }
      })
    }
  }

  getBranchesOptions = branches => {
    let result = []
    branches.forEach(
      b => b.warehouse === false && result.push({ key: b.id, value: b.id, text: b.deliveryAddress.cfName })
    )
    return result
  }

  submitUser = async (values, actions, closeOnSubmit = true) => {
    const { submitUserEdit, postNewUserRequest, closePopup, datagrid } = this.props
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
    }

    removeEmpty(data)

    try {
      if (popupValues) {
        const { value } = await submitUserEdit(popupValues.id, data)
        datagrid.updateRow(popupValues.id, () => value)
        sendSuccess = true
      } else {
        await postNewUserRequest(data)
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
          company: popupValues.company ? popupValues.company.id : '',
          name: popupValues.name,
          phone: popupValues.phone,
          preferredCurrency: currencyId,
          roles: popupValues.roles.map(d => d.id)
        }
      : initValues
  }

  searchCompanies = debounce(text => {
    this.props.searchCompany(text, 5)
  }, 250)

  generateCheckboxes = (data, values, groupName = null, error) => {
    if (!data) return []
    let group = null

    if (groupName) group = `${groupName}.`

    let columnLeft = []
    let columnRight = []
    const hasCompany = values.company !== ''

    var getCheckbox = (el, i) => {
      let name = el.name
        .replace(/ /g, '')
        .replace(/\//g, '')
        .replace(/-/g, '')
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
            disabled={values.company !== '' && this.props.adminRoles.some(d => el.id === d)}
            component={Checkbox}
            checked={!!values[groupName] && values[groupName].includes(el.id)}
            name={path}
            label={el.name.charAt(0).toUpperCase() + el.name.slice(1)}
            data-test='admin_users_popup_FormikField_change'
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
      allRoles,
      adminRoles,
      currencies,
      intl: { formatMessage },
      //searchedCompaniesOptions,
      searchedCompanies,
      searchedCompaniesLoading,
      isSuperAdmin,
      updating
    } = this.props

    const { branches, popupValues, selectedCompany } = this.state

    const companiesAll = uniqueArrayByKey(searchedCompanies.concat(selectedCompany), 'id')
    const companiesOptions = companiesAll.map(d => ({
      key: d.id,
      value: d.id,
      text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
    }))

    return (
      <Form
        enableReinitialize
        initialValues={this.getInitialFormValues()}
        validationSchema={this.userFormValidation()}
        onSubmit={this.submitUser}>
        {formikProps => {
          let { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting } = formikProps
          this.formikProps = formikProps

          const disabledCompany = values.roles.some(role => adminRoles.some(d => role === d))
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
                          placeholder: formatMessage({ id: 'global.enterJobTitle', defaultMessage: 'Enter Job Title' })
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
                      />
                    </GridColumn>
                  </GridRow>

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
                          search: options => options,
                          disabled: disabledCompany,
                          selection: true,
                          onSearchChange: (e, { searchQuery }) =>
                            searchQuery.length > 0 && this.searchCompanies(searchQuery),
                          onChange: (_, { value }) => {
                            const company = companiesAll.find(el => el.id === value)
                            this.setState({
                              branches: company ? this.getBranchesOptions(company.branches) : [],
                              selectedCompany: value ? companiesAll.find(d => d.id === value) : []
                            })
                            let homeBranch = ''
                            if (company) {
                              let newRoles = values.roles.slice()
                              newRoles = newRoles.filter(role => adminRoles.every(d => role !== d))
                              setFieldValue('roles', newRoles)
                              if (company.primaryBranch) homeBranch = company.primaryBranch.id
                            }
                            setFieldValue('homeBranch', homeBranch)
                            setFieldValue('additionalBranches', [])
                          },
                          loading: searchedCompaniesLoading,
                          placeholder: formatMessage({ id: 'global.selectCompany', defaultMessage: 'Select Company' }),
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

                  <GridRow style={{ paddingBottom: '2.5px' }}>
                    <GridColumnWError className={errorRoles ? 'error' : ''}>
                      <FormattedMessage id='global.roles' defaultMessage='Roles'>
                        {text => text}
                      </FormattedMessage>
                      <Required />
                    </GridColumnWError>
                  </GridRow>
                  <GridRow>{this.generateCheckboxes(allRoles, values, 'roles', errorRoles)}</GridRow>
                  <GridRow style={{ paddingTop: '0' }}>
                    <GridColumn>{errorRoles && <span className='sui-error-message'>{errorRoles}</span>}</GridColumn>
                  </GridRow>

                  {/*<pre>
                      {JSON.stringify(values, null, 2)}
                    </pre>*/}
                </Grid>
              </FlexContent>

              <BottomButtons>
                <div style={{ textAlign: 'right' }}>
                  <Button onClick={closePopup} data-test='admin_users_popup_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                  <Button.Submit data-test='admin_users_popup_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Submit>
                </div>
              </BottomButtons>
            </FlexSidebar>
          )
        }}
      </Form>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  postNewUserRequest,
  submitUserEdit,
  searchCompany,
  initSearchCompany,
  getUser
}

const mapStateToProps = state => {
  const { admin } = state
  return {
    editTrig: admin.editTrig,
    updating: admin.updating,
    allRoles: admin.roles,
    adminRoles: admin.adminRoles.map(d => d.id),
    popupValues: admin.popupValues,
    isSuperAdmin: admin.currentUser && admin.currentUser.roles.findIndex(d => d.id === 1) !== -1,
    searchedCompanies: admin.searchedCompanies,
    searchedCompaniesLoading: admin.searchedCompaniesLoading
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersSidebar)))
