import React from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup } from 'semantic-ui-react'
import {
  closePopup,
  closeRolesPopup,
  handlerSubmitUserEditPopup,
  postNewUserRequest,
  putNewUserRoleRequest,
  getCurrencies
} from '../../actions'
import debounce from 'lodash/debounce'
import { uniqueArrayByKey } from '~/utils/functions'
import { searchSellMarketSegments, searchBuyMarketSegments } from '../../../admin/actions'
import { Form, Input, Button, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { CheckboxWithValue } from '~/components/custom-formik'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'
import { errorMessages } from '~/constants/yupValidation'
//import { currency } from '~/constants/index'
import { currencyId } from '~/constants/index'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'
import { removeEmpty, getSafe } from '~/utils/functions'

const userFormValidation = () =>
  Yup.object().shape({
    name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
    email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
    homeBranch: Yup.number().required(errorMessages.requiredMessage),
    additionalBranches: Yup.array(),
    jobTitle: Yup.string().trim().min(3, errorMessages.minLength(3)),
    phone: Yup.string().trim().min(3, errorMessages.minLength(3))
  })

const rolesFormValidation = Yup.object().shape({
  roles: Yup.array()
})

class UsersPopup extends React.Component {
  state = {
    selectedSellMarketSegmentsOptions: [],
    selectedBuyMarketSegmentsOptions: []
  }
  componentDidMount() {
    try {
      this.props.getCurrencies()
      this.props.searchSellMarketSegments('')
      this.props.searchBuyMarketSegments('')
    } catch (error) {
      console.log(error)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.popupValues &&
      ((prevProps.popupValues && prevProps.popupValues !== this.props.popupValues) || prevProps.popupValues === null)
    ) {
      let selectedSellMarketSegmentsOptions = []
      let selectedBuyMarketSegmentsOptions = []
      if (getSafe(() => user.value.sellMarketSegments.length, [])) {
        selectedSellMarketSegmentsOptions = user.value.sellMarketSegments.map(d => {
          return {
            key: d.id,
            text: d.name,
            value: d.id
          }
        })
      }

      if (getSafe(() => user.value.buyMarketSegments.length, [])) {
        selectedBuyMarketSegmentsOptions = user.value.buyMarketSegments.map(d => {
          return {
            key: d.id,
            text: d.name,
            value: d.id
          }
        })
      }

      this.setState({ selectedSellMarketSegmentsOptions, selectedBuyMarketSegmentsOptions })
    }
  }

  submitRoles = async (values, actions) => {
    const { popupValues, putNewUserRoleRequest } = this.props

    try {
      await putNewUserRoleRequest(values.roles, popupValues.id)
    } catch {
    } finally {
      actions.setSubmitting(false)
    }
  }

  submitUser = async (values, actions) => {
    const { popupValues, handlerSubmitUserEditPopup, postNewUserRequest } = this.props

    const data = {
      additionalBranches: values.additionalBranches,
      email: values.email,
      homeBranch: values.homeBranch,
      jobTitle: values.jobTitle,
      name: values.name,
      phone: values.phone,
      preferredCurrency: currencyId, //values.preferredCurrency,
      sellMarketSegments: values.sellMarketSegments,
      buyMarketSegments: values.buyMarketSegments
    }
    removeEmpty(data)

    try {
      if (popupValues) {
        await handlerSubmitUserEditPopup(data, popupValues.id)
      } else {
        await postNewUserRequest(data)
      }
    } catch {}
    actions.setSubmitting(false)
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

  render() {
    const {
      closePopup,
      popupValues,
      branchesAll,
      userEditRoles,
      closeRolesPopup,
      roles,
      userRoles,
      currencies,
      isCompanyAdmin,
      isUserAdmin,
      searchedSellMarketSegmentsLoading,
      searchedSellMarketSegments,
      searchedBuyMarketSegmentsLoading,
      searchedBuyMarketSegments,
      intl: { formatMessage }
    } = this.props

    const {
      name = '',
      email = '',
      homeBranch = undefined,
      preferredCurrency = currencyId,
      additionalBranches = [],
      jobTitle = '',
      phone = '',
      sellMarketSegments,
      buyMarketSegments
    } = popupValues || {}

    const initialFormValues = {
      name,
      email,
      homeBranch,
      additionalBranches,
      preferredCurrency,
      jobTitle,
      phone,
      roles: userRoles,
      sellMarketSegments: getSafe(() => sellMarketSegments, []).map(d => d.id),
      buyMarketSegments: getSafe(() => buyMarketSegments, []).map(d => d.id)
    }

    const { selectedBuyMarketSegmentsOptions, selectedSellMarketSegmentsOptions } = this.state

    const allSellMarketSegmentsOptions = uniqueArrayByKey(
      searchedSellMarketSegments.concat(selectedSellMarketSegmentsOptions),
      'key'
    )
    const allBuyMarketSegmentsOptions = uniqueArrayByKey(
      searchedBuyMarketSegments.concat(selectedBuyMarketSegmentsOptions),
      'key'
    )

    return (
      <Modal
        closeIcon
        onClose={() => (userEditRoles ? closeRolesPopup() : closePopup())}
        open
        centered={false}
        size={userEditRoles ? 'mini' : null}>
        <Modal.Header>
          {userEditRoles
            ? formatMessage({ id: 'settings.assignUserRoles', defaultMessage: 'Assign User Roles' })
            : popupValues
            ? formatMessage({ id: 'settings.editUser', defaultMessage: 'Edit User' })
            : formatMessage({ id: 'settings.addUser', defaultMessage: 'Add User' })}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={userEditRoles ? rolesFormValidation : userFormValidation(popupValues)}
            onReset={userEditRoles ? closeRolesPopup : closePopup}
            onSubmit={userEditRoles ? this.submitRoles : this.submitUser}>
            {({ values, setFieldValue, setFieldTouched, errors, touched, isSubmitting }) => (
              <>
                {userEditRoles ? (
                  roles.map((role, i) => (
                    <FormGroup key={i}>
                      <CheckboxWithValue name='roles' label={role.name} value={role.id} />
                    </FormGroup>
                  ))
                ) : (
                  <>
                    <FormGroup widths='equal' data-test='settings_users_popup_nameTitle_inp'>
                      <Input
                        type='text'
                        label={
                          <>
                            {formatMessage({ id: 'global.name', defaultMessage: 'Name' })}
                            <Required />
                          </>
                        }
                        name='name'
                      />
                      <Input
                        type='text'
                        label={formatMessage({ id: 'global.jobTitle', defaultMessage: 'Job Title' })}
                        name='jobTitle'
                      />
                    </FormGroup>
                    <FormGroup widths='equal' data-test='settings_users_popup_emailPhone_inp'>
                      <Input
                        type='text'
                        label={
                          <>
                            {formatMessage({ id: 'global.email', defaultMessage: 'Email' })}
                            <Required />
                          </>
                        }
                        name='email'
                      />
                      <PhoneNumber
                        name='phone'
                        values={values}
                        label={<FormattedMessage id='global.phone' defaultMessage='Phone' />}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        errors={errors}
                        touched={touched}
                        isSubmitting={isSubmitting}
                      />
                    </FormGroup>
                    <FormGroup widths='equal' data-test='settings_users_popup_homeBranch_inp'>
                      <Dropdown
                        label={
                          <>
                            {formatMessage({ id: 'global.homeBranch', defaultMessage: 'Home Branch' })}
                            <Required />
                          </>
                        }
                        name='homeBranch'
                        options={branchesAll}
                        fieldProps={{ width: 7 }}
                        inputProps={{ 'data-test': 'settings_users_popup_homeBranch_drpdn' }}
                      />
                      <Dropdown
                        label={formatMessage({
                          id: 'global.additionalBranches',
                          defaultMessage: 'Additional Branches'
                        })}
                        name='additionalBranches'
                        options={branchesAll}
                        fieldProps={{ width: 7 }}
                        inputProps={{
                          'data-test': 'settings_users_popup_additionalBranches_drpdn',
                          multiple: true
                        }}
                      />
                      {/* <Dropdown
                          label={formatMessage({ id: 'global.currency', defaultMessage: 'Currency' })}
                          name='preferredCurrency'
                          options={currencies}
                          fieldProps={{ width: 2 }}
                          inputProps={{ 'data-test': 'settings_users_popup_preferredCurrency_drpdn' }} /> */}
                    </FormGroup>
                    <FormGroup widths='equal' data-test='settings_users_popup_marketSegments_inp'>
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
                          disabled: !isUserAdmin && !isCompanyAdmin,
                          noResultsMessage: formatMessage({
                            id: 'global.startTypingToSearch',
                            defaultMessage: 'Start typing to begin search'
                          }),
                          onSearchChange: this.handleSellMarketSegmentsSearchChange,
                          onChange: (_, { value }) =>
                            this.handleSellMarketSegmentsChange(value, allSellMarketSegmentsOptions)
                        }}
                      />
                      <Dropdown
                        label={
                          <>{formatMessage({ id: 'global.buyMarketSegments', defaultMessage: 'Buy Market Segment' })}</>
                        }
                        name='buyMarketSegments'
                        options={allBuyMarketSegmentsOptions}
                        inputProps={{
                          loading: searchedBuyMarketSegmentsLoading,
                          search: true,
                          icon: 'search',
                          selection: true,
                          multiple: true,
                          disabled: !isUserAdmin && !isCompanyAdmin,
                          noResultsMessage: formatMessage({
                            id: 'global.startTypingToSearch',
                            defaultMessage: 'Start typing to begin search'
                          }),
                          onSearchChange: this.handleBuyMarketSegmentsSearchChange,
                          onChange: (_, { value }) =>
                            this.handleBuyMarketSegmentsChange(value, allBuyMarketSegmentsOptions)
                        }}
                      />
                    </FormGroup>
                    {/* <pre>
                        {JSON.stringify(values, null, 2)}
                      </pre> */}
                  </>
                )}
                <div style={{ textAlign: 'right' }}>
                  <Button.Reset
                    onClick={userEditRoles ? closeRolesPopup : closePopup}
                    data-test='settings_users_popup_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Reset>
                  <Button.Submit data-test='settings_users_popup_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Submit>
                </div>
              </>
            )}
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  postNewUserRequest,
  putNewUserRoleRequest,
  closePopup,
  closeRolesPopup,
  handlerSubmitUserEditPopup,
  getCurrencies,
  searchSellMarketSegments,
  searchBuyMarketSegments
}

const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    userRoles: state.settings.popupValues && state.settings.popupValues.allUserRoles.map(r => r.id),
    branchesAll: state.settings.branchesAll,
    roles: state.settings.roles,
    userEditRoles: state.settings.userEditRoles,
    isUserAdmin: getSafe(() => state.auth.identity.isUserAdmin, false),
    isCompanyAdmin: getSafe(() => state.auth.identity.isCompanyAdmin, false),
    searchedSellMarketSegments: getSafe(() => state.admin.searchedSellMarketSegments, []).map(d => ({
      key: d.id,
      text: d.name,
      value: d.id
    })),
    searchedSellMarketSegmentsLoading: getSafe(() => state.admin.searchedSellMarketSegmentsLoading, false),
    searchedBuyMarketSegments: getSafe(() => state.admin.searchedBuyMarketSegments, []).map(d => ({
      key: d.id,
      text: d.name,
      value: d.id
    })),
    searchedBuyMarketSegmentsLoading: getSafe(() => state.admin.searchedBuyMarketSegmentsLoading, false)
    // currencies: state.settings.currency.map(d => {
    //   return {
    //     id: d.id,
    //     text: d.code,
    //     value: d.id
    //   }
    // }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UsersPopup))
