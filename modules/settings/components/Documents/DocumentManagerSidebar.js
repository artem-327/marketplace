import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Modal, Button, Dimmer, Loader, Segment, FormField } from 'semantic-ui-react'
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

import { closeSidebar } from '~/modules/settings/actions'
import { getDocumentTypes, addAttachment, updateAttachment } from '~/modules/inventory/actions'
import { bool, func, number } from 'prop-types'
import { getStringISODate } from '~/components/date-format'
import Router from 'next/router'
import { Required } from '~/components/constants/layout'
import ErrorFocus from '~/components/error-focus'
import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'
import { FlexSidebar, HighSegment, FlexContent } from '~/modules/inventory/constants/layout'
import { UploadCloud } from 'react-feather'
import get from 'lodash/get'

export const CustomA = styled.a`
  font-weight: bold;
  color: #2599d5;
`

export const CustomDiv = styled.div`
  padding: 1em;
`

const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
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

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    color: #848893;
    margin: 0 5px;
    align-items: center;

    &.light {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;
      &:hover {
        background-color: #f8f9fb;
        color: #20273a;
      }
      &:active {
        background-color: #edeef2;
        color: #20273a;
      }
    }
    &.secondary {
      color: #ffffff;
      background-color: #2599d5;
      &:hover {
        background-color: #188ec9;
      }
      &:active {
        background-color: #0d82bc;
      }
    }
  }

  .field {
    .ui.checkbox {
      margin-bottom: 9px;
      label {
        color: #848893;
      }
      &.checked {
        label {
          color: #20273a;
        }
      }
    }
  }
`

const BottomButtons = styled.div`
  text-align: right;
  z-index: 1;
  padding: 10px 25px;
  margin-top: 0px;
  box-shadow: 0px -2px 3px rgba(70, 70, 70, 0.15);
  color: #ffffff;
`

const CustomHighSegment = styled(HighSegment)`
  margin: 0 !important;
  padding: 16px 30px !important;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6 !important;
  background-color: #ffffff;
  z-index: 1;
`

const CustomSegmentContent = styled(Segment)`
  padding-top: 0px !important;
`

const validationSchema = Yup.lazy(values => {
  let validationObject = {
    expirationDate: dateValidation(false),
    issuedAt: values.issuedAt && dateBefore('issuedAt', 'expirationDate'),
    documentType: Yup.object().shape({
      id: Yup.string().required(errorMessages.requiredMessage)
    })
  }

  if (!values.id) var conditionalValidations = { files: Yup.array().required(errorMessages.requiredMessage) }
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
  files: ''
}

const RightAlignedGroup = styled(FormGroup)`
  text-align: right;
