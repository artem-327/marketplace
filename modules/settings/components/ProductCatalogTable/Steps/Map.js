import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FormattedMessage, injectIntl } from 'react-intl'

import {
  Table,
  Dropdown,
  Grid,
  Input,
  Select,
  Checkbox
} from 'semantic-ui-react'

import {
  changeHeadersCSV,
  handleSaveMapCSV,
  handleChangeMapCSVName,
  getCSVMapProductOffer,
  selectSavedMap
} from '../../../actions'

const mappingProduct = [
  { text: <FormattedMessage id='global.casNumber' defaultMessage='CAS Number' />, value: 'CAS Number' },
  { text: <FormattedMessage id='global.packagingMinimum' defaultMessage='Packaging Minimum' />, value: 'Packaging Minimum' },
  { text: <FormattedMessage id='global.packagingSize' defaultMessage='Packaging Size' />, value: 'Packaging Size' },
  { text: <FormattedMessage id='global.packagingSplits' defaultMessage='Packaging Splits' />, value: 'Packaging Splits' },
  { text: <FormattedMessage id='global.packagingType' defaultMessage='Packaging Type' />, value: 'Packaging Type' },
  { text: <FormattedMessage id='global.unit' defaultMessage='Unit' />, value: 'Unit' },
  { text: <FormattedMessage id='global.productName' defaultMessage='Product Name' />, value: 'Product Name' }
]

const mappingProductOffer = [
  { text: <FormattedMessage id='global.assayMax' defaultMessage='Assay Max' />, value: 'Assay Max' },
  { text: <FormattedMessage id='global.assayMin' defaultMessage='Assay Min' />, value: 'Assay Min' },
  { text: <FormattedMessage id='global.casProductNumber' defaultMessage='CAS Product Number' />, value: 'CAS Product Number' },
  { text: <FormattedMessage id='global.expirationDate' defaultMessage='Expiration Date' />, value: 'Expiration Date' },
  { text: <FormattedMessage id='global.externalNotes' defaultMessage='External Notes' />, value: 'External Notes' },
  { text: <FormattedMessage id='global.hazardClass' defaultMessage='Hazard Class' />, value: 'Hazard Class' },
  { text: <FormattedMessage id='global.internalNotes' defaultMessage='Internal Notes' />, value: 'Internal Notes' },
  { text: <FormattedMessage id='global.lotManufacturedDate' defaultMessage='Lot Manufactured Date' />, value: 'Lot Manufactured Date' },
  { text: <FormattedMessage id='global.lotNumber' defaultMessage='Lot Number' />, value: 'Lot Number' },
  { text: <FormattedMessage id='global.lotPkgAmount' defaultMessage='Lot Pkg Amount' />, value: 'Lot Pkg Amount' },
  { text: <FormattedMessage id='global.manufacturedName' defaultMessage='Manufacturer Name' />, value: 'Manufacturer Name' },
  { text: <FormattedMessage id='global.originName' defaultMessage='Origin Name' />, value: 'Origin Name' },
  { text: <FormattedMessage id='global.packagingGroup' defaultMessage='Packaging Group' />, value: 'Packaging Group' },
  { text: <FormattedMessage id='global.packagingMinimum' defaultMessage='Packaging Minimum' />, value: 'Packaging Minimum' },
  { text: <FormattedMessage id='global.packagingSize' defaultMessage='Packaging Size' />, value: 'Packaging Size' },
  { text: <FormattedMessage id='global.packagingSplits' defaultMessage='Packaging Splits' />, value: 'Packaging Splits' },
  { text: <FormattedMessage id='global.packagingTypeName' defaultMessage='Packaging Type Name' />, value: 'Packaging Type Name' },
  { text: <FormattedMessage id='global.packagingUnitName' defaultMessage='Packaging Unit Name' />, value: 'Packaging Unit Name' },
  { text: <FormattedMessage id='global.pricingCost' defaultMessage='Pricing Cost' />, value: 'Pricing Cost' },
  { text: <FormattedMessage id='global.pricingPrice' defaultMessage='Pricing Price' />, value: 'Pricing Price' },
  { text: <FormattedMessage id='global.productCode' defaultMessage='Product Code' />, value: 'Product Code' },
  { text: <FormattedMessage id='global.productConditionName' defaultMessage='Product Condition Name' />, value: 'Product Condition Name' },
  { text: <FormattedMessage id='global.productFormName' defaultMessage='Product Form Name' />, value: 'Product Form Name' },
  { text: <FormattedMessage id='global.productGradeName' defaultMessage='Product Grade Name' />, value: 'Product Grade Name' },
  { text: <FormattedMessage id='global.productName' defaultMessage='Product Name' />, value: 'Product Name' },
  { text: <FormattedMessage id='global.tradeName' defaultMessage='Trade Name' />, value: 'Trade Name' },
  { text: <FormattedMessage id='global.unNumber' defaultMessage='UN Number' />, value: 'UN Number' },
  { text: <FormattedMessage id='global.warehouseName' defaultMessage='Warehouse Name' />, value: 'Warehouse Name' }
]

