import React, { Component } from 'react'
import { object, bool, number } from 'prop-types'
import { Segment, GridRow, Grid, GridColumn, Button, Dropdown, Menu } from 'semantic-ui-react'
import { FlexSidebar, GraySegment, FlexContent } from '~/modules/inventory/components/DetailSidebar'
import { Form, Input, Dropdown as FormikDropdown } from 'formik-semantic-ui-fixed-validation'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import moment from 'moment'

import { tabs, regulatoryFilter, dropdownOptions, echoProductGrouping } from '../constants'

import DocumentManager from '~/modules/settings/components/Documents/DocumentManagerTable'
import { getSafe } from '~/utils/functions'
import { EchoProductResponse } from '~/constants/backendObjects'

const WiderSidebar = styled(FlexSidebar)`
  min-width: 545px !important;
`

const RightAlignedDiv = styled.div`
  text-align: right;
`




class CompanyProductInfo extends Component {

  state = {
    regulatoryFilter: regulatoryFilter.epa.value,
    casProductIndex: 0,
    echoProductGroup: echoProductGrouping[0].value
  }

  getInput = ({ id, defaultMessage, name }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={10}>
        <Input inputProps={{ readOnly: this.props.readOnly, id: name }} name={name} />
      </GridColumn>
    </GridRow>
  )

  getDropdown = ({ id, defaultMessage, name, props }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={10}>
        <FormikDropdown
          selection
          fluid
          name={name}
          {...props}
          options={props.options.map((el) => ({ key: el, text: el, value: el }))}
        />
      </GridColumn>
    </GridRow>
  )

