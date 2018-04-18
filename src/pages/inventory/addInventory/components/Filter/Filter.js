import React, {Component} from 'react';


import './filter.css'
import saveSearchIcon from '../../../../../images/filter/save-search.png'
import FilterSearch from './components/FilterSearch'
import { Translate } from 'react-localize-redux';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
        }
    }


    componentWillMount() {

    }

    componentDidMount(){

    }

    componentWillUnmount() {

    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.onChange(selectedOption)
    };

    render() {

        let filter =
                <Translate>
                    {(translate) =>
                        <div>
                            <div className="row">
                                <div className="col-lg-10 col-md-10 col-sm-12">
                                    <FilterSearch placeholder={ translate('inventoryPage.addInventory.filter.filterPlaceholder')} onChange={(value)=>{this.handleChange(value)}}/>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-12">
                                    <button className="filter-save-search-popup"><img alt="save-search" src={saveSearchIcon} className="filter-button-image"/>{ translate('inventoryPage.addInventory.filter.saveSearch') }
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