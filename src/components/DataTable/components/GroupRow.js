import React, { Component } from 'react';
import Row from "./Row";
import CheckboxControlled from "../../Checkbox/CheckboxControlled";
import { FormattedMessage } from 'react-intl';
import { Checkbox, Icon } from 'semantic-ui-react'

class GroupRow extends Component {
    state = { open: true };
    checkbox = React.createRef();

    selectGroup(value, disabling) {
        let rows = this.props.rowsOpns.rows.map((r) => ({ ...r, selected: value }));
        this.props.selectGroup({
            groupId: this.props.rowsOpns.index,
            rows: rows,
            checked: value,
            disabling: disabling
        })
    }

    isSelected() {
        for (let i = 0; i < this.props.rowsOpns.rows.length; i++) {
            if (!this.props.rowsOpns.rows[i].selected) return false
        }
        return true
    }

    toggleGroup(e) {
        if (this.checkbox.current && this.checkbox.current.contains(e.target)) return;
        this.setState({ open: !this.state.open })
    }

    render() {
        const { tableType } = this.props;
        const isAllInventory = tableType === "allInventoryTable";
        return (
            <React.Fragment>
                <tr className="data-table-group-header" onClick={(e) => this.toggleGroup(e)} data-test='GroupRow_toggle_Group'>
                    {
                        this.props.selectable ?
                            <td className="data-table-select"
                                ref={this.checkbox}>
                                <Checkbox checked={this.isSelected()}
                                    disabled={this.props.disabled}
                                    disabling={isAllInventory}
                                    onChange={(event, data) => this.selectGroup(data.checked, data.disabling)}
                                    data-test='GroupRow_select_drpdn'
                                />
                            </td>
                            : null
                    }
                    <td className="group-header"
                        colSpan={(this.props.headers.length + (this.props.contextMenu ? 2 : 0))} >{this.props.rows.group}
                        <span
                            className="data-table-group-count">
                            {this.props.rows.countLabel ?
                                <FormattedMessage
                                    id='dataTable.groupRow.ProductOfferings'
                                    defaultMessage={this.props.rows.countLabel + this.props.rows.rows.length}
                                    values={{ number: this.props.rows.rows.length }}
                                />
                                : null}
                            {this.state.open ? <Icon name='chevron down' size='large' color='blue' /> : <Icon name='chevron right' size='large' color='blue' />}
                        </span>
                    </td>
                </tr>
                {this.state.open ?
                    this.props.rowsOpns.rows.map((opns, index) => {
                        if (this.props.rows.rows[opns.index]) {
                            return (
                                <Row
                                    onRowClick={this.props.onRowClick}
                                    selectable={this.props.selectable}
                                    history={this.props.history}
                                    location={this.props.location}
                                    tableType={this.props.tableType}
                                    addPopup={this.props.addPopup}
                                    removePopup={this.props.removePopup}
                                    id={opns.id}
                                    rowOpns={opns}
                                    rowComponent={this.props.rowComponent}
                                    othersChecked={!!this.props.rowsOpns.rows.filter((gr, indexGr) => {
                                        return gr.selected && (indexGr !== index)
                                    }).length}
                                    contextMenu={this.props.contextMenu}
                                    headers={this.props.headers}
                                    data={this.props.rows.rows[opns.index].data}
                                    selectFunc={this.props.selectFunc}
                                    groupId={this.props.rowsOpns.index}
                                    key={index}
                                    data-test={`GroupRow_row_index_${index}_action`}/>
                            )
                        }
                    }
                    )
                    : null}
            </React.Fragment>
        )

    }
}
export default GroupRow;
