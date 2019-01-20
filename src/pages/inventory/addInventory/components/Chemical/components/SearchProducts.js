import React, {Component} from 'react';
import './SearchProducts.css';
import RemoteComboBox from "../../../../../../components/ComboBox/RemoteComboBox";
import InfoLabel from "./InfoLabel.js";
import {FormattedMessage, injectIntl} from 'react-intl';

class SearchProducts extends Component {

    render() {
        const { formatMessage } = this.props.intl;
        return (
            this.props.isVisible ?
            <div className="test">
                <h4>
                    <FormattedMessage
                        id='addInventory.chemicalSearch'
                        defaultMessage='CHEMICAL SEARCH'
                    />
                </h4>

                <RemoteComboBox
                    items={this.props.searchedProducts}
                    api={(text) => this.props.searchProducts(text)}
                    dataFetched={this.props.productsFetched}
                    className="cas-search"
                    limit={5}
                    placeholder={formatMessage({id: 'addInventory.search'})}
                    label={formatMessage({id: 'addInventory.casNumberProductSearch'})}
                    isFetching={this.props.isSearching}
                    displayName={(product) => (
                        (product.chemicalName !== "(unknown)" ?
                            product.chemicalName
                            : product.casIndexName) + " · " + product.casNumber
                    )}
                    getObject={(product) => this.props.onSelect(product)} displayAttr="chemicalName"/>

                <RemoteComboBox
                    items={this.props.mappedProducts}
                    api={(text) => this.props.mapProducts(text)}
                    dataFetched={this.props.mappedDataFetched}
                    isFetching={this.props.isMapping}
                    className="map-search"
                    limit={5}
                    placeholder={formatMessage({id: 'addInventory.search'})}
                    label={formatMessage({id: 'addInventory.mappedProductsSearch'})}
                    getObject={(productTemplate) => this.props.onSelectProductMapping(productTemplate)}
                    displayAttr="productName"/>

                <InfoLabel />

            </div> : null
        );
    }
}


export default injectIntl(SearchProducts);