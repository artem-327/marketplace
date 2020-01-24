import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FormattedMessage, injectIntl } from 'react-intl'

import { Table, Dropdown, Grid, Input, Select, Checkbox, Button } from 'semantic-ui-react'

import {
  changeHeadersCSV,
  handleSaveMapCSV,
  handleChangeMapCSVName,
  getCSVMapEchoProduct,
  getCSVMapProductOffer,
  selectSavedMap,
  postCSVMapEchoProduct,
  putCSVMapEchoProduct,
  deleteCSVMapEchoProduct,
  postCSVMapProductOffer,
  putCSVMapProductOffer,
  deleteCSVMapProductOffer
} from '../../../actions'

import { getSafe, generateToastMarkup } from '~/utils/functions'
import _invert from 'lodash/invert'
import { withToastManager } from 'react-toast-notifications'
import styled from 'styled-components'

const MapTable = styled(Table)`
  width: 100%;
  max-width: 100%;
`

const SmallerTableCell = styled(Table.Cell)`
  font-size: 0.8em;
`

const ColumnName = styled(Table.Cell)`
  width: 12.5%;
`

const Mapping = styled(Table.Cell)`
  width: 25%;
`

const simpleEchoProductList = {
  constant: 'global',
  required: ['codeMapper', 'elementsMapper', 'nameMapper'],
  optional: [
    'alternativeNamesMapper',
    'appearanceMapper',
    'aspirationHazardMapper',
    'autoIgnitionTemperatureMapper',
    'boilingPointRangeMapper',
    'conditionsToAvoidMapper',
    'decompositionTemperatureMapper',
    'developmentalEffectsMapper',
    'dotHazardClassMapper',
    'dotHazardLabelMapper',
    'dotMarinePollutantMapper',
    'dotPackagingGroupMapper',
    'dotProperShippingNameMapper',
    'dotProperTechnicalNameMapper',
    'dotReportableQuantityMapper',
    'dotSevereMarinePollutantMapper',
    'dotUnNumberMapper',
    'emergencyPhoneMapper',
    'endocrineDisruptorInformationMapper',
    'evaporationPointMapper',
    'eyeContactMapper',
    'flammabilityOrExplosiveLowerMapper',
    'flammabilityOrExplosiveUpperMapper',
    'flammabilitySolidGasMapper',
    'flashPointMapper',
    'generalAdviceMapper',
    'hazardStatementMapper',
    'hazardousDecompositionProductsMapper',
    'hazardousPolymerizationMapper',
    'hazardousReactionsMapper',
    'hmisChronicHealthHazardMapper',
    'hmisFlammabilityMapper',
    'hmisHealthHazardMapper',
    'hmisPhysicalHazardMapper',
    'hnocMapper',
    'iataHazardClassMapper',
    'iataHazardLabelMapper',
    'iataPackagingGroupMapper',
    'iataProperShippingNameMapper',
    'iataProperTechnicalNameMapper',
    'iataUnNumberMapper',
    'imdgImoHazardClassMapper',
    'imdgImoHazardLabelMapper',
    'imdgImoPackagingGroupMapper',
    'imdgImoProperShippingNameMapper',
    'imdgImoProperTechnicalNameMapper',
    'imdgImoUnNumberMapper',
    'incompatibleMaterialsMapper',
    'ingestionMapper',
    'inhalationMapper',
    'irritationMapper',
    'labelElementsMapper',
    'manufacturerMapper',
    'meltingPointRangeMapper',
    'mexicoGradeMapper',
    'mfrProductCodesMapper',
    'molecularFormulaMapper',
    'molecularWeightMapper',
    'mostImportantSymptomsAndEffectsMapper',
    'mutagenicEffectsMapper',
    'nfpaFireHazardMapper',
    'nfpaHealthHazardMapper',
    'nfpaReactivityHazardMapper',
    'nfpaSpecialHazardMapper',
    'notesToPhysicianMapper',
    'odorMapper',
    'odorThresholdMapper',
    'oshaDefinedHazardsMapper',
    'otherAdverseEffectsMapper',
    'packagingGroupMapper',
    'partitionCoefficientMapper',
    'phMapper',
    'physicalStateMapper',
    'precautionaryStatementsMapper',
    'productLc50InhalationMapper',
    'productLd50DermalMapper',
    'productLd50OralMapper',
    'reactiveHazardMapper',
    'recommendedUseMapper',
    'reproductiveEffectsMapper',
    'sdsIssuedDateMapper',
    'sdsPreparedByMapper',
    'sdsRevisionDateMapper',
    'sdsVersionNumberMapper',
    'sensitizationMapper',
    'signalWordMapper',
    'skinContactMapper',
    'solubilityMapper',
    'specificGravityMapper',
    'stabilityMapper',
    'stotRepeatedExposureMapper',
    'stotSingleExposureMapper',
    'supplementalInformationMapper',
    'symptomsEffectsMapper',
    'tdgHazardClassMapper',
    'tdgHazardLabelMapper',
    'tdgPackagingGroupMapper',
    'tdgProperShippingNameMapper',
    'tdgProperTechnicalNameMapper',
    'tdgUnNumberMapper',
    'tdsIssuedDateMapper',
    'tdsPreparedByMapper',
    'tdsRevisionDateMapper',
    'tdsVersionNumberMapper',
    'teratogenicityMapper',
    'usesAdvisedAgainstMapper',
    'vaporDensityMapper',
    'vaporPressureMapper',
    'viscosityMapper',
    'wasteDisposalMethodsMapper'
  ]
}

