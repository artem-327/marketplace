import { connect } from 'react-redux'
import TransactionInfo from './TransactionInfo'
import {
    makeGetApplicationName
} from '../../selectors'

const makeMapStateToProps = () => {
    const getApplicationName = makeGetApplicationName()

    const mapStateToProps = (state) => {  
        return {
            applicationName: getApplicationName(state)
        }
    }
    return mapStateToProps
}
export default connect(makeMapStateToProps, {})(TransactionInfo)
