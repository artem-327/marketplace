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

import { getSafe } from '~/utils/functions'

const simpleEchoProductList = [
  "alternativeNamesMapper",
  "appearanceMapper",
  "aspirationHazardMapper",
  "autoIgnitionTemperatureMapper",
  "boilingPointRangeMapper",
  "codeMapper",
  "conditionsToAvoidMapper",
  "decompositionTemperatureMapper",
  "developmentalEffectsMapper",
  "dotHazardClassMapper",
  "dotHazardLabelMapper",
  "dotMarinePollutantMapper",
  "dotPackagingGroupMapper",
  "dotProperShippingNameMapper",
  "dotProperTechnicalNameMapper",
  "dotReportableQuantityMapper",
  "dotSevereMarinePollutantMapper",
  "dotUnNumberMapper",
  "elementsMapper",
  "emergencyPhoneMapper",
  "endocrineDisruptorInformationMapper",
  "evaporationPointMapper",
  "eyeContactMapper",
  "flammabilityOrExplosiveLowerMapper",
  "flammabilityOrExplosiveUpperMapper",
  "flammabilitySolidGasMapper",
  "flashPointMapper",
  "generalAdviceMapper",
  "hazardStatementMapper",
  "hazardousDecompositionProductsMapper",
  "hazardousPolymerizationMapper",
  "hazardousReactionsMapper",
  "hmisChronicHealthHazardMapper",
  "hmisFlammabilityMapper",
  "hmisHealthHazardMapper",
  "hmisPhysicalHazardMapper",
  "hnocMapper",
  "iataHazardClassMapper",
  "iataHazardLabelMapper",
  "iataPackagingGroupMapper",
  "iataProperShippingNameMapper",
  "iataProperTechnicalNameMapper",
  "iataUnNumberMapper",
  "imdgImoHazardClassMapper",
  "imdgImoHazardLabelMapper",
  "imdgImoPackagingGroupMapper",
  "imdgImoProperShippingNameMapper",
  "imdgImoProperTechnicalNameMapper",
  "imdgImoUnNumberMapper",
  "incompatibleMaterialsMapper",
  "ingestionMapper",
  "inhalationMapper",
  "irritationMapper",
  "labelElementsMapper",
  "manufacturerMapper",
  "meltingPointRangeMapper",
  "mexicoGradeMapper",
  "mfrProductCodesMapper",
  "molecularFormulaMapper",
  "molecularWeightMapper",
  "mostImportantSymptomsAndEffectsMapper",
  "mutagenicEffectsMapper",
  "nameMapper",
  "nfpaFireHazardMapper",
  "nfpaHealthHazardMapper",
  "nfpaReactivityHazardMapper",
  "nfpaSpecialHazardMapper",
  "notesToPhysicianMapper",
  "odorMapper",
  "odorThresholdMapper",
  "oshaDefinedHazardsMapper",
  "otherAdverseEffectsMapper",
  "packagingGroupMapper",
  "partitionCoefficientMapper",
  "phMapper",
  "physicalStateMapper",
  "precautionaryStatementsMapper",
  "productLc50InhalationMapper",
  "productLd50DermalMapper",
  "productLd50OralMapper",
  "reactiveHazardMapper",
  "recommendedUseMapper",
  "reproductiveEffectsMapper",
  "sdsIssuedDateMapper",
  "sdsPreparedByMapper",
  "sdsRevisionDateMapper",
  "sdsVersionNumberMapper",
  "sensitizationMapper",
  "signalWordMapper",
  "skinContactMapper",
  "solubilityMapper",
  "specificGravityMapper",
  "stabilityMapper",
  "stotRepeatedExposureMapper",
  "stotSingleExposureMapper",
  "supplementalInformationMapper",
  "symptomsEffectsMapper",
  "tdgHazardClassMapper",
  "tdgHazardLabelMapper",
  "tdgPackagingGroupMapper",
  "tdgProperShippingNameMapper",
  "tdgProperTechnicalNameMapper",
  "tdgUnNumberMapper",
  "tdsIssuedDateMapper",
  "tdsPreparedByMapper",
  "tdsRevisionDateMapper",
  "tdsVersionNumberMapper",
  "teratogenicityMapper",
  "usesAdvisedAgainstMapper",
  "vaporDensityMapper",
  "vaporPressureMapper",
  "viscosityMapper",
  "wasteDisposalMethodsMapper"
]

