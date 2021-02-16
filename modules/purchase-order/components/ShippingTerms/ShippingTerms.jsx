/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import { getSafe } from "~/utils/functions"
import { currency } from '~/constants/index'

//Components
import { Button, GridColumn, Radio, Dimmer, Loader } from 'semantic-ui-react'
import RowComponent from '../RowComponent/RowComponent'
import AddAddress from '../AddAddress/AddAddress'
import ShippingHandler from './ShippingHandler'

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
import { IconEdit } from './ShippingTerms.styles'

//Hooks
import { usePrevious } from "../../../../hooks"

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
    allAccepted,
    sectionState,
    onValueChange,
    setSummaryButtonCaption,
    value,
    warehousesFetching,
    isFetching
  } = props

  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {
    if (isExpanded && !prevIsExpanded) {
      setSummaryButtonCaption(
        <FormattedMessage id='checkout.button.useThisAddress' defaultMessage='Use this Address'>
          {text => text}
        </FormattedMessage>
      )
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
      submitButtonCaption={allAccepted
        ? (
          <FormattedMessage id='checkout.button.placeOrder' defaultMessage='Place Order'>
            {text => text}
          </FormattedMessage>
        ) : (
          <FormattedMessage id='checkout.button.useThisAddress' defaultMessage='Use this Address'>
            {text => text}
          </FormattedMessage>
        )
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
                  <GridExpandedSection maxHeight='605px'>
                    <Dimmer inverted active={warehousesFetching || isFetching}>
                      <Loader />
                    </Dimmer>
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
                                  setAddAddressValues(item)
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
                      {...props}
                      onUpdateAddress={value => {
                        onValueChange(getAddressOptions([value])[0])
                        try {
                          props.getDeliveryAddresses()
                          props.getWarehouses()
                        } catch (e) {
                          console.error(e)
                        }
                      }}
                      isWarehouse={warehouseAddressSwitch === 'warehouses'}
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
}

ShippingTerms.defaultProps = {
}

function mapStateToProps(store, props) {
  return { }
}

export default injectIntl(connect(mapStateToProps, {  })(ShippingTerms))