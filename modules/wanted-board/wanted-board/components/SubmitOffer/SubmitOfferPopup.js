import React from 'react'
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
  Segment,
  List,
  Table,
  Label,
  Radio,
  FormGroup
} from 'semantic-ui-react'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { getSafe, getPrice } from '~/utils/functions'
import { FormattedMessage, FormattedNumber, FormattedDate, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { errorMessages } from '~/constants/yupValidation'
import * as Yup from 'yup'
import { ArrayToFirstItem } from '~/components/formatted-messages'
import moment from 'moment/moment'
import { FormattedUnit } from '~/components/formatted-messages'
import { DateInput } from '~/components/custom-formik'
// import { inputWrapper } from '../../../components'
import { currency } from '~/constants/index'
import { FieldArray } from 'formik'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import { withDatagrid } from '~/modules/datagrid'
import ProdexGrid from '~/components/table'

import confirm from '~/src/components/Confirmable/confirm'

const validationSchema = Yup.object().shape({
  pricePerUOM: Yup.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage)
})

import { InputWrapper } from '../../../constants/layout'

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
`

const SubmitFormTable = styled(Table)`
  .table-responsive & tbody tr td {
    padding-top: 3px !important;
    padding-bottom: 3px !important;
    line-height: 18px;
  }
`

const RadioField = styled.div`
  .ui.radio {
    width: 18px;
    height: 18px;
    margin: 0 !important;

    input[type='radio'] {
      width: 18px;
      height: 18px;
    }

    label {
      &:before,
      &:after {
        right: auto;
        bottom: auto;
        box-sizing: border-box;
      }

      &:before {
        top: 0;
        left: 0;
        width: 18px;
        height: 18px;
      }

      &:after {
        top: 4px;
        left: 4px;
        transform: none;
        width: 10px;
        height: 10px;
        background: #2599d5 !important;
      }
    }
  }
`

const DateField = styled.div`
  height: 22px;
  margin: 0 -5px;

  > div {
    position: relative;
    top: -5px;
  }

  * {
    max-height: 32px;
  }
`

const LeftColumn = styled(GridColumn)`
  padding-left: 1.5rem !important;
`

const RightColumn = styled(GridColumn)`
  padding-right: 1.5rem !important;
`

const ToggleForm = styled(Form)`
  opacity: ${props => (props.hidden ? 0 : 1)};
`

const GreenLabel = styled(Label)`
  background-color: rgba(132, 194, 37, 0.15) !important;
  color: #84c225 !important;
