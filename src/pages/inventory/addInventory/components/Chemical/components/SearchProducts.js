import React, {Component} from 'react'
import './SearchProducts.scss'
import RemoteComboBox from '../../../../../../components/ComboBox/RemoteComboBox'
import InfoLabel from './InfoLabel.js'
import {FormattedMessage, injectIntl} from 'react-intl'

class SearchProducts extends Component {
  render() {
    const {formatMessage} = this.props.intl
    return this.props.isVisible ? (
      <div className='test'>
        <h4>
          <FormattedMessage id='addInventory.chemicalSearch' defaultMessage='CHEMICAL SEARCH' />
        </h4>

        <RemoteComboBox
          id='cas-search'
          scroll={this.props.scroll}
          items={this.props.searchedProducts}
          api={text => this.props.searchProducts(text)}
          dataFetched={this.props.productsFetched}
          className='cas-search'
          limit={5}
          placeholder={formatMessage({
            id: 'addInventory.search',
            defaultMessage: 'Search'
          })}
          label={formatMessage({
            id: 'addInventory.casNumberProductSearch',
            defaultMessage: 'CAS Number / Product Search'
          })}
          isFetching={this.props.isSearching}
          displayName={product =>
            (product.chemicalName !== '(unknown)' ? product.chemicalName : product.casIndexName) +
            ' · ' +
            product.casNumber
          }
          getObject={product => this.props.onSelect(product)}
          displayAttr='chemicalName'
        />

        <RemoteComboBox
          id='map-search'
          scroll={this.props.scroll}
          items={this.props.mappedProducts}
          api={text => this.props.mapProducts(text)}
          dataFetched={this.props.mappedDataFetched}
          isFetching={this.props.isMapping}
          className='map-search'
          limit={5}
          placeholder={formatMessage({
            id: 'addInventory.search',
            defaultMessage: 'Search'
          })}
          label={formatMessage({
            id: 'addInventory.mappedProductsSearch',
            defaultMessage: 'Mapped Products Search'
          })}
          getObject={productTemplate => this.props.onSelectProductMapping(productTemplate)}
          displayAttr='productName'
        />

        <InfoLabel />
      </div>
    ) : null
  }
}

export default injectIntl(SearchProducts)
