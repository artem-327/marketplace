import { withAuth } from "../../../hocs"
import { connect } from 'react-redux'
import BroadcastCalculations from "./BroadcastCalculations"

const mapStateToProps = (state) => {

}

export default withAuth(connect(mapStateToProps)(BroadcastCalculations))