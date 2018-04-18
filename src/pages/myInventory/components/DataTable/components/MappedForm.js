import React, {Component} from 'react';
import {Translate} from 'react-localize-redux'
import MappedInput from "./MappedInput";

class MappedForm extends Component {

    changeShowMapped() {
        this.props.onClick()
    }

    render() {
        return (
            <div>
                <Translate>
                    {(translate) =>
                        <div className="mapped-form">
                            <div className="row header">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <p className="title">
                                        {translate('myInventory.mappedForm.mapped')}
                                    </p>
                                </div>
                            </div>
                            <div className="row body">
                                <div className="map-form-elem col-lg-6 col-md-6 col-sm-12">
                                    <MappedInput placeholder={translate('myInventory.mappedForm.searchChemicalName')}/>
                                </div>
                                <div className="map-form-checkbox col-lg-4 col-md-4 col-sm-12">
                                    <input type="checkbox"/>
                                    <label>{translate('myInventory.mappedForm.createMapping')}</label>
                                </div>
                                <div className="map-form-buttons col-lg-2 col-md-2 col-sm-12">
                                    <button className="filter-save-search">{ translate('myInventory.mappedForm.saveRule') }
                                    </button>
                                    <button className="filter-cancel" onClick={() => {this.changeShowMapped()}}>X
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </Translate>
            </div>
        );
    }
}

export default MappedForm