  getContent = ({ values }) => {
    let { activeIndex, popupValues } = this.props

    let casProducts = getSafe(() => popupValues.companyProduct.echoProduct.elements, [])

    let markup = [
      this.getInput({ id: 'global.casIndexName', defaultMessage: 'Cas Index Name', name: 'casProduct.casProduct.casIndexName' })
    ]

    let { epa, dhs, dot, caProp65, rightToKnow, dea, international, all } = regulatoryFilter


    let dontBreak = this.state.regulatoryFilter === all.key
    switch (this.state.regulatoryFilter) {

      case all.key:
      case epa.key: {
        markup.push(
          this.getDropdown({ id: 'casProduct.epaSection302EhsTPQ', defaultMessage: 'Section 302 (EHS) TPQ', name: 'casProduct.casProduct.epaSection302EhsTPQ', props: dropdownOptions.epa.epaSection302EhsTPQ }),
          this.getDropdown({ id: 'casProduct.epaSection304EhsRQ', defaultMessage: 'Section 304 (EHS) RQ', name: 'casProduct.casProduct.epaSection304EhsRQ', props: dropdownOptions.epa.epaSection304EhsRQ }),
          this.getInput({ id: 'casProduct.epaCerclaRq', defaultMessage: 'CERCLA RQ', name: 'casProduct.casProduct.epaCerclaRq' }),
          this.getInput({ id: 'casProduct.epaSection313Tri', defaultMessage: 'Section 313 (TRI)', name: 'casProduct.casProduct.epaSection313Tri' }),
          this.getInput({ id: 'casProduct.epaCaa112TTq', defaultMessage: 'CAA 112(r) TQ', name: 'casProduct.casProduct.epaCaa112TTq' }),
          this.getInput({ id: 'casProduct.epaFifra', defaultMessage: 'FIFRA', name: 'casProduct.casProduct.epaFifra' }),
          this.getDropdown({ id: 'casProduct.epaTsca', defaultMessage: 'TSCA', name: 'casProduct.casProduct.epaTsca', props: dropdownOptions.epa.epaTsca }),
          this.getInput({ id: 'casProduct.epaTsca12b', defaultMessage: 'TSCA 12(b)', name: 'casProduct.casProduct.epaTsca12b' }),
          this.getInput({ id: 'casProduct.epaSaferChoice', defaultMessage: 'Safer Choice', name: 'casProduct.casProduct.epaSaferChoice' })
        )

        if (!dontBreak)
          break
      }

      case all.key:
      case rightToKnow.key: {
        markup.push(
          this.getInput({ id: 'casProduct.rtkMassachusettes', defaultMessage: 'Massachusettes', name: 'casProduct.casProduct.rtkMassachusettes' }),
          this.getInput({ id: 'casProduct.rtkNewJersey', defaultMessage: 'New Jersey', name: 'casProduct.casProduct.rtkNewJersey' }),
          this.getInput({ id: 'casProduct.rtkPennslyvania', defaultMessage: 'Pennslyvania', name: 'casProduct.casProduct.rtkPennslyvania' }),
          this.getInput({ id: 'casProduct.rtkIllinois', defaultMessage: 'Illinois', name: 'casProduct.casProduct.rtkIllinois' }),
          this.getInput({ id: 'casProduct.rtkRhodeIsland', defaultMessage: 'Rhode Island', name: 'casProduct.casProduct.rtkRhodeIsland' })
        )
        if (!dontBreak)
          break
      }

      case all.key:
      case dhs.key: {
        markup.push(
          this.getDropdown({ id: 'casProduct.dhsReleaseMinimumConcentration', defaultMessage: 'Release: Minimum Concentration (%)', name: 'casProduct.casProduct.dhsReleaseMinimumConcentration', props: dropdownOptions.dhs.dhsReleaseMinimumConcentration }),
          this.getDropdown({ id: 'casProduct.dhsReleaseScreeningThresholdQuantitie', defaultMessage: 'Release: Screening Threshold Quantitiees (in pounds)', name: 'casProduct.casProduct.dhsReleaseScreeningThresholdQuantitie', props: dropdownOptions.dhs.dhsReleaseScreeningThresholdQuantitie }),
          this.getInput({ id: 'casProduct.dhsTheftMinimumConcentration', defaultMessage: 'Theft: Minimum Concentration (%)', name: 'casProduct.casProduct.dhsTheftMinimumConcentration', }),
          this.getDropdown({ id: 'casProduct.dhsTheftScreeningThresholdQuantities', defaultMessage: 'Theft: Screening Threshold Quantitie', name: 'casProduct.casProduct.dhsTheftScreeningThresholdQuantities', props: dropdownOptions.dhs.dhsTheftScreeningThresholdQuantities }),
          this.getDropdown({ id: 'casProduct.dhsSabotageMinimumConcentration', defaultMessage: 'Sabotage: Minimum Concentration (%)', name: 'casProduct.casProduct.dhsSabotageMinimumConcentration', props: dropdownOptions.dhs.dhsSabotageMinimumConcentration }),
          this.getDropdown({ id: 'casProduct.dhsSabotageScreeningThresholdQuantities', defaultMessage: 'Sabotage: Screening Threshold Quantities', name: 'casProduct.casProduct.dhsSabotageScreeningThresholdQuantities', props: dropdownOptions.dhs.dhsSabotageScreeningThresholdQuantities }),
          this.getInput({ id: 'casProduct.dhsSecurityIssueReleaseToxic', defaultMessage: 'Security Issue: Release - Toxic', name: 'casProduct.casProduct.dhsSecurityIssueReleaseToxic' }),
          this.getInput({ id: 'casProduct.dhsSecurityIssueReleaseFlammables', defaultMessage: 'Security Issue: Release - Flammables', name: 'casProduct.casProduct.dhsSecurityIssueReleaseFlammables' }),
          this.getInput({ id: 'casProduct.dhsSecurityIssueReleaseExplosives', defaultMessage: 'Security Issue: Release - Explosives', name: 'casProduct.casProduct.dhsSecurityIssueReleaseExplosives' }),
          this.getInput({ id: 'casProduct.dhsSecurityIssueTheftCWCWP', defaultMessage: 'Security Issue: Theft - CW/CWP', name: 'casProduct.casProduct.dhsSecurityIssueTheftCWCWP' }),
          this.getInput({ id: 'casProduct.dhsSecurityIssueTheftWME', defaultMessage: 'Security Issue: Theft - WME', name: 'casProduct.casProduct.dhsSecurityIssueTheftWME' }),
          this.getInput({ id: 'casProduct.dhsSecurityIssueTheftEXPIEDP', defaultMessage: 'Security Issue: Theft - EXP/IEDP', name: 'casProduct.casProduct.dhsSecurityIssueTheftEXPIEDP' }),
          this.getInput({ id: 'casProduct.dhsSecurityIssueSabotageContamination', defaultMessage: 'Security Issue: Sabotage/Contamination', name: 'casProduct.casProduct.dhsSecurityIssueSabotageContamination' })
        )
        if (!dontBreak)
          break
      }

      case all.key:
      case caProp65.key: {
        markup.push(
          this.getDropdown({ id: 'casProduct.caprop65TypeofToxicity', defaultMessage: 'Type of Toxicity', name: 'casProduct.casProduct.caprop65TypeofToxicity', props: dropdownOptions.ca65Prop.caprop65TypeofToxicity }),
          this.getDropdown({ id: 'casProduct.caprop65ListingMechanism', defaultMessage: 'Listing Mechanism', name: 'casProduct.casProduct.', props: dropdownOptions.ca65Prop.caprop65ListingMechanism }),
          this.getInput({ id: 'casProduct.caprop65DateListed', defaultMessage: 'Date Listed', name: 'casProduct.casProduct.caprop65DateListed' }),
          this.getInput({ id: 'casProduct.caprop65NSRLorMADL', defaultMessage: 'NSRL or MADL (µg/day)', name: 'casProduct.casProduct.caprop65NSRLorMADL' }),
        )

        if (!dontBreak)
          break
      }

      case all.key:
      case dea.key: {
        markup.push(
          this.getInput({ id: 'casProduct.deaListII', defaultMessage: 'List II', name: 'casProduct.casProduct.deaListII' }),
          this.getInput({ id: 'casProduct.deaDeaCode', defaultMessage: 'DEA Code', name: 'casProduct.casProduct.deaDeaCode' })
        )

        if (!dontBreak)
          break
      }

      case all.key:
      case international.key: {
        markup.push(
          this.getInput({ id: 'casProduct.internationalDSL', defaultMessage: 'DSL', name: 'casProduct.casProduct.internationalDSL' }),
          this.getInput({ id: 'casProduct.internationalNDSL', defaultMessage: 'NDSL', name: 'casProduct.casProduct.internationalNDSL' }),
          this.getInput({ id: 'casProduct.internationalEINECS', defaultMessage: 'EINECS', name: 'casProduct.casProduct.internationalEINECS' }),
          this.getInput({ id: 'casProduct.internationalPICCS', defaultMessage: 'PICCS', name: 'casProduct.casProduct.internationalPICCS' }),
          this.getInput({ id: 'casProduct.internationalENCS', defaultMessage: 'ENCS', name: 'casProduct.casProduct.internationalENCS' }),
          this.getInput({ id: 'casProduct.internationalAICS', defaultMessage: 'AICS', name: 'casProduct.casProduct.internationalAICS' }),
          this.getInput({ id: 'casProduct.internationalIECSC', defaultMessage: 'IECSC', name: 'casProduct.casProduct.internationalIECSC' }),
          this.getInput({ id: 'casProduct.internationalKECL', defaultMessage: 'KECL', name: 'casProduct.casProduct.internationalKECL' }),
        )
        if (!dontBreak)
          break
      }
    }

    switch (activeIndex) {
      case 0: { // Info
        return (
          <Grid verticalAlign='middle'>
            {this.getInput({ id: 'global.productName', defaultMessage: 'Product Name', name: 'productName' })}
            {this.getInput({ id: 'global.manufacturer', defaultMessage: 'Manufacturer', name: 'manufacturer' })}
            {this.getInput({ id: 'global.manufacturerProductCode', defaultMessage: 'Manufacturer Product Code', name: 'manufactureProductCode' })}
            {this.getInput({ id: 'global.emergencyNumber', defaultMessage: 'Emergency Number', name: 'emergencyNumber' })}
            {this.getInput({ id: 'global.esin', defaultMessage: 'ESIN', name: 'esin' })}
            {this.getInput({ id: 'global.recommendedUse', defaultMessage: 'Recommended Use', name: 'recommendedUse' })}
            {this.getInput({ id: 'global.recommendedRestrictions', defaultMessage: 'Recommended Restrictions', name: 'recommendedRestrictions' })}
            {this.getInput({ id: 'global.version', defaultMessage: 'Version', name: 'sdsVersionNumber' })}
            {this.getInput({ id: 'global.revisionDate', defaultMessage: 'Revision Date', name: 'sdsRevisionDate' })}
            {this.getInput({ id: 'global.synonyms', defaultMessage: 'Synonyms', name: 'synonyms' })}
            {this.getInput({ id: 'global.formula', defaultMessage: 'Formula', name: 'molecularFormula' })}
            {this.getInput({ id: 'global.molecularWeight', defaultMessage: 'Molecular Weight', name: 'molecularWeight' })}
          </Grid>
        )
      }
      case 1: { // Properties
        return (
          <Grid verticalAlign='middle'>
            {this.getInput({ id: 'global.physicalState', defaultMessage: 'Physical State', name: 'physicalState' })}
            {this.getInput({ id: 'global.appearance', defaultMessage: 'Appearance', name: 'appearance' })}
            {this.getInput({ id: 'global.odor', defaultMessage: 'Odor', name: 'odor' })}
            {this.getInput({ id: 'global.odorThreshold', defaultMessage: 'Odor Threshold', name: 'odorThreshold' })}
            {this.getInput({ id: 'global.ph', defaultMessage: 'pH', name: 'ph' })}
            {this.getInput({ id: 'global.meltingPointRange', defaultMessage: 'Melting Point/Range', name: 'meltingPointRange' })}
            {this.getInput({ id: 'global.boilingPointRange', defaultMessage: 'Boiling Point/Range', name: 'boilingPointRange' })}
            {this.getInput({ id: 'global.flashPoint', defaultMessage: 'Flash Point', name: 'flashPoint' })}
            {this.getInput({ id: 'global.evaporationPoint', defaultMessage: 'Evaporation Point', name: 'evaporationPoint' })}
            {this.getInput({ id: 'global.flammabilitySolidGas', defaultMessage: 'Flammability (solid, gas)', name: 'flammabilitySolidGas' })}
            {this.getInput({ id: 'global.flammabilityOrExplosiveUpper', defaultMessage: 'Flammability or Explosive Upper', name: 'flammabilityOrExplosiveUpper' })}
            {this.getInput({ id: 'global.flammabilityOrExplosiveLower', defaultMessage: 'Flammability or Explosive Lower', name: 'flammabilityOrExplosiveLower' })}
            {this.getInput({ id: 'global.vaporPressure', defaultMessage: 'Vapor Pressure', name: 'vaporPressure' })}
            {this.getInput({ id: 'global.vaporDensity', defaultMessage: 'Vapor Density', name: 'vaporDensity' })}
            {this.getInput({ id: 'global.specificGravity', defaultMessage: 'Specific Gravity', name: 'specificGravity' })}
            {this.getInput({ id: 'global.solubility', defaultMessage: 'Solubility', name: 'solubility' })}
            {this.getInput({ id: 'global.partitionCoefficient', defaultMessage: 'Partition Coefficient', name: 'partitionCoefficient' })}
            {this.getInput({ id: 'global.autoIgnitionTemperature', defaultMessage: 'Auto Ignition Temperature', name: 'autoIgnitionTemperature' })}
            {this.getInput({ id: 'global.decompositionTemperature', defaultMessage: 'Decomposition Temperature', name: 'decompositionTemperature' })}
            {this.getInput({ id: 'global.viscosity', defaultMessage: 'Viscosity', name: 'viscosity' })}
            {this.getInput({ id: 'global.molecularFormula', defaultMessage: 'Molecular Formula', name: 'molecularFormula' })}
            {this.getInput({ id: 'global.molecularWeight', defaultMessage: 'Molecular Weight', name: 'molecularWeight' })}
            {this.getInput({ id: 'global.specificVolume', defaultMessage: 'Specific Volume', name: 'specificVolume' })}
            {this.getInput({ id: 'global.recommendedUse', defaultMessage: 'Recommended Uses', name: 'recommendedUse' })}
            {this.getInput({ id: 'global.usesAdvisedAgainst', defaultMessage: 'Uses Advised Against', name: 'usesAdvisedAgainst' })}
            {this.getInput({ id: 'global.criticalTemperature', defaultMessage: 'Critical Temperature', name: 'criticalTemperature' })}
            {this.getInput({ id: 'global.gasDensity', defaultMessage: 'Gas Density', name: 'gasDensity' })}
            {this.getInput({ id: 'global.relativeDensity', defaultMessage: 'Relative Density', name: 'relativeDensity' })}
            {this.getInput({ id: 'global.flowTime', defaultMessage: 'Flow Time (ISO 2431)', name: 'flowTimeISO2431' })}
            {this.getInput({ id: 'global.heatOfCombustion', defaultMessage: 'Heat of Combustion', name: 'heatOfCombustion' })}
          </Grid>
          // {this.getInput({ id: 'global.', defaultMessage: '', name: '' })}
        )
      }

      case 2: { // Documents
        return (
          <DocumentManager items={values.attachments} edit={false} deletable={false} />
        )
      }

      case 3: { // Regulatory
        return (
          <Grid verticalAlign='middle'>
            <GridRow>
              <GridColumn computer={8}>
                <label><FormattedMessage id='global.casProduct' defaultMessage='CAS Product' /></label>
                <Dropdown
                  fluid selection
                  value={values.casProduct.id}
                  options={casProducts.map((cp) => ({ key: cp.id, text: cp.displayName, value: cp.id }))}
                  onChange={(_, { value }) => this.setState({ casProductIndex: value })} />
              </GridColumn>

              <GridColumn computer={8}>
                <label><FormattedMessage id='global.filter' defaultMessage='Filter' /></label>
                <Dropdown
                  fluid selection
                  value={this.state.regulatoryFilter}
                  options={Object.keys(regulatoryFilter).map((key) => regulatoryFilter[key])}
                  onChange={(_, { value }) => this.setState({ regulatoryFilter: value })} />
              </GridColumn>

            </GridRow>

            {markup.map((el) => el)}
          </Grid>

        )
      }

      case 4: { // Transportation
        return (
          <Grid verticalAlign='middle'>
            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='global.filter' defaultMessage='Filter' />
              </GridColumn>
              <GridColumn computer={10}>
                <Dropdown
                  selection fluid
                  options={echoProductGrouping}
                  value={this.state.echoProductGroup}
                  onChange={(_, { value }) => this.setState({ echoProductGroup: value })}
                />
              </GridColumn>
            </GridRow>
            {this.getInput({ id: 'global.unNumber', defaultMessage: 'UN Number', name: `${this.state.echoProductGroup}UnNumber` })}
            {this.getInput({ id: 'global.properShippingName', defaultMessage: 'Proper Shipping Name', name: `${this.state.echoProductGroup}ProperShippingName` })}
            {this.getInput({ id: 'global.properTechnicalName', defaultMessage: 'Proper Technical Name', name: `${this.state.echoProductGroup}ProperTechnicalName` })}
            {this.getInput({ id: 'global.hazardClass', defaultMessage: 'Hazard Class', name: `${this.state.echoProductGroup}HazardClass` })}
            {this.getInput({ id: 'global.packagingGroup', defaultMessage: 'Packaging Group', name: `${this.state.echoProductGroup}PackagingGroup` })}
            {this.getInput({ id: 'global.reportableQuantity', defaultMessage: 'Reportable Quantity', name: `${this.state.echoProductGroup}ReportableQuantity` })}
            {this.getInput({ id: 'global.enviromentalHazards', defaultMessage: 'Enviromental Hazards', name: `${this.state.echoProductGroup}EnviromentalHazards` })} {/* ?? */}
            {this.getInput({ id: 'global.emsNumbers', defaultMessage: 'Ems Numbers', name: `${this.state.echoProductGroup}EmsNumbers` })} {/* ?? */}
            {this.getInput({ id: 'global.exceptions', defaultMessage: 'Exceptions', name: `${this.state.echoProductGroup}Exceptions` })} {/* ?? */}
            {this.getInput({ id: 'global.specialPrecautionForUser', defaultMessage: 'Special Precautions For User', name: `${this.state.echoProductGroup}SpecialPrecautionsForUser` })} {/* ?? */}
            {this.getInput({ id: 'global.marinePollutant', defaultMessage: 'Marine Pollutant', name: `${this.state.echoProductGroup}MarinePollutant` })}
            {this.getInput({ id: 'global.severeMarinePollutant', defaultMessage: 'Severe Marine Pollutant', name: `${this.state.echoProductGroup}SevereMarinePollutant` })}
            {this.getInput({ id: 'global.packagingExceptions', defaultMessage: 'Packaging Exceptions', name: `${this.state.echoProductGroup}PackagingExceptions` })} {/* ?? */}
            {this.getInput({ id: 'global.packagingNonBulk', defaultMessage: 'Packaging Non Bulk', name: `${this.state.echoProductGroup}PackagingNonBulk` })} {/* ?? */}
            {this.getInput({ id: 'global.packagingBulk', defaultMessage: 'Packaging Bulk', name: `${this.state.echoProductGroup}PackagingBulk` })} {/* ?? */}
            {this.getInput({ id: 'global.quantityLimitationsPassengerAircraftRail', defaultMessage: 'Quantity Limitations Passenger Aircraft/Rail', name: `${this.state.echoProductGroup}QuantityLimitationsPassengerAircraftRail` })} {/* ?? */}
            {this.getInput({ id: 'global.quantityLimitationsCargoAircraftOnly', defaultMessage: 'Quantity Limitations Cargo Aircraft Only', name: `${this.state.echoProductGroup}QuantityLimitationsCargoAircraftOnly` })} {/* ?? */}
            {this.getInput({ id: 'global.vesselStowageLocation', defaultMessage: 'Vessel Stowage Location', name: `${this.state.echoProductGroup}VesselStowageLocation` })} {/* ?? */}
            {this.getInput({ id: 'global.vesselStowageOther', defaultMessage: 'Vessel Stowage Other', name: `${this.state.echoProductGroup}VesselStowageOther` })} {/* ?? */}
          </Grid>
        )
      }

      default: return null
    }
  }

