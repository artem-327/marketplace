import React, {Component} from 'react';


import './filter.css'
import saveSearchIcon from '../../../../../images/filter/save-search.png'
import FilterInput from './components/FilterInput'
import { Translate } from 'react-localize-redux';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentWillMount() {

    }

    componentDidMount(){

    }

    componentWillUnmount() {

    }


    render() {

        let filter =
                <Translate>
                    {(translate) =>
                        <div>
                            <div className="row">
                                <div className="col-lg-10 col-md-10 col-sm-12">
                                    <FilterInput placeholder={ translate('inventoryPage.products.inventoryFilter.chemicalName') }/>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-12">
                                    <button className="filter-save-search"><img alt="save-search" src={saveSearchIcon} className="filter-button-image"/>{ translate('inventoryPage.products.inventoryFilter.saveSearch') }
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </Translate>;

        return (
            <nav className="App-filter">
                {filter}
                <div className="clearfix"> </div>
            </nav>
        );
    }
}

export default Filter;