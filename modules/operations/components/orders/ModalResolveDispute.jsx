import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal, Dimmer, Loader, Input, Checkbox, Form } from 'semantic-ui-react'
import { func, bool, array, object } from 'prop-types'
// Components
import BasicButton from '../../../../components/buttons/BasicButton'
//Styles
import { ModalCustom } from '../../../my-network/components/InviteModal/InviteModal.styles'

const ModalResolveDispute = ({ open, loading, onClose }) => {
  const [value, setValue] = useState(null)
  const [credit, setCredit] = useState(null)

  return (
    <ModalCustom size={'tiny'} open={open} onClose={() => onClose()} closeIcon={true}>
      <Dimmer active={loading} inverted>
        <Loader size='large' />
      </Dimmer>
      <Modal.Header>
        <FormattedMessage id='operations.orders.detail.modal.title' defaultMessage='Resolve Dispute' />
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Checkbox
              radio
              label={<FormattedMessage id='operations.orders.detail.modal.acceptOrder' defaultMessage='Accept Order' />}
              name='acceptOrder'
              value='acceptOrder'
              checked={value === 'acceptOrder'}
              onChange={() => setValue('acceptOrder')}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label={<FormattedMessage id='operations.orders.detail.modal.creditOrder' defaultMessage='Credit Order' />}
              name='creditOrder'
              value='creditOrder'
              checked={value === 'creditOrder'}
              onChange={() => setValue('creditOrder')}
            />
          </Form.Field>
          <Form.Field>
            <Input
              name='credit'
              label='$'
              value={credit}
              onChange={(e, data) => setCredit(data.value)}
              disabled={value !== 'creditOrder'}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label={<FormattedMessage id='operations.orders.detail.modal.rejectOrder' defaultMessage='Reject Order' />}
              name='rejectOrder'
              value='rejectOrder'
              checked={value === 'rejectOrder'}
              onChange={() => setValue('rejectOrder')}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <BasicButton noBorder onClick={() => onClose()}>
          <b>
            <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
          </b>
        </BasicButton>
        <BasicButton
          disabled={!value || (value === 'creditOrder' && !credit)}
          onClick={async () => {
            console.log(value)
            console.log(credit)
          }}>
          <b>
            <FormattedMessage id='global.confirm' defaultMessage='Confirm' />
          </b>
        </BasicButton>
      </Modal.Actions>
    </ModalCustom>
  )
}

ModalResolveDispute.propTypes = {}

export default ModalResolveDispute
