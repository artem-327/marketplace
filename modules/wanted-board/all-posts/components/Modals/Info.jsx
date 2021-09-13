import { useState } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../../actions'
import {
  Modal,
  Table,
  Button,
  Grid,
  GridRow,
  GridColumn,
  Dimmer,
  Loader,
  Segment,
  List
} from 'semantic-ui-react'
import { Form, Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { FieldArray } from 'formik'
import { getSafe, getPrice } from '../../../../../utils/functions'
import { FormattedMessage, FormattedNumber, FormattedDate, injectIntl } from 'react-intl'
import styled from 'styled-components'
import * as Yup from 'yup'
import { ArrayToFirstItem } from '../../../../../components/formatted-messages'
import moment from 'moment/moment'
import { FormattedUnit } from '../../../../../components/formatted-messages'
import { PlusCircle } from 'react-feather'

// import { inputWrapper } from '../../../components'
import { currency } from '../../../../../constants/index'
import { getLocaleDateFormat, getStringISODate } from '../../../../../components/date-format'
import { withDatagrid } from '../../../../datagrid'
import ProdexGrid from '../../../../../components/table'
import { Required } from '../../../../../components/constants/layout'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '../../../../../utils/functions'
import ErrorFocus from '../../../../../components/error-focus'

import {
    OrderSegment,
    OrderAccordion,
    AccordionTitle,
    Chevron,
    GridData,
    GridDataColumn,
    StyledTable,
    TableRowData,
    DocumentsDropdown,
    GridDataColumnTrackingID,
    CustomInput,
    CustomButton,
    PlusIcon,
    CustomA,
    TopRow,
    StyledModal,
    StyledHeader,
    NotesFormat
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

const OrderList = styled(List)`
  &.horizontal.divided:not(.celled) {
    display: flex !important;
    flex-flow: row;
    justify-content: flex-end;
    width: calc(100% + 40px);
    margin: -20px;
    padding: 15px 0;

    > .item:nth-child(n) {
      // nth-child to have stronger path
      flex-grow: 1;
      width: 20%;
      max-width: 20%;
      border-left: 1px solid rgba(34, 36, 38, 0.15) !important;
      padding: 3px 15px !important;

      .header {
        margin: 0;
        padding: 0 0 3px;
        font-size: 12px;
        font-weight: 400;
        color: #848893;
        line-height: 1.1666667;
      }

      .description {
        font-size: 14px;
        font-weight: 700;
        color: #20273a;
        line-height: 1.2142857;

        &.green {
          color: #84c225;
        }

        &.red {
          color: #f16844;
        }
      }
    }

    > .item:first-child {
      border-left: 0 none !important;
    }
  }
`

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

const IconPlusCircle = styled(PlusCircle)`
  color: #2599d5;
  line-height: 1.11;
  width: 18px;
  height: 20px;
`

const DivIconPlusCircle = styled.div`
  text-align: center;
  margin: 0;
`

const DivAddInputTds = styled.div`
  float: right;
  width: 40px;
  border-radius: 3px;
  border: solid 1px #2599d5;
  background-color: #ddf1fc;
  padding: 8px 0 4px 0;
  cursor: pointer;
`

const GridRowPlusIcon = styled(Grid.Row)`
  padding-top: 0px !important;
`

const GridColumnDropdown = styled(Grid.Column)`
  .ui.fluid.selection.dropdown {
    background-color: #fdfdfd !important;
  }
`

const GridColumnInput = styled(Grid.Column)`
  .ui.disabled.fluid.input {
    input {
      background-color: #f1f1f1 !important;
    }
  }
  .fluid.input {
    input {
      background-color: #fdfdfd !important;
    }
  }
`

const GridRowInputs = styled(Grid.Row)`
  padding-top: 0px !important;
`

const DivExpirationDate = styled.div`
  float: right;
  .input {
    input {
      background-color: #fdfdfd !important;
    }
  }
`

const InfoModal = props => {
  const [state, setState] = useState({
    select: '',
    nextSubmit: false,
    inputRows: 0,
    selectedRow: { id: '' }
  })

  const keyColumn = 5
  const valColumn = 16 - keyColumn

  const columns = [
    {
      name: 'radio',
      title: ' ',
      width: 40
    },
    {
      name: 'product',
      title: (
        <FormattedMessage id='submitOffer.product' defaultMessage='Product'>
          {text => text}
        </FormattedMessage>
      ),
      width: 170
    },
    {
      name: 'pricePerUOM',
      title: (
        <FormattedMessage id='submitOffer.fobPrice' defaultMessage='FOB Price'>
          {text => text}
        </FormattedMessage>
      ),
      width: 117
    },
    {
      name: 'condition',
      title: (
        <FormattedMessage id='submitOffer.condition' defaultMessage='Condition'>
          {text => text}
        </FormattedMessage>
      ),
      width: 120
    },
    {
      name: 'packaging',
      title: (
        <FormattedMessage id='submitOffer.packaging' defaultMessage='Packaging'>
          {text => text}
        </FormattedMessage>
      ),
      width: 140
    },
    {
      name: 'meas',
      title: (
        <FormattedMessage id='submitOffer.meas' defaultMessage='Meas'>
          {text => text}
        </FormattedMessage>
      ),
      width: 80
    },
    {
      name: 'expirationDate',
      title: (
        <FormattedMessage id='submitOffer.expirationDate' defaultMessage='Expiration Date'>
          {text => text}
        </FormattedMessage>
      ),
      width: 150
    }
  ]

    const {
      intl: { formatMessage },
      popupValues,
      isSending,
      datagrid,
      closePopup,
      purchaseRequestPending,
      options,
      updatingDatagrid,
      infoModalData
    } = props
    
    const rows = []
    const qtyPart = getSafe(() => popupValues?.unit.nameAbbreviation, '')

    const { closeInfoModal } = props;

    return (
      <>
        <ToggleForm
          onSubmit={(values, { setSubmitting, validateForm }) => {
            setSubmitting(false)
          }}
          validationSchema={()=>{}}
          validateOnChange
          enableReinitialize
          initialValues=''
          render={({ setFieldValue, values, submitForm, errors, setErrors, validateForm, setValues }) => {
            setFieldValue = setFieldValue
            submitForm = submitForm
            values = values
            errors = errors
            setErrors = setErrors
            validateForm = validateForm
            setValues = setValues

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
                                    <GridDataColumn width={valColumn}> Fiber Drum </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalCondition' defaultMessage='Condition' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> Conforming </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalConforming' defaultMessage='Conforming' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> { infoModalData?.conforming } </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalGrade' defaultMessage='Grade' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> Industrial </GridDataColumn>

                                </GridData>
                            </GridColumn>
                            <GridColumn width={8}>
                                <GridData>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalForm' defaultMessage='Form' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> Grangular </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalDeliveryLocation' defaultMessage='Delivery Location' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> Texas, USA </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'> 
                                        <FormattedMessage id='wantedBoard.infoModalCountryOfOrigin' defaultMessage='Country of Origin' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> China </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalExpiryDate' defaultMessage='Expiry Date' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}> { infoModalData?.postExpiry } </GridDataColumn>

                                    <GridDataColumn width={keyColumn} className='key'>
                                        <FormattedMessage id='wantedBoard.infoModalSpecialNotes' defaultMessage='Special Notes' />
                                    </GridDataColumn>
                                    <GridDataColumn width={valColumn}>  </GridDataColumn>

                                    <GridDataColumn width={16} className='specialKey'>
                                        Example note goes here 
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
                          <>
                            <LeftColumn textAlign='left' width={5}>
                            </LeftColumn>
                            <LeftColumn textAlign='left' width={7}>
                            </LeftColumn>
                          </>
                          <RightColumn width={4} floated='right'>
                            <Button basic type='button' onClick={closeInfoModal}>
                              <FormattedMessage id='global.cancel' defaultMessage='Close' tagName='span'>
                                {text => text}
                              </FormattedMessage>
                            </Button>
                            <SubmitButton
                              loading={purchaseRequestPending || updatingDatagrid}
                              primary
                              type='submit'
                              onClick={submitForm}
                              disabled={state.select === '' || purchaseRequestPending}>
                              <FormattedMessage id='wantedBoard.respond' defaultMessage='Respond' tagName='span'>
                                {text => text}
                              </FormattedMessage>
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
      popupValues: props.rawData,
      currencySymbol: '$',
    }
  }
  
  export default withDatagrid(connect(mapStateToProps, { ...Actions })(withToastManager(injectIntl(InfoModal))))
