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
        this.handleArrow = this.handleArrow.bind(this);
        this.state = {
            selectedProduct: null,
            selectedProductMapping: null,
            productID: null,
            lots: [],
            scroll: -1
        }
    }

    componentDidMount() {
        if (localStorage.getItem('productLots')) {
            this.setState({lots: JSON.parse(localStorage.getItem('productLots'))})
        }
        if (this.props.edit) {
            this.setState({productID: this.props.productOffer.product.id})
        }
    }

    componentWillMount() {
        // set to element ?
        document.addEventListener("keyup", this.handleArrow, false);
    }

    componentWillUnmount() {
        // set to element ?
        document.removeEventListener('keyup', this.handleArrow, false);
    }

    handleArrow(e) {
        e.preventDefault();

        if (e.keyCode !== 40 && e.keyCode !== 38) {
            this.setState(prevState => ({
                scroll: -1
            }));
            return;
        }

        const cr = document.getElementsByClassName("combo-results")[0].childElementCount;

        let comboItemsHeight = 0;
        for (let i = 0; i < cr; i++) {
            comboItemsHeight += document.getElementsByClassName("combo-item")[i].offsetHeight;
        }

        let coeff;

        switch(true) {
            case comboItemsHeight < 500:
                coeff = 0.5;
                break;
            /*
            case comboItemsHeight < 1000:
                coeff = 0.6;
                break;
            case comboItemsHeight < 1500:
                coeff = 0.65;
                break;
            */
            case comboItemsHeight < 2000:
                coeff = 0.6;
                break;
            case comboItemsHeight > 2000:
                coeff = 0.7;
                break;
            default:
                coeff = 0;
        }

        console.log(coeff);
        console.log(comboItemsHeight);

        if(cr > 5) {
            // console.log("cr > 5");
            document.getElementById("cas-search").blur();
            document.getElementsByClassName("combo-results")[0].focus();
        }

        if (e.keyCode === 40 && this.state.scroll === cr) {
            // console.log('end of scroll');
            document.getElementById("root").blur();
            document.getElementsByClassName("combo-results")[0].scrollTop = 0;
            this.setState(prevState => ({
                scroll: 0
            }));
            document.getElementsByClassName("combo-results")[0].blur();
            document.getElementById("cas-search").focus();
        } else if (e.keyCode === 38 && this.state.scroll === 0) {
            this.setState(prevState => ({
                scroll: 0
            }));
            document.getElementsByClassName("combo-results")[0].blur();
            document.getElementById("cas-search").focus();
        }
        else if (e.keyCode === 40 && this.state.scroll < cr) {
            const prev = document.getElementsByClassName("combo-item")[this.state.scroll];
            if (prev) {
                document.getElementsByClassName("combo-results")[0].scrollTop += coeff*prev.offsetHeight;
            }
            console.log("scroll down " + this.state.scroll);
            this.setState(prevState => ({
                scroll: prevState.scroll+1
            }));
        } else if (e.keyCode === 38 && this.state.scroll > 0){
            // console.log("scroll up " + this.state.scroll);
            document.getElementsByClassName("combo-results")[0].focus();
            this.setState(prevState => ({
                scroll: prevState.scroll-1
            }));
        } else {
            document.getElementById("cas-search").focus();
            this.setState(prevState => ({
                scroll: 0
            }));
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
        return (
            <div>
                {!this.props.edit ?
                <React.Fragment>
                    <SearchProducts selectedMapping={this.state.selectedProductMapping}
                                    selectedProduct={this.state.selectedProduct}
                                    isVisible={true}
                                    onSelectProductMapping={mapping => this.setProductMapping(mapping)}
                                    onSelect={product => this.setSelectedProduct(product)}
                                    scroll={this.state.scroll}
                                    {...this.props}
                    />
                </React.Fragment> : null }
                <ProductMapping productID={this.state.productID} {...this.props} />
                <ProductOffering addLot={(lots) => this.addLot(lots)} {...this.props} />
                {!this.props.edit ?
                <AddedLots lots={this.state.lots} removeLot={(index) => this.removeLots(index)}/> : null }
                <AdditionalDocuments/>
            </div>
        );
    }
}

export default Chemical;