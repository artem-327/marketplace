import { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Modal, Button } from 'semantic-ui-react'
import { Input, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { Formik } from 'formik'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'
import styled from 'styled-components'
import moment from 'moment'
import { FileInput, DateInput } from '~/components/custom-formik'

import { errorMessages, dateValidation, dateBefore } from '~/constants/yupValidation'
import { otherPermissions, sharedTo } from '~/constants/index'
import { getSafe, removeEmpty } from '~/utils/functions'

import { closePopup } from '~/modules/settings/actions'
import { addAttachment, updateAttachment } from '~/modules/inventory/actions'
import { getDocumentTypes } from '../../../global-data/actions'

import { bool, func, number } from 'prop-types'
import { getStringISODate } from '~/components/date-format'
import Router from 'next/router'
import { Required } from '~/components/constants/layout'
import ErrorFocus from '~/components/error-focus'

const validationSchema = Yup.lazy(values => {
  let validationObject = {
    expirationDate: dateValidation(false),
    issuedAt: dateValidation(false).concat(values.issuedAt && dateBefore('issuedAt', 'expirationDate')),
    documentType: Yup.object().shape({
      id: Yup.string().required(errorMessages.requiredMessage)
    })
  }

  if (!values.id) var conditionalValidations = { file: Yup.string().required(errorMessages.requiredMessage) }
  else {
    var conditionalValidations = {
      othersPermissions: Yup.string().required(errorMessages.requiredMessage),
      sharedTo: Yup.string().required(errorMessages.requiredMessage)
    }
  }
  return Yup.object().shape({ ...validationObject, ...conditionalValidations })
})

const initialValues = {
  customName: '',
  description: '',
  expirationDate: '',
  isTemporary: false,
  issuedAt: '',
  issuer: '',
  othersPermissions: '',
  sharedTo: '',
  documentType: {
    id: ''
  },
  file: ''
}

const RightAlignedGroup = styled(FormGroup)`
  text-align: right;
`

class DocumentPopup extends Component {
  async componentDidMount() {
    const { documentTypes, documentTypesLoading, getDocumentTypes, initialFileType } = this.props
    if (documentTypes.length === 0 && !documentTypesLoading) {
      try {
        await getDocumentTypes()
      } catch (err) {
        console.error(err)
      }
    }
    if (initialFileType !== null) this.setFieldValue('documentType.id', initialFileType)
  }

  render() {
    const {
      closePopup,
      popupValues,
      documentTypes,
      intl: { formatMessage },
      documentTypesLoading,
      edit,
      addAttachment,
      updateAttachment,
      onClose,
      enableClose,
      lockedFileType
    } = this.props

    return (
      <Modal
        closeIcon
        onClose={() => {
          if (enableClose) closePopup()
          onClose()
        }}
        open>
        <Modal.Header>
          <FormattedMessage
            id={edit ? 'editDocument' : 'addDocument'}
            defaultMessage={edit ? 'Edit Document' : 'Add Document'}
          />
        </Modal.Header>
        <Modal.Content>
          <Formik
            validationSchema={validationSchema}
            initialValues={popupValues ? popupValues : initialValues}
            validateOnChange={true}
            validateOnBlur={false}
            enableReinitialize
            onSubmit={async (values, { setSubmitting }) => {
              let payload = {
                customName: values.customName,
                description: values.description,
                expirationDate:
                  values.expirationDate &&
                  getSafe(() => encodeURIComponent(getStringISODate(values.expirationDate)), null),
                isTemporary: getSafe(() => values.isTemporary, false),
                issuedAt: values.issuedAt && getSafe(() => encodeURIComponent(getStringISODate(values.issuedAt)), null),
                issuer: values.issuer,
                othersPermissions: values.othersPermissions,
                sharedTo: values.sharedTo
              }

              removeEmpty(payload)

              try {
                if (edit) {
                  await updateAttachment(values.id, { ...payload, type: values.documentType.id })
                } else {
                  await addAttachment(values.file, values.documentType.id, payload)
                }
              } catch (e) {
                console.error(e)
              } finally {
                setSubmitting(false)
                if (enableClose) closePopup()
                onClose()
              }
            }}
            render={({ values, errors, submitForm, setFieldValue, isSubmitting }) => {
              this.submitForm = submitForm
              this.values = values
              this.setFieldValue = setFieldValue
              return (
                <Form loading={isSubmitting}>
                  <FormGroup widths='equal'>
                    <Input
                      name='customName'
                      label={
                        <FormattedMessage id='global.customName' defaultMessage='Custom Name'>
                          {text => text}
                        </FormattedMessage>
                      }
                    />
                    <Input
                      name='description'
                      label={
                        <FormattedMessage id='global.description' defaultMessage='Description'>
                          {text => text}
                        </FormattedMessage>
                      }
                    />
                  </FormGroup>

                  <FormGroup widths='equal'>
                    <DateInput
                      name='issuedAt'
                      label={
                        <FormattedMessage id='global.issuedDate' defaultMessage='Issued Date'>
                          {text => text}
                        </FormattedMessage>
                      }
                      inputProps={{
                        clearable: true
                      }}
                    />
                    <Input
                      name='issuer'
                      label={
                        <FormattedMessage id='global.issuer' defaultMessage='Issuer'>
                          {text => text}
                        </FormattedMessage>
                      }
                    />
                  </FormGroup>

                  <FormGroup widths='equal'>
                    <DateInput
                      name='expirationDate'
                      label={
                        <FormattedMessage id='global.expDate' defaultMessage='Expiration Date'>
                          {text => text}
                        </FormattedMessage>
                      }
                      inputProps={{
                        clearable: true
                      }}
                    />

                    <Dropdown
                      name='othersPermissions'
                      inputProps={{
                        clearable: true
                      }}
                      label={
                        <FormattedMessage id='global.othersPermissions' defaultMessage='Others Permissions'>
                          {text => text}
                        </FormattedMessage>
                      }
                      options={otherPermissions.map((perm, i) => ({
                        id: i,
                        text: perm.text,
                        value: perm.value
                      }))}
                    />
                    <Dropdown
                      name='sharedTo'
                      inputProps={{
                        clearable: true
                      }}
                      label={
                        <FormattedMessage id='global.sharedTo' defaultMessage='Shared To'>
                          {text => text}
                        </FormattedMessage>
                      }
                      options={sharedTo.map((s, i) => ({
                        id: i,
                        text: s.text,
                        value: s.value
                      }))}
                    />
                  </FormGroup>

                  <FormGroup widths='equal'>
                    {!values.id && (
                      <FileInput
                        fileName={getSafe(() => values.file.name, '')}
                        setFieldValue={setFieldValue}
                        errorMessage={errorMessages.requiredMessage}
                        errors={errors}
                        required={true}
                      />
                    )}
                    <Dropdown
                      inputProps={{ loading: documentTypesLoading, disabled: lockedFileType }}
                      name='documentType.id'
                      label={
                        <>
                          <FormattedMessage id='global.docType' defaultMessage='Document Type'>
                            {text => text}
                          </FormattedMessage>
                          <Required />
                        </>
                      }
                      options={documentTypes}
                    />
                  </FormGroup>

                  {false && (
                    <RightAlignedGroup widths='equal'>
                      <Checkbox
                        name='isTemporary'
                        label={formatMessage({ id: 'global.isTemporary', defaultMessage: 'Temporary' })}
                      />
                    </RightAlignedGroup>
                  )}
                  <ErrorFocus />
                </Form>
              )
            }}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            onClick={() => {
              if (enableClose) closePopup()
              onClose()
            }}>
            <FormattedMessage id='global.close' defaultMessage='Close'>
              {text => text}
            </FormattedMessage>
          </Button>

          <Button primary onClick={() => this.submitForm()}>
            <FormattedMessage id='global.save' defaultMessage='Save'>
              {text => text}
            </FormattedMessage>
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

DocumentPopup.propTypes = {
  onClose: func,
  lockedFileType: bool,
  initialFileType: number
}

DocumentPopup.defaultProps = {
  onClose: () => {},
  lockedFileType: false,
  initialFileType: null
}

const mapStateToProps = ({ globalData, simpleAdd, settings }) => {
  const currentTab = Router && Router.router && Router.router.pathname ? Router.router.pathname : ''
  const documentTab = currentTab && currentTab.type === '/settings/documents'

  return {
    popupValues: documentTab ? settings.popupValues : null,
    documentTypes: globalData.documentTypesDropdown,
    documentTypesLoading: globalData.documentTypesLoading,
    edit: documentTab && getSafe(() => settings.popupValues.id, false),
    enableClose: documentTab
  }
}

const mapDispatchToProps = {
  closePopup,
  getDocumentTypes,
  addAttachment,
  updateAttachment
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DocumentPopup))
