import { connect } from 'react-redux'
import CasProductSection from './CasProductSection'
import { makeGetHazardClassesLoading, makeGetHazardClasses } from '../../../../global-data/selectors'

const makeMapStateToProps = () => {
  const getCasHazardClasses = makeGetHazardClasses()
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
