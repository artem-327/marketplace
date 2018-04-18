import React, {Component} from 'react';
import searchIcon from "../../../../../../images/nav/search.png"

class MappedInput extends Component {

    render() {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><img src={searchIcon} alt="searchLogo"/></span>
                </div>
                <input placeholder={this.props.placeholder} />
            </div>

        );
    }
}

export default MappedInput