import React, {Component} from 'react';
import PropTypes from "prop-types";
import ReactDropzone from "react-dropzone";
import delete_image from '../../../../../../images/upload/delete_image.jpg';

class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };
    }

    onPreviewDrop = (files) => {
        this.setState({
            files: this.state.files.concat(files),
        });
    };

    removeFile(index) {
        this.setState({
            files: [
                ...this.state.files.slice(0, index),
                ...this.state.files.slice(index + 1)
            ]
        })
    }

    render() {
        const previewStyle = {
            width: 150,
            height: 100
        };
        // let files = this.state.files.map((file, index) => (<File onRemove={()=>this.removeFile(index)} className="file" name={file.name} />));

        return (
            <div className="file-wrapper">
                <ReactDropzone accept="image/*" className="dropzone" activeClassName="active"
                               rejectClassName="dropzone-rejected" onDrop={this.onPreviewDrop}>
                    {this.props.header}
                </ReactDropzone>
                {this.state.files.length > 0 &&
                <React.Fragment>
                    {this.state.files.map((file, index) => (
                        <div className="image-wrapper">
                            <img src={delete_image} className="delete-image" alt="Delete image" onClick={() => this.removeFile(index)} data-test='add_inventory_upload_upload_image_delete' />
                            <img
                                className="upload-image"
                                alt="Preview"
                                key={file.preview}
                                src={file.preview}
                                style={previewStyle}
                            />
                        </div>
                    ))}
                </React.Fragment>
                }
            </div>
        )
    }
}

UploadImage.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string
};

export default UploadImage;
