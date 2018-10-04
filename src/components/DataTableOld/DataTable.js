import React, {Component} from 'react';
import PropTypes from "prop-types";
import Checkbox from "../../components/Checkbox/Checkbox";

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.handleHeaderChecked = this.handleHeaderChecked.bind(this);
        this.state = {
            checkboxes: this.props.checkboxes,
            bodyGroups: this.props.bodyGroups,
            header: this.props.header,
            headerChecked: this.props.headerChecked,
        };
    }

    handleHeaderChecked(checked){
        console.log(checked);
    }

    handleBodyChecked(bodyKey, checked) {

    }

    handleGroupChecked(groupId, checked) {

    }

    handleHeaderReorder(cell, order) {

    }

    componentWillReceiveProps(props){
        console.log(props);
        console.log(this.state);
    }

    componentWillMount(){
    }

    componentWillUnmount(){
    }

    renderHeader() {
        let head = [];
        this.state.header.forEach((item,index) => {
            head.push(<th key={index}>{item}</th>)
        });

        return (<thead>
        <tr>
            <th className="checkbox">
                <Checkbox name="checkboxAll"
                          onChange={(value) => {this.handleHeaderChecked(value)}}
                          checked={this.state.headerChecked}/>
            </th>
            {head}
        </tr>
        </thead>);
    }


    render() {
        return (
            <div className='data-table'>
                <table>
                    {this.renderHeader()}
                    {this.renderBodyGroup(this.state.bodyGroups[0])}
                </table>
            </div>
        );
    }

    renderBodyGroup(group) {

        return (
            <tbody>
            <tr className="product">
                <td colspan="10" className="checkbox-group">
                    <Checkbox className="checkbox"/>
                    <span>
                            {group.id}
                            </span>
                    <span>
                            {group.name}
                            </span>
                </td>
            </tr>
            {this.renderBodyGroupData(group.data)}
            </tbody>);
    }
    renderBodyGroupRow(data){
        let cells = [];
        data.forEach((item,index) => {
            cells.push(<td key={index}>{item}</td>)
        });

        return (
            <tr>
                <td>
                    <Checkbox name="row-checkbox"
                    />
                </td>
                {cells}
            </tr>
        );
    }
    renderBodyGroupData(data){
        let rows = [];
        data.forEach((item,index) => {
            rows.push(this.renderBodyGroupRow(item))
        });

        return rows;
    }
}

DataTable.propTypes = {
    checkboxes: PropTypes.array,
    bodyGroups: PropTypes.object,
    header: PropTypes.array,
    tableOrder: PropTypes.string,
    headerChecked: PropTypes.bool,
};

export default DataTable;
