import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal, Dimmer, Loader, Input, Form, Radio } from 'semantic-ui-react'
import { func, bool, string, number } from 'prop-types'
// Components
import BasicButton from '../../../../components/buttons/BasicButton'
//Styles
import { ModalCustom } from '../../../my-network/components/InviteModal/InviteModal.styles'
import { FormFieldCustom, DivReasonText } from './Orders.styles'
//Constants
import { REJECT_ORDER, CREDIT_ORDER, ACCEPT_ORDER } from './Orders.constants'

/**
 * @category Operations - Orders - Detail
 * @components
 */
const ModalResolveDispute = ({
  orderId,
  disputeReasonComment,
  open,
  loading,
  onClose,
  actions: { resolveDisputeAccept, resolveDisputeCredit, resolveDisputeReject }
}) => {
  const [value, setValue] = useState('')
  const [credit, setCredit] = useState('')

  return (
    <ModalCustom size={'tiny'} open={open} onClose={() => onClose()} closeIcon={true}>
      <Dimmer active={loading} inverted>
        <Loader size='large' />
      </Dimmer>
      <Modal.Header>
        <FormattedMessage id='operations.orders.detail.modal.title' defaultMessage='Resolve Dispute' />
      </Modal.Header>
      <Modal.Content>
        <div>
          <b>
            <FormattedMessage id='operations.orders.detail.modal.reason' defaultMessage='Reason:' />
          </b>
        </div>
        <DivReasonText>{disputeReasonComment}</DivReasonText>

        <Form>
          <FormFieldCustom>
            <Radio
              label={<FormattedMessage id='operations.orders.detail.modal.acceptOrder' defaultMessage='Accept Order' />}
              name={ACCEPT_ORDER}
              value={ACCEPT_ORDER}
              checked={value === ACCEPT_ORDER}
              onChange={() => {
                setValue(ACCEPT_ORDER)
                setCredit('')
              }}
            />
          </FormFieldCustom>
          <FormFieldCustom>
            <Radio
              label={<FormattedMessage id='operations.orders.detail.modal.creditOrder' defaultMessage='Credit Order' />}
              name={CREDIT_ORDER}
              value={CREDIT_ORDER}
              checked={value === CREDIT_ORDER}
              onChange={() => {
                setValue(CREDIT_ORDER)
                setCredit('')
              }}
            />
          </FormFieldCustom>
          <FormFieldCustom width={4}>
            <Input
              name='credit'
              label='$'
              value={credit}
              onChange={(e, data) => setCredit(data.value)}
              disabled={value !== CREDIT_ORDER}
            />
          </FormFieldCustom>
          <FormFieldCustom>
            <Radio
              label={<FormattedMessage id='operations.orders.detail.modal.rejectOrder' defaultMessage='Reject Order' />}
              name={REJECT_ORDER}
              value={REJECT_ORDER}
              checked={value === REJECT_ORDER}
              onChange={() => {
                setValue(REJECT_ORDER)
                setCredit('')
              }}
            />
          </FormFieldCustom>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <BasicButton noBorder onClick={() => onClose()}>
          <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
        </BasicButton>
        <BasicButton
          disabled={!value || (value === CREDIT_ORDER && !credit)}
          onClick={async () => {
            if (value === ACCEPT_ORDER) await resolveDisputeAccept(orderId)
            if (value === CREDIT_ORDER && credit) await resolveDisputeCredit(orderId, credit)
            if (value === REJECT_ORDER) await resolveDisputeReject(orderId)
            onClose()
          }}>
          <FormattedMessage id='global.confirm' defaultMessage='Confirm' />
        </BasicButton>
      </Modal.Actions>
    </ModalCustom>
  )
}

ModalResolveDispute.propTypes = {
  open: bool,
  orderId: number,
  disputeReasonComment: string,
  loading: bool,
  onClose: func,
  actions: {
    resolveDisputeAccept: func,
    resolveDisputeCredit: func,
    resolveDisputeReject: func
  }
}

ModalResolveDispute.defaultValues = {
  orderId: null,
  open: false,
  disputeReasonComment: '',
  loading: false,
  onClose: () => {},
  actions: {
    resolveDisputeAccept: () => {},
    resolveDisputeCredit: () => {},
    resolveDisputeReject: () => {}
  }
}

export default ModalResolveDispute
