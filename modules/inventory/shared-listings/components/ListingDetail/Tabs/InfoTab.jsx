import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
//Services
import { getLocaleDateFormat } from '../../../../../../components/date-format'
// Styles
import { StyledGrid } from '../../../../../../components/detail-row/styles'
import {
  SegmentGroupTab,
  GridColumnTitleSection,
  GridRowTabField,
  GridColumnTabFieldValue,
  SegmentDetailRow
} from '../ListingDetail.styles'

/**
 * InfoTab Component
 * @category Inventory - Shared Listings
 * @component
 */

const capitalizeFirstLetter = (string) => {
  string = string.replace('_', ' ')
  string = string.toLowerCase()
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const InfoTab = ({ row }) => {
  let { paymentTerms } = row;
  return useMemo(() => {
    return (
      <SegmentGroupTab horizontal $noneBorder>
        <SegmentDetailRow textAlign='left'>
          <StyledGrid>
            <Grid.Row>
              <GridColumnTitleSection>
                <FormattedMessage id={`sharedListings.detailRow.purchaseInfo`} defaultMessage='Purchase Info' />
              </GridColumnTitleSection>
            </Grid.Row>

            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`cart.minimumPackges`} defaultMessage='Minimum Package' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>{row?.minPkg}</GridColumnTabFieldValue>
            </GridRowTabField>

            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`cart.split`} defaultMessage='Split' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>{row?.splitPkg}</GridColumnTabFieldValue>
            </GridRowTabField>

            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`global.paymentTerms`} defaultMessage='Payment Terms' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>{paymentTerms ? capitalizeFirstLetter(paymentTerms) : ''}</GridColumnTabFieldValue>
            </GridRowTabField>

            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`global.leadTime`} defaultMessage='Lead Time' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>{row?.leadTime}</GridColumnTabFieldValue>
            </GridRowTabField>
          </StyledGrid>
        </SegmentDetailRow>

        <SegmentDetailRow textAlign='left'>
          <StyledGrid>
            <Grid.Row>
              <GridColumnTitleSection>
                <FormattedMessage
                  id={`sharedListings.detailRow.productInformation`}
                  defaultMessage='Product Information'
                />
              </GridColumnTitleSection>
            </Grid.Row>

            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`global.manufacturer`} defaultMessage='Manufacturer' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>
                {row?.companyProduct?.companyGenericProduct?.manufacturer?.name}
              </GridColumnTabFieldValue>
            </GridRowTabField>

            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`global.origin`} defaultMessage='Country of Origin' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>{row?.origin?.name}</GridColumnTabFieldValue>
            </GridRowTabField>

            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`global.condition`} defaultMessage='Condition' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>{row?.conforming ? 'Conforming' : 'N/A'}</GridColumnTabFieldValue>
            </GridRowTabField>

            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`global.expirationDate`} defaultMessage='Expiration Date' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>
                {row?.lotExpirationDate ? moment(row?.lotExpirationDate).format(getLocaleDateFormat()) : 'N/A'}
              </GridColumnTabFieldValue>
            </GridRowTabField>

            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`global.form`} defaultMessage='Form' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>{row?.form?.name}</GridColumnTabFieldValue>
            </GridRowTabField>
          </StyledGrid>
        </SegmentDetailRow>
      </SegmentGroupTab>
    )
  }, [row])
}

InfoTab.propTypes = {
  row: PropTypes.object
}

InfoTab.defaultProps = {
  row: {}
}

export default InfoTab
