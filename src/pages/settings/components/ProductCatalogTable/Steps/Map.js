import React, { Component } from "react"
import { connect } from "react-redux"

import { Table, Dropdown } from "semantic-ui-react"

import { changeHeadersCSV } from "../../../actions"

const mappingProduct = [
  { text: "CAS Number", value: "CAS Number" },
  { text: "Packaging Minimum", value: "Packaging Minimum" },
  { text: "Packaging Size", value: "Packaging Size" },
  { text: "Packaging Splits", value: "Packaging Splits" },
  { text: "Packaging Type", value: "Packaging Type" },
  { text: "Unit", value: "Unit" },
  { text: "Product Name", value: "Product Name" }
]

const mappingProductOffer = [
  { text: "Assay Max", value: "Assay Max" },
  { text: "Assay Min", value: "Assay Min" },
  { text: "CAS Product Number", value: "CAS Product Number" },
  { text: "Expiration Date", value: "Expiration Date" },
  { text: "External Notes", value: "External Notes" },
  { text: "Hazard Class", value: "Hazard Class" },
  { text: "Internal Notes", value: "Internal Notes" },
  { text: "Lot Manufactured Date", value: "Lot Manufactured Date" },
  { text: "Lot Number", value: "Lot Number" },
  { text: "Lot Pkg Amount", value: "Lot Pkg Amount" },
  { text: "Manufacturer Name", value: "Manufacturer Name" },
  { text: "Origin Name", value: "Origin Name" },
  { text: "Packaging Group", value: "Packaging Group" },
  { text: "Packaging Minimum", value: "Packaging Minimum" },
  { text: "Packaging Size", value: "Packaging Size" },
  { text: "Packaging Splits", value: "Packaging Splits" },
  { text: "Packaging Type Name", value: "Packaging Type Name" },
  { text: "Packaging Unit Name", value: "Packaging Unit Name" },
  { text: "Pricing Cost", value: "Pricing Cost" },
  { text: "Pricing Price", value: "Pricing Price" },
  { text: "Product Code", value: "Product Code" },
  { text: "Product Condition Name", value: "Product Condition Name" },
  { text: "Product Form Name", value: "Product Form Name" },
  { text: "Product Grade Name", value: "Product Grade Name" },
  { text: "Product Name", value: "Product Name" },
  { text: "Trade Name", value: "Trade Name" },
  { text: "UN Number", value: "UN Number" },
  { text: "Warehouse Name", value: "Warehouse Name" }
]

class Map extends Component {
  state = {
    newHeaders: null
  }

  componentDidMount() {
    this.setState({ newHeaders: this.props.CSV.headerCSV })
  }

  render() {
    const { CSV } = this.props

    return (
      <Table celled padded textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>CSV Columns</Table.HeaderCell>
            <Table.HeaderCell>CSV Preview</Table.HeaderCell>
            <Table.HeaderCell>Mapping</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {CSV && (
          <Table.Body>
            {CSV.headerCSV.map(lineHeader => (
              <Table.Row key={lineHeader.columnNumber}>
                <Table.Cell>{lineHeader.content}</Table.Cell>
                <Table.Cell>
                  {CSV.bodyCSV.map(line => {
                    return line.columns.map(lineBody => {
                      return (
                        lineHeader.columnNumber === lineBody.columnNumber &&
                        lineBody.content + " "
                      )
                    })
                  })}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder="Select Column"
                    column_number={lineHeader.columnNumber}
                    selection
                    clearable
                    options={
                      this.props.productOffer
                        ? mappingProductOffer
                        : mappingProduct
                    }
                    onChange={this.selectMapping}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>
    )
  }

  selectMapping = (e, { column_number, value }) => {
    const mappedHeader = this.props.mappedHeader
      ? this.props.mappedHeader
      : [...this.state.newHeaders]
    const newHeaders = mappedHeader.map(line => {
      if (column_number === line.columnNumber) {
        line["header"] = value
        return line
      }
      return line
    })
    this.props.changeHeadersCSV(newHeaders)
  }
}

const mapDispatchToProps = {
  changeHeadersCSV
}

const mapStateToProps = state => {
  return {
    csvFileId: state.settings.fileCSVId,
    CSV: state.settings.CSV,
    mappedHeader: state.settings.mappedHeaders
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
