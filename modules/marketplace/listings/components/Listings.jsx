import { useEffect, useState } from 'react'
import { Container, Button, Icon } from 'semantic-ui-react'
import { Sliders } from 'react-feather'
import Router from 'next/router'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
// Components
import ProdexGrid from '../../../../components/table'
import ColumnSettingButton from '../../../../components/table/ColumnSettingButton'
import AddCart from '../../../../components/AddCart'
import FilterTags from '../../../filter/components/FitlerTags'
import Tutorial from '../../../tutorial/Tutorial'
import SearchByNamesAndTags from '../../../search'
import MakeOfferPopup from './MakeOfferPopupContainer'
import ViewOnlyPopup from './ConfirmationPopups/ViewOnlyPopup'
import ViewOnlyRegisterPopup from './ConfirmationPopups/ViewOnlyRegisterPopup'
import { Filter } from '../../../filter'
import { CustomRowDiv } from '../../../inventory/styles'
import DeaPopup from './ConfirmationPopups/DeaPopup'
import DhsPopup from './ConfirmationPopups/DhsPopup'
// Services
import { usePrevious } from '../../../../hooks'
import { getSafe } from '../../../../utils/functions'
import {
  columns,
  toDatagridFilter,
  SearchByNamesAndTagsChanged,
  wantedBoardRequestIdCleared,
  handleSellerChange,
  handleSearchSellerChange,
  tableRowClicked,
  getRows
} from './Listings.services'
// Styles
import {
  defaultHiddenColumns,
  CustomSearchNameTags,
  FiltersRow,
  FlexContainerSmall,
  DropdownStyled
} from '../../styles'
import { WiderTooltip, FilterTag } from '../../../filter/constants/layout'

/**
 * Listings Component
 * @category Marketplace - Listings
 * @components
 */
