import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Modal, Dimmer, Loader, Input, Form, Radio } from 'semantic-ui-react'
import { func, bool, string, number, array } from 'prop-types'
// Components
import BasicButton from '../../../../components/buttons/BasicButton'
//Styles
import { FormFieldCustom, DivMarginBottom, ModalCustom } from '../../styles'
//Constants
import { REJECT_ORDER, CREDIT_ORDER, ACCEPT_ORDER } from '../../constants'

/**
 * @category Operations - Orders - Detail
 * @components
 */
const ModalResolveDispute = ({
  orderId,
  disputeReasonComment,
  disputeAttachments,
  open,
  loading,
  onClose,
  actions: { resolveDisputeAccept, resolveDisputeCredit, resolveDisputeReject, downloadDisputeAttachment }
}) => {
  const [value, setValue] = useState('')
  const [credit, setCredit] = useState('')

  const downloadAttachment = async (orderId, attachmentId, attachmentType, attachmentName) => {
    let attachment = await downloadDisputeAttachment(orderId, attachmentId)

    const element = document.createElement('a')
    const file = new Blob([attachment.value.data], { type: attachmentType })
    let fileURL = URL.createObjectURL(file)

    element.href = fileURL
    element.download = attachmentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

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
        <DivMarginBottom>{disputeReasonComment}</DivMarginBottom>

        <div>
          <b>
            <FormattedMessage id='operations.orders.detail.modal.attachments' defaultMessage='Attachments:' />
          </b>
        </div>
        <DivMarginBottom>
          {disputeAttachments.map( attachment => {
            const attachmentId = attachment.id
            const attachmentType = attachment.fileType
            const attachmentName = attachment.fileName
            return (
              <div key={attachmentId}>
                <a
                  onClick={() => { downloadAttachment(orderId, attachmentId, attachmentType, attachmentName) }}
                  style={{ fontSize: '1.14285714em', cursor: 'pointer' }}
                  data-test='orders_detail_download_order'>
                  {attachmentName}
                </a>
              </div>
            )
          })}
        </DivMarginBottom>

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
  disputeAttachments: array,
  loading: bool,
  onClose: func,
  actions: {
    resolveDisputeAccept: func,
    resolveDisputeCredit: func,
    resolveDisputeReject: func,
    downloadDisputeAttachment: func
  }
}

ModalResolveDispute.defaultValues = {
  orderId: null,
  open: false,
  disputeReasonComment: '',
  disputeAttachments: [],
  loading: false,
  onClose: () => {},
  actions: {
    resolveDisputeAccept: () => {},
    resolveDisputeCredit: () => {},
    resolveDisputeReject: () => {},
    downloadDisputeAttachment: () => {}
  }
}

export default ModalResolveDispute
