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
import { Form, Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { FieldArray } from 'formik'
import { getSafe, getPrice } from '~/utils/functions'
import { FormattedMessage, FormattedNumber, FormattedDate, injectIntl } from 'react-intl'
import styled from 'styled-components'
import * as Yup from 'yup'
import { ArrayToFirstItem } from '~/components/formatted-messages'
import moment from 'moment/moment'
import { FormattedUnit } from '~/components/formatted-messages'
import { DateInput } from '~/components/custom-formik'
import { errorMessages, dateValidation } from '~/constants/yupValidation'
import { Trash, PlusCircle } from 'react-feather'

// import { inputWrapper } from '../../../components'
import { currency } from '~/constants/index'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import { withDatagrid } from '~/modules/datagrid'
import ProdexGrid from '~/components/table'
import { Required } from '~/components/constants/layout'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'
import ErrorFocus from '~/components/error-focus'

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
  margin-bottom: 10px !important;
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
  flex-direction: inherit !important;
  display: flex !important;
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

const SubmitButton = styled(Button)`
  background-color: #2599d5 !important;
  color: #ffffff !important;
`

const DivLabel = styled.div`
  align-self: center;
  margin-right: 4px;
`

const QuantityLabel = styled(Label)`
  background-color: #edeef2 !important;
  color: #848893 !important;
  font-size: 14px !important;
  font-weight: normal !important;
  font-stretch: normal !important;
  font-style: normal !important;
`

const IconTrash = styled(Trash)`
  cursor: pointer;
  color: #f16844;
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

const TableCell = styled(Table.Cell)`
  padding: 2px !important;
  .input {
    input {
      background-color: #fdfdfd !important;
    }
  }
  .disabled.input {
    input {
      background-color: #f1f1f1 !important;
    }
  }
`

const GridRowPlusIcon = styled(Grid.Row)`
  padding-top: 0px !important;
`

const DivIconTrash = styled.div`
  min-width: 30px;
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

const DivRadio = styled.div`
  margin: -10px !important;
  padding: 10px 10px 12px 10px !important;
  border-left: ${props => props.borderLeft && '2px solid #2599d5 !important'};
  .ui.radio.checkbox input:checked ~ label:after {
    background-color: #2599d5 !important;
  }
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
      /*
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='submitOffer.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 143
      },
      */
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
    select: '',
    nextSubmit: false,
    inputRows: 0,
    pkgAvailable: ''
  }

  validationSchema = () =>
    Yup.lazy(values => {
      const { matchingOfferInfo } = this.props
      const sumPkgAmount =
        getSafe(() => values.items.length, '') > 1
          ? values.items.reduce((acc, cur) => Number(acc.pkgAmount) + Number(cur.pkgAmount))
          : Number(getSafe(() => values.items[0].pkgAmount, 0))

      let fulfillmentType = ''
      if (this.state.nextSubmit)
        fulfillmentType = { fulfillmentType: Yup.string().required(errorMessages.requiredMessage) }
      return Yup.object().shape({
        ...(values.lotExpirationDate && {
          lotExpirationDate: dateValidation(false).concat(
            Yup.string().test('minDate', errorMessages.dateNotInPast, function (date) {
              const enteredDate = moment(getStringISODate(date)).endOf('day').format()
              return enteredDate >= moment().endOf('day').format()
            })
          )
        }),
        ...fulfillmentType,
        items: Yup.array().of(
          Yup.lazy(v => {
            let pkgAmount = {
              pkgAmount: Yup.number()
                .positive(errorMessages.positive)
                .typeError(errorMessages.requiredMessage)
                .required(errorMessages.requiredMessage)
            }

            if (getSafe(() => matchingOfferInfo.maximumPackageAmount, 0) < sumPkgAmount) {
              pkgAmount = {
                pkgAmount: Yup.number()
                  .positive(errorMessages.positive)
                  .typeError(errorMessages.requiredMessage)
                  .required(errorMessages.requiredMessage)
                  .test(
                    'is_over_max',
                    errorMessages.maximum(matchingOfferInfo.maximumPackageAmount),
                    () => sumPkgAmount < matchingOfferInfo.maximumPackageAmount
                  )
              }
            } else if (getSafe(() => matchingOfferInfo.minimumPackageAmount, 0) > sumPkgAmount) {
              pkgAmount = {
                pkgAmount: Yup.number()
                  .positive(errorMessages.positive)
                  .typeError(errorMessages.requiredMessage)
                  .required(errorMessages.requiredMessage)
                  .test(
                    'is_over_min',
                    errorMessages.minimum(matchingOfferInfo.minimumPackageAmount),
                    () => sumPkgAmount > matchingOfferInfo.minimumPackageAmount
                  )
              }
            }

            let fulfilledAt = ''
            if (values.fulfillmentType === 'COMPLETE_SCHEDULE')
              fulfilledAt = {
                fulfilledAt: dateValidation(this.state.nextSubmit ? true : false).concat(
                  Yup.string().test('minDate', errorMessages.dateNotInPast, function (date) {
                    const enteredDate = moment(getStringISODate(date)).endOf('day').format()
                    return enteredDate >= moment().endOf('day').format()
                  })
                )
              }

            return Yup.object().shape({
              ...fulfilledAt,
              ...pkgAmount,
              pricePerUOM: Yup.number()
                .positive(errorMessages.positive)
                .typeError(errorMessages.requiredMessage)
                .required(errorMessages.requiredMessage)
            })
          })
        )
      })
    })

  async componentDidMount() {
    const { popupValues } = this.props
    if (this.props.isSecondPage) {
      this.setState({ nextSubmit: true, select: 0 })
      try {
        if (popupValues.purchaseRequest.id && popupValues.productOffer.id) {
          await this.props.matchingProductOfferInfo(popupValues.purchaseRequest.id, popupValues.productOffer.id)
        }
      } catch (error) {
        console.error(error)
      }
      return
    }
    if (!this.props.datagrid.loading) this.handleDatagridResult()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.datagrid.loading && !this.props.datagrid.loading) {
      this.handleDatagridResult()
    }
  }

  componentWillUnmount() {
    this.props.falseIsSecondPage()
  }

  handleDatagridResult = () => {
    if (!this.props.datagrid.rows.length) {
      const { toastManager } = this.props
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id='wantedBoard.notify.noInventoryItems.Header' defaultMessage='No Items Match' />,
          <FormattedMessage
            id='wantedBoard.notify.noInventoryItems.Content'
            defaultMessage='You do not have any Inventory item matching the requested item to offer.'
          />
        ),
        {
          appearance: 'warning'
        }
      )
      this.props.closePopup()
    }
  }

  clean = obj => {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName]
      }
    }
    return obj
  }

  submitOffer = async ({ lotExpirationDate, fulfillmentType, items }, validateForm) => {
    if (!this.state.nextSubmit) {
      this.setState({ nextSubmit: true })
      return
    }

    const {
      closePopup,
      submitOffer,
      popupValues,
      rows,
      counterRequestedItem,
      isSecondPage,
      matchingOfferInfo
    } = this.props
    let expiresAt = null
    if (lotExpirationDate) {
      expiresAt = moment(getStringISODate(lotExpirationDate)).endOf('day').format()
    }

    const editedItems = items.map(item => {
      switch (fulfillmentType) {
        case 'PARTIAL':
          return { pkgAmount: Number(item.pkgAmount), pricePerUOM: Number(item.pricePerUOM) }
        case 'COMPLETE_IMMEDIATE':
          return { pricePerUOM: Number(item.pricePerUOM) }
        case 'COMPLETE_SCHEDULE':
          return {
            pkgAmount: Number(item.pkgAmount),
            pricePerUOM: Number(item.pricePerUOM),
            fulfilledAt: moment(getStringISODate(item.fulfilledAt)).format()
          }
      }
    })

    const productOffer = getSafe(() => rows[this.state.select].id, '')
      ? rows[this.state.select].id
      : getSafe(() => popupValues.productOffer.id, '')

    const body = {
      expiresAt,
      fulfillmentType,
      items: editedItems,
      productOffer,
      purchaseRequest: popupValues.id
    }

    try {
      if (this.props.isSecondPage) {
        delete body.productOffer
        delete body.purchaseRequest
        await counterRequestedItem(popupValues.id, this.clean(body)) //CHECK new BE
      } else {
        await submitOffer(this.clean(body)) //CHECK new BE
      }
    } catch (error) {
      console.error(error)
    } finally {
      closePopup()
    }
  }

  getRows = () => {
    const { currencySymbol, popupValues, rows } = this.props

    return rows.map((row, index) => {
      return {
        ...row,
        radio: (
          <DivRadio borderLeft={this.state.select === index}>
            <Radio
              checked={this.state.select === index}
              value={index}
              onChange={(_e, { value }) => {
                this.setState({ select: value })
                this.setFieldValue('items[0].pricePerUOM', row.pricePerUOM)
                this.setFieldValue('items[0].pkgAmount', row.pkgAvailable)
                this.setState({ pkgAvailable: row.pkgAvailable })
                this.setFieldValue('productName', row.companyProduct.intProductName)
              }}
              // inputProps={{  }}
            />
          </DivRadio>
        ),
        product: getSafe(() => row.companyProduct.intProductName, 'N/A'),
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
        manufacturer: getSafe(() => row.companyProduct.companyGenericProduct.manufacturer.name, 'N/A'),
        condition: row.conforming ? (
          <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
        ) : (
          <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
        ),
        packaging: getSafe(() => row.companyProduct.packagingType.name, 'N/A'),
        meas: getSafe(() => row.companyProduct.packagingUnit.nameAbbreviation, 'N/A').toUpperCase(),
        expirationDate: row.lotExpirationDate ? moment(row.lotExpirationDate).format(getLocaleDateFormat()) : 'N/A'
      }
    })
  }

  handleChange = (_e, { name, value }, index = 0) => {
    if (name === 'fulfillmentType' && value === 'COMPLETE_SCHEDULE') {
      this.validateForm()
        .then(() => {
          this.setErrors({})
        })
        .catch(err => console.log('catch', err))
    }
    if (name === 'fulfillmentType' && value === 'COMPLETE_IMMEDIATE') {
      this.setFieldValue('items[0].pkgAmount', this.state.pkgAvailable)
    }
    if (
      this.values.fulfillmentType === 'COMPLETE_SCHEDULE' &&
      (name.includes('pkgAmount') || name.includes('pricePerUOM'))
    ) {
      let total = 0
      if (name.includes('pkgAmount')) {
        total = Number(value) * Number(this.values.items[index].pricePerUOM)
      } else if (name.includes('pricePerUOM')) {
        total = Number(value) * Number(this.values.items[index].pkgAmount)
      }
      this.setFieldValue(`items[${index}].total`, total)
    }

    if (name === 'fulfillmentType' && !this.values.items[index].total) {
      this.setFieldValue(
        `items[${index}].total`,
        Number(this.values.items[index].pricePerUOM) * Number(this.values.items[index].pkgAmount)
      )
    }
    const { datagrid, counterRequestedItem } = this.props
    if (getSafe(() => datagrid.rows.length, '') && !counterRequestedItem) {
      const { rows } = datagrid
      const row = rows[this.state.select]
      row[name] = value
      datagrid.updateRow(row.id, () => row)
    }
  }

  renderPriceInput = (fulfillmentType, index = 0) => {
    return (
      <>
        {fulfillmentType && fulfillmentType !== 'COMPLETE_SCHEDULE' && (
          <>
            <FormattedMessage id='submitOffer.price' defaultMessage='Price'>
              {text => text}
            </FormattedMessage>
            <Required />
          </>
        )}
        <Input
          name={`items[${index}].pricePerUOM`}
          label={
            !getSafe(() => fulfillmentType, false) && (
              <>
                <FormattedMessage id='submitOffer.price' defaultMessage='Price'>
                  {text => text}
                </FormattedMessage>
                <Required style={{ marginRight: '4px' }} />
              </>
            )
          }
          inputProps={{
            type: 'number',
            onChange: (e, data) => this.handleChange(e, data, index),
            label: <GreenLabel>{this.props.currencySymbol}</GreenLabel>,
            labelPosition: 'right',
            fluid: this.state.nextSubmit && this.values.fulfillmentType !== 'COMPLETE_SCHEDULE'
          }}
        />
      </>
    )
  }

  renderDateInput = fulfillmentType => {
    return (
      <>
        <DivLabel>
          <FormattedMessage id='submitOffer.expirationDate' defaultMessage='Expiration Date'>
            {text => text}
          </FormattedMessage>
        </DivLabel>
        <DateInput
          name='lotExpirationDate'
          inputProps={{
            onChange: (e, { name, value }) => this.handleChange(e, { name, value: getStringISODate(value) }),
            //minDate: moment(), TypeError: Cannot read property 'position' of undefined
            clearable: true,
            fluid: this.state.nextSubmit && this.values.fulfillmentType !== 'COMPLETE_SCHEDULE'
          }}
        />
      </>
    )
  }

  renderDateInputFulfilledAt = (fulfillmentType, index) => {
    return (
      <>
        {fulfillmentType !== 'COMPLETE_SCHEDULE' && (
          <DivLabel>
            <FormattedMessage id='submitOffer.expirationDate' defaultMessage='Expiration Date'>
              {text => text}
            </FormattedMessage>
            <Required />
          </DivLabel>
        )}
        <DateInput
          name={`items[${index}].fulfilledAt`}
          inputProps={{
            onChange: (e, { name, value }) => this.handleChange(e, { name, value: getStringISODate(value) }),
            clearable: true,
            fluid: this.state.nextSubmit && this.values.fulfillmentType !== 'COMPLETE_SCHEDULE'
          }}
        />
      </>
    )
  }

  renderQuantityInput = (fulfillmentType, index = 0) => {
    return (
      <>
        {fulfillmentType !== 'COMPLETE_SCHEDULE' && (
          <>
            <FormattedMessage id='submitOffer.pkgAmount' defaultMessage='PKG Amount'>
              {text => text}
            </FormattedMessage>
            <Required />
          </>
        )}
        <Input
          name={`items[${index}].pkgAmount`}
          inputProps={{
            type: 'number',
            onChange: (e, data) => this.handleChange(e, data, index),
            disabled: fulfillmentType === 'COMPLETE_IMMEDIATE',
            fluid: this.state.nextSubmit && this.values.fulfillmentType !== 'COMPLETE_SCHEDULE'
          }}
        />
      </>
    )
  }

  renderTotal = (index = 0) => {
    return (
      <>
        <Input
          name={`items[${index}].total`}
          inputProps={{
            type: 'number',
            label: <GreenLabel>{this.props.currencySymbol}</GreenLabel>,
            labelPosition: 'right',
            disabled: true
          }}
        />
      </>
    )
  }

  renderTableInputs = (fulfillmentType, items, arrayHelpers) => {
    return (
      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <FormattedMessage id='submitOffer.pkgAmount' defaultMessage='PKG Amount' />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='submitOffer.availableDate' defaultMessage='Available Date' />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='submitOffer.price' defaultMessage='Price' />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='submitOffer.total' defaultMessage='Total' />
            </Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {getSafe(() => items.length, '')
            ? items.map((item, index) => {
                return (
                  <Table.Row>
                    <TableCell>{this.renderQuantityInput(fulfillmentType, index)}</TableCell>
                    <TableCell>{this.renderDateInputFulfilledAt(fulfillmentType, index)}</TableCell>
                    <TableCell>{this.renderPriceInput(fulfillmentType, index)}</TableCell>
                    <TableCell>{this.renderTotal(index)}</TableCell>
                    <TableCell verticalAlign='middle' textAlign='center'>
                      {items.length > 1 && (
                        <DivIconTrash
                          onClick={async e => {
                            if (
                              getSafe(() => this.values.items[index + 1], false) &&
                              !getSafe(() => this.values.items[index + 1].total, false)
                            ) {
                              //Clear total number before remove row
                              await this.setFieldValue(`items[${index}].total`, '')
                            }

                            await arrayHelpers.remove(index)
                          }}>
                          <IconTrash />
                        </DivIconTrash>
                      )}
                    </TableCell>
                  </Table.Row>
                )
              })
            : null}
        </Table.Body>
      </Table>
    )
  }

  getPkgAmount = () => {
    const { matchingOfferInfo, popupValues } = this.props
    let result = ''
    if (
      getSafe(() => popupValues.cfHistoryLastFulfillmentType, '') === 'COMPLETE_IMMIDIATE' &&
      getSafe(() => matchingOfferInfo.automaticPackageAmount, '')
    ) {
      result = matchingOfferInfo.automaticPackageAmount
    } else if (getSafe(() => popupValues.pkgAmount, '')) {
      result = popupValues.pkgAmount
    } else if (getSafe(() => popupValues.cfHistoryLastPkgAmount, '')) {
      result = popupValues.cfHistoryLastPkgAmount
    }
    return result
  }

  render() {
    const {
      intl: { formatMessage },
      popupValues,
      isSending,
      datagrid,
      closePopup,
      purchaseRequestPending,
      options
    } = this.props
    const { columns } = this.state
    const rows = this.getRows()
    const qtyPart = getSafe(() => popupValues.unit.nameAbbreviation, '')
    const pkgAmount = this.getPkgAmount()
    return (
      <>
        <ToggleForm
          onSubmit={(values, { setSubmitting, validateForm }) => {
            setSubmitting(false)
            this.submitOffer(values, validateForm)
          }}
          validationSchema={this.validationSchema()}
          validateOnChange
          enableReinitialize
          initialValues={{
            expirationDate: getSafe(() => popupValues.expiresAt, ''),
            productName: getSafe(() => popupValues.productOffer.companyProduct.companyGenericProduct.name, ''),
            fulfillmentType: getSafe(() => popupValues.cfHistoryLastFulfillmentType, ''),
            items: [
              {
                fulfilledAt: getSafe(() => popupValues.fulfilledAt, ''),
                pkgAmount,
                pricePerUOM: getSafe(() => popupValues.pricePerUOM, '')
                  ? popupValues.pricePerUOM
                  : getSafe(() => popupValues.cfHistoryLastAveragePricePerUOM, ''),
                total:
                  getSafe(() => popupValues.pkgAmount, '') && getSafe(() => popupValues.pricePerUOM, '')
                    ? popupValues.pkgAmount * popupValues.pricePerUOM
                    : getSafe(() => popupValues.cfHistoryLastAveragePricePerUOM, '') &&
                      getSafe(() => popupValues.cfHistoryLastPkgAmount, '')
                    ? popupValues.cfHistoryLastAveragePricePerUOM * popupValues.cfHistoryLastPkgAmount
                    : ''
              }
            ]
          }}
          render={({ setFieldValue, values, submitForm, errors, setErrors, validateForm }) => {
            this.setFieldValue = setFieldValue
            this.submitForm = submitForm
            this.values = values
            this.errors = errors
            this.setErrors = setErrors
            this.validateForm = validateForm

            return (
              <>
                <Modal closeIcon onClose={closePopup} open={true} size='large'>
                  <Dimmer active={isSending} inverted>
                    <Loader />
                  </Dimmer>
                  <Modal.Header>
                    <FormattedMessage id='wantedBoard.submitOfferHeader' defaultMessage='SUBMIT OFFER' />
                  </Modal.Header>

                  <ModalContent scrolling={rows.length !== 0}>
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
                                      <FormattedMessage id='wantedBoard.maxPrice' defaultMessage='Max Price/Unit' />
                                    </List.Header>
                                    <List.Description as='span'>
                                      {popupValues.maximumPricePerUOM ? (
                                        <FormattedNumber
                                          minimumFractionDigits={2}
                                          maximumFractionDigits={2}
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
                                      <FormattedMessage
                                        id='wantedBoard.quantityNeeded'
                                        defaultMessage='Quantity Needed'
                                      />
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

                      {!this.state.nextSubmit ? (
                        <Grid>
                          <GridRow>
                            <Grid.Column>
                              <ProdexGrid
                                tableName='submit_offer_grid'
                                {...datagrid.tableProps}
                                loading={datagrid.loading || purchaseRequestPending}
                                rows={rows}
                                columns={columns}
                              />
                            </Grid.Column>
                          </GridRow>
                        </Grid>
                      ) : (
                        <Grid style={{ minHeight: '200px' }}>
                          <GridRow columns={2}>
                            <GridColumnDropdown width={8}>
                              <FormattedMessage id='submitOffer.optionToOffer' defaultMessage='Option to offer'>
                                {text => text}
                              </FormattedMessage>
                              <Required />
                              <Dropdown
                                options={options}
                                fieldProps={{
                                  'data-test': 'wanted_board_submit_offer_option_to_offer_drpdwn'
                                }}
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'submitOffer.optionToOffer.placeholder',
                                    defaultMessage: 'Select option'
                                  }),
                                  onChange: (e, data) => this.handleChange(e, data),
                                  fluid: true
                                }}
                                name='fulfillmentType'
                              />
                            </GridColumnDropdown>
                            <GridColumnInput width={8}>
                              <FormattedMessage id='submitOffer.product' defaultMessage='Product'>
                                {text => text}
                              </FormattedMessage>
                              <Required />
                              <Input
                                name='productName'
                                inputProps={{
                                  type: 'text',
                                  disabled: true,
                                  fluid: true
                                }}
                              />
                            </GridColumnInput>
                          </GridRow>
                          <FieldArray
                            name='items'
                            render={arrayHelpers => (
                              <>
                                {values.fulfillmentType === 'PARTIAL' ||
                                values.fulfillmentType === 'COMPLETE_IMMEDIATE' ? (
                                  <GridRowInputs columns={3}>
                                    <GridColumnInput>{this.renderPriceInput(values.fulfillmentType)}</GridColumnInput>
                                    <GridColumnInput>{this.renderDateInput(values.fulfillmentType)}</GridColumnInput>
                                    <GridColumnInput>
                                      {this.renderQuantityInput(values.fulfillmentType)}
                                    </GridColumnInput>
                                  </GridRowInputs>
                                ) : null}
                                {values.fulfillmentType === 'COMPLETE_SCHEDULE' && (
                                  <>
                                    <GridRowInputs>
                                      <Grid.Column>
                                        {this.renderTableInputs(values.fulfillmentType, values.items, arrayHelpers)}
                                      </Grid.Column>
                                    </GridRowInputs>
                                    <GridRowPlusIcon>
                                      <GridColumn>
                                        <DivAddInputTds
                                          onClick={e => {
                                            arrayHelpers.push({ fulfilledAt: '', pkgAmount: '', pricePerUOM: '' })
                                          }}>
                                          <DivIconPlusCircle>
                                            <IconPlusCircle />
                                          </DivIconPlusCircle>
                                        </DivAddInputTds>
                                      </GridColumn>
                                    </GridRowPlusIcon>
                                  </>
                                )}
                              </>
                            )}
                          />
                        </Grid>
                      )}
                    </>
                  </ModalContent>

                  <Modal.Actions>
                    <Grid verticalAlign='middle'>
                      <GridRow columns={3}>
                        {!this.state.nextSubmit && this.state.select !== '' && (
                          <>
                            <LeftColumn textAlign='left' width={5}>
                              {this.renderPriceInput(values.fulfillmentType)}
                            </LeftColumn>
                            <LeftColumn textAlign='left' width={7}>
                              {this.renderDateInput(values.fulfillmentType)}
                            </LeftColumn>
                          </>
                        )}
                        {this.state.select !== '' && (
                          <RightColumn width={4} floated='right'>
                            <Button basic type='button' onClick={closePopup}>
                              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span'>
                                {text => text}
                              </FormattedMessage>
                            </Button>
                            <SubmitButton
                              loading={purchaseRequestPending}
                              primary
                              type='submit'
                              onClick={this.submitForm}
                              disabled={this.state.select === '' || purchaseRequestPending}>
                              <FormattedMessage id='wantedBoard.submit' defaultMessage='Submit' tagName='span'>
                                {text => text}
                              </FormattedMessage>
                            </SubmitButton>
                          </RightColumn>
                        )}
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
    currencySymbol: '$',
    options: [
      { key: 'PARTIAL', text: 'Partial fulfillment of a request', value: 'PARTIAL' },
      {
        key: 'COMPLETE_SCHEDULE',
        text: 'Complete fulfillment of the request over a defined period of time',
        value: 'COMPLETE_SCHEDULE'
      },
      {
        key: 'COMPLETE_IMMEDIATE',
        text: 'Complete fulfillment of the request immediately',
        value: 'COMPLETE_IMMEDIATE'
      }
    ]
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(withToastManager(injectIntl(SubmitOfferPopup))))
