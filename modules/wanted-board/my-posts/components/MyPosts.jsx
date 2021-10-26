import { useEffect, useState } from 'react'
import Router from 'next/router'
import { Container, Button, Input } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { debounce } from 'lodash'
import ProdexGrid from '../../../../components/table'
import { CustomRowDiv } from '../../styles'
import ActionCell from '../../../../components/table/ActionCell'
import ColumnSettingButton from '../../../../components/table/ColumnSettingButton'
import confirm from '../../../../components/Confirmable/confirm'
import moment from 'moment'
import { getLocaleDateFormat } from '../../../../components/date-format'
import ModalDetailContainer from './ModalDetail/ModalDetailContainer'
import SeeListings from './SeeListings/index'

const MyPosts = props => {

  const [state, setState] = useState({
    filterValue: {
      searchInput: ''
    }
  })

  const columns = [
    {
      name: 'productName',
      title: (
        <FormattedMessage id='wantedBoard.productName' defaultMessage='Product Name' />
      ),
      width: 500,
      allowReordering: false
    },
    {
      name: 'quantity',
      title: (
        <FormattedMessage id='wantedBoard.quantityNeeded' defaultMessage='Qty.Needed' />
      ),
      width: 200
    },
    {
      name: 'shippingLocation',
      title: (
        <FormattedMessage id='wantedBoard.shippingLocation' defaultMessage='Shipping Location' />
      ),
      width: 200
    },
    {
      name: 'conforming',
      title: (
        <FormattedMessage id='wantedBoard.conforming' defaultMessage='Confirming' />
      ),
      width: 200
    },
    {
      name: 'postExpiry',
      title: (
        <FormattedMessage id='wantedBoard.postExpiry' defaultMessage='Post Expiry' />
      ),
      width: 200
    }
  ]

  useEffect(async () => {
    const { myPostsFilters } = props

    if (myPostsFilters) {
      setState(myPostsFilters)
      const filter = myPostsFilters.filterValue
      if (filter) {
        props.datagrid.clear()
        handleFiltersValue(filter, props)
      }
    } else {
      const filter = state.filterValue
      if (filter) {
        props.datagrid.clear()
        handleFiltersValue(filter, props)
      }
    }

    let openId = Router.router?.query?.id ? parseInt(Router.router?.query?.id) : 0
    openId = openId && !isNaN(openId) ? openId : 0
    if (openId) {
      try {
        const { value } = await props.getWantedBoardOwn(openId)
        if (value?.data?.length === 1)
        {
          const row = value.data[0]
          let province = row?.deliveryCountry?.hasProvinces ? row?.deliveryProvince?.name : null
          let country = row?.deliveryCountry?.name
          const payload = {
            id: row.id,
            rawData: row,
            productName: row?.productSearchPattern || row?.element?.productGroup?.name || row?.element?.casProduct?.name || row?.element?.casProduct?.casIndexName,
            quantity: `${row?.quantity} ${row?.unit?.nameAbbreviation}`,
            shippingLocation: province ? province + ", " + country : country ? country : "",
            conforming: row?.conforming ? 'Yes' : 'No',
            postExpiry: moment(row.expiresAt).format(getLocaleDateFormat())
          }
          props.openAddEditModal(payload)
        }
      } catch (e) {
        console.error(e)
      }
    }

  }, [])

  const handleFilterChangeInputSearch = (data, props, state, setState) => {
    const filter = {
      ...state.filterValue,
      [data.name]: data.value
    }
    setState({ ...state, filterValue: filter })
    props.handleVariableSave('myPostsFilters', { ...state, filterValue: filter })
    handleFiltersValue(filter, props)
  }

  const handleFiltersValue = debounce((filter, props) => {
    const { datagrid } = props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  const getActions = () => {
    const { intl,datagrid } = props
    let { formatMessage } = intl
    return [
      {
        text: formatMessage({
          id: 'wantedBoard.myPostEdit',
          defaultMessage: 'Edit'
        }),
        callback: async row => {
          try {
            props.openAddEditModal(row)
          } catch (e) {
            console.error(e)
          }
        }
      },
      {
        text: formatMessage({
          id: 'wantedBoard.myPostDelete',
          defaultMessage: 'Delete'
        }),
        callback: async row => {
          confirm(
            formatMessage({
              id: 'wantedBoard.confirm.deletePost.Header',
              defaultMessage: 'Delete post'
            }),
            formatMessage(
              {
                id: 'confirm.deletePost.content',
                defaultMessage: `Do you really want to delete '${row.productName}' post?`
              },
              { name: row.productName }
            )
          ).then(async () => {
            try {
              await props.deleteWantedBoard(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
        }
      },
      {
        text: formatMessage({
          id: 'wantedBoard.mypostSeeListings',
          defaultMessage: 'See Listings'
        }),
        callback: async row => {
          if (row?.rawData?.submittedProductOffers?.length) {
            await props.handleVariableSave('tableHandlersFiltersListings', {
              SearchByNamesAndTags: null,
              wantedBoardRequestIds: row.rawData.submittedProductOffers
            })
            Router.push('/marketplace/listings')
          }
        },
        hidden: row => !row?.rawData?.submittedProductOffers?.length
      }
    ]
  }

  const getRows = rows => {
    return rows.map(r => {
      return {
        ...r,
        productName: <ActionCell row={r} getActions={getActions} content={r.productName} />
      }
    })
  }

  const renderContent = () => {
    const {
      datagrid,
      rows,
      openedAddEditModal,
      intl: { formatMessage },
      openAddEditModal,
      openedSeeListingModal,
      editID,
      loading
    } = props

    return (
      <>
        {openedAddEditModal && <ModalDetailContainer inventoryGrid={datagrid} />}
        {openedSeeListingModal && <SeeListings id={editID} />}
        <div style={{ padding: '10px 0' }}>
          <CustomRowDiv>
            <div>
              <div className='column' style={{ width: '340px' }}>
                <Input
                  style={{ width: '370px' }}
                  icon='search'
                  name='searchInput'
                  value={state.filterValue.searchInput}
                  placeholder={formatMessage({
                    id: 'settings.tables.products.search',
                    defaultMessage: 'Search product by name, code'
                  })}
                  onChange={(e, data) => handleFilterChangeInputSearch(data, props, state, setState)}
                />
              </div>
            </div>
            <div>
              <div className='column'>
                <Button
                  className='light'
                  size='large'
                  primary
                  onClick={ () => openAddEditModal() }
                  data-test='my_inventory_import_btn'>
                  {formatMessage({
                    id: 'wantedBoard.AddWantedButton',
                    defaultMessage: 'Add Wanted'
                  })}
                  
                </Button>
              </div>
              <ColumnSettingButton divide={true} />
            </div>
          </CustomRowDiv>
        </div>
        <div className='flex stretched listings-wrapper' style={{ padding: '10px 0 20px 0' }}>
          <ProdexGrid
            tableName={'wanted_board_listings_grid'}
            {...datagrid.tableProps}
            rows={getRows(rows)}
            columns={columns}
            rowSelection={false}
            showSelectionColumn={false}
            loading={datagrid.tableProps.loading || loading}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <Container fluid style={{ padding: '10px 30px 0 30px' }} className='flex stretched'>
        {renderContent()}
      </Container>
    </>
  )
}

export default injectIntl(MyPosts)
