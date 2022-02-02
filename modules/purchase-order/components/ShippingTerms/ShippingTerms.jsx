/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { currency } from '~/constants/index'
import PerfectScrollbar from 'react-perfect-scrollbar'

//Components
import { Button, GridRow, GridColumn, Radio, Dimmer, Loader, Popup } from 'semantic-ui-react'
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
import { usePrevious } from '../../../../hooks'

import { getAddressOptions } from './ShippingTerms.services'

const ShippingTerms = props => {
  // Stores previos values for compating with current value
  const prevIsExpanded = usePrevious(props.isExpanded)
  const [warehouseAddressSwitch, setWarehouseAddressSwitch] = useState('warehouses')
  const [searchValue, setSearchValue] = useState('')
  const [addAddressValues, setAddAddressValues] = useState(null)

  const {
    isExpanded,
    allAccepted,
    sectionState,
    onValueChange,
    setSummaryButtonCaption,
    value,
    warehousesFetching,
    isFetching,
    isOpenModal,
    setIsOpenAddAddress,
    warehouses,
    deliveryAddresses,
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
    warehouseAddressSwitch === 'warehouses' ? warehouses : deliveryAddresses
  )
  return (
    <RowComponent
      {...props}
      header={<FormattedMessage id='checkout.header.shippingAndTerms' defaultMessage='2. Shipping & Terms' />}
      onSubmitClick={() => props.onSubmitClick()}
      submitButtonCaption={
        allAccepted ? (
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
        sectionState.accepted || isExpanded ? (
          isExpanded ? (
            <div>
              <ShippingHandler
                warehouseAddressSwitch={warehouseAddressSwitch}
                onSetWarehouseAddressSwitchChange={val => setWarehouseAddressSwitch(val)}
                searchValue={searchValue}
                onSetSearchValueChange={val => setSearchValue(val)}
              />
              <GridExpandedSection overflow={'overflow: auto;'} $psscroll={true} maxheight='605px'>
                <Dimmer inverted active={warehousesFetching || isFetching}>
                  <Loader />
                </Dimmer>
                <PerfectScrollbar className='ui grid'>
                  {addressOptions.map((item, index) => {
                    const disabled = !item.fullAddress?.enabled
                    return (
                      <GridRowExpandedSelectionRow
                        key={index}
                        checked={value && value.id === item.id && !disabled}
                        onClick={() => !disabled && onValueChange(item)}
                        selection={'true'}
                        disabled={disabled}>
                        <GridColumn width={16}>
                          <Popup
                            disabled={!disabled}
                            wide
                            trigger={
                              <DivFlexRow>
                                <DivCentered>
                                  <Radio checked={value && value.id === item.id && !disabled} disabled={disabled} />
                                </DivCentered>
                                <div>
                                  <DivSectionHeader disabled={disabled}>{item.name}</DivSectionHeader>
                                  <DivSectionName disabled={disabled}>{item.description}</DivSectionName>
                                </div>
                                <DivRightSection>
                                  <IconEdit
                                    disabled={disabled}
                                    size={18}
                                    onClick={() => {
                                      let fullAddress = {};
                                      if (!disabled) {
                                        for (const key in item.fullAddress) {
                                          if (Object.hasOwnProperty.call(item.fullAddress, key)) {
                                            const element = item.fullAddress[key];
                                            if (key !== 'enabled') {
                                              fullAddress[key] = element;
                                            }
                                          }
                                        }
                                        let newItem = {
                                          ...item,
                                          fullAddress,
                                        }
                                        setAddAddressValues(newItem)
                                        setIsOpenAddAddress(true)
                                      }
                                    }}
                                  />
                                </DivRightSection>
                              </DivFlexRow>
                            }
                            content={
                              <FormattedMessage
                                id='default.default'
                                defaultMessage={item.fullAddress?.disabledReason}
                              />
                            }
                          />
                        </GridColumn>
                      </GridRowExpandedSelectionRow>
                    )
                  })}
                  {addressOptions.length >= 50 && (
                    <GridRow>
                      <GridColumn textAlign='center' width={16}>
                        <FormattedMessage
                          id='checkout.moreResultsAreAvailable'
                          defaultMessage='More results are available, please search by location name or address.'
                        />
                      </GridColumn>
                    </GridRow>
                  )}
                </PerfectScrollbar>
              </GridExpandedSection>
              <DivRightButtons>
                <Button
                  basic
                  onClick={() => {
                    setAddAddressValues(null)
                    setIsOpenAddAddress(true)
                  }}>
                  <FormattedMessage id='global.addNew' defaultMessage='Add New'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </DivRightButtons>
              {isOpenModal && (
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
                  <DivSectionName>{value ? value.name : ''}</DivSectionName>
                  <DivSectionDescription>{value ? value.description : ''}</DivSectionDescription>
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
  isExpanded: PropTypes.bool,
  allAccepted: PropTypes.bool,
  sectionState: PropTypes.object,
  onValueChange: PropTypes.func,
  setSummaryButtonCaption: PropTypes.func,
  value: PropTypes.object,
  warehousesFetching: PropTypes.bool,
  isFetching: PropTypes.bool,
  isOpenModal: PropTypes.bool,
  setIsOpenAddAddress: PropTypes.func,
  deliveryAddresses: PropTypes.object
}

ShippingTerms.defaultProps = {
  isExpanded: false,
  allAccepted: false,
  sectionState: {},
  onValueChange: () => { },
  setSummaryButtonCaption: () => { },
  value: {},
  warehousesFetching: false,
  isFetching: false,
  isOpenModal: false,
  setIsOpenAddAddress: () => {},
  deliveryAddresses: {}
}

function mapStateToProps(store, props) {
  return {}
}

export default injectIntl(connect(mapStateToProps, {})(ShippingTerms))
