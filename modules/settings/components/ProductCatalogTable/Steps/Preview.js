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
  'Chronic Health Hazard': 'chronicHealthHazardMapper',
  'Code': 'codeMapper',
  'Conditions to Avoid': 'conditionsToAvoidMapper',
  'Decomposition Temperature': 'decompositionTemperatureMapper',
  'Developmental Effects': 'developmentalEffectsMapper',
  'Dot Hazard Class': 'dotHazardClassMapper',
  'Dot Marine Pollutant': 'dotMarinePollutantMapper',
  'Dot Proper Shipping Name': 'dotProperShippingNameMapper',
  'Dot Proper Technical Name': 'dotProperTechnicalNameMapper',
  'Dot Reportable Quantity': 'dotReportableQuantityMapper',
  'Dot Severe Marine Pollutant': 'dotSevereMarinePollutantMapper',
  'Dot UN Number': 'dotUnNumberMapper',
  'Elements': 'elementsMapper',
  'Emergency Number': 'emergencyNumberMapper',
  'Endocrine Disruptor Information': 'endocrineDisruptorInformationMapper',
  'Evaporation Point': 'evaporationPointMapper',
  'Eye Contact': 'eyeContactMapper',
  'Fire Hazard': 'fireHazardMapper',
  'Flammability': 'flammabilityMapper',
  'Flammability or Explosive Lower': 'flammabilityOrExplosiveLowerMapper',
  'Flammability or Explosive Upper':'flammabilityOrExplosiveUpperMapper',
  'Flammability Solid Gas': 'flammabilitySolidGasMapper',
  'Flash Point': 'flashPointMapper',
  'General Advice': 'generalAdviceMapper',
  'Hazard Class': 'hazardClassMapper',
  'Hazard Labels': 'hazardLabelsMapper',
  'Hazard Statement': 'hazardStatementMapper',
  'Hazardous Decomposition Products': 'hazardousDecompositionProductsMapper',
  'Hazardous Polymerization': 'hazardousPolymerizationMapper',
  'Hazardous Reactions': 'hazardousReactionsMapper',
  'Health Hazard': 'healthHazardMapper',
  'HMIS': 'hmisMapper',
  'HNOC': 'hnocMapper',
  'IATA Hazard Class': 'iataHazardClassMapper',
  'IATA Proper Shipping Name': 'iataProperShippingNameMapper',
  'IATA Proper Technical Name': 'iataProperTechnicalNameMapper',
  'IATA UN Number': 'iataUnNumberMapper',
  'IMDG IMO Hazard Class': 'imdgImoHazardClassMapper',
  'IMDG IMO Proper Shipping Name': 'imdgImoProperShippingNameMapper',
  'IMDG IMO Proper Technical Name': 'imdgImoProperTechnicalNameMapper',
  'IMDG IMO UN Number': 'imdgImoUnNumberMapper',
  'Incompatible Materials': 'incompatibleMaterialsMapper',
  'Ingestion': 'ingestionMapper',
  'Inhalation': 'inhalationMapper',
  'Irritation': 'irritationMapper',
  'Label Elements': 'labelElementsMapper',
  'Manufacturer': 'manufacturerMapper',
  'Melting Point Range': 'meltingPointRangeMapper',
  'Mexico Grade': 'mexicoGradeMapper',
  'MFR Product Codes': 'mfrProductCodesMapper',
  'Molecular Formula': 'molecularFormulaMapper',
  'Molecular Weight': 'molecularWeightMapper',
  'Most Important Symptoms and Effects': 'mostImportantSymptomsAndEffectsMapper',
  'Mutagenic Effects': 'mutagenicEffectsMapper',
  'Name': 'nameMapper',
  'NFPA': 'nfpaMapper',
  'Notes to Physician': 'notesToPhysicianMapper',
  'Odor': 'odorMapper',
  'Odor Threshold': 'odorThresholdMapper',
  'OSHA Defined Hazards': 'oshaDefinedHazardsMapper',
  'Other Adverse Effects': 'otherAdverseEffectsMapper',
  'Packaging Group': 'packagingGroupMapper',
  'Partition Coefficient': 'partitionCoefficientMapper',
  'pH': 'phMapper',
  'Physical Hazard': 'physicalHazardMapper',
  'Physical State': 'physicalStateMapper',
  'Precautionary Statements': 'precautionaryStatementsMapper',
  'Product LC50 Inhalation': 'productLc50InhalationMapper',
  'Product LD50 Dermal': 'productLd50DermalMapper',
  'Product LD50 Oral': 'productLd50OralMapper',
  'Reactive Hazard': 'reactiveHazardMapper',
  'Reactivity Hazard': 'reactivityHazardMapper',
  'Recommended Use': 'recommendedUseMapper',
  'Reproductive Effects': 'reproductiveEffectsMapper',
  'Revision Date': 'revisionDateMapper',
  'SDS Issue Date': 'sdsIssueDateMapper',
  'SDS Prepared by': 'sdsPreparedByMapper',
  'Sensitization': 'sensitizationMapper',
  'Signal Word': 'signalWordMapper',
  'Skin Contact': 'skinContactMapper',
  'Solubility': 'solubilityMapper',
  'Special Hazard': 'specialHazardMapper',
  'Specific Gravity': 'specificGravityMapper',
  'Stability': 'stabilityMapper',
  'STOT Repeated Exposure': 'stotRepeatedExposureMapper',
  'STOT Single Exposure': 'stotSingleExposureMapper',
  'Supplemental Information': 'supplementalInformationMapper',
  'Symptoms Effects': 'symptomsEffectsMapper',
  'TDG Hazard Class': 'tdgHazardClassMapper',
  'TDG Proper Shipping Name': 'tdgProperShippingNameMapper',
  'TDG Proper Technical Name': 'tdgProperTechnicalNameMapper',
  'TDG UN Number': 'tdgUnNumberMapper',
  'Teratogenicity': 'teratogenicityMapper',
  'UN Number': 'unNumberMapper',
  'UN Shipping Name': 'unShippingNameMapper',
  'Uses Advised against': 'usesAdvisedAgainstMapper',
  'Vapor Density': 'vaporDensityMapper',
  'Vapor Pressure': 'vaporPressureMapper',
  'Version Number': 'versionNumberMapper',
  'Viscosity': 'viscosityMapper',
  'Waste Disposal Methods': 'wasteDisposalMethodsMapper'
}

