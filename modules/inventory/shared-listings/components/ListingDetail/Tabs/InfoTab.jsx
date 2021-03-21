import { memo } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
//Services
import { getLocaleDateFormat } from '../../../../../../components/date-format'
// Styles
import { StyledGrid } from '../../../../../../components/detail-row/styles'
import { SegmentBottom } from '../../../../../my-network/components/DetailRow/DetailRow.style'
import {
  SegmentGroupTab,
  GridColumnTitleSection,
  GridRowTabField,
  GridColumnTabFieldValue
} from '../ListingDetail.styles'
/**
 * @category Inventory - Shared Listings
 * @component
 */
const InfoTab = ({ row }) => {
  console.log('row')
  console.log(row)
  return (
    <SegmentGroupTab horizontal $noneBorder>
      <SegmentBottom textAlign='left'>
        <StyledGrid>
          <Grid.Row>
            <GridColumnTitleSection>
              <FormattedMessage id={`sharedListings.detailRow.purchaseInfo`} defaultMessage='Purchase Info' />
            </GridColumnTitleSection>
          </Grid.Row>

          <GridRowTabField>
            <Grid.Column width={5}>
              <FormattedMessage id={`cart.minimumPackges`} defaultMessage='Minimum Package' />
            </Grid.Column>
            <GridColumnTabFieldValue width={11}>{row?.minPkg}</GridColumnTabFieldValue>
          </GridRowTabField>

          <GridRowTabField>
            <Grid.Column width={5}>
              <FormattedMessage id={`cart.split`} defaultMessage='Split' />
            </Grid.Column>
            <GridColumnTabFieldValue width={11}>{row?.splitPkg}</GridColumnTabFieldValue>
          </GridRowTabField>

          <GridRowTabField>
            <Grid.Column width={5}>
              <FormattedMessage id={`global.paymentTerms`} defaultMessage='Payment Terms' />
            </Grid.Column>
            <GridColumnTabFieldValue width={11}>{row?.paymentTerms}</GridColumnTabFieldValue>
          </GridRowTabField>

          <GridRowTabField>
            <Grid.Column width={5}>
              <FormattedMessage id={`global.leadTime`} defaultMessage='Lead Time' />
            </Grid.Column>
            <GridColumnTabFieldValue width={11}>{row?.leadTime}</GridColumnTabFieldValue>
          </GridRowTabField>
        </StyledGrid>
      </SegmentBottom>

      <SegmentBottom textAlign='left'>
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
            <Grid.Column width={5}>
              <FormattedMessage id={`global.manufacturer`} defaultMessage='Manufacturer' />
            </Grid.Column>
            <GridColumnTabFieldValue width={11}>
              {row?.createdBy?.company?.cfDisplayName}
              <span style={{ color: 'red', fontSize: '10px' }}>
                FIXME is it that field?: row.createdBy.company.cfDisplayName
              </span>
            </GridColumnTabFieldValue>
          </GridRowTabField>

          <GridRowTabField>
            <Grid.Column width={5}>
              <FormattedMessage id={`global.origin`} defaultMessage='Country of Origin' />
            </Grid.Column>
            <GridColumnTabFieldValue width={11}>
              {row?.createdBy?.homeBranch?.deliveryAddress?.address?.country?.name}
              <span style={{ color: 'red', fontSize: '10px' }}>
                FIXME is it that field?: row.createdBy.homeBranch.deliveryAddress.address.country.name
              </span>
            </GridColumnTabFieldValue>
          </GridRowTabField>

          <GridRowTabField>
            <Grid.Column width={5}>
              <FormattedMessage id={`global.condition`} defaultMessage='Condition' />
            </Grid.Column>
            <GridColumnTabFieldValue width={11}>
              {row?.conforming ? 'Conforming' : 'N/A'}
              <span style={{ color: 'red', fontSize: '10px' }}>FIXME is it that field?: row.conforming</span>
            </GridColumnTabFieldValue>
          </GridRowTabField>

          <GridRowTabField>
            <Grid.Column width={5}>
              <FormattedMessage id={`global.expirationDate`} defaultMessage='Expiration Date' />
            </Grid.Column>
            <GridColumnTabFieldValue width={11}>
              {row?.companyProduct?.expirationDate
                ? moment(row?.companyProduct?.expirationDate).format(getLocaleDateFormat())
                : 'N/A'}
              <span style={{ color: 'red', fontSize: '10px' }}>
                FIXME is it that field?: row.companyProduct.expirationDate
              </span>
            </GridColumnTabFieldValue>
          </GridRowTabField>

          <GridRowTabField>
            <Grid.Column width={5}>
              <FormattedMessage id={`global.form`} defaultMessage='Form' />
            </Grid.Column>
            <GridColumnTabFieldValue width={11}>
              {row?.companyProduct?.form?.name}
              <span style={{ color: 'red', fontSize: '10px' }}>
                FIXME is it that field?: row.companyProduct.form.name
              </span>
            </GridColumnTabFieldValue>
          </GridRowTabField>
        </StyledGrid>
      </SegmentBottom>
    </SegmentGroupTab>
  )
}

InfoTab.propTypes = {}
InfoTab.defaultProps = {}

function areEqual(prevProps, nextProps) {
  return prevProps?.id === nextProps?.id
}

const MemoInfoTab = memo(InfoTab, areEqual)

export default MemoInfoTab
