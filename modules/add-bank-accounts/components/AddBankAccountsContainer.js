import { connect } from 'react-redux'
//Components
import AddBankAccounts from './AddBankAccounts'
//Actions
import { getVellociToken, addVellociAcount, onEventVelloci, getVellociBusinessId } from '../actions'
//Selectors
import { makeGetVellociToken, makeGetVellociBusinessId, makeGetMagicToken, makeGetLoading } from '../selectors'

const makeMapStateToProps = () => {
    const getVellociToken = makeGetVellociToken()
    const getVellociBusinessId = makeGetVellociBusinessId()
    const getMagicToken = makeGetMagicToken()
    const getLoading = makeGetLoading()

    const mapStateToProps = state => ({
        vellociToken: getVellociToken(state),
        vellociBusinessId: getVellociBusinessId(state),
        magicToken: getMagicToken(),
        loading: getLoading(state)
    })
    return mapStateToProps
}

const mapDispatchToProps = {
    getVellociToken,
    getVellociBusinessId,
    addVellociAcount,
    onEventVelloci
}
  
export default connect(makeMapStateToProps, mapDispatchToProps)(AddBankAccounts)