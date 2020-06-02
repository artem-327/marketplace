import React, { Component } from 'react'
import { object, bool, number, node, func, array } from 'prop-types'
import { Segment, GridRow, Grid, GridColumn, Button, Dropdown, Menu, Sidebar, Table } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize'
import { Form, Input, Dropdown as FormikDropdown, TextArea } from 'formik-semantic-ui-fixed-validation'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import moment from 'moment'
import * as Yup from 'yup'

import {
  tabs,
  regulatoryFilter,
  dropdownOptions,
  companyGenericProductGrouping,
  yesNoOptions,
  tabsMarketPlace
} from '../constants'
import { errorMessages } from '~/constants/yupValidation'

import DocumentManager from '~/modules/settings/components/Documents/DocumentManagerTable'
import { getSafe, formatAssay } from '~/utils/functions'
import { CompanyGenericProductResponse, CasProductResponse } from '~/constants/backendObjects'
import { Required } from '~/components/constants/layout'

import { SegmentShowOnly, BottonButtonsShowOnly } from '../constants/layout'

export const FlexSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  top: 80px !important;
  padding-bottom: 80px;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 1000 !important;
  text-align: left;
`

export const GraySegment = styled(Segment)`
  background-color: #ededed !important;
`

export const FlexContent = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;

  > .ui.segment {
    padding: 0 1em 1em 1em;

    .ui.form {
      > .ui.menu {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6 !important;
        margin: 0px -1em;
        padding: 0px 2.142857143em;

        > .item {
          margin: 0 18px;
          border-width: 0 0 2px;
          padding-left: 0;
          padding-right: 0;
          box-shadow: 0 0 0 0 transparent;
          text-transform: uppercase;
          font-family: 'HelveticaNeueLTPro';
          font-size: 14px;
          font-weight: 500;
          color: #848893 !important;
          line-height: 16px;

          &:first-child {
            margin-left: 0;
          }

          &:last-child {
            margin-right: 0;
          }

          &.active {
            color: #20273a !important;
          }
        }

        > .active.item {
          color: #20273a;
          border-bottom-width: 2px;
        }
      }
    }
  }
`

const WiderSidebar = styled(FlexSidebar)`
  min-width: 630px !important;

  .grid > .row > .column.top.aligned {
    align-self: flex-start !important;
  }

  [class*='SegmentShowOnly'] > .grid > .row > .column:first-child {
    align-self: flex-start !important;
    padding: 11px 0 !important;
  }

  [class*='SegmentShowOnly'] > .grid > .row > .column:first-child:last-child {
    align-self: center !important;
    padding: 0 !important;
  }

  input[readonly] {
    color: #20273a !important;

    &::-webkit-input-placeholder {
      /* Edge */
      color: #20273a !important;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #20273a !important;
    }

    &::placeholder {
      color: #20273a !important;
    }
  }

  input,
  textarea {
    font-family: 'HelveticaNeueLTPro' !important;
  }

  .ui.dropdown.disabled > .text:empty:before {
    content: '-';
  }
`

const RightAlignedDiv = styled.div`
  text-align: right;
`

