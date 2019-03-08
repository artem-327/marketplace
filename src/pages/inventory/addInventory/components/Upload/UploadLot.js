import React, {Component} from 'react';
import './uploadLot.css'
import upload from '../../../../../images/upload/upload.png';
import uploaded from '../../../../../images/upload/uploaded.png';
import PropTypes from "prop-types";
import File from "./components/File";
import ReactDropzone from "react-dropzone";
import {FormattedMessage} from 'react-intl';
import {TOO_LARGE_FILE, UPLOAD_FILE_FAILED} from '../../../../../modules/errors.js'

class UploadLot extends Component {
    constructor(props) {
        super(props);
        localStorage.removeItem('attachments')
        this.state = {
            files: [],
            filesIds: []
        }
    }

    componentDidMount() {
        if (this.props.edit) {
            let files = this.state.files
            let attachments

            if (this.props.lot) {
                attachments = this.props.lot.attachments
            } else {
                attachments = this.props.productOffer ? this.props.productOffer.attachments : null
            }

            if (attachments) {
                for (let i = 0; i < attachments.length; i++) {
                    if (attachments[i].type === this.props.type) {
                        files = files.concat([attachments[i]])
                    }
                }
            }
            if (files && files.length) {
                this.setState({files: files})
            }
        }
    }

    removeFile = (index) => {
        if (this.state.files[index] instanceof Blob) {
            let filesIds = this.state.filesIds
            let attachments = []

            // get attachments from local storage
            if (localStorage.getItem('attachments'))
                attachments = JSON.parse(localStorage.getItem('attachments'))

            // remove only own files - change to null so indexes for other UploadLot(s) still work
            for (let i = 0; i < filesIds.length; i++) {
                if (attachments[filesIds[i]] && (attachments[filesIds[i]].filesIndex === index)) {
                    attachments.splice(filesIds[i], 1, null)
                    break;
                }
            }

            // save modified attachments
            localStorage.setItem('attachments', JSON.stringify(attachments))

        } else {
            let attachmentId = this.state.files[index].id
            let poId = this.props.productOffer.id

            // delete attachment from database
            this.props.removeAttachmentLink(this.props.lot ? true : false, this.props.lot ? this.props.lot.id : poId, attachmentId).then(() => {
                this.props.removeAttachment(attachmentId)
            })
        }

        this.setState({
            files: this.state.files.filter((file, k) => {
                if (k === index) {
                    return false
                }
                return true
            }),
            filesIds: this.state.filesIds
        })

        return true
    }

    onDropRejected = (blobs) => {
        let {fileMaxSize, dispatch} = this.props
        blobs.forEach(function(blob) {
            if (blob.size > (fileMaxSize * 1024 * 1024)) {
                dispatch(() => ({
                    type: TOO_LARGE_FILE,
                    payload: {
                        fileName: blob.name,
                        maxSize: fileMaxSize
                    }
                }))
            }
        })
    }

    onUploadFail = (fileName) => {
        this.props.dispatch(() => ({
            type: UPLOAD_FILE_FAILED,
            payload: {
                fileName: fileName
            }
        }))
    }

    onPreviewDrop = (files) => {
        let {loadFile, addAttachment, type, fileMaxSize} = this.props
        let {onDropRejected, onUploadFail, removeFile} = this
        let attachments = []
        let filesIds = []
        let filesLength = this.state.files.length

        // get attachments from local storage
        if (localStorage.getItem('attachments'))
            attachments = JSON.parse(localStorage.getItem('attachments'))

        // add new files to attachments and save indexes of own files
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > fileMaxSize * 1024 * 1024) {
                // remove attachment
                onDropRejected([files[i]])
                files.splice(i, 1)
                i--
            } else {
                // JSON.stringify on blob saves only preview - not enough
                let filesData = {
                    preview: files[i].preview,
                    name: files[i].name,
                    type: files[i].type,
                    docType: this.props.type,
                    filesIndex: filesLength + i,
                    lot: this.props.lot ? this.props.lot.id : false
                }
                filesIds.push(attachments.length)
                attachments.push(filesData)
            }
        }

        localStorage.setItem('attachments', JSON.stringify(attachments))

        let filesNew = this.state.files.concat(files)
        filesIds = this.state.filesIds.concat(filesIds)
        this.setState({files: filesNew, filesIds});

        // upload new files as temporary attachments
        (function loop(j) {
            if (j < files.length) new Promise((resolve, reject) => {
                loadFile(files[j]).then(file => {
                    addAttachment(file.value, type).then((aId) => {
                        // add attachmentId to items in localStorage
                        if (localStorage.getItem('attachments'))
                            attachments = JSON.parse(localStorage.getItem('attachments'))

                        attachments = attachments.map(function (attachment) {
                            if (attachment.filesIndex === (filesLength + j)) {
                                attachment.attachmentId = aId.value.data
                            }
                            return attachment
                        })

                        localStorage.setItem('attachments', JSON.stringify(attachments))

                        resolve()
                    }).catch(e => {
                        onUploadFail(files[j].name)
                        resolve()
                    })
                }).catch(e => {
                    onUploadFail(files[j].name)
                    resolve()
                });
            }).then(loop.bind(null, j+1))
        })(0)

        console.log(this.state)
    };

    render() {
        let files = this.state.files.map((file, index) => (
            <File id={index} onRemove={() => this.removeFile(index)} className="file lot" name={file.name} index={index} />));
        let hasFile = this.state.files.length !== 0;
        return (
            <div className={"uploadLot " + this.props.className + (hasFile ? ' has-file' : '')}>
                {this.props.header}
                {hasFile ?
                    <React.Fragment>
                        <ReactDropzone className="dropzoneLot" activeClassName="active" onDrop={this.onPreviewDrop} onDropRejected={this.onDropRejected}>
                            <img className="uploaded" src={uploaded} alt='drop'/>
                        </ReactDropzone>
                        <span className="file-space">{files}</span>
                    </React.Fragment>
                    :
                    <ReactDropzone className="dropzoneLot" activeClassName="active" onDrop={this.onPreviewDrop}>
                        <img className="upload" src={upload} alt='drop-close'/>
                        <div>
                            <label>
                                <FormattedMessage
                                    id='addInventory.uploadDocument'
                                    defaultMessage='Click to upload'
                                /> {this.props.type}
                            </label>
                        </div>
                    </ReactDropzone>
                }
            </div>
        )
    }
}

UploadLot.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string,
    files: PropTypes.array,
    uploadClass: PropTypes.string,
    uploadedClass: PropTypes.string
};

export default UploadLot;

// render() {
//     let files = this.state.files.map((file, index) => (<File onRemove={()=>this.removeFile(index)} name={file.name} />));
//     return (
//         <div>
//             <input type="file" id="lot" className="upload-item"/>
//             <div className='uploadLot'>
//                 {this.state.isUploaded ? <img className="upload" src={uploaded} alt='drop'/> :
//                     <img className="uploaded" src={upload} alt='drop-close'/>}
//                 <label>Click to upload C of A</label>
//             </div>
//         </div>
//     )
// }
// }