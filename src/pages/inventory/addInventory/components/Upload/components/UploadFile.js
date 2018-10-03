import React, {Component} from 'react';
import PropTypes from "prop-types";
import ReactDropzone from "react-dropzone";
import File from "./File";

class UploadFile extends Component {

    constructor(props){
        super(props);
        this.state = {
            files: []
        }
    }

    removeFile(index){
        this.setState({files: [
                ...this.state.files.slice(0, index),
                ...this.state.files.slice(index + 1)
            ]})
    }

    onPreviewDrop = (files) => {
        this.setState({
            files: this.state.files.concat(files),
        });
    };

    render () {
        let files = this.state.files.map((file, index) => (<File onRemove={()=>this.removeFile(index)} className="file" name={file.name} />));
        return (
            <div className="file-wrapper">
            <ReactDropzone className="dropzone" activeClassName="active" rejectClassName="dropzone-rejected" onDrop={this.onPreviewDrop}>
                {this.props.header}
            </ReactDropzone>
            <div className="file-space">{files}</div>
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