import React, {Component} from 'react';


import './filter.css'
import saveSearchIcon from '../../../../images/filter/save-search.png'
import SaveSearch from './components/SaveSearch'
import FilterInput from './components/FilterInput'
import { Translate } from 'react-localize-redux';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isScreenBig: true,
            advancedFilter : false,
            setAlerts : false,
            saveSearch :false
        }
    }

    handleResize() {
        if(window.innerWidth < 1025) {
            this.setState({isScreenBig: false})
        } else {
            this.setState({isScreenBig: true});
        }
    }

    changeSaveSearchAlerts() {
        let { saveSearch } = this.state;
        this.setState({
            saveSearch: !saveSearch
        });
    }

    componentWillMount() {
        this.handleResize();
    }

    componentDidMount(){
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }


    render() {
        const {  saveSearch} = this.state;

        let save_search_component = saveSearch ? <SaveSearch onClick={()=>{this.changeSaveSearchAlerts()}}/> : '';


        let filter =
                <Translate>
                    {(translate) =>
                        <div>
                            <div className="row">
                                <div className="col-lg-10 col-md-10 col-sm-12">
                                    <FilterInput placeholder={ translate('inventoryFilter.chemicalName') }/>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-12">
                                    <button className="filter-save-search" onClick={() => {
                                        this.changeSaveSearchAlerts()
                                    }}><img alt="save-search" src={saveSearchIcon} className="filter-button-image"/>{ translate('inventoryFilter.saveSearch') }
                                    </button>
                                </div>
                            </div>
                            {save_search_component}
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