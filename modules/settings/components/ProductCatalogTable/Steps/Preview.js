import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table } from 'semantic-ui-react'

import { dataHeaderCSV, postCSVMapEchoProduct, postCSVMapProductOffer } from '../../../actions'
import _invert from 'lodash/invert'

const mapEchoProduct = {
  'Alternative Names': 'alternativeNamesMapper',
  'Appearance': 'appearanceMapper',
  'Aspiration Hazard': 'aspirationHazardMapper',
  'Auto Ignition Temperature': 'autoIgnitionTemperatureMapper',
  'Boiling Point Range': 'boilingPointRangeMapper',
  'Code': 'codeMapper',
  'Conditions to Avoid': 'conditionsToAvoidMapper',
  'Decomposition Temperature': 'decompositionTemperatureMapper',
  'Developmental Effects': 'developmentalEffectsMapper',
  'DOT Hazard Class': 'dotHazardClassMapper',
  'DOT Marine Pollutant': 'dotMarinePollutantMapper',
  'DOT Packaging Group': 'dotPackagingGroupMapper',
  'DOT Proper Shipping Name': 'dotProperShippingNameMapper',
  'DOT Proper Technical Name': 'dotProperTechnicalNameMapper',
  'DOT Reportable Quantity': 'dotReportableQuantityMapper',
  'DOT Severe Marine Pollutant': 'dotSevereMarinePollutantMapper',
  'DOT UN Number': 'dotUnNumberMapper',
  'Elements': 'elementsMapper',
  'Emergency Phone': 'emergencyPhoneMapper',
  'Endocrine Disruptor Information': 'endocrineDisruptorInformationMapper',
  'Evaporation Point': 'evaporationPointMapper',
  'Eye Contact': 'eyeContactMapper',
  'Flammability or Explosive Lower': 'flammabilityOrExplosiveLowerMapper',
  'Flammability or Explosive Upper': 'flammabilityOrExplosiveUpperMapper',
  'Flammability Solig Gas': 'flammabilitySolidGasMapper',
  'Flash Point': 'flashPointMapper',
  'General Advice': 'generalAdviceMapper',
  'Hazard Statement': 'hazardStatementMapper',
  'Hazardous Decomposition Products': 'hazardousDecompositionProductsMapper',
  'Hazardous Polymerization': 'hazardousPolymerizationMapper',
  'Hazardous Reactions': 'hazardousReactionsMapper',
  'HMIS Chronic Health Hazard': 'hmisChronicHealthHazardMapper',
  'HMIS Flammability': 'hmisFlammabilityMapper',
  'HMIS Health Hazard': 'hmisHealthHazardMapper',
  'HMIS Physical Hazard': 'hmisPhysicalHazardMapper',
  'HNOC': 'hnocMapper',
  'IATA Hazard Class': 'iataHazardClassMapper',
  'IATA Packaging Group': 'iataPackagingGroupMapper',
  'IATA Proper Shipping Name': 'iataProperShippingNameMapper',
  'IATA Proper Technical Name': 'iataProperTechnicalNameMapper',
  'IATA UN Number': 'iataUnNumberMapper',
  'IMDG/IMO Hazard Class': 'imdgImoHazardClassMapper',
  'IMDG/IMO Packaging Group': 'imdgImoPackagingGroupMapper',
  'IMDG/IMO Proper Shipping Name': 'imdgImoProperShippingNameMapper',
  'IMDG/IMO Proper Technical Name': 'imdgImoProperTechnicalNameMapper',
  'IMDG/IMO UN Number': 'imdgImoUnNumberMapper',
  'Incompatible Materials': 'incompatibleMaterialsMapper',
  'Ingestion': 'ingestionMapper',
  'Inhalation': 'inhalationMapper',
  'Irritation': 'irritationMapper',
  'Label Elements': 'labelElementsMapper',
  'Manufacturer': 'manufacturerMapper',
  'Melting Point Range': 'meltingPointRangeMapper',
  'Mexico Grade': 'mexicoGradeMapper',
  'Manufaturer Product Codes': 'mfrProductCodesMapper',
  'Molecular Formula': 'molecularFormulaMapper',
  'Molecular Weight': 'molecularWeightMapper',
  'Most Important Symptoms and Effects': 'mostImportantSymptomsAndEffectsMapper',
  'Mutagenic Effects': 'mutagenicEffectsMapper',
  'Name': 'nameMapper',
  'NFPA Fire Hazard': 'nfpaFireHazardMapper',
  'NFPA Health Hazard': 'nfpaHealthHazardMapper',
  'NFPA Reactivity Hazard': 'nfpaReactivityHazardMapper',
  'NFPA Special Hazard': 'nfpaSpecialHazardMapper',
  'Notes to Physician': 'notesToPhysicianMapper',
  'Odor': 'odorMapper',
  'Odor Threshold': 'odorThresholdMapper',
  'OSHA Defined Hazards': 'oshaDefinedHazardsMapper',
  'Other Adverse Effects': 'otherAdverseEffectsMapper',
  'Packaging Group': 'packagingGroupMapper',
  'Partition Coefficient': 'partitionCoefficientMapper',
  'pH': 'phMapper',
  'Physical State': 'physicalStateMapper',
  'Precautionary Statements': 'precautionaryStatementsMapper',
  'Product LC50 Inhalation': 'productLc50InhalationMapper',
  'Product LD50 Dermal': 'productLd50DermalMapper',
  'Product LD50 Oral': 'productLd50OralMapper',
  'Reative Hazard': 'reactiveHazardMapper',
  'Recommended Use': 'recommendedUseMapper',
  'Reproductive Effects': 'reproductiveEffectsMapper',
  'SDS Issued Date': 'sdsIssuedDateMapper',
  'SDS Prepared by': 'sdsPreparedByMapper',
  'SDS Revision Date': 'sdsRevisionDateMapper',
  'SDS Version Number': 'sdsVersionNumberMapper',
  'Sensitization': 'sensitizationMapper',
  'Signal Word': 'signalWordMapper',
  'Skin Contact': 'skinContactMapper',
  'Solubility': 'solubilityMapper',
  'Specific Gravity': 'specificGravityMapper',
  'Stability': 'stabilityMapper',
  'STOT Repeated Exposure': 'stotRepeatedExposureMapper',
  'STOT Single Exposure': 'stotSingleExposureMapper',
  'Supplemental Information': 'supplementalInformationMapper',
  'Symptoms Effects': 'symptomsEffectsMapper',
  'TDG Hazard Class': 'tdgHazardClassMapper',
  'TDG Packaging Group': 'tdgPackagingGroupMapper',
  'TDG Proper Shipping Name': 'tdgProperShippingNameMapper',
  'TDG Proper Technical Name': 'tdgProperTechnicalNameMapper',
  'TDG UN Number': 'tdgUnNumberMapper',
  'TDS Issued Date': 'tdsIssuedDateMapper',
  'TDS Prepared by': 'tdsPreparedByMapper',
  'TDS Revision Date': 'tdsRevisionDateMapper',
  'TDS Version Number': 'tdsVersionNumberMapper',
  'Teratogenicity': 'teratogenicityMapper',
  'Uses Advised against': 'usesAdvisedAgainstMapper',
  'Vapor Density': 'vaporDensityMapper',
  'Vapor Pressure': 'vaporPressureMapper',
  'Viscosity': 'viscosityMapper',
  'Waste Disposal Methods': 'wasteDisposalMethodsMapper'
}

