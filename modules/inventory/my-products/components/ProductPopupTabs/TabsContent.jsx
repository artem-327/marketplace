/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'
import moment from 'moment'
import { Grid, GridRow, GridColumn, Dropdown, Divider } from 'semantic-ui-react'

// Components
import { getLocaleDateFormat } from '../../../../../components/date-format'
import { CompanyProductMixtures } from '../../../../../components/shared-components/'

// Styles
import {
  GridStyled,
  DivProductNameSegment,
  DivProductNameHeader,
  DivBoldText,
  DivLabelRow,
  DivListTableWrapper,
  DivListRowItem,
  DivListName,
  DivListValue
} from './styles'

// Constants
import { propertiesFilterOptions, transportationFilterOptions } from './constants'

const renderTableItem = (objectItem, item, prefix) => {
  const attributeName = `${prefix}${item[2]}`
  let value = '-'
  if (objectItem) {
    value = get(objectItem, attributeName, null)

    if (value === null) {
      value = '-'
    } else if (item.length === 4) {
      const valueType = item[3]

      switch (valueType) {
        case 'date':
            value = moment(value).format(getLocaleDateFormat())
          break
        case 'bool':
          value = value
            ? <FormattedMessage id='global.yes' defaultMessage='Yes' />
            : <FormattedMessage id='global.no' defaultMessage='No' />
          break
      }
    }
  }

  return (
    <DivListRowItem>
      <DivListName>
        <FormattedMessage id={item[0]} defaultMessage={item[1]} />
      </DivListName>
      <DivListValue>{value}</DivListValue>
    </DivListRowItem>
  )
}

