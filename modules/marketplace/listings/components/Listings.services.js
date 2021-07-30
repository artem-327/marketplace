import { FormattedNumber, FormattedMessage } from 'react-intl'
import moment from 'moment/moment'
import { Image, Popup } from 'semantic-ui-react'
import { Warning } from '@material-ui/icons'
import { debounce } from 'lodash'
// Components
import ActionCell from '../../../../components/table/ActionCell'
import { ArrayToFirstItem } from '../../../../components/formatted-messages/'
import { FormattedUnit, FormattedAssay } from '../../../../components/formatted-messages'
// Styles
import {
  CapitalizedText,
  CustomDiv,
} from '../../styles'
//Services
import { getLocationString, getSafe } from '../../../../utils/functions'
import { getLocaleDateFormat } from '../../../../components/date-format'
//Constants
import { currency } from '../../../../constants/index'

/**
 * Prepares datagrid rows object for a table in Marketplace.
 * @method
 * @param {Array<object, string>} rows Datagrid rows from POST /prodex/api/product-offers/broadcasted/datagrid/.
 * @returns {Array<object, string> | []} Returns rows object for a table in Marketplace.
 */
export const getDatagridRows = rows => {
  if (!rows?.length) return []
  return rows?.map(po => {
    const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)
    return {
      ...po,
      id: po.id + '_' + po.sellerId,
      rawData: po,
      expired: po.lotExpirationDate ? moment().isAfter(po.lotExpirationDate) : false,
      productGroupName: getSafe(() => po.companyProduct.companyGenericProduct.productGroup.name, ''),
      intProductName: getSafe(() => po.companyProduct.intProductName, ''),
      productNumber: getSafe(() => po.companyProduct.companyGenericProduct.code, 'Unmapped'),
      // merchant: getSafe(() => po.warehouse.warehouseName, ''),
      available: po.pkgAvailable ? <FormattedNumber minimumFractionDigits={0} value={po.pkgAvailable} /> : 'N/A',
      packagingType: getSafe(() => po.companyProduct.packagingType.name, ''),
      packagingUnit: getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation, ''),
      packagingSize: getSafe(() => po.companyProduct.packagingSize, ''),
      quantity: qtyPart ? <FormattedUnit unit={qtyPart} separator=' ' value={po.quantity} /> : 'N/A',
      fobPrice:
        po.pricingTiers.length > 1 ? (
          <>
            {' '}
            <FormattedNumber
              minimumFractionDigits={3}
              maximumFractionDigits={3}
              style='currency'
              currency={currency}
              value={po.pricingTiers[po.pricingTiers.length - 1].pricePerUOM}
            />{' '}
            -{' '}
            <FormattedNumber
              minimumFractionDigits={3}
              maximumFractionDigits={3}
              style='currency'
              currency={currency}
              value={po.pricingTiers[0].pricePerUOM}
            />{' '}
            {qtyPart && `/ ${qtyPart}`}{' '}
          </>
        ) : (
          <>
            {' '}
            <FormattedNumber
              minimumFractionDigits={3}
              maximumFractionDigits={3}
              style='currency'
              currency={currency}
              value={getSafe(() => po.pricingTiers[0].pricePerUOM, 0)}
            />{' '}
            {qtyPart && `/ ${qtyPart}`}{' '}
          </>
        ),
      manufacturer: getSafe(() => po.companyProduct.companyGenericProduct.manufacturer.name, 'N/A'),
      origin: getSafe(() => po.origin.name),
      expiration: po.lotExpirationDate ? moment(po.lotExpirationDate).format(getLocaleDateFormat()) : 'N/A',
      assay: <FormattedAssay min={po.assayMin} max={po.assayMax} />,
      condition: !getSafe(() => po.conforming),
      conditionNotes: getSafe(() => po.conditionNotes, false),
      form: getSafe(() => po.form.name),
      location: getLocationString(po),
      notes: getSafe(() => po.externalNotes, ''),
      association: po && po.ownerAssociations && getSafe(() => po.ownerAssociations.map(a => a.name), []),
      leadTime: getSafe(() => po.leadTime, 'N/A'),
      tagsNames: getSafe(() => po.companyProduct.companyGenericProduct.productGroup.tags.length, '')
        ? po.companyProduct.companyGenericProduct.productGroup.tags.map(tag => tag.name)
        : '',
      seller: (
        <div key={po?.id}>
          <Image
            verticalAlign='middle'
            style={{ width: '20px' }}
            size='mini'
            spaced={true}
            src={po?.owner?.avatarUrl}
          />

          <span>{po?.owner?.name}</span>
        </div>
      )
    }
  })
}

/**
 * Prepares Sellers dropdown options array for filter in Marketplace.
 * @method
 * @param {Array<object>} companies Array of companies returned from GET /api/companies/search.
 * @returns {Array<object> | []} Returns Sellers dropdown options array for filter in Marketplace.
 */
