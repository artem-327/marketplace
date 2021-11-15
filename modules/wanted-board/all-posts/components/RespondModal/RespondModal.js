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
  const [submitting, setSubmitting] = useState(false)
  const [state, setState] = useState({
    select: '',
    nextSubmit: false,
    inputRows: 0,
    selectedRow: { id: '' },
    rows: [],
    useCreatedProductOffer: true
  })

  const [localDataState, setLocalDataState] = useState(props)
  const [submitOffer, setSubmitOffer] = useState({
    productOffers: [],
    wantedBoardRequest: false,
  })

  const updateProductOfferArray = (rows) => {
    let productOfferArray = [];

    if (props.createdProductOffer && state.useCreatedProductOffer) {
      productOfferArray = [props.createdProductOffer.id]
    } else {
      for (const row of rows) {
        let {submittedBids} = row
        submittedBids = submittedBids[0]
        if (submittedBids) {
          const {productOfferId} = submittedBids
          productOfferArray = [...productOfferArray, productOfferId]
        }
      }
    }
    return productOfferArray;
  }

  useEffect(() => {
    const { popupValues, datagrid, createdProductOffer } = props

    const productSearchPattern = createdProductOffer
      ? createdProductOffer.companyProduct.intProductName
      : popupValues.rawData.productSearchPattern

    setSearchInput('')
    const filter = {
      searchInput: ''
    }
    datagrid.setSearch(filter, true, 'modalFilters')
    const { rows } = datagrid

    let productOfferArray = updateProductOfferArray(rows);
    setSubmitOffer({
      ...submitOffer,
      wantedBoardRequest: props.editID,
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
    postUpdatedWantedBoardBids
  } = props

  useEffect(() => {
    setLocalDataState(props)
    const { rows } = datagrid

    let productOfferArray = updateProductOfferArray(rows);
    setSubmitOffer({
      ...submitOffer,
      wantedBoardRequest: props.editID,
      productOffers: productOfferArray
    })

    getRows(getMappedRows(
      localDataState,
      selectRow,
      unselectRow,
      submitOffer.productOffers
    ), props, state, setState)
  }, [datagrid])


  useEffect(() => {
    getRows(getMappedRows(
      localDataState,
      selectRow,
      unselectRow,
      submitOffer.productOffers
    ), props, state, setState)

  }, [submitOffer])


  const selectRow = id => {
    if (state.useCreatedProductOffer) setState({ ...state, useCreatedProductOffer: false })
    setSubmitOffer({
      ...submitOffer,
      productOffers: [ ...submitOffer.productOffers, id ]
    })
  }

  const unselectRow = id => {
    if (state.useCreatedProductOffer) setState({ ...state, useCreatedProductOffer: false })
    setSubmitOffer({
      ...submitOffer,
      productOffers: submitOffer.productOffers.filter(el => el !== id)
    })
  }

  const submitOffers = async () => {
    if (submitOffer.wantedBoardRequest) {
      setSubmitting(true)
      try {
        datagrid.setLoading(true)
        await postUpdatedWantedBoardBids(submitOffer)
        if (state.useCreatedProductOffer) setState({ ...state, useCreatedProductOffer: false })
        setSubmitOffer({
          ...submitOffer,
          productOffers: []
        })
        datagrid.loadData()
        closeRespondModal()
      } catch (e) {
        console.error(e)
      } finally {
        setSubmitting(false)
      }
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
                    onChange={(e, { value }) => {
                      if (state.useCreatedProductOffer) setState({ ...state, useCreatedProductOffer: false })
                      handleFilterChangeInputSearch(value, props, searchInput, setSearchInput)
                    }}
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
                            loading={purchaseRequestPending || updatingDatagrid || submitting}
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
