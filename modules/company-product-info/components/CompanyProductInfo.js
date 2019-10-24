import React, { Component } from 'react'
import { object, bool, number } from 'prop-types'
import { tabs, regulatoryFilter } from '../constants'
import { Tab, Segment, GridRow, Grid, GridColumn, Button, Dropdown } from 'semantic-ui-react'
import { FlexSidebar, GraySegment, FlexContent } from '~/modules/inventory/components/DetailSidebar'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import moment from 'moment'

import { DatagridProvider } from '~/modules/datagrid'
import DocumentManager from '~/modules/settings/components/Documents/DocumentManagerTable'
import { getSafe } from '~/utils/functions'

const WiderSidebar = styled(FlexSidebar)`
  min-width: 545px !important;
`

const RightAlignedDiv = styled.div`
  text-align: right;
`




class CompanyProductInfo extends Component {

  state = {
    regulatoryFilter: regulatoryFilter.epa.value,
    casProductIndex: 0
  }

  getInput = ({ id, defaultMessage, name }) => (
    <GridRow>
      <GridColumn width={6}>
        <FormattedMessage id={id} defaultMessage={defaultMessage} />
      </GridColumn>

      <GridColumn width={10}>
        <Input inputProps={{ readOnly: true }} name={name} />
      </GridColumn>
    </GridRow>
  )

  // getDropdown =  ({ id, defaultMessage, name, options, props = {} }) => (
  //   <GridRow>
  //     <GridColumn width={6}>
  //       <FormattedMessage id={id} defaultMessage={defaultMessage} />
  //     </GridColumn>

  //     <GridColumn width={10}>
  //       <Dropdown inputProps={{ readOnly: true }} name={name} />
  //     </GridColumn>
  //   </GridRow>
  // )