const TabsContent = props => {
  const [propertiesFilter, setPropertiesFilter] = useState('epa')
  const [transportationFilter, setTransportationFilter] = useState('tdg')
  const [selectedCASIndex, setSelectedCASIndex] = useState(0)

  const { intl: { formatMessage }, actualTab, product } = props
  const elements = product?.elements ? product.elements : []
  const selectedElement = selectedCASIndex < elements.length ? elements[selectedCASIndex] : null
  const casProduct = selectedElement?.casProduct

  useEffect(() => {
    setSelectedCASIndex(0)
  }, [props.product?.id])

  return (
    <GridStyled>
      {actualTab === 'info' && (
        <>
          <GridRow>
            <GridColumn width={16}>
              <DivProductNameSegment>
                <DivProductNameHeader>
                  <FormattedMessage id='global.productName' defaultMessage='Product Name' />
                </DivProductNameHeader>
                <DivBoldText>
                  {product?.name ? product.name : '-'}
                </DivBoldText>
              </DivProductNameSegment>
            </GridColumn>
          </GridRow>
          {elements.length > 0 && (
            <>
              <GridRow>
                <GridColumn width={16}>
                  <DivBoldText>
                    <FormattedMessage id='global.mixtures' defaultMessage='Mixtures' />
                  </DivBoldText>
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn width={16}>
                  <CompanyProductMixtures casProducts={elements} />
                </GridColumn>
              </GridRow>
            </>
          )}

          <DivListTableWrapper>
            {
              [
                ['global.manufacturer', 'Manufacturer', 'manufacturer.name'],
                ['global.manufacturerProductCode', 'Manufacturer Product Code', 'mfrProductCodes'], // array
                ['global.emergencyCompanyName', 'Emergency Company Name', 'emergencyCompanyName'],
                ['global.emergencyContactName', 'Emergency Contact Name', 'emergencyContactName'],
                ['global.emergencyNumber', 'Emergency Number', 'emergencyPhone'],
                ['global.recommendedUse', 'Recommended Uses', 'recommendedUse'],
                ['global.version', 'Version', 'sdsVersionNumber'],
                ['global.revisionDate', 'Revision Date', 'sdsRevisionDate', 'date'],
                ['global.formula', 'Formula', 'molecularFormula'],
                ['global.molecularWeight', 'Molecular Weight', 'molecularWeight'],
                ['global.optionalRecommendedRestrictions', 'Recommended Restrictions', 'optionalRecommendedRestrictions'],
                ['global.optionalSynonyms', 'Synonyms', 'optionalSynonyms'],
                ['global.optionalSchedule', 'Schedule', 'optionalSchedule'],
                ['global.optionalSpecificVolume', 'Specific Volume', 'optionalSpecificVolume'],
                ['global.optionalCriticalTemperature', 'Critical Temperature', 'optionalCriticalTemperature'],
                ['global.optionalGasDensity', 'Gas Desity', 'optionalGasDensity'],
                ['global.optionalRelativeDensity', 'Relative Density', 'optionalRelativeDensity'],
                ['global.optionalFlowTime', 'Flow Time', 'optionalFlowTime'],
                ['global.optionalHeatOfCombustion', 'Heat Of Combustion', 'optionalHeatOfCombustion'],
              ].map(item => renderTableItem(product, item, ''))
            }
          </DivListTableWrapper>
        </>
      )}
      {actualTab === 'regulatory' && (
        <>
          <GridRow>
            <GridColumn width={8}>
              <DivLabelRow>
                <label><FormattedMessage id='global.casProduct' defaultMessage='Regulatory - CAS Product' /></label>
              </DivLabelRow>
              <Dropdown
                fluid
                selection
                value={selectedCASIndex}
                options={
                  elements.map((element, index) => ({
                    key: index,
                    text: `${element.casProduct?.casNumber ? `${element.casProduct.casNumber} ` : ''}${element.displayName}`,
                    value: index
                  }))
                }
                onChange={(_, { value }) => setSelectedCASIndex(value)}
              />
            </GridColumn>
            <GridColumn width={8}>
              <DivLabelRow>
                <label><FormattedMessage id='global.propsFilter' defaultMessage='Properties Filter' /></label>
              </DivLabelRow>
              <Dropdown
                fluid
                selection
                value={propertiesFilter}
                options={propertiesFilterOptions}
                onChange={(_, { value }) => setPropertiesFilter(value)}
              />
            </GridColumn>
          </GridRow>
          <DivListTableWrapper>
            {
              [
                ['global.casIndexName', 'CAS Index Name', 'casIndexName'],
                ...(propertiesFilter === 'all' || propertiesFilter === 'epa')
                  ? [
                    ['casProduct.epaSection302EhsTPQ', 'Section 302 (EHS) TPQ', 'epaSection302EhsTPQ'],
                    ['casProduct.epaSection304EhsRQ', 'Section 304 (EHS) RQ', 'epaSection304EhsRQ'],
                    ['casProduct.epaCerclaRq', 'CERCLA RQ', 'epaCerclaRq'],
                    ['casProduct.epaSection313Tri', 'Section 313 (TRI)', 'epaSection313Tri', 'bool'],
                    ['casProduct.epaCaa112TTq', 'CAA 112(r) TQ', 'epaCaa112TTq'],
                    ['casProduct.epaFifra', 'FIFRA', 'epaFifra', 'bool'],
                    ['casProduct.epaTsca', 'TSCA', 'epaTsca'],
                    ['casProduct.epaTsca12b', 'TSCA 12(b)', 'epaTsca12b', 'bool'],
                    ['casProduct.epaSaferChoice', 'Safer Choice', 'epaSaferChoice', 'bool']
                  ] : [],
                ...(propertiesFilter === 'all' || propertiesFilter === 'rightToKnow')
                  ? [
                    ['casProduct.rtkMassachusetts', 'Massachusetts', 'rtkMassachusetts', 'bool'],
                    ['casProduct.rtkNewJersey', 'New Jersey', 'rtkNewJersey', 'bool'],
                    ['casProduct.rtkPennsylvania', 'Pennsylvania', 'rtkPennsylvania', 'bool'],
                    ['casProduct.rtkIllinois', 'Illinois', 'rtkIllinois', 'bool'],
                    ['casProduct.rtkRhodeIsland', 'Rhode Island', 'rtkRhodeIsland', 'bool']
                  ] : [],
                ...(propertiesFilter === 'all' || propertiesFilter === 'dhsCoi')
                  ? [
                    ['casProduct.dhsReleaseMinimumConcentration', 'Release: Minimum Concentration (%)', 'dhsReleaseMinimumConcentration'],
                    ['casProduct.dhsReleaseScreeningThresholdQuantitie', 'Release: Screening Threshold Quantities (in pounds)', 'dhsReleaseScreeningThresholdQuantities'],
                    ['casProduct.dhsTheftMinimumConcentration', 'Theft: Minimum Concentration (%)', 'dhsTheftMinimumConcentration'],
                    ['casProduct.dhsTheftScreeningThresholdQuantities', 'Theft: Screening Threshold Quantities', 'dhsTheftScreeningThresholdQuantities'],
                    ['casProduct.dhsSabotageMinimumConcentration', 'Sabotage: Minimum Concentration (%)', 'dhsSabotageMinimumConcentrationPercent'],
                    ['casProduct.dhsSabotageScreeningThresholdQuantities', 'Sabotage: Screening Threshold Quantities', 'dhsSabotageScreeningThresholdQuantities'],
                    ['casProduct.dhsSecurityIssueReleaseToxic', 'Security Issue: Release - Toxic', 'dhsSecurityIssueReleaseToxic', 'bool'],
                    ['casProduct.dhsSecurityIssueReleaseFlammables', 'Security Issue: Release - Flammables', 'dhsSecurityIssueReleaseFlammables', 'bool'],
                    ['casProduct.dhsSecurityIssueReleaseExplosives', 'Security Issue: Release - Explosives', 'dhsSecurityIssueReleaseExplosives', 'bool'],
                    ['casProduct.dhsSecurityIssueTheftCWCWP', 'Security Issue: Theft - CW/CWP', 'dhsSecurityIssueTheftCWCWP', 'bool'],
                    ['casProduct.dhsSecurityIssueTheftWME', 'Security Issue: Theft - WME', 'dhsSecurityIssueTheftWME', 'bool'],
                    ['casProduct.dhsSecurityIssueTheftEXPIEDP', 'Security Issue: Theft - EXP/IEDP', 'dhsSecurityIssueTheftEXPIEDP', 'bool'],
                    ['casProduct.dhsSecurityIssueSabotageContamination', 'Security Issue: Sabotage/Contamination', 'dhsSecurityIssueSabotageContamination', 'bool']
                  ] : [],
                ...(propertiesFilter === 'all' || propertiesFilter === 'caProp65')
                  ? [
                    ['casProduct.caprop65TypeofToxicity', 'Type of Toxicity', 'caprop65TypeofToxicity'],
                    ['casProduct.caprop65ListingMechanism', 'Listing Mechanism', 'caprop65ListingMechanism'],
                    ['casProduct.caprop65DateListed', 'Date Listed', 'caprop65DateListed', 'date'],
                    ['casProduct.caprop65NSRLorMADL', 'NSRL or MADL (µg/day)', 'caprop65NSRLorMADL']
                  ] : [],
                ...(propertiesFilter === 'all' || propertiesFilter === 'dea')
                  ? [
                    ['casProduct.deaListII', 'List II', 'deaListII', 'bool'],
                    ['casProduct.deaDeaCode', 'DEA Code', 'deaDeaCode']
                  ] : [],
                ...(propertiesFilter === 'all' || propertiesFilter === 'reach')
                  ? [
                    ['casProduct.reachExposureScenario', 'Exposure Scenario(s)', 'reachExposureScenario'],
                    ['casProduct.reachSumi', 'SUMIs', 'reachSumi']
                  ] : [],
                ...(propertiesFilter === 'all' || propertiesFilter === 'international')
                  ? [
                    ['casProduct.internationalDSL', 'DSL', 'internationalDSL', 'bool'],
                    ['casProduct.internationalNDSL', 'NDSL', 'internationalNDSL', 'bool'],
                    ['casProduct.internationalEINECS', 'EINECS', 'internationalEINECS', 'bool'],
                    ['casProduct.internationalPICCS', 'PICCS', 'internationalPICCS', 'bool'],
                    ['casProduct.internationalENCS', 'ENCS', 'internationalENCS', 'bool'],
                    ['casProduct.internationalAICS', 'AICS', 'internationalAICS', 'bool'],
                    ['casProduct.internationalIECSC', 'IECSC', 'internationalIECSC', 'bool'],
                    ['casProduct.internationalKECL', 'KECL', 'internationalKECL', 'bool']
                  ] : []
              ].map(item => renderTableItem(casProduct, item, ''))
            }
          </DivListTableWrapper>
        </>
      )}
      {actualTab === 'properties' && (
        <DivListTableWrapper>
          {
            [
              ['global.physicalState', 'Physical State', 'physicalState'],
              ['global.appearance', 'Appearance', 'appearance'],
              ['global.odor', 'Odor', 'odor'],
              ['global.odorThreshold', 'Odor Threshold', 'odorThreshold'],
              ['global.ph', 'pH', 'ph'],
              ['global.meltingPointRange', 'Melting Point/Range', 'meltingPointRange'],
              ['global.boilingPointRange', 'Boiling Point/Range', 'boilingPointRange'],
              ['global.flashPoint', 'Flash Point', 'flashPoint'],
              ['global.evaporationPoint', 'Evaporation Point', 'evaporationPoint'],
              ['global.flammabilitySolidGas', 'Flammability (solid, gas)', 'flammabilitySolidGas'],
              ['global.flammabilityOrExplosiveUpper', 'Flammability or Explosive Upper', 'flammabilityOrExplosiveUpper'],
              ['global.flammabilityOrExplosiveLower', 'Flammability or Explosive Lower', 'flammabilityOrExplosiveLower'],
              ['global.vaporPressure', 'Vapor Pressure', 'vaporPressure'],
              ['global.vaporDensity', 'Vapor Density', 'vaporDensity'],
              ['global.solubility', 'Solubility', 'solubility'],
              ['global.partitionCoefficient', 'Partition Coefficient', 'partitionCoefficient'],
              ['global.autoIgnitionTemperature', 'Auto Ignition Temperature', 'autoIgnitionTemperature'],
              ['global.decompositionTemperature', 'Decomposition Temperature', 'decompositionTemperature'],
              ['global.viscosity', 'Viscosity', 'viscosity'],
              ['global.molecularFormula', 'Molecular Formula', 'molecularFormula'],
              ['global.molecularWeight', 'Molecular Weight', 'molecularWeight'],
              ['global.recommendedUse', 'Recommended Uses', 'recommendedUse'],
              ['global.usesAdvisedAgainst', 'Uses Advised Against', 'usesAdvisedAgainst']
            ].map(item => renderTableItem(product, item, ''))
          }
        </DivListTableWrapper>
      )}
      {actualTab === 'transportation' && (
        <>
          <GridRow>
            <GridColumn width={8}>
              <DivLabelRow>
                <label><FormattedMessage id='global.filter' defaultMessage='Filter' /></label>
              </DivLabelRow>
              <Dropdown
                fluid
                selection
                value={transportationFilter}
                options={transportationFilterOptions}
                onChange={(_, { value }) => setTransportationFilter(value)}
              />
            </GridColumn>
          </GridRow>
          <DivListTableWrapper>
            {
              [
                ['global.unNumber', 'UN Number', 'UnNumber.unNumberCode'],
                ['global.properShippingName', 'Proper Shipping Name', 'ProperShippingName'],
                ['global.properTechnicalName', 'Proper Technical Name', 'ProperTechnicalName'],
                ['global.hazardClass', 'Hazard Class', 'HazardClass.classCode'],
                ['global.packagingGroup', 'Packaging Group', 'PackagingGroup.groupCode'],
                ['global.reportableQuantity', 'Reportable Quantity', transportationFilter === 'dot' ? 'ReportableQuantity' : 'ReportableQuantities'],
                ['global.environmentalHazards', 'Environmental Hazards', 'EnvironmentalHazards'],
                ['global.emsNumbers', 'Ems Numbers', 'EmsNumbers'],
                ['global.exceptions', 'Exceptions', 'Exceptions'],
                ['global.specialPrecautionForUser', 'Special Precautions For User', 'UserSpecialPrecautions'],
                ['global.marinePollutant', 'Marine Pollutant', 'MarinePollutant'],
                ['global.severeMarinePollutant', 'Severe Marine Pollutant', 'SevereMarinePollutant'],
                ['global.packagingExceptions', 'Packaging Exceptions', 'PackagingExceptions'],
                ['global.packagingNonBulk', 'Packaging Non Bulk', 'PackagingNonBulk'],
                ['global.packagingBulk', 'Packaging Bulk', 'PackagingBulk'],
                ['global.quantityLimitationsPassengerAircraftRail', 'Quantity Limitations Passenger Aircraft/Rail', 'PassengerQuantityLimitations'],
                ['global.quantityLimitationsCargoAircraftOnly', 'Quantity Limitations Cargo Aircraft Only', 'CargoAircraftQuantityLimitations'],
                ['global.vesselStowageLocation', 'Vessel Stowage Location', 'VesselStowageLocation'],
                ['global.vesselStowageOther', 'Vessel Stowage Other', 'VesselStowageOther'],
              ].map(item => renderTableItem(product, item, transportationFilter))
            }
          </DivListTableWrapper>
        </>
      )}
    </GridStyled>
  )
}

TabsContent.propTypes = {
  actualTab: PropTypes.string,
  product: PropTypes.object
}

TabsContent.defaultProps = {
  actualTab: 'info',
  product: null
}

export default injectIntl(TabsContent)