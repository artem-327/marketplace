import PropTypes from 'prop-types'
import moment from 'moment'
import { getLocaleDateFormat } from '../../../../../components/date-format'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid } from 'semantic-ui-react'
import { ArrayToFirstItem } from '../../../../../components/formatted-messages/'
import BasicButton from '../../../../../components/buttons/BasicButton'
// Styles
import {
  DivDetailWrapper,
  DivHeader,
  StyledGrid,
  SegmentGroup,
  GridRowTabField,
  GridColumnTabFieldValue,
  SegmentDetailRow,
  DivButtonsSection,
  DivButtonsRow
} from './AllPostsDetail.styles'

const AllPostsDetail = props => {
  const { row } = props

  const province = row?.deliveryProvince?.name
  const country = row?.deliveryCountry?.name

  return (
    <DivDetailWrapper>
      <DivHeader>
        <FormattedMessage id='wantedBoard.productInfoHeader' defaultMessage='Product Info' />
      </DivHeader>
      <SegmentGroup horizontal>
        <SegmentDetailRow textAlign='left'>
          <StyledGrid>
            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`wantedBoard.infoModalProductName`} defaultMessage='Product Name' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>{row.productSearchPattern}</GridColumnTabFieldValue>
            </GridRowTabField>
            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`wantedBoard.infoModalQuantityNeeded`} defaultMessage='Quantity Needed' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>
                {`${row?.quantity} ${row.unit?.nameAbbreviation}`}
              </GridColumnTabFieldValue>
            </GridRowTabField>
            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`wantedBoard.infoModalPackaging`} defaultMessage='Packaging' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>
                <ArrayToFirstItem values={row.packagingTypes?.map(data => data.name)} rowItems={2} />
              </GridColumnTabFieldValue>
            </GridRowTabField>
            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`wantedBoard.infoModalCondition`} defaultMessage='Condition' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>
                <ArrayToFirstItem values={row.conditions?.map(data => data.name)} rowItems={2} />
              </GridColumnTabFieldValue>
            </GridRowTabField>
            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`wantedBoard.infoModalGrade`} defaultMessage='Grade' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>
                <ArrayToFirstItem values={row.grades?.map(data => data.name)} rowItems={2} />
              </GridColumnTabFieldValue>
            </GridRowTabField>
          </StyledGrid>
        </SegmentDetailRow>

        <SegmentDetailRow textAlign='left'>
          <StyledGrid>
            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`wantedBoard.infoModalForm`} defaultMessage='Form' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>
                <ArrayToFirstItem values={row.forms?.map(data => data.name)} rowItems={2} />
              </GridColumnTabFieldValue>
            </GridRowTabField>
            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`wantedBoard.infoModalDeliveryLocation`} defaultMessage='Delivery Location' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>
                {province ? province + ", " + country : country ? country : ""}
              </GridColumnTabFieldValue>
            </GridRowTabField>
            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`wantedBoard.infoModalCountryOfOrigin`} defaultMessage='Country of Origin' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>
                <ArrayToFirstItem values={row.origins?.map(data => data.name)} rowItems={2} />
              </GridColumnTabFieldValue>
            </GridRowTabField>
            <GridRowTabField>
              <Grid.Column width={6}>
                <FormattedMessage id={`wantedBoard.infoModalExpiryDate`} defaultMessage='Expiry Date' />
              </Grid.Column>
              <GridColumnTabFieldValue width={10}>
                {moment(row.expiresAt).format(getLocaleDateFormat())}
              </GridColumnTabFieldValue>
            </GridRowTabField>
            <GridRowTabField>
              <Grid.Column width={16}>
                <FormattedMessage id={`wantedBoard.infoModalSpecialNotes`} defaultMessage='Special Notes' />
              </Grid.Column>
              <GridColumnTabFieldValue width={16}>{row.notes}</GridColumnTabFieldValue>
            </GridRowTabField>
          </StyledGrid>
        </SegmentDetailRow>
      </SegmentGroup>
      <DivButtonsSection>
        <DivButtonsRow>
          <BasicButton onClick={() => props.onClose()}>
            <FormattedMessage id='global.close' defaultMessage='Close'>
              {text => text}
            </FormattedMessage>
          </BasicButton>
          <BasicButton onClick={() => props.onRespond()} textcolor='#ffffff !important' background='#2599d5 !important'>
            <FormattedMessage id='wantedBoard.respond' defaultMessage='Respond'>
              {text => text}
            </FormattedMessage>
          </BasicButton>
        </DivButtonsRow>
      </DivButtonsSection>
    </DivDetailWrapper>
  )
}

export default injectIntl(AllPostsDetail)