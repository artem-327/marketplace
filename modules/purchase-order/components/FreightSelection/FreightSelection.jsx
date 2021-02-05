/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import { getSafe } from "~/utils/functions"
import { currency } from '~/constants/index'

//Components
import {
  Container as SemanticContainer,
  Image,
  Header,
  Button,
  Icon,
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Popup,
  Message,
  Divider
} from 'semantic-ui-react'
import RowComponent from '../RowComponent/RowComponent'
import {
  DivSectionCollapsedWrapper,
  DivSectionCollapsedRow,
  DivSectionName,
  DivSectionDescription,



} from '../Checkout.styles'


//Hooks
import { usePrevious } from "../../../../hooks"



//Services
//import ErrorFocus from '../../../components/error-focus'
//import {
//} from './Checkout.services'

const FreightSelection = props => {
  // Stores previos values for compating with current value
  const prevIsExpanded  = usePrevious(props.isExpanded)
  const [edited, setEdited] = useState(false)

  const {
    id, // temporary
    isExpanded,
    sectionState,
    onChangeSubmitButton,



  } = props

  // Similar to call componentDidMount:
  useEffect(() => {

  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {


    if (isExpanded && !prevIsExpanded) {
      onChangeSubmitButton({
        caption: (
          <FormattedMessage id='checkout.button.useThisFreight' defaultMessage='Use this Freight'>
            {text => text}
          </FormattedMessage>
        ),
        submitFunction: () => props.onSubmitClick()
      })
    }
  }, [isExpanded])


  //console.log('!!!!!!!!!! render FreightSelection', cartItems)
  //console.log('!!!!!!!!!! render props', props)

  return (
    <RowComponent
      {...props}
      header={<FormattedMessage id='checkout.header.freightSelection' defaultMessage='4. Freight Selection'/>}
      onSubmitClick={() => {
        console.log('!!!!!!!!!! Freight Selection onSubmitClick')
        props.onSubmitClick()
      }}
      submitButtonCaption={
        <FormattedMessage id='checkout.button.useThisFreight' defaultMessage='Use this Freight'>
          {text => text}
        </FormattedMessage>
      }
      content={
        (sectionState.accepted || isExpanded)
          ? (
            isExpanded
              ? (
                <div>
                  Freight Selection component expanded 2
                </div>
              ) : (
                <DivSectionCollapsedWrapper>
                  <DivSectionCollapsedRow>
                    <DivSectionName>
                      tucne jmeno Freight Selection
                    </DivSectionName>
                    <DivSectionDescription>
                      normalni text Freight Selection
                    </DivSectionDescription>
                  </DivSectionCollapsedRow>

                </DivSectionCollapsedWrapper>
              )
          ) : null
      }
    />
  )
}

FreightSelection.propTypes = {
  //itemsCount: PropTypes.number
}

FreightSelection.defaultProps = {
  //itemsCount: 0
}

function mapStateToProps(store, props) {
  return {

  }
}

export default injectIntl(connect(mapStateToProps, {  })(FreightSelection))