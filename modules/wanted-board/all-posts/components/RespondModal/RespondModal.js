import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../../actions'
import { openGlobalAddForm } from '../../../../layout/actions'
import {
  Modal,
  Button,
  Grid,
  GridRow,
  GridColumn,
  Dimmer,
  Loader,
  Input
} from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withDatagrid } from '../../../../datagrid'
import ProdexTable from '../../../../../components/table'
import ErrorFocus from '../../../../../components/error-focus'
import {
  columns,
  getRows,
  getMappedRows,
  handleFilterChangeInputSearch
} from './RespondModal.service'

import { DivPopupTableHandler } from '../../../styles'

const ModalContent = styled(Modal.Content)`
  padding: 1.5rem !important;
  margin-bottom: 10px !important;
`

const LeftColumn = styled(GridColumn)`
  padding-left: 1.5rem !important;
  flex-direction: inherit !important;
  display: flex !important;
`

const RightColumn = styled(GridColumn)`
  padding-right: 1.5rem !important;
`

const ToggleForm = styled(Form)`
  opacity: ${props => (props.hidden ? 0 : 1)};
`

const SubmitButton = styled(Button)`
  background-color: #2599d5 !important;
  color: #ffffff !important;
`

const RespondModal = props => {
  const [searchInput, setSearchInput] = useState('')
  const [state, setState] = useState({
    select: '',
    nextSubmit: false,
    inputRows: 0,
    selectedRow: { id: '' },
    rows: []
  })

  const [localDataState, setLocalDataState] = useState(props)
  const [submitOffer, setSubmitOffer] = useState({
    productOffers: [],
    wantedBoardRequest: false,
  })

  const updateProductOfferArray = (rows) => {
    let productOfferArray = [];
    for (const row of rows) {
      let { submittedBids } = row
      submittedBids = submittedBids[0]
      if (submittedBids) {
        const { productOfferId } = submittedBids
        productOfferArray = [...productOfferArray, productOfferId]
      }
    }
    return productOfferArray;
  }

  useEffect(() => {
    const { popupValues, datagrid, createdProductOffer } = props

    const productSearchPattern = createdProductOffer
      ? createdProductOffer.companyProduct.intProductName
      : popupValues.rawData.productSearchPattern

    setSearchInput(productSearchPattern)
    const filter = {
      searchInput: productSearchPattern
    }
    datagrid.setSearch(filter, true, 'modalFilters')
    const { rows } = datagrid

    let productOfferArray = updateProductOfferArray(rows);
    setSubmitOffer({
      ...submitOffer,
      productOffers: productOfferArray
    })
  }, [])

  const {
    intl: { formatMessage },
    datagrid,
    purchaseRequestPending,
    updatingDatagrid,
    closeRespondModal,
    openGlobalAddForm,
    postNewWantedBoardBids,
    postUpdatedWantedBoardBids,
    createdProductOffer
  } = props

  useEffect(() => {
    setLocalDataState(props)
    // getRows(getMappedRows(props), props, state, setState);
    getRows(getMappedRows(
      localDataState,
      localDeleteWantedBoardBids,
      localPostNewWantedBoardBids
    ), props, state, setState);

    const { rows } = datagrid

    let productOfferArray = updateProductOfferArray(rows);
    setSubmitOffer({
      ...submitOffer,
      productOffers: productOfferArray
    })
  }, [datagrid])

  const localPostNewWantedBoardBids = (value) => {
    const { key, productOffer, wantedBoardRequest } = value
    let changeData = localDataState;
    
    let { rows } = datagrid;
    rows[key].submittedBids = [
      {
        productOfferId: productOffer,
        wantedBoardDirectBidId: wantedBoardRequest,
      }
    ]
    changeData.datagrid.rows = rows
    setLocalDataState(changeData)
    getRows(getMappedRows(
      changeData,
      localDeleteWantedBoardBids,
      localPostNewWantedBoardBids
    ), props, state, setState);

    let productOfferArray = updateProductOfferArray(rows);
    setSubmitOffer({
      wantedBoardRequest,
      productOffers: productOfferArray
    })
  }

  const localDeleteWantedBoardBids = (wantedBoardRequest, key) => {
    let changeData = localDataState
    let { rows } = datagrid
    rows[key].submittedBids = []
    changeData.datagrid.rows = rows
    setLocalDataState(changeData)
    getRows(getMappedRows(
      changeData,
      localDeleteWantedBoardBids,
      localPostNewWantedBoardBids
    ), props, state, setState)

    let productOfferArray = updateProductOfferArray(rows);
    setSubmitOffer({
      wantedBoardRequest,
      productOffers: productOfferArray
    })
  }

  const submitOffers = async () => {
    if (submitOffer.wantedBoardRequest) {
      datagrid.setLoading(true)
      await postUpdatedWantedBoardBids(submitOffer)
      datagrid.loadData()
      setSubmitOffer({
        ...submitOffer,
        wantedBoardRequest: false
      })
    }
  }
  return (
    <>
      <ToggleForm
        validationSchema={()=>{}}
        validateOnChange
        enableReinitialize
        initialValues=''
        render={(formikProps) => {

          return (
            <>
              <Modal closeIcon onClose={closeRespondModal} open={true} size='large'>
                <Modal.Header>
                  <FormattedMessage id='wantedBoard.productRespondHeader' defaultMessage='Respond' />
                </Modal.Header>
                <DivPopupTableHandler>
                  <Input
                    style={{ width: 340 }}
                    name='searchInput'
                    icon='search'
                    value={searchInput}
                    placeholder={formatMessage({
                      id: 'wantedBoard.searchByProductName',
                      defaultMessage: 'Search by product name...'
                    })}
                    onChange={(e, { value }) => handleFilterChangeInputSearch(value, props, searchInput, setSearchInput)}
                  />
                </DivPopupTableHandler>
                <ModalContent scrolling={false} style={{height: 500}}>
                  <div className='flex stretched wanted-board-wrapper listings-wrapper' style={{padding: '0px 20px', height: '100%'}}>
                    <ProdexTable
                      {...datagrid.tableProps}
                      tableName='wanted_board_respond_modal'
                      columns={columns}
                      rows={state.rows}
                      selectByRowClick
                      hideCheckboxes
                      loading={datagrid.loading}
                      groupBy={['echoCode']}
                      getChildGroups={rows =>
                        _(rows)
                          .groupBy('echoName')
                          .map(v => {
                            return {
                              key: `${v[0].echoName}_${v[0].echoCode}_${v[0].companyProduct?.id}_${
                                v[0].productGroup !== null
                                  ? v[0].productGroup + ':'
                                  : formatMessage({ id: 'global.unmapped.cptlz', defaultMessage: 'Unmapped' })
                              }_${v[0].tagsNames ? v[0].tagsNames : ''}`,
                              childRows: v,
                              groupLength: v.length
                            }
                          })
                          .value()
                      }
                      renderGroupLabel={
                        ({ row: { value }, groupLength }) => null
                      }
                      onSelectionChange={selectedRows => setState({ ...state })}
                      groupActionsIcon
                      groupActions={row => null}
                      editingRowId={1}
                      columnActions='actCol'
                    />
                  </div>
                </ModalContent>
                <Modal.Actions>
                  <Grid verticalAlign='middle'>
                    <GridRow columns={3}>
                        <>
                          <LeftColumn textAlign='left' width={5}>
                          </LeftColumn>
                          <LeftColumn textAlign='left' width={7}>
                          </LeftColumn>
                        </>
                        <RightColumn width={6} floated='right'>
                          <Button basic type='button' onClick={closeRespondModal}>
                            <FormattedMessage id='global.cancel' defaultMessage='Close' tagName='span' />
                          </Button>
                          <SubmitButton
                            loading={purchaseRequestPending || updatingDatagrid}
                            primary
                            type='submit'
                            onClick={() => submitOffers()}
                          >
                            <FormattedMessage id='wantedBoard.submit' defaultMessage='Submit' tagName='span' />
                          </SubmitButton>
                        </RightColumn>
                    </GridRow>
                  </Grid>
                </Modal.Actions>
              </Modal>
              <ErrorFocus />
            </>
          )
        }}
      />
    </>
  )
}

function mapStateToProps(store, props) {
  return {
    ...store.wantedBoard,
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions, openGlobalAddForm })(injectIntl(RespondModal)))
