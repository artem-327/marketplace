import React, {Component} from 'react';
import ProductOffering from "./components/ProductOffering";
import ProductMapping from "./components/ProductMapping";
import AddedLots from "./components/AddedLots/AddedLots";
import SearchProducts from './components/SearchProducts';
import AdditionalDocuments from "./components/AdditionalDocuments";

class Chemical extends Component {
    constructor(props) {
        super(props);
        this.setProductMapping = this.setProductMapping.bind(this);
        this.state = {
            selectedProduct: null,
            selectedProductMapping: null,
            productID: null,
            lots: []
        }
    }

    componentDidMount() {
        // if (localStorage.getItem('productLots')) {
        //     this.setState({lots: JSON.parse(localStorage.getItem('productLots'))})
        // }
        localStorage.clear()

        if (this.props.edit) {
            this.setState({productID: this.props.productOffer.product.id})
        }
    }

    setProductMapping(mapping) {
        this.setState({selectedProductMapping: mapping, productID: mapping.product.id}, () => {
            let inputs = {
                indexName: this.state.selectedProductMapping.product.casIndexName,
                casNumber: this.state.selectedProductMapping.product.casNumber,
                productName: this.state.selectedProductMapping.productName,
                productNumber: this.state.selectedProductMapping.productNumber,
                chemicalName: this.state.selectedProductMapping.product.chemicalName,
                packaging:{
                    unit: this.state.selectedProductMapping.packaging.unit.id,
                    packagingType: this.state.selectedProductMapping.packaging.packagingType.id,
                    size: this.state.selectedProductMapping.packaging.size
                }
            };
            this.props.setMapping(inputs);
        })
    }

    setSelectedProduct(product){
        this.setState({selectedProduct: product, productID: product.id}, () => {
            let inputs = {
                indexName: this.state.selectedProduct.casIndexName,
                casNumber: this.state.selectedProduct.casNumber,
                chemicalName: this.state.selectedProduct.chemicalName,
            };
            this.props.setMapping(inputs);
        })
    }

    addLot(lots){
        let productMapping = Object.assign({}, this.props.productMapping, {
            packaging: {...this.props.productMapping.packaging, amount: lots.pkgAmount},
        });
        if(!localStorage.getItem('productLots')){
            let values = [{...lots, ...productMapping, product: this.state.productID}];
            localStorage.setItem('productLots', JSON.stringify(values));
            this.setState({lots: values});
            this.props.addLotSaveOffering();

        }else{
            let newLots = JSON.parse(localStorage.getItem('productLots'));
            newLots.push({...lots, ...productMapping, product: this.state.productID});
            localStorage.setItem('productLots', JSON.stringify(newLots));
            this.setState({lots: newLots});
            this.props.addLotSaveOffering();
        }
    }

    removeLots(index){
        let newLots = JSON.parse(localStorage.getItem('productLots'));
        newLots.splice(index, 1);
        localStorage.setItem('productLots', JSON.stringify(newLots));
        this.setState({lots: newLots})
    }

    render() {

        //console.log(this.props)
        return (
            <div>
                {!this.props.edit ?
                <React.Fragment>
                    <SearchProducts
                        selectedMapping={this.state.selectedProductMapping}
                        selectedProduct={this.state.selectedProduct}
                        isVisible={true}
                        onSelectProductMapping={mapping => this.setProductMapping(mapping)}
                        onSelect={product => this.setSelectedProduct(product)}
                        {...this.props}
                    />
                </React.Fragment>
                : null
                }
                <ProductMapping
                    productID={this.state.productID}
                    {...this.props}
                />
                <ProductOffering
                    addLot={(lots) => this.addLot(lots)}
                    {...this.props}
                />
                {/* {!this.props.edit ? */}
                <AddedLots
                    lots={this.state.lots}
                    removeLot={(index) => this.removeLots(index)}
                    {...this.props}
                />
                {/* : null
                } */}
                <AdditionalDocuments/>
            </div>
        );
    }
}

export default Chemical;