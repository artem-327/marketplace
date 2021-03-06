import { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Dimmer, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import moment from 'moment'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getLanguages } from '../../global-data/actions'
import { getSafe } from '~/utils/functions'
import { FormattedDateTime } from '~/components/formatted-messages/'
import { errorMessages, phoneValidation } from '~/constants/yupValidation'
import { PhoneNumber } from '~/modules/phoneNumber'
import UploadAttachment from '../../inventory/components/upload/UploadAttachment'
import { getIdentity } from '../../auth/actions'
import { ImageSearch } from '@material-ui/icons'
import styled from 'styled-components'

const DivLogoWrapper = styled.div`
  padding: 20px;
`

const ImageSearchStyled = styled(ImageSearch)`
  font-size: 64px !important;
`

const DivLabel = styled.div`
  margin-bottom: 4px;
`


import {
  closePopup,
  getUserMeData,
  getCurrencies,
  updateMyProfile,
  openChangePasswordPopup,
  setPreferredLanguage,
  loadFile,
  saveAvatarPicture,
  deleteAvatarPicture
} from '../actions'

const initialFormValues = {
  name: '',
  email: '',
  phone: '',
  jobTitle: '',
  userAvatar: null
  // 'preferredCurrency': '',
}

const formValidation = Yup.object().shape({
  name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
  phone: phoneValidation(10)
})

class MyProfile extends Component {
  componentDidMount() {
    this.props.getUserMeData()
    // this.props.getCurrencies()
    if (!this.props.languages.length) this.props.getLanguages()
  }

  handleChangePassword = () => {
    this.props.openChangePasswordPopup()
  }