const mapCompanyProduct = {
  'Description': 'descriptionMapper',
  'Echo Product': 'echoProduct',
  'Freeze Protect': 'freezeProtectMapper',
  'Freight Class': 'freightClassMapper',
  'Hazardous': 'hazardousMapper',
  'INCI Name': 'inciNameMapper',
  'INT Product Code': 'intProductCodeMapper',
  'INT Product Name': 'intProductNameMapper',
  'Market Segments': 'marketSegmentsMapper',
  'MFR Product Code': 'mfrProductCodeMapper',
  'MFR Product Name': 'mfrProductNameMapper',
  'NMFC Number': 'nmfcNumberMapper',
  'Non Hap': 'nonHapMapper',
  'Packaging Size': 'packagingSizeMapper',
  'Packaging Type': 'packagingTypeMapper',
  'Packaging Unit': 'packagingUnitMapper',
  'Prop65 Exempt': 'prop65ExemptMapper',
  'Safer Choice': 'saferChoiceMapper',
  'Stackable': 'stackableMapper',
  'VOC Exempt': 'vocExemptMapper'
}

const mapProductOffer = {
  'Anonymous': 'anonymousMapper',
  'Assay Max': 'assayMaxMapper',
  'Assay Min': 'assayMinMapper',
  'Company Product': 'companyProductMapper',
  'Cost': 'costMapper',
  'Currency': 'currencyMapper',
  'Description': 'descriptionMapper',
  'External Notes': 'externalNotesMapper',
  'In Stock': 'inStockMapper',
  'Internal Notes': 'internalNotesMapper',
  'Lots': 'lotsMapper',
  'Manufacturer': 'manufacturerMapper',
  'Minimum': 'minimumMapper',
  'Origin': 'originMapper',
  'Pricing Tiers': 'pricingTiersMapper',
  'Processing Time-Days': 'processingTimeDaysMapper',
  'Product Condition': 'productConditionMapper',
  'Product Form': 'productFormMapper',
  'Product Grades': 'productGradesMapper',
  'Splits': 'splitsMapper',
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
