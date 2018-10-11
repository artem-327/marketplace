import React, {Component} from 'react';
import PropTypes from "prop-types";
import Row from "./Row";
import CheckboxControlled from "../../Checkbox/CheckboxControlled";

class GroupRow extends Component {

    state = { open: false };

    selectGroup(value){
        let rows = this.props.rows.map((r) => ({...r, selected: value}));
        this.props.selectGroup(this.props.id, rows)
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
                <tr className="product" onClick={() => this.setState({open: !this.state.open})}>
                    {this.props.selectable ? <td><CheckboxControlled value={this.isSelected()} onChange={(value) => this.selectGroup(value)}/></td> : null}
                    <td ><span className="product-casnumber">{this.props.group}</span></td>
                </tr>
                {this.state.open ? this.props.rows.map((row, index) => (
                    <Row selectable={this.props.selectable} headers={this.props.headers} data={row} selectFunc={this.props.selectFunc} groupId={this.props.id} key={index}/>
                )) : null}
            </React.Fragment>
        )

    }
}

GroupRow.propTypes = {

};

export default GroupRow;