const mapCompanyProduct = {
  'Echo Product': 'echoProduct',
  'Freeze Protect': 'freezeProtectMapper',
  'Freight Class': 'freightClassMapper',
  'Hazardous': 'hazardousMapper',
  'INCI Name': 'inciNameMapper',
  'INT Product Code': 'intProductCodeMapper',
  'INT Product Name': 'intProductNameMapper',
  'NMFC Number': 'nmfcNumberMapper',
  'Packaging Size': 'packagingSizeMapper',
  'Packaging Type': 'packagingTypeMapper',
  'Packaging Unit': 'packagingUnitMapper',
  'Stackable': 'stackableMapper'
}

const mapProductOffer = {
  'Anonymous': 'anonymousMapper',
  'Assay Max': 'assayMaxMapper',
  'Assay Min': 'assayMinMapper',
  'Company Product': 'companyProductMapper',
  'Condition': 'conditionMapper',
  'Cost per UOM': 'costPerUomMapper',
  'Currency': 'currencyMapper',
  'External Notes': 'externalNotesMapper',
  'Form': 'formMapper',
  'Grades': 'gradesMapper',
  'In Stock': 'inStockMapper',
  'Internal Notes': 'internalNotesMapper',
  'Lots': 'lotsMapper',
  'Min Package': 'minPkgMapper',
  'Origin': 'originMapper',
  'Pricing Tiers': 'pricingTiersMapper',
  'Processing Time-Days': 'processingTimeDaysMapper',
  'Split Package': 'splitPkgMapper',
  'Validity Date': 'validityDateMapper',
  'Warehouse Name': 'warehouseNameMapper'
}

