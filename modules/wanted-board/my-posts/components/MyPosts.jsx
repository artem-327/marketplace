import { useEffect, useState } from 'react'
import { Container, Button, Input } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { debounce } from 'lodash'
import ProdexGrid from '../../../../components/table'
import { CustomRowDiv } from '../../styles'
import ActionCell from '../../../../components/table/ActionCell'
import ColumnSettingButton from '../../../../components/table/ColumnSettingButton'
import confirm from '../../../../components/Confirmable/confirm'

import ModalDetailContainer from './ModalDetail/ModalDetailContainer'

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
        <FormattedMessage id='wantedBoard.productName' defaultMessage='PRODUCT NAME' />
      ),
      width: 500,
      allowReordering: false
    },
    {
      name: 'quantity',
      title: (
        <FormattedMessage id='wantedBoard.quantity' defaultMessage='QTY.NEEDED' />
      ),
      width: 200
    },
    {
      name: 'shippingLocation',
      title: (
        <FormattedMessage id='wantedBoard.shippingLocation' defaultMessage='SHIPPING LOCATION' />
      ),
      width: 200
    },
    {
      name: 'conforming',
      title: (
        <FormattedMessage id='wantedBoard.conforming' defaultMessage='CONFORMING' />
      ),
      width: 200
    },
    {
      name: 'postExpiry',
      title: (
        <FormattedMessage id='wantedBoard.postExpiry' defaultMessage='POST EXPIRY' />
      ),
      width: 200
    }
  ]

  useEffect(() => {
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
          try {
            props.openSeeListingModal(row)
          } catch (e) {
            console.error(e)
          }
        }
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
      tableHandlersFiltersListings,
      intl: { formatMessage },
      openAddEditModal
    } = props

    return (
      <>
        {openedAddEditModal && <ModalDetailContainer inventoryGrid={datagrid} />}
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
