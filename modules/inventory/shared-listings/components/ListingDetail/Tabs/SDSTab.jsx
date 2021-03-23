import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

import { FormattedAssay, FormattedPhone } from '../../../../../../components/formatted-messages'
import { StyledGrid } from '../../../../../../components/detail-row/styles'
import {
  SegmentGroupTab,
  GridColumnTitleSection,
  GridRowTabField,
  GridColumnTabFieldValue,
  SegmentDetailRow,
  DivSdsProductName,
  DivGreyHeader,
  DivBoldText,
  GridStyledTds,
  GridColumnCustom,
  DivTdsTableHeader,
  DivTdsPropertyText,

} from '../ListingDetail.styles'
import {getSafe} from "../../../../../../utils/functions";

const getProperty = (property, product) => {
  let value = getSafe(() => product[property[1]], '')

  if (property.length > 2) {
    if (property[2] === 'phone') {
      value = <FormattedPhone value={value} />
    }
  }

  return (
    <>
      <Grid.Column width={6}>
        <FormattedMessage id={`casProduct.${property[1]}`} defaultMessage={property[0]} />
      </Grid.Column>
      <GridColumnTabFieldValue width={10}>
        {value}
      </GridColumnTabFieldValue>
    </>
  )
}

const leftProperties = [
  ['Manufacturer', 'manufacturer'],
  ['Manufacturer Product Code', 'manufacturerProductCode'],
  ['Emergency Number', 'emergencyPhone', 'phone'],
  ['ESIN', 'esin']
]

const rightProperties = [
  ['Physical State', 'physicalState'],
  ['Appearance', 'appearance'],
  ['Odor', 'odor'],
  ['Odor Threshold', 'odorThreshold'],
  ['pH', 'ph'],
  ['Melting Point/Range', 'meltingPointRange'],
  ['Boiling Point/Range', 'boilingPointRange'],
  ['Flash Point', 'flashPoint'],
  ['Evaporation Point', 'evaporationPoint'],
  ['Flammability (solid, gas)', 'flammabilitySolidGas']
]

const SDSTab = ({ row }) => {
  let product = getSafe(() => row.companyProduct.companyGenericProduct, {})
  const mixtures = getSafe(() => product.elements, [])

  product.manufacturer = getSafe(() => product.company.cfDisplayName, 'N/A')
  product.manufacturerProductCode = getSafe(() => product.code, 'N/A')  // ! ! Nevim co presne tady?
  product.esin = getSafe(() => product.esin, 'N/A')  // ! ! Nevim co presne tady?

  return (
    <SegmentGroupTab horizontal $noneBorder>
      <SegmentDetailRow textAlign='left'>
        <StyledGrid>
          <Grid.Row>
            <GridColumnTitleSection>
              <FormattedMessage id={`sharedListings.detailRow.productInfo`} defaultMessage='Product Info' />
            </GridColumnTitleSection>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <DivSdsProductName>
                <DivGreyHeader>
                  <FormattedMessage id={`sharedListings.detailRow.productInfo`} defaultMessage='Product Info' />
                </DivGreyHeader>
                <DivBoldText>
                  {getSafe(() => row.companyProduct.intProductName, '')}
                </DivBoldText>
              </DivSdsProductName>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <DivBoldText>
                <FormattedMessage id={`global.mixtures`} defaultMessage='Mixtures' />
              </DivBoldText>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <GridStyledTds>
                <Grid.Row>
                  <GridColumnCustom width={10} value='padding: 0 12px 0 0 !important;'>
                    <DivTdsTableHeader>
                      <FormattedMessage id='sharedListings.detailRow.elementName' defaultMessage='Element Name'/>
                    </DivTdsTableHeader>
                  </GridColumnCustom>
                  <Grid.Column width={4}>
                    <DivTdsTableHeader>
                      <FormattedMessage id='sharedListings.detailRow.casNumber' defaultMessage='CAS Number'/>
                    </DivTdsTableHeader>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <DivTdsTableHeader>
                      <FormattedMessage id='sharedListings.detailRow.assay' defaultMessage='Assay'/>
                    </DivTdsTableHeader>
                  </Grid.Column>
                </Grid.Row>
              </GridStyledTds>
              <GridStyledTds bordered='true'>
                {mixtures.map((el, index) => (
                  <Grid.Row key={index}>
                    <Grid.Column width={10}>
                      <DivTdsPropertyText>
                        {getSafe(() => el.displayName, '')}
                      </DivTdsPropertyText>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <DivTdsPropertyText>
                        {getSafe(() => el.casProduct.casNumber, '')}
                      </DivTdsPropertyText>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <DivTdsPropertyText>
                        <FormattedAssay min={el.assayMin} max={el.assayMax} />
                      </DivTdsPropertyText>
                    </Grid.Column>
                  </Grid.Row>
                ))}
              </GridStyledTds>
            </Grid.Column>
          </Grid.Row>

          {leftProperties.map((el, index) => (
            <GridRowTabField key={index}>
              {getProperty(el, product)}
            </GridRowTabField>
          ))}
        </StyledGrid>
      </SegmentDetailRow>
      <SegmentDetailRow textAlign='left'>
        <StyledGrid>
          <Grid.Row>
            <GridColumnTitleSection>
              <FormattedMessage id={`sharedListings.detailRow.properties`} defaultMessage='Properties' />
            </GridColumnTitleSection>
          </Grid.Row>
          {rightProperties.map((el, index) => (
            <GridRowTabField key={index}>
              {getProperty(el, product)}
            </GridRowTabField>
          ))}
        </StyledGrid>
      </SegmentDetailRow>
    </SegmentGroupTab>
  )
}

SDSTab.propTypes = {}

export default SDSTab
