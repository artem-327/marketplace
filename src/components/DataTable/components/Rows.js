import React, { Component } from "react";
import GroupRow from "./GroupRow";
import Row from "./Row";

class Rows extends Component {
  render() {
    const rows = this.props.rowsOpns.map((item, index) => {
      if (item.group)
        return (
          <GroupRow
            key={index}
            rows={this.props.rows[item.index]}
            history={this.props.history}
            rowsOpns={this.props.rowsOpns[item.index]}
            rowComponent={this.props.rowComponent}
            contextMenu={this.props.contextMenu}
            headers={this.props.headers}
            selectable={this.props.selectable}
            selectFunc={this.props.selectFunc}
            selectGroup={this.props.selectGroupFunc}
            tableType={this.props.tableType}
            addPopup={this.props.addPopup}
          />
        );
      return this.props.data[item.index].rows.map((row, index2) => {
        return <Row
          data={row.data}
          rowOpns={this.props.rowsOpns[item.index].rows[index2]}
          rowComponent={this.props.rowComponent}
          contextMenu={this.props.contextMenu}
          headers={this.props.headers}
          selectable={this.props.selectable}
          key={index2}
          groupId={item.index}
          id={item.id}
          selectFunc={this.props.selectFunc}
        />
        });
    });
    return <tbody>{rows}</tbody>;
  }
}

export default Rows;
