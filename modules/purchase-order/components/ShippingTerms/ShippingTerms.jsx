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

// Styles
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
  DivCentered,
  DivRightSection
} from '../Checkout.styles'

import {
  IconEdit
} from './ShippingTerms.styles'


import ShippingHandler from './ShippingHandler'


//Hooks
import { usePrevious } from "../../../../hooks"



//Services
//import ErrorFocus from '../../../components/error-focus'
//import {
//} from './Checkout.services'
import {
  getAddressOptions
} from './ShippingTerms.services'

const ShippingTerms = props => {
  // Stores previos values for compating with current value
  const prevIsExpanded  = usePrevious(props.isExpanded)

  const [warehouseAddressSwitch, setWarehouseAddressSwitch] = useState('warehouses')
  const [searchValue, setSearchValue] = useState('')

  const {
    id, // temporary
    isExpanded,
    sectionState,
    onChangeSubmitButton,
    setSectionSubmitValue,


    cartItems,
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
          <FormattedMessage id='checkout.button.useThisAddress' defaultMessage='Use this Address'>
            {text => text}
          </FormattedMessage>
        ),
        submitFunction: (val) => props.onSubmitClick(val)
      })
      setSectionSubmitValue(props.value)
    }
  }, [isExpanded])


  //console.log('!!!!!!!!!! render ShippingTerms', cartItems)
  console.log('!!!!!!!!!! render props', props)

  //console.log('!!!!!!!!!! ShippingTerms warehouseAddressSwitch', warehouseAddressSwitch)
  //console.log('!!!!!!!!!! ShippingTerms searchValue', searchValue)

  const addressOptions = getAddressOptions(
    warehouseAddressSwitch === 'warehouses' ? props.warehouses : props.deliveryAddresses
  )

  return (
    <RowComponent
      {...props}
      header={<FormattedMessage id='checkout.header.shippingAndTerms' defaultMessage='2. Shipping & Terms'/>}
      onSubmitClick={() => {
        console.log('!!!!!!!!!! ShippingTerms onSubmitClick')
        props.onSubmitClick()
      }}
      submitButtonCaption={
        <FormattedMessage id='checkout.button.useThisAddress' defaultMessage='Use this Address'>
          {text => text}
        </FormattedMessage>
      }
      content={
        (sectionState.accepted || isExpanded)
          ? (
            isExpanded
              ? (
                <div>
                  <ShippingHandler
                    warehouseAddressSwitch={warehouseAddressSwitch}
                    onSetWarehouseAddressSwitchChange={val => setWarehouseAddressSwitch(val)}
                    searchValue={searchValue}
                    onSetSearchValueChange={val => setSearchValue(val)}
                  />


                  <GridExpandedSection>
                    {addressOptions.map((item, index) =>(
                      <GridRowExpandedSelectionRow

                        key={index}


                        onClick={() => {
                          console.log('!!!!!!!!!! onClick id', item.id)
                        }}
                        selection={'true'}
                      >
                        <GridColumn width={16}>
                          <DivFlexRow>
                            <DivCentered>
                              <Radio
                                checked={false}
                              />
                            </DivCentered>
                            <div>
                              <DivSectionHeader>
                                {item.name}
                              </DivSectionHeader>
                              <DivSectionName>
                                {item.description}
                              </DivSectionName>
                            </div>
                            <DivRightSection>
                              <IconEdit
                                size={18}
                                onClick={() => console.log('!!!!!!!!!! onClick edit', item.id)}
                              />
                            </DivRightSection>
                          </DivFlexRow>
                        </GridColumn>
                      </GridRowExpandedSelectionRow>
                    ))}
                  </GridExpandedSection>
                </div>
              ) : (
                <DivSectionCollapsedWrapper>
                    <DivSectionCollapsedRow>
                      <div>
                        <DivSectionName>
                          tucne jmeno
                        </DivSectionName>
                        <DivSectionDescription>
                          normalni text
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

ShippingTerms.propTypes = {
  //itemsCount: PropTypes.number
}

ShippingTerms.defaultProps = {
  //itemsCount: 0
}

function mapStateToProps(store, props) {
  return {

  }
}

export default injectIntl(connect(mapStateToProps, {  })(ShippingTerms))