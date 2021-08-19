import { FormattedMessage } from 'react-intl'
import cn from 'classnames'
import {
  Header,
  Checkbox,
  Popup,
  Image
} from 'semantic-ui-react'
import moment from 'moment/moment'
import { debounce } from 'lodash'
import { Warning } from '@material-ui/icons'
import { FormattedNumber } from 'react-intl'
// Components
import ActionCell from '../../../../components/table/ActionCell'
import QuickEditPricingPopup from './QuickEditPricingPopup'
import { FormattedUnit } from '../../../../components/formatted-messages'
import { ArrayToFirstItem, FormattedAssay } from '../../../../components/formatted-messages'
// Services
import confirm from '../../../../components/Confirmable/confirm'
import { getSafe, generateToastMarkup } from '../../../../utils/functions'
import { currency } from '../../../../constants/index'
import { getLocaleDateFormat } from '../../../../components/date-format'
// Constants
import {
  INDEX_TAB_EDIT,
  INDEX_TAB_PRICE_TIERS,
  INDEX_TAB_DOCUMENTS,
  INDEX_TAB_TDS,
  INDEX_TAB_PRICE_BOOK,
  BOOLEAN_TRUE
} from './MyListings.constants'
//Styles
import { NetworkDropdown, NetworkChevronDown } from '../../../../components/Network'
import {
  StyledPopup,
  CapitalizedText,
  FobPrice
} from './MyListings.styles'
//Images
import BluePalletLogoMini from '../../../../assets/images/blue-pallet/guest-copy-9@3x.png'

/**
 * columns in my listings
 * @category Inventory - My Listings
 * @method
 */
export const columns = [
    {
      name: 'productName',
      title: (
        <FormattedMessage id='global.intProductName' defaultMessage='Product Name' />
      ),
      width: 250,
      sortPath: 'ProductOffer.companyProduct.intProductName',
      allowReordering: false
    },
    {
      name: 'fobPrice',
      title: (
        <FormattedMessage id='myInventory.fobPrice' defaultMessage='FOB Price' />
      ),
      width: 180,
      align: 'right',
      sortPath: 'ProductOffer.cfPricePerUOM'
    },
    {
      name: 'productNumber',
      title: (
        <FormattedMessage id='global.intProductCode' defaultMessage='Product Code' />
      ),
      width: 160,
      sortPath: 'ProductOffer.companyProduct.intProductCode'
    },
    { name: 'echoName', disabled: true },
    { name: 'echoCode', disabled: true },
    {
      name: 'warehouse',
      title: (
        <FormattedMessage id='myInventory.warehouse' defaultMessage='Warehouse' />
      ),
      width: 180,
      sortPath: 'ProductOffer.warehouse.warehouse'
    },
    {
      name: 'available',
      title: (
        <FormattedMessage id='myInventory.available' defaultMessage='Available PKGs' />
      ),
      width: 130,
      align: 'right',
      sortPath: 'ProductOffer.quantity'
    },
    {
      name: 'packaging',
      title: (
        <FormattedMessage id='myInventory.packaging' defaultMessage='Packaging' />
      ),
      width: 150
    },
    {
      name: 'quantity',
      title: (
        <FormattedMessage id='myInventory.quantity' defaultMessage='Quantity' />
      ),
      width: 130,
      align: 'right',
      sortPath: 'ProductOffer.quantity'
    },
    {
      name: 'cost',
      title: (
        <FormattedMessage id='myInventory.cost' defaultMessage='Cost' />
      ),
      width: 100,
      align: 'right'
    },
    {
      name: 'manufacturer',
      title: (
        <FormattedMessage id='global.manufacturer' defaultMessage='Manufacturer' />
      ),
      width: 220
    },
    {
      name: 'minOrderQuantity',
      title: (
        <FormattedMessage id='myInventory.minOrderQuantity' defaultMessage='Min Order Q.' />
      ),
      width: 100
    },
    {
      name: 'splits',
      title: (
        <FormattedMessage id='myInventory.splits' defaultMessage='Splits' />
      ),
      width: 100
    },
    {
      name: 'condition',
      title: (
        <FormattedMessage id='myInventory.condition' defaultMessage='Condition' />
      ),
      width: 100
    },
    {
      name: 'grade',
      title: (
        <FormattedMessage id='myInventory.grade' defaultMessage='Grade' />
      ),
      width: 80
    },
    {
      name: 'origin',
      title: (
        <FormattedMessage id='myInventory.origin' defaultMessage='Origin' />
      ),
      width: 100
    },
    {
      name: 'form',
      title: (
        <FormattedMessage id='myInventory.form' defaultMessage='Form' />
      ),
      width: 120
    },
    {
      name: 'mfgDate',
      title: (
        <FormattedMessage id='myInventory.mfgDate' defaultMessage='MFR Date' />
      ),
      width: 100
    },
    {
      name: 'expDate',
      title: (
        <FormattedMessage id='myInventory.expDate' defaultMessage='Lot Exp. Date' />
      ),
      width: 100
    },
    {
      name: 'allocatedPkg',
      title: (
        <FormattedMessage id='myInventory.allocatedPkg' defaultMessage='Allocated PKG' />
      ),
      width: 120
    },
    {
      name: 'offerExpiration',
      title: (
        <FormattedMessage id='myInventory.offerExpiration' defaultMessage='Offer Exp. Date' />
      ),
      width: 100
    },
    {
      name: 'groupId',
      title: (
        <FormattedMessage id='myInventory.groupId' defaultMessage='Group ID' />
      ),
      width: 200
    },
    {
      name: 'lotNumber',
      title: (
        <FormattedMessage id='myInventory.lotNumber' defaultMessage='Lot Number' />
      ),
      width: 200
    },
    {
      name: 'network',
      title: ' ',
      width: 81,
      minWidth: 81,
      allowReordering: false
    }
]

