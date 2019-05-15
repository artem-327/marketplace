import React, {Component} from 'react';
import './uploadLot.scss'
import upload from '~/src/images/upload/upload.png';
import uploaded from '~/src/images/upload/uploaded.png';
import PropTypes from "prop-types";
import File from "~/src/pages/inventory/addInventory/components/Upload/components/File";
import ReactDropzone from "react-dropzone";
import {FormattedMessage} from 'react-intl';
import {TOO_LARGE_FILE, UPLOAD_FILE_FAILED} from '~/src/modules/errors.js'
import { FieldArray } from "formik"
import confirm from '~/src/components/Confirmable/confirm'

class UploadLot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
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
        let {fileMaxSize} = this.props
        blobs.forEach(function(blob) {
            if (blob.size > (fileMaxSize * 1024 * 1024)) {
                this.props.errorTooLarge(blob.name, fileMaxSize)
            }
        })
    }

    onUploadSuccess = (files) => {
        this.props.onChange(files)
    }

    onUploadFail = (fileName) => {
        this.props.errorUploadFail(fileName)
    }

    onPreviewDrop = async (files) => {
        let {loadFile, addAttachment, type, fileMaxSize, unspecifiedTypes} = this.props
        let {onDropRejected, onUploadSuccess, onUploadFail} = this

        if (typeof unspecifiedTypes === 'undefined')
          unspecifiedTypes = []
        if (unspecifiedTypes.indexOf(type) >= 0) {
          await confirm('Unspecified Document Type', 'Do you really want to upload documents with unspecified type?').then((result) => {
            // continue uploading files
          }, (result) => {
            // remove all files
            files = []
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
        (function loop(j) {
            if (j < files.length) new Promise((resolve, reject) => {
                loadFile(files[j]).then(file => {
                    addAttachment(file.value, type).then((aId) => {

                        onUploadSuccess(aId.value.data)

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
        let {attachments, disabled} = this.props
        let hasFile = this.props.attachments && this.props.attachments.length !== 0;

        return (
            <div className={"uploadLot " + (hasFile ? ' has-file' : '')}>
                {this.props.header}
                {disabled ? (
                  <span className="file-space">
                    <FieldArray name={this.props.name}
                                render={arrayHelpers => (
                                  <>
                                    {attachments && attachments.length ? attachments.map((file, index) => (
                                      <File key={file.id} onRemove={() => {
                                        this.removeFile(file)
                                        arrayHelpers.remove(index)
                                      }} disabled={true} className="file lot" name={file.name} index={index} />
                                    )) : ''}
                                  </>
                                )}
                    />
                  </span>
                ) : (hasFile ?
                    <React.Fragment>
                      {this.props.uploadedContent ? (
                          <ReactDropzone className="dropzoneLot" activeClassName="active" onDrop={this.onPreviewDrop} onDropRejected={this.onDropRejected}>
                            {this.props.uploadedContent}
                          </ReactDropzone>
                        ) : ''}
                      <span className="file-space">
                        <FieldArray name={this.props.name}
                                    render={arrayHelpers => (
                          <>
                            {attachments && attachments.length ? attachments.map((file, index) => (
                                <File key={file.id} onRemove={() => {
                                  this.removeFile(file)
                                  arrayHelpers.remove(index)
                                }} className="file lot" name={file.name} index={index} />
                              )) : ''}
                          </>
                        )} />
                      </span>
                    </React.Fragment>
                    :
                    <ReactDropzone className="dropzoneLot" activeClassName="active" onDrop={this.onPreviewDrop}>
                      <div>
                        {this.props.emptyContent}
                      </div>
                    </ReactDropzone>
                )}
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