  getApiConfig = () => ({
    url: '/prodex/api/attachments/datagrid/',
    searchToFilter: v => v ? ([
      { operator: 'LIKE', path: 'Attachment.name', values: [`%${v}%`] },
      { operator: 'LIKE', path: 'Attachment.customName', values: [`%${v}%`] },
      { operator: 'LIKE', path: 'Attachment.documentType.name', values: [`%${v}%`] },
    ]) : [],
    params: {
      orOperator: true
    }
  })

  render() {
    let {
      popupValues, isOpen,
      activeIndex, closePopup,
      tabChanged, intl: { formatMessage } } = this.props

    let { companyProduct } = popupValues

    try {
      var { echoProduct } = companyProduct
    } catch (e) {
      console.error(e)
      return null
    }

    let initialValues = {
      ...EchoProductResponse,
      ...companyProduct,
      ...echoProduct,
      attachments: companyProduct.attachments.concat(popupValues.attachments, echoProduct.attachments),
      productName: getSafe(() => echoProduct.name, ''),
      manufacturer: getSafe(() => echoProduct.manufacturer.name, ''),
      manufacturerProductCode: getSafe(() => echoProduct.mfrProductCodes.toString().replace(' ', ', '), ''),
      sdsRevisionDate: echoProduct && echoProduct.sdsRevisionDate ? moment(echoProduct.sdsRevisionDate).format('MM/DD/YYYY') : null,
      casProduct: getSafe(() => echoProduct.elements[this.state.casProductIndex], null),
    }

    return (
      <WiderSidebar visible={isOpen} direction='right' width='very wide'>
        <FlexContent>
          <Segment basic>
            <Form
              enableReinitialize
              initialValues={initialValues}
              render={(formikProps) => {
                return (
                  <>
                    <Menu pointing secondary>
                      {tabs.map((tab, i) => (
                        <Menu.Item
                          onClick={() => tabChanged(i)}
                          active={activeIndex === i}
                        >{formatMessage(tab.text)}</Menu.Item>
                      ))}
                    </Menu>
                    <Segment basic>{this.getContent(formikProps)}</Segment>
                  </>
                )
              }}
            />
          </Segment>
        </FlexContent>

        <GraySegment>
          <RightAlignedDiv>
            <Button onClick={closePopup}>
              <FormattedMessage id='global.close' defaultMessage='Close'>{text => text}</FormattedMessage>
            </Button>
          </RightAlignedDiv>
        </GraySegment>

      </WiderSidebar>
    )
  }
}

CompanyProductInfo.propTypes = {
  popupValues: object,
  isOpen: bool,
  activeIndex: number,
  readOnly: bool
}

CompanyProductInfo.defaultProps = {
  popupValues: {},
  isOpen: false,
  activeIndex: 0,
  readOnly: true
}

export default injectIntl(CompanyProductInfo)

