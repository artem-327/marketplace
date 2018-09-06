import React, {Component} from 'react';
import UploadFile from "./components/UploadFile";
import UploadImage from "./components/UploadImage";
import './attachment.css';
import File from "./components/File";

class Attachment extends Component {
    render () {
        return (
        <div className="attachment">
            <UploadFile content="Upload your file" files={[<File name="test" />, <File name="test" />]}/>
            <UploadFile content="Upload another file" files={[<File name="another-test" />]}/>
            <UploadImage content="Upload your image" files={[<File name="test-image" />]}/>
        </div>
        )
    }
}
export default Attachment;