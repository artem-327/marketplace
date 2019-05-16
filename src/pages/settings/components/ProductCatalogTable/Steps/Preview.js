import React, { Component } from "react"
import { connect } from "react-redux"

import { Table } from "semantic-ui-react"

import { dataHeaderCSV } from "../../../actions"

const mapProduct = {
  "CAS Number": "casNumberMapper",
  "Packaging Minimum": "packagingMinimumMapper",
  "Packaging Size": "packagingSizeMapper",
  "Packaging Splits": "packagingSplitsMapper",
  "Packaging Type": "packagingTypeNameMapper",
  Unit: "packagingUnitNameMaper",
  "Product Name": "productNameMapper"
}

const mapProductOffer = {
  "Assay Max": "assayMaxMapper",
  "Assay Min": "assayMinMapper",
  "CAS Product Number": "casProductNumberMapper",
  "Expiration Date": "expirationDateMapper",
  "External Notes": "externalNotesMapper",
  "Hazard Class": "hazardClassMapper",
  "Internal Notes": "internalNotesMapper",
  "Lot Manufactured Date": "lotManufacturedDateMapper",
  "Lot Number": "lotNumberMapper",
  "Lot Pkg Amount": "lotPkgAmountMapper",
  "Manufacturer Name": "manufacturerNameMapper",
  "Origin Name": "originNameMapper",
  "Packaging Group": "packagingGroupMapper",
  "Packaging Minimum": "packagingMinimumMapper",
  "Packaging Size": "packagingSizeMapper",
  "Packaging Splits": "packagingSplitsMapper",
  "Packaging Type Name": "packagingTypeNameMapper",
  "Packaging Unit Name": "packagingUnitNameMapper",
  "Pricing Cost": "pricingCostMapper",
  "Pricing Price": "pricingPriceMapper",
  "Product Code": "productCodeMapper",
  "Product Condition Name": "productConditionNameMapper",
  "Product Form Name": "productFormNameMapper",
  "Product Grade Name": "productGradeNameMapper",
  "Product Name": "productNameMapper",
  "Trade Name": "tradeNameMapper",
  "UN Number": "unNumberMapper",
  "Warehouse Name": "warehouseNameMapper"
}

class Preview extends Component {
  constructor(props) {
    const filteredHeader =
      props.mappedHeader &&
      props.mappedHeader.filter(column => {
        return column.header
      })
    super(props)
    this.state = {
      filteredHeader: filteredHeader || null
    }
  }

  componentDidMount() {
    const Name = this.props.productOffer && "test"
    let key
    const data =
      this.state.filteredHeader &&
      this.state.filteredHeader.reduce(
        (prev, next) => {
          if (this.props.productOffer) {
            key = mapProductOffer[next.header]
          } else {
            key = mapProduct[next.header]
          }
          prev[key] = next.content
          return prev
        },
        { headerLine: true, mapName: Name }
      )
    data && this.props.dataHeaderCSV(data)
  }

  render() {
    const { CSV } = this.props
    const { filteredHeader } = this.state

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
                )
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

const mapDispatchToProps = {
  dataHeaderCSV
}

const mapStateToProps = state => {
  return {
    mappedHeader: state.settings.mappedHeaders,
    CSV: state.settings.CSV
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview)
