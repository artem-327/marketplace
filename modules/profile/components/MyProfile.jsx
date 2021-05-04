import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import moment from 'moment'
import { FormattedMessage, injectIntl } from 'react-intl'
import { ImageSearch } from '@material-ui/icons'
import styled from 'styled-components'

import { getLanguages } from '~/modules/settings/actions'
import { getSafe } from '~/utils/functions'
import { FormattedDateTime } from '~/components/formatted-messages/'
import { errorMessages, phoneValidation } from '~/constants/yupValidation'
import { PhoneNumber } from '~/modules/phoneNumber'
import UploadAttachment from '../../inventory/components/upload/UploadAttachment'
import { getIdentity } from '../../auth/actions'
import {makeGetChangePasswordPopup, makeGetLanguages, makeGetLanguagesFetching, makeGetTutorialCompleted, makeGetPopupValues} from '../selectors'

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
}

const formValidation = Yup.object().shape({
  name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
  phone: phoneValidation(10)
})

const MyProfile = props => {
  useEffect(()=>{
    props.getUserMeData()
    props.getLanguages()
  }, [])

  const handleChangePassword = () => {
    props.openChangePasswordPopup()
  }

  const {
    closePopup,
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
  } = props

  return (
    <Modal closeIcon onClose={() => closePopup()} open centered={false} size='small'>
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
              } = values

              let payload = {
                name,
                phone,
                tutorialCompleted
              }
              await props.updateMyProfile(payload)
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
                    {popupValues && (
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
                  onClick={handleChangePassword}
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

const makeMapStateToProps = () => {
  const getChangePasswordPopup = makeGetChangePasswordPopup()
  const getLanguages = makeGetLanguages()
  const getLanguagesFetching = makeGetLanguagesFetching()
  const getTutorialCompleted = makeGetTutorialCompleted()
  const getPopupValues = makeGetPopupValues()

  const mapStateToProps = state => {
    return {
      popupValues: getPopupValues(state),
      changePasswordPopup: getChangePasswordPopup(state),
      languages: getLanguages(state),
      languagesFetching: getLanguagesFetching(state),
      tutorialCompleted: getTutorialCompleted(state)
    }
  }
  return mapStateToProps
}
export default injectIntl(connect(makeMapStateToProps, mapDispatchToProps)(MyProfile))
