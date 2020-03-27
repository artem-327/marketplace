import React from 'react'
import { connect } from 'react-redux'
import {
  closePopup,
  postNewUserRequest,
  submitUserEdit,
  getRoles,
  searchCompany
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
import styled from "styled-components"
import { debounce } from "lodash"
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import { removeEmpty } from '~/utils/functions'

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

const userFormValidation = (popupValues) =>
  Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, errorMessages.minLength(3))
      .required(errorMessages.requiredMessage),
    email: Yup.string()
      .trim()
      .email(errorMessages.invalidEmail)
      .required(errorMessages.requiredMessage),
    ...(popupValues && { homeBranch: Yup.number().required(errorMessages.requiredMessage) }),
    additionalBranches: Yup.array(),
    jobTitle: Yup.string()
      .trim()
      .min(3, errorMessages.minLength(3)),
    phone: Yup.string()
      .trim()
      .min(3, errorMessages.minLength(3))
  })

class UsersSidebar extends React.Component {
  state = {
    branches: []
  }

  componentDidMount = async () => {
    //this.props.getCurrencies()
    if (!this.props.allRoles.length) this.props.getRoles()
    if (this.props.popupValues && this.props.popupValues.company) {
      const { value } = await this.props.searchCompany(this.props.popupValues.company.name, 5)
      const company = value.find(el => el.id === this.props.popupValues.company.id)
      this.setState({ branches: company
        ? this.getBranchesOptions(company.branches)
        : []
      })
    } else {
      this.props.searchCompany('', 30)
    }
  }

  getBranchesOptions = branches => {
    return branches.map(b => ({
      key: b.id,
      value: b.id,
      text: b.deliveryAddress.cfName
      })
    )
  }

