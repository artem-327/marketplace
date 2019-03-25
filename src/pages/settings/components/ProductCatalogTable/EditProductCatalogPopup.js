import React from 'react' 
import { connect } from 'react-redux' 
import { Control, Form } from 'react-redux-form'

import { handleEditPopup, handleSubmitEditPopup, getProductsWithRequiredParam } from '../../actions' 

class EditProductCatalogPopup extends React.Component {
  state = {
    searchProductInputValue: '',
    productName: '',
    productNumber: '',
    productId: '',
    packagingType: '',
    packagingSize: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.searchProductInputValue !== prevState.searchProductInputValue) {
      if(this.state.searchProductInputValue.length < 3) return;
      this.props.getProductsWithRequiredParam(this.state.searchProductInputValue)
    }
  }

  handleSearchInputValue = e => {
    this.setState({
      searchProductInputValue: e.target.value
    })
  }

  handleProductInputsValue = stateKey => e => {
    this.setState({
      [stateKey]: e.target.value
    })
  }

  handleChosenProduct = (e) => {
    const targetId = Number(e.target.getAttribute('data-id')) 
    this.props.editPopupSearchProducts.forEach(item => {
      if(item.id === targetId){
        return this.setState({
          searchProductInputValue: item.productName,
          productName: item.productName,
          productNumber: item.productNumber === undefined ? '' : item.productNumber,
          productId: item.productId,
          packagingType: item.packagingType,
          packagingSize: item.packagingSize
        })
      }
    })
  }

  handleProductsRequest = e => {
    if(e.target.value.length < 3) return 
    this.props.getProductsWithRequiredParam(e.target.value) 
  }

  render() {
    const { handleEditPopup, handleSubmitEditPopup, popupValues, editPopupSearchProducts } = this.props 
    const {
      productName,
      productNumber,
      productId,
      packagingType,
      packagingSize,
      searchProductInputValue
    } = this.state 

    return (					
      <div className="popup-wrapper col-xs-10 center-xs">      
        <Form 
          model="forms.settingsPopup.editBankAccount" 
          onSubmit={(value) => handleSubmitEditPopup(value, popupValues.branchId)}
          className="b-popup col-xs-8"
        >    
          <h2>{'Warehouse'} Profile</h2>
          <ul className="">
            <li className="inputs-wrapper">
              <label className="b-product-search settings-popup-label" htmlFor="product-search">
                CAS Number / Product Search
                <input 
                  className="popup-input" 
                  id="product-search" 
                  value={ searchProductInputValue }
                  onChange={ e => this.handleSearchInputValue(e) || this.handleProductsRequest(e) }
                  autoComplete="off"
                />
                {
                  editPopupSearchProducts.length !== 0 ? 
                  <ul className="b-product-search__found-products">
                    {
                      editPopupSearchProducts.map(product => {
                        return (
                          <li
                            className="product-item" 
                            value={ product.productName }
                            key={ product.id }
                            data-id={ product.id }
                            onClick={ e => this.handleChosenProduct(e) }
                          >
                            { product.productName }
                          </li>
                        )
                      })
                    }
                  </ul> 
                  : null
                }
              </label>            
            </li>
            <li className="inputs-wrapper">
              <label className="settings-popup-label name" htmlFor="product-name">                        
                Product Name
                <Control.text model=".accountHolderName" className="popup-input" id="product-name" value={ productName } onChange={ this.handleProductInputsValue('productName') } />
              </label>
              <label className="settings-popup-label address" htmlFor="product-number">
                Product Number
                <Control.text model=".accountHolderType" className="popup-input" id="product-number" value={ productNumber } onChange={ this.handleProductInputsValue('productNumber') } />
              </label>
              <label className="settings-popup-label city" htmlFor="product-id">
                Product ID
                <Control.text model=".accountNumber" className="popup-input" id="product-id" value={ productId } onChange={ this.handleProductInputsValue('productId') } />
              </label>
            </li>
            <li className="inputs-wrapper">
              <label className="settings-popup-label state" htmlFor="product-packaging-type">  
                Packaging Type
                <Control.text model=".country" className="popup-input" id="product-packaging-type" value={ packagingType } onChange={ this.handleProductInputsValue('packagingType') } />
              </label>
              <label className="settings-popup-label zip-code" htmlFor="product-packaging-size">
                Packaging Size
                <Control.text model=".currency" className="popup-input" id="product-packaging-size" value={ packagingSize } onChange={ this.handleProductInputsValue('packagingSize') } />
              </label>
            </li>
            <li className="inputs-wrapper buttons-wrapper">
              <input 
                type="button" 
                value="Cancel"
                onClick={ handleEditPopup }
                className="cancel-popup-btn"
              />
              <button className="submit-popup-btn" >Save</button> 
            </li>
          </ul>
        </Form>
      </div>
    )     
  }
}

const mapDispatchToProps = {   
  handleEditPopup,
  handleSubmitEditPopup,
  getProductsWithRequiredParam
} 

const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    editPopupSearchProducts: state.settings.editPopupSearchProducts
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProductCatalogPopup) 