import React, { Component } from 'react'
import { object, bool, number, node, func, array } from 'prop-types'
import {
  Segment,
  GridRow,
  Grid,
  GridColumn,
  Button,
  Dropdown,
  Menu,
  Sidebar,
  Table
} from 'semantic-ui-react'
import {
  FlexSidebar,
  GraySegment,
  FlexContent
} from '~/modules/inventory/components/DetailSidebar'
import {
  Form,
  Input,
  Dropdown as FormikDropdown
} from 'formik-semantic-ui-fixed-validation'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import moment from 'moment'
import * as Yup from 'yup'

import {
  tabs,
  regulatoryFilter,
  dropdownOptions,
  echoProductGrouping,
  yesNoOptions
} from '../constants'
import { errorMessages } from '~/constants/yupValidation'

import DocumentManager from '~/modules/settings/components/Documents/DocumentManagerTable'
import { getSafe, formatAssay } from '~/utils/functions'
import {
  EchoProductResponse,
  CasProductResponse
} from '~/constants/backendObjects'

const WiderSidebar = styled(FlexSidebar)`
  min-width: 545px !important;
`

const RightAlignedDiv = styled.div`
  text-align: right;
`

const validationSchema = Yup.object().shape({
  casProduct: Yup.object().shape({
    casNumber: Yup.string().required(errorMessages.requiredMessage),
    casIndexName: Yup.string().required(errorMessages.requiredMessage)
  })
})

class CompanyProductInfo extends Component {
  state = {
    regulatoryFilter: regulatoryFilter.all.value,
    casProductIndex: 0,
    echoProductGroup: echoProductGrouping[0].value
  }

