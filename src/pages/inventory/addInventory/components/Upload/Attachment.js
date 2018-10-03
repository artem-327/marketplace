import React, {Component} from 'react';
import UploadFile from "./components/UploadFile";
import UploadImage from "./components/UploadImage";
import './attachment.css';

class Attachment extends Component {
    render () {
        return (
        <div className="attachment">
            <UploadFile header="Upload your file"/>
            <UploadFile header="Upload another file"/>
            <UploadImage header="Upload your image"/>
        </div>
        )
    }
}
export default Attachment;