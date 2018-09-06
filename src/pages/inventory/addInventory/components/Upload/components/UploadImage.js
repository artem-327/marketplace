import React, {Component} from 'react';
import PropTypes from "prop-types";

class UploadImage extends Component {
    render () {
        return (
            <div className="file-wrapper">
            <div className="upload-image"><input type='file' className="upload"/>{this.props.content}
            </div>
            <div className="file-space">{this.props.files}</div>
            </div>
    )
    }
}

UploadImage.propTypes = {
    className: PropTypes.string,
    content: PropTypes.string
};

export default UploadImage;
