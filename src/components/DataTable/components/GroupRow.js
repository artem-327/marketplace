import React, {Component} from 'react';
import PropTypes from "prop-types";
import Row from "./Row";
import CheckboxControlled from "../../Checkbox/CheckboxControlled";

class GroupRow extends Component {

    state = { open: true };

    selectGroup(value){
        let rows = this.props.rows.map((r) => ({...r, selected: value}));
        this.props.selectGroup(this.props.index, rows)
    }

    isSelected(){
        for(let i = 0; i < this.props.rows.length; i++){
            if(!this.props.rows[i].selected) return false
        }
        return true
    }

    render() {
        return (
            <React.Fragment>
                <tr className="data-table-group-header" onClick={() => this.setState({open: !this.state.open})}>
                    {this.props.selectable ? <td className="data-table-select"><CheckboxControlled value={this.isSelected()} onChange={(value) => this.selectGroup(value)}/></td> : null}
                    {this.props.contextMenu ? <React.Fragment><td/><td/></React.Fragment> : null}
                    <td  className="group-header" colSpan={(this.props.headers.length)} >{this.props.group}
                    {this.props.countLabel ? <span className="data-table-group-count">{this.props.countLabel + this.props.rows.length}</span> : null}</td>
                    {this.state.open ? <td className="data-table-arrow"><i className="icon fas fa-angle-down"/></td> : <td className="data-table-arrow"><i className="icon fas fa-angle-up"/></td>}
                </tr>
                {this.state.open ? this.props.rows.map((row, index) => (
                    <Row selectable={this.props.selectable} id={row.id} contextMenu={this.props.contextMenu} headers={this.props.headers} data={row} selectFunc={this.props.selectFunc} groupId={this.props.index} key={index}/>
                )) : null}
            </React.Fragment>
        )

    }
}

GroupRow.propTypes = {

};

export default GroupRow;
