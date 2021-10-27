import { connect } from 'react-redux'
// Components
import GenerateBOLPopup from './GenerateBOLPopup'
// Services
import { withDatagrid } from '../../../datagrid'
// Actions
import { closeGenBOLPopup, generateBOL } from '../../actions'
// Selectors
import { makeGetRowBOL, makeGetTimezone } from '../../selectors'

const mapDispatchToProps = {
    closeGenBOLPopup,
    generateBOL
}

const makeMapStateToProps = () => {
    const getRowBOL = makeGetRowBOL()
    const getTimezone = makeGetTimezone()

    const mapStateToProps = state => {
        return {
            row: getRowBOL(state),
            defaultTimezone: getTimezone(state)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(GenerateBOLPopup))
