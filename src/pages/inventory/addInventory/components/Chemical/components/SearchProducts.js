import React, {Component} from 'react';
import './SearchProducts.scss';
import RemoteComboBox from "../../../../../../components/ComboBox/RemoteComboBox";

class SearchProducts extends Component {

    render() {
        return (
            this.props.isVisible ?
            <div className="test">
                <h6>CHEMICAL SEARCH</h6>

                <RemoteComboBox items={this.props.searchedProducts} 
                    api={(text) => this.props.searchProducts(text)}
                    dataFetched={this.props.productsFetched}
                    className="cas-search" limit={5} placeholder="Search" label="CAS Search"
                    isFetching={this.props.isSearching}
                    displayName={(product) => ((product.chemicalName !== "(unknown)" ? product.chemicalName : product.casIndexName) + " · " + product.casNumber)}
                    getObject={(product) => this.props.onSelect(product)} displayAttr="chemicalName"/>

                <RemoteComboBox items={this.props.mappedProducts} api={(text) => this.props.mapProducts(text)}
                                dataFetched={this.props.mappedDataFetched}
                                isFetching={this.props.isMapping}
                                className="map-search" limit={5} placeholder="Search" label="Mapped Products Search"
                                getObject={(productTemplate) => this.props.onSelectProductMapping(productTemplate)}
                                displayAttr="productName"/>

            </div> : null
        );
    }
}


export default SearchProducts;