/**
 * to Datagrid Filter
 * @category Inventory - My Listings
 * @method
 */
export const toDatagridFilter = savedFilter => {
    let { filters, ...rest } = savedFilter

    return {
      filters: filters.map(filter => ({
        operator: filter.operator,
        path: filter.path,
        values: filter.values.map(val => val.value)
      })),
      //pageNumber: savedFilter.pageNumber,
      pageSize: 50
    }
}

const handleFiltersValue = debounce((filter, props) => {
    const { datagrid } = props
    datagrid.setSearch(filter, true, 'pageFilters')
}, 300)

const getActions = (props) => {
    const {
    intl: { formatMessage },
    modalDetailTrigger,
    datagrid
    } = props
    return [
    {
        text: formatMessage({
        id: 'global.edit',
        defaultMessage: 'Edit'
        }),
        callback: row => tableRowClickedProductOffer(row, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_EDIT)
    },
    {
        text: formatMessage({
        id: 'global.tds',
        defaultMessage: 'TDS'
        }),
        disabled: row => !!row.groupId,
        callback: row => tableRowClickedProductOffer(row, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_TDS)
    },
    {
        text: formatMessage({
        id: 'global.documents',
        defaultMessage: 'Documents'
        }),
        disabled: row => !!row.groupId,
        callback: row => tableRowClickedProductOffer(row, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_DOCUMENTS)
    },
    {
        text: formatMessage({
        id: 'inventory.broadcast',
        defaultMessage: 'Price Book'
        }),
        disabled: row => !!row.groupId,
        callback: row => tableRowClickedProductOffer(row, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_PRICE_BOOK)
    },
    {
        text: formatMessage({
        id: 'inventory.priceTiers',
        defaultMessage: 'Price Tiers'
        }),
        disabled: row => !!row.groupId,
        callback: row => tableRowClickedProductOffer(row, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_PRICE_TIERS)
    },
    {
        text: formatMessage({
        id: 'global.delete',
        defaultMessage: 'Delete'
        }),
        disabled: row => props.editedId === row.id,
        callback: row => {
        confirm(
            formatMessage({
            id: 'confirm.deleteOfferHeader',
            defaultMessage: 'Delete Product Offer'
            }),
            formatMessage(
            {
                id: 'confirm.deleteItem',
                defaultMessage: `Do you really want to remove ${row.chemicalName}?`
            },
            { item: row.chemicalName }
            )
        ).then(async () => {
            try {
            await props.deleteProductOffer(row.id)
            datagrid.removeRow(row.id)
            } catch (e) {
            console.error(e)
            }
        })
        }
    }
    ]
}