`

class DocumentManagerSidebar extends Component {
  async componentDidMount() {
    const { documentTypes, getDocumentTypes, initialFileType } = this.props
    if (documentTypes.length === 0) await getDocumentTypes()
    if (initialFileType !== null) this.setFieldValue('documentType.id', initialFileType)
  }

  render() {
    const {
      closeSidebar,
      popupValues,
      documentTypes,
      intl: { formatMessage },
      documentTypesFetching,
      edit,
      addAttachment,
      updateAttachment,
      onClose,
      enableClose,
      lockedFileType
    } = this.props

    return (
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
            expirationDate:
              values.expirationDate && getSafe(() => encodeURIComponent(getStringISODate(values.expirationDate)), null),
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
              values.files.forEach(async file => {
                await addAttachment(file, values.documentType.id, payload)
              })
            }
          } catch (e) {
            console.error(e)
          } finally {
            setSubmitting(false)
            if (enableClose) closeSidebar()
            onClose()
          }
        }}
        render={({ values, errors, submitForm, setFieldValue, isSubmitting }) => {
          this.submitForm = submitForm
          this.values = values
          this.setFieldValue = setFieldValue

          const errorFiles = get(errors, 'files', null)

          return (
            <CustomForm autoComplete='off'>
              <FlexSidebar
                visible={true}
                width='very wide'
                style={{ width: '630px' }}
                direction='right'
                animation='overlay'>
                <div>
                  <Dimmer inverted active={isSubmitting}>
                    <Loader />
                  </Dimmer>
                  <CustomHighSegment basic>
                    {popupValues ? (
                      <FormattedMessage id='settings.documents.editDocument' defaultMessage='Edit Document' />
                    ) : (
                      <FormattedMessage id='settings.documents.addDocument' defaultMessage='Add Document' />
                    )}
                  </CustomHighSegment>
                </div>
                <FlexContent style={{ padding: '16px' }}>
                  <CustomSegmentContent basic>
                    <FormGroup widths='equal'>
                      <Dropdown
                        inputProps={{
                          loading: documentTypesFetching,
                          disabled: lockedFileType,
                          placeholder: formatMessage({
                            id: 'settings.documents.selectDocumentType',
                            defaultMessage: 'Select document type'
                          })
                        }}
                        loading={documentTypesFetching}
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
                      <Input
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'settings.documents.enterDocumentName',
                            defaultMessage: 'Enter document name'
                          })
                        }}
                        name='customName'
                        label={
                          <FormattedMessage id='global.docName' defaultMessage='Document Name'>
                            {text => text}
                          </FormattedMessage>
                        }
                      />
                    </FormGroup>

                    <FormGroup widths='equal'>
                      <Input
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'settings.documents.fileDescription',
                            defaultMessage: 'File description'
                          })
                        }}
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
                          maxDate: moment(),
                          clearable: true
                        }}
                      />
                      <Input
                        inputProps={{
                          placeholder: formatMessage({
                            id: 'settings.documents.enterIssuerName',
                            defaultMessage: 'Enter issuer name'
                          })
                        }}
                        name='issuer'
                        label={
                          <FormattedMessage id='global.issuer' defaultMessage='Issuer'>
                            {text => text}
                          </FormattedMessage>
                        }
                      />
                      {false && (
                        <FormField style={{ textAlign: 'right' }}>
                          <div style={{ paddingTop: '40px' }}>
                            <Checkbox
                              name='isTemporary'
                              label={formatMessage({ id: 'global.isTemporary', defaultMessage: 'Temporary' })}
                            />
                          </div>
                        </FormField>
                      )}
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
                      <FormField></FormField>
                    </FormGroup>

                    <FormGroup widths='equal'>
                      <Dropdown
                        name='othersPermissions'
                        inputProps={{
                          clearable: true,
                          placeholder: formatMessage({
                            id: 'settings.documents.selectPermission',
                            defaultMessage: 'Select permission'
                          })
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
                          clearable: true,
                          placeholder: formatMessage({
                            id: 'settings.documents.selectSharingOption',
                            defaultMessage: 'Select sharing option'
                          })
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

                    {!values.id && (
                      <FormGroup widths='equal' style={{ marginTop: '20px' }}>
                        <FormField>
                          <div style={!!errorFiles ? { border: '1px solid #9f3a38', margin: '-1px' } : null}>
                            <UploadAttachment
                              name='files'
                              attachments={values.files}
                              type={'' + values.documentType.id}
                              fileMaxSize={20}
                              onChange={files => {
                                if (files.length) {
                                  setFieldValue('files', files)
                                }
                              }}
                              removeAttachment={() => {}}
                              data-test='settings_add_document_drop'
                              emptyContent={
                                <CustomDiv>
                                  <div>
                                    <UploadCloud size='40' color='#dee2e6' />
                                  </div>

                                  {formatMessage({ id: 'addInventory.dragDrop' })}
                                  <br />

                                  <FormattedMessage
                                    id='addInventory.dragDropOr'
                                    defaultMessage={'or {link} to select from computer'}
                                    values={{
                                      link: (
                                        <CustomA>
                                          <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                        </CustomA>
                                      )
                                    }}
                                  />
                                </CustomDiv>
                              }
                              uploadedContent={
                                <CustomDiv>
                                  <div>
                                    <UploadCloud size='40' color='#dee2e6' />
                                  </div>
                                  <FormattedMessage
                                    id='addInventory.dragDrop'
                                    defaultMessage={'Drag and drop to add file here'}
                                  />
                                  <br />
                                  <FormattedMessage
                                    id='addInventory.dragDropOr'
                                    defaultMessage={'or {link} to select from computer'}
                                    values={{
                                      link: (
                                        <CustomA>
                                          <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                        </CustomA>
                                      )
                                    }}
                                  />
                                </CustomDiv>
                              }
                            />
                          </div>
                          {errorFiles && <div className='sui-error-message'>{errorFiles}</div>}
                        </FormField>
                      </FormGroup>
                    )}
                  </CustomSegmentContent>
                </FlexContent>
                <BottomButtons>
                  <Button
                    basic
                    onClick={() => {
                      if (enableClose) closeSidebar()
                      onClose()
                    }}
                    data-test='settings_documents_sidebar_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                  <Button secondary onClick={() => this.submitForm()} data-test='settings_documents_sidebar_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </BottomButtons>
              </FlexSidebar>
              <ErrorFocus />
            </CustomForm>
          )
        }}
      />
    )
  }
}

DocumentManagerSidebar.propTypes = {
  onClose: func,
  lockedFileType: bool,
  initialFileType: number
}

DocumentManagerSidebar.defaultProps = {
  onClose: () => {},
  lockedFileType: false,
  initialFileType: null
}

const mapStateToProps = ({ simpleAdd, settings }) => {
  const currentTab = Router && Router.router && Router.router.pathname ? Router.router.pathname : ''
  const documentTab = currentTab === '/settings/documents'

  return {
    popupValues: documentTab ? settings.popupValues : null,
    documentTypes: simpleAdd.listDocumentTypes,
    documentTypesFetching: simpleAdd.documentTypesFetching,
    edit: documentTab && getSafe(() => settings.popupValues.id, false),
    enableClose: documentTab
  }
}

const mapDispatchToProps = {
  closeSidebar,
  getDocumentTypes,
  addAttachment,
  updateAttachment
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DocumentManagerSidebar))