const simpleCompanyProductList = [
  "echoProduct",
  "freezeProtectMapper",
  "freightClassMapper",
  "hazardousMapper",
  "inciNameMapper",
  "intProductCodeMapper",
  "intProductNameMapper",
  "nmfcNumberMapper",
  "packagingSizeMapper",
  "packagingTypeMapper",
  "packagingUnitMapper",
  "stackableMapper",
]

const simpleProductOfferList = [
  "anonymousMapper",
  "assayMaxMapper",
  "assayMinMapper",
  "companyProductMapper",
  "conditionMapper",
  "costPerUomMapper",
  "currencyMapper",
  "externalNotesMapper",
  "formMapper",
  "gradesMapper",
  "inStockMapper",
  "internalNotesMapper",
  "lotsMapper",
  "minPkgMapper",
  "originMapper",
  "pricingTiersMapper",
  "processingTimeDaysMapper",
  "splitPkgMapper",
  "validityDateMapper",
  "warehouseNameMapper"
]

class Map extends Component {
  state = {
    newHeaders: null,
    isSavedMap: false,
    options: [],
    values: [],
    mapping: []
  }

  getMapping = (mapperList) => {
    const { intl: { formatMessage }} = this.props

    return mapperList.map(option => {
      return {
        text: formatMessage({ id: `global.${option.replace(/Mapper$/gi, '')}`, defaultMessage: option.replace(/Mapper$/gi, '') }),
        value: option
      }
    })
  }

  componentDidMount = async() => {
    const { intl: { formatMessage }} = this.props
    let { mapping } = this.state
    if (this.props.productOffer) {
      this.props.getCSVMapProductOffer()
      const mappingProductOffer = this.getMapping(simpleProductOfferList)
      mapping = mappingProductOffer
    }
    else if (this.props.echoProduct) {
      this.props.getCSVMapEchoProduct()
      const mappingEchoProduct = this.getMapping(simpleEchoProductList)
      mapping = mappingEchoProduct
    }
    else {
      const mappingCompanyProduct = this.getMapping(simpleCompanyProductList)
      mapping = mappingCompanyProduct
    }

    this.setState({ newHeaders: this.props.CSV.headerCSV, mapping: mapping })

    let a = (mapping).sort(function (a, b) {
      let x = a.text.toLowerCase()
      let y = b.text.toLowerCase()
      if (x < y) { return -1 }
      if (x > y) { return 1 }
      return 0
    })

    let ar = []
    for (let i = 0; i < this.props.CSV.headerCSV.length; i++) ar.push(Array.from(a))

    // try to prefill dropdowns
    let values = Array(this.props.CSV.headerCSV.length).fill('')
    if (!this.props.mappedHeader) {
      const newHeaders = this.props.CSV.headerCSV
      values = values.map((value, vIndex) => {
        const content = newHeaders[vIndex].content.toLowerCase()
        const foundItem = ar[vIndex].find(option => option.value.toLowerCase() === content || option.text.toLowerCase() === content)

        if (foundItem) {
          newHeaders[vIndex].header = foundItem.value
          ar = this.removeValueFromOptions(ar, getSafe(() => foundItem.value, null), vIndex)
        }

        return getSafe(() => foundItem.value, '')
      })

      this.props.changeHeadersCSV(newHeaders)
    } else {
      values = values.map((value, vIndex) => {
        const indexMap = this.props.mappedHeader[vIndex]

        if (indexMap.header)
          ar = this.removeValueFromOptions(ar, indexMap.header, vIndex)

        return getSafe(() => indexMap.header, '')
      })
    }

    this.setState({ options: ar, values: values })
  }

  removeValueFromOptions = (options, value, notIndex) => {
    for (let i = 0; i < options.length; i++) {
      if (i !== notIndex) {
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

    return options
  }

  render() {
    const { CSV, intl: { formatMessage } } = this.props

    const optionMaps =
      this.props.maps &&
      this.props.maps.map(map => ({
        text: map.mapName,
        value: map.id
      }))

    const { values } = this.state

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
          {CSV && values.length /* values.length is necessary for defaultValue */ && (
            <Table.Body>
              {CSV.headerCSV.map((lineHeader, lineIndex) => (
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
                      selectOnBlur={false}
                      data-test='settings_product_import_csv_column_drpdn'
                      defaultValue={getSafe(() => values[lineIndex], '')}
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
    const { mapping } = this.state
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

    let opts = mapping
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
          let x = a.text.toLowerCase()
          let y = b.text.toLowerCase()
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