/**
 * Search By Names and Tags
 * @category Inventory - My Listings
 * @method
 */
export const SearchByNamesAndTagsChanged = (data, props, state, setState) => {
    setState({
      ...state,
      filterValues: {
        SearchByNamesAndTags: data,
        ...(!!data && {
          ...data.filters
        })
      }
    })
    const filter = {
      SearchByNamesAndTags: data,
      ...(!!data && {
        ...data.filters
      })
    }
    props.handleVariableSave('myListingsFilters', filter)
    handleFiltersValue(filter, props)
}

/**
 * get rows for components
 * @category Inventory - My Listings
 * @method
 */
export const getRows = (props, state, setState) => {
  const {
    datagrid,
    pricingEditOpenId,
    setPricingEditOpenId,
    modalDetailTrigger,
    intl: { formatMessage },
    broadcastTemplates,
    isProductInfoOpen,
    closePopup,
    broadcastChange,
    applicationName,
    rows
  } = props
  let title

  const options = [
    {
        icon: (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' fill-rule='evenodd'>
            <path
                d='M0 0L24 0 24 24 0 24z'
                transform='translate(-1125 -387) translate(1105 295) translate(0 29) translate(20 63)'
            />
            <path
                fill='#20273A'
                fill-rule='nonzero'
                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
                transform='translate(-1125 -387) translate(1105 295) translate(0 29) translate(20 63)'
            />
            </g>
        </svg>
        ),
        title: formatMessage({ id: 'global.all', defaultMessage: 'All' }),
        subtitle: formatMessage({
        id: 'myInventory.allSubtitle',
        defaultMessage: 'My Network + BlueTrade'
        }, {
        companyName: applicationName
        }),
        value: 'GLOBAL_RULES'
    },
    {
        icon: (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' fill-rule='evenodd'>
            <path
                d='M0 0L24 0 24 24 0 24z'
                transform='translate(-335 -691) translate(0 80) translate(315 525) translate(20 86)'
            />
            <path
                fill='#848893'
                fill-rule='nonzero'
                d='M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V18c0 .55.45 1 1 1h9c.55 0 1-.45 1-1v-1.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h6v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z'
                transform='translate(-335 -691) translate(0 80) translate(315 525) translate(20 86)'
            />
            </g>
        </svg>
        ),
        title: formatMessage({ id: 'myInventory.myNetworkOnly', defaultMessage: 'My Network Only' }),
        subtitle: formatMessage({
        id: 'myInventory.myNetworkOnlySubtitle',
        defaultMessage: "Members I'm Connected To"
        }),
        value: 'GLOBAL_RULES_NO_BROKERS'
    },
    {
        icon: <Image size='mini' src={BluePalletLogoMini} />,
        title: formatMessage({ id: 'myInventory.bluePalletDirect', defaultMessage: 'BlueTrade' }, {
        companyName: applicationName
        }),
        subtitle: formatMessage({
        id: 'myInventory.bluePalletDirectSubtitle',
        defaultMessage: 'Open Marketplace'
        }),
        value: 'GLOBAL_RULES_ONLY_BROKERS'
    },
    {
        icon: (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' fill-rule='evenodd'>
            <g>
                <path
                d='M0 0L24 0 24 24 0 24z'
                transform='translate(-1125 -567) translate(1105 295) translate(0 29) translate(20 243)'
                />
                <path
                d='M0 0L24 0 24 24 0 24z'
                opacity='.87'
                transform='translate(-1125 -567) translate(1105 295) translate(0 29) translate(20 243)'
                />
            </g>
            <path
                fill='#848893'
                fill-rule='nonzero'
                d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z'
                transform='translate(-1125 -567) translate(1105 295) translate(0 29) translate(20 243)'
            />
            </g>
        </svg>
        ),
        title: formatMessage({ id: 'myInventory.justMe', defaultMessage: 'Just Me' }),
        subtitle: formatMessage({ id: 'myInventory.justMeSubtitle', defaultMessage: 'Only my Company' }),
        value: 'NO_BROADCAST'
    },
    ...broadcastTemplates.map(template => {
        return {
        icon: (
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' fill-rule='evenodd'>
                <path
                d='M0 0L24 0 24 24 0 24z'
                transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
                />
                <path
                fill='#848893'
                fill-rule='nonzero'
                d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z'
                transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
                />
            </g>
            </svg>
        ),
        title: template.name,
        subtitle: formatMessage({ id: 'myInventory.customTemplate', defaultMessage: 'Custom Template' }),
        id: template.id,
        tmp: template.name,
        value: `BROADCAST_TEMPLATE|${template.id}`
        }
    }),
    {
        icon: (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' fill-rule='evenodd'>
            <path
                d='M0 0L24 0 24 24 0 24z'
                transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
            />
            <path
                fill='#848893'
                fill-rule='nonzero'
                d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z'
                transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
            />
            </g>
        </svg>
        ),
        title: formatMessage({ id: 'myInventory.custom', defaultMessage: 'Custom' }),
        subtitle: formatMessage({ id: 'myInventory.customSubtitle', defaultMessage: 'Create Custom Rule' }),
        value: 'CUSTOM_RULES'
    }
  ]

  let result = rows.map((r, rIndex) => {
    const isOfferValid = r.validityDate ? moment().isBefore(r.validityDate) : true

    if (r.groupId) {
        title = (
        <FormattedMessage
            id='myInventory.broadcasting.disabled'
            defaultMessage='This Product Offer is part of virtual Product Group, its broadcast setting cannot be changed. If you wish not to broadcast it, remove it from the group.'
        />
        )
    } else if (isOfferValid) {
        switch (r.cfStatus.toLowerCase()) {
        case 'broadcasting':
            title = (
            <FormattedMessage
                id='myInventory.broadcasting.active'
                defaultMessage='Broadcasting now, switch off to stop broadcasting.'
            />
            )
            break
        case 'not broadcasting':
            title = (
            <FormattedMessage
                id='myInventory.broadcasting.inactive'
                defaultMessage='Not Broadcasting now, switch on to start broadcasting.'
            />
            )
            break
        case 'incomplete':
            title = (
            <FormattedMessage
                id='myInventory.broadcasting.incomplete'
                defaultMessage='Incomplete, please enter all required values first.'
            />
            )
            break
        case 'unmapped':
            title = (
            <FormattedMessage
                id='myInventory.broadcasting.unmapped'
                defaultMessage='Unmapped, please make sure related Product is mapped first.'
            />
            )
            break
        case 'unpublished':
            title = (
            <FormattedMessage
                id='myInventory.broadcasting.unpublished'
                defaultMessage='Unpublished, please make sure related Product is published first.'
            />
            )
            break
        default:
            title = (
            <FormattedMessage id='myInventory.broadcasting.notAvailable' defaultMessage='Status is not available' />
            )
        }
    } else {
        title = (
        <FormattedMessage
            id='myInventory.broadcasting.validityExpired'
            defaultMessage='This product offer validity date has expired, so it cannot be broadcasted.'
        />
        )
    }
    if (r.cfStatusReason && !(r.cfStatus.toLowerCase() === 'broadcasting' && isOfferValid))
        title = (
        <>
            {title} <span>{' ' + r.cfStatusReason}</span>
        </>
        )

    let productStatusText = null
    switch (r.cfStatus) {
        case 'Unpublished': {
        productStatusText = (
            <FormattedMessage
            id='global.notPublished'
            defaultMessage='This echo product is not published and will not show on the Marketplace.'
            />
        )
        break
        }
        case 'Unmapped': {
        productStatusText = (
            <FormattedMessage
            id='myInventory.productStatus.unmapped'
            defaultMessage="This Offer's Company Product is not mapped to Company Generic Product, so it will not be visible to other users at Marketplace."
            />
        )
        break
        }
    }

    return {
        ...r,
        network: (
        <NetworkDropdown
            icon={<NetworkChevronDown />}
            floating
            scrolling
            header={formatMessage({ id: 'myInventory.whoShouldSee', defaultMessage: 'Who should see this offer?' })}
            pointing='top right'
            value={
            r.broadcastTemplateResponse ? r.broadcastOption + '|' + r.broadcastTemplateResponse.id : r.broadcastOption
            }
            loading={!!r.isBroadcastLoading}
            closeOnChange
            //onChange={broadcastChange}
            options={options.map((option, optIndex) => {
            return {
                key: option.id ? option.id : optIndex * -1 - 1,
                text: option.icon,
                value: option.value,
                content: <Header icon={option.icon} content={option.title} subheader={option.subtitle} />,
                onClick: () =>
                onClickBroadcast(
                    r,
                    option.value,
                    broadcastChange,
                    datagrid,
                    option.id ? { id: option.id, name: option.tmp } : null,
                    {
                    isProductInfoOpen,
                    closePopup,
                    modalDetailTrigger
                    },
                    true // updateWarehouse
                )
            }
            })}
        />
        ),
        productName: (
        <ActionCell
            row={r}
            getActions={() => getActions(props)}
            content={r.productName}
            onContentClick={() => tableRowClickedProductOffer(r, { modalDetailTrigger }, BOOLEAN_TRUE, INDEX_TAB_EDIT)}
            rightAlignedContent={
            <>
                {r.expired || productStatusText ? (
                <Popup
                    size='small'
                    inverted
                    style={{
                    fontSize: '12px',
                    color: '#cecfd4',
                    opacity: '0.9'
                    }}
                    header={
                    <div>
                        {r.expired && (
                        <div>
                            <FormattedMessage id='global.expiredProduct.tooltip' defaultMessage='Expired Product' />
                        </div>
                        )}
                        {productStatusText && <div>{productStatusText}</div>}
                    </div>
                    }
                    trigger={
                    <div>
                        <Warning className='title-icon' style={{ fontSize: '16px', color: '#f16844' }} />
                    </div>
                    } // <div> has to be there otherwise popup will be not shown
                />
                ) : null}
                {r?.rawData?.minPkg > r?.rawData?.pkgAvailable ? (
                <Popup
                    size='tiny'
                    position='top center'
                    inverted
                    style={{
                    fontSize: '12px',
                    color: '#cecfd4',
                    opacity: '0.9'
                    }}
                    header={
                    <div>
                        <FormattedMessage
                        id='inventory.isBelowMin'
                        defaultMessage='The available quantity is below the min quantity'
                        />
                    </div>
                    }
                    trigger={
                    <div>
                        <Warning className='title-icon' style={{ fontSize: '16px', color: '#f16844' }} />
                    </div>
                    } // <div> has to be there otherwise popup will be not shown
                />
                ) : null}
            </>
            }
        />
        ),
        packaging: (
        <>
            {`${r.packagingSize} ${r.packagingUnit} `}
            <CapitalizedText>{r.packagingType}</CapitalizedText>{' '}
        </>
        ),
        quantity: r.qtyPart && r.quantity ? <FormattedUnit unit={r.qtyPart} separator=' ' value={r.quantity} /> : 'N/A',
        condition: r.condition ? (
        <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
        ) : (
        <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
        ),
        fobPrice: r.grouped ? (
        r.fobPrice
        ) : (
        <StyledPopup
            content={
            <QuickEditPricingPopup
                handlechange={(values, index, focusInput) =>
                  handleChangePriceTiers(values, rIndex, index, focusInput, state, setState)
                }
                rawData={getSafe(() => state.rows[rIndex].rawData, '') || r.rawData}
                focusInput={state.focusInput}
            />
            }
            on='click'
            trigger={<FobPrice>{r.fobPrice}</FobPrice>}
            open={pricingEditOpenId === r.rawData.id}
            onOpen={() => setPricingEditOpenId(r.rawData.id)}
            onClose={() => setPricingEditOpenId(null)}
        />
        ),
        broadcast: (
        <div style={{ float: 'left' }}>
            <Popup
            id={r.id}
            position={rIndex === 0 ? 'bottom right' : 'top right'}
            trigger={
                <Checkbox
                data-test='my_inventory_broadcast_chckb'
                toggle
                defaultChecked={r.cfStatus.toLowerCase() === 'broadcasting' && isOfferValid}
                className={cn({
                    error:
                    r.cfStatus.toLowerCase() === 'incomplete' ||
                    r.cfStatus.toLowerCase() === 'unmapped' ||
                    r.cfStatus.toLowerCase() === 'unpublished'
                })}
                disabled={
                    r.cfStatus.toLowerCase() === 'incomplete' ||
                    r.cfStatus.toLowerCase() === 'unmapped' ||
                    r.cfStatus.toLowerCase() === 'unpublished' ||
                    r.cfStatus.toLowerCase() === 'n/a' ||
                    !isOfferValid ||
                    !!r.groupId
                }
                onChange={(e, data) => {
                    e.preventDefault()
                    try {
                    props.patchBroadcast(data.checked, r.id, r.cfStatus)
                    props.datagrid.updateRow(r.id, () => ({
                        ...r.rawData,
                        cfStatus: data.checked ? 'Broadcasting' : 'Not broadcasting'
                    }))
                    // Its necessary to render and see changes in MyListing when datagrid updated row
                    setState(prevState => ({ ...prevState, updatedRow: true }))
                    } catch (error) {
                    console.error(error)
                    }
                }}
                />
            }
            content={title}
            />
        </div>
        )
    }
  })
  setState(prevState => ({ ...prevState, rows: result }))
}

