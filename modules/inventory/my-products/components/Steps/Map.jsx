import { Fragment, Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Table, Dropdown, Grid, Input, Select, Button } from 'semantic-ui-react'

import {
  changeHeadersCSV,
  handleSaveMapCSV,
  handleChangeMapCSVName,
  getCSVMapCompanyGenericProduct,
  getCSVMapProductOffer,
  selectSavedMap,
  postCSVMapCompanyGenericProduct,
  putCSVMapCompanyGenericProduct,
  deleteCSVMapCompanyGenericProduct,
  postCSVMapProductOffer,
  putCSVMapProductOffer,
  deleteCSVMapProductOffer,
  getCSVMapCompanies,
  postCSVMapCompanies,
  putCSVMapCompanies,
  deleteCSVMapCompanies
} from '../../../../settings/actions'

import { getSafe, generateToastMarkup } from '../../../../../utils/functions'
import _invert from 'lodash/invert'
import { withToastManager } from 'react-toast-notifications'
import { MapTable, SmallerTableCell } from '../../../../inventory/my-products/components/Steps/constants/layout'

const simpleCompanyGenericProductList = {
  constant: 'global',
  required: ['codeMapper', 'companyMapper', 'elementsMapper', 'manufacturerMapper', 'nameMapper', 'productGroupMapper'],
  optional: [
    'alternativeNamesMapper',
    'appearanceMapper',
    'aspirationHazardMapper',
    'autoIgnitionTemperatureMapper',
    'boilingPointRangeMapper',
    'conditionsToAvoidMapper',
    'decompositionTemperatureMapper',
    'developmentalEffectsMapper',
    'dotCargoAircraftQuantityLimitationsMapper',
    'dotEmsNumbersMapper',
    'dotEnvironmentalHazardsMapper',
    'dotExceptionsMapper',
    'dotHazardClassMapper',
    'dotMarinePollutantMapper',
    'dotPackagingBulkMapper',
    'dotPackagingExceptionsMapper',
    'dotPackagingGroupMapper',
    'dotPackagingNonBulkMapper',
    'dotPassengerQuantityLimitationsMapper',
    'dotProperShippingNameMapper',
    'dotProperTechnicalNameMapper',
    'dotQuantityLimitationsMapper',
    'dotReportableQuantityMapper',
    'dotSevereMarinePollutantMapper',
    'dotUnNumberMapper',
    'dotUserSpecialPrecautionsMapper',
    'dotVesselStowageLocationMapper',
    'dotVesselStowageOtherMapper',
    'emergencyCompanyNameMapper',
    'emergencyContactNameMapper',
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
    'iataCargoAircraftQuantityLimitationsMapper',
    'iataEmsNumbersMapper',
    'iataEnvironmentalHazardsMapper',
    'iataExceptionsMapper',
    'iataHazardClassMapper',
    'iataMarinePollutantMapper',
    'iataPackagingBulkMapper',
    'iataPackagingExceptionsMapper',
    'iataPackagingGroupMapper',
    'iataPackagingNonBulkMapper',
    'iataPassengerQuantityLimitationsMapper',
    'iataProperShippingNameMapper',
    'iataProperTechnicalNameMapper',
    'iataReportableQuantitiesMapper',
    'iataSevereMarinePollutantMapper',
    'iataUnNumberMapper',
    'iataUserSpecialPrecautionsMapper',
    'iataVesselStowageLocationMapper',
    'iataVesselStowageOtherMapper',
    'imdgImoCargoAircraftQuantityLimitationsMapper',
    'imdgImoEmsNumbersMapper',
    'imdgImoEnvironmentalHazardsMapper',
    'imdgImoExceptionsMapper',
    'imdgImoHazardClassMapper',
    'imdgImoMarinePollutantMapper',
    'imdgImoPackagingBulkMapper',
    'imdgImoPackagingExceptionsMapper',
    'imdgImoPackagingGroupMapper',
    'imdgImoPackagingNonBulkMapper',
    'imdgImoPassengerQuantityLimitationsMapper',
    'imdgImoProperShippingNameMapper',
    'imdgImoProperTechnicalNameMapper',
    'imdgImoReportableQuantitiesMapper',
    'imdgImoSevereMarinePollutantMapper',
    'imdgImoUnNumberMapper',
    'imdgImoUserSpecialPrecautionsMapper',
    'imdgImoVesselStowageLocationMapper',
    'imdgImoVesselStowageOtherMapper',
    'incompatibleMaterialsMapper',
    'ingestionMapper',
    'inhalationMapper',
    'irritationMapper',
    'labelElementsMapper',
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
    'optionalCriticalTemperatureMapper',
    'optionalFlowTimeMapper',
    'optionalGasDensityMapper',
    'optionalHeatOfCombustionMapper',
    'optionalRecommendedRestrictionsMapper',
    'optionalRelativeDensityMapper',
    'optionalScheduleMapper',
    'optionalSpecificVolumeMapper',
    'optionalSynonymsMapper',
    'oshaDefinedHazardsMapper',
    'otherAdverseEffectsMapper',
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
    'tdgCargoAircraftQuantityLimitationsMapper',
    'tdgEmsNumbersMapper',
    'tdgEnvironmentalHazardsMapper',
    'tdgExceptionsMapper',
    'tdgHazardClassMapper',
    'tdgMarinePollutantMapper',
    'tdgPackagingBulkMapper',
    'tdgPackagingExceptionsMapper',
    'tdgPackagingGroupMapper',
    'tdgPackagingNonBulkMapper',
    'tdgPassengerQuantityLimitationsMapper',
    'tdgProperShippingNameMapper',
    'tdgProperTechnicalNameMapper',
    'tdgReportableQuantitiesMapper',
    'tdgSevereMarinePollutantMapper',
    'tdgUnNumberMapper',
    'tdgUserSpecialPrecautionsMapper',
    'tdgVesselStowageLocationMapper',
    'tdgVesselStowageOtherMapper',
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
    'companyGenericProductCodeMapper',
    'companyGenericProductNameMapper',
    'companyGenericProductNameOrCodeMapper',
    'freezeProtectMapper',
    'hazardousMapper',
    'inciNameMapper',
    'packagingHeightMapper',
    'packagingLengthMapper',
    'packagingWidthMapper',
    'palletHeightMapper',
    'palletLengthMapper',
    'palletMaxPkgsMapper',
    'palletMinPkgsMapper',
    //'palletSaleOnlyMapper',
    'palletWeightMapper',
    'palletWeightUnitMapper',
    'palletWidthMapper'
  ]
}

