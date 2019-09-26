import React, { Component } from 'react'
import './uploadVerifyFiles.scss'
import PropTypes from 'prop-types'
import File from '~/src/pages/inventory/addInventory/components/Upload/components/File'
import ReactDropzone from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import { TOO_LARGE_FILE, UPLOAD_FILE_FAILED } from '~/src/modules/errors.js'
import { FieldArray } from 'formik'
import { loadFile, addVerificationDocument } from "../../actions";

import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'
import styled from 'styled-components'
import { Table, TableCell, Modal, Button } from 'semantic-ui-react'


class UploadVerifyFiles extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: [],
    }
  }

  onDropRejected = (blobs) => {
    let { fileMaxSize, toastManager } = this.props
    console.log('!!!!!!! onDropRejected - blob', blob)
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

  onUploadSuccess = (file) => {
    this.props.onChange(file)
  }

  onUploadFail = (fileName, error) => {
    let { fileMaxSize, toastManager } = this.props
    toastManager.add(generateToastMarkup(
      <FormattedMessage id='errors.fileNotUploaded.header' defaultMessage='File not uploaded' />,
      <FormattedMessage id='errors.fileNotUploaded.content' defaultMessage={`File ${fileName} was not uploaded due to an error`} values={{ name: fileName }} />
    ), {
      appearance: 'error'
    })
  }

  onPreviewDrop = async (files) => {
    let { type, fileMaxSize, unspecifiedTypes, toastManager } = this.props
    let { onDropRejected, onUploadSuccess, onUploadFail } = this

    console.log('!!!!!! onPreviewDrop files', files);


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
      return
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

    console.log('!!!!!! onPreviewDrop loadFile', loadFile);


    // upload new files as temporary attachments
    if (loadFile && addVerificationDocument) {

      console.log('!!!!!! loadFile && addVerificationDocument');

      (async function loop(j) {
        if (j < files.length) await new Promise((resolve, reject) => {
          loadFile(files[j]).then(file => {
            console.log('!!!!!! onPreviewDrop loadFile ok', file);


            addVerificationDocument(file.value, parseInt(type)).then((aId) => {
              console.log('!!!!!! onPreviewDrop addVerificationDocument ok', aId);

              onUploadSuccess(aId.value.data)

              resolve()
            }).catch(e => {
              if (e.exceptionMessage) {


              }
              onUploadFail(files[j].name, e)
              resolve()
            })


          }).catch(e => {
            onUploadFail(files[j].name, e)
            resolve()
          })


        }).then(loop.bind(null, j + 1))
      })(0).then(() => {
      })


    } else {
      //! ! ??? onUploadSuccess(files)
    }
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
        <div className={'uploadVerifyFiles ' + (hasFile ? ' has-file' : '')}>
          {this.props.header}
          {disabled ? (
            <span className='file-space'>
              <FieldArray name={this.props.name}
                          render={arrayHelpers => (
                            <>
                              {attachments && attachments.length ? attachments.map((file, index) => (
                                <File key={file.id} disabled={true} className='file lot' name={file.name} index={index} />
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
                             onDropRejected={this.onDropRejected}
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

UploadVerifyFiles.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  files: PropTypes.array,
  type: PropTypes.string,
  uploadClass: PropTypes.string,
  uploadedClass: PropTypes.string
}

export default withToastManager(UploadVerifyFiles)