const handleChangePriceTiers = (values, rIndex, pIndex, focusInput, state, setState) => {
  let newRows = state.rows

  if (pIndex || pIndex === 0) {
    //pIndex means pricingTiers index and that row was changed. values are {}
    newRows[rIndex].rawData.pricingTiers[pIndex] = values
  } else {
    // it was added or removed row pricingTiers. values are []
    newRows[rIndex].rawData.pricingTiers = values
  }

  setState(prevState => ({ ...prevState, rows: newRows, focusInput: (pIndex || pIndex === 0) && focusInput ? focusInput : '' }))
}

const showMessage = (response, request = null, row, props, state, setState) => {
    const { toastManager, datagrid } = props
    response &&
    response.value &&
    response.value.productOfferStatuses &&
    response.value.productOfferStatuses.length &&
    response.value.productOfferStatuses.map(status => {
        if (!status.code) return
        if (status.code === 'GROUPED') {
        datagrid.updateRow(status.productOfferId, () => ({
            ...row,
            warehouse: { deliveryAddress: { cfName: row.warehouse.deliveryAddress.cfName } },
            parentOffer: status.virtualOfferId ? status.virtualOfferId : ''
        }))
        toastManager.add(
            generateToastMarkup(
            <FormattedMessage id={`success.title`} defaultMessage='Success' />,
            `${status.clientMessage}`
            ),
            {
            appearance: 'success'
            }
        )
        } else if (status.code === 'BROADCAST_RULE_CONFLICT') {
        setState(prevState => ({ ...prevState, open: true, clientMessage: status.clientMessage, request }))
        } else if (status.code === 'DETACHED') {
        datagrid.updateRow(status.productOfferId, () => ({
            ...row,
            warehouse: { deliveryAddress: { cfName: row.warehouse.deliveryAddress.cfName } },
            parentOffer: ''
        }))
        toastManager.add(
            generateToastMarkup(
            <FormattedMessage id={`success.title`} defaultMessage='Success' />,
            `${status.clientMessage}`
            ),
            {
            appearance: 'success'
            }
        )
        } else if (status.code === 'ERROR') {
        toastManager.add(
            generateToastMarkup(
            <FormattedMessage id={`error.title`} defaultMessage='Error' />,
            `${status.clientMessage}`
            ),
            {
            appearance: 'error'
            }
        )
        }
    })
}