  getElements = ({ id, defaultMessage, elements }) => {
    return (
      <>
        <GridRow>
          <GridColumn width={16}>
            <FormattedMessage id={id} defaultMessage={defaultMessage} />
          </GridColumn>
        </GridRow>
        <Table basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <FormattedMessage
                  id='global.elementName'
                  defaultMessage='Element Name'
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage
                  id='global.casNumber'
                  defaultMessage='CAS Number'
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage id='global.assay' defaultMessage='Assay' />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {elements.map((element, index) => (
              <Table.Row>
                <Table.Cell>
                  {element.proprietary
                    ? element.name
                    : element.casProduct.casIndexName}
                </Table.Cell>
                <Table.Cell>
                  {element.proprietary ? '' : element.casProduct.casNumber}
                </Table.Cell>
                <Table.Cell>
                  {formatAssay(element.assayMin, element.assayMax)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    )
  }

  getInput = ({ id, defaultMessage, name }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={10}>
        <Input
          inputProps={{ readOnly: this.props.readOnly, id: name }}
          name={name}
        />
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
          inputProps={{ disabled: this.props.readOnly }}
          options={props.options.map(el =>
            typeof el === 'object' ? el : { key: el, text: el, value: el }
          )}
        />
      </GridColumn>
    </GridRow>
  )

  getSharedContent = (prefix = '') => (
    <>
      {this.getInput({
        id: 'global.physicalState',
        defaultMessage: 'Physical State',
        name: `${prefix}physicalState`
      })}
      {this.getInput({
        id: 'global.appearance',
        defaultMessage: 'Appearance',
        name: `${prefix}appearance`
      })}
      {this.getInput({
        id: 'global.odor',
        defaultMessage: 'Odor',
        name: `${prefix}odor`
      })}
      {this.getInput({
        id: 'global.odorThreshold',
        defaultMessage: 'Odor Threshold',
        name: `${prefix}odorThreshold`
      })}
      {this.getInput({
        id: 'global.ph',
        defaultMessage: 'pH',
        name: `${prefix}ph`
      })}
      {this.getInput({
        id: 'global.meltingPointRange',
        defaultMessage: 'Melting Point/Range',
        name: `${prefix}meltingPointRange`
      })}
      {this.getInput({
        id: 'global.boilingPointRange',
        defaultMessage: 'Boiling Point/Range',
        name: `${prefix}boilingPointRange`
      })}
      {this.getInput({
        id: 'global.flashPoint',
        defaultMessage: 'Flash Point',
        name: `${prefix}flashPoint`
      })}
      {this.getInput({
        id: 'global.evaporationPoint',
        defaultMessage: 'Evaporation Point',
        name: `${prefix}evaporationPoint`
      })}
      {this.getInput({
        id: 'global.flammabilitySolidGas',
        defaultMessage: 'Flammability (solid, gas)',
        name: `${prefix}flammabilitySolidGas`
      })}
      {this.getInput({
        id: 'global.flammabilityOrExplosiveUpper',
        defaultMessage: 'Flammability or Explosive Upper',
        name: `${prefix}flammabilityOrExplosiveUpper`
      })}
      {this.getInput({
        id: 'global.flammabilityOrExplosiveLower',
        defaultMessage: 'Flammability or Explosive Lower',
        name: `${prefix}flammabilityOrExplosiveLower`
      })}
      {this.getInput({
        id: 'global.vaporPressure',
        defaultMessage: 'Vapor Pressure',
        name: `${prefix}vaporPressure`
      })}
      {this.getInput({
        id: 'global.vaporDensity',
        defaultMessage: 'Vapor Density',
        name: `${prefix}vaporDensity`
      })}
      {/* {this.getInput({ id: 'global.specificGravity', defaultMessage: 'Specific Gravity', name: `${prefix}specificGravity` })} */}
      {this.getInput({
        id: 'global.solubility',
        defaultMessage: 'Solubility',
        name: `${prefix}solubility`
      })}
      {this.getInput({
        id: 'global.partitionCoefficient',
        defaultMessage: 'Partition Coefficient',
        name: `${prefix}partitionCoefficient`
      })}
      {this.getInput({
        id: 'global.autoIgnitionTemperature',
        defaultMessage: 'Auto Ignition Temperature',
        name: `${prefix}autoIgnitionTemperature`
      })}
      {this.getInput({
        id: 'global.decompositionTemperature',
        defaultMessage: 'Decomposition Temperature',
        name: `${prefix}decompositionTemperature`
      })}
      {this.getInput({
        id: 'global.viscosity',
        defaultMessage: 'Viscosity',
        name: `${prefix}viscosity`
      })}
      {this.getInput({
        id: 'global.molecularFormula',
        defaultMessage: 'Molecular Formula',
        name: `${prefix}molecularFormula`
      })}
      {this.getInput({
        id: 'global.molecularWeight',
        defaultMessage: 'Molecular Weight',
        name: `${prefix}molecularWeight`
      })}
      {this.getInput({
        id: 'global.specificVolume',
        defaultMessage: 'Specific Volume',
        name: `${prefix}specificVolume`
      })}
      {this.getInput({
        id: 'global.recommendedUse',
        defaultMessage: 'Recommended Uses',
        name: `${prefix}recommendedUses`
      })}
      {this.getInput({
        id: 'global.usesAdvisedAgainst',
        defaultMessage: 'Uses Advised Against',
        name: `${prefix}usesAdvisedAgainst`
      })}
      {this.getInput({
        id: 'global.criticalTemperature',
        defaultMessage: 'Critical Temperature',
        name: `${prefix}criticalTemperature`
      })}
      {this.getInput({
        id: 'global.gasDensity',
        defaultMessage: 'Gas Density',
        name: `${prefix}gasDensity`
      })}
      {this.getInput({
        id: 'global.relativeDensity',
        defaultMessage: 'Relative Density',
        name: `${prefix}relativeDensity`
      })}
      {this.getInput({
        id: 'global.flowTime',
        defaultMessage: 'Flow Time (ISO 2431)',
        name: `${prefix}flowTimeIso2431`
      })}
      {this.getInput({
        id: 'global.heatOfCombustion',
        defaultMessage: 'Heat of Combustion',
        name: `${prefix}heatOfCombustion`
      })}
    </>
  )

  componentDidUpdate() {
    // When you switch different Products and previous product had casProductIndex bigger value than new product casProducts count, set index to 0 so dropdown value is correctly displayed
    if (this.props.readOnly && this.props.isOpen)
      if (
        this.state.casProductIndex + 1 >
        getSafe(
          () =>
            this.props.popupValues.companyProduct.echoProduct.elements.length,
          0
        )
      )
        this.setState({ casProductIndex: 0 })
  }

  renderCasProduct = values => {
    let { popupValues, readOnly } = this.props

    let casProducts = getSafe(
      () => popupValues.companyProduct.echoProduct.elements,
      []
    )

    let markup = [
      this.getInput({
        id: 'global.casIndexName',
        defaultMessage: 'Cas Index Name',
        name: 'casProduct.casIndexName'
      })
    ]

    let {
      epa,
      dhs,
      /*dot,*/ caProp65,
      rightToKnow,
      dea,
      international,
      all
    } = regulatoryFilter

    let dontBreak = this.state.regulatoryFilter === all.key
    switch (this.state.regulatoryFilter) {
      case all.key:
      case epa.key: {
        markup.push(
          this.getDropdown({
            id: 'casProduct.epaSection302EhsTPQ',
            defaultMessage: 'Section 302 (EHS) TPQ',
            name: 'casProduct.epaSection302EhsTPQ',
            props: dropdownOptions.epa.epaSection302EhsTPQ
          }),
          this.getDropdown({
            id: 'casProduct.epaSection304EhsRQ',
            defaultMessage: 'Section 304 (EHS) RQ',
            name: 'casProduct.epaSection304EhsRQ',
            props: dropdownOptions.epa.epaSection304EhsRQ
          }),
          this.getInput({
            id: 'casProduct.epaCerclaRq',
            defaultMessage: 'CERCLA RQ',
            name: 'casProduct.epaCerclaRq'
          }),
          this.getDropdown({
            id: 'casProduct.epaSection313Tri',
            defaultMessage: 'Section 313 (TRI)',
            name: 'casProduct.epaSection313Tri',
            props: yesNoOptions
          }),
          this.getInput({
            id: 'casProduct.epaCaa112TTq',
            defaultMessage: 'CAA 112(r) TQ',
            name: 'casProduct.epaCaa112TTq'
          }),
          this.getDropdown({
            id: 'casProduct.epaFifra',
            defaultMessage: 'FIFRA',
            name: 'casProduct.epaFifra',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.epaTsca',
            defaultMessage: 'TSCA',
            name: 'casProduct.epaTsca',
            props: dropdownOptions.epa.epaTsca
          }),
          this.getDropdown({
            id: 'casProduct.epaTsca12b',
            defaultMessage: 'TSCA 12(b)',
            name: 'casProduct.epaTsca12b',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.epaSaferChoice',
            defaultMessage: 'Safer Choice',
            name: 'casProduct.epaSaferChoice',
            props: yesNoOptions
          })
        )

        if (!dontBreak) break
      }

      case all.key:
      case rightToKnow.key: {
        markup.push(
          this.getDropdown({
            id: 'casProduct.rtkMassachusettes',
            defaultMessage: 'Massachusettes',
            name: 'casProduct.rtkMassachusettes',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.rtkNewJersey',
            defaultMessage: 'New Jersey',
            name: 'casProduct.rtkNewJersey',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.rtkPennslyvania',
            defaultMessage: 'Pennslyvania',
            name: 'casProduct.rtkPennslyvania',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.rtkIllinois',
            defaultMessage: 'Illinois',
            name: 'casProduct.rtkIllinois',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.rtkRhodeIsland',
            defaultMessage: 'Rhode Island',
            name: 'casProduct.rtkRhodeIsland',
            props: yesNoOptions
          })
        )
        if (!dontBreak) break
      }

      case all.key:
      case dhs.key: {
        markup.push(
          this.getDropdown({
            id: 'casProduct.dhsReleaseMinimumConcentration',
            defaultMessage: 'Release: Minimum Concentration (%)',
            name: 'casProduct.dhsReleaseMinimumConcentration',
            props: dropdownOptions.dhs.dhsReleaseMinimumConcentration
          }),
          this.getDropdown({
            id: 'casProduct.dhsReleaseScreeningThresholdQuantitie',
            defaultMessage:
              'Release: Screening Threshold Quantitiees (in pounds)',
            name: 'casProduct.dhsReleaseScreeningThresholdQuantities',
            props: dropdownOptions.dhs.dhsReleaseScreeningThresholdQuantitie
          }),
          this.getInput({
            id: 'casProduct.dhsTheftMinimumConcentration',
            defaultMessage: 'Theft: Minimum Concentration (%)',
            name: 'casProduct.dhsTheftMinimumConcentration'
          }),
          this.getDropdown({
            id: 'casProduct.dhsTheftScreeningThresholdQuantities',
            defaultMessage: 'Theft: Screening Threshold Quantitie',
            name: 'casProduct.dhsTheftScreeningThresholdQuantities',
            props: dropdownOptions.dhs.dhsTheftScreeningThresholdQuantities
          }),
          this.getDropdown({
            id: 'casProduct.dhsSabotageMinimumConcentration',
            defaultMessage: 'Sabotage: Minimum Concentration (%)',
            name: 'casProduct.dhsSabotageMinimumConcentrationPercent',
            props: dropdownOptions.dhs.dhsSabotageMinimumConcentration
          }),
          this.getDropdown({
            id: 'casProduct.dhsSabotageScreeningThresholdQuantities',
            defaultMessage: 'Sabotage: Screening Threshold Quantities',
            name: 'casProduct.dhsSabotageScreeningThresholdQuantities',
            props: dropdownOptions.dhs.dhsSabotageScreeningThresholdQuantities
          }),
          this.getDropdown({
            id: 'casProduct.dhsSecurityIssueReleaseToxic',
            defaultMessage: 'Security Issue: Release - Toxic',
            name: 'casProduct.dhsSecurityIssueReleaseToxic',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.dhsSecurityIssueReleaseFlammables',
            defaultMessage: 'Security Issue: Release - Flammables',
            name: 'casProduct.dhsSecurityIssueReleaseFlammables',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.dhsSecurityIssueReleaseExplosives',
            defaultMessage: 'Security Issue: Release - Explosives',
            name: 'casProduct.dhsSecurityIssueReleaseExplosives',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.dhsSecurityIssueTheftCWCWP',
            defaultMessage: 'Security Issue: Theft - CW/CWP',
            name: 'casProduct.dhsSecurityIssueTheftCWCWP',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.dhsSecurityIssueTheftWME',
            defaultMessage: 'Security Issue: Theft - WME',
            name: 'casProduct.dhsSecurityIssueTheftWME',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.dhsSecurityIssueTheftEXPIEDP',
            defaultMessage: 'Security Issue: Theft - EXP/IEDP',
            name: 'casProduct.dhsSecurityIssueTheftEXPIEDP',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.dhsSecurityIssueSabotageContamination',
            defaultMessage: 'Security Issue: Sabotage/Contamination',
            name: 'casProduct.dhsSecurityIssueSabotageContamination',
            props: yesNoOptions
          })
        )
        if (!dontBreak) break
      }

      case all.key:
      case caProp65.key: {
        markup.push(
          this.getDropdown({
            id: 'casProduct.caprop65TypeofToxicity',
            defaultMessage: 'Type of Toxicity',
            name: 'casProduct.caprop65TypeofToxicity',
            props: dropdownOptions.ca65Prop.caprop65TypeofToxicity
          }),
          this.getDropdown({
            id: 'casProduct.caprop65ListingMechanism',
            defaultMessage: 'Listing Mechanism',
            name: 'casProduct.caprop65ListingMechanism',
            props: dropdownOptions.ca65Prop.caprop65ListingMechanism
          }),
          this.getInput({
            id: 'casProduct.caprop65DateListed',
            defaultMessage: 'Date Listed',
            name: 'casProduct.caprop65DateListed'
          }),
          this.getInput({
            id: 'casProduct.caprop65NSRLorMADL',
            defaultMessage: 'NSRL or MADL (µg/day)',
            name: 'casProduct.caprop65NSRLorMADL'
          })
        )

        if (!dontBreak) break
      }

      case all.key:
      case dea.key: {
        markup.push(
          this.getDropdown({
            id: 'casProduct.deaListII',
            defaultMessage: 'List II',
            name: 'casProduct.deaListII',
            props: yesNoOptions
          }),
          this.getInput({
            id: 'casProduct.deaDeaCode',
            defaultMessage: 'DEA Code',
            name: 'casProduct.deaDeaCode'
          })
        )

        if (!dontBreak) break
      }

      case all.key:
      case international.key: {
        markup.push(
          this.getDropdown({
            id: 'casProduct.internationalDSL',
            defaultMessage: 'DSL',
            name: 'casProduct.internationalDSL',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.internationalNDSL',
            defaultMessage: 'NDSL',
            name: 'casProduct.internationalNDSL',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.internationalEINECS',
            defaultMessage: 'EINECS',
            name: 'casProduct.internationalEINECS',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.internationalPICCS',
            defaultMessage: 'PICCS',
            name: 'casProduct.internationalPICCS',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.internationalENCS',
            defaultMessage: 'ENCS',
            name: 'casProduct.internationalENCS',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.internationalAICS',
            defaultMessage: 'AICS',
            name: 'casProduct.internationalAICS',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.internationalIECSC',
            defaultMessage: 'IECSC',
            name: 'casProduct.internationalIECSC',
            props: yesNoOptions
          }),
          this.getDropdown({
            id: 'casProduct.internationalKECL',
            defaultMessage: 'KECL',
            name: 'casProduct.internationalKECL',
            props: yesNoOptions
          })
        )
        if (!dontBreak) break
      }
    }

    return (
      <>
        <GridRow>
          <GridColumn computer={8}>
            {readOnly ? (
              <>
                <label>
                  <FormattedMessage
                    id='global.casProduct'
                    defaultMessage='CAS Product'
                  />
                </label>
                <Dropdown
                  fluid
                  selection
                  value={getSafe(() => values.casProduct.id)}
                  options={casProducts.map(cp => {
                    try {
                      var text = `${cp.casProduct.casNumber} ${cp.casProduct.casIndexName}`
                    } catch {
                      var text = cp.displayName
                    }

                    return {
                      key: cp.id,
                      text: `${text} ${formatAssay(
                        values.assayMin,
                        values.assayMax
                      )}`,
                      value: cp.id
                    }
                  })}
                  onChange={(_, data) =>
                    this.setState({
                      casProductIndex: data.options.findIndex(
                        el => el.value === data.value
                      )
                    })
                  }
                />
              </>
            ) : (
                this.getInput({
                  id: 'global.casNumber',
                  defaultMessage: 'CAS Number',
                  name: 'casProduct.casNumber'
                })
              )}
          </GridColumn>

          <GridColumn computer={8}>
            <label>
              <FormattedMessage
                id='global.propsFilter'
                defaultMessage='Properties Filter'
              />
            </label>
            <Dropdown
              fluid
              selection
              value={this.state.regulatoryFilter}
              options={Object.keys(regulatoryFilter).map(
                key => regulatoryFilter[key]
              )}
              onChange={(_, { value }) =>
                this.setState({ regulatoryFilter: value })
              }
            />
          </GridColumn>
        </GridRow>
        {markup.map(el => el)}
        {this.state.regulatoryFilter === all.key &&
          this.getSharedContent('casProduct.')}
      </>
    )
  }

  getContent = ({ values }) => {
    let { activeIndex } = this.props

    console.log('VALUES', values)

    switch (activeIndex) {
      case 0: {
        // Info
        return (
          <Grid verticalAlign='middle'>
            {this.getInput({
              id: 'global.productName',
              defaultMessage: 'Product Name',
              name: 'productName'
            })}
            {this.getElements({
              id: 'global.mixtures',
              defaultMessage: 'Mixtures',
              elements: getSafe(
                () => values.companyProduct.echoProduct.elements,
                []
              )
            })}
            {this.getInput({
              id: 'global.manufacturer',
              defaultMessage: 'Manufacturer',
              name: 'manufacturer'
            })}
            {this.getInput({
              id: 'global.manufacturerProductCode',
              defaultMessage: 'Manufacturer Product Code',
              name: 'echoProduct.mfrProductCodes'
            })}
            {this.getInput({
              id: 'global.emergencyNumber',
              defaultMessage: 'Emergency Number',
              name: 'echoProduct.emergencyPhone'
            })}
            {this.getInput({
              id: 'global.esin',
              defaultMessage: 'ESIN',
              name: 'echoProduct.esin'
            })}
            {this.getInput({
              id: 'global.recommendedUse',
              defaultMessage: 'Recommended Uses',
              name: 'echoProduct.recommendedUse'
            })}
            {this.getInput({
              id: 'global.recommendedRestrictions',
              defaultMessage: 'Recommended Restrictions',
              name: 'echoProduct.recommendedRestrictions'
            })}{' '}
            {this.getInput({
              id: 'global.version',
              defaultMessage: 'Version',
              name: 'echoProduct.sdsVersionNumber'
            })}
            {this.getInput({
              id: 'global.revisionDate',
              defaultMessage: 'Revision Date',
              name: 'echoProduct.sdsRevisionDate'
            })}
            {this.getInput({
              id: 'global.synonyms',
              defaultMessage: 'Synonyms',
              name: 'echoProduct.synonyms'
            })}
            {this.getInput({
              id: 'global.formula',
              defaultMessage: 'Formula',
              name: 'echoProduct.molecularFormula'
            })}
            {this.getInput({
              id: 'global.molecularWeight',
              defaultMessage: 'Molecular Weight',
              name: 'echoProduct.molecularWeight'
            })}
          </Grid>
        )
      }
      case 1: {
        // Properties
        return (
          <Grid verticalAlign='middle'>
            {this.getSharedContent('echoProduct.')}
          </Grid>
        )
      }

      case 2: {
        // Regulatory
        return (
          <Grid verticalAlign='middle'>{this.renderCasProduct(values)}</Grid>
        )
      }

      case 3: {
        // Transportation
        return (
          <Grid verticalAlign='middle'>
            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='global.filter' defaultMessage='Filter' />
              </GridColumn>
              <GridColumn computer={10}>
                <Dropdown
                  selection
                  fluid
                  options={echoProductGrouping}
                  value={this.state.echoProductGroup}
                  onChange={(_, { value }) =>
                    this.setState({ echoProductGroup: value })
                  }
                />
              </GridColumn>
            </GridRow>
            {this.getInput({
              id: 'global.unNumber',
              defaultMessage: 'UN Number',
              name: `echoProduct.${this.state.echoProductGroup}UnNumber`
            })}
            {this.getInput({
              id: 'global.properShippingName',
              defaultMessage: 'Proper Shipping Name',
              name: `echoProduct.${this.state.echoProductGroup}ProperShippingName`
            })}
            {this.getInput({
              id: 'global.properTechnicalName',
              defaultMessage: 'Proper Technical Name',
              name: `echoProduct.${this.state.echoProductGroup}ProperTechnicalName`
            })}
            {this.getInput({
              id: 'global.hazardClass',
              defaultMessage: 'Hazard Class',
              name: `echoProduct.${this.state.echoProductGroup}HazardClass`
            })}
            {this.getInput({
              id: 'global.packagingGroup',
              defaultMessage: 'Packaging Group',
              name: `echoProduct.${this.state.echoProductGroup}PackagingGroup`
            })}
            {this.getInput({
              id: 'global.reportableQuantity',
              defaultMessage: 'Reportable Quantity',
              name: `echoProduct.${this.state.echoProductGroup}ReportableQuantity`
            })}
            {this.getInput({
              id: 'global.enviromentalHazards',
              defaultMessage: 'Enviromental Hazards',
              name: `echoProduct.${this.state.echoProductGroup}EnviromentalHazards`
            })}{' '}
            {/* ?? */}
            {this.getInput({
              id: 'global.emsNumbers',
              defaultMessage: 'Ems Numbers',
              name: `echoProduct.${this.state.echoProductGroup}EmsNumbers`
            })}{' '}
            {/* ?? */}
            {this.getInput({
              id: 'global.exceptions',
              defaultMessage: 'Exceptions',
              name: `echoProduct.${this.state.echoProductGroup}Exceptions`
            })}{' '}
            {/* ?? */}
            {this.getInput({
              id: 'global.specialPrecautionForUser',
              defaultMessage: 'Special Precautions For User',
              name: `echoProduct.${this.state.echoProductGroup}SpecialPrecautionsForUser`
            })}{' '}
            {/* ?? */}
            {this.getInput({
              id: 'global.marinePollutant',
              defaultMessage: 'Marine Pollutant',
              name: `echoProduct.${this.state.echoProductGroup}MarinePollutant`
            })}
            {this.getInput({
              id: 'global.severeMarinePollutant',
              defaultMessage: 'Severe Marine Pollutant',
              name: `echoProduct.${this.state.echoProductGroup}SevereMarinePollutant`
            })}
            {this.getInput({
              id: 'global.packagingExceptions',
              defaultMessage: 'Packaging Exceptions',
              name: `echoProduct.${this.state.echoProductGroup}PackagingExceptions`
            })}{' '}
            {/* ?? */}
            {this.getInput({
              id: 'global.packagingNonBulk',
              defaultMessage: 'Packaging Non Bulk',
              name: `echoProduct.${this.state.echoProductGroup}PackagingNonBulk`
            })}{' '}
            {/* ?? */}
            {this.getInput({
              id: 'global.packagingBulk',
              defaultMessage: 'Packaging Bulk',
              name: `echoProduct.${this.state.echoProductGroup}PackagingBulk`
            })}{' '}
            {/* ?? */}
            {this.getInput({
              id: 'global.quantityLimitationsPassengerAircraftRail',
              defaultMessage: 'Quantity Limitations Passenger Aircraft/Rail',
              name: `echoProduct.${this.state.echoProductGroup}QuantityLimitationsPassengerAircraftRail`
            })}{' '}
            {/* ?? */}
            {this.getInput({
              id: 'global.quantityLimitationsCargoAircraftOnly',
              defaultMessage: 'Quantity Limitations Cargo Aircraft Only',
              name: `echoProduct.${this.state.echoProductGroup}QuantityLimitationsCargoAircraftOnly`
            })}{' '}
            {/* ?? */}
            {this.getInput({
              id: 'global.vesselStowageLocation',
              defaultMessage: 'Vessel Stowage Location',
              name: `echoProduct.${this.state.echoProductGroup}VesselStowageLocation`
            })}{' '}
            {/* ?? */}
            {this.getInput({
              id: 'global.vesselStowageOther',
              defaultMessage: 'Vessel Stowage Other',
              name: `echoProduct.${this.state.echoProductGroup}VesselStowageOther`
            })}{' '}
            {/* ?? */}
          </Grid>
        )
      }

      default:
        return null
    }
  }

  renderForm() {
    let {
      popupValues,
      casProduct,
      activeIndex,
      tabChanged,
      intl: { formatMessage },
      hiddenTabs,
      readOnly,
      handleSubmit,
      casProductOnly
    } = this.props

    let { companyProduct } = popupValues

    try {
      var { echoProduct } = companyProduct
    } catch (e) {
      var echoProduct = {}
    }

    let additionalFormProps = {}
    if (!readOnly) additionalFormProps.validationSchema = validationSchema
    if (handleSubmit) additionalFormProps.onSubmit = handleSubmit

    let { id, ...rest } = getSafe(
      () => echoProduct.elements[this.state.casProductIndex].casProduct,
      {}
    )

    let initialValues = {
      ...companyProduct,
      ...popupValues,
      attachments:
        companyProduct &&
        companyProduct.attachments.concat(echoProduct.attachments),
      productName: getSafe(() => echoProduct.name, ''),
      manufacturer: getSafe(() => echoProduct.manufacturer.name, ''),
      casProduct: {
        ...CasProductResponse,
        ...getSafe(() => echoProduct.elements[this.state.casProductIndex], {}),
        ...casProduct,
        ...rest
      },
      echoProduct: {
        ...EchoProductResponse,
        ...echoProduct,
        elements: getSafe(
          () =>
            echoProduct.elements.map(element => ({
              ...element,
              assayMin: element.assayMin ? element.assayMin : '',
              assayMax: element.assayMax ? element.assayMax : ''
            })),
          []
        ),
        mfrProductCodes: getSafe(
          () => echoProduct.mfrProductCodes.toString(),
          ''
        ),
        sdsRevisionDate:
          echoProduct && echoProduct.sdsRevisionDate
            ? moment(echoProduct.sdsRevisionDate).format('MM/DD/YYYY')
            : ''
      }
    }

    console.log({ initialValues })

    return (
      <Form
        enableReinitialize
        initialValues={initialValues}
        {...additionalFormProps}
        render={formikProps => {
          let { submitForm, values } = formikProps
          this.submitForm = submitForm
          return casProductOnly ? (
            <Grid verticalAlign='middle'>{this.renderCasProduct(values)}</Grid>
          ) : (
              <>
                <Menu pointing secondary>
                  {tabs.map((tab, i) =>
                    hiddenTabs.findIndex(val => val === i) !== -1 ? null : (
                      <Menu.Item
                        onClick={() => tabChanged(i)}
                        active={activeIndex === i}>
                        {formatMessage(tab.text)}
                      </Menu.Item>
                    )
                  )}
                </Menu>
                <Segment basic>{this.getContent(formikProps)}</Segment>
              </>
            )
        }}
      />
    )
  }

  renderActions = () => {
    let { closePopup, onClose, handleSubmit } = this.props

    return (
      <>
        <Button
          onClick={() => {
            closePopup()
            onClose()
          }}>
          <FormattedMessage id='global.close' defaultMessage='Close'>
            {text => text}
          </FormattedMessage>
        </Button>
        {handleSubmit && (
          <Button primary onClick={() => this.submitForm()}>
            <FormattedMessage id='global.save' defaultMessage='Save'>
              {text => text}
            </FormattedMessage>
          </Button>
        )}
      </>
    )
  }

  render() {
    let { isOpen } = this.props

    const contentWrapper = children =>
      React.cloneElement(
        this.props.contentWrapper ? (
          this.props.contentWrapper(children)
        ) : (
            <FlexContent>
              <Segment basic>{children}</Segment>
            </FlexContent>
          )
      )

    const actionsWrapper = children =>
      React.cloneElement(
        this.props.actionsWrapper ? (
          this.props.actionsWrapper(children)
        ) : (
            <GraySegment>
              <RightAlignedDiv>{children}</RightAlignedDiv>
            </GraySegment>
          )
      )

    const Content = React.cloneElement(
      this.props.wrapper ? (
        this.props.wrapper
      ) : (
          <WiderSidebar visible={isOpen} direction='right' width='very wide' />
        ),
      {},
      <>
        {this.props.header && this.props.header}
        {contentWrapper(this.renderForm())}
        {actionsWrapper(this.renderActions())}
      </>
    )

    return Content
  }
}

CompanyProductInfo.propTypes = {
  popupValues: object,
  casProduct: object,
  isOpen: bool,
  activeIndex: number,
  readOnly: bool,
  wrapper: node,
  contentWrapper: func,
  actionsWrapper: func,
  onClose: func,
  hiddenTabs: array,
  casProductOnly: bool
}

CompanyProductInfo.defaultProps = {
  popupValues: {},
  casProduct: {},
  isOpen: false,
  activeIndex: 0,
  readOnly: true,
  onClose: () => { },
  hiddenTabs: [],
  casProductOnly: false
}

export default injectIntl(CompanyProductInfo)