  getContent = ({ values }) => {
    let { activeIndex, popupValues } = this.props
    // console.log({ popupValues })
    let casProducts = getSafe(() => popupValues.companyProduct.echoProduct.elements, [])
    console.log({ values })


    

    // TODO - handle dropdowns (attributes with enum data type + don't forget some of them are multiple-selection)
    // TODO - convert booleans to string ('Yes', 'No')



    let markup = [
      this.getInput({ id: 'global.casIndexName', defaultMessage: '!Cas Index Name', name: 'casProduct.casProduct.casIndexName' })
    ]

    let { epa, dhs, dot, caProp65, rightToKnow, dea, international, all } = regulatoryFilter
    console.log({ epa, regulatoryFilter: this.state.regulatoryFilter })
    switch (this.state.regulatoryFilter) {
      // case regulatoryFilter.all // meh
      // case regulatoryFilter.
      case all.key:
      case epa.key: {
        markup.push(
          this.getInput({ id: 'global.epaSection302EhsTPQ', defaultMessage: '!Section 302 (EHS) TPQ', name: 'casProduct.casProduct.epaSection302EhsTPQ' }),
          this.getInput({ id: 'global.epaSection304EhsRQ', defaultMessage: '!Section 304 (EHS) RQ', name: 'casProduct.casProduct.epaSection304EhsRQ' }),
          this.getInput({ id: 'global.epaCerclaRq', defaultMessage: '!CERCLA RQ', name: 'casProduct.casProduct.epaCerclaRq' }),
          this.getInput({ id: 'global.epaSection313Tri', defaultMessage: '!Section 313 (TRI)', name: 'casProduct.casProduct.epaSection313Tri' }),
          this.getInput({ id: 'global.epaCaa112TTq', defaultMessage: '!CAA 112(r) TQ', name: 'casProduct.casProduct.epaCaa112TTq' }),
          this.getInput({ id: 'global.epaFifra', defaultMessage: '!FIFRA', name: 'casProduct.casProduct.epaFifra' }),
          this.getInput({ id: 'global.epaTsca', defaultMessage: '!TSCA', name: 'casProduct.casProduct.epaTsca' }),
          this.getInput({ id: 'global.epaTsca12b', defaultMessage: '!TSCA 12(b)', name: 'casProduct.casProduct.epaTsca12b' }),
          this.getInput({ id: 'global.epaSaferChoice', defaultMessage: '!Safer Choice', name: 'casProduct.casProduct.epaSaferChoice' })
        )


        break
      }

      case all.key:
      case rightToKnow.key: {
        markup.push(
          this.getInput({ id: 'global.rtkMassachusettes', defaultMessage: '!Massachusettes', name: 'casProduct.casProduct.rtkMassachusettes' }),
          this.getInput({ id: 'global.rtkNewJersey', defaultMessage: '!New Jersey', name: 'casProduct.casProduct.rtkNewJersey' }),
          this.getInput({ id: 'global.rtkPennslyvania', defaultMessage: '!Pennslyvania', name: 'casProduct.casProduct.rtkPennslyvania' }),
          this.getInput({ id: 'global.rtkIllinois', defaultMessage: '!Illinois', name: 'casProduct.casProduct.rtkIllinois' }),
          this.getInput({ id: 'global.rtkRhodeIsland', defaultMessage: '!Rhode Island', name: 'casProduct.casProduct.rtkRhodeIsland' })
        )
      }

      case all.key:
      case dhs.key: {
        markup.push(
          this.getInput({ id: 'global.dhsReleaseMinimumConcentration', defaultMessage: '!Massachusettes', name: 'casProduct.casProduct.rtkMassachusettes' }),
          this.getInput({ id: 'global.dhsReleaseScreeningThresholdQuantitie', defaultMessage: '!New Jersey', name: 'casProduct.casProduct.rtkNewJersey' }),
          this.getInput({ id: 'global.dhsTheftMinimumConcentration', defaultMessage: '!Pennslyvania', name: 'casProduct.casProduct.rtkPennslyvania' }),
          this.getInput({ id: 'global.rtkIllinois', defaultMessage: '!Illinois', name: 'casProduct.casProduct.rtkIllinois' }),
          this.getInput({ id: 'global.rtkRhodeIsland', defaultMessage: '!Rhode Island', name: 'casProduct.casProduct.rtkRhodeIsland' })
        )
        break
      }

    }

    switch (activeIndex) {
      case 0: { // Info
        return (
          <Grid verticalAlign='middle'>
            {this.getInput({ id: 'global.productName', defaultMessage: '!Product Name', name: 'productName' })}
            {this.getInput({ id: 'global.manufacturer', defaultMessage: '!Manufacturer', name: 'manufacturer' })}
            {this.getInput({ id: 'global.manufacturerProductCode', defaultMessage: '!Manufacturer Product Code', name: 'manufactureProductCode' })}
            {this.getInput({ id: 'global.emergencyNumber', defaultMessage: '!Emergency Number', name: 'emergencyNumber' })}
            {this.getInput({ id: 'global.esin', defaultMessage: '!ESIN', name: 'esin' })}
            {this.getInput({ id: 'global.recommendedUse', defaultMessage: '!Recommended Use', name: 'recommendedUse' })}
            {this.getInput({ id: 'global.recommendedRestrictions', defaultMessage: '!Recommended Restrictions', name: 'recommendedRestrictions' })}
            {this.getInput({ id: 'global.version', defaultMessage: '!Version', name: 'sdsVersionNumber' })}
            {this.getInput({ id: 'global.revisionDate', defaultMessage: '!Revision Date', name: 'sdsRevisionDate' })}
            {this.getInput({ id: 'global.synonyms', defaultMessage: '!Synonyms', name: 'synonyms' })}
            {this.getInput({ id: 'global.formula', defaultMessage: '!Formula', name: 'molecularFormula' })}
            {this.getInput({ id: 'global.molecularWeight', defaultMessage: '!Molecular Weight', name: 'molecularWeight' })}
          </Grid>
        )
      }
      case 1: { // Properties
        return (
          <Grid verticalAlign='middle'>
            {this.getInput({ id: 'global.physicalState', defaultMessage: '!Physical State', name: 'physicalState' })}
            {this.getInput({ id: 'global.appearance', defaultMessage: '!Appearance', name: 'appearance' })}
            {this.getInput({ id: 'global.odor', defaultMessage: '!Odor', name: 'odor' })}
            {this.getInput({ id: 'global.odorThreshold', defaultMessage: '!Odor Threshold', name: 'odorThreshold' })}
            {this.getInput({ id: 'global.ph', defaultMessage: '!pH', name: 'ph' })}
            {this.getInput({ id: 'global.meltingPointRange', defaultMessage: '!Melting Point/Range', name: 'meltingPointRange' })}
            {this.getInput({ id: 'global.boilingPointRange', defaultMessage: '!Boiling Point/Range', name: 'boilingPointRange' })}
            {this.getInput({ id: 'global.flashPoint', defaultMessage: '!Flash Point', name: 'flashPoint' })}
            {this.getInput({ id: 'global.evaporationPoint', defaultMessage: '!Evaporation Point', name: 'evaporationPoint' })}
            {this.getInput({ id: 'global.flammabilitySolidGas', defaultMessage: '!Flammability (solid, gas)', name: 'flammabilitySolidGas' })}
            {this.getInput({ id: 'global.flammabilityOrExplosiveUpper', defaultMessage: '!Flammability or Explosive Upper', name: 'flammabilityOrExplosiveUpper' })}
            {this.getInput({ id: 'global.flammabilityOrExplosiveLower', defaultMessage: '!Flammability or Explosive Lower', name: 'flammabilityOrExplosiveLower' })}
            {this.getInput({ id: 'global.vaporPressure', defaultMessage: '!Vapor Pressure', name: 'vaporPressure' })}
            {this.getInput({ id: 'global.vaporDensity', defaultMessage: '!Vapor Density', name: 'vaporDensity' })}
            {this.getInput({ id: 'global.specificGravity', defaultMessage: '!Specific Gravity', name: 'specificGravity' })}
            {this.getInput({ id: 'global.solubility', defaultMessage: '!Solubility', name: 'solubility' })}
            {this.getInput({ id: 'global.partitionCoefficient', defaultMessage: '!Partition Coefficient', name: 'partitionCoefficient' })}
            {this.getInput({ id: 'global.autoIgnitionTemperature', defaultMessage: '!Auto Ignition Temperature', name: 'autoIgnitionTemperature' })}
            {this.getInput({ id: 'global.decompositionTemperature', defaultMessage: '!Decomposition Temperature', name: 'decompositionTemperature' })}
            {this.getInput({ id: 'global.viscosity', defaultMessage: '!Viscosity', name: 'viscosity' })}
            {this.getInput({ id: 'global.molecularFormula', defaultMessage: '!Molecular Formula', name: 'molecularFormula' })}
            {this.getInput({ id: 'global.molecularWeight', defaultMessage: '!Molecular Weight', name: 'molecularWeight' })}
            {this.getInput({ id: 'global.specificVolume', defaultMessage: '!Specific Volume', name: 'specificVolume' })} {/* ?? */}
            {this.getInput({ id: 'global.recommendedUse', defaultMessage: '!Recommended Uses', name: 'recommendedUse' })}
            {this.getInput({ id: 'global.usesAdvisedAgainst', defaultMessage: '!Uses Advised Against', name: 'usesAdvisedAgainst' })}
            {this.getInput({ id: 'global.criticalTemperature', defaultMessage: '!Critical Temperature', name: 'criticalTemperature' })}  {/* ?? */}
            {this.getInput({ id: 'global.gasDensity', defaultMessage: '!Gas Density', name: 'gasDensity' })}  {/* ?? */}
            {this.getInput({ id: 'global.relativeDensity', defaultMessage: '!Relative Density', name: 'relativeDensity' })} {/* ?? */}
            {this.getInput({ id: 'global.flowTime', defaultMessage: '!Flow Time (ISO 2431)', name: 'flowTime' })} {/* ?? */}
            {this.getInput({ id: 'global.heatOfCombustion', defaultMessage: '!Heat of Combustion', name: 'heatOfCombustion' })} {/* ?? */}
          </Grid>
          // {this.getInput({ id: 'global.', defaultMessage: '!', name: '' })}
        )
      }

      case 2: { // Documents
        return (
          <DatagridProvider apiConfig={this.getApiConfig()}>
            <DocumentManager edit={false} deletable={false} />
          </DatagridProvider>
        )
      }

      case 3: { // Regulatory
        return (
          <Grid verticalAlign='middle'>
            <GridRow>
              <GridColumn computer={8}>
                <label><FormattedMessage id='global.filter' defaultMessage='!Filter' /></label>
                <Dropdown
                  fluid selection
                  value={this.state.regulatoryFilter}
                  options={Object.keys(regulatoryFilter).map((key) => regulatoryFilter[key])}
                  onChange={(_, { value }) => this.setState({ regulatoryFilter: value })} />
              </GridColumn>

              <GridColumn computer={8}>
                <label><FormattedMessage id='global.casProduct' defaultMessage='!CAS Product' /></label>
                <Dropdown
                  fluid selection
                  value={values.casProduct.id}
                  options={casProducts.map((cp) => ({ key: cp.id, text: cp.displayName, value: cp.id }))}
                  onChange={(_, { value }) => console.log({ value })} />
              </GridColumn>
            </GridRow>

            {markup.map((el) => el)}
          </Grid>

        )
      }

      case 4: { // Transportation
        return '4'
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
    try {
      var { companyProduct: { echoProduct } } = popupValues
    } catch (e) {
      console.error(e)
      return null
    }

    let initialValues = {
      ...echoProduct,
      productName: echoProduct.name,
      manufacturer: echoProduct.manufacturer.name,
      manufacturerProductCode: echoProduct.mfrProductCodes.toString().replace(' ', ', '),
      sdsRevisionDate: echoProduct.sdsRevisionDate ? moment(echoProduct.sdsRevisionDate).format('MM/DD/YYYY') : null,
      casProduct: getSafe(() => echoProduct.elements[this.state.casProductIndex], null)
      // esin: '', // ??
      // recommendedRestrictions: '', // ??
      // synonyms: '', // ??


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
                  <Tab
                    activeIndex={activeIndex}
                    onTabChange={(_, { activeIndex }) => tabChanged(activeIndex)}
                    panes={tabs.map((tab) => ({
                      menuItem: formatMessage(tab.text),
                      render: () => <Segment basic>{this.getContent(formikProps)}</Segment>
                    }))} />
                )
              }}
            />
          </Segment>
        </FlexContent>

        <GraySegment>
          <RightAlignedDiv>
            <Button onClick={closePopup}>
              <FormattedMessage id='global.close' defaultMessage='!Close'>{text => text}</FormattedMessage>
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
  activeIndex: number
}

CompanyProductInfo.defaultProps = {
  popupValues: {},
  isOpen: false,
  activeIndex: 0
}

export default injectIntl(CompanyProductInfo)

