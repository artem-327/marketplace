import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
// Components
import TableHandler from './TableHandler'
// Actions
import * as Actions from '../../actions'
// Selectors
import { makeGetSharedListingsFilters } from '../../selectors'

const makeMapStateToProps = () => {
    const getSharedListingsFilters = makeGetSharedListingsFilters()

    const mapStateToProps = (store) => {
        return {
            sharedListingsFilters: getSharedListingsFilters(store)
        }
    }
    return mapStateToProps
}

export default injectIntl(connect(makeMapStateToProps, Actions)(TableHandler))
