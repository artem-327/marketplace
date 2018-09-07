import React, {Component} from 'react';
import PropTypes from "prop-types";
import ReactDropzone from "react-dropzone";

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
    }

    render () {
        const previewStyle = {
            display: 'inline',
            maxWidth: 100
        };

        return (
            <div className="file-wrapper">
            <ReactDropzone accept="image/*" className="dropzone" activeClassName="active" rejectClassName="dropzone-rejected" onDrop={this.onPreviewDrop}>
                {this.props.header}
            </ReactDropzone>
                {this.state.files.length > 0 &&
                <React.Fragment>
                    {this.state.files.map((file) => (
                        <img
                            alt="Preview"
                            key={file.preview}
                            src={file.preview}
                            style={previewStyle}
                        />
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