export const getCompaniesDropdown = companies => {
  const options = companies?.map(c => {
    const logo = c.avatarUrl || c.logoUrl

    const seller = (
      <div key={c.id} style={{ display: 'flex' }}>
        {logo ? (
          <Image
            verticalAlign='middle'
            style={{ width: '20px', margin: 'auto 10px auto 0' }}
            size='mini'
            spaced={true}
            src={logo}
          />
        ) : null
        }
        <div style={{ margin: 'auto 0' }}>{c.cfDisplayName}</div>
      </div>
    )

    return {
      text: seller,
      value: c.id,
      key: c.id,
      content: seller
    }
  })

  return [
    {
      text: (<FormattedMessage id='marketplace.allSellers' defaultMessage='All Sellers' />),
      value: 0,
      key: 0
    }
  ].concat(options)
}

/**
 * Returns columns of Listings Table
 * @category Marketplace - Listings
 * @method
 */
export const columns = [
  { name: 'productGroupName', disabled: true },
  { name: 'productNumber', disabled: true },
  {
    name: 'intProductName',
    title: (
      <FormattedMessage id='global.productName' defaultMessage='Product Name' />
    ),
    width: 430,
    sortPath: 'ProductOffer.companyProduct.intProductName',
    allowReordering: false
  },
  {
    name: 'seller',
    title: (
      <FormattedMessage id='sharedListings.detailRow.seller' defaultMessage='SELLER' />
    ),
    width: 140
  },
  {
    name: 'packaging',
    title: (
      <FormattedMessage id='marketplace.packaging' defaultMessage='Packaging' />
    ),
    width: 140
  },
  {
    name: 'available',
    title: (
      <FormattedMessage id='marketplace.available' defaultMessage='Avail PKGs' />
    ),
    width: 140,
    align: 'right',
    sortPath: 'ProductOffer.pkgAvailable'
  },
  {
    name: 'quantity',
    title: (
      <FormattedMessage id='marketplace.quantity' defaultMessage='Quantity' />
    ),
    width: 140,
    align: 'right',
    sortPath: 'ProductOffer.quantity'
  },
  {
    name: 'location',
    title: (
      <FormattedMessage id='marketplace.location' defaultMessage='Location' />
    ),
    width: 160
  },
  {
    name: 'fobPrice',
    title: (
      <FormattedMessage id='marketplace.fobPrice' defaultMessage='FOB Price' />
    ),
    width: 160,
    align: 'right',
    sortPath: 'ProductOffer.cfPricePerUOM'
  },
  {
    name: 'manufacturer',
    title: (
      <FormattedMessage id='marketplace.manufacturer' defaultMessage='Manufacturer' />
    ),
    width: 220,
    sortPath: 'ProductOffer.companyProduct.companyGenericProduct.manufacturer.name'
  },
  {
    name: 'origin',
    title: (
      <FormattedMessage id='marketplace.origin' defaultMessage='Origin' />
    ),
    width: 120,
    sortPath: 'ProductOffer.origin.name'
  },
  {
    name: 'expiration',
    title: (
      <FormattedMessage id='marketplace.expirationDate' defaultMessage='Expiration Date' />
    ),
    width: 120,
    sortPath: 'ProductOffer.lotExpirationDate'
  },
  {
    name: 'condition',
    title: (
      <FormattedMessage id='marketplace.condition' defaultMessage='Condition' />
    ),
    width: 100,
    sortPath: 'ProductOffer.condition.name'
  },
  {
    name: 'form',
    title: (
      <FormattedMessage id='marketplace.form' defaultMessage='Form' />
    ),
    width: 100,
    sortPath: 'ProductOffer.form.name'
  },
  {
    name: 'association',
    title: (
      <FormattedMessage id='marketplace.association' defaultMessage='Association' />
    ),
    width: 160
  },
  {
    name: 'notes',
    title: (
      <FormattedMessage id='marketplace.notes' defaultMessage='Notes' /> 
    ),
    width: 160
  },
  {
    name: 'leadTime',
    title: (
      <FormattedMessage id='marketplace.leadTime' defaultMessage='Lead Time (days)' />
    ),
    width: 160
  }
]

/**
 * To make saved filter like datagrid filter type
 * @category Marketplace - Listings
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
    pageSize: 50
  }
}

const handleFiltersValue = debounce((filter, props) => {
  const { datagrid } = props
  datagrid.setSearch(filter, true, 'pageFilters')
}, 300)

/**
 * Search by names and tags changed
 * @category Marketplace - Listings
 * @method
 */
export const SearchByNamesAndTagsChanged = (data, props, state, setState) => {
  setState({
    ...state,
    filterValues: {
      ...state.filterValues,
      SearchByNamesAndTags: data
    }
  })
  props.handleVariableSave('tableHandlersFiltersListings', { ...state.filterValues, SearchByNamesAndTags: data })
  const filter = {
    SearchByNamesAndTags: data,
    ...(!!data && {
      ...data.filters
    })
  }
  handleFiltersValue(filter, props)
}

/**
 * Search by seller change
 * @category Marketplace - Listings
 * @method
 */