class Map extends Component {
  state = {
    newHeaders: null,
    isSavedMap: false
  }

  componentDidMount() {
    // this.props.getCSVMapProductOffer()
    this.setState({ newHeaders: this.props.CSV.headerCSV })
  }

  render() {
    const { CSV, intl: { formatMessage } } = this.props

    const optionMaps =
      this.props.maps &&
      this.props.maps.map(map => ({
        text: map.mapName,
        value: map.id
      }))

    return (
      <React.Fragment>
        {this.props.productOffer && (
          <Grid centered padded>
            <Grid.Row verticalAlign='middle' columns={3}>
              <Grid.Column textAlign='center'>
                <Select
                  placeholder={formatMessage({ id: 'settings.selectSavedMap', defaultMessage: 'Select your saved map' })}
                  options={optionMaps}
                  clearable
                  //disabled={!optionMaps}
                  onChange={this.selectSavedMap}
                  data-test='settings_product_import_select_map'
                />
              </Grid.Column>
              <Grid.Column textAlign='center' data-test='settings_product_import_csv_name_inp'>
                <Input placeholder={formatMessage({ id: 'settings.', defaultMessage: 'Map Name' })} onChange={this.inputMapName} />
              </Grid.Column>
              <Grid.Column textAlign='center' verticalAlign='middle'>
                <Checkbox label={formatMessage({ id: 'settings.saveMyMap', defaultMessage: 'Save my map' })} onChange={this.checkboxChange} data-test='settings_product_import_csv_save_chckb' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        <Table celled padded textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><FormattedMessage id='settings.csvColumns' defaultMessage='CSV Columns' /></Table.HeaderCell>
              <Table.HeaderCell><FormattedMessage id='settings.csvPreview' defaultMessage='CSV Preview' /></Table.HeaderCell>
              <Table.HeaderCell><FormattedMessage id='settings.mapping' defaultMessage='Mapping' /></Table.HeaderCell>
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
                          lineBody.content + ' '
                        )
                      })
                    })}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={formatMessage({ id: 'settings.selectColumn', defaultMessage: 'Select Column' })}
                      column_number={lineHeader.columnNumber}
                      selection
                      clearable
                      options={
                        this.props.productOffer
                          ? mappingProductOffer
                          : mappingProduct
                      }
                      disabled={!!this.props.selectedSavedMap}
                      onChange={this.selectMapping}
                      data-test='settings_product_import_csv_column_drpdn'
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </Table>
      </React.Fragment>
    )
  }

  selectSavedMap = (e, { value }) => {
    const selectedMap = this.props.maps.filter(map => {
      return map.id === value
    })
    this.props.selectSavedMap(selectedMap[0])
  }

  inputMapName = e => {
    this.props.handleChangeMapCSVName(e.target.value)
  }

  checkboxChange = () => {
    this.props.handleSaveMapCSV()
  }

  selectMapping = (e, { column_number, value }) => {
    const mappedHeader = this.props.mappedHeader
      ? this.props.mappedHeader
      : [...this.state.newHeaders]
    const newHeaders = mappedHeader.map(line => {
      if (column_number === line.columnNumber) {
        line['header'] = value
        return line
      }
      return line
    })
    this.props.changeHeadersCSV(newHeaders)
  }
}

const mapDispatchToProps = {
  changeHeadersCSV,
  handleSaveMapCSV,
  handleChangeMapCSVName,
  getCSVMapProductOffer,
  selectSavedMap
}

const mapStateToProps = state => {
  return {
    csvFileId: state.settings.fileCSVId,
    CSV: state.settings.CSV,
    mappedHeader: state.settings.mappedHeaders,
    maps: state.settings.maps,
    selectedSavedMap: state.settings.selectedSavedMap
  }
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(Map))
