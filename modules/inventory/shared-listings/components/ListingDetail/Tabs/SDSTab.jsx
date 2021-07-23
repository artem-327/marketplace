import { memo } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
//Styles
import { StyledGrid } from '../../../../../../components/detail-row/styles'
import {
  SegmentGroupTab,
  GridColumnTitleSection,
  GridRowTabField,
  SegmentDetailRow,
  DivSdsProductName,
  DivGreyHeader,
  DivBoldText,
  GridStyledTds,
  GridColumnCustom,
  DivTdsTableHeader,
  DivTdsPropertyText,
  DivFlexRow,
  DivFlexRowSpace
} from '../ListingDetail.styles'
import { getSafe } from '../../../../../../utils/functions'
//Services
import { FormattedAssay } from '../../../../../../components/formatted-messages'
import { getProperty } from '../ListingDetail.services'
//Constants
import { rightProperties, leftProperties } from '../ListingDetail.constants'

/**
 * SDSTab Component
 * @category Inventory - Shared Listings
 * @component
 */
const SDSTab = ({ row }) => {
  let product = getSafe(() => row.companyProduct.companyGenericProduct, {})
  const mixtures = getSafe(() => product.elements, [])

  product.manufacturer = getSafe(() => product.company.cfDisplayName, 'N/A')
  product.manufacturerProductCode = getSafe(() => product.code, 'N/A') // ! ! Nevim co presne tady?
  product.esin = getSafe(() => product.esin, 'N/A') // ! ! Nevim co presne tady?

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
                <DivBoldText>{getSafe(() => row.companyProduct.intProductName, '')}</DivBoldText>
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
                  <GridColumnCustom width={16} value='padding: 0 12px 0 0 !important;'>
                    <DivFlexRowSpace>
                      <DivTdsTableHeader value='text-overflow: ellipsis; overflow: hidden;'>
                        <FormattedMessage id='sharedListings.detailRow.elementName' defaultMessage='Element Name' />
                      </DivTdsTableHeader>
                      <DivFlexRow>
                        <DivTdsTableHeader value='padding-left: 20px; width: 130px;'>
                          <FormattedMessage id='sharedListings.detailRow.casNumber' defaultMessage='CAS Number' />
                        </DivTdsTableHeader>
                        <DivTdsTableHeader value='padding-left: 20px; width: 105px;'>
                          <FormattedMessage id='sharedListings.detailRow.assay' defaultMessage='Assay' />
                        </DivTdsTableHeader>
                      </DivFlexRow>
                    </DivFlexRowSpace>
                  </GridColumnCustom>
                </Grid.Row>
              </GridStyledTds>
              <GridStyledTds bordered='true'>
                {mixtures.map((el, index) => (
                  <Grid.Row key={index}>
                    <Grid.Column width={16}>
                      <DivFlexRowSpace>
                        <DivTdsPropertyText value='text-overflow: ellipsis; overflow: hidden;'>
                          {getSafe(() => el.displayName, '')}</DivTdsPropertyText>
                        <DivFlexRow>
                          <DivTdsPropertyText value='padding-left: 20px; width: 130px;'>
                            {getSafe(() => el.casProduct.casNumber, '')}
                          </DivTdsPropertyText>
                          <DivTdsPropertyText value='padding-left: 20px; width: 105px;'>
                            <FormattedAssay min={el.assayMin} max={el.assayMax} />
                          </DivTdsPropertyText>
                      </DivFlexRow>
                      </DivFlexRowSpace>
                    </Grid.Column>
                  </Grid.Row>
                ))}
              </GridStyledTds>
            </Grid.Column>
          </Grid.Row>

          {leftProperties.map((el, index) => (
            <GridRowTabField key={index}>{getProperty(el, product)}</GridRowTabField>
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
            <GridRowTabField key={index}>{getProperty(el, product)}</GridRowTabField>
          ))}
        </StyledGrid>
      </SegmentDetailRow>
    </SegmentGroupTab>
  )
}

SDSTab.propTypes = {
  row: PropTypes.object
}

SDSTab.defaultProps = {
  row: {}
}

const areEqual = (prevProps, nextProps) => {
  return prevProps?.row?.id === nextProps?.row?.id
}

const MemoSDSTab = memo(SDSTab, areEqual)

export default MemoSDSTab
