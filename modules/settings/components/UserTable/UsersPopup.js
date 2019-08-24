import React from 'react'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import { Modal, FormGroup } from 'semantic-ui-react'
import {
  closePopup,
  closeRolesPopup,
  handlerSubmitUserEditPopup,
  postNewUserRequest,
  putNewUserRoleRequest,
  getCurrencies
} from '../../actions'
import { Form, Input, Button, Dropdown, Checkbox } from 'formik-semantic-ui'
import { CheckboxWithValue } from '~/components/custom-formik'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'
import { generateToastMarkup } from '~/utils/functions'
import { errorMessages } from '~/constants/yupValidation'

import { PhoneNumber } from '~/modules/phoneNumber'

const userFormValidation = () => Yup.object().shape({
  name: Yup.string().trim()
    .min(3, errorMessages.minLength(3))
    .required(errorMessages.requiredMessage),
  email: Yup.string().trim()
    .email(errorMessages.invalidEmail)
    .required(errorMessages.requiredMessage),
  homeBranch: Yup.number()
    .required(errorMessages.requiredMessage),
  additionalBranches: Yup.array(),
  jobTitle: Yup.string().trim()
    .min(3, errorMessages.minLength(3)),
  phone: Yup.string().trim()
    .min(3, errorMessages.minLength(3)),
})

const rolesFormValidation = Yup.object().shape({
  roles: Yup.array()
})

class UsersPopup extends React.Component {
  componentDidMount() {
    this.props.getCurrencies()
  }

  submitRoles = async (values, actions) => {
    const {
      popupValues,
      putNewUserRoleRequest
    } = this.props

    try {
      await putNewUserRoleRequest(
        values.roles,
        popupValues.id
      )
    } catch { }
    finally { actions.setSubmitting(false) }
  }

  submitUser = async (values, actions) => {
    const {
      toastManager,
      popupValues,
      handlerSubmitUserEditPopup,
      postNewUserRequest,
    } = this.props

    if (popupValues) {
      await handlerSubmitUserEditPopup(values, popupValues.id)
    } else {
      await postNewUserRequest(values)
    }

    const status = popupValues ? 'userUpdated' : 'userCreated'

    toastManager.add(generateToastMarkup(
      <FormattedMessage id={`notifications.${status}.header`} />,
      <FormattedMessage id={`notifications.${status}.content`} values={{ name: values.name }} />
    ), { appearance: 'success' })

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
      preferredCurrency = undefined,
      additionalBranches = [],
      jobTitle = '',
      phone = '',
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
      <Modal open centered={false} size={userEditRoles ? 'mini' : null}>
        <Modal.Header>
          {(userEditRoles
            ? formatMessage({ id: 'settings.assignUserRoles', defaultMessage: 'Assign User Roles' })
            : (popupValues
              ? formatMessage({ id: 'settings.editUser', defaultMessage: 'Edit User' })
              : formatMessage({ id: 'settings.addUser', defaultMessage: 'Add User' })
            )
          )}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={userEditRoles ? rolesFormValidation : userFormValidation(popupValues)}
            onReset={userEditRoles ? closeRolesPopup : closePopup}
            onSubmit={userEditRoles ? this.submitRoles : this.submitUser}
          >
            {({ values, setFieldValue }) => (
              <>
                {userEditRoles ? (
                  roles.map((role, i) => (
                    <FormGroup key={i}>
                      <CheckboxWithValue
                        name='roles'
                        label={role.name}
                        value={role.id}
                      />
                    </FormGroup>
                  ))
                ) : (
                    <>
                      { true && (
                      <FormGroup data-test='settings_users_popup_nameTitle_inp'>
                        <PhoneNumber
                          name='phone'
                          values={values}
                          setFieldValue={setFieldValue}
                        />
                      </FormGroup>)}

                      <FormGroup widths='equal' data-test='settings_users_popup_nameTitle_inp'>
                        <Input
                          type='text'
                          label={formatMessage({ id: 'global.name', defaultMessage: 'Name' })}
                          name='name' />
                        <Input
                          type='text'
                          label={formatMessage({ id: 'global.jobTitle', defaultMessage: 'Job Title' })}
                          name='jobTitle' />
                      </FormGroup>
                      <FormGroup widths='equal' data-test='settings_users_popup_emailPhone_inp'>
                        <Input
                          type='text'
                          label={formatMessage({ id: 'global.email', defaultMessage: 'Email' })}
                          name='email' />
                        <Input
                          type='text'
                          label={formatMessage({ id: 'global.phone', defaultMessage: 'Phone' })}
                          name='phone' />
                      </FormGroup>
                      <FormGroup>
                        <Dropdown
                          label={formatMessage({ id: 'global.homeBranch', defaultMessage: 'Home Branch' })}
                          name='homeBranch'
                          options={branchesAll}
                          fieldProps={{ width: 7 }}
                          inputProps={{ 'data-test': 'settings_users_popup_homeBranch_drpdn' }}
                        />
                        <Dropdown
                          label={formatMessage({ id: 'global.additionalBranches', defaultMessage: 'Additional Branches' })}
                          name='additionalBranches'
                          options={branchesAll}
                          fieldProps={{ width: 7 }}
                          inputProps={{
                            'data-test': 'settings_users_popup_additionalBranches_drpdn',
                            multiple: true
                          }}
                        />
                        <Dropdown
                          label={formatMessage({ id: 'global.currency', defaultMessage: 'Currency' })}
                          name='preferredCurrency'
                          options={currencies}
                          fieldProps={{ width: 2 }}
                          inputProps={{ 'data-test': 'settings_users_popup_preferredCurrency_drpdn' }} />
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
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{(text) => text}</FormattedMessage>
                  </Button.Reset>
                  <Button.Submit data-test='settings_users_popup_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save'>{(text) => text}</FormattedMessage>
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
    userRoles: state.settings.popupValues && state.settings.popupValues.allUserRoles.map(r => (
      r.id
    )),
    branchesAll: state.settings.branchesAll,
    roles: state.settings.roles,
    userEditRoles: state.settings.userEditRoles,
    currencies: state.settings.currency.map(d => {
      return {
        id: d.id,
        text: d.code,
        value: d.id
      }
    }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(injectIntl(UsersPopup)))
