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
import { Form, Input, Button, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { CheckboxWithValue } from '~/components/custom-formik'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'
import { errorMessages } from '~/constants/yupValidation'
//import { currency } from '~/constants/index'
import { currencyId } from '~/constants/index'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'

const userFormValidation = () =>
  Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, errorMessages.minLength(3))
      .required(errorMessages.requiredMessage),
    email: Yup.string()
      .trim()
      .email(errorMessages.invalidEmail)
      .required(errorMessages.requiredMessage),
    homeBranch: Yup.number().required(errorMessages.requiredMessage),
    additionalBranches: Yup.array(),
    jobTitle: Yup.string()
      .trim()
      .min(3, errorMessages.minLength(3)),
    phone: Yup.string()
      .trim()
      .min(3, errorMessages.minLength(3))
  })

const rolesFormValidation = Yup.object().shape({
  roles: Yup.array()
})

class UsersPopup extends React.Component {
  componentDidMount() {
    this.props.getCurrencies()
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
      preferredCurrency: currencyId //values.preferredCurrency,
    }

    try {
      if (popupValues) {
        await handlerSubmitUserEditPopup(data, popupValues.id)
      } else {
        await postNewUserRequest(data)
      }
    } catch {}
    actions.setSubmitting(false)
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
      intl: { formatMessage }
    } = this.props

    const {
      name = '',
      email = '',
      homeBranch = undefined,
      preferredCurrency = currencyId,
      additionalBranches = [],
      jobTitle = '',
      phone = ''
    } = popupValues || {}

    const initialFormValues = {
      name,
      email,
      homeBranch,
      additionalBranches,
      preferredCurrency,
      jobTitle,
      phone,
      roles: userRoles
    }

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
                    <FormGroup>
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
  getCurrencies
}

const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    userRoles: state.settings.popupValues && state.settings.popupValues.allUserRoles.map(r => r.id),
    branchesAll: state.settings.branchesAll,
    roles: state.settings.roles,
    userEditRoles: state.settings.userEditRoles
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
