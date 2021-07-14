import { createRef, Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import ReactDropzone from 'react-dropzone'
import { withToastManager } from 'react-toast-notifications'
import { FieldArray } from 'formik'
//Components
import File from '../../../../components/File/File'
// Services
import { generateToastMarkup, getSafe } from '../../../../utils/functions'
import { renderDuplicateFilesModal, removeFile, onPreviewDrop, onDropRejected } from './UploadAttachment.services'
//Actions
import { getDocumentTypes } from '../../../global-data/actions'
// Styles
import { DivUpload } from './UploadAttachment.styles'

/**
 * UploadAttachment Component
 * @category Inventory - Upload
 * @components
 */
const UploadAttachment = props => {
  const reactDropzoneRef = createRef()
  const [state, setState] = useState({
    files: [],
    duplicateFiles: []
  })

  useEffect(() => {
    const { listDocumentTypes, getDocumentTypes } = props
    if (!listDocumentTypes || (listDocumentTypes && !listDocumentTypes.length)) {
      try {
        getDocumentTypes()
      } catch (e) {
        console.error(e)
      }
    }
    setState({
      ... state,
      files: props.fileIds
    })
    if (props.saveComponentRef && reactDropzoneRef && reactDropzoneRef.current) {
      props.saveComponentRef(reactDropzoneRef.current)
    }
  }, [])

  const { attachments, disabled, filesLimit, toastManager, hideAttachments, noWrapperStyles } = props
  const hasFile = attachments && attachments.length !== 0

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
      {renderDuplicateFilesModal(props, state, setState)}
      <DivUpload className={'uploadAttachment ' + (hasFile ? ' has-file' : '') + (noWrapperStyles ? ' no-styles' : '')}>
        {props.header}
        {disabled ? (
          <span className='file-space'>
            <FieldArray
              name={props.name}
              render={arrayHelpers => (
                <>
                  {attachments && attachments.length
                    ? attachments.map((file, index) => (
                        <File
                          key={file.id}
                          onRemove={() => {
                            removeFile(file, props)
                            arrayHelpers.remove(index)
                          }}
                          disabled={true}
                          className='file lot'
                          name={file.name}
                          index={index}
                        />
                      ))
                    : ''}
                </>
              )}
            />
          </span>
        ) : (
          <Fragment>
            {!hasFile || props.uploadedContent ? (
              <ReactDropzone
                accept={props.acceptFiles}
                ref={reactDropzoneRef}
                className={hasFile ? 'dropzoneLotHasFile' : 'dropzoneLot'}
                activeClassName='active'
                onDrop={acceptedFiles => {
                  if (acceptedFiles.length) {
                    if (!filesLimit || acceptedFiles.length <= filesLimit) {
                      onPreviewDrop(acceptedFiles, props, state, setState)
                    } else {
                      toastManager.add(limitMsg, {
                        appearance: 'error'
                      })
                    }
                  }
                }}
                onDropRejected={blobs => onDropRejected(blobs, props)}>
                {hasFile ? props.uploadedContent : <div>{props.emptyContent}</div>}
              </ReactDropzone>
            ) : (
              ''
            )}
            {hasFile && !hideAttachments && (
              <span className='file-space'>
                <FieldArray
                  name={props.name}
                  render={arrayHelpers => (
                    <>
                      {attachments && attachments.length
                        ? attachments.map((file, index) => (
                            <File
                              key={file.id}
                              onRemove={() => {
                                removeFile(file, props)
                                arrayHelpers.remove(index)
                              }}
                              className='file lot'
                              name={file.name ? file.name : props.name}
                              index={index}
                            />
                          ))
                        : ''}
                    </>
                  )}
                />
              </span>
            )}
          </Fragment>
        )}
      </DivUpload>
    </>
  )
}

UploadAttachment.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  files: PropTypes.array,
  type: PropTypes.string,
  uploadClass: PropTypes.string,
  uploadedClass: PropTypes.string,
  acceptFiles: PropTypes.string,
  listDocumentTypes: PropTypes.array,
  noWrapperStyles: PropTypes.bool
}

UploadAttachment.defaultProps = {
  className: '',
  content: '',
  files: [],
  type: '',
  uploadClass: '',
  uploadedClass: '',
  acceptFiles: '',
  listDocumentTypes: [],
  noWrapperStyles: false
}

const mapStateToProps = state => ({
  listDocumentTypes: state.globalData.documentTypesDropdown
})

export default withToastManager(connect(mapStateToProps, { getDocumentTypes })(UploadAttachment))
