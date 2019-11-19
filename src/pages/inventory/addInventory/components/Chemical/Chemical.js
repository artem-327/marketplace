import React, {Component} from 'react'
import ProductOffering from './components/ProductOffering'
import ProductMapping from './components/ProductMapping'
import AddedLots from './components/AddedLots/AddedLots'
import SearchProducts from './components/SearchProducts'
import AdditionalDocuments from './components/AdditionalDocuments'

class Chemical extends Component {
  constructor(props) {
    super(props)
    this.setProductMapping = this.setProductMapping.bind(this)
    this.handleArrow = this.handleArrow.bind(this)
    this.state = {
      selectedProduct: null,
      selectedProductMapping: null,
      productID: null,
      lots: [],
      scroll: -1
    }
  }

  componentDidMount() {
    // if (localStorage.getItem('productLots')) {
    //     this.setState({lots: JSON.parse(localStorage.getItem('productLots'))})
    // }

    localStorage.removeItem('productLots')

    if (this.props.edit && this.props.productOffer.lots) {
      this.setState({lots: this.props.productOffer.lots})
      localStorage.setItem('productLots', JSON.stringify(this.props.productOffer.lots))
    }

    if (this.props.edit && typeof this.props.productOffer.product !== 'undefined') {
      this.setState({productID: this.props.productOffer.product.id})
    }

    if (this.props.edit) return
    document.getElementById('cas-search').addEventListener('keyup', this.handleArrow, false)
    document.getElementById('map-search').addEventListener('keyup', this.handleArrow, false)
  }

  componentWillUnmount() {
    if (this.props.edit) return
    document.getElementById('cas-search').removeEventListener('keyup', this.handleArrow, false)
    document.getElementById('map-search').addEventListener('keyup', this.handleArrow, false)
  }

  handleArrow(e) {
    e.preventDefault()

    if (this.props.edit) return

    if (e.keyCode !== 40 && e.keyCode !== 38) {
      this.setState(prevState => ({
        scroll: -1
      }))
      return
    }

    // this.props.isFetchingManufacturer || this.props.isFetchingOrigin
    if (this.props.isSearching || this.props.isMapping) {
      this.setState(prevState => ({
        scroll: -1
      }))
      return
    }

    if (this.props.searchedProducts.length === 0 && e.target.id === 'cas-search') {
      this.setState(prevState => ({
        scroll: -1
      }))
      return
    }

    if (this.props.mappedProducts.length === 0 && e.target.id === 'map-search') {
      this.setState(prevState => ({
        scroll: -1
      }))
      return
    }

    if (!document.getElementsByClassName('combo-results')[0]) return
    const cr = document.getElementsByClassName('combo-results')[0].childElementCount

    let comboItemsHeight = 0
    for (let i = 0; i < cr; i++) {
      comboItemsHeight += document.getElementsByClassName('combo-item')[i].offsetHeight
    }

    if (e.keyCode === 40 && this.state.scroll === cr - 1) {
      document.getElementsByClassName('combo-results')[0].scrollTop = 0
      this.setState(prevState => ({
        scroll: -1
      }))
      document.getElementsByClassName('combo-results')[0].scrollTop = 0
    } else if (e.keyCode === 38 && this.state.scroll === 0) {
      this.setState(prevState => ({
        scroll: -1
      }))
    } else if (e.keyCode === 40 && this.state.scroll < cr) {
      const prev = document.getElementsByClassName('combo-item')[this.state.scroll]
      if (prev) {
        document.getElementsByClassName('combo-results')[0].scrollTop += prev.offsetHeight
      }
      this.setState(prevState => ({
        scroll: prevState.scroll + 1
      }))
    } else if (e.keyCode === 38 && this.state.scroll > 0) {
      const prev = document.getElementsByClassName('combo-item')[this.state.scroll - 1]
      if (prev) {
        document.getElementsByClassName('combo-results')[0].scrollTop -= prev.offsetHeight
      }
      this.setState(prevState => ({
        scroll: prevState.scroll - 1
      }))
    }
  }

  setProductMapping(mapping) {
    this.setState({selectedProductMapping: mapping, productID: mapping.product.id}, () => {
      let inputs = {
        indexName: this.state.selectedProductMapping.product.casIndexName,
        casNumber: this.state.selectedProductMapping.product.casNumber,
        productName: this.state.selectedProductMapping.productName,
        productCode: this.state.selectedProductMapping.productCode,
        chemicalName: this.state.selectedProductMapping.product.chemicalName,
        packaging: {
          unit: this.state.selectedProductMapping.packaging.unit.id,
          packagingType: this.state.selectedProductMapping.packaging.packagingType.id,
          size: this.state.selectedProductMapping.packaging.size
        }
      }
      this.props.setMapping(inputs)
    })
  }

  setSelectedProduct(product) {
    this.setState({selectedProduct: product, productID: product.id}, () => {
      let inputs = {
        indexName: this.state.selectedProduct.casIndexName,
        casNumber: this.state.selectedProduct.casNumber,
        chemicalName: this.state.selectedProduct.chemicalName
      }
      this.props.setMapping(inputs)
    })
  }

  addLot(lots) {
    let productMapping = Object.assign({}, this.props.productMapping, {
      packaging: {...this.props.productMapping.packaging, amount: lots.pkgAmount}
    })
    if (!localStorage.getItem('productLots')) {
      let values = [{...lots, ...productMapping, product: this.state.productID}]
      localStorage.setItem('productLots', JSON.stringify(values))
      this.setState({lots: values})
      this.props.addLotSaveOffering()
    } else {
      let newLots = JSON.parse(localStorage.getItem('productLots'))
      newLots.push({...lots, ...productMapping, product: this.state.productID})
      localStorage.setItem('productLots', JSON.stringify(newLots))
      this.setState({lots: newLots})
      this.props.addLotSaveOffering()
    }
  }

  removeLots(index) {
    let newLots = JSON.parse(localStorage.getItem('productLots'))
    newLots.splice(index, 1)
    localStorage.setItem('productLots', JSON.stringify(newLots))
    this.setState({lots: newLots})
  }

  render() {
    return (
      <div>
        {!this.props.edit ? (
          <React.Fragment>
            <SearchProducts
              selectedMapping={this.state.selectedProductMapping}
              selectedProduct={this.state.selectedProduct}
              isVisible={true}
              onSelectProductMapping={mapping => this.setProductMapping(mapping)}
              onSelect={product => this.setSelectedProduct(product)}
              scroll={this.state.scroll}
              {...this.props}
            />
          </React.Fragment>
        ) : null}
        <ProductMapping productID={this.state.productID} {...this.props} />
        <ProductOffering addLot={lots => this.addLot(lots)} {...this.props} />
        <AddedLots lots={this.state.lots} removeLot={index => this.removeLots(index)} {...this.props} />
        <AdditionalDocuments {...this.props} />
      </div>
    )
  }
}

export default Chemical