const simpleProductOfferList = {
  constant: 'import',
  required: ['companyProductMapper', 'pkgAvailableMapper', 'pricingTiersMapper', 'warehouseNameMapper'],
  optional: [
    'conditionMapper',
    'conditionNotesMapper',
    'conformingMapper',
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

const simpleCompaniesList = {
  constant: 'import.companies',
  required: [
    'nameMapper',
    'primaryBranchDeliveryAddressAddressCityMapper',
    'primaryBranchDeliveryAddressAddressCountryMapper',
    'primaryBranchDeliveryAddressAddressStreetAddressMapper',
    'primaryBranchDeliveryAddressAddressZipMapper',
    'primaryBranchDeliveryAddressContactEmailMapper',
    'primaryBranchDeliveryAddressContactNameMapper',
    'primaryBranchDeliveryAddressContactPhoneMapper',
    'primaryBranchDeliveryAddressNameMapper',
    'primaryBranchIsWarehouseMapper',
    'tinTypeMapper'
  ],
  optional: [
    'businessTypeMapper',
    'cinMapper',
    'dbaMapper',
    'dunsNumberMapper',
    'phoneMapper',
    'primaryBranchDeliveryAddressAddressProvinceMapper',
    'primaryBranchDeliveryAddressCallAheadMapper',
    'primaryBranchDeliveryAddressCloseTimeMapper',
    'primaryBranchDeliveryAddressDeliveryNotesMapper',
    'primaryBranchDeliveryAddressForkLiftMapper',
    'primaryBranchDeliveryAddressLiftGateMapper',
    'primaryBranchDeliveryAddressReadyTimeMapper',
    'primaryBranchTaxIdMapper',
    'primaryUserEmailMapper',
    'primaryUserJobTitleMapper',
    'primaryUserNameMapper',
    'primaryUserPhoneMapper',
    'tinMapper',
    'websiteMapper'
  ]
}

const Map = props => {
  const [state, setState] = useState({
    newHeaders: null,
    isSavedMap: false,
    options: [],
    values: [],
    mapping: [],
    constant: ''
  })

  const getMapping = mapperList => {
    const {
      intl: { formatMessage }
    } = props

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

  useEffect(() => {
    const {
      intl: { formatMessage }
    } = props
    let { mapping } = state
    let constant = ''
    if (props.productOffer) {
      props.getCSVMapProductOffer()
      const mappingProductOffer = getMapping(simpleProductOfferList)
      constant = simpleProductOfferList.constant
      mapping = mappingProductOffer
    } else if (props.companyGenericProduct) {
      props.getCSVMapCompanyGenericProduct()
      const mappingCompanyGenericProduct = getMapping(simpleCompanyGenericProductList)
      constant = simpleCompanyGenericProductList.constant
      mapping = mappingCompanyGenericProduct
    } else if (props.companies) {
      props.getCSVMapCompanies()
      const mappingCompanies = getMapping(simpleCompaniesList)
      constant = simpleCompaniesList.constant
      mapping = mappingCompanies
    } else {
      const mappingCompanyProduct = getMapping(simpleCompanyProductList)
      constant = simpleCompanyProductList.constant
      mapping = mappingCompanyProduct
    }

    setState({ ...state, newHeaders: props.CSV.headerCSV, mapping: mapping, constant: constant })

    let a = mapping.sort(function (a, b) {
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
    for (let i = 0; i < props.CSV.headerCSV.length; i++) ar.push(Array.from(a))

    // try to prefill dropdowns
    let values = Array(props.CSV.headerCSV.length).fill('')
    if (!props.mappedHeader) {
      const newHeaders = props.CSV.headerCSV
      values = values.map((value, vIndex) => {
        const content = simplifyText(newHeaders[vIndex].content)
        const foundItem = ar[vIndex].find(
          option => simplifyText(option.value) === content || simplifyText(option.text) === content
        )

        if (foundItem) {
          newHeaders[vIndex].header = foundItem.value
          ar = modifyOptionLists(
            ar,
            getSafe(() => foundItem.value, null),
            vIndex
          )
        }

        return getSafe(() => foundItem.value, '')
      })

      const missingRequired = findNotSelectedRequired(values, mapping, constant)

      props.changeHeadersCSV(newHeaders, missingRequired)
    } else {
      values = values.map((value, vIndex) => {
        const indexMap = props.mappedHeader[vIndex]

        if (indexMap.header) ar = modifyOptionLists(ar, indexMap.header, vIndex)

        return getSafe(() => indexMap.header, '')
      })
    }

    setState({ ...state, options: ar, values: values })
  }, [])

  const modifyOptionLists = (options, value, notIndex, indexAdd) => {
    const opts = state.mapping
    for (let i = 0; i < options.length; i++) {
      if (i !== notIndex) {
        // Add previous value to all dropdowns options
        if (indexAdd >= 0) options[i].push(opts[indexAdd])
        // Remove new value from all dropdowns options
        let indexRemove = options[i].findIndex(obj => obj.value === value)
        if (indexRemove >= 0) options[i].splice(indexRemove, 1)
        // Sort alphabetically
        options[i].sort(function (a, b) {
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

  const simplifyText = text => {
    // simplify text to compare
    return text
      .toLowerCase()
      .replace(/[^0-9a-z]/gi, '')
      .replace(/mapper$/gi, '')
      .replace(/s$/gi, '')
  }

  const findNotSelectedRequired = (values, mapping, constant) => {
    if (!constant) constant = state.constant

    if (!mapping) mapping = state.mapping

    const {
      intl: { formatMessage }
    } = props

    const required = mapping.reduce((requiredFields, mapField) => {
      if (mapField.required) requiredFields.push(mapField.value)

      return requiredFields
    }, [])

    const requiredMissing = required.filter(function (field) {
      return values.indexOf(field) < 0
    })
    return requiredMissing.map(reqM => {
      const field = reqM.replace(/Mapper$/gi, '')
      return formatMessage({ id: `${constant}.${field}`, defaultMessage: field })
    })
  }

  const selectSavedMap = (e, { value }) => {
    const selectedMap = props.maps.find(map => map.id === value)
    props.selectSavedMap(selectedMap)

    let { options, values, mapping } = state
    const invSelectedMap = _invert(selectedMap)
    let newHeaders = props.mappedHeader

    values = values.map((value, vIndex) => {
      const content = newHeaders[vIndex].content
      const mapper = invSelectedMap[content]

      if (mapper) {
        values.forEach(
          function (value2, v2Index) {
            if (v2Index !== vIndex && mapper === value2) {
              let indexAdd = mapping.findIndex(obj => obj.value === newHeaders[v2Index].header)
              newHeaders[v2Index].header = ''
              options = modifyOptionLists(options, '', v2Index, indexAdd)
            }
          }.bind(this)
        )
        let indexAdd = mapping.findIndex(obj => obj.value === newHeaders[vIndex].header)
        newHeaders[vIndex].header = mapper
        options = modifyOptionLists(options, mapper, vIndex, indexAdd)
      }

      return getSafe(() => newHeaders[vIndex].header, '')
    })

    const missingRequired = findNotSelectedRequired(values)

    props.changeHeadersCSV(newHeaders, missingRequired)

    setState({ ...state, options: options, values: values })
  }

  const inputMapName = e => {
    props.handleChangeMapCSVName(e.target.value)
  }

  const checkboxChange = () => {
    props.handleSaveMapCSV()
  }

  const selectMapping = (e, { column_number, value }) => {
    const { mapping } = state
    const mappedHeader = props.mappedHeader ? props.mappedHeader : [...state.newHeaders]
    const newHeaders = mappedHeader.map(line => {
      if (column_number === line.columnNumber) {
        line['header'] = value
        return line
      }
      return line
    })

    let options = state.options
    let values = state.values

    let previousValue = values[column_number]
    values[column_number] = value

    let opts = mapping
    let indexAdd = opts.findIndex(obj => obj.value === previousValue)

    // add to or remove from option lists
    options = modifyOptionLists(options, value, column_number, indexAdd)

    const missingRequired = findNotSelectedRequired(values)

    setState({ ...state, options: options, values: values })

    props.changeHeadersCSV(newHeaders, missingRequired)
  }

  const {
    CSV,
    selectedSavedMap,
    intl: { formatMessage },
    toastManager,
    csvWithoutHeader
  } = props

  const optionMaps =
    props.maps &&
    props.maps.map(map => ({
      text: map.mapName,
      value: map.id
    }))

  const { values } = state

  csvWithoutHeader &&
    CSV.bodyCSV[0].lineNumber !== 1 &&
    CSV.bodyCSV.unshift({ lineNumber: 1, columns: CSV.headerCSV })
  !csvWithoutHeader && CSV.bodyCSV[0].lineNumber === 1 && CSV.bodyCSV.shift()

  return (
    <Fragment>
      {(props.productOffer || props.companyGenericProduct || props.companies) && (
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
                onChange={selectSavedMap}
                search={true}
                selectOnBlur={false}
                data-test='settings_product_import_select_map'
                style={{ width: '100%' }}
              />
            </Grid.Column>
            <Grid.Column width={3} textAlign='center' verticalAlign='middle'>
              {props.companyGenericProduct || props.productOffer || props.companies ? (
                <Button
                  type='button'
                  color='red'
                  disabled={getSafe(() => !props.selectedSavedMap.id, true)}
                  onClick={async () => {
                    const mapName = props.selectedSavedMap.name
                    if (props.companyGenericProduct)
                      await props.deleteCSVMapCompanyGenericProduct(props.selectedSavedMap.id)

                    if (props.productOffer)
                      await props.deleteCSVMapProductOffer(props.selectedSavedMap.id)

                    if (props.companies) await props.deleteCSVMapCompanies(props.selectedSavedMap.id)
                  }}
                  style={{ width: '100%' }}>
                  <FormattedMessage id='settings.deleteMap' defaultMessage='Delete Map' />
                </Button>
              ) : null}
            </Grid.Column>
            <Grid.Column width={5} textAlign='center' data-test='settings_product_import_csv_name_inp'>
              <Input
                placeholder={formatMessage({ id: 'settings.', defaultMessage: 'Map Name' })}
                onChange={inputMapName}
                style={{ width: '100%' }}
              />
            </Grid.Column>
            <Grid.Column width={3} textAlign='center' verticalAlign='middle'>
              <Button
                type='button'
                onClick={async () => {
                  const missingRequired = findNotSelectedRequired(values, state.mapping)
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
                    state.newHeaders &&
                    state.newHeaders.reduce(
                      (prev, next) => {
                        if (next.header && next.content) prev[next.header] = next.content

                        return prev
                      },
                      {
                        headerLine: !props.csvWithoutHeader,
                        mapName: props.mapName || 'Uno'
                      }
                    )
                  let mapName = ''

                  if (props.companyGenericProduct) {
                    if (props.selectedSavedMap) {
                      mapName = props.mapName ? props.mapName : props.selectedSavedMap.mapName
                      await props.putCSVMapCompanyGenericProduct(props.selectedSavedMap.id, {
                        ...data,
                        mapName: mapName
                      })
                    } else {
                      mapName = props.mapName
                      await props.postCSVMapCompanyGenericProduct({
                        ...data,
                        mapName: mapName
                      })
                    }

                    props.getCSVMapCompanyGenericProduct()
                  }
                  if (props.productOffer) {
                    if (props.selectedSavedMap) {
                      mapName = props.mapName ? props.mapName : props.selectedSavedMap.mapName
                      await props.putCSVMapProductOffer(props.selectedSavedMap.id, {
                        ...data,
                        mapName: mapName
                      })
                    } else {
                      mapName = props.mapName
                      await props.postCSVMapProductOffer({
                        ...data,
                        mapName: mapName
                      })
                    }

                    props.getCSVMapProductOffer()
                  }

                  if (props.companies) {
                    if (props.selectedSavedMap) {
                      mapName = props.mapName ? props.mapName : props.selectedSavedMap.mapName
                      await props.putCSVMapCompanies(props.selectedSavedMap.id, {
                        ...data,
                        mapName: mapName
                      })
                    } else {
                      mapName = props.mapName
                      await props.postCSVMapCompanies({
                        ...data,
                        mapName: mapName
                      })
                    }

                    props.getCSVMapCompanies()
                  }
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
            {csvWithoutHeader ? (
              <Table.HeaderCell colSpan={CSV.bodyCSV.length > 4 ? 4 : CSV.bodyCSV.length}>
                <FormattedMessage id='settings.csvPreview' defaultMessage='Preview' />
              </Table.HeaderCell>
            ) : (
              <>
                <Table.HeaderCell style={{ width: '130px', minWidth: '130px' }}>
                  <FormattedMessage id='settings.csvColumns' defaultMessage='CSV Columns' />
                </Table.HeaderCell>
                <Table.HeaderCell colSpan={CSV.bodyCSV.length > 3 ? 3 : CSV.bodyCSV.length}>
                  <FormattedMessage id='settings.csvPreview' defaultMessage='Preview' />
                </Table.HeaderCell>
              </>
            )}
            <Table.HeaderCell style={{ width: '229px', minWidth: '229px' }}>
              <FormattedMessage id='settings.mapping' defaultMessage='Mapping' />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {CSV && values.length /* values.length is necessary for defaultValue */ && (
          <Table.Body>
            {CSV.headerCSV.map((lineHeader, lineIndex) => (
              <Table.Row key={lineHeader.columnNumber}>
                {csvWithoutHeader ? null : <Table.Cell style={{ width: '130px' }}>{lineHeader.content}</Table.Cell>}
                {CSV.bodyCSV.map(line => {
                  return line.columns.map(lineBody => {
                    return (
                      lineHeader.columnNumber === lineBody.columnNumber && (
                        <SmallerTableCell className={`cols${CSV.bodyCSV.length}`}>
                          <div>{lineBody.content}</div>
                        </SmallerTableCell>
                      )
                    )
                  })
                })}
                <Table.Cell style={{ width: '229px' }}>
                  <Dropdown
                    placeholder={formatMessage({ id: 'settings.selectColumn', defaultMessage: 'Select Column' })}
                    column_number={lineHeader.columnNumber}
                    selection
                    clearable
                    options={state.options[lineHeader.columnNumber]}
                    search={true}
                    onChange={selectMapping}
                    selectOnBlur={false}
                    data-test='settings_product_import_csv_column_drpdn'
                    value={getSafe(() => values[lineIndex], '')}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </MapTable>
    </Fragment>
  )
}

const mapDispatchToProps = {
  changeHeadersCSV,
  handleSaveMapCSV,
  handleChangeMapCSVName,
  getCSVMapCompanyGenericProduct,
  getCSVMapProductOffer,
  selectSavedMap,
  postCSVMapCompanyGenericProduct,
  putCSVMapCompanyGenericProduct,
  deleteCSVMapCompanyGenericProduct,
  postCSVMapProductOffer,
  putCSVMapProductOffer,
  deleteCSVMapProductOffer,
  getCSVMapCompanies,
  postCSVMapCompanies,
  putCSVMapCompanies,
  deleteCSVMapCompanies
}

const mapStateToProps = state => {
  return {
    csvFileId: state.settings.fileCSVId,
    CSV: state.settings.CSV,
    mappedHeader: state.settings.mappedHeaders,
    maps: state.settings.maps,
    mapName: state.settings.mapName,
    selectedSavedMap: state.settings.selectedSavedMap,
    csvWithoutHeader: state.settings.csvWithoutHeader
  }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(withToastManager(Map)))
