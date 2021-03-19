import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

// Styles
import { StyledGrid } from '../../../../../../components/detail-row/styles'
import { SegmentBottom } from '../../../../../my-network/components/DetailRow/DetailRow.style'
import { SegmentGroupTab, GridColumnTitleSection } from '../ListingDetail.styles'
/**
 * @category Inventory - Shared Listings
 * @component
 */
const InfoTab = props => {
  return (
    <SegmentGroupTab horizontal $noneBorder>
      <SegmentBottom textAlign='left'>
        <StyledGrid>
          <Grid.Row>
            <GridColumnTitleSection>
              <FormattedMessage id={`sharedListings.detailRow.purchaseInfo`} defaultMessage='Purchase Info' />
            </GridColumnTitleSection>
          </Grid.Row>
        </StyledGrid>
      </SegmentBottom>

      <SegmentBottom textAlign='left'>
        <StyledGrid>
          <Grid.Row>
            <GridColumnTitleSection>
              <FormattedMessage id={`sharedListings.detailRow.productInfo`} defaultMessage='Product Info' />
            </GridColumnTitleSection>
          </Grid.Row>
        </StyledGrid>
      </SegmentBottom>
    </SegmentGroupTab>
  )
}

InfoTab.propTypes = {}

export default InfoTab
