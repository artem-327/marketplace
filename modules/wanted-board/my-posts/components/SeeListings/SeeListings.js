import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import * as Actions from '../../../actions'
import { handleVariableSave } from '../../../../marketplace/actions'
import {
  Modal,
  Button,
  Grid,
  GridRow,
  GridColumn,
  Dimmer,
  Loader,
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
  getMappedRows
} from './SeeListings.service'

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

const SeeListings = props => {
  const [state, setState] = useState({
    select: '',
    nextSubmit: false,
    inputRows: 0,
    selectedRow: { id: '' },
    filterValues: null,
    rows: []
  })

  useEffect(() => {
    const { tableHandlersFiltersListings, datagrid } = props
    setState({ ...state, filterValues: tableHandlersFiltersListings })
    const filter = {
      ...tableHandlersFiltersListings,
      ...(!!tableHandlersFiltersListings?.searchByNamesAndCas && {
        ...tableHandlersFiltersListings?.searchByNamesAndCas?.filters
      })
    }
    datagrid.setSearch(filter, true, 'pageFilters')
  }, [])

  const {
    intl: { formatMessage },
    isSending,
    datagrid,
    closeSeeListingModal,
    handleVariableSave
  } = props

  useEffect(() => {
    getRows(getMappedRows(datagrid), setState)
  }, [datagrid])
    
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
              <Modal closeIcon onClose={closeSeeListingModal} open={true} size='large'>
                <Dimmer active={isSending} inverted>
                  <Loader />
                </Dimmer>
                <Modal.Header>
                  <FormattedMessage id='wantedBoard.listings' defaultMessage='Listings' />
                </Modal.Header>

                <ModalContent scrolling={datagrid.rows?.length !== 0}>
                  <div className='flex stretched wanted-board-wrapper listings-wrapper' style={{ padding: '10px 30px' }}>
                    <ProdexTable
                      {...datagrid.tableProps}
                      tableName='wanted_board_see_listings_modal'
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
                          <Button basic type='button' onClick={closeSeeListingModal}>
                            <FormattedMessage id='global.cancel' defaultMessage='Close' tagName='span' />
                          </Button>
                          <SubmitButton
                            primary
                            type='submit'
                            onClick={async () => {
                              closeSeeListingModal()

                              let filterName = []
                              let active = []
                              let usedOptions = []

                              state.rows.map(r => {
                                const po_id = r.rawData?.companyProduct?.id
                                const po_name = r.rawData?.companyProduct?.intProductName

                                if(!filterName.includes(po_name)){
                                  filterName.push(po_name)
                                  active.push("p_" + po_name)
                                  usedOptions.push(
                                    {
                                      "key": "p_" + po_id,
                                      "text": po_name,
                                      "value": "p_" + po_name
                                    }
                                  )
                                }
                              })
                              
                              if (filterName.length > 0) {
                                await handleVariableSave('tableHandlersFiltersListings', {
                                  SearchByNamesAndTags: {
                                      filters: {
                                          "filterName": filterName,
                                          "filterTags": [],
                                          "filterCAS": []
                                      },
                                      active: active,
                                      usedOptions: usedOptions
                                  }
                                })
                              }
                              
                              Router.push('/marketplace/listings')
                            }}
                          >
                            <FormattedMessage id='wantedBoard.buyOffer' defaultMessage='Buy Offer' tagName='span' />
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

export default withDatagrid(connect(mapStateToProps, { ...Actions, handleVariableSave })(injectIntl(SeeListings)))
