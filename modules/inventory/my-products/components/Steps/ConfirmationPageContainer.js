import { connect } from 'react-redux'
// Components
import ConfirmationPage from './ConfirmationPage'
// Actions
import { closeImportPopup } from '../../../../settings/actions'
// Selectors
import { makeGetCsvImportError, makeGetReloadFilter } from '../../../selectors'

const mapDispatchToProps = {
    closeImportPopup
}

const makeMapStateToProps = () => {
    const getCsvImportError = makeGetCsvImportError()
    const getReloadFilter = makeGetReloadFilter()

    const mapStateToProps = state => {
        return {
            csvImportError: getCsvImportError(state),
            reloadFilter: getReloadFilter(state)
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ConfirmationPage)
