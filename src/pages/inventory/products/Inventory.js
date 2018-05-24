import React, {Component} from 'react';
import Filter from './components/Filter'
import DataTable from './components/DataTable'
import './inventory.css'
import XLSX from 'xlsx';
import DragDropFile from "../../../components/DragDropFile";
import FileSelector from "../../../components/FileSelector";


class Inventory extends Component {
    constructor(props) {
        super(props);
        this.handleFile = this.handleFile.bind(this);
    };

    handleFile(file) {
        const reader = new FileReader();
        const isCsv = file.name.toLowerCase().endsWith('.csv');
        reader.onload = (event) => {
            //WORKAROUND - problem with date parsing from csv (https://github.com/SheetJS/js-xlsx/issues/940)
            // solution is to parse every field as string and convert manually
            const workBook = XLSX.read(event.target.result, {type: isCsv ? 'string' : 'array',  raw: true});
            const workSheet = workBook.Sheets[workBook.SheetNames[0]];
            console.log(XLSX.utils.sheet_to_json(workSheet, {header: 0}));
        };

        isCsv ? reader.readAsText(file) : reader.readAsArrayBuffer(file);
    };

    render() {

        const accept = [
            "xlsx", "xlsb", "xlsm", "xls", "xml", "csv",
        ].map(x => "." + x).join(",");

        return (
            <div>
                <DragDropFile handleFile={this.handleFile}>
                    <div style={{margin: '20px'}} className="row">
                        <div className="col-xs-12">
                            <FileSelector accept={accept} handleFile={this.handleFile}/>
                        </div>
                    </div>
                </DragDropFile>
                <Filter/>
                <DataTable/>
            </div>
        );
    }
}


export default Inventory;