const Listings = props => {
  const [state, setState] = useState({
    filterValues: {
      SearchByNamesAndTags: null,
      wantedBoardRequestIds: []
    },
    viewOnlyRegisterPopupOpen: false,
    viewOnlyPopupOpen: false,
    buyAttemptHasDeaI: null,
    buyAttemptHasDeaII: null,
    buyAttemptHasDhs: null,
    openFilterPopup: false
  })

  useEffect(() => {
    const { tableHandlersFiltersListings, advancedFilters, datagrid, applyDatagridFilter } = props

    if (tableHandlersFiltersListings) {
      setState({ ...state, filterValues: tableHandlersFiltersListings })
      const filter = {
        ...tableHandlersFiltersListings,
        ...(!!tableHandlersFiltersListings.SearchByNamesAndTags && {
          ...tableHandlersFiltersListings.SearchByNamesAndTags.filters
        })
      }
      datagrid.setSearch(filter, !advancedFilters.filters, 'pageFilters')
    } else {
      datagrid.setSearch(state.filterValues, !advancedFilters.filters, 'pageFilters')
    }

    if (advancedFilters.filters) {
      let datagridFilter = toDatagridFilter(advancedFilters)
      applyDatagridFilter(datagridFilter, true)
    }

    return () => {
      const { sidebarChanged } = props
      let { isOpen, isHoldRequest } = props.sidebar
      if (isOpen || isHoldRequest) sidebarChanged({ isHoldRequest: false, isOpen: false })
    }
  }, [])

  const prevDatagridFilterUpdate = usePrevious(props.datagridFilterUpdate)

  useEffect(() => {
    const { datagridFilterReload, datagridFilter, datagrid } = props
    if (typeof prevDatagridFilterUpdate !== 'undefined') {
      datagrid.setFilter(datagridFilter, datagridFilterReload, 'marketplace')
    }
  }, [props.datagridFilterUpdate])

  const {
    datagrid,
    intl,
    sidebar: { openInfo },
    tableHandlersFiltersListings,
    isOpenPopup,
    buyEligible,
    sellEligible,
    selectedSellerOption,
    searchedCompaniesDropdown,
    searchedCompaniesLoading,
    regulatoryDeaListAuthorized,
    regulatoryDhsCoiAuthorized,
    isCompanyAdmin
  } = props
  const {
    openFilterPopup,
    viewOnlyRegisterPopupOpen,
    viewOnlyPopupOpen,
    buyAttemptHasDeaI,
    buyAttemptHasDeaII,
    buyAttemptHasDhs
  } = state
  let { formatMessage } = intl
  const rows = getRows(props, state, setState)

  let searchedCompaniesOptions = searchedCompaniesDropdown.slice()
  if (selectedSellerOption) {
    if (!searchedCompaniesOptions.some(el => el.key === selectedSellerOption.key)) {
      searchedCompaniesOptions.push(selectedSellerOption)
    }
  }
  const seller = selectedSellerOption ? selectedSellerOption.value : 0

  return (
    <Container fluid style={{ padding: '10px 25px' }} className='flex stretched'>
      {<Tutorial marginMarketplace isTutorial={false} isBusinessVerification={true} />}
      <FlexContainerSmall>
        <CustomRowDiv>
          <div>
            <div className='column'>
              <CustomSearchNameTags>
                <SearchByNamesAndTags
                  onChange={(data) => SearchByNamesAndTagsChanged(data, props, state, setState)}
                  initFilterState={getSafe(() => tableHandlersFiltersListings.SearchByNamesAndTags, null)}
                  filterApply={false}
                  filterType='marketplace'
                />
              </CustomSearchNameTags>
            </div>
            <div className='column'>
              <DropdownStyled
                style={{ width: '210px' }}
                name='seller'
                selection
                clearable={seller !== 0}
                search={options => options}
                value={seller}
                options={searchedCompaniesOptions}
                loading={searchedCompaniesLoading}
                onChange={(e, { value }) => handleSellerChange(value, props, state)}
                onClick={() => {handleSearchSellerChange('', props)}}
                onSearchChange={(e, { searchQuery }) => handleSearchSellerChange(searchQuery, props)}
              />
            </div>
            <div className='column'>
              <Button
                className='light'
                size='large'
                primary
                onClick={() => setState({ ...state, openFilterPopup: true })}
                data-test='my_inventory_advanced_filters_btn'>
                <Sliders />
                {formatMessage({
                  id: 'global.filters',
                  defaultMessage: 'Filters'
                })}
              </Button>
            </div>
            <FiltersRow>
              {!!props.tableHandlersFiltersListings?.wantedBoardRequestIds?.length && (
                <WiderTooltip
                  position='bottom center'
                  trigger={
                    <FilterTag>
                      <div className='description'>
                        <FormattedMessage id='marketplace.wantedBoardBids' defaultMessage='Wanted Board Bids' />
                      </div>
                      <Icon
                        name='delete'
                        onClick={() => wantedBoardRequestIdCleared(props, state, setState)}
                        data-test='marketplace_wanted_board_request_remove_filter'
                      />
                    </FilterTag>
                  }>
                  <div>
                    <FormattedMessage
                      id='marketplace.wantedBoardBidsDescription'
                      defaultMessage='Product Offers related to Wanted Board Bids'
                    />
                  </div>
                </WiderTooltip>
              )}
              <FilterTags filterType='marketplace' datagrid={datagrid} />
            </FiltersRow>
          </div>

          <ColumnSettingButton />
        </CustomRowDiv>
      </FlexContainerSmall>

      <div className='flex stretched marketplace-wrapper' style={{ padding: '10px 5px' }}>
        <ProdexGrid
          defaultHiddenColumns={defaultHiddenColumns}
          tableName='marketplace_listings_grid'
          {...datagrid.tableProps}
          rows={rows}
          estimatedRowHeight={55}
          columns={columns}
          groupBy={['productNumber']}
          getChildGroups={rows =>
            _(rows)
              .groupBy('productGroupName')
              .map(v => ({
                key: `${v[0].productGroupName}_${v[0].productNumber}_${v[0].companyProduct.id}_${v[0].tagsNames}`,
                groupLength: v.length,
                childRows: v
              }))
              .value()
          }
          renderGroupLabel={
            ({ row: { value }, groupLength }) => null
          }
          data-test='marketplace_listings_row_action'
        />
      </div>
      <AddCart openInfo={openInfo} buyEnabled={buyEligible} />
      {openFilterPopup && <Filter onClose={() => setState({ ...state, openFilterPopup: false })} />}
      {isOpenPopup && <MakeOfferPopup />}
      {viewOnlyPopupOpen && !viewOnlyRegisterPopupOpen && !(sellEligible && buyEligible) && (
        <ViewOnlyPopup
          onCancel={() => setState({
            ...state,
            viewOnlyPopupOpen: false,
            buyAttemptHasDhs: null,
            buyAttemptHasDeaI: null,
            buyAttemptHasDeaII: null
          })}
        />
      )}
      {viewOnlyRegisterPopupOpen && (
        <ViewOnlyRegisterPopup
          header={<FormattedMessage id='marketplace.viewOnly' defaultMessage='View Only' />}
          subHeader={<FormattedMessage id='marketplace.companyNotRegistered' defaultMessage='Company not registered' />}
          description={
            <FormattedMessage
              id='marketplace.companyNotRegisteredDescription'
              defaultMessage='To ensure a safe and secure marketplace for our network we require each company to complete registration before making any transactions. To complete your order your company must finish business registration.'
            />
          }
          onCancel={() => setState({ ...state, viewOnlyRegisterPopupOpen: false })}
          onButtonClick={() => {
            setState({
              ...state,
              viewOnlyRegisterPopupOpen: false,
              viewOnlyPopupOpen: false,
              buyAttemptHasDhs: null,
              buyAttemptHasDeaI: null,
              buyAttemptHasDeaII: null
            })
            if (isCompanyAdmin) Router.push('/onboarding')
          }}
          buttonText={
            isCompanyAdmin
              ? (<FormattedMessage id='marketplace.register' defaultMessage='Register' />)
              : (<FormattedMessage id='marketplace.keepBrowsing' defaultMessage='Keep Browsing' />)
          }
        />
      )}
      {(buyAttemptHasDeaI || buyAttemptHasDeaII) && !buyAttemptHasDhs && !viewOnlyPopupOpen && !viewOnlyRegisterPopupOpen &&
        <DeaPopup
          deaListIIType={!buyAttemptHasDeaI}
          permissionsToBuy={regulatoryDeaListAuthorized}
          onCancel={() => setState({ ...state, buyAttemptHasDeaI: null, buyAttemptHasDeaII: null })}
          onAccept={() => {
            tableRowClicked(
              props,
              buyAttemptHasDeaI ? buyAttemptHasDeaI.id : buyAttemptHasDeaII.id,
              buyAttemptHasDeaI ? buyAttemptHasDeaI?.sellerId : buyAttemptHasDeaII?.sellerId
            )
            buyAttemptHasDeaI
              ? setState({ ...state, buyAttemptHasDeaI: null })
              : setState({ ...state, buyAttemptHasDeaII: null })
          }}
        />
      }
      {buyAttemptHasDhs && !viewOnlyPopupOpen && !viewOnlyRegisterPopupOpen &&
        <DhsPopup
          permissionsToBuy={regulatoryDhsCoiAuthorized}
          onCancel={() => setState({
            ...state,
            buyAttemptHasDhs: null,
            buyAttemptHasDeaI: null,
            buyAttemptHasDeaII: null
          })}
          onAccept={() => {
            if (buyAttemptHasDeaI || buyAttemptHasDeaII) {
              setState({ ...state, buyAttemptHasDhs: null })
            } else {
              tableRowClicked(props, buyAttemptHasDhs.id, buyAttemptHasDhs?.sellerId)
              setState({ ...state, buyAttemptHasDhs: null })
            }
          }}
        />
      }
    </Container>
  )
}