  render() {
    const {
      closePopup,
      // currencies,
      popupValues,
      intl: { formatMessage },
      languages,
      languagesFetching,
      tutorialCompleted,
      setPreferredLanguage,
      loadFile,
      saveAvatarPicture,
      deleteAvatarPicture,
      getIdentity,
      savingAvatarPicture,
      identityLoading
    } = this.props

    return (
      <Modal closeIcon onClose={() => closePopup()} open centered={false} size='small'>
        <Dimmer active={savingAvatarPicture || identityLoading} inverted>
          <Loader />
        </Dimmer>
        <Modal.Header>
          <FormattedMessage id='profile.myProfile' defaultMessage='My Profile' />
        </Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            validationSchema={formValidation}
            initialValues={popupValues ? popupValues : initialFormValues}
            onReset={closePopup}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                let {
                  name,
                  phone
                  // preferredCurrency, preferredLanguage
                } = values

                let payload = {
                  name,
                  phone,
                  //preferredCurrency,
                  tutorialCompleted //from props, not from form
                }
                await this.props.updateMyProfile(payload)
                if (values.language) {
                  await setPreferredLanguage(languages.find(lan => lan.language === values.language).language)
                }
                closePopup()
              } catch (e) {
                console.error(e)
              } finally {
                setSubmitting(false)
              }
            }}
            data-test='my_profile_userData_inp'>
            {({ values, setFieldValue, setFieldTouched, errors, touched, isSubmitting }) => (
              <>
                <Input
                  type='text'
                  label={formatMessage({ id: 'global.email', defaultMessage: 'E-mail' })}
                  name='email'
                  inputProps={{ readOnly: true }}
                />
                <Input type='text' label={formatMessage({ id: 'global.name', defaultMessage: 'Name' })} name='name' />
                <PhoneNumber
                  label={<FormattedMessage id='global.phone' defaultMessage='Phone' />}
                  name='phone'
                  values={values}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                />
                <Input
                  type='text'
                  label={formatMessage({ id: 'global.title', defaultMessage: 'Title' })}
                  name='jobTitle'
                  inputProps={{ readOnly: true }}
                />
                {/* <Dropdown
                  label={formatMessage({ id: 'global.currency', defaultMessage: 'Currency' })}
                  name='preferredCurrency'
                  options={currencies}
                  inputProps={{ 'data-test': 'my_profile_currency_drpdn' }} /> */}
                <Dropdown
                  label={formatMessage({ id: 'global.language', defaultMessage: 'Language' })}
                  name='language'
                  inputProps={{
                    loading: languagesFetching
                  }}
                  options={languages.map(lang => ({
                    key: lang.languageAbbreviation,
                    text: lang.language,
                    value: lang.language
                  }))}
                />
                <DivLabel>
                  <FormattedMessage id='profile.avatarPicture' defaultMessage='Avatar Picture' />
                </DivLabel>
                <UploadAttachment
                  acceptFiles='image/jpeg, image/png, image/gif, image/svg'
                  name='userAvatar'
                  filesLimit={1}
                  fileMaxSize={2}
                  onChange={async files => {
                    if (files.length) {
                      try {
                        await saveAvatarPicture(files[0])
                        getIdentity()
                      } catch (error) {
                        console.error(error)
                      }
                    }
                  }}
                  attachments={popupValues && popupValues.ownAvatar && popupValues.avatar ? [popupValues.avatar] : []}
                  removeAttachment={async () => {
                    try {
                      await deleteAvatarPicture()
                      getIdentity()
                    } catch (error) {
                      console.error(error)
                    }
                  }}
                  emptyContent={
                    <DivLogoWrapper>
                      <ImageSearchStyled />
                    </DivLogoWrapper>
                  }
                  uploadedContent={
                    <div>
                      {popupValues && popupValues.avatar && (
                        <img
                          src={popupValues.avatar}
                        />
                      )}
                    </div>
                  }
                />

                <FormattedMessage id='profile.lastLoginAt' defaultMessage='Last login at:' />{' '}
                {popupValues && popupValues.lastLoginAt}
                <div style={{ textAlign: 'right' }}>
                  <Button
                    style={{ 'margin-bottom': '10px' }}
                    onClick={this.handleChangePassword}
                    data-test='my_profile_change_password_btn'>
                    <FormattedMessage id='password.change' defaultMessage='Change Password'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Button.Reset data-test='my_profile_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Reset>
                  <Button.Submit data-test='my_profile_submit_btn'>
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
  closePopup,
  getUserMeData,
  getCurrencies,
  updateMyProfile,
  openChangePasswordPopup,
  getLanguages,
  setPreferredLanguage,
  loadFile,
  getIdentity,
  saveAvatarPicture,
  deleteAvatarPicture
}

const mapStateToProps = state => {
  const popupValues = state.auth.identity

  return {
    popupValues: popupValues
      ? {
          email: popupValues.email,
          name: popupValues.name,
          phone: popupValues.phone,
          jobTitle: popupValues.jobTitle,
          // preferredCurrency: popupValues.preferredCurrency && popupValues.preferredCurrency.id,
          language: getSafe(() => popupValues.preferredLanguage.language),
          lastLoginAt:
            state.auth.identity.lastLoginAt &&
            getSafe(() => moment(state.auth.identity.lastLoginAt).toDate().toLocaleString(), null),
          avatar: popupValues.avatarUrl,
          ownAvatar: popupValues.ownAvatar
        }
      : null,
    // currencies: state.profile.currency && state.profile.currency.map(d => {
    //   return {
    //     id: d.id,
    //     text: d.code,
    //     value: d.id
    //   }
    // }),
    changePasswordPopup: state.profile.changePasswordPopup,
    languages: state.globalData.languages,
    languagesFetching: state.globalData.languagesLoading,
    tutorialCompleted: getSafe(() => state.auth.identity.tutorialCompleted, false),
    savingAvatarPicture: state.profile.savingAvatarPicture,
    identityLoading: state.auth.loading
  }
}

MyProfile.propTypes = {
  getUserMeData: PropTypes.func,
  getLanguages: PropTypes.func,
  openChangePasswordPopup: PropTypes.func,
  languages: PropTypes.object,
  intl: PropTypes.object
}

MyProfile.defaultProps = {
  getUserMeData: () => { },
  getLanguages: () => { },
  openChangePasswordPopup: () => { },
  languages: {},
  intl: { formatMessage: () => { } }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(MyProfile))