const TextareaStyled = styled(TextareaAutosize)`
  max-height: 202px !important;
  min-height: 40px !important;
  padding: 10px 0 !important;
  color: #20273a !important;
  line-height: 18px !important;

  &[readonly] {
    resize: none !important;
    border: 0 none !important;
    padding: 11px 0 !important;

    &::-webkit-input-placeholder {
      /* Edge */
      color: #20273a !important;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #20273a !important;
    }

    &::placeholder {
      color: #20273a !important;
    }
  }
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
    companyGenericProductGrouping: companyGenericProductGrouping[0].value
  }

  getElements = ({ id, defaultMessage, elements }) => {
    return (
      <>
        <GridRow className='table-name'>
          <GridColumn width={16}>
            <FormattedMessage id={id} defaultMessage={defaultMessage} />
          </GridColumn>
        </GridRow>
        <Table celled table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <FormattedMessage id='global.elementName' defaultMessage='Element Name' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage id='global.casNumber' defaultMessage='CAS Number' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage id='global.assay' defaultMessage='Assay' />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {elements.map((element, index) => (
              <Table.Row>
                <Table.Cell>{element.proprietary ? element.name : element.casProduct.casIndexName}</Table.Cell>
                <Table.Cell>{element.proprietary ? '' : element.casProduct.casNumber}</Table.Cell>
                <Table.Cell>{formatAssay(element.assayMin, element.assayMax)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    )
  }

  getValue = (obj, i) => {
    return obj[i]
  }

  getInput = ({ id, defaultMessage, name, required }) => (
    <GridRow>
      <GridColumn width={7}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
        {required === true ? <Required /> : null}
      </GridColumn>

      <GridColumn width={9}>
        <Input
          inputProps={{ readOnly: this.props.readOnly, id: name, placeholder: '-', className: 'styled-readonly' }}
          name={name}
        />
      </GridColumn>
    </GridRow>
  )

  getTextarea = ({ id, defaultMessage, name, required }) => {
    const { values, setFieldValue } = this.formikProps
    let value = name.split('.').reduce(this.getValue, values)
    if (typeof value === 'undefined') value = ''
    return (
      <GridRow>
        <GridColumn width={7}>
          <FormattedMessage id={id} defaultMessage={defaultMessage} />
          {required === true ? <Required /> : null}
        </GridColumn>

        <GridColumn width={9}>
          <TextareaStyled
            minRows={1}
            readOnly={this.props.readOnly}
            id={name}
            name={name}
            value={value}
            placeholder={'-'}
            onChange={e => {
              setFieldValue(name, e.target.value)
            }}
          />
        </GridColumn>
      </GridRow>
    )
  }

  getDropdown = ({ id, defaultMessage, name, props }) => (
    <GridRow>
      <GridColumn width={7}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={9}>
        <FormikDropdown
          selection
          fluid
          name={name}
          {...props}
          inputProps={{ disabled: this.props.readOnly }}
          options={props.options.map(el => (typeof el === 'object' ? el : { key: el, text: el, value: el }))}>
          <Dropdown.Item defaultValue></Dropdown.Item>
        </FormikDropdown>
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
      {this.getTextarea({
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
      {this.getTextarea({
        id: 'global.meltingPointRange',
        defaultMessage: 'Melting Point/Range',
        name: `${prefix}meltingPointRange`
      })}
      {this.getInput({
        id: 'global.boilingPointRange',
        defaultMessage: 'Boiling Point/Range',
        name: `${prefix}boilingPointRange`
      })}
      {this.getTextarea({
        id: 'global.flashPoint',
        defaultMessage: 'Flash Point',
        name: `${prefix}flashPoint`
      })}
      {this.getTextarea({
        id: 'global.evaporationPoint',
        defaultMessage: 'Evaporation Point',
        name: `${prefix}evaporationPoint`
      })}
      {this.getInput({
        id: 'global.flammabilitySolidGas',
        defaultMessage: 'Flammability (solid, gas)',
        name: `${prefix}flammabilitySolidGas`
      })}
      {this.getTextarea({
        id: 'global.flammabilityOrExplosiveUpper',
        defaultMessage: 'Flammability or Explosive Upper',
        name: `${prefix}flammabilityOrExplosiveUpper`
      })}
      {this.getTextarea({
        id: 'global.flammabilityOrExplosiveLower',
        defaultMessage: 'Flammability or Explosive Lower',
        name: `${prefix}flammabilityOrExplosiveLower`
      })}
      {this.getTextarea({
        id: 'global.vaporPressure',
        defaultMessage: 'Vapor Pressure',
        name: `${prefix}vaporPressure`
      })}
      {this.getInput({
        id: 'global.vaporDensity',
        defaultMessage: 'Vapor Density',
        name: `${prefix}vaporDensity`
      })}
      {/* {this.getTextarea({ id: 'global.specificGravity', defaultMessage: 'Specific Gravity', name: `${prefix}specificGravity` })} */}
      {this.getTextarea({
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
      {this.getTextarea({
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

  componentDidMount() {
    let { closePopup, onClose, isOpen } = this.props
    if (isOpen) {
      closePopup()
      onClose()
    }
  }

  // componentDidUpdate() {
  // When you switch different Products and previous product had casProductIndex bigger value than new product casProducts count, set index to 0 so dropdown value is correctly displayed
  // if (this.props.readOnly && this.props.isOpen)
  //   if (
  //     this.state.casProductIndex + 1 >
  //     getSafe(() => this.props.popupValues.companyProduct.companyGenericProduct.elements.length, 0)
  //   )
  //     this.setState({ casProductIndex: 0 })
  // }

  renderCasProduct = () => {
    const { values, setFieldValue } = this.formikProps
    let { popupValues, readOnly } = this.props

    let casProducts = getSafe(() => popupValues.companyProduct.companyGenericProduct.elements, [])

    let markup = [
      this.getInput({
        id: 'global.casIndexName',
        defaultMessage: 'Cas Index Name',
        name: 'casProduct.casIndexName',
        required: true
      })
    ]

    let { epa, dhs, /*dot,*/ caProp65, rightToKnow, dea, international, all } = regulatoryFilter

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
            defaultMessage: 'Release: Screening Threshold Quantitiees (in pounds)',
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
        <GridRow className='select-row'>
          <GridColumn computer={8} verticalAlign='top'>
            {readOnly ? (
              <>
                <label>
                  <FormattedMessage id='global.casProduct' defaultMessage='CAS Product' />
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
                      text: `${text} ${formatAssay(values.assayMin, values.assayMax)}`,
                      value: cp.id
                    }
                  })}
                  onChange={(_, data) =>
                    this.setState({
                      casProductIndex: data.options.findIndex(el => el.value === data.value)
                    })
                  }
                />
              </>
            ) : (
              this.getInput({
                id: 'global.casNumber',
                defaultMessage: 'CAS Number',
                name: 'casProduct.casNumber',
                required: true
              })
            )}
          </GridColumn>

          <GridColumn computer={8} verticalAlign='top'>
            <label>
              <FormattedMessage id='global.propsFilter' defaultMessage='Properties Filter' />
            </label>
            <Dropdown
              fluid
              selection
              value={this.state.regulatoryFilter}
              options={Object.keys(regulatoryFilter).map(key => regulatoryFilter[key])}
              onChange={(_, { value }) => this.setState({ regulatoryFilter: value })}
            />
          </GridColumn>
        </GridRow>
        {markup.map(el => el)}
        {this.state.regulatoryFilter === all.key && this.getSharedContent('casProduct.')}
      </>
    )
  }

  getContent = ({ values }) => {
    let { activeIndex, readOnly } = this.props

    switch (activeIndex) {
      case 0: {
        // Info
        return (
          <Grid verticalAlign='middle'>
            {this.getTextarea({
              id: 'global.productName',
              defaultMessage: 'Product Name',
              name: 'productName'
            })}
            {this.getElements({
              id: 'global.mixtures',
              defaultMessage: 'Mixtures',
              elements: getSafe(() => values.companyGenericProduct.elements, [])
            })}
            {this.getTextarea({
              id: 'global.manufacturer',
              defaultMessage: 'Manufacturer',
              name: 'manufacturer'
            })}
            {this.getTextarea({
              id: 'global.manufacturerProductCode',
              defaultMessage: 'Manufacturer Product Code',
              name: 'companyGenericProduct.mfrProductCodes'
            })}
            {this.getTextarea({
              id: 'global.emergencyNumber',
              defaultMessage: 'Emergency Number',
              name: 'companyGenericProduct.emergencyPhone'
            })}
            {/*this.getTextarea({
              id: 'global.esin',
              defaultMessage: 'ESIN',
              name: 'companyGenericProduct.esin'
            })*/}
            {this.getTextarea({
              id: 'global.recommendedUse',
              defaultMessage: 'Recommended Uses',
              name: 'companyGenericProduct.recommendedUse'
            })}
            {/*this.getTextarea({
              id: 'global.recommendedRestrictions',
              defaultMessage: 'Recommended Restrictions',
              name: 'companyGenericProduct.recommendedRestrictions'
            })*/}
            {this.getTextarea({
              id: 'global.version',
              defaultMessage: 'Version',
              name: 'companyGenericProduct.sdsVersionNumber'
            })}
            {this.getTextarea({
              id: 'global.revisionDate',
              defaultMessage: 'Revision Date',
              name: 'companyGenericProduct.sdsRevisionDate'
            })}
            {/*this.getTextarea({
              id: 'global.synonyms',
              defaultMessage: 'Synonyms',
              name: 'companyGenericProduct.synonyms'
            })*/}
            {this.getTextarea({
              id: 'global.formula',
              defaultMessage: 'Formula',
              name: 'companyGenericProduct.molecularFormula'
            })}
            {this.getTextarea({
              id: 'global.molecularWeight',
              defaultMessage: 'Molecular Weight',
              name: 'companyGenericProduct.molecularWeight'
            })}
          </Grid>
        )
      }
      case 1: {
        // Properties
        return <Grid verticalAlign='middle'>{this.getSharedContent('companyGenericProduct.')}</Grid>
      }

      case 2: {
        // Regulatory
        return <Grid verticalAlign='middle'>{this.renderCasProduct()}</Grid>
      }

      case 3: {
        // Transportation
        return (
          <Grid verticalAlign='middle'>
            <GridRow className='select-row'>
              <GridColumn computer={8}>
                <label>
                  <FormattedMessage id='global.filter' defaultMessage='Filter' />
                </label>
              </GridColumn>
              <GridColumn computer={8}>
                <Dropdown
                  selection
                  fluid
                  options={companyGenericProductGrouping}
                  value={this.state.companyGenericProductGrouping}
                  onChange={(_, { value }) => this.setState({ companyGenericProductGrouping: value })}
                />
              </GridColumn>
            </GridRow>
            {this.getTextarea({
              id: 'global.unNumber',
              defaultMessage: 'UN Number',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}UnNumber.unNumberCode`
            })}
            {this.getTextarea({
              id: 'global.properShippingName',
              defaultMessage: 'Proper Shipping Name',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}ProperShippingName`
            })}
            {this.getTextarea({
              id: 'global.properTechnicalName',
              defaultMessage: 'Proper Technical Name',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}ProperTechnicalName`
            })}
            {this.getTextarea({
              id: 'global.hazardClass',
              defaultMessage: 'Hazard Class',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}HazardClass.classCode`
            })}
            {this.getTextarea({
              id: 'global.packagingGroup',
              defaultMessage: 'Packaging Group',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}PackagingGroup.groupCode`
            })}
            {this.getTextarea({
              id: 'global.reportableQuantity',
              defaultMessage: 'Reportable Quantity',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}ReportableQuantity`
            })}
            {/*this.getTextarea({
              id: 'global.enviromentalHazards',
              defaultMessage: 'Enviromental Hazards',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}EnviromentalHazards`
            })*/}
            {/*this.getTextarea({
              id: 'global.emsNumbers',
              defaultMessage: 'Ems Numbers',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}EmsNumbers`
            })*/}
            {/*this.getTextarea({
              id: 'global.exceptions',
              defaultMessage: 'Exceptions',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}Exceptions`
            })*/}
            {/*this.getTextarea({
              id: 'global.specialPrecautionForUser',
              defaultMessage: 'Special Precautions For User',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}SpecialPrecautionsForUser`
            })*/}
            {this.getTextarea({
              id: 'global.marinePollutant',
              defaultMessage: 'Marine Pollutant',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}MarinePollutant`
            })}
            {this.getTextarea({
              id: 'global.severeMarinePollutant',
              defaultMessage: 'Severe Marine Pollutant',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}SevereMarinePollutant`
            })}
            {/*this.getTextarea({
              id: 'global.packagingExceptions',
              defaultMessage: 'Packaging Exceptions',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}PackagingExceptions`
            })*/}
            {/*this.getTextarea({
              id: 'global.packagingNonBulk',
              defaultMessage: 'Packaging Non Bulk',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}PackagingNonBulk`
            })*/}
            {/*this.getTextarea({
              id: 'global.packagingBulk',
              defaultMessage: 'Packaging Bulk',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}PackagingBulk`
            })*/}
            {/*this.getTextarea({
              id: 'global.quantityLimitationsPassengerAircraftRail',
              defaultMessage: 'Quantity Limitations Passenger Aircraft/Rail',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}QuantityLimitationsPassengerAircraftRail`
            })*/}
            {/*this.getTextarea({
              id: 'global.quantityLimitationsCargoAircraftOnly',
              defaultMessage: 'Quantity Limitations Cargo Aircraft Only',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}QuantityLimitationsCargoAircraftOnly`
            })*/}
            {/*this.getTextarea({
              id: 'global.vesselStowageLocation',
              defaultMessage: 'Vessel Stowage Location',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}VesselStowageLocation`
            })*/}
            {/*this.getTextarea({
              id: 'global.vesselStowageOther',
              defaultMessage: 'Vessel Stowage Other',
              name: `companyGenericProduct.${this.state.companyGenericProductGrouping}VesselStowageOther`
            })*/}
          </Grid>
        )
      }

      case 4: {
        // Documents
        return (
          <DocumentManager
            items={values.attachments}
            edit={false}
            deletable={false}
            normalWidth={!readOnly}
            reduceColumns={readOnly}
          />
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
      var { companyGenericProduct } = companyProduct
    } catch (e) {
      var companyGenericProduct = {}
    }

    let additionalFormProps = {}
    if (!readOnly) additionalFormProps.validationSchema = validationSchema
    if (handleSubmit) additionalFormProps.onSubmit = handleSubmit

    let { id, ...rest } = getSafe(() => companyGenericProduct.elements[this.state.casProductIndex].casProduct, {})

    let initialValues = {
      ...companyGenericProduct,
      ...companyProduct,
      attachments: getSafe(() => companyProduct.attachments, []).concat(
        getSafe(() => companyGenericProduct.attachments, [])
      ),
      productName: getSafe(() => companyGenericProduct.name, ''),
      manufacturer: getSafe(() => companyGenericProduct.manufacturer.name, ''),
      casProduct: {
        ...CasProductResponse,
        ...getSafe(() => companyGenericProduct.elements[this.state.casProductIndex], {}),
        ...casProduct,
        ...rest
      },
      companyGenericProduct: {
        ...CompanyGenericProductResponse,
        ...companyGenericProduct,
        elements: getSafe(
          () =>
            companyGenericProduct.elements.map(element => ({
              ...element,
              assayMin: element.assayMin ? element.assayMin : '',
              assayMax: element.assayMax ? element.assayMax : ''
            })),
          []
        ),
        mfrProductCodes: getSafe(() => companyGenericProduct.mfrProductCodes.toString(), ''),
        sdsRevisionDate:
          companyGenericProduct && companyGenericProduct.sdsRevisionDate
            ? moment(companyGenericProduct.sdsRevisionDate).format('MM/DD/YYYY')
            : ''
      }
    }

    return (
      <Form
        enableReinitialize
        initialValues={initialValues}
        {...additionalFormProps}
        render={formikProps => {
          let { submitForm } = formikProps
          this.formikProps = formikProps
          this.submitForm = submitForm
          return casProductOnly ? (
            <Grid verticalAlign='middle'>{this.renderCasProduct()}</Grid>
          ) : (
            <>
              <Menu pointing secondary>
                {this.props.fromMarketPlace
                  ? tabsMarketPlace.map((tab, i) =>
                      hiddenTabs.findIndex(val => val === i) !== -1 ? null : (
                        <Menu.Item onClick={() => tabChanged(i)} active={activeIndex === i}>
                          {formatMessage(tab.text)}
                        </Menu.Item>
                      )
                    )
                  : tabs.map((tab, i) =>
                      hiddenTabs.findIndex(val => val === i) !== -1 ? null : (
                        <Menu.Item onClick={() => tabChanged(i)} active={activeIndex === i}>
                          {formatMessage(tab.text)}
                        </Menu.Item>
                      )
                    )}
              </Menu>
              {readOnly ? (
                <SegmentShowOnly basic>{this.getContent(formikProps)}</SegmentShowOnly>
              ) : (
                <Segment basic>{this.getContent(formikProps)}</Segment>
              )}
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
    let { isOpen, readOnly } = this.props

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
        ) : readOnly ? (
          <BottonButtonsShowOnly>{children}</BottonButtonsShowOnly>
        ) : (
          <GraySegment>
            <RightAlignedDiv>{children}</RightAlignedDiv>
          </GraySegment>
        )
      )

    const Content = React.cloneElement(
      this.props.wrapper ? this.props.wrapper : <WiderSidebar visible={isOpen} direction='right' width='very wide' />,
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
  onClose: () => {},
  hiddenTabs: [],
  casProductOnly: false
}

export default injectIntl(CompanyProductInfo)
