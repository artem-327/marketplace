import { connect } from 'react-redux'
import CasProductSection from './CasProductSection'
import { makeGetCasHazardClasses, makeGetHazardClassesLoading } from '../../../selectors'

const makeMapStateToProps = () => {
  const getCasHazardClasses = makeGetCasHazardClasses()
  const getHazardClassesLoading = makeGetHazardClassesLoading()

  const mapStateToProps = (state) => {
    return {
      hazardClasses: getCasHazardClasses(state),
      hazardClassesLoading: getHazardClassesLoading(state)
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, {  })(CasProductSection)
