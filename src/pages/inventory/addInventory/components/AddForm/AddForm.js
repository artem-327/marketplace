import React, { Component } from 'react'
import AddGroup from '../AddGroup'
import { Form } from 'react-redux-form'
import Pricing from './Pricing'
import Location from './Location'
import classnames from 'classnames'
import Chemical from '../Chemical'
import { FormattedMessage } from 'react-intl'
import { checkToken } from '../../../../../utils/auth'

export default class AddForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProduct: {},
      incrementalPricing: [
        {
          quantityFrom: '',
          quantityTo: '',
          price: ''
        }
      ]
    }

    this.cancelEdit = this.cancelEdit.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.props.fetchWarehouses()
    this.props.fetchLocations()
  }

  componentWillUnmount() {
    this.props.resetForm('forms.addProductOffer')
  }

  uploadDocuments(productOffer) {
    let productOfferId = productOffer.value.data
    let attachments = JSON.parse(localStorage.getItem('attachments'))
    if (attachments && attachments.length) {
      attachments = attachments.filter(attachment => {
        return attachment && attachment.preview
      })
    }

    var attSuccesses = 0
    var attErrors = 0
    var attActions = attachments ? attachments.length : 0

    if (attActions > 0) {
      for (let at = 0; at < attachments.length; at++) {
        if (attachments[at] && attachments[at].preview) {
          this.props
            .linkAttachment(
              attachments[at].lot ? true : false,
              attachments[at].lot ? attachments[at].lot : productOfferId,
              attachments[at].attachmentId
            )
            .then(r => {
              attSuccesses++
              this.checkUploadDocumentsStatus(attActions, attSuccesses, attErrors)
            })
            .catch(e => {
              attErrors++
              this.checkUploadDocumentsStatus(attActions, attSuccesses, attErrors)
            })
        }
      }
    } else {
      this.props.history.push('/inventory/my-inventory')
    }
  }

  checkUploadDocumentsStatus(attActions, attSuccesses, attErrors) {
    console.log('Attachments: ' + attActions + '; Successes: ' + attSuccesses + '; Errors: ' + attErrors)
    if (attActions === attSuccesses) {
      this.props.history.push('/inventory/my-inventory')
    } else if (attActions === attSuccesses + attErrors) {
      console.log('not all Attachments were saved :-/')
    }
  }

  addProductOfferTimeout = async inputs => {
    document.getElementById('form-mapping').classList.add('validate-only')
    document.getElementById('mapping-btn').click()

    document.getElementById('form-offering').classList.add('validate-only')
    document.getElementById('offering-btn').click()

    setTimeout(
      function () {
        this.addProductOffer(inputs)
      }.bind(this),
      2000
    )
  }

  addProductOffer(inputs) {
    if (checkToken(this.props)) return

    if (!this.props.productMappingValidation || typeof localStorage.productLots === 'undefined') {
      if (document.getElementsByClassName('form-error').length) {
        document.getElementsByClassName('form-error')[0].scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
      return
    }

    let newPricing = inputs['pricing']
    if (inputs['incrementalSelected']) {
      newPricing = { ...inputs['pricing'], tiers: this.validateIncPricing() }
    } else {
      newPricing = { ...inputs['pricing'], tiers: [] }
    }

    let newTiers = newPricing.tiers || []
    for (let i = 0; i < newTiers.length; i++) {
      delete newTiers[i].margin
      delete newTiers[i].id
    }

    const localLots = JSON.parse(localStorage.getItem('productLots'))
    let lots = []

    for (let i = 0; i < localLots.length; i++) {
      lots.push({
        //id: i,
        pkgAmount: Number(localLots[i].pkgAmount),
        //originalPkgAmount: Number(localLots[i].pkgAmount),
        quantity: Number(this.props.mappingForm.packaging.size) * Number(localLots[i].pkgAmount),
        lotNumber: localLots[i].lotNumber,
        expirationDate:
          typeof localLots[i].expirationDate !== 'undefined'
            ? localLots[i].expirationDate.includes('T')
              ? localLots[i].expirationDate
              : `${localLots[i].expirationDate}T00:00:00Z`
            : null,
        manufacturedDate:
          typeof localLots[i].creationDate !== 'undefined'
            ? localLots[i].creationDate.includes('T')
              ? localLots[i].creationDate
              : `${localLots[i].creationDate}T00:00:00Z`
            : null
      })
    }

    //lots.splice(-1, 1);

    let params = Object.assign({}, inputs, {
      ...this.props.mappingForm,
      ...this.props.productOfferingForm,
      productGrades: [{ id: this.props.productOfferingForm.productGrade }],
      anonymous: false,
      assayMin: parseInt(this.props.productOfferingForm.assayMin),
      assayMax: parseInt(this.props.productOfferingForm.assayMax),
      pricing: {
        ...this.props.addProductOfferForm.pricing,
        price: parseFloat(Number(this.props.addProductOfferForm.pricing.price).toFixed(3)),
        cost: parseFloat(Number(this.props.addProductOfferForm.pricing.cost).toFixed(3)),
        tiers: newTiers
      },
      lots: lots,
      manufacturer:
        typeof this.props.productOfferingForm.manufacturer !== 'undefined'
          ? this.props.productOfferingForm.manufacturer.id
          : this.props.edit
          ? this.props.productOffer.manufacturer.id
          : '',
      origin:
        typeof this.props.productOfferingForm.origin !== 'undefined'
          ? this.props.productOfferingForm.origin.id
          : this.props.edit
          ? this.props.productOffer.origin.id
          : '',
      product: parseInt(this.props.mappingForm.casNumber.replace(/-/g, '')),
      packaging: {
        ...this.props.mappingForm.packaging,
        size: parseInt(this.props.mappingForm.packaging.size),
        originalPkgAmount: parseInt(this.props.productOfferingForm.pkgAmount)
      }
    })

    delete params.packaging.splits
    delete params.packaging.minimum

    delete params.creationDate
    delete params.expirationDate
    delete params.casNumber
    delete params.chemicalName
    delete params.indexName
    delete params.lotNumber
    delete params.pkgAmount
    //delete params.productName;
    //delete params.productCode;
    delete params.productGrade

    this.props.addProductOffer(params).then(productOffer => {
      this.uploadDocuments(productOffer)
    })
  }

  validateIncPricing() {
    let tmp = this.state.incrementalPricing.filter(data => data.quantityFrom !== '' && data.price !== '')
    return tmp
  }

  getIncPricing(data) {
    this.setState({ incrementalPricing: data }, () => this.validateIncPricing())
  }

  editProductOfferTimeout = async inputs => {
    document.getElementById('form-mapping').classList.add('validate-only')
    document.getElementById('form-mapping').submit()

    document.getElementById('form-offering').classList.add('validate-only')
    document.getElementById('offering-btn').click()

    setTimeout(
      function () {
        this.editProductOffer(inputs)
      }.bind(this),
      2000
    )
  }

  editProductOffer(inputs) {
    if (checkToken(this.props)) return

    if (!this.props.productMappingValidation || typeof localStorage.productLots === 'undefined') {
      if (document.getElementsByClassName('form-error').length) {
        document.getElementsByClassName('form-error')[0].scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
      return
    }

    let newPricing = inputs['pricing']
    if (inputs['incrementalSelected']) {
      newPricing = { ...inputs['pricing'], tiers: this.validateIncPricing() }
    } else {
      newPricing = { ...inputs['pricing'], tiers: [] }
    }

    let newTiers = newPricing.tiers || []
    for (let i = 0; i < newTiers.length; i++) {
      delete newTiers[i].margin
      delete newTiers[i].id
    }

    const localLots = JSON.parse(localStorage.getItem('productLots'))
    let lots = []

    for (let i = 0; i < localLots.length; i++) {
      lots.push({
        //id: i,
        pkgAmount: Number(localLots[i].pkgAmount),
        //originalPkgAmount: Number(localLots[i].pkgAmount),
        quantity: Number(this.props.mappingForm.packaging.size) * Number(localLots[i].pkgAmount),
        lotNumber: localLots[i].lotNumber,
        expirationDate:
          typeof localLots[i].expirationDate !== 'undefined'
            ? localLots[i].expirationDate.includes('T')
              ? localLots[i].expirationDate
              : `${localLots[i].expirationDate}T00:00:00Z`
            : null,
        manufacturedDate:
          typeof localLots[i].creationDate !== 'undefined'
            ? (localLots[i].creationDate && localLots[i].creationDate.includes('T')) ||
              (localLots[i].manufacturedDate && localLots[i].manufacturedDate.includes('T'))
              ? localLots[i].creationDate || localLots[i].manufacturedDate
              : `${localLots[i].creationDate}T00:00:00Z` || `${localLots[i].manufacturedDate}T00:00:00Z`
            : null
      })
    }

    let params = Object.assign({}, inputs, {
      ...this.props.mappingForm,
      ...this.props.productOfferingForm,
      productGrades: [{ id: this.props.productOfferingForm.productGrade }],
      anonymous: false,
      pricing: {
        ...this.props.addProductOfferForm.pricing,
        price: parseFloat(Number(this.props.addProductOfferForm.pricing.price).toFixed(3)),
        cost: parseFloat(Number(this.props.addProductOfferForm.pricing.cost).toFixed(3)),
        tiers: newTiers
      },
      lots: lots,
      manufacturer:
        typeof this.props.productOfferingForm.manufacturer !== 'undefined'
          ? this.props.productOfferingForm.manufacturer.id
          : typeof this.props.productOffer.manufacturer !== 'undefined'
          ? this.props.productOffer.manufacturer.id
          : '',
      origin:
        typeof this.props.productOfferingForm.origin !== 'undefined'
          ? this.props.productOfferingForm.origin.id
          : typeof this.props.productOffer.origin !== 'undefined'
          ? this.props.productOffer.origin.id
          : '',
      product: typeof this.props.productOffer.product !== 'undefined' ? this.props.productOffer.product.id : '',
      packaging: { ...this.props.mappingForm.packaging }
    })

    delete params.creationDate
    delete params.expirationDate

    this.props.editProductOffer(this.props.productOffer.id, params).then(productOffer => {
      this.uploadDocuments(productOffer)
    })

    delete params.casNumber
    delete params.chemicalName
    delete params.indexName
    delete params.pkgAmount
    delete params.productGrade
  }

  cancelEdit() {
    this.props.history.push('/inventory/my-inventory')
  }

  render() {
    let cancelButton = this.props.edit ? (
      <button
        onClick={this.cancelEdit}
        className={classnames('button add-inventory big')}
        data-test='add_inventory_cancel_edit_btn'>
        <FormattedMessage id='addInventory.cancelEdit' defaultMessage='Cancel Edit' />
      </button>
    ) : null
    let submitButton = (
      <button
        disabled={this.props.disable}
        className={classnames('button add-inventory big', { disabled: this.props.disable })}
        data-test='add_inventory_submit_edit_btn'>
        <FormattedMessage id='addInventory.save' defaultMessage='Save' />
      </button>
    )
    return (
      <div className={classnames('add-inventory', { disable: this.props.disable })}>
        <Form
          model='forms.addProductOffer'
          onSubmit={inputs =>
            this.props.edit ? this.editProductOfferTimeout(inputs) : this.addProductOfferTimeout(inputs)
          }>
          <AddGroup
            header='chemical'
            component={<Chemical {...this.props} edit={this.props.edit} resetForm={this.props.resetForm} />}
          />
          <AddGroup
            header='pricing'
            disable={this.props.disable}
            component={<Pricing {...this.props} getIncPricing={data => this.getIncPricing(data)} />}
          />
          <AddGroup header='warehouse' disable={this.props.disable} component={<Location {...this.props} />} />
          {submitButton}
        </Form>
        {cancelButton}
      </div>
    )
  }
}
