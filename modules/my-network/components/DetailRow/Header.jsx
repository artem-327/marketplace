import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
//Components
import confirm from '../../../../components/Confirmable/confirm'
import BasicButton from '../../../../components/buttons/BasicButton'
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
  DivModal
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
  intl
}) => (
  <Grid.Row>
    <GridColumnDetail>
      <SegmentGroupHeader horizontal alignItems={'align-items: center !important'}>
        <SegmentCustom textAlign='left'>
          {logo}
          <div>{address}</div>
        </SegmentCustom>
        <SegmentCustom textAlign='center'>
          <DivCollectionStat>
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
          </DivCollectionStat>
        </SegmentCustom>
        <SegmentCustom textAlign='right'>
          {getSafe(() => buttonsProps.length, false)
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
  id: PropTypes.number || PropTypes.string,
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
  address: PropTypes.string
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
  address: ''
}

export default injectIntl(Header)
