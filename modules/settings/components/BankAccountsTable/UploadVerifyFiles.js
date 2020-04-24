import React, { Component } from 'react'
import './uploadVerifyFiles.scss'
import PropTypes from 'prop-types'
import ReactDropzone from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import { TOO_LARGE_FILE, UPLOAD_FILE_FAILED } from '~/src/modules/errors.js'
import { FieldArray } from 'formik'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import { Popup, Icon } from 'semantic-ui-react'

class UploadVerifyFiles extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: []
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.attachments.length !== this.props.attachments.length) {
      this.onPreviewDrop(nextProps.attachments)
    }
  }

  onDropRejected = blobs => {
    let { fileMaxSize, toastManager } = this.props
    blobs.forEach(function (blob) {
      if (blob.size > fileMaxSize * 1024 * 1024) {
        toastManager.add(
          generateToastMarkup(
            <FormattedMessage id='errors.fileTooLarge.header' defaultMessage='Too large file' />,
            <FormattedMessage
              id='errors.fileTooLarge.content'
              values={{ name: blob.name, size: fileMaxSize }}
              defaultMessage='File is larger than maximal allowed size'
            />
          ),
          {
            appearance: 'error'
          }
        )
      }
    })
  }

  onUploadSuccess = file => {
    this.props.onChange(file)
  }

  onPreviewDrop = async files => {
    let {
      type,
      attachments,
      fileMaxSize,
      unspecifiedTypes,
      toastManager,
      loadFile,
      addVerificationDocument
    } = this.props
    let { onDropRejected, onUploadSuccess } = this

    if (typeof unspecifiedTypes === 'undefined') unspecifiedTypes = []
    if (unspecifiedTypes.indexOf(type) >= 0) {
      files = []
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id='errors.fileNotUploaded.header' defaultMessage='File not uploaded' />,
          <FormattedMessage
            id='errors.fileNotUploaded.specifyDocType'
            defaultMessage='You have to specify document type first'
          />
        ),
        {
          appearance: 'error'
        }
      )
      return
    }

    // add new files to attachments and save indexes of own files
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > fileMaxSize * 1024 * 1024) {
        // file too big - remove file
        onDropRejected([files[i]])
        files.splice(i, 1)
        i--
      } else if (attachments.findIndex(att => att.name === files[i].name) >= 0) {
        // file already in attachments - remove file
        toastManager.add(
          generateToastMarkup(
            <FormattedMessage
              id='errors.fileNotUploaded.alreadyAttached.header'
              defaultMessage='File already uploaded'
            />,
            <FormattedMessage
              id='errors.fileNotUploaded.alreadyAttached.content'
              values={{ name: files[i].name }}
              defaultMessage={`File '${files[i].name}' already in attachments.`}
            />
          ),
          {
            appearance: 'error'
          }
        )
        files.splice(i, 1)
        i--
      }
    }

    // upload new files as temporary attachments
    if (loadFile && addVerificationDocument) {
      ;(async function loop(j) {
        if (j < files.length)
          await new Promise((resolve, reject) => {
            loadFile(files[j])
              .then(file => {
                addVerificationDocument(file.value, type)
                  .then(aId => {
                    onUploadSuccess({
                      name: file.value.name,
                      id: aId.value.data.id,
                      type: type
                    })
                    resolve()
                  })
                  .catch(e => {
                    resolve()
                  })
              })
              .catch(e => {
                resolve()
              })
          }).then(loop.bind(null, j + 1))
      })(0).then(() => {})
    }
  }

  renderFiles = (attachments, disabled) => {
    return (
      <FieldArray
        name={this.props.name}
        render={arrayHelpers => {
          return (
            <>
              {attachments && attachments.length
                ? attachments.map((file, index) => (
                    <Popup
                      wide='very'
                      data-test='array_to_multiple_list'
                      content={getSafe(() => file.type, '')}
                      trigger={
                        <span key={index} className='file lot' style={{ opacity: disabled ? '0.45' : '1' }}>
                          <Icon name='file image outline' size='large' />
                          {file.name}
                        </span>
                      }
                    />
                  ))
                : ''}
            </>
          )
        }}
      />
    )
  }

  render() {
    let { attachments, disabled, filesLimit, toastManager, accept } = this.props
    let hasFile = this.props.attachments && this.props.attachments.length !== 0

    const limitMsg = generateToastMarkup(
      <FormattedMessage id='errors.fileNotUploaded.limitExceeded.header' defaultMessage='File limit exceeded' />,
      <FormattedMessage
        id='errors.fileNotUploaded.limitExceeded.content'
        values={{ count: filesLimit }}
        defaultMessage={`You can't upload more than ${filesLimit} document(s)`}
      />
    )

    return (
      <>
        <div className={'uploadVerifyFiles ' + (hasFile ? ' has-file' : '')}>
          {this.props.header}
          {disabled ? (
            <span className='file-space'>{this.renderFiles(attachments, disabled)}</span>
          ) : hasFile ? (
            <React.Fragment>
              {this.props.uploadedContent ? (
                <ReactDropzone
                  className='dropzoneLotHasFile'
                  activeClassName='active'
                  accept={accept}
                  onDrop={acceptedFiles => {
                    if (acceptedFiles.length) {
                      if (!filesLimit || acceptedFiles.length <= filesLimit) {
                        this.onPreviewDrop(acceptedFiles)
                      } else {
                        toastManager.add(limitMsg, {
                          appearance: 'error'
                        })
                      }
                    }
                  }}
                  onDropRejected={this.onDropRejected}>
                  {this.props.uploadedContent}
                </ReactDropzone>
              ) : (
                ''
              )}
              <span className='file-space'>{this.renderFiles(attachments, disabled)}</span>
            </React.Fragment>
          ) : (
            <ReactDropzone
              className='dropzoneLot'
              activeClassName='active'
              accept={accept}
              onDrop={acceptedFiles => {
                if (acceptedFiles.length) {
                  if (!filesLimit || acceptedFiles.length <= filesLimit) {
                    this.onPreviewDrop(acceptedFiles)
                  } else {
                    toastManager.add(limitMsg, {
                      appearance: 'error'
                    })
                  }
                }
              }}
              onDropRejected={this.onDropRejected}>
              <div>{this.props.emptyContent}</div>
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
  uploadedClass: PropTypes.string,
  accept: PropTypes.string,
  attachments: PropTypes.array
}

UploadVerifyFiles.defaultProps = {
  accept: 'image/jpeg, image/png' //, application/pdf
}

export default withToastManager(UploadVerifyFiles)
