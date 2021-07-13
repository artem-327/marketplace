import { Table, TableCell, Modal, Button } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
// Services
import { generateToastMarkup } from '../../../../utils/functions'
// Styles
import { StyledButton } from './UploadAttachment.styles'

/**
 * Remove File in UploadAttachment
 * @category Inventory - Upload
 * @method
 */
export const removeFile = (file, props) => {
    let poId = props.edit
    // delete attachment from database
    if (file.isLinkedFromDocumentManager) {
        props.onRemoveFile(file.id)
    } else if (file.linked) {
        if (file.isToOrderItem) {
            props.removeOrderItem(file)
        } else {
            props
            .removeAttachmentLink(props.lot ? true : false, props.lot ? props.lot.id : poId, file.id)
            .then(() => {
                props.removeAttachment(file.id || file.lastModified)
                if (props.onRemoveFile) props.onRemoveFile(file.id)
            })
        }
    } else {
        props.removeAttachment(file.id || file.lastModified)
        if (props.onRemoveFile) props.onRemoveFile(file.id)
    }
}

/**
 * On Drop Rejected in UploadAttachment
 * @category Inventory - Upload
 * @method
 */
export const onDropRejected = (blobs, props) => {
    let { fileMaxSize, toastManager } = props
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

const onUploadSuccess = (files, props) => {
    props.onChange(files)
}

const onUploadFail = (fileName, props) => {
    let { fileMaxSize, toastManager } = props

    toastManager.add(
        generateToastMarkup(
            <FormattedMessage id='errors.fileNotUploaded.header' defaultMessage='File not uploaded' />,
            <FormattedMessage
            id='errors.fileNotUploaded.content'
            defaultMessage={`File ${fileName} was not uploaded due to an error`}
            values={{ name: fileName }}
            />
        ),
        {
            appearance: 'error'
        }
    )
}

/**
 * On Preview Drop in UploadAttachment
 * @category Inventory - Upload
 * @method
 */
export const onPreviewDrop = async (files, props, state, setState) => {
    let {
        loadFile,
        addAttachment,
        type,
        fileMaxSize,
        unspecifiedTypes,
        toastManager,
        expiration,
        listDocumentTypes
    } = props
    let duplicateFiles = []

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
    }

    // add new files to attachments and save indexes of own files
    for (let i = 0; i < files.length; i++) {
        if (files[i].size > fileMaxSize * 1024 * 1024) {
            // remove file
            onDropRejected([files[i]], props)
            files.splice(i, 1)
            i--
        }
    }

    // upload new files as temporary attachments
    if (loadFile && addAttachment) {
        ;(async function loop(j) {
            if (j < files.length)
            await new Promise((resolve, reject) => {
                loadFile(files[j])
                .then(file => {
                    addAttachment(file.value, parseInt(type), expiration)
                    .then(aId => {
                        onUploadSuccess(aId.value.data, props)
                        resolve()
                    })
                    .catch(e => {
                        if (e.response.data.clientMessage) {
                        const docType = listDocumentTypes.find(x => x.value === parseInt(type))
                        if (docType) {
                            duplicateFiles.push({
                            id: parseInt(e.response.data.exceptionMessage),
                            name: files[j].name,
                            documentType: {id: docType.value, name: docType.text},
                            file: file
                            })
                        }
                        }
                        resolve()
                    })
                })
                .catch(e => {
                    onUploadFail(files[j].name, props)
                    resolve()
                })
            }).then(loop.bind(null, j + 1))
        })(0).then(() => {
            setState({ ...state, duplicateFiles: duplicateFiles })
        })
    } else {
        onUploadSuccess(files, props)
    }
}

const removeDuplicateFile = (index, state, setState) => {
    let duplicateFiles = state.duplicateFiles.slice()
    duplicateFiles.splice(index, 1)
    setState({ ...state, duplicateFiles: duplicateFiles })
}

const handleConfirmFile = async (index, att, props, state, setState) => {
    let { addAttachment, type, expiration } = props
    await new Promise((resolve, reject) => {
        addAttachment(att.file.value, parseInt(type), { expiration, force: true })
        .then(a => {
            onUploadSuccess(a.value.data, props)
            removeDuplicateFile(index, state, setState)
            resolve()
        })
        .catch(e => {
            reject()
        })
    })
}

const handleLinkFile = async (index, att, props, state, setState) => {
    let { type, toastManager, lot } = props

    await new Promise((resolve, reject) => {
        onUploadSuccess({ ...att, isLinkedFromDocumentManager: true }, props)
        removeDuplicateFile(index, state, setState)
        resolve()
    })
}

const handleCancelFile = (index, state, setState) => {
    removeDuplicateFile(index, state, setState)
}

/**
 * Render Duplicated Files Modal in UploadAttachment
 * @category Inventory - Upload
 * @method
 */
export const renderDuplicateFilesModal = (props, state, setState) => {
    return state.duplicateFiles.length ? (
        <Modal closeIcon onClose={() => setState({ ...state, duplicateFiles: [] })} open centered={false} size='small'>
            <Modal.Header>
            <FormattedMessage id={'attachments.popup.header'} defaultMessage='Document Already Exists' />
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
                    {state.duplicateFiles.map((d, index) => {
                    return (
                        <Table.Row key={index}>
                        <TableCell>{d.name}</TableCell>
                        <TableCell>
                            <div style={{ textAlign: 'center' }}>
                            <StyledButton
                                type='button'
                                data-test='attachments_duplicate_cancel_btn'
                                onClick={() => handleCancelFile(index, state, setState)}>
                                <FormattedMessage id={'attachments.popup.button.cancel'} defaultMessage='Cancel' />
                            </StyledButton>
                            <StyledButton
                                type='button'
                                primary
                                data-test='attachments_duplicate_confirm_btn'
                                onClick={() => handleConfirmFile(index, d, props, state, setState)}>
                                <FormattedMessage
                                id={'attachments.popup.button.forceUpload'}
                                defaultMessage='Upload (duplicate)' />
                            </StyledButton>
                            <StyledButton
                                type='button'
                                primary
                                data-test='attachments_duplicate_link_btn'
                                onClick={() => handleLinkFile(index, d, props, state, setState)}>
                                <FormattedMessage
                                id={'attachments.popup.button.linkFile'}
                                defaultMessage='Link to existing' />
                            </StyledButton>
                            </div>
                        </TableCell>
                        </Table.Row>
                    )
                    })}
                </Table.Body>
                </Table>
            </div>
            <Button
                type='button'
                data-test='attachments_duplicate_cancel_all_btn'
                floated='right'
                style={{ margin: '20px 0px 20px 10px' }}
                onClick={() => setState({ ...state, duplicateFiles: [] })}>
                <FormattedMessage id={'attachments.popup.button.cancel'} defaultMessage='Cancel' />
            </Button>
            </Modal.Content>
        </Modal>
    ) : null
}
