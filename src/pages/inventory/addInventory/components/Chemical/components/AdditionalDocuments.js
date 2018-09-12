import React, {Component} from 'react';
import './AdditionalDocuments.css'
import UploadLot from "../../Upload/UploadLot";

class AdditionalDocuments extends Component {
    render () {
        return (
            <div className="add-documents">
                <h6>ADDITIONAL DOCUMENTS</h6>
                <UploadLot className="add-doc"/>
                <UploadLot className="add-doc"/>
                <UploadLot className="add-doc"/>
            </div>
        )
    }
}

export default AdditionalDocuments;