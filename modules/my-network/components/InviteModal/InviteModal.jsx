import { useState } from 'react'
import { Modal, Dimmer, Loader, Input } from 'semantic-ui-react'
import { func, bool, array, object } from 'prop-types'
import { Trash2 } from 'react-feather'
import { injectIntl, FormattedMessage } from 'react-intl'
// Components
import BasicButton from '../../../../components/buttons/BasicButton'
import DetailRow from '../DetailRow/DetailRow'
//Styles
import { ModalCustom, DivConent, DivError } from './InviteModal.styles'
/**
 * Modal allow connect between companies.
 * @category My Network
 * @component
 */
const InviteModal = props => {
  const [value, setValue] = useState('')
  const {
    open,
    intl: { formatMessage },
    onClose,
    search,
    isError,
    loading,
    updating,
    detailCompany,
    buttonActionsDetailRow,
    openGlobalAddForm
  } = props

  return (
    <ModalCustom
      size={detailCompany ? 'large' : 'tiny'}
      open={open}
      onClose={() => {
        typeof openGlobalAddForm === 'function' && openGlobalAddForm('')
        onClose()
        setValue('')
      }}
      closeIcon={true}>
      <Dimmer active={loading} inverted>
        <Loader size='large' />
      </Dimmer>
      <Modal.Header>
        <FormattedMessage id='myNetworks.inviteModal.title' defaultMessage='Trade Pass ID' />
      </Modal.Header>
      <Modal.Content>
        {detailCompany ? (
          <>
            <DetailRow
              row={detailCompany}
              buttonActionsDetailRow={buttonActionsDetailRow}
              openGlobalAddForm={openGlobalAddForm}
              updating={updating}
            />
          </>
        ) : (
          <>
            <DivConent>
              <FormattedMessage
                id='myNetworks.inviteModal.content'
                defaultMessage='Sending an invite to a member will allow that member to see your Trade Pass and allow that member to add you to their network.'
              />
            </DivConent>
            <Input
              fluid
              error={isError}
              placeholder={formatMessage({
                id: 'myNetworks.inviteModal.placeholder',
                defaultMessage: 'Enter Trade Pass ID'
              })}
              value={value}
              onChange={(e, data) => setValue(data?.value)}
              type='text'
            />
            {isError && (
              <DivError>
                <FormattedMessage
                  id='myNetworks.inviteModal.errorLabel'
                  defaultMessage='No member was found in this Trade Pass ID'
                />
              </DivError>
            )}
          </>
        )}
      </Modal.Content>
      {!detailCompany && (
        <Modal.Actions>
          <BasicButton
            noBorder
            onClick={() => {
              typeof openGlobalAddForm === 'function' && openGlobalAddForm('')
              onClose()
              setValue('')
            }}>
            <b>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
            </b>
          </BasicButton>
          <BasicButton
            noBorder
            textcolor='#ffffff !important'
            background='#00c7f9 !important'
            onClick={async () => {
              try {
                await search(value)
              } catch (err) {
                console.error(err)
              }
            }}>
            <b>
              <FormattedMessage id='global.search' defaultMessage='Search' />
            </b>
          </BasicButton>
        </Modal.Actions>
      )}
    </ModalCustom>
  )
}

InviteModal.propTypes = {
  open: bool,
  isError: bool,
  loading: bool,
  updating: bool,
  onClose: func,
  search: func,
  detailCompany: object,
  buttonActionsDetailRow: func,
  openGlobalAddForm: func
}

InviteModal.defaultProps = {
  open: false,
  isError: false,
  loading: false,
  updating: false,
  onClose: () => {},
  search: () => {},
  detailCompany: null,
  buttonActionsDetailRow: () => {},
  openGlobalAddForm: null
}

export default injectIntl(InviteModal)
