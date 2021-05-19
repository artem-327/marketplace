import { connect } from 'react-redux'
import CasProductSection from './CasProductSection'
import { makeGetCasHazardClasses } from '../../../selectors'

const makeMapStateToProps = () => {
  const getCasHazardClasses = makeGetCasHazardClasses()

  const mapStateToProps = (state) => {
    return {
      hazardClasses: getCasHazardClasses(state)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, {  })(CasProductSection)
