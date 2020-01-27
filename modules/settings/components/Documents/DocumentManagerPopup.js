import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Modal, Button } from 'semantic-ui-react'
import { Input, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { Formik } from 'formik'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'
import styled from 'styled-components'
import moment from 'moment'
import { withToastManager } from 'react-toast-notifications'

import { FileInput, DateInput } from '~/components/custom-formik'

import { errorMessages, dateValidation } from '~/constants/yupValidation'
import { otherPermissions, sharedTo } from '~/constants/index'
import { getSafe, generateToastMarkup, removeEmpty } from '~/utils/functions'

import { closePopup } from '~/modules/settings/actions'
import { getDocumentTypes, addAttachment, updateAttachment } from '~/modules/inventory/actions'
import { func } from 'prop-types'
import { getStringISODate } from '~/components/date-format'
import Router from 'next/router'

const validationSchema = Yup.lazy(values => {
  let validationObject = {
    expirationDate: dateValidation(false),
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
  othersPermissions: '',
  sharedTo: '',
  file: '',
  documentType: {
    id: ''
  }
}

const RightAlignedGroup = styled(FormGroup)`
  text-align: right;
`

class DocumentPopup extends Component {
  async componentDidMount() {
    const { documentTypes, getDocumentTypes } = this.props
    if (documentTypes.length === 0) await getDocumentTypes()
  }

  render() {
    const {
      closePopup,
      popupValues,
      documentTypes,
      intl: { formatMessage },
      documentTypesFetching,
      edit,
      toastManager,
      addAttachment,
      updateAttachment,
      onClose,
      enableClose
    } = this.props

    return (
      <Modal closeIcon onClose={() => { if (enableClose) closePopup(); onClose()}} open>
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
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize
            onSubmit={async (values, { setSubmitting }) => {
              let payload = {
                customName: values.customName,
                description: values.description,
                expirationDate: values.expirationDate && getSafe(() => getStringISODate(values.expirationDate), null),
                isTemporary: getSafe(() => values.isTemporary, false),
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

                let status = edit ? 'notifications.documentEdited' : 'notifications.documentAdded'
                let name = edit ? values.name : values.file.name

                toastManager.add(
                  generateToastMarkup(
                    <FormattedMessage
                      id={`${status}.header`}
                      defaultMessage={edit ? 'Document Edited' : 'Document Added'}
                    />,
                    <FormattedMessage
                      id={`${status}.content`}
                      defaultMessage={`Document ${name} successfully ${edit ? 'edited' : 'added'}`}
                      values={{ name }}
                    />
                  ),
                  { appearance: 'success' }
                )
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
              return (
                <Form loading={isSubmitting}>
                  <FormGroup widths='equal'>
                    <Input name='customName' label='Custom Name' />
                    <Input name='description' label='Description' />
                  </FormGroup>

                  <FormGroup widths='equal'>
                    <DateInput
                      name='expirationDate'
                      label={
                        <FormattedMessage id='global.expDate' defaultMessage='Expiration Date'>
                          {text => text}
                        </FormattedMessage>
                      }
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
                      />
                    )}
                    <Dropdown
                      inputProps={{ loading: documentTypesFetching }}
                      loading={documentTypesFetching}
                      name='documentType.id'
                      label='Document Type'
                      options={documentTypes}
                    />
                  </FormGroup>

                  <RightAlignedGroup widths='equal'>
                    <Checkbox
                      name='isTemporary'
                      label={formatMessage({ id: 'global.isTemporary', defaultMessage: 'Temporary' })}
                    />
                  </RightAlignedGroup>
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
  onClose: func
}

DocumentPopup.defaultProps = {
  onClose: () => {}
}

const mapStateToProps = ({ simpleAdd, settings }) => {
  const currentTab = Router && Router.router && Router.router.query && Router.router.query.type
    ? settings.tabsNames.find(tab => tab.type === Router.router.query.type)
    : settings.tabsNames[0]
  const documentTab = currentTab.type === 'documents'

  return {
    popupValues: documentTab ? settings.popupValues : null,
    documentTypes: simpleAdd.listDocumentTypes,
    documentTypesFetching: simpleAdd.documentTypesFetching,
    edit: documentTab & getSafe(() => settings.popupValues.id, false),
    enableClose: documentTab
  }
}

const mapDispatchToProps = {
  closePopup,
  getDocumentTypes,
  addAttachment,
  updateAttachment
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(DocumentPopup)))
