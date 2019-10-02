import React, { Component } from 'react'
import './uploadLot.scss'
import upload from '~/src/images/upload/upload.png'
import uploaded from '~/src/images/upload/uploaded.png'
import PropTypes from 'prop-types'
import File from '~/src/pages/inventory/addInventory/components/Upload/components/File'
import ReactDropzone from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import { TOO_LARGE_FILE, UPLOAD_FILE_FAILED } from '~/src/modules/errors.js'
import { FieldArray } from 'formik'
import confirm from '~/src/components/Confirmable/confirm'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import styled from 'styled-components'
import { Table, TableCell, Modal, Button } from 'semantic-ui-react'

const StyledButton = styled(Button)`
  margin: 4px 4px 4px 4px !important;
`

class UploadLot extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: [],
      duplicateFiles: []
    }
  }

  componentDidMount() {
    this.setState({
      files: this.props.fileIds
    })
  }

  removeFile = (file) => {
    let poId = this.props.edit

    // delete attachment from database
    if (file.linked) {
      this.props.removeAttachmentLink(this.props.lot ? true : false, this.props.lot ? this.props.lot.id : poId, file.id).then(() => {
        this.props.removeAttachment(file.id)
      })
    } else {
      this.props.removeAttachment(file.id)
    }
  }

  onDropRejected = (blobs) => {
    let { fileMaxSize, toastManager } = this.props
    blobs.forEach(function (blob) {
      if (blob.size > (fileMaxSize * 1024 * 1024)) {
        toastManager.add(generateToastMarkup(
          <FormattedMessage id='errors.fileTooLarge.header' defaultMessage='Too large file' />,
          <FormattedMessage id='errors.fileTooLarge.content' values={{ name: blob.name, size: fileMaxSize }} defaultMessage='File is larger than maximal allowed size' />,
        ), {
          appearance: 'error'
        })
      }
    })
  }

  onUploadSuccess = (files) => {
    this.props.onChange(files)
  }

  onUploadFail = (fileName) => {
    let { fileMaxSize, toastManager } = this.props

    toastManager.add(generateToastMarkup(
      <FormattedMessage id='errors.fileNotUploaded.header' defaultMessage='File not uploaded' />,
      <FormattedMessage id='errors.fileNotUploaded.content' defaultMessage={`File ${fileName} was not uploaded due to an error`} values={{ name: fileName }} />
    ), {
      appearance: 'error'
    })
  }

  onPreviewDrop = async (files) => {
    let { loadFile, addAttachment, type, fileMaxSize, unspecifiedTypes, toastManager, expiration, listDocumentTypes } = this.props
    let { onDropRejected, onUploadSuccess, onUploadFail } = this
    let duplicateFiles = []

    if (typeof unspecifiedTypes === 'undefined')
      unspecifiedTypes = []
    if (unspecifiedTypes.indexOf(type) >= 0) {
      files = []
      toastManager.add(generateToastMarkup(
        <FormattedMessage id='errors.fileNotUploaded.header' defaultMessage='File not uploaded' />,
        <FormattedMessage id='errors.fileNotUploaded.specifyDocType' defaultMessage='You have to specify document type first' />
      ), {
        appearance: 'error'
      })
    }

    // add new files to attachments and save indexes of own files
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > fileMaxSize * 1024 * 1024) {
        // remove file
        onDropRejected([files[i]])
        files.splice(i, 1)
        i--
      }
    }

    // upload new files as temporary attachments
    if (loadFile && addAttachment) {
      (async function loop(j) {
        if (j < files.length) await new Promise((resolve, reject) => {
          loadFile(files[j]).then(file => {
            addAttachment(file.value, parseInt(type), expiration).then((aId) => {
              onUploadSuccess(aId.value.data)
              resolve()
            }).catch(e => {
              if (e.exceptionMessage) {
                const docType = listDocumentTypes.find(x => x.value === type)
                duplicateFiles.push({
                  id: parseInt(e.exceptionMessage),
                  name: files[j].name,
                  documentType: { id: docType.value, name: docType.text },
                  file: file,
                })
              }
              // ! ! onUploadFail(files[j].name)
              resolve()
            })
          }).catch(e => {
            onUploadFail(files[j].name)
            resolve()
          })
        }).then(loop.bind(null, j + 1))
      })(0).then(() => {
        this.setState({ duplicateFiles: duplicateFiles })
      })
    } else {
      onUploadSuccess(files)
    }
  }

  removeDuplicateFile = (index) => {
    let duplicateFiles = this.state.duplicateFiles.slice()
    duplicateFiles.splice(index, 1)
    this.setState({ duplicateFiles: duplicateFiles })
  }

  handleConfirmFile = async (index, att) => {
    let { addAttachment, type, expiration } = this.props

    await new Promise((resolve, reject) => {
      addAttachment(att.file.value, parseInt(type), { expiration, force: true }).then((a) => {
        this.onUploadSuccess(att)
        this.removeDuplicateFile(index)
        resolve()
      }).catch(e => {
        console.log('!!!! Error ', e);
        reject()
      })
    })
  }

  handleLinkFile = async (index, att) => {
    let { type, toastManager, lot } = this.props

    await new Promise((resolve, reject) => {
      this.onUploadSuccess(att)
      this.removeDuplicateFile(index)
      resolve()
    }).catch(e => {
      console.log('!!!! Error ', e);
      reject()
    })
  }

  handleCancelFile = (index) => {
    this.removeDuplicateFile(index)
  }

  renderDuplicateFilesModal = () => {
    return (
      this.state.duplicateFiles.length ?
        (<Modal closeIcon onClose={() => this.setState({ duplicateFiles: [] })} open centered={false} size='small'>
          <Modal.Header>
            <FormattedMessage id={'attachments.popup.header'}
              defaultMessage='Document Already Exists'>{(text) => text}
            </FormattedMessage>
          </Modal.Header>
          <Modal.Content>
            <div>
              <Table className='table-fields'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={5}>
                      <FormattedMessage id='attachments.popup.tableHeader1' defaultMessage='Document name' />
                    </Table.HeaderCell>
                    <Table.HeaderCell width={11}>
                      <FormattedMessage id='attachments.popup.tableHeader2' defaultMessage='Select action' />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.duplicateFiles.map((d, index) => {
                    return (
                      <Table.Row key={index}>
                        <TableCell>
                          {d.name}
                        </TableCell>
                        <TableCell>
                          <div style={{ 'text-align': 'center' }} >
                            <StyledButton type='button' data-test='attachments_duplicate_cancel_btn' onClick={() => this.handleCancelFile(index)}>
                              <FormattedMessage id={'attachments.popup.button.cancel'}
                                defaultMessage='Cancel'>{(text) => text}</FormattedMessage>
                            </StyledButton>
                            <StyledButton type='button' primary data-test='attachments_duplicate_confirm_btn' onClick={() => this.handleConfirmFile(index, d)}>
                              <FormattedMessage id={'attachments.popup.button.forceUpload'}
                                defaultMessage='Upload (duplicate)'>{(text) => text}</FormattedMessage>
                            </StyledButton>
                            <StyledButton type='button' primary data-test='attachments_duplicate_link_btn' onClick={() => this.handleLinkFile(index, d)}>
                              <FormattedMessage id={'attachments.popup.button.linkFile'}
                                defaultMessage='Link to existing'>{(text) => text}</FormattedMessage>
                            </StyledButton>
                          </div>
                        </TableCell>
                      </Table.Row>
                    )
                  }
                  )}
                </Table.Body>
              </Table>
            </div>
            <Button type='button' data-test='attachments_duplicate_cancel_all_btn' floated='right' style={{ margin: '20px 0px 20px 10px' }} onClick={() => this.setState({ duplicateFiles: [] })}>
              <FormattedMessage id={'attachments.popup.button.cancel'}
                defaultMessage='Cancel'>{(text) => text}</FormattedMessage>
            </Button>
          </Modal.Content>

        </Modal>
        )
        :
        null
    )
  }

  render() {
    let { attachments, disabled, filesLimit, toastManager } = this.props
    let hasFile = this.props.attachments && this.props.attachments.length !== 0

    const limitMsg = generateToastMarkup(
      <FormattedMessage id='errors.fileNotUploaded.limitExceeded.header' defaultMessage='File limit exceeded' />,
      <FormattedMessage id='errors.fileNotUploaded.limitExceeded.content' values={{ count: filesLimit }} defaultMessage={`You can't upload more than ${filesLimit} document(s)`} />
    )

    return (
      <>
        {this.renderDuplicateFilesModal()}
        <div className={'uploadLot ' + (hasFile ? ' has-file' : '')}>
          {this.props.header}
          {disabled ? (
            <span className='file-space'>
              <FieldArray name={this.props.name}
                render={arrayHelpers => (
                  <>
                    {attachments && attachments.length ? attachments.map((file, index) => (
                      <File key={file.id} onRemove={() => {
                        this.removeFile(file)
                        arrayHelpers.remove(index)
                      }} disabled={true} className='file lot' name={file.name} index={index} />
                    )) : ''}
                  </>
                )}
              />
            </span>
          ) : (hasFile ?
            <React.Fragment>
              {this.props.uploadedContent ? (
                <ReactDropzone className='dropzoneLotHasFile'
                  activeClassName='active'
                  onDrop={acceptedFiles => {
                    if (acceptedFiles.length) {
                      if (!filesLimit || acceptedFiles.length <= filesLimit) {
                        this.onPreviewDrop(acceptedFiles)
                      } else {
                        toastManager.add(limitMsg, {
                          appearance: 'error'
                        })

                        return
                      }
                    } else {
                      return
                    }
                  }}
                  onDropRejected={this.onDropRejected}
                >
                  {this.props.uploadedContent}
                </ReactDropzone>
              ) : ''}
              <span className='file-space'>
                <FieldArray name={this.props.name}
                  render={arrayHelpers => (
                    <>
                      {attachments && attachments.length ? attachments.map((file, index) => (
                        <File key={file.id} onRemove={() => {
                          this.removeFile(file)
                          arrayHelpers.remove(index)
                        }} className='file lot' name={file.name ? file.name : this.props.name} index={index} />
                      )) : ''}
                    </>
                  )} />
              </span>
            </React.Fragment>
            :
            <ReactDropzone className='dropzoneLot'
              activeClassName='active'
              onDrop={acceptedFiles => {
                if (acceptedFiles.length) {
                  if (!filesLimit || acceptedFiles.length <= filesLimit) {
                    this.onPreviewDrop(acceptedFiles)
                  } else {
                    toastManager.add(limitMsg, {
                      appearance: 'error',
                    })

                    return
                  }
                } else {
                  return
                }
              }}
            >
              <div>
                {this.props.emptyContent}
              </div>
            </ReactDropzone>
            )}
        </div>
      </>
    )
  }
}

UploadLot.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  files: PropTypes.array,
  type: PropTypes.string,
  uploadClass: PropTypes.string,
  uploadedClass: PropTypes.string
}

export default withToastManager(UploadLot)