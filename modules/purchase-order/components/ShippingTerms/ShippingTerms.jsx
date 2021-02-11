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
import AddAddress from '../AddAddress/AddAddress'

// Styles
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
import { DivRightButtons } from '../RowComponent/RowComponent.styles'


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
  const [addAddressValues, setAddAddressValues] = useState(null)
  const [isOpenAddAddress, setIsOpenAddAddress] = useState(false)

  const {
    isExpanded,
    sectionState,
    onChangeSubmitButton,
    setSectionSubmitValue,
    onValueChange,
    value,
    cart
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

  const addressOptions = getAddressOptions(
    warehouseAddressSwitch === 'warehouses' ? props.warehouses : props.deliveryAddresses
  )

  return (
    <RowComponent
      {...props}
      header={<FormattedMessage id='checkout.header.shippingAndTerms' defaultMessage='2. Shipping & Terms'/>}
      onSubmitClick={() => props.onSubmitClick()}
      submitButtonCaption={
        <FormattedMessage id='checkout.button.useThisAddress' defaultMessage='Use this Address'>
          {text => text}
        </FormattedMessage>
      }
      submitButtonDisabled={!value}
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
                    {addressOptions.map((item, index) => (
                      <GridRowExpandedSelectionRow
                        key={index}
                        checked={value && (value.id === item.id)}
                        onClick={() => onValueChange(item)}
                        selection={'true'}
                      >
                        <GridColumn width={16}>
                          <DivFlexRow>
                            <DivCentered>
                              <Radio
                                checked={value && (value.id === item.id)}
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
                                onClick={() => {
                                  setAddAddressValues(item.fullAddress)
                                  setIsOpenAddAddress(true)
                                }}
                              />
                            </DivRightSection>
                          </DivFlexRow>
                        </GridColumn>
                      </GridRowExpandedSelectionRow>
                    ))}
                  </GridExpandedSection>
                  <DivRightButtons>
                    <Button
                      basic
                      onClick={() => {
                        setAddAddressValues(null)
                        setIsOpenAddAddress(true)
                      }}
                    >
                      <FormattedMessage id='global.addNew' defaultMessage='Add New'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                  </DivRightButtons>
                  {isOpenAddAddress && (
                    <AddAddress
                      isWarehouse
                      popupValues={addAddressValues}
                      onClose={() => setIsOpenAddAddress(false)}
                    />
                  )}
                </div>
              ) : (
                <DivSectionCollapsedWrapper>
                    <DivSectionCollapsedRow>
                      <div>
                        <DivSectionName>
                          {value ? value.name : ''}
                        </DivSectionName>
                        <DivSectionDescription>
                          {value ? value.description : ''}
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