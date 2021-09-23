import { connect } from 'react-redux'
import * as Actions from '../../../actions'
import {
  Modal,
  Button,
  Grid,
  GridRow,
  GridColumn,
  Dimmer,
  Loader,
  Segment
} from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withDatagrid } from '../../../../datagrid'
import { withToastManager } from 'react-toast-notifications'
import ErrorFocus from '../../../../../components/error-focus'
import {
    GridData,
    GridDataColumn
  } from './InfoModal.styles'

const SubmitOfferHighSegment = styled(Segment)`
  width: 100%;
  margin-left: 0 !important;
  margin-bottom: 16px !important;

  > .grid {
    padding: 0;

    > .row {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }

    > .column,
    > .row > .column {
      padding: 20px !important;
    }
  }

  h1.header {
    height: 17px;
    margin: 0 0 10px;
    padding: 0;
    font-size: 14px !important;
    font-weight: 700 !important;
    color: #20273a;
    line-height: 1.2142857;

    ~ a {
      display: inline-block;
      height: 32px;
      border: 1px solid #2599d5;
      border-radius: 3px;
      padding: 5px 14px;
      background-color: #ddf1fc;
      font-size: 13px !important;
      font-weight: 500;
      color: #2599d5;
      line-height: 1.5384615;

      svg {
        width: 18px;
        height: 20px;
        margin-right: 10px;
        vertical-align: top;
        color: inherit;
      }
    }
  }
`

const ModalContent = styled(Modal.Content)`
  padding: 1.5rem !important;
  margin-bottom: 10px !important;
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

const InfoModal = props => {

  const keyColumn = 5
  const valColumn = 16 - keyColumn

    const {
      isSending,
      purchaseRequestPending,
      updatingDatagrid,
      infoModalData
    } = props
    
    const rows = []
    const { closeInfoModal } = props;

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
                <Modal closeIcon onClose={closeInfoModal} open={true} size='large'>
                  <Dimmer active={isSending} inverted>
                    <Loader />
                  </Dimmer>
                  <Modal.Header>
                    <FormattedMessage id='wantedBoard.productInfoHeader' defaultMessage='PRODUCT INFO' />
                  </Modal.Header>

                  <ModalContent scrolling={rows?.length !== 0}>
                    <>
                      <SubmitOfferHighSegment>
                      <Grid divided='horizontally'>
                        <GridRow>
                            <GridColumn width={8}>
                                <GridData>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalProductName' defaultMessage='Product Name' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> { infoModalData?.productName } </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalQuantityNeeded' defaultMessage='Quantity Needed' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> { infoModalData?.quantity } </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'> 
                                        <FormattedMessage id='wantedBoard.infoModalPackaging' defaultMessage='Packaging' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> { infoModalData?.rawData?.packagingTypes?.length ? infoModalData?.rawData?.packagingTypes[0].name : '' } </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalCondition' defaultMessage='Condition' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> { infoModalData?.rawData?.condition?.name } </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalConforming' defaultMessage='Conforming' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> { infoModalData?.conforming } </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalGrade' defaultMessage='Grade' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> { infoModalData?.rawData?.grades?.length ? infoModalData?.rawData?.grades[0].name : '' } </GridDataColumn>

                                </GridData>
                            </GridColumn>
                            <GridColumn width={8}>
                                <GridData>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalForm' defaultMessage='Form' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> { infoModalData?.rawData?.forms?.length ? infoModalData?.rawData?.forms[0].name : '' } </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalDeliveryLocation' defaultMessage='Delivery Location' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> { infoModalData?.shippingLocation } </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'> 
                                        <FormattedMessage id='wantedBoard.infoModalCountryOfOrigin' defaultMessage='Country of Origin' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> { infoModalData?.rawData?.origins?.length ? infoModalData?.rawData?.origins[0].name : '' } </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalExpiryDate' defaultMessage='Expiry Date' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> { infoModalData?.postExpiry } </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalSpecialNotes' defaultMessage='Special Notes' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}>  </GridDataColumn>

                                    <GridDataColumn width={16} className='specialKey'>
                                      { infoModalData?.rawData?.notes }
                                    </GridDataColumn>

                                </GridData>
                            </GridColumn>
                        </GridRow>
                        </Grid>
                      </SubmitOfferHighSegment>
                    </>
                  </ModalContent>

                  <Modal.Actions>
                    <Grid verticalAlign='middle'>
                      <GridRow columns={3}>
                          <RightColumn width={5} floated='right'>
                            <Button basic type='button' onClick={closeInfoModal}>
                              <FormattedMessage id='global.cancel' defaultMessage='Close' tagName='span' />
                            </Button>
                            <SubmitButton
                              loading={purchaseRequestPending || updatingDatagrid}
                              primary
                              type='submit'
                              onClick={() => {
                                closeInfoModal()
                                props.openRespondModal(props.row)
                              }}
                            >
                              <FormattedMessage id='wantedBoard.respond' defaultMessage='Respond' tagName='span' />
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
    row: store?.wantedBoard?.infoModalData
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(withToastManager(injectIntl(InfoModal))))
