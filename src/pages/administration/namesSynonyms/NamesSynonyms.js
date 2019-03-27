import React, {Component} from 'react';
import './namesSynonyms.scss';
import RemoteComboBox from "../../../components/ComboBox/RemoteComboBox";
import Edit from "./components/Edit";
import { FormattedMessage, injectIntl } from 'react-intl';

class NamesSynonyms extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }

    selectProduct(product){
        this.setState({selected: product});
        this.props.fetchAlternativeNames(product.id)
    }

    render(){
        const { formatMessage } = this.props.intl;
        return (
            <div className="names-synonyms">
                <h1 className='header'>
                    <FormattedMessage
                        id='namesSynonyms'
                        defaultMessage='Names and Synonyms'
                    />
                </h1>
                <RemoteComboBox 
                    items={this.props.searchedProducts} 
                    dataFetched={this.props.productsFetched}
                    api={(text) => this.props.searchProducts(text)}
                    limit={5} 
                    placeholder={formatMessage({
                        id: 'namesSynonyms.searchProduct',
                        defaultMessage: 'Search Product'
                    })}
                    isFetching={this.props.isSearching}
                    className="admin-search"
                    getObject={(product) => this.selectProduct(product)} displayAttr="chemicalName"
                />
                <Edit selectedProduct={this.state.selected} {...this.props}/>
            </div>
        )
    }
}

export default injectIntl(NamesSynonyms);