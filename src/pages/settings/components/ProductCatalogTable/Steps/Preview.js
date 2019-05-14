import React, { Component } from "react";
import { connect } from "react-redux";

import { Table } from "semantic-ui-react";

import { dataHeaderCSV } from "../../../actions";

const MAP = {
  "CAS Number": "casNumberMapper",
  "Packaging Minimum": "packagingMinimumMapper",
  "Packaging Size": "packagingSizeMapper",
  "Packaging Splits": "packagingSplitsMapper",
  "Packaging Type": "packagingTypeNameMapper",
  Unit: "packagingUnitNameMaper",
  "Product Name": "productNameMapper"
};

class Preview extends Component {
  constructor(props) {
    const filteredHeader =
      props.mappedHeader &&
      props.mappedHeader.filter(column => {
        return column.header;
      });
    super(props);
    this.state = {
      filteredHeader: filteredHeader || null
    };
  }

  componentDidMount() {
    const data =
      this.state.filteredHeader &&
      this.state.filteredHeader.reduce(
        (prev, next) => {
          const key = MAP[next.header];
          prev[key] = next.content;
          return prev;
        },
        { headerLine: true }
      );
    data && this.props.dataHeaderCSV(data);
  }

  render() {
    const { CSV } = this.props;
    const { filteredHeader } = this.state;

    return (
      <Table celled padded textAlign="center">
        <Table.Header>
          <Table.Row>
            {filteredHeader &&
              filteredHeader.map(column => (
                <Table.HeaderCell key={column.columnNumber}>
                  {column.header}
                </Table.HeaderCell>
              ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {CSV.bodyCSV.map((row, i) => (
            <Table.Row key={i}>
              {row.columns.map(cell => {
                return (
                  filteredHeader &&
                  filteredHeader.map(
                    header =>
                      header.columnNumber === cell.columnNumber && (
                        <Table.Cell key={cell.columnNumber}>
                          {cell.content}
                        </Table.Cell>
                      )
                  )
                );
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

const mapDispatchToProps = {
  dataHeaderCSV
};

const mapStateToProps = state => {
  return {
    mappedHeader: state.settings.mappedHeaders,
    CSV: state.settings.CSV
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
