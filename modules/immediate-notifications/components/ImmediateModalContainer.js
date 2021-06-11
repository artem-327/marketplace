import { connect } from 'react-redux'
//Components
import ImmediateModal from './ImmediateModal'
//Actions
import { getNextImmediate } from '../actions'
//Selectors
import { makeGetNextImmediate } from '../selectors'

const makeMapStateToProps = () => {
  const getNextImmediate = makeGetNextImmediate()

  const mapStateToProps = state => {
    return {
      nextImmediate: getNextImmediate(state)
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = {
  getNextImmediate
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ImmediateModal)
