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
  getCSVMapEchoProduct,
  getCSVMapProductOffer,
  selectSavedMap
} from '../../../actions'

const mappingEchoProduct = [
  { text: <FormattedMessage id='global.alternativeNames' defaultMessage='Alternative Names' />, value: 'Alternative Names' },
  { text: <FormattedMessage id='global.appearance' defaultMessage='Appearance' />, value: 'Appearance' },
  { text: <FormattedMessage id='global.aspirationHazard' defaultMessage='Aspiration Hazard' />, value: 'Aspiration Hazard' },
  { text: <FormattedMessage id='global.autoIgnitionTemperature' defaultMessage='Auto Ignition Temperature' />, value: 'Auto Ignition Temperature' },
  { text: <FormattedMessage id='global.boilingPointRange' defaultMessage='Boiling Point Range' />, value: 'Boiling Point Range' },
  { text: <FormattedMessage id='global.chronicHealthHazard' defaultMessage='Chronic Health Hazard' />, value: 'Chronic Health Hazard' },
  { text: <FormattedMessage id='global.code' defaultMessage='Code' />, value: 'Code' },
  { text: <FormattedMessage id='global.conditionsToAvoid' defaultMessage='Conditions to Avoid' />, value: 'Conditions to Avoid' },
  { text: <FormattedMessage id='global.decompositionTemperature' defaultMessage='Decomposition Temperature' />, value: 'Decomposition Temperature' },
  { text: <FormattedMessage id='global.developmentalEffects' defaultMessage='Developmental Effects' />, value: 'Developmental Effects' },
  { text: <FormattedMessage id='global.dotHazardClass' defaultMessage='Dot Hazard Class' />, value: 'Dot Hazard Class' },
  { text: <FormattedMessage id='global.dotMarinePollutant' defaultMessage='Dot Marine Pollutant' />, value: 'Dot Marine Pollutant' },
  { text: <FormattedMessage id='global.dotProperShippingName' defaultMessage='Dot Proper Shipping Name' />, value: 'Dot Proper Shipping Name' },
  { text: <FormattedMessage id='global.dotProperTechnicalName' defaultMessage='Dot Proper Technical Name' />, value: 'Dot Proper Technical Name' },
  { text: <FormattedMessage id='global.dotReportableQuantity' defaultMessage='Dot Reportable Quantity' />, value: 'Dot Reportable Quantity' },
  { text: <FormattedMessage id='global.dotSevereMarinePollutant' defaultMessage='Dot Severe Marine Pollutant' />, value: 'Dot Severe Marine Pollutant' },
  { text: <FormattedMessage id='global.dotUnNumber' defaultMessage='Dot UN Number' />, value: 'Dot UN Number' },
  { text: <FormattedMessage id='global.elements' defaultMessage='Elements' />, value: 'Elements' },
  { text: <FormattedMessage id='global.emergencyNumber' defaultMessage='Emergency Number' />, value: 'Emergency Number' },
  { text: <FormattedMessage id='global.endocrineDisruptorInformation' defaultMessage='Endocrine Disruptor Information' />, value: 'Endocrine Disruptor Information' },
  { text: <FormattedMessage id='global.evaporationPoint' defaultMessage='Evaporation Point' />, value: 'Evaporation Point' },
  { text: <FormattedMessage id='global.eyeContact' defaultMessage='Eye Contact' />, value: 'Eye Contact' },
  { text: <FormattedMessage id='global.fireHazard' defaultMessage='Fire Hazard' />, value: 'Fire Hazard' },
  { text: <FormattedMessage id='global.flammability' defaultMessage='Flammability' />, value: 'Flammability' },
  { text: <FormattedMessage id='global.flammabilityOrExplosiveLower' defaultMessage='Flammability or Explosive Lower' />, value: 'Flammability or Explosive Lower' },
  { text: <FormattedMessage id='global.flammabilityOrExplosiveUpper' defaultMessage='Flammability or Explosive Upper' />, value: 'Flammability or Explosive Upper' },
  { text: <FormattedMessage id='global.flammabilitySolidGas' defaultMessage='Flammability Solid Gas' />, value: 'Flammability Solid Gas' },
  { text: <FormattedMessage id='global.flashPoint' defaultMessage='Flash Point' />, value: 'Flash Point' },
  { text: <FormattedMessage id='global.generalAdvice' defaultMessage='General Advice' />, value: 'General Advice' },
  { text: <FormattedMessage id='global.hazardClass' defaultMessage='Hazard Class' />, value: 'Hazard Class' },
  { text: <FormattedMessage id='global.hazardLabels' defaultMessage='Hazard Labels' />, value: 'Hazard Labels' },
  { text: <FormattedMessage id='global.hazardStatement' defaultMessage='Hazard Statement' />, value: 'Hazard Statement' },
  { text: <FormattedMessage id='global.hazardousDecompositionProducts' defaultMessage='Hazardous Decomposition Products' />, value: 'Hazardous Decomposition Products' },
  { text: <FormattedMessage id='global.hazardousPolymerization' defaultMessage='Hazardous Polymerization' />, value: 'Hazardous Polymerization' },
  { text: <FormattedMessage id='global.hazardousReactions' defaultMessage='Hazardous Reactions' />, value: 'Hazardous Reactions' },
  { text: <FormattedMessage id='global.healthHazard' defaultMessage='Health Hazard' />, value: 'Health Hazard' },
  { text: <FormattedMessage id='global.hmis' defaultMessage='HMIS' />, value: 'HMIS' },
  { text: <FormattedMessage id='global.hnoc' defaultMessage='HNOC' />, value: 'HNOC' },
  { text: <FormattedMessage id='global.iataHazardClass' defaultMessage='IATA Hazard Class' />, value: 'IATA Hazard Class' },
  { text: <FormattedMessage id='global.iataProperShippingName' defaultMessage='IATA Proper Shipping Name' />, value: 'IATA Proper Shipping Name' },
  { text: <FormattedMessage id='global.iataProperTechnicalName' defaultMessage='IATA Proper Technical Name' />, value: 'IATA Proper Technical Name' },
  { text: <FormattedMessage id='global.iataUnNumber' defaultMessage='IATA UN Number' />, value: 'IATA UN Number' },
  { text: <FormattedMessage id='global.imdgImoHazardClass' defaultMessage='IMDG IMO Hazard Class' />, value: 'IMDG IMO Hazard Class' },
  { text: <FormattedMessage id='global.imdgImoProperShippingName' defaultMessage='IMDG IMO Proper Shipping Name' />, value: 'IMDG IMO Proper Shipping Name' },
  { text: <FormattedMessage id='global.imdgImoProperTechnicalName' defaultMessage='IMDG IMO Proper Technical Name' />, value: 'IMDG IMO Proper Technical Name' },
  { text: <FormattedMessage id='global.imdgImoUnNumber' defaultMessage='IMDG IMO UN Number' />, value: 'IMDG IMO UN Number' },
  { text: <FormattedMessage id='global.incompatibleMaterials' defaultMessage='Incompatible Materials' />, value: 'Incompatible Materials' },
  { text: <FormattedMessage id='global.ingestion' defaultMessage='Ingestion' />, value: 'Ingestion' },
  { text: <FormattedMessage id='global.inhalation' defaultMessage='Inhalation' />, value: 'Inhalation' },
  { text: <FormattedMessage id='global.irritation' defaultMessage='Irritation' />, value: 'Irritation' },
  { text: <FormattedMessage id='global.labelElements' defaultMessage='Label Elements' />, value: 'Label Elements' },
  { text: <FormattedMessage id='global.manufacturer' defaultMessage='Manufacturer' />, value: 'Manufacturer' },
  { text: <FormattedMessage id='global.meltingPointRange' defaultMessage='Melting Point Range' />, value: 'Melting Point Range' },
  { text: <FormattedMessage id='global.mexicoGrade' defaultMessage='Mexico Grade' />, value: 'Mexico Grade' },
  { text: <FormattedMessage id='global.mfrProductCodes' defaultMessage='MFR Product Codes' />, value: 'MFR Product Codes' },
  { text: <FormattedMessage id='global.molecularFormula' defaultMessage='Molecular Formula' />, value: 'Molecular Formula' },
  { text: <FormattedMessage id='global.molecularWeight' defaultMessage='Molecular Weight' />, value: 'Molecular Weight' },
  { text: <FormattedMessage id='global.mostImportantSymptomsAndEffects' defaultMessage='Most Important Symptoms and Effects' />, value: 'Most Important Symptoms and Effects' },
  { text: <FormattedMessage id='global.mutagenicEffects' defaultMessage='Mutagenic Effects' />, value: 'Mutagenic Effects' },
  { text: <FormattedMessage id='global.name' defaultMessage='Name' />, value: 'Name' },
  { text: <FormattedMessage id='global.nfpa' defaultMessage='NFPA' />, value: 'NFPA' },
  { text: <FormattedMessage id='global.notesToPhysician' defaultMessage='Notes to Physician' />, value: 'Notes to Physician' },
  { text: <FormattedMessage id='global.odor' defaultMessage='Odor' />, value: 'Odor' },
  { text: <FormattedMessage id='global.odorThreshold' defaultMessage='Odor Threshold' />, value: 'Odor Threshold' },
  { text: <FormattedMessage id='global.oshaDefinedHazards' defaultMessage='OSHA Defined Hazards' />, value: 'OSHA Defined Hazards' },
  { text: <FormattedMessage id='global.otherAdverseEffects' defaultMessage='Other Adverse Effects' />, value: 'Other Adverse Effects' },
  { text: <FormattedMessage id='global.packagingGroup' defaultMessage='Packaging Group' />, value: 'Packaging Group' },
  { text: <FormattedMessage id='global.partitionCoefficient' defaultMessage='Partition Coefficient' />, value: 'Partition Coefficient' },
  { text: <FormattedMessage id='global.ph' defaultMessage='pH' />, value: 'pH' },
  { text: <FormattedMessage id='global.physicalHazard' defaultMessage='Physical Hazard' />, value: 'Physical Hazard' },
  { text: <FormattedMessage id='global.physicalState' defaultMessage='Physical State' />, value: 'Physical State' },
  { text: <FormattedMessage id='global.precautionaryStatements' defaultMessage='Precautionary Statements' />, value: 'Precautionary Statements' },
  { text: <FormattedMessage id='global.productLc50Inhalation' defaultMessage='Product LC50 Inhalation' />, value: 'Product LC50 Inhalation' },
  { text: <FormattedMessage id='global.productLd50Dermal' defaultMessage='Product LD50 Dermal' />, value: 'Product LD50 Dermal' },
  { text: <FormattedMessage id='global.productLd50Oral' defaultMessage='Product LD50 Oral' />, value: 'Product LD50 Oral' },
  { text: <FormattedMessage id='global.reactiveHazard' defaultMessage='Reactive Hazard' />, value: 'Reactive Hazard' },
  { text: <FormattedMessage id='global.reactivityHazard' defaultMessage='Reactivity Hazard' />, value: 'Reactivity Hazard' },
  { text: <FormattedMessage id='global.recommendedUse' defaultMessage='Recommended Use' />, value: 'Recommended Use' },
  { text: <FormattedMessage id='global.reproductiveEffects' defaultMessage='Reproductive Effects' />, value: 'Reproductive Effects' },
  { text: <FormattedMessage id='global.revisionDate' defaultMessage='Revision Date' />, value: 'Revision Date' },
  { text: <FormattedMessage id='global.sdsIssueDate' defaultMessage='SDS Issue Date' />, value: 'SDS Issue Date' },
  { text: <FormattedMessage id='global.sdsPreparedBy' defaultMessage='SDS Prepared by' />, value: 'SDS Prepared by' },
  { text: <FormattedMessage id='global.sensitization' defaultMessage='Sensitization' />, value: 'Sensitization' },
  { text: <FormattedMessage id='global.signalWord' defaultMessage='Signal Word' />, value: 'Signal Word' },
  { text: <FormattedMessage id='global.skinContact' defaultMessage='Skin Contact' />, value: 'Skin Contact' },
  { text: <FormattedMessage id='global.solubility' defaultMessage='Solubility' />, value: 'Solubility' },
  { text: <FormattedMessage id='global.specialHazard' defaultMessage='Special Hazard' />, value: 'Special Hazard' },
  { text: <FormattedMessage id='global.specificGravity' defaultMessage='Specific Gravity' />, value: 'Specific Gravity' },
  { text: <FormattedMessage id='global.stability' defaultMessage='Stability' />, value: 'Stability' },
  { text: <FormattedMessage id='global.stotRepeatedExposure' defaultMessage='STOT Repeated Exposure' />, value: 'STOT Repeated Exposure' },
  { text: <FormattedMessage id='global.stotSingleExposure' defaultMessage='STOT Single Exposure' />, value: 'STOT Single Exposure' },
  { text: <FormattedMessage id='global.supplementalInformation' defaultMessage='Supplemental Information' />, value: 'Supplemental Information' },
  { text: <FormattedMessage id='global.symptomsEffects' defaultMessage='Symptoms Effects' />, value: 'Symptoms Effects' },
  { text: <FormattedMessage id='global.tdgHazardClass' defaultMessage='TDG Hazard Class' />, value: 'TDG Hazard Class' },
  { text: <FormattedMessage id='global.tdgProperShippingName' defaultMessage='TDG Proper Shipping Name' />, value: 'TDG Proper Shipping Name' },
  { text: <FormattedMessage id='global.tdgProperTechnicalName' defaultMessage='TDG Proper Technical Name' />, value: 'TDG Proper Technical Name' },
  { text: <FormattedMessage id='global.tdgUnNumber' defaultMessage='TDG UN Number' />, value: 'TDG UN Number' },
  { text: <FormattedMessage id='global.teratogenicity' defaultMessage='Teratogenicity' />, value: 'Teratogenicity' },
  { text: <FormattedMessage id='global.unNumber' defaultMessage='UN Number' />, value: 'UN Number' },
  { text: <FormattedMessage id='global.unShippingName' defaultMessage='UN Shipping Name' />, value: 'UN Shipping Name' },
  { text: <FormattedMessage id='global.usesAdvisedAgainst' defaultMessage='Uses Advised against' />, value: 'Uses Advised against' },
  { text: <FormattedMessage id='global.vaporDensity' defaultMessage='Vapor Density' />, value: 'Vapor Density' },
  { text: <FormattedMessage id='global.vaporPressure' defaultMessage='Vapor Pressure' />, value: 'Vapor Pressure' },
  { text: <FormattedMessage id='global.versionNumber' defaultMessage='Version Number' />, value: 'Version Number' },
  { text: <FormattedMessage id='global.viscosity' defaultMessage='Viscosity' />, value: 'Viscosity' },
  { text: <FormattedMessage id='global.wasteDisposalMethods' defaultMessage='Waste Disposal Methods' />, value: 'Waste Disposal Methods' }
]

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
  { text: <FormattedMessage id='global.anonymous' defaultMessage='Anonymous' />, value: 'Anonymous' },
  { text: <FormattedMessage id='global.assayMax' defaultMessage='Assay Max' />, value: 'Assay Max' },
  { text: <FormattedMessage id='global.assayMin' defaultMessage='Assay Min' />, value: 'Assay Min' },
  { text: <FormattedMessage id='global.companyProduct' defaultMessage='Company Product' />, value: 'Company Product' },
  { text: <FormattedMessage id='global.cost' defaultMessage='Cost' />, value: 'Cost' },
  { text: <FormattedMessage id='global.currency' defaultMessage='Currency' />, value: 'Currency' },
  { text: <FormattedMessage id='global.description' defaultMessage='Description' />, value: 'Description' },
  { text: <FormattedMessage id='global.externalNotes' defaultMessage='External Notes' />, value: 'External Notes' },
  { text: <FormattedMessage id='global.inStock' defaultMessage='In Stock' />, value: 'In Stock' },
  { text: <FormattedMessage id='global.internalNotes' defaultMessage='Internal Notes' />, value: 'Internal Notes' },
  { text: <FormattedMessage id='global.lots' defaultMessage='Lots' />, value: 'Lots' },
  { text: <FormattedMessage id='global.manufacturer' defaultMessage='Manufacturer' />, value: 'Manufacturer' },
  { text: <FormattedMessage id='global.minimum' defaultMessage='Minimum' />, value: 'Minimum' },
  { text: <FormattedMessage id='global.origin' defaultMessage='Origin' />, value: 'Origin' },
  { text: <FormattedMessage id='global.pricingTiers' defaultMessage='Pricing Tiers' />, value: 'Pricing Tiers' },
  { text: <FormattedMessage id='global.processingTimeDays' defaultMessage='Processing Time-Days' />, value: 'Processing Time-Days' },
  { text: <FormattedMessage id='global.productCondition' defaultMessage='Product Condition' />, value: 'Product Condition' },
  { text: <FormattedMessage id='global.productForm' defaultMessage='Product Form' />, value: 'Product Form' },
  { text: <FormattedMessage id='global.productGrades' defaultMessage='Product Grades' />, value: 'Product Grades' },
  { text: <FormattedMessage id='global.splits' defaultMessage='Splits' />, value: 'Splits' },
  { text: <FormattedMessage id='global.validityDate' defaultMessage='Validity Date' />, value: 'Validity Date' },
  { text: <FormattedMessage id='global.warehouseName' defaultMessage='Warehouse Name' />, value: 'Warehouse Name' }
]

