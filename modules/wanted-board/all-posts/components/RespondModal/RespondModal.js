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
} from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withDatagrid } from '../../../../datagrid'
import ProdexTable from '../../../../../components/table'
import { withToastManager } from 'react-toast-notifications'
import ErrorFocus from '../../../../../components/error-focus'
import {
  columns,
  getRows,
  getMappedRows
} from './RespondModal.service'

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
    purchaseRequestPending,
    updatingDatagrid,
    closeRespondModal,
    openGlobalAddForm
  } = props

  useEffect(() => {
    getRows(getMappedRows(props), props, state, setState)
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
              <Modal closeIcon onClose={closeRespondModal} open={true} size='large'>
                <Dimmer active={isSending} inverted>
                  <Loader />
                </Dimmer>
                <Modal.Header>
                  <FormattedMessage id='wantedBoard.productRespondHeader' defaultMessage='Respond' />
                </Modal.Header>

                <ModalContent scrolling={datagrid.rows?.length !== 0}>
                  <div className='flex stretched wanted-board-wrapper listings-wrapper' style={{ padding: '10px 30px' }}>
                    <ProdexTable
                      {...datagrid.tableProps}
                      tableName='wanted_board_grid'
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
                            onClick={() => {
                              closeRespondModal()
                              openGlobalAddForm('inventory-my-listings')
                            }}
                          >
                            <FormattedMessage id='wantedBoard.respondModalCreateNewListing' defaultMessage='Create New Listing' tagName='span' />
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

export default withDatagrid(connect(mapStateToProps, { ...Actions, openGlobalAddForm })(withToastManager(injectIntl(RespondModal))))