const simpleCompanyProductList = {
  constant: 'global',
  required: [
    'freightClassMapper',
    'intProductCodeMapper',
    'intProductNameMapper',
    'nmfcNumberMapper',
    'packageWeightMapper',
    'packageWeightUnitMapper',
    'packagingSizeMapper',
    'packagingTypeMapper',
    'packagingUnitMapper',
    'stackableMapper'
  ],
  optional: [
    'echoProduct',
    'freezeProtectMapper',
    'hazardousMapper',
    'inciNameMapper',
    'packagesPerPalletMapper'
  ]
}

const simpleProductOfferList = {
  constant: 'import',
  required: ['companyProductMapper', 'pkgAvailableMapper', 'pricingTiersMapper', 'warehouseNameMapper'],
  optional: [
    'assayMaxMapper',
    'assayMinMapper',
    'broadcastedMapper',
    'conformingMapper', // condition removed, conformin instead of it
    'conditionNotesMapper',
    'costPerUomMapper',
    'costRecordsMapper',
    'currencyMapper',
    'externalNotesMapper',
    'formMapper',
    'gradesMapper',
    'inStockMapper',
    'internalNotesMapper',
    'leadTimeMapper',
    'lotExpirationDateMapper',
    'lotManufacturedDateMapper',
    'lotNumberMapper',
    'minPkgMapper',
    'originMapper',
    'splitPkgMapper',
    'validityDateMapper'
  ]
}

class Map extends Component {
  state = {
    newHeaders: null,
    isSavedMap: false,
    options: [],
    values: [],
    mapping: [],
    constant: ''
  }

  getMapping = mapperList => {
    const {
      intl: { formatMessage }
    } = this.props

    return mapperList.required
      .map(option => {
        return {
          text: formatMessage({
            id: `${mapperList.constant}.${option.replace(/Mapper$/gi, '')}`,
            defaultMessage: option.replace(/Mapper$/gi, '')
          }),
          value: option,
          required: true
        }
      })
      .concat(
        mapperList.optional.map(option => {
          return {
            text: formatMessage({
              id: `${mapperList.constant}.${option.replace(/Mapper$/gi, '')}`,
              defaultMessage: option.replace(/Mapper$/gi, '')
            }),
            value: option
          }
        })
      )
  }

