import React, {Component} from 'react';
import Row from "./Row";
import CheckboxControlled from "../../Checkbox/CheckboxControlled";

class GroupRow extends Component {
    state = { open: true };
    checkbox = React.createRef();

    selectGroup(value){
        let rows = this.props.rowsOpns.rows.map((r) => ({...r, selected: value}));
        this.props.selectGroup(this.props.rowsOpns.index, rows)
    }

    handleSelect(event){
        let prevRow = event.target.closest('tr');
        let nextRow = event.target.closest('tr');
        let anotherGroup = false;
        let checkedBox = event.target.checked;

        // enable/disable previous rows
        while ((prevRow = prevRow.previousSibling) !== null) {
            prevRow.children[0].children[0].children[1].disabled = checkedBox;
        }

        // enable/disable next rows
        while ((nextRow = nextRow.nextSibling) !== null) {
            if (nextRow.classList.contains('data-table-group-header')) {
                anotherGroup = true;
            }

            if (anotherGroup) {
                nextRow.children[0].children[0].children[1].disabled = checkedBox;
            }
        }

        if (checkedBox)
            document.getElementById('shippingQuotes').classList.remove('hidden');
        else
            document.getElementById('shippingQuotes').classList.add('hidden');
    }

    isSelected(){
        for(let i = 0; i < this.props.rowsOpns.rows.length; i++){
            if(!this.props.rowsOpns.rows[i].selected) return false
        }
        return true
    }

    toggleGroup(e){
        if (this.checkbox.current && this.checkbox.current.contains(e.target)) return;
        this.setState({open: !this.state.open})
    }

    render() {
        const {tableType} = this.props
        const isAllInventory = tableType ==="allInventoryTable"
        return (
            <React.Fragment>
                <tr className="data-table-group-header" onClick={(e) => this.toggleGroup(e)}>
                    {this.props.selectable ? <td className="data-table-select" ref={this.checkbox}><CheckboxControlled value={this.isSelected()} onClick={isAllInventory ? event => this.handleSelect(event) : () => {}} onChange={(value) => this.selectGroup(value)}/></td> : null}
                    <td  className="group-header" colSpan={(this.props.headers.length+(this.props.contextMenu ? 2 : 0))} >{this.props.rows.group}
                    <span className="data-table-group-count">{this.props.rows.countLabel ? this.props.rows.countLabel + this.props.rows.rows.length : null} {this.state.open ? <i className="icon angle-down"/> : <i className="icon angle-up"/>}</span></td></tr>
                {this.state.open ? this.props.rowsOpns.rows.map((opns, index) => (
                    <Row selectable={this.props.selectable} history={this.props.history} tableType={this.props.tableType} addPopup={this.props.addPopup} removePopup={this.props.removePopup} id={opns.id} rowOpns={opns} rowComponent={this.props.rowComponent} contextMenu={this.props.contextMenu} headers={this.props.headers} data={this.props.rows.rows[opns.index].data} selectFunc={this.props.selectFunc} groupId={this.props.rowsOpns.index} key={index}/>
                )) : null}
            </React.Fragment>
        )

    }
}
export default GroupRow;