/**
 * group offer
 * @category Inventory - My Listings
 * @method
 */
export const groupOffer = async (request, row, props, state, setState) => {
    const { groupOffers, datagrid } = props
    try {
    const response = await groupOffers(request)

    datagrid.updateRow(row.id, () => ({
        ...row,
        grouped: true,
        parentOffer: getSafe(() => response.value.productOfferStatuses[0].virtualOfferId, null)
    }))
    setState(prevState => ({ ...prevState, updatedRow: true }))

    showMessage(response, request, row, props, state, setState)
    } catch (error) {
    console.error(error)
    }
}

/**
 * Open ModalDetail on Price Book tab for custom price rules on specific product offer.
 * @category Inventory - My Listings
 * @method
 */
 export const tableRowClickedProductOffer = (row, modalProps, bool = true, indexTab = 3) => {
  const {
    isProductInfoOpen,
    closePopup,
    modalDetailTrigger
  } = modalProps

  if (isProductInfoOpen) closePopup()
  modalDetailTrigger(row, bool, indexTab)
}

/**
 * Bradcast is change or show modal for set up own custom price rules.
 * @category Inventory - My Listings
 * @method
 */
export const onClickBroadcast = (
  row,
  value,
  broadcastChange,
  datagrid,
  template = null,
  modalProps = null,
  updateWarehouse = false,
  dataType = ''
) => {
  switch (value) {
    case 'CUSTOM_RULES':
      modalProps && tableRowClickedProductOffer(row, modalProps)
      break
    default:
      if (value.indexOf('|') >= 0) {
        broadcastChange(row, value.substr(0, value.indexOf('|')), template, datagrid, updateWarehouse, dataType)
      } else {
        broadcastChange(row, value, template, datagrid, updateWarehouse, dataType)
      }
      break
  }
}

