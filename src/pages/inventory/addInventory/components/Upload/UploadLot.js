import React, {Component} from 'react';
import './uploadLot.css'
import upload from '../../../../../images/upload/upload.png';
import uploaded from '../../../../../images/upload/uploaded.png';

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

    isUploaded() {
        if (this.state.files === []) return false;
        if (this.state.files !== []) return true;
    }

    render() {
        return (
            <div>
                <input type="file" id="lot" className="upload-item"/>
                <div className='uploadLot'>
                    {this.state.isUploaded ? <img className="upload" src={uploaded} alt='drop'/> :
                        <img className="uploaded" src={upload} alt='drop-close'/>}
                    <label>Click to upload C of A</label>
                </div>
            </div>
        )
    }
}

export default UploadLot;