  submitUser = async (values, actions) => {
    const { popupValues, submitUserEdit, postNewUserRequest, closePopup, datagrid } = this.props

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
      } else {
        await postNewUserRequest(data)
        datagrid.loadData()
      }
      closePopup()
    } catch {}
    actions.setSubmitting(false)
  }

  getInitialFormValues = () => {
    const { popupValues } = this.props
    return popupValues
    ? {
        additionalBranches: [].map(d => d.id),  // ! ! zatim nevraci BE ! !
        email: popupValues.email,
        homeBranch: '',  // ! ! zatim nevraci BE ! !
        jobTitle: popupValues.jobTitle,
        company: popupValues.company ? popupValues.company.id : '',
        name: popupValues.name,
        phone: popupValues.phone,
        preferredCurrency: currencyId,
        roles: popupValues.roles.map(d => d.id)
      }
    :
      initValues
  }

  searchCompanies = debounce(text => {
    this.props.searchCompany(text, 5)
  }, 250)

  generateCheckboxes = (data, values, groupName = null) => {
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
        <FormField key={i}>
          <FormikField
            onChange={(e, data) => {
              let { setFieldValue } = data.form

              let newArray = values[groupName].slice()
              if (data.checked) {
                newArray.push(el.id)
              } else {
                newArray = newArray.filter(d => d !== el.id)
              }
              setFieldValue(groupName, newArray)
            }}
            disabled={hasCompany && el.id === 1}
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
      columnLeft.push(
        getCheckbox(data[i], i)
      )
    }

    for (; i < data.length; i++) {
      columnRight.push(
        getCheckbox(data[i], i)
      )
    }

    return (
      <>
        <GridColumn width={8} >
          {columnLeft}
        </GridColumn>
        <GridColumn width={8} >
          {columnRight}
        </GridColumn>
      </>
    )
  }

  render() {
    const {
      closePopup,
      popupValues,
      allRoles,
      currencies,
      intl: { formatMessage },
      companiesOptions,
      searchedCompanies,
      searchedCompaniesLoading,
      isSuperAdmin,
      updating
    } = this.props

    const {
      branches
    } = this.state

    return (
      <Form
        initialValues={this.getInitialFormValues()}
        validationSchema={userFormValidation(popupValues)}
        onReset={closePopup}
        onSubmit={this.submitUser}>
        {({ values, setFieldValue, setFieldTouched, errors, touched, isSubmitting }) => (
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
                        placeholder:
                          formatMessage({ id: 'global.enterEmailAddress', defaultMessage: 'Enter Email Address' })
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
                      label={formatMessage({ id: 'global.companyName', defaultMessage: 'Company Name' })}
                      name='company'
                      options={companiesOptions}
                      inputProps={{
                        icon: 'search',
                        search: options => options,
                        disabled: !!popupValues,
                        selection: true,
                        onSearchChange: (e, { searchQuery }) =>
                          searchQuery.length > 0 && this.searchCompanies(searchQuery),
                        onChange: (_, { value }) => {
                          const company = searchedCompanies.find(el => el.id === value)
                          this.setState({
                            branches: company
                              ? this.getBranchesOptions(company.branches)
                              : []
                          })
                          if (company) {
                            let newArray = values.roles.slice()
                            newArray = newArray.filter(d => d !== 1)  // Clear Super Admin role
                            setFieldValue('roles', newArray)
                          }
                          console.log('!!!!!!!!!! onChange company', company)
                          setFieldValue('homeBranch', '')
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
                  <GridColumn width={8} >
                    <Dropdown
                      label={
                        <>
                          {formatMessage({ id: 'global.homeBranch', defaultMessage: 'Home Branch' })}
                          {popupValues && (<Required />)}
                        </>
                      }
                      name='homeBranch'
                      options={branches}
                      inputProps={{
                        placeholder:
                          formatMessage({ id: 'global.selectHomeBranch', defaultMessage: 'Select Home Branch' }),
                        'data-test': 'admin_users_popup_homeBranch_drpdn'
                      }}
                    />
                  </GridColumn>
                  <GridColumn width={8} >
                    <Dropdown
                      label={formatMessage({
                        id: 'global.additionalBranches',
                        defaultMessage: 'Additional Branches'
                      })}
                      name='additionalBranches'
                      options={branches}
                      inputProps={{
                        placeholder:
                          formatMessage({
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
                  <GridColumn>
                    <FormattedMessage id='global.roles' defaultMessage='Roles'>
                      {text => text}
                    </FormattedMessage>
                  </GridColumn>
                </GridRow>
                <GridRow>
                  {this.generateCheckboxes(allRoles, values, 'roles')}
                </GridRow>

                {/*<pre>
                    {JSON.stringify(values, null, 2)}
                  </pre>*/}
              </Grid>
            </FlexContent>

            <BottomButtons>
              <div style={{ textAlign: 'right' }}>
                <Button.Reset
                  onClick={closePopup}
                  data-test='admin_users_popup_reset_btn'>
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                    {text => text}
                  </FormattedMessage>
                </Button.Reset>
                <Button.Submit data-test='admin_users_popup_submit_btn'>
                  <FormattedMessage id='global.save' defaultMessage='Save'>
                    {text => text}
                  </FormattedMessage>
                </Button.Submit>
              </div>
            </BottomButtons>
          </FlexSidebar>
        )}
      </Form>

    )
  }
}

const mapDispatchToProps = {
  closePopup,
  postNewUserRequest,
  submitUserEdit,
  getRoles,
  searchCompany,
}

const mapStateToProps = state => {
  const { admin } = state
  return {
    updating: admin.updating,
    allRoles: admin.roles,
    popupValues: admin.popupValues,
    isSuperAdmin: admin.currentUser && admin.currentUser.roles.findIndex(d => d.id === 1) !== -1,
    companiesOptions: admin.searchedCompanies.map(d => ({
      key: d.id,
      value: d.id,
      text: d.displayName ? d.displayName : d.name
    })),
    searchedCompanies: admin.searchedCompanies,
    searchedCompaniesLoading: admin.searchedCompaniesLoading,
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersSidebar)))
