import React, {Component} from 'react';
import './AdditionalDocuments.css'
import UploadLot from "../../Upload/UploadLot";

class AdditionalDocuments extends Component {
    render () {
        return (
            <div>
                <h6 className="add-doc-title">ADDITIONAL DOCUMENTS</h6>
                <div className="add-documents">
                <UploadLot className="add-doc" content="Click to upload MSDS"/>
                <UploadLot className="add-doc" content="Click to upload Spec Sheet"/>
                <UploadLot className="add-doc" content="Click to upload Product Image"/>
                </div>
            </div>
        )
    }
}

export default AdditionalDocuments;