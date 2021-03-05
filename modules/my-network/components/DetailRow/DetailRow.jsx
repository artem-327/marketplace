import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { ChevronsUp } from 'react-feather'
//Components
import BottomSegments from './BottomSegments/BottomSegments'
import TradeCriteria from '../../../../components/detail-row/header'
import Header from './Header'
//Styles
import { StyledGrid } from '../../../../components/detail-row/styles'
import {
  DivTitleTradeCriteria,
  GridColumnDetail,
  DivCollapse,
  DivIconCollapse,
  DivCollapseText
} from './DetailRow.style'
//Constants
import { BUTTON_PROPS, ATTRIBUTES_TRADE_CRITERIA } from '../../constants'

/**
 * @category My Network
 * @component
 */
const DetailRow = ({ row, expandRow }) => (
  <StyledGrid>
    <Header
      id={row.id}
      logo={row.logo}
      transactions={47}
      averageValue={14149}
      buttonsProps={BUTTON_PROPS[row.status]}
      buttonActionsDetailRow={row.buttonActionsDetailRow}
    />
    <Grid.Row>
      <GridColumnDetail>
        <DivTitleTradeCriteria>
          <FormattedMessage id='title.settings.tradeCriteria' defaultMessage='Trade Criteria' />
        </DivTitleTradeCriteria>
      </GridColumnDetail>
    </Grid.Row>
    <TradeCriteria as='div' row={row.tradeCriteria} attributes={ATTRIBUTES_TRADE_CRITERIA} />
    <BottomSegments legalData={row.legalData} marketingData={row.marketingData} verifiedData={row.verifiedData} />
    <DivCollapse onClick={expandRow}>
      <div>
        <DivIconCollapse>
          <ChevronsUp size='18' />
        </DivIconCollapse>
        <DivCollapseText>Collapse</DivCollapseText>
      </div>
    </DivCollapse>
  </StyledGrid>
)

DetailRow.propTypes = {
  row: PropTypes.object
}

DetailRow.defaultProps = {
  row: null
}

export default DetailRow
