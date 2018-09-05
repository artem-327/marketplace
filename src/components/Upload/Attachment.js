import React, {Component} from 'react';
import UploadFile from "./components/UploadFile";
import UploadImage from "./components/UploadImage";
import UploadLot from "./UploadLot";

class Attachment extends Component {
    render () {
        return (
        <div>
            <UploadFile/>
            <UploadFile/>
            <UploadImage/>
        </div>
        )
    }
}
export default Attachment;