import { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { Dimmer, Loader, Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
//Components
import ErrorPage from '../../errors'
//Actions
import { getVellociToken, addVellociAcount, onEventVelloci, getVellociBusinessId } from '../actions'
//Services
import { getSafe } from '../../../utils/functions'
//Styles
import { PlaidButton } from '../styles/AddBankAccounts.styles'

const AddBankAccounts = ({
  getVellociToken,
  getVellociBusinessId,
  addVellociAcount,
  onEventVelloci,
  vellociToken,
  vellociBusinessId,
  magicToken,
  loading
}) => {
  useEffect(() => {
    getVellociToken(magicToken)
    getVellociBusinessId(magicToken)
  }, [getVellociToken, getVellociBusinessId, magicToken])

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
      <Grid verticalAlign='middle' centered>
        <PlaidButton
          disabled={!vellociToken || !vellociBusinessId}
          token={vellociToken}
          publicKey={vellociBusinessId}
          onSuccess={async (publicToken, metadata) => addVellociAcount(publicToken, metadata)}
          onEvent={(eventName, metadata) => onEventVelloci(eventName, metadata)}>
          <FormattedMessage id='velloci.addBankAccounts' defaultMessage='Add Bank Accounts' />
        </PlaidButton>
      </Grid>
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
  loading: PropTypes.bool
}

AddBankAccounts.defaltProps = {
  getVellociToken: () => {},
  getVellociBusinessId: () => {},
  addVellociAcount: () => {},
  onEventVelloci: () => {},
  vellociToken: '',
  vellociBusinessId: '',
  magicToken: '',
  loading: false
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBankAccounts)
