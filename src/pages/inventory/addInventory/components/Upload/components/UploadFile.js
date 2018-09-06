import React, {Component} from 'react';
import PropTypes from "prop-types";

class UploadFile extends Component {
    render () {
        return (
            <div className="file-wrapper">
            <div className="upload-file"><input type='file' className="upload"/>{this.props.content}
            </div>
            <div className="file-space">{this.props.files}</div>
            </div>
        )
    }
}

UploadFile.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string,
    files: PropTypes.array
};

export default UploadFile;