class Map extends Component {
  state = {
    newHeaders: null,
    isSavedMap: false,
    options: [],
    values: []
  }

  componentDidMount() {
    if (this.props.productOffer)
      this.props.getCSVMapProductOffer()
    if (this.props.echoProduct)
      this.props.getCSVMapEchoProduct()

    this.setState({ newHeaders: this.props.CSV.headerCSV })

    let a = (this.props.productOffer ? mappingProductOffer : (this.props.echoProduct ?  mappingEchoProduct : mappingProduct)).sort(function (a, b) {
      let x = a.value.toLowerCase()
      let y = b.value.toLowerCase()
      if (x < y) { return -1 }
      if (x > y) { return 1 }
      return 0
    })

    let ar = []
    for (let i = 0; i < this.props.CSV.headerCSV.length; i++) ar.push(Array.from(a))

    this.setState({ options: ar, values:  Array(this.props.CSV.headerCSV.length).fill('') })
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
        {(this.props.productOffer || this.props.echoProduct) && (
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
              {CSV.headerCSV.map((lineHeader) => (
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
                        this.state.options[lineHeader.columnNumber]
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

    let options = this.state.options
    let values = this.state.values

    let previousValue = values[column_number]
    values[column_number] = value

    let opts = this.props.productOffer ? mappingProductOffer : mappingProduct
    let indexAdd = opts.findIndex(obj => obj.value === previousValue)

    for (let i = 0; i < options.length; i++) {
      if (i !== column_number) {
        // Add previous value to all dropdowns options
        if (indexAdd >= 0) options[i].push(opts[indexAdd])
        // Remove new value from all dropdowns options
        let indexRemove = options[i].findIndex(obj => obj.value === value)
        if (indexRemove >= 0) options[i].splice(indexRemove, 1)
        // Sort alphabetically
        options[i].sort(function (a, b) {
          let x = a.value.toLowerCase()
          let y = b.value.toLowerCase()
          if (x < y) { return -1 }
          if (x > y) { return 1 }
          return 0
        })
      }
    }
    this.setState({ options: options, values:  values })

    this.props.changeHeadersCSV(newHeaders)
  }
}

const mapDispatchToProps = {
  changeHeadersCSV,
  handleSaveMapCSV,
  handleChangeMapCSVName,
  getCSVMapEchoProduct,
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
