import { connect } from 'react-redux'
// Components
import GenerateBOLPopup from './GenerateBOLPopup'
// Services
import { withDatagrid } from '../../../datagrid'
// Actions
import { closeGenBOLPopup, generateBOL } from '../../actions'
// Selectors
import { makeGetRowBOL } from '../../selectors'

const mapDispatchToProps = {
    closeGenBOLPopup,
    generateBOL
}

const makeMapStateToProps = () => {
    const getRowBOL = makeGetRowBOL()

    const mapStateToProps = state => {
        return {
            row: getRowBOL(state)
        }
    }
    return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(GenerateBOLPopup))
