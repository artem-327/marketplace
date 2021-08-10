import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
//Components
import confirm from '../../../../components/Confirmable/confirm'
import BasicButton from '../../../../components/buttons/BasicButton'
import HorizontalBarGraph from '../../../../components/horizontal-bar-graph/HorizontalBarGraph'
import PercentageIcon from '../../../../components/percentage-icon/PercentageIcon'
//Styles
import {
  SegmentGroupHeader,
  SegmentCustom,
  DivTransactions,
  DivCollectionStat,
  DivAvarageValue,
  DivValue,
  DivPadding,
  GridColumnDetail,
  DivCircle,
  DivModal,
  DivRiskTolerance,
  DivRiskToleranceWrapper,
  DivPercentageIconWrapper,
  DivBarGraph
} from './DetailRow.style'
import { InfoIcon } from '../../../../styles/global.style-components'
//Constants
import { currency } from '../../../../constants'
//Services
import { getSafe } from '../../../../utils/functions'

/**
 *
 * @category My Network
 * @component
 */
const Header = ({
  logo,
  transactions,
  averageValue,
  buttonsProps,
  buttonActionsDetailRow,
  id,
  address,
  openGlobalAddForm,
  intl,
  connectionCriteria,
  enableButtons
}) => (
  <Grid.Row>
    <GridColumnDetail>
      <SegmentGroupHeader horizontal $alignItems={'align-items: center !important'}>
        <SegmentCustom textAlign='left'>
          {logo}
          <div>{address}</div>
        </SegmentCustom>
        <SegmentCustom textAlign='center'>
          <DivCollectionStat>
            <DivRiskToleranceWrapper>
              <DivRiskTolerance>
                <FormattedMessage id='myNetwork.riskTolerance' defaultMessage='Risk Tolerance' />
              </DivRiskTolerance>
              <DivPercentageIconWrapper>
                <PercentageIcon value={connectionCriteria?.requester_tolerance} />
              </DivPercentageIconWrapper>
            </DivRiskToleranceWrapper>
            <DivBarGraph>
              <HorizontalBarGraph
                values={[
                  {
                    value: connectionCriteria?.aggregate_insurance?.criteria_risk_tolerance,
                    name: intl.formatMessage({ id: 'myNetwork.Insurance', defaultMessage: 'Insurance' }),
                    tooltip: connectionCriteria?.aggregate_insurance?.criteria_match_description
                  },
                  {
                    value: connectionCriteria?.credit_risk?.criteria_risk_tolerance,
                    name: intl.formatMessage({ id: 'myNetwork.credit', defaultMessage: 'Credit' }),
                    tooltip: connectionCriteria?.credit_risk?.criteria_match_description
                  },
                  {
                    value: connectionCriteria?.days_beyond?.criteria_risk_tolerance,
                    name: intl.formatMessage({ id: 'myNetwork.beyondTerms', defaultMessage: 'Beyond\u00A0Terms' }),
                    tooltip: connectionCriteria?.days_beyond?.criteria_match_description
                  },
                  {
                    value: connectionCriteria?.violations?.criteria_risk_tolerance,
                    name: intl.formatMessage({ id: 'myNetwork.violations', defaultMessage: 'Violations' }),
                    tooltip: connectionCriteria?.violations?.criteria_match_description
                  },
                  {
                    value: connectionCriteria?.social_presence?.criteria_risk_tolerance,
                    name: intl.formatMessage({ id: 'myNetwork.social', defaultMessage: 'Social' }),
                    tooltip: connectionCriteria?.social_presence?.criteria_match_description
                  }
                ]}
                max={100}
              />
            </DivBarGraph>

            {false && (
              <>
                <DivTransactions>
                  <DivPadding>
                    <FormattedMessage id='myNetworks.detailRow.transactions' defaultMessage='Transactions' />
                    <DivValue>{transactions}</DivValue>
                  </DivPadding>
                </DivTransactions>
                <DivAvarageValue>
                  <DivPadding>
                    <FormattedMessage id='myNetworks.detailRow.averageValue' defaultMessage='Average Value' />
                    <DivValue>
                      <FormattedNumber
                        minimumFractionDigits={0}
                        maximumFractionDigits={0}
                        style='currency'
                        value={averageValue}
                        currency={currency}
                      />
                    </DivValue>
                  </DivPadding>
                </DivAvarageValue>
              </>
            )}
          </DivCollectionStat>
        </SegmentCustom>
        <SegmentCustom textAlign='right'>
          {enableButtons && getSafe(() => buttonsProps.length, false)
            ? buttonsProps.map((button, i) => (
                <BasicButton
                  key={i}
                  data-test={`my_network_detail_row_${button?.action}_btn`}
                  textcolor={button?.color}
                  background={button?.background}
                  onClick={() => {
                    if (button?.action !== 'cancel') {
                      confirm(
                        <DivModal>
                          <DivCircle background={button?.background} borderColor={button?.borderColor}>
                            <InfoIcon size='28' color='#ffffff' />
                          </DivCircle>
                        </DivModal>,
                        <DivModal>
                          {intl.formatMessage({
                            id: `${button?.confirmId}`,
                            defaultMessage: `Do you want to ${button?.action} this connection?`
                          })}
                        </DivModal>,
                        {
                          cancelText: intl.formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' }),
                          proceedText: intl.formatMessage({ id: 'global.confirm', defaultMessage: 'Confirm' })
                        },
                        true //Basic Modal
                      ).then(
                        async () => {
                          // confirm
                          try {
                            await buttonActionsDetailRow(button?.action, id)
                            typeof openGlobalAddForm === 'function' && openGlobalAddForm('')
                          } catch (e) {
                            console.error(e)
                          }
                        },
                        () => {
                          // cancel
                        }
                      )
                    } else {
                      typeof openGlobalAddForm === 'function' && openGlobalAddForm('')
                      buttonActionsDetailRow(button?.action, id)
                    }
                  }}>
                  <FormattedMessage id={button?.textId} defaultMessage='' />
                </BasicButton>
              ))
            : null}
        </SegmentCustom>
      </SegmentGroupHeader>
    </GridColumnDetail>
  </Grid.Row>
)

Header.propTypes = {
  logo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  transactions: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  averageValue: PropTypes.number,
  buttonsProps: PropTypes.arrayOf(
    PropTypes.shape({
      textId: PropTypes.string,
      color: PropTypes.string,
      background: PropTypes.string,
      action: PropTypes.string
    })
  ),
  buttonActionsDetailRow: PropTypes.func,
  openGlobalAddForm: PropTypes.func,
  address: PropTypes.string,
  connectionCriteria: PropTypes.object,
  enableButtons: PropTypes.bool
}
Header.defaultProps = {
  logo: null,
  transactions: 0,
  averageValue: 0,
  id: null,
  buttonsProps: [
    {
      textId: '',
      color: '',
      background: '',
      action: ''
    }
  ],
  buttonActionsDetailRow: () => {},
  openGlobalAddForm: null,
  address: '',
  connectionCriteria: null,
  enableButtons: true
}

export default injectIntl(Header)
