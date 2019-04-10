import React, {Component} from 'react';
//import './uploadLot.scss'
import upload from '~/src/images/upload/upload.png';
import uploaded from '~/src/images/upload/uploaded.png';
import PropTypes from "prop-types";
import File from "~/src/pages/inventory/addInventory/components/Upload/components/File";
import ReactDropzone from "react-dropzone";
import {FormattedMessage} from 'react-intl';
import {TOO_LARGE_FILE, UPLOAD_FILE_FAILED} from '~/src/modules/errors.js'

class UploadLot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: props.fileIds
        }
    }

    removeFile = (index) => {
        let {files} = this.state
        /*let attachmentId = this.state.files[index].key

        // delete attachment from database
        this.props.removeAttachmentLink(this.props.lot ? true : false, this.props.lot ? this.props.lot.id : poId, attachmentId).then(() => {
            this.props.removeAttachment(attachmentId)
        })*/

        files.splice(index, 1)

        this.setState({files})
    }

    onDropRejected = (blobs) => {
        let {fileMaxSize} = this.props
        blobs.forEach(function(blob) {
            if (blob.size > (fileMaxSize * 1024 * 1024)) {
                this.props.errorTooLarge(blob.name, fileMaxSize)
            }
        })
    }

    onUploadSuccess = (files) => {
        this.setState({files})
    }

    onUploadFail = (fileName) => {
        this.props.errorUploadFail(fileName)
    }

    onPreviewDrop = (files) => {
        let {loadFile, addAttachment, type, fileMaxSize, setFileIds} = this.props
        let {onDropRejected, onUploadSuccess, onUploadFail} = this
        let attachments = []

        // add new files to attachments and save indexes of own files
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > fileMaxSize * 1024 * 1024) {
                // remove file
                onDropRejected([files[i]])
                files.splice(i, 1)
                i--
            }
        }

        let filesState = this.state.files;

        // upload new files as temporary attachments
        (function loop(j) {
            if (j < files.length) new Promise((resolve, reject) => {
                loadFile(files[j]).then(file => {
                    addAttachment(file.value, type).then((aId) => {
                        filesState = filesState.concat([{name: files[j].name, key: aId.value.data}])

                        onUploadSuccess(filesState)
                        setFileIds(aId.value.data)

                        resolve()
                    }).catch(e => {
                        onUploadFail(files[j].name);
                        resolve()
                    })
                }).catch(e => {
                    onUploadFail(files[j].name);
                    resolve()
                });
            }).then(loop.bind(null, j+1));
        })(0)
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
    type: PropTypes.string,
    uploadClass: PropTypes.string,
    uploadedClass: PropTypes.string
};

export default UploadLot;