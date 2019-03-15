import React, { Component } from 'react'
import { Control, Errors, actions } from 'react-redux-form'
import { required, isNumber, min, messages } from "../../../../../utils/validation"
import IncrementalPricing from "./IncrementalPricing"
import CheckboxRedux from "../../../../../components/Checkbox/CheckboxRedux"
import './Pricing.scss'
import classNames from 'classnames'
import WarningLabel from "../../../../../components/WarningLabel/WarningLabel"
import { FormattedMessage, injectIntl } from 'react-intl'

class Pricing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalSalesPrice: 0,
      showIncrementalPricing: false,
      margin: '',
      price: this.props.edit ? this.props.productOffer.pricing.price : null,
      priceFlag: false,
      costFlag: false,
      marginFlag: false,
      splits: !this.props.edit ? 1 : (typeof this.props.productOffer.packaging !== 'undefined' ? this.props.productOffer.packaging.splits : 1),
      minimum: !this.props.edit ? 1 : (typeof this.props.productOffer.packaging !== 'undefined' ? this.props.productOffer.packaging.minimum : 1),
      disabled: !this.props.edit ? false : true,
      incrementalPricing: [{
        quantityFrom: '',
        quantityTo: '',
        price: '',
        margin: ''
      }]
    }
  }

  

  componentDidMount() {
    // TEMPORARY
    this.state.productLots = JSON.parse(localStorage.getItem('productLots'))

    if (this.props.edit) {
      this.setState({
        margin: this.calculateMargin(this.props.productOffer.pricing.price, this.props.productOffer.pricing.cost),
        totalSalesPrice: Number(((typeof this.props.productOffer.packaging !== 'undefined' ? this.props.productOffer.packaging.size : 0) * this.props.productOffer.pricing.price * this.props.productOffer.pkgAmount).toFixed(3))
      })
      this.validateMinimum('splits')
      this.validateMinimum('minimum')
      if (this.props.productOffer.pricing.tiers.length > 1) {
        this.props.dispatch(actions.change('forms.addProductOffer.incrementalSelected', true))
        this.setState({
          showIncrementalPricing: true,
          incrementalPricing: this.props.productOffer.pricing.tiers,
        }, () => this.validateInputs())
      }
    }
  }

  handlePriceChange(model, value) {
    this.props.dispatch(actions.change(model, value))
  }

  // checkFilledInputs(){

  //     this.setState({priceFlag:false})
  //     this.setState({costFlag:false})
  //     this.setState({marginFlag:false})

  //     if(this.props.form.pricing.cost !== ''){ this.setState({costFlag:true}); }
  //     if(this.props.form.pricing.price !== ''){ this.setState({priceFlag:true}); }
  //     if(this.state.margin !== ''){ this.setState({marginFlag:true}); }
  // }

  calculatePricing(e) {

    let price = Number(Number(this.props.form.pricing.price).toFixed(3))
    let cost = Number(Number(this.props.form.pricing.cost).toFixed(3))
    let active = e.target.name
    let activeVal = Number(Number(e.target.value).toFixed(3))

    switch (active) {
      case 'price': {
        let newmargin = this.calculateMargin(activeVal, cost)
        if (isNaN(newmargin)) {
          this.setState({ margin: '' })
        } else {
          this.setState({
            margin: newmargin,
            price: activeVal
          })
        }
        break
      }

      case 'cost': {
        let newmargin = this.calculateMargin(price, activeVal)
        let newIncrementalPricing = this.state.incrementalPricing.slice(0)

        for (let i = 0; i < newIncrementalPricing.length; i++) {
          newIncrementalPricing[i].margin = this.calculateMargin(newIncrementalPricing[i].price, activeVal)
        }

        if (isNaN(newmargin)) {
          this.setState({ margin: '' })
        } else {
          this.setState({ margin: newmargin, incrementalPricing: newIncrementalPricing })
        }
        break
      }

      case 'margin': {
        this.setState({ margin: activeVal })
        let newprice = cost + (cost * activeVal / 100)
        newprice = Number(newprice.toFixed(3))
        this.handlePriceChange('forms.addProductOffer.pricing.price', newprice)
        break
      }

      default: {
        console.log('pricing.js bad target name')
        break
      }
    }
  }


  validateInputs = () => {
    const newIncremental = this.state.incrementalPricing.slice(0)
    const splits = parseInt(this.state.splits, 10)
    newIncremental.map((item, index) => {
      const difference = item.quantityTo % splits
      const differenceFrom = item.quantityFrom % splits
      if (item.quantityFrom <= this.state.minimum) {
        item.quantityFrom = this.state.minimum
      }
      else {
        if (differenceFrom * 2 > splits)
          item.quantityFrom = item.quantityFrom - differenceFrom + splits

        else
          item.quantityFrom = item.quantityFrom - differenceFrom

      }

      if (index !== newIncremental.length - 1) {
        if (difference > splits / 2)
          item.quantityTo += splits - difference
        else
          item.quantityTo -= difference

        if (item.quantityTo !== '' && item.quantityTo <= item.quantityFrom)
          item.quantityTo = item.quantityFrom + splits
      } else {
        item.quantityTo = item.quantityFrom + splits
      }
      if (newIncremental[index + 1] !== undefined) {

        if (newIncremental[index + 1].quantityFrom <= item.quantityTo)
          newIncremental[index + 1].quantityFrom = item.quantityTo + splits
      }
      return true
    })
    this.props.getIncPricing(newIncremental)
    this.setState({ incrementalPricing: newIncremental })
  }

  validateMinimum = (form) => {
    if (form === 'minimum') {
      if (this.state.minimum < 0 || this.state.minimum === '') {
        this.setState({ minimum: '' }, () => this.disableInput())
        return
      }
      else if (this.state.splits === '') {
        return
      }
    }
    else if (form === 'splits') {
      if (this.state.splits < 1 || this.state.splits === '') {
        this.setState({ splits: '' }, () => this.disableInput())
        return
      }
      else if (this.state.minimum === '') {
        return
      }
    }
    let difference = this.state.minimum % this.state.splits
    let tmpMin = ''
    if (this.state.minimum < this.state.splits)
      tmpMin = (this.state.splits - this.state.minimum) > this.state.minimum ? 0 : this.state.splits
    else
      tmpMin = this.state.splits < 2 * difference ? this.state.minimum + this.state.splits - difference : this.state.minimum - difference
    this.setState({ minimum: tmpMin }, () => { this.disableInput(); this.validateInputs() })
  }

  splitsMinimumChange = e => {
    let newstate = {}
    newstate[e.target.className] = e.target.value ? parseInt(e.target.value, 10) : ''
    this.setState(newstate)
  }

  disableInput = () => {
    if (this.state.splits === '' || this.state.minimum === '') {
      this.setState({ disabled: true })
    }
    else
      this.setState({ disabled: false })
  }

  addNewIncrementalPricing = (e, index) => {
    e.preventDefault()
    let newIncremental = this.state.incrementalPricing.slice(0)
    newIncremental.push({
      quantityFrom: parseInt(this.state.incrementalPricing[index].quantityTo, 10) + parseInt(this.state.splits, 10),
      quantityTo: '',
      price: ''
    })
    this.setState({
      incrementalPricing: newIncremental
    })
  }

  removeIncrementalPricing = (e, index) => {
    e.preventDefault()
    this.setState({
      incrementalPricing: [...this.state.incrementalPricing.slice(0, index), ...this.state.incrementalPricing.slice(index + 1)]
    }, () => this.validateInputs())
  }

  calculateMargin = (price, cost) => {
    return Number(((Number(price) - Number(cost)) / Number(cost) * 100).toFixed(3))
  }

  handlePrice = (e, index) => {
    let value = e.target.value
    let newIncremental = this.state.incrementalPricing.slice(0)

    newIncremental[index].price = value
    newIncremental[index].margin = this.calculateMargin(value, this.props.form.pricing.cost)

    if (isNaN(newIncremental[index].margin)) { newIncremental[index].margin = '' }
    if (newIncremental[index].price !== '') { newIncremental[index].price = Number(newIncremental[index].price) }

    this.setState({
      incrementalPricing: newIncremental
    })

  }

  handleMargin = (e, index) => {
    let value = e.target.value
    let newIncremental = this.state.incrementalPricing.slice(0)

    newIncremental[index].margin = value
    newIncremental[index].price = Number((Number(this.props.form.pricing.cost) + (Number(this.props.form.pricing.cost) * value / 100)).toFixed(3))

    if (isNaN(newIncremental[index].price)) { newIncremental[index].price = '' }
    if (newIncremental[index].margin !== '') { newIncremental[index].margin = Number(newIncremental[index].margin) }

    this.setState({
      incrementalPricing: newIncremental
    })
  }

  handleChange = (e, index, type) => {
    let value = e.target.value ? parseInt(e.target.value) : ''
    let newIncremental = this.state.incrementalPricing.slice(0)
    newIncremental[index][type] = value

    this.setState({
      incrementalPricing: newIncremental
    })
  }

  render() {
    //const {
    //mappingForm: {packaging},
    //addProductOfferForm: {pricing}
    //} = this.props
    const { showIncrementalPricing, splits, minimum, disabled, incrementalPricing } = this.state

    //const measurement = packaging ? packaging.capacity : null
    //const price = this.props

    const { packaging } = this.props.mappingForm
    let pricePer, costPer, unit
    if (packaging) {
      unit = !packaging.unit ? 0 : packaging.unit
      let unitTxt = 'unit'
      for (let i = 0; i < this.props.unitOfMeasurement.length; i++) {
        if (this.props.unitOfMeasurement[i].id === unit) {
          unitTxt = this.props.unitOfMeasurement[i].nameAbbreviation
          break
        }
      }
      pricePer =
        <FormattedMessage
          id='global.pricePer'
          defaultMessage={'Price per ' + unitTxt}
          values={{ unit: unitTxt }}
        />
      costPer =
        <FormattedMessage
          id='addInventory.costPer'
          defaultMessage={'Cost per ' + unitTxt}
          values={{ unit: unitTxt }}
        />
    }
    let totalSalesPrice
    let productLots = this.state.productLots
    let productLotsPkgAmount = 0
    if (productLots) {
      for (let i = 0; i < productLots.length; i++) {
        productLotsPkgAmount += Number(productLots[i].pkgAmount)
      }
    }

    totalSalesPrice = this.props.form.pricing && this.props.mappingForm.packaging.size
      ? Number(productLotsPkgAmount * Number(this.props.form.pricing.price * Number(this.props.mappingForm.packaging.size))).formatMoney(3)
      : 0

    const { formatMessage } = this.props.intl

    let pricing =
      <div>
        <h4>
          <FormattedMessage
            id='addInventory.setPriceAndRules'
            defaultMessage='SET PRICE & RULES'
          />
        </h4>
        <div>
          <div className='group-item-wr'>
            <Errors
              className="form-error"
              model=".pricing.price"
              show="touched"
              messages={{
                required: messages.required,
                isNumber: messages.isNumber,
                min: messages.min
              }}
            />
            <label htmlFor=".pricePr">{pricePer}</label>
            <Control.text
              model=".pricing.price"
              id=".pricePr"
              validators={{
                min: (val) => min(val, 0),
                isNumber,
                required
              }}
              type='number'
              name='price'
              onChange={(e) => this.calculatePricing(e)}
              //onBlur={()=>this.checkFilledInputs()}
              disabled={!!this.state.showIncrementalPricing}
              placeholder="$"
              defaultValue={this.props.edit ? this.props.productOffer.pricing.price : ''}
              step="0.001"
            />
          </div>
          <div className='group-item-wr'>
            <Errors
              className="form-error"
              model=".pricing.cost"
              show="touched"
              messages={{
                isNumber: messages.isNumber,
                min: messages.min
              }}
            />
            <label htmlFor=".costPr">{costPer}</label>
            <Control.text
              model=".pricing.cost"
              id=".costPr"
              validators={{
                min: (val) => min(val, 0),
                isNumber
              }}
              defaultValue={this.props.edit ? this.props.productOffer.pricing.cost : ''}
              type='number'
              name='cost'
              onChange={(e) => this.calculatePricing(e)}
              //onBlur={()=>this.checkFilledInputs()}
              placeholder="$"
              step="0.001" />
          </div>


          <div className='group-item-wr'>
            <div className='gross-margin'>
              <label htmlFor=".marginPr">
                <FormattedMessage
                  id='addInventory.grossMargin'
                  defaultMessage='Gross Margin %'
                />
              </label>
              <div>
                <Control.text
                  model=".pricing.margin"
                  id=".marginPr"
                  className={classNames({ inRed: this.state.margin < 0 }, 'pricing-gross-margin')}
                  //   validators={{
                  //       min: (val) => min(val, 0),
                  //       isNumber,
                  //       //required
                  //   }}
                  value={this.state.margin}
                  type='number'
                  name='margin'
                  onChange={(e) => this.calculatePricing(e)}
                  //onBlur={()=>this.checkFilledInputs()}
                  placeholder="%"
                  step="0.001"
                />
              </div>
            </div>
          </div>
          <div className='group-item-wr'>
            <div className='total'>
              <h5>
                <FormattedMessage
                  id='addInventory.totalSalesPrice'
                  defaultMessage='Total Sales Price'
                />
              </h5>
              <output>${totalSalesPrice}</output>
            </div>
          </div>

          <div>
            <div className='group-item-wr'>
              <Errors
                className="form-error"
                model="forms.productMapping.packaging.splits"
                show="touched"
                messages={{
                  required: messages.required,
                  isNumber: messages.isNumber
                }}
              />
              <label>
                <FormattedMessage
                  id='addInventory.splits'
                  defaultMessage='Splits'
                />
              </label>
              <Control.text
                model="forms.productMapping.packaging.splits"
                id="forms.productMapping.packaging.splits"
                validators={{
                  required,
                  isNumber
                }}
                defaultValue={this.state.splits}
                onChange={e => this.splitsMinimumChange(e)}
                onBlur={() => this.validateMinimum('splits')}
                className='splits'
                type='number'
                min={'1'}
              />
            </div>
            <div className='group-item-wr'>
              <Errors
                className="form-error"
                model="forms.productMapping.packaging.minimum"
                show="touched"
                messages={{
                  required: messages.required,
                  isNumber: messages.isNumber
                }}
              />
              <label>
                <FormattedMessage
                  id='addInventory.minimum'
                  defaultMessage='Minimum'
                />
              </label>
              <Control.text
                model="forms.productMapping.packaging.minimum"
                id="forms.productMapping.packaging.minimum"
                validators={{
                  required,
                  isNumber
                }}
                defaultValue={this.state.minimum}
                onChange={e => this.splitsMinimumChange(e)}
                onBlur={() => this.validateMinimum('minimum')}
                className='minimum'
                type='number'
                min={'0'} />
            </div>
            {/*<div className='group-item-wr inputs-align'>
                            <Control.checkbox 
                                name='anonymous'
                                model='forms.addProductOffer.anonymous'
                                component={Checkbox}
                                value={true}
                                label="List Anonymously"
                            />
                      </div>*/}
          </div>

          <div>
            <div className='group-item-wr'>
              <CheckboxRedux
                name='incremental'
                label={formatMessage({
                  id: 'addInventory.tierPricing',
                  defaultMessage: 'Tier Pricing'
                })}
                defaultValue={this.state.showIncrementalPricing}
                dispatch={this.props.dispatch}
                model={'forms.addProductOffer.incrementalSelected'}
                onChange={value => this.setState({ showIncrementalPricing: value })} />
            </div>
          </div>

          <div>
            <WarningLabel
              class={'warningBody3'}
              isVisible={this.state.showIncrementalPricing && (this.state.splits === '' || this.state.minimum === '')}
              warningText={formatMessage({
                id: 'addInventory.warning',
                defaultMessage: 'Please enter allowed Split and Minimum values first.'
              })}
            />
          </div>

          {showIncrementalPricing && <div className='incremental-wr'>
            <IncrementalPricing
              pricePer={pricePer}
              cost={this.props.form.pricing.cost}
              splits={splits}
              minimum={minimum}
              disabled={disabled}
              incrementalPricing={incrementalPricing}
              addNewIncrementalPricing={this.addNewIncrementalPricing}
              removeIncrementalPricing={this.removeIncrementalPricing}
              handleChange={this.handleChange}
              handlePrice={this.handlePrice}
              handleMargin={this.handleMargin}
              calculateMargin={this.calculateMargin}
              validateInputs={this.validateInputs}
            />
          </div>}
        </div>
      </div>

    return (pricing)
  }
}

export default injectIntl(Pricing)