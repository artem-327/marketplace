import React, {Component} from 'react';
import './uploadLot.css'
import upload from '../../../../../images/upload/upload.png';
import uploaded from '../../../../../images/upload/uploaded.png';
import PropTypes from "prop-types";
import File from "./components/File";
import ReactDropzone from "react-dropzone";

class UploadLot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };
    }

    removeFile() {
        this.setState({files: []})
    }

    onPreviewDrop = (files) => {
        this.setState({files});
    };

    render() {
        let files = this.state.files.map((file, index) => (
            <File onRemove={() => this.removeFile(index)} className="file lot" name={file.name}/>));
        let hasFile = this.state.files.length !== 0;
        return (
            <div className="uploadLot">
                {this.props.header}
                {hasFile ?
                    <React.Fragment>
                        <ReactDropzone className="dropzoneLot" activeClassName="active" onDrop={this.onPreviewDrop}>
                            <img className="uploaded" src={uploaded} alt='drop'/>
                        </ReactDropzone>
                        <div className="file-space">{files}</div>
                    </React.Fragment>
                    :
                    <ReactDropzone className="dropzoneLot" activeClassName="active" onDrop={this.onPreviewDrop}>
                        <img className="upload" src={upload} alt='drop-close'/>
                        <div>
                            <label>Click to upload C of A</label>
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
    files: PropTypes.array
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