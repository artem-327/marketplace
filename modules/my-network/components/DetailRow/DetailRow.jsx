import PropTypes from 'prop-types'
import { Grid, Image, Segment, Loader, Dimmer } from 'semantic-ui-react'
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
  DivCollapseText,
  DivTradePassLogo,
  GridRowLoadingBottomSegment
} from './DetailRow.style'
//Constants
import { BUTTON_PROPS, ATTRIBUTES_TRADE_CRITERIA } from '../../constants'
//Images
// @ts-ignore
import Logo from '../../../../assets/images/network/trade-pass-logo-bw.png'

/**
 * @category My Network
 * @component
 */
const DetailRow = ({
  row,
  expandRow = null,
  buttonActionsDetailRow = null,
  openGlobalAddForm,
  loadingDetailRow = false,
  updating = false,
  enableButtons
}) => (
  <StyledGrid>
    <Dimmer active={updating} inverted>
      <Loader size='large' />
    </Dimmer>
    <Header
      id={row?.id}
      logo={row?.logo}
      transactions={row?.transactions}
      averageValue={row?.averageValue}
      buttonsProps={BUTTON_PROPS[row?.status || 'INVITE']}
      buttonActionsDetailRow={buttonActionsDetailRow}
      address={row?.address}
      openGlobalAddForm={openGlobalAddForm}
      connectionCriteria={row?.connectionCriteria}
      enableButtons={enableButtons}
    />
    <Grid.Row>
      <GridColumnDetail>
        <DivTitleTradeCriteria>
          <FormattedMessage id='title.settings.metrics' defaultMessage='Metrics' />
        </DivTitleTradeCriteria>
      </GridColumnDetail>
    </Grid.Row>
    <TradeCriteria as='div' row={row?.metrics} attributes={ATTRIBUTES_TRADE_CRITERIA} />
    {loadingDetailRow ? (
      <GridRowLoadingBottomSegment>
        <Dimmer active inverted>
          <Loader size='large'>
            <FormattedMessage id='global.loading' defaultMessage='Loading' />
          </Loader>
        </Dimmer>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </GridRowLoadingBottomSegment>
    ) : (
      <BottomSegments legalData={row?.legalData} marketingData={row?.marketingData} verifiedData={row?.verifiedData} />
    )}
    {expandRow && (
      <DivCollapse onClick={expandRow}>
        <div>
          <DivIconCollapse>
            <ChevronsUp size='18' />
          </DivIconCollapse>
          <DivCollapseText>Collapse</DivCollapseText>
        </div>
        <DivTradePassLogo>
          <Image src={Logo} />
        </DivTradePassLogo>
      </DivCollapse>
    )}
  </StyledGrid>
)

DetailRow.propTypes = {
  row: PropTypes.object,
  expandRow: PropTypes.func,
  buttonActionsDetailRow: PropTypes.func,
  openGlobalAddForm: PropTypes.func,
  loadingDetailRow: PropTypes.bool,
  updating: PropTypes.bool,
  enableButtons: PropTypes.bool
}

DetailRow.defaultProps = {
  row: null,
  expandRow: null,
  buttonActionsDetailRow: null,
  openGlobalAddForm: null,
  loadingDetailRow: false,
  updating: false,
  enableButtons: true
}

export default DetailRow
