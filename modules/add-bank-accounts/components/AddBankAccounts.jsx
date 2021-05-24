import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { Grid, Dimmer, Loader } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { usePlaidLink } from 'react-plaid-link'
import { withToastManager } from 'react-toast-notifications'
//Components
import ErrorPage from '../../errors'
//Actions
import { getVellociToken, addVellociAcount, onEventVelloci, getVellociBusinessId } from '../actions'
//Services
import { getSafe, generateToastMarkup } from '../../../utils/functions'
/**
 * @category Velloci - bank-accounts
 * @component
 */
const AddBankAccounts = ({
  getVellociToken,
  getVellociBusinessId,
  addVellociAcount,
  onEventVelloci,
  vellociToken,
  vellociBusinessId,
  magicToken,
  loading,
  toastManager
}) => {
  useEffect(() => {
    getVellociToken(magicToken)
    getVellociBusinessId(magicToken)
  }, [getVellociToken, getVellociBusinessId, magicToken])

  const plaidConfig = {
    publicKey: vellociBusinessId,
    token: vellociToken,
    onSuccess: async (_publicToken, metadata) => {
      try {
        await addVellociAcount(magicToken, metadata)
        await toastManager.add(
          generateToastMarkup(
            <FormattedMessage id='addBankAccounts.successfully.title' defaultMessage='Success!' />,
            <FormattedMessage
              id='addBankAccounts.successfully.content'
              defaultMessage='Bank accounts were successfully added!'
            />
          ),
          {
            appearance: 'success'
          }
        )
      } catch (error) {
        console.error(error.message)
      } finally {
        await Router.push('/auth/login')
      }
    },
    onEvent: (eventName, metadata) => onEventVelloci(eventName, metadata, magicToken),
    onExit: (err, metadata) => {
      if (!err && getSafe(() => metadata.link_session_id, '')) {
        Router.push('/auth/login')
      }
    }
  }

  const { open, ready, error } = usePlaidLink(plaidConfig)

  useEffect(() => {
    if (ready) {
      open()
    }
  }, [ready, open, error])

  return (
    <Grid verticalAlign='middle' centered>
      <Dimmer active={loading} inverted>
        <Loader size='large' />
      </Dimmer>
    </Grid>
  )
}

const mapStateToProps = ({ addBankAccounts }) => ({
  vellociToken: getSafe(() => addBankAccounts.vellociToken, ''),
  vellociBusinessId: getSafe(() => addBankAccounts.vellociBusinessId, ''),
  magicToken: getSafe(() => Router.router.query.token, ''),
  loading: getSafe(() => addBankAccounts.loading, '')
})

const mapDispatchToProps = {
  getVellociToken,
  getVellociBusinessId,
  addVellociAcount,
  onEventVelloci
}

AddBankAccounts.propTypes = {
  getVellociToken: PropTypes.func,
  getVellociBusinessId: PropTypes.func,
  addVellociAcount: PropTypes.func,
  onEventVelloci: PropTypes.func,
  vellociToken: PropTypes.string,
  vellociBusinessId: PropTypes.string,
  magicToken: PropTypes.string,
  loading: PropTypes.bool,
  toastManager: PropTypes.object
}

AddBankAccounts.defaltProps = {
  getVellociToken: () => {},
  getVellociBusinessId: () => {},
  addVellociAcount: () => {},
  onEventVelloci: () => {},
  vellociToken: '',
  vellociBusinessId: '',
  magicToken: '',
  loading: false,
  toastManager: null
}

export default withToastManager(connect(mapStateToProps, mapDispatchToProps)(AddBankAccounts))
