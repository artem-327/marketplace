/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import {getSafe} from "~/utils/functions"

//Components
import RowComponent from '../RowComponent/RowComponent'


//Hooks
//import { usePrevious } from '../../../hooks'



//Services
//import ErrorFocus from '../../../components/error-focus'
//import {
//} from './Checkout.services'

const ReviewItems = props => {
  const [tmp, setTmp] = useState(false)

  const {
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {
  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {

  }, [/* variableName */])


  /*
      sectionState={props.sectionState}
      isExpanded={props.isExpanded}
      onChangeButtonClick={props.onChangeButtonClick}
      onCloseButtonClick={props.onCloseButtonClick}
      onChangeButtonText={props.onChangeButtonText}
  * */
  return (
    <RowComponent
      {...props}
      header={'1. Review Items'}
      onSubmitClick={() => {
        console.log('!!!!!!!!!! ReviewItems onSubmitClick')
        props.onSubmitClick()
      }}
      submitButtonCaption='Confirm Items'
      expandedContent={
        <div>
          ReviewItems component expanded
        </div>
      }
      collapsedContent={
        <div>
          ReviewItems component collapsed
        </div>
      }
    />
  )
}

ReviewItems.propTypes = {
  itemsCount: PropTypes.number
}

ReviewItems.defaultProps = {
  itemsCount: 0
}

function mapStateToProps(store) {
  return {

  }
}

//export default injectIntl(OrderSummary)
export default injectIntl(connect(mapStateToProps, {  })(ReviewItems))