export const handleSellerChange = (value, props, state) => {
  const val = value === '' ? 0 : value
  const selectedSellerOption = props.searchedCompaniesDropdown.find(el => el.value === val)
  props.saveSellerOption(selectedSellerOption)
  handleFiltersValue({
    ...state.filterValues,
    ...(!!state.filterValues.SearchByNamesAndTags && {
      ...state.filterValues.SearchByNamesAndTags.filters
    })
  }, props)
}

export const handleSearchSellerChange = debounce((text, props) => {
  props.searchCompanies(text)
}, 300)

/**
 * Return rows of table
 * @category Marketplace - Listings
 * @method
 */
export const getRows = (props, state, setState) => {
  const {
    rows,
    intl: { formatMessage }
  } = props

  return rows.map(r => ({
    ...r,
    clsName: r.condition ? 'non-conforming' : '',
    intProductName: (
      <ActionCell
        row={r}
        getActions={() => getActions(r, props, state, setState)}
        content={r.intProductName}
        onContentClick={e => {
          e.stopPropagation()
          e.preventDefault()
          checkBuyAttempt(r, props, state, setState)
        }}
        rightAlignedContent={
          r.expired || r.condition ? (
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
                  {r.condition && (
                    <div>
                      <FormattedMessage
                        id='global.nonConforming.tooltip'
                        defaultMessage='This is a non-conforming product.'
                      />
                    </div>
                  )}
                </div>
              }
              trigger={
                <div>
                  <Warning className='title-icon' style={{ fontSize: '16px', color: '#f16844' }} />
                </div>
              } // <div> has to be there otherwise popup will be not shown
            />
          ) : null
        }
      />
    ),
    condition: r.condition ? (
      <Popup
        content={r.conditionNotes}
        trigger={
          <div className='dashed-underline'>
            <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
          </div>
        } // <div> has to be there otherwise popup will be not shown
      />
    ) : (
      <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
    ),
    packaging: (
      <>
        {`${r.packagingSize} ${r.packagingUnit} `}
        <CapitalizedText>{r.packagingType}</CapitalizedText>{' '}
      </>
    ),
    notes: r.notes ? (
      <Popup
        content={r.notes}
        trigger={<CustomDiv>{r.notes}</CustomDiv>} // <div> has to be there otherwise popup will be not shown
      />
    ) : null,
    association: <ArrayToFirstItem values={r.association} rowItems={1} />
  }))
}

export const tableRowClicked = (props, clickedId, sellerId = null, isHoldRequest = false, openInfo = false) => {
  const poId = parseInt(clickedId.split('_')[0])
  const { getProductOffer, sidebarChanged, isProductInfoOpen, closePopup } = props
  getProductOffer(poId, sellerId)

  if (isProductInfoOpen) closePopup()
  sidebarChanged({ isOpen: true, id: poId, quantity: 1, isHoldRequest: isHoldRequest, openInfo: openInfo })
}

const checkBuyAttempt = (row, props, state, setState) => {
  let skipBuy = false
  const elements = getSafe(() => row.companyProduct.companyGenericProduct.elements, [])
  const hasDea = elements.some(el => getSafe(() => el.casProduct.deaListII, false))
  const hasDhs = elements.some(el => getSafe(() => el.casProduct.cfChemicalOfInterest, false))

  if (hasDea) {
    setState({ ...state, buyAttemptHasDea: row })
    skipBuy = true
  }
  if (hasDhs) {
    setState({ ...state, buyAttemptHasDhs: row })
    skipBuy = true
  }

  if (!props.buyEligible) {
    setState({ ...state, viewOnlyPopupOpen: true })
    skipBuy = true
  }

  if (skipBuy) return
  tableRowClicked(props, row.id, row?.sellerId)
}

const getActions = (row, props, state, setState) => {
  const {
    openPopup,
    buyEligible,
    intl: { formatMessage }
  } = props
  const rowActions = []
  const buttonInfo = {
    text: formatMessage({
      id: 'marketplace.info',
      defaultMessage: 'Info'
    }),
    callback: () => tableRowClicked(props, row.id, row?.sellerId, false, true)
  }
  const buttonRequestHold = {
    text: formatMessage({
      id: 'hold.requestHold',
      defaultMessage: 'Request Hold'
    }),
    callback: () => tableRowClicked(props, row.id, row?.sellerId, true)
  }
  const buttonBuy = {
    text: formatMessage({
      id: 'marketplace.buy',
      defaultMessage: 'Buy Product Offer'
    }),
    callback: () => checkBuyAttempt(row, props, state, setState)
  }
  const buttonMakeAnOffer = {
    text: formatMessage({
      id: 'marketplace.makeAnOffer',
      defaultMessage: 'Make an Offer'
    }),
    callback: () => {
      if (!buyEligible) {
        setState({ ...state, viewOnlyPopupOpen: true })
        return
      }
      openPopup(row.rawData)
    }
  }

  /* DT-293 temporary disabled rowActions.push(buttonRequestHold) */
  rowActions.push(buttonInfo)
  rowActions.push(buttonBuy)
  !row?.brokeredOffer && row?.acceptBids && rowActions.push(buttonMakeAnOffer)

  return rowActions
}