Listings.propTypes = {
  tableHandlersFiltersListings: PropTypes.object,
  advancedFilters: PropTypes.object,
  datagrid: PropTypes.object,
  intl: PropTypes.object,
  sidebar: PropTypes.object,
  datagridFilter: PropTypes.object,
  selectedSellerOption: PropTypes.object,
  datagridFilterUpdate: PropTypes.bool,
  datagridFilterReload: PropTypes.bool,
  isOpenPopup: PropTypes.bool,
  buyEligible: PropTypes.bool,
  sellEligible: PropTypes.bool,
  searchedCompaniesLoading: PropTypes.bool,
  isProductInfoOpen: PropTypes.bool,
  searchedCompaniesDropdown: PropTypes.array,
  rows: PropTypes.array,
  applyDatagridFilter: PropTypes.func,
  sidebarChanged: PropTypes.func,
  handleVariableSave: PropTypes.func,
  saveSellerOption: PropTypes.func,
  searchCompanies: PropTypes.func,
  getProductOffer: PropTypes.func,
  closePopup: PropTypes.func,
  openPopup: PropTypes.func,
  regulatoryDeaListAuthorized: PropTypes.bool,
  regulatoryDhsCoiAuthorized: PropTypes.bool
}

Listings.defaultProps = {
  tableHandlersFiltersListings: {},
  advancedFilters: {},
  datagrid: {},
  intl: {},
  sidebar: {},
  datagridFilter: {},
  selectedSellerOption: {},
  datagridFilterUpdate: false,
  datagridFilterReload: false,
  isOpenPopup: false,
  buyEligible: false,
  sellEligible: false,
  searchedCompaniesLoading: false,
  isProductInfoOpen: false,
  searchedCompaniesDropdown: [],
  rows: [],
  applyDatagridFilter: () => {},
  sidebarChanged: () => {},
  handleVariableSave: () => {},
  saveSellerOption: () => {},
  searchCompanies: () => {},
  getProductOffer: () => {},
  closePopup: () => {},
  openPopup: () => {},
  regulatoryDeaListAuthorized: false,
  regulatoryDhsCoiAuthorized: false
}

export default injectIntl(Listings)
