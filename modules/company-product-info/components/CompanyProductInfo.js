import React, { Component } from 'react'
import { object, bool, number } from 'prop-types'
import { tabs } from '../constants'
import { Tab, Segment, GridRow, Grid, GridColumn, Button } from 'semantic-ui-react'
import { FlexSidebar, GraySegment, FlexContent } from '~/modules/inventory/components/DetailSidebar'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import moment from 'moment'

const WiderSidebar = styled(FlexSidebar)`
  min-width: 545px !important;
`

const RightAlignedDiv = styled.div`
  text-align: right;
`


class CompanyProductInfo extends Component {

  getContent = () => {
    let { activeIndex, popupValues } = this.props
    // console.log({ popupValues })

    const helper = ({ id, defaultMessage, name }) => (
      <GridRow>
        <GridColumn width={6}>
          <FormattedMessage id={id} defaultMessage={defaultMessage} />
        </GridColumn>

        <GridColumn width={10}>
          <Input inputProps={{ readOnly: true }} name={name} />
        </GridColumn>
      </GridRow>
    )

    switch (activeIndex) {
      case 0: { // Info
        return (
          <Grid verticalAlign='middle'>
            {helper({ id: 'global.productName', defaultMessage: '!Product Name', name: 'productName' })}
            {helper({ id: 'global.manufacturer', defaultMessage: '!Manufacturer', name: 'manufacturer' })}
            {helper({ id: 'global.manufacturerProductCode', defaultMessage: '!Manufacturer Product Code', name: 'manufactureProductCode' })}
            {helper({ id: 'global.emergencyNumber', defaultMessage: '!Emergency Number', name: 'emergencyNumber' })}
            {helper({ id: 'global.esin', defaultMessage: '!ESIN', name: 'esin' })}
            {helper({ id: 'global.recommendedUse', defaultMessage: '!Recommended Use', name: 'recommendedUse' })}
            {helper({ id: 'global.recommendedRestrictions', defaultMessage: '!Recommended Restrictions', name: 'recommendedRestrictions' })}
            {helper({ id: 'global.version', defaultMessage: '!Version', name: 'sdsVersionNumber' })}
            {helper({ id: 'global.revisionDate', defaultMessage: '!Revision Date', name: 'sdsRevisionDate' })}
            {helper({ id: 'global.synonyms', defaultMessage: '!Synonyms', name: 'synonyms' })}
            {helper({ id: 'global.formula', defaultMessage: '!Formula', name: 'molecularFormula' })}
            {helper({ id: 'global.molecularWeight', defaultMessage: '!Molecular Weight', name: 'molecularWeight' })}
          </Grid>
        )
      }
      case 1: { // Properties
        return (
          <Grid>
             {helper({ id: 'global.physicalState', defaultMessage: '!Physical State', name: 'physicalState' })}
             {helper({ id: 'global.appearance', defaultMessage: '!Appearance', name: 'appearance' })}
             {helper({ id: 'global.odor', defaultMessage: '!Odor', name: 'odor' })}
             {helper({ id: 'global.odorThreshold', defaultMessage: '!Odor Threshold', name: 'odorThreshold' })}
             {helper({ id: 'global.ph', defaultMessage: '!pH', name: 'ph' })}
             {helper({ id: 'global.meltingPointRange', defaultMessage: '!Melting Point/Range', name: 'meltingPointRange' })}
             {helper({ id: 'global.boilingPointRange', defaultMessage: '!Boiling Point/Range', name: 'boilingPointRange' })}
             {helper({ id: 'global.flashPoint', defaultMessage: '!Flash Point', name: 'flashPoint' })}
             {helper({ id: 'global.evaporationPoint', defaultMessage: '!Evaporation Point', name: 'evaporationPoint' })}
             {helper({ id: 'global.flammabilitySolidGas', defaultMessage: '!Flammability (solid, gas)', name: 'flammabilitySolidGas' })}
             {helper({ id: 'global.flammabilityOrExplosiveUpper', defaultMessage: '!Flammability or Explosive Upper', name: 'flammabilityOrExplosiveUpper' })}
             {helper({ id: 'global.flammabilityOrExplosiveLower', defaultMessage: '!Flammability or Explosive Lower', name: 'flammabilityOrExplosiveLower' })}
             {helper({ id: 'global.vaporPressure', defaultMessage: '!Vapor Pressure', name: 'vaporPressure' })}
             {helper({ id: 'global.vaporDensity', defaultMessage: '!Vapor Density', name: 'vaporDensity' })}
             {helper({ id: 'global.specificGravity', defaultMessage: '!Specific Gravity', name: 'specificGravity' })}
             {helper({ id: 'global.solubility', defaultMessage: '!Solubility', name: 'solubility' })}
             {helper({ id: 'global.partitionCoefficient', defaultMessage: '!Partition Coefficient', name: 'partitionCoefficient' })}
             {helper({ id: 'global.autoIgnitionTemperature', defaultMessage: '!Auto Ignition Temperature', name: 'autoIgnitionTemperature' })}
             {helper({ id: 'global.decompositionTemperature', defaultMessage: '!Decomposition Temperature', name: 'decompositionTemperature' })}
             {helper({ id: 'global.viscosity', defaultMessage: '!Viscosity', name: 'viscosity' })}
             {helper({ id: 'global.molecularFormula', defaultMessage: '!Molecular Formula', name: 'molecularFormula' })}
             {helper({ id: 'global.molecularWeight', defaultMessage: '!Molecular Weight', name: 'molecularWeight' })}
             {helper({ id: 'global.specificVolume', defaultMessage: '!Specific Volume', name: 'specificVolume' })} {/* ?? */ }
             {helper({ id: 'global.recommendedUse', defaultMessage: '!Recommended Uses', name: 'recommendedUse' })}
             {helper({ id: 'global.usesAdvisedAgainst', defaultMessage: '!Uses Advised Against', name: 'usesAdvisedAgainst' })}
             {helper({ id: 'global.criticalTemperature', defaultMessage: '!Critical Temperature', name: 'criticalTemperature' })}  {/* ?? */ }
             {helper({ id: 'global.gasDensity', defaultMessage: '!Gas Density', name: 'gasDensity' })}  {/* ?? */ }
             {helper({ id: 'global.relativeDensity', defaultMessage: '!Relative Density', name: 'relativeDensity' })} {/* ?? */ }
             {helper({ id: 'global.flowTime', defaultMessage: '!Flow Time (ISO 2431)', name: 'flowTime' })} {/* ?? */ }
             {helper({ id: 'global.heatOfCombustion', defaultMessage: '!Heat of Combustion', name: 'heatOfCombustion' })} {/* ?? */ }
          </Grid>
          // {helper({ id: 'global.', defaultMessage: '!', name: '' })}
        )
      }

      case 3: { // Documents
        return '3'
      }

      case 4: { // Regulatory
        return '4'
      }

      case 5: { // Transportation
        return '5'
      }

      default: return null



  }
}

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
      sdsRevisionDate: echoProduct.sdsRevisionDate ? moment(echoProduct.sdsRevisionDate).format('MM/DD/YYYY') : null
      // esin: '', // ??
      // recommendedRestrictions: '', // ??
      // synonyms: '', // ??


    }

    return (
      <WiderSidebar onHide={closePopup} visible={isOpen} direction='right' width='very wide'>
        <FlexContent>
          <Segment basic>
            <Form
              enableReinitialize
              initialValues={initialValues}
            >


              <Tab
                activeIndex={activeIndex}
                onTabChange={(_, { activeIndex }) => tabChanged(activeIndex)}
                panes={tabs.map((tab) => ({ menuItem: formatMessage(tab.text), render: () => <Segment basic>{this.getContent()}</Segment> }))} />

            </Form>
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

