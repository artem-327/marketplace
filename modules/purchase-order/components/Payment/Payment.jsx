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
  Divider,
  Radio
} from 'semantic-ui-react'
import RowComponent from '../RowComponent/RowComponent'
import {
  DivSectionCollapsedWrapper,
  DivSectionCollapsedRow,
  DivSectionHeader,
  DivSectionName,
  DivSectionDescription,
  GridExpandedSection,
  GridRowExpandedSelectionRow,
  DivFlexRow,
  DivCentered
} from '../Checkout.styles'


//Hooks
import { usePrevious } from "../../../../hooks"



//Services
//import ErrorFocus from '../../../components/error-focus'
//import {
//} from './Checkout.services'

const Payment = props => {
  // Stores previos values for compating with current value
  const prevIsExpanded  = usePrevious(props.isExpanded)
  const [checkedId, setCheckedId] = useState('')

  const {
    id, // temporary
    isExpanded,
    sectionState,
    onChangeSubmitButton,



    payments
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
          <FormattedMessage id='checkout.button.useThisPaymentMethod' defaultMessage='Use this Payment Method'>
            {text => text}
          </FormattedMessage>
        ),
        submitFunction: () => props.onSubmitClick()
      })
    }
  }, [isExpanded])


  //console.log('!!!!!!!!!! render Payment', cartItems)
  //console.log('!!!!!!!!!! render props', props)

  const selected = payments.find(el => el.id === 'VA-3af024f2-9833-472e-8711-2d37fa49c193') // ! !

  return (
    <RowComponent
      {...props}
      header={<FormattedMessage id='checkout.header.payment' defaultMessage='3. Payment'/>}
      onSubmitClick={() => {
        console.log('!!!!!!!!!! Payment onSubmitClick')
        props.onSubmitClick()
      }}
      submitButtonCaption={
        <FormattedMessage id='checkout.button.useThisPaymentMethod' defaultMessage='Use this Payment Method'>
          {text => text}
        </FormattedMessage>
      }
      content={
        (sectionState.accepted || isExpanded)
          ? (
            isExpanded
              ? (
                <GridExpandedSection>
                  {payments.map((item, index) =>
                    <GridRowExpandedSelectionRow
                      key={index}
                      checked={checkedId === item.id}
                      onClick={() => setCheckedId(item.id)}
                      selection={'true'}
                    >
                      <GridColumn width={6}>
                        <DivFlexRow>
                          <DivCentered>
                            <Radio
                              checked={checkedId === item.id}
                            />
                          </DivCentered>
                          <div>
                            <DivSectionHeader>
                              {item.name}
                            </DivSectionHeader>
                            <DivSectionName>
                              {item.id}
                            </DivSectionName>
                          </div>
                        </DivFlexRow>
                      </GridColumn>
                      <GridColumn width={10}>
                        <DivSectionHeader>
                          {item.institutionName}
                        </DivSectionHeader>
                        <DivSectionName>
                          ...Address...
                        </DivSectionName>
                      </GridColumn>
                    </GridRowExpandedSelectionRow>
                  )}
                </GridExpandedSection>
              ) : (
                <DivSectionCollapsedWrapper>
                  <DivSectionCollapsedRow>
                    <div>
                      <DivSectionName>
                        {selected.name}
                      </DivSectionName>
                      <DivSectionDescription>
                        {selected.institutionName}
                      </DivSectionDescription>
                    </div>
                  </DivSectionCollapsedRow>

                </DivSectionCollapsedWrapper>
              )
          ) : null
      }
    />
  )
}

Payment.propTypes = {
  //itemsCount: PropTypes.number
}

Payment.defaultProps = {
  //itemsCount: 0
}

function mapStateToProps(store, props) {
  return {

  }
}

export default injectIntl(connect(mapStateToProps, {  })(Payment))