const invertedMapProductOffer = _invert(mapProductOffer)

class Preview extends Component {
  constructor(props) {
    const invertedSelectedSavedMap = _invert(props.selectedSavedMap)

    const filteredHeader =
      props.mappedHeader &&
      props.mappedHeader.filter(column => {
        return column.header
      })
    const filteredHeaderMap = props.selectedSavedMap && creatingFilteredHeader()

    function creatingFilteredHeader() {
      const mappedHeader = props.CSV.headerCSV.reduce((prev, curr) => {
        const key = curr.content
        const valSelected = invertedSelectedSavedMap[key]
        const valProduct = valSelected
          ? invertedMapProductOffer[valSelected]
          : null
        if (valProduct) {
          prev.push({ ...curr, header: valProduct })
        }
        return prev
      }, [])
      return mappedHeader
    }

    super(props)
    this.state = {
      filteredHeader: filteredHeader || filteredHeaderMap || null
    }
  }

  componentDidMount() {
    let key
    if (this.props.selectedSavedMap) {
      this.props.productOffer &&
        this.props.dataHeaderCSV(this.props.selectedSavedMap)
    } else {
      const data =
        this.state.filteredHeader &&
        this.state.filteredHeader.reduce(
          (prev, next) => {
            if (this.props.productOffer) {
              key = mapProductOffer[next.header]
            } else if (this.props.echoProduct) {
              key = mapEchoProduct[next.header]
            } else {
              key = mapCompanyProduct[next.header]
            }
            prev[key] = next.content
            return prev
          },
          {
            headerLine: true,
            mapName: this.props.mapName || 'Uno'
          }
        )
      data && this.props.dataHeaderCSV(data)

      if (this.props.echoProduct)
        this.props.isSaveMapCSV &&
          data &&
          this.props.postCSVMapEchoProduct({
            ...data,
            mapName: this.props.mapName
          })

      if (this.props.productOffer)
        this.props.isSaveMapCSV &&
        data &&
        this.props.postCSVMapProductOffer({
          ...data,
          mapName: this.props.mapName
        })
    }
  }

  render() {
    const { CSV } = this.props
    const { filteredHeader } = this.state

    return (
      <Table celled padded textAlign='center'>
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
  dataHeaderCSV,
  postCSVMapEchoProduct,
  postCSVMapProductOffer
}

const mapStateToProps = state => {
  return {
    mappedHeader: state.settings.mappedHeaders,
    CSV: state.settings.CSV,
    isSaveMapCSV: state.settings.isSaveMapCSV,
    mapName: state.settings.mapName,
    selectedSavedMap: state.settings.selectedSavedMap
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview)