/**
 * get rows from datagrid in container
 * @category Inventory - My Listings
 * @method
 */
export const getMappedRows = datagrid => datagrid?.rows?.map(po => {
  const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)
  let fobPrice

  try {
    if (po.pricingTiers.length > 1)
      fobPrice = (
        <>
          {' '}
          <FormattedNumber
            minimumFractionDigits={3}
            maximumFractionDigits={3}
            style='currency'
            currency={currency}
            value={po.pricingTiers[po.pricingTiers.length - 1].pricePerUOM}
          />{' '}
          - <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[0].pricePerUOM} />{' '}
          {qtyPart && `/ ${qtyPart}`}{' '}
        </>
      )
    else
      fobPrice = (
        <>
          {' '}
          <FormattedNumber
            minimumFractionDigits={3}
            maximumFractionDigits={3}
            style='currency'
            currency={currency}
            value={getSafe(() => po.pricingTiers[0].pricePerUOM)}
          />{' '}
          {qtyPart && `/ ${qtyPart}`}{' '}
        </>
      )
  } catch (e) {
    console.error(e)
  }
  return {
    ...po,
    rawData: po,
    id: po.id,
    product: po.product,
    expired: po.lotExpirationDate ? moment().isAfter(po.lotExpirationDate) : false,
    productName: getSafe(() => po.companyProduct.intProductName),
    productNumber: getSafe(() => po.companyProduct.intProductCode, 'N/A'),
    echoName: getSafe(() => po.companyProduct.companyGenericProduct.name, ''),
    echoCode: getSafe(() => po.companyProduct.companyGenericProduct.code, 'Unmapped'),
    chemicalName: getSafe(() => po.product.casProduct.chemicalName, po?.companyProduct?.intProductName),
    warehouse: getSafe(() => po.warehouse.deliveryAddress.cfName, ''),
    productId: getSafe(() => po.product.casProduct.id, 0),
    available: po.pkgAvailable ? <FormattedNumber minimumFractionDigits={0} value={po.pkgAvailable} /> : 'N/A',
    packagingType: getSafe(() => po.companyProduct.packagingType.name, ''),
    packagingSize: getSafe(() => po.companyProduct.packagingSize, ''),
    //qtyPart ? `${po.product.packagingSize} ${qtyPart}` : 'N/A',
    packagingUnit: getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation, ''),
    qtyPart: qtyPart,
    quantity: getSafe(() => po.quantity, ''),
    cost: po.costPerUOM ? (
      <FormattedNumber
        minimumFractionDigits={3}
        maximumFractionDigits={3}
        style='currency'
        currency={currency}
        value={po.costPerUOM}
      />
    ) : (
      'N/A'
    ),
    pricingTiers: po.pricingTiers,
    //pricing: po.pricing,
    fobPrice,
    manufacturer: getSafe(() => po.companyProduct.companyGenericProduct.manufacturer.name, 'N/A'),
    broadcasted: po.broadcasted,
    // lotNumber: <ArrayToMultiple values={po.lots.map(d => (d.lotNumber))} />,
    cfStatus: getSafe(() => po.cfStatus, 'N/A'),
    minOrderQuantity: getSafe(() => po.minPkg, ''),
    splits: getSafe(() => po.splitPkg, ''),
    condition: getSafe(() => po.conforming, ''),
    grade: po.grades && po.grades.length ? <ArrayToFirstItem values={po.grades.map(d => d.name)} /> : '',
    origin: getSafe(() => po.origin.name, ''),
    form: getSafe(() => po.form.name, ''),
    assayString: <FormattedAssay min={po.assayMin} max={po.assayMax} />,
    mfgDate: po.lotManufacturedDate ? moment(po.lotManufacturedDate).format(getLocaleDateFormat()) : 'N/A',
    expDate: po.lotExpirationDate ? moment(po.lotExpirationDate).format(getLocaleDateFormat()) : 'N/A',
    allocatedPkg: po.pkgAllocated,
    // processingTimeDays: po.processingTimeDays,
    offerExpiration: po.validityDate ? moment(po.validityDate).format(getLocaleDateFormat()) : 'N/A',
    groupId: getSafe(() => po.parentOffer, ''),
    lotNumber: getSafe(() => po.lotNumber, ''),
    productStatus:
      po.companyProduct &&
      po.companyProduct.companyGenericProduct &&
      !po.companyProduct.companyGenericProduct.isPublished,
    productGroup: getSafe(() => po.companyProduct.companyGenericProduct.productGroup.name, null),
    tagsNames:
      po.companyProduct &&
      po.companyProduct.companyGenericProduct &&
      po.companyProduct.companyGenericProduct.productGroup &&
      po.companyProduct.companyGenericProduct.productGroup.tags &&
      po.companyProduct.companyGenericProduct.productGroup.tags.length
        ? po.companyProduct.companyGenericProduct.productGroup.tags.map(tag => tag.name)
        : []
  }
})