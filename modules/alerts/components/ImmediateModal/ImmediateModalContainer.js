import { connect } from 'react-redux'
//Components
import ImmediateModal from './ImmediateModal'
//Actions
import { getNextImmediate } from '../../actions'

const mapStateToProps = ({ nextImmediate }) => ({
  nextImmediate: nextImmediate,
})

const mapDispatchToProps = {
  getNextImmediate
}

export default connect(mapStateToProps, mapDispatchToProps)(ImmediateModal)
