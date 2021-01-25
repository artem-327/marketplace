import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { Dimmer, Loader } from 'semantic-ui-react'
import { PlaidLink } from 'react-plaid-link'
//Components
import ErrorPage from '../../errors'
//Actions
import { getVellociToken, addVellociAcount, onEventVelloci } from '../actions'
//Services
import { getSafe } from '../../../utils/functions'

const AddBankAccounts = ({
  getVellociToken,
  addVellociAcount,
  onEventVelloci,
  vellociToken,
  vellociBusinessId,
  magicToken,
  loading
}) => {
  useEffect(() => {
    getVellociToken(magicToken)
  }, [getVellociToken, magicToken])

  if (loading) {
    return (
      <Dimmer active={true} inverted>
        <Loader active={true} />
      </Dimmer>
    )
  } else if (!vellociToken && !vellociBusinessId && !loading) {
    return <ErrorPage type='forbidden' status='403' logout />
  } else {
    return (
      <>
        <PlaidLink
          token={vellociToken}
          publicKey={vellociBusinessId}
          onExit={Router.push('/auth/login')}
          onSuccess={(publicToken, metadata) => addVellociAcount(publicToken, metadata)}
          onEvent={(eventName, metadata) => onEventVelloci(eventName, metadata)}
        />
      </>
    )
  }
}

const mapStateToProps = ({ addBankAccounts }) => ({
  vellociToken: getSafe(() => addBankAccounts.vellociToken, ''),
  vellociBusinessId: getSafe(() => addBankAccounts.vellociBusinessId, ''),
  magicToken: getSafe(() => Router.router.query.token, ''),
  loading: getSafe(() => addBankAccounts.loading, '')
})

const mapDispatchToProps = {
  getVellociToken,
  addVellociAcount,
  onEventVelloci
}

AddBankAccounts.propTypes = {
  getVellociToken: PropTypes.func,
  addVellociAcount: PropTypes.func,
  onEventVelloci: PropTypes.func,
  vellociToken: PropTypes.string,
  vellociBusinessId: PropTypes.string,
  magicToken: PropTypes.string,
  loading: PropTypes.bool
}

AddBankAccounts.defaltProps = {
  getVellociToken: () => {},
  addVellociAcount: () => {},
  onEventVelloci: () => {},
  vellociToken: '',
  vellociBusinessId: '',
  magicToken: '',
  loading: false
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBankAccounts)