  componentDidMount = async () => {
    const {
      intl: { formatMessage }
    } = this.props
    let { mapping } = this.state
    let constant = ''
    if (this.props.productOffer) {
      this.props.getCSVMapProductOffer()
      const mappingProductOffer = this.getMapping(simpleProductOfferList)
      constant = simpleProductOfferList.constant
      mapping = mappingProductOffer
    } else if (this.props.echoProduct) {
      this.props.getCSVMapEchoProduct()
      const mappingEchoProduct = this.getMapping(simpleEchoProductList)
      constant = simpleEchoProductList.constant
      mapping = mappingEchoProduct
    } else {
      const mappingCompanyProduct = this.getMapping(simpleCompanyProductList)
      constant = simpleCompanyProductList.constant
      mapping = mappingCompanyProduct
    }

    this.setState({ newHeaders: this.props.CSV.headerCSV, mapping: mapping, constant: constant })

    let a = mapping.sort(function(a, b) {
      let x = a.text.toLowerCase()
      let y = b.text.toLowerCase()
      if (x < y) {
        return -1
      }
      if (x > y) {
        return 1
      }
      return 0
    })

    let ar = []
    for (let i = 0; i < this.props.CSV.headerCSV.length; i++) ar.push(Array.from(a))

    // try to prefill dropdowns
    let values = Array(this.props.CSV.headerCSV.length).fill('')
    if (!this.props.mappedHeader) {
      const newHeaders = this.props.CSV.headerCSV
      values = values.map((value, vIndex) => {
        const content = this.simplifyText(newHeaders[vIndex].content)
        const foundItem = ar[vIndex].find(
          option => this.simplifyText(option.value) === content || this.simplifyText(option.text) === content
        )

        if (foundItem) {
          newHeaders[vIndex].header = foundItem.value
          ar = this.modifyOptionLists(
            ar,
            getSafe(() => foundItem.value, null),
            vIndex
          )
        }

        return getSafe(() => foundItem.value, '')
      })

      const missingRequired = this.findNotSelectedRequired(values, mapping, constant)

      this.props.changeHeadersCSV(newHeaders, missingRequired)
    } else {
      values = values.map((value, vIndex) => {
        const indexMap = this.props.mappedHeader[vIndex]

        if (indexMap.header) ar = this.modifyOptionLists(ar, indexMap.header, vIndex)

        return getSafe(() => indexMap.header, '')
      })
    }

    this.setState({ options: ar, values: values })
  }

  modifyOptionLists = (options, value, notIndex, indexAdd) => {
    const opts = this.state.mapping
    for (let i = 0; i < options.length; i++) {
      if (i !== notIndex) {
        // Add previous value to all dropdowns options
        if (indexAdd >= 0) options[i].push(opts[indexAdd])
        // Remove new value from all dropdowns options
        let indexRemove = options[i].findIndex(obj => obj.value === value)
        if (indexRemove >= 0) options[i].splice(indexRemove, 1)
        // Sort alphabetically
        options[i].sort(function(a, b) {
          let x = a.value.toLowerCase()
          let y = b.value.toLowerCase()
          if (x < y) {
            return -1
          }
          if (x > y) {
            return 1
          }
          return 0
        })
      }
    }

    return options
  }

  simplifyText = text => {
    // simplify text to compare
    return text
      .toLowerCase()
      .replace(/[^0-9a-z]/gi, '')
      .replace(/mapper$/gi, '')
      .replace(/s$/gi, '')
  }