`

class SubmitOfferPopup extends React.Component {
  state = {
    columns: [
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
        name: 'manufacturer',
        title: (
          <FormattedMessage id='submitOffer.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 143
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
    ],
    select: ''
  }

  submitOffer = async ({ pricePerUOM, lotExpirationDate }) => {
    const { closePopup, submitOffer, popupValues, rows } = this.props

    let expiresAt = null
    if (lotExpirationDate) {
      expiresAt = moment(getStringISODate(lotExpirationDate)).format()
    }

    const body = {
      expiresAt,
      pricePerUOM,
      productOffer: rows[this.state.select].id,
      purchaseRequest: popupValues.id
    }

    await submitOffer(body)
    closePopup()
  }

  getRows = () => {
    const { currencySymbol, popupValues, rows } = this.props

    return rows.map((row, index) => {
      return {
        ...row,
        radio: (
          <Radio
            checked={this.state.select === index}
            value={index}
            onChange={(_e, { value }) => {
              this.setState({ select: value })
              this.setFieldValue('pricePerUOM', row.pricePerUOM)
            }}
            // inputProps={{  }}
          />
        ),
        product: row.companyProduct.intProductName,
        pricePerUOM: (
          <InputWrapper>
            <div>
              <div className='field'>
                <FormattedNumber value={row.pricePerUOM} />
              </div>
              <Label>{currencySymbol}</Label>
            </div>
          </InputWrapper>
        ),
        manufacturer: row.companyProduct.echoProduct.manufacturer.name,
        condition: row.conforming ? (
          <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
        ) : (
          <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
        ),
        packaging: row.companyProduct.packagingType.name,
        meas: row.companyProduct.packagingUnit.nameAbbreviation.toUpperCase(),
        expirationDate: row.lotExpirationDate ? moment(row.lotExpirationDate).format(getLocaleDateFormat()) : 'N/A'
      }
    })
  }

  handleChange = (_e, { name, value }) => {
    const { datagrid } = this.props
    const { rows } = datagrid
    const row = rows[this.state.select]
    row[name] = value

    datagrid.updateRow(row.id, () => row)
  }

  render() {
    const {
      intl: { formatMessage },
      popupValues,
      isSending,
      currencySymbol,
      datagrid,
      closePopup,
      purchaseRequestPending
    } = this.props
    const { columns } = this.state

    const qtyPart = popupValues.unit.nameAbbreviation

    return (
      <>
        <Modal closeIcon onClose={closePopup} open={true} size='large'>
          <Dimmer active={isSending} inverted>
            <Loader />
          </Dimmer>
          <Modal.Header>
            <FormattedMessage id='wantedBoard.submitOfferHeader' defaultMessage='SUBMIT OFFER' />
          </Modal.Header>
          <ModalContent>
            <>
              <SubmitOfferHighSegment>
                <Grid verticalAlign='middle'>
                  <GridRow>
                    <Grid.Column>
                      <OrderList divided relaxed horizontal size='large'>
                        <List.Item>
                          <List.Content>
                            <List.Header as='label'>
                              <FormattedMessage id='wantedBoard.packaging' defaultMessage='Packaging' />
                            </List.Header>
                            <List.Description as='span'>
                              {popupValues.packagingTypes && popupValues.packagingTypes.length ? (
                                <ArrayToFirstItem values={popupValues.packagingTypes.map(d => d.name)} />
                              ) : (
                                <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
                              )}
                            </List.Description>
                          </List.Content>
                        </List.Item>

                        <List.Item>
                          <List.Content>
                            <List.Header as='label'>
                              <FormattedMessage id='wantedBoard.form' defaultMessage='Form' />
                            </List.Header>
                            <List.Description as='span'>
                              {popupValues.forms && popupValues.forms.length ? (
                                <ArrayToFirstItem values={popupValues.forms.map(d => d.name)} />
                              ) : (
                                <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
                              )}
                            </List.Description>
                          </List.Content>
                        </List.Item>

                        <List.Item>
                          <List.Content>
                            <List.Header as='label'>
                              <FormattedMessage id='wantedBoard.fobPrice' defaultMessage='FOB Price' />
                            </List.Header>
                            <List.Description as='span'>
                              {popupValues.maximumPricePerUOM ? (
                                <FormattedNumber
                                  style='currency'
                                  currency={currency}
                                  value={popupValues.maximumPricePerUOM}
                                />
                              ) : (
                                'N/A'
                              )}
                            </List.Description>
                          </List.Content>
                        </List.Item>

                        <List.Item>
                          <List.Content>
                            <List.Header as='label'>
                              <FormattedMessage id='wantedBoard.quantity' defaultMessage='Quantity' />
                            </List.Header>
                            <List.Description as='span'>
                              {qtyPart ? (
                                <FormattedUnit unit={qtyPart} separator='' value={popupValues.quantity} />
                              ) : (
                                <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
                              )}
                            </List.Description>
                          </List.Content>
                        </List.Item>

                        <List.Item>
                          <List.Content>
                            <List.Header as='label'>
                              <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By' />
                            </List.Header>
                            <List.Description as='span'>
                              {popupValues.neededAt ? (
                                moment(popupValues.neededAt).format(getLocaleDateFormat())
                              ) : (
                                <FormattedMessage id='wantedBoard.any' defaultMessage='Any' />
                              )}
                            </List.Description>
                          </List.Content>
                        </List.Item>
                      </OrderList>
                    </Grid.Column>
                  </GridRow>
                </Grid>
              </SubmitOfferHighSegment>

              <div className='table-responsive'>
                <ProdexGrid
                  tableName='submit_offer_grid'
                  {...datagrid.tableProps}
                  loading={datagrid.loading || purchaseRequestPending}
                  rows={this.getRows()}
                  columns={columns}
                />
              </div>
            </>
          </ModalContent>

          <Modal.Actions>
            <ToggleForm
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
                this.submitOffer(values)
              }}
              validationSchema={validationSchema}
              validateOnChange
              enableReinitialize
              initialValues={{
                pricePerUOM: '',
                expirationDate: ''
              }}
              hidden={this.state.select === ''}
              render={({ setFieldValue, values, submitForm }) => {
                this.setFieldValue = setFieldValue
                this.submitForm = submitForm
                return (
                  <>
                    <Grid verticalAlign='middle'>
                      <GridRow columns={2}>
                        <LeftColumn textAlign='left'>
                          <FormGroup className='price-input'>
                            <Input
                              name='pricePerUOM'
                              label='FOB Price'
                              inputProps={{
                                type: 'number',
                                onChange: this.handleChange,
                                label: <GreenLabel>{currencySymbol}</GreenLabel>,
                                labelPosition: 'right'
                              }}
                            />

                            <DateInput
                              name='lotExpirationDate'
                              label='Expiration Date'
                              inputProps={{
                                onChange: (e, { name, value }) =>
                                  this.handleChange(e, { name, value: getStringISODate(value) })
                              }}
                            />
                          </FormGroup>
                        </LeftColumn>
                        <RightColumn>
                          <Button basic type='button' onClick={closePopup}>
                            <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span'>
                              {text => text}
                            </FormattedMessage>
                          </Button>
                          <Button primary disabled={this.state.select === ''}>
                            <FormattedMessage id='wantedBoard.submit' defaultMessage='Submit' tagName='span'>
                              {text => text}
                            </FormattedMessage>
                          </Button>
                        </RightColumn>
                      </GridRow>
                    </Grid>
                  </>
                )
              }}
            />
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}

function mapStateToProps(store, props) {
  return {
    ...store.wantedBoard,
    rows: props.datagrid.rows.map(row => ({
      ...row,
      pricePerUOM: row.pricePerUOM
        ? parseInt(row.pricePerUOM, null)
        : getPrice(props.rawData.quantity, row.pricingTiers)
    })),
    popupValues: props.rawData,
    currencySymbol: '$'
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(SubmitOfferPopup)))