  render() {
    const {
      CSV,
      selectedSavedMap,
      intl: { formatMessage },
      toastManager
    } = this.props

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
            <Grid.Row verticalAlign='middle'>
              <Grid.Column width={5} textAlign='center'>
                <Select
                  placeholder={formatMessage({
                    id: 'settings.selectSavedMap',
                    defaultMessage: 'Select your saved map'
                  })}
                  noResultsMessage={formatMessage({
                    id: 'settings.noSavedMaps',
                    defaultMessage: 'There are no saved Maps yet.'
                  })}
                  value={getSafe(() => selectedSavedMap.id, '')}
                  options={optionMaps}
                  clearable
                  //disabled={!optionMaps}
                  onChange={this.selectSavedMap}
                  search={true}
                  selectOnBlur={false}
                  data-test='settings_product_import_select_map'
                  style={{ width: '100%' }}
                />
              </Grid.Column>
              <Grid.Column width={3} textAlign='center' verticalAlign='middle'>
                {this.props.echoProduct || this.props.productOffer ? (
                  <Button
                    type='button'
                    color='red'
                    disabled={getSafe(() => !this.props.selectedSavedMap.id, true)}
                    onClick={async () => {
                      const mapName = this.props.selectedSavedMap.name
                      if (this.props.echoProduct)
                        await this.props.deleteCSVMapEchoProduct(this.props.selectedSavedMap.id)

                      if (this.props.productOffer)
                        await this.props.deleteCSVMapProductOffer(this.props.selectedSavedMap.id)

                      toastManager.add(
                        generateToastMarkup(
                          formatMessage({ id: 'notifications.deleteMapSuccess.header', defaultMessage: 'Map deleted' }),
                          formatMessage(
                            {
                              id: 'notifications.deleteMapSuccess.content',
                              defaultMessage: `Map {name} successfully deleted.`
                            },
                            { name: mapName }
                          )
                        ),
                        { appearance: 'success' }
                      )
                    }}
                    style={{ width: '100%' }}>
                    <FormattedMessage id='settings.deleteMap' defaultMessage='Delete Map'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                ) : null}
              </Grid.Column>
              <Grid.Column width={5} textAlign='center' data-test='settings_product_import_csv_name_inp'>
                <Input
                  placeholder={formatMessage({ id: 'settings.', defaultMessage: 'Map Name' })}
                  onChange={this.inputMapName}
                  style={{ width: '100%' }}
                />
              </Grid.Column>
              <Grid.Column width={3} textAlign='center' verticalAlign='middle'>
                <Button
                  type='button'
                  onClick={async () => {
                    const missingRequired = this.findNotSelectedRequired(values, this.state.mapping)
                    if (missingRequired.length) {
                      toastManager.add(
                        generateToastMarkup(
                          formatMessage({
                            id: 'notifications.importMissingRequired.header',
                            defaultMessage: 'Required Options'
                          }),
                          formatMessage(
                            {
                              id: 'notifications.importMissingRequired.content',
                              defaultMessage: `To continue, you need to apply all required attribute mappings: ${missingRequired.join(
                                ', '
                              )}`
                            },
                            { missingRequired: missingRequired.join(', ') }
                          )
                        ),
                        { appearance: 'error' }
                      )

                      return false
                    }

                    const data =
                      this.state.newHeaders &&
                      this.state.newHeaders.reduce(
                        (prev, next) => {
                          if (next.header && next.content) prev[next.header] = next.content

                          return prev
                        },
                        {
                          headerLine: true,
                          mapName: this.props.mapName || 'Uno'
                        }
                      )
                    let mapName = ''

                    if (this.props.echoProduct) {
                      if (this.props.selectedSavedMap) {
                        mapName = this.props.mapName ? this.props.mapName : this.props.selectedSavedMap.mapName
                        await this.props.putCSVMapEchoProduct(this.props.selectedSavedMap.id, {
                          ...data,
                          mapName: mapName
                        })
                      } else {
                        mapName = this.props.mapName
                        await this.props.postCSVMapEchoProduct({
                          ...data,
                          mapName: mapName
                        })
                      }

                      this.props.getCSVMapEchoProduct()
                    }
                    if (this.props.productOffer) {
                      if (this.props.selectedSavedMap) {
                        mapName = this.props.mapName ? this.props.mapName : this.props.selectedSavedMap.mapName
                        await this.props.putCSVMapProductOffer(this.props.selectedSavedMap.id, {
                          ...data,
                          mapName: mapName
                        })
                      } else {
                        mapName = this.props.mapName
                        await this.props.postCSVMapProductOffer({
                          ...data,
                          mapName: mapName
                        })
                      }

                      this.props.getCSVMapProductOffer()
                    }

                    toastManager.add(
                      generateToastMarkup(
                        <FormattedMessage id='notifications.mapCreated.header' />,
                        <FormattedMessage id='notifications.mapCreated.content' values={{ name: mapName }} />
                      ),
                      {
                        appearance: 'success'
                      }
                    )
                  }}
                  style={{ width: '100%' }}>
                  <FormattedMessage id='settings.saveMap' defaultMessage='Save Map' />
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
        <MapTable celled padded textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <FormattedMessage id='settings.csvColumns' defaultMessage='CSV Columns' />
              </Table.HeaderCell>
              <Table.HeaderCell colSpan={CSV.bodyCSV.length > 3 ? 3 : CSV.bodyCSV.length}>
                <FormattedMessage id='settings.csvPreview' defaultMessage='CSV Preview' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage id='settings.mapping' defaultMessage='Mapping' />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {CSV && values.length /* values.length is necessary for defaultValue */ && (
            <Table.Body>
              {CSV.headerCSV.map((lineHeader, lineIndex) => (
                <Table.Row key={lineHeader.columnNumber}>
                  <ColumnName>{lineHeader.content}</ColumnName>
                  {CSV.bodyCSV.map(line => {
                    return line.columns.map(lineBody => {
                      return (
                        lineHeader.columnNumber === lineBody.columnNumber && (
                          <SmallerTableCell>{lineBody.content}</SmallerTableCell>
                        )
                      )
                    })
                  })}
                  <Mapping>
                    <Dropdown
                      placeholder={formatMessage({ id: 'settings.selectColumn', defaultMessage: 'Select Column' })}
                      column_number={lineHeader.columnNumber}
                      selection
                      clearable
                      options={this.state.options[lineHeader.columnNumber]}
                      search={true}
                      onChange={this.selectMapping}
                      selectOnBlur={false}
                      data-test='settings_product_import_csv_column_drpdn'
                      value={getSafe(() => values[lineIndex], '')}
                    />
                  </Mapping>
                </Table.Row>
              ))}
            </Table.Body>
          )}
        </MapTable>
      </React.Fragment>
    )
  }

  findNotSelectedRequired = (values, mapping, constant) => {
    if (!constant) constant = this.state.constant

    if (!mapping) mapping = this.state.mapping

    const {
      intl: { formatMessage }
    } = this.props

    const required = mapping.reduce((requiredFields, mapField) => {
      if (mapField.required) requiredFields.push(mapField.value)

      return requiredFields
    }, [])

    const requiredMissing = required.filter(function(field) {
      return values.indexOf(field) < 0
    })
    return requiredMissing.map(reqM => {
      const field = reqM.replace(/Mapper$/gi, '')
      return formatMessage({ id: `${constant}.${field}`, defaultMessage: field })
    })
  }

  selectSavedMap = (e, { value }) => {
    const selectedMap = this.props.maps.find(map => map.id === value)
    this.props.selectSavedMap(selectedMap)

    let { options, values, mapping } = this.state
    const invSelectedMap = _invert(selectedMap)
    let newHeaders = this.props.mappedHeader

    values = values.map((value, vIndex) => {
      const content = newHeaders[vIndex].content
      const mapper = invSelectedMap[content]

      if (mapper) {
        values.forEach(
          function(value2, v2Index) {
            if (v2Index !== vIndex && mapper === value2) {
              let indexAdd = mapping.findIndex(obj => obj.value === newHeaders[v2Index].header)
              newHeaders[v2Index].header = ''
              options = this.modifyOptionLists(options, '', v2Index, indexAdd)
            }
          }.bind(this)
        )
        let indexAdd = mapping.findIndex(obj => obj.value === newHeaders[vIndex].header)
        newHeaders[vIndex].header = mapper
        options = this.modifyOptionLists(options, mapper, vIndex, indexAdd)
      }

      return getSafe(() => newHeaders[vIndex].header, '')
    })

    const missingRequired = this.findNotSelectedRequired(values)

    this.props.changeHeadersCSV(newHeaders, missingRequired)

    this.setState({ options: options, values: values })
  }

  inputMapName = e => {
    this.props.handleChangeMapCSVName(e.target.value)
  }

  checkboxChange = () => {
    this.props.handleSaveMapCSV()
  }

  selectMapping = (e, { column_number, value }) => {
    const { mapping } = this.state
    const mappedHeader = this.props.mappedHeader ? this.props.mappedHeader : [...this.state.newHeaders]
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

    // add to or remove from option lists
    options = this.modifyOptionLists(options, value, column_number, indexAdd)

    const missingRequired = this.findNotSelectedRequired(values)

    this.setState({ options: options, values: values })

    this.props.changeHeadersCSV(newHeaders, missingRequired)
  }
}

const mapDispatchToProps = {
  changeHeadersCSV,
  handleSaveMapCSV,
  handleChangeMapCSVName,
  getCSVMapEchoProduct,
  getCSVMapProductOffer,
  selectSavedMap,
  postCSVMapEchoProduct,
  putCSVMapEchoProduct,
  deleteCSVMapEchoProduct,
  postCSVMapProductOffer,
  putCSVMapProductOffer,
  deleteCSVMapProductOffer
}

const mapStateToProps = state => {
  return {
    csvFileId: state.settings.fileCSVId,
    CSV: state.settings.CSV,
    mappedHeader: state.settings.mappedHeaders,
    maps: state.settings.maps,
    mapName: state.settings.mapName,
    selectedSavedMap: state.settings.selectedSavedMap
  }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(withToastManager(Map)))
