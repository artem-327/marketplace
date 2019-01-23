import React, {Component} from 'react';
import './SavedFilters.css';
import TooltipFilter from "./TooltipFilter";
import Bell from '../../../../images/bell.png';
import BellTrans from '../../../../images/bell_transparent.png';
import close from '../../../../images/remove.png';
import {FormattedMessage} from 'react-intl';
import {Control} from 'react-redux-form';
import SwitcherRedux from '../../../Switcher/SwitcherRedux';
import CheckboxControlled from '../../../Checkbox/CheckboxControlled';



class SaveFilterItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bell: BellTrans,
            notification: false,
            selected: false,
            active: false,
            checkbox: {
                email: false
            }
        }
    }

    state={showTooltip: false};

    formatNameToStore(name){
        switch(name) {
            case 'chemicalName' : return 'search';
            case 'quantityFrom' : return 'qntylb';
            case 'quantityTo' : return 'qntyub';
            case 'priceFrom' : return 'prclb';
            case 'priceTo' : return 'prcub';
            case 'distanceLimit' : return 'Distance limit';
            case 'containers' : return 'pckgs';
            case 'grades' : return 'grade';
            case 'forms' : return 'form';
            case 'conditions' : return 'condition';
            case 'origin' : return 'origin';
            case 'manufacturer' : return 'manufacturer';
            case 'zip' : return 'zip';
            default : return name;
        }
    }

    fillFilter(){
        let inputs = this.props.toolTipContent.reduce((ac, item) => (
            { ...ac, [this.formatNameToStore(item.name)] : Array.isArray(item.value) ? item.value.reduce((acc, cur) => ({ ...acc, [cur.id]: true }), {})
                    : typeof item.value === 'object' ? item.value.id : item.value}
        ), {});
        this.props.fillFilter(inputs);
        this.props.filterFunc(inputs);
    }

    renderInputs = () => {
        let saveFilter = this.state.saveFilter ?
            <span
                className="savedButton"
                onClick={()=>{}}>
                <FormattedMessage
                    id='filter.saved'
                    defaultMessage='Saved'
                />
            </span>
            :
            <span
                className="saveButton"
                onClick={()=>{}}>
                <FormattedMessage
                    id='global.save'
                    defaultMessage='Save'
                />
            </span>;

        return (
            <div className='inputs'>
                <CheckboxControlled
                    label='Email Notifications'
                    name='emailNotifications'
                    onChange={() => this.setState({
                        checkbox: {
                            email: !this.state.checkbox.email
                        }
                    })}
                    onClick={() => {}}
                />
                {this.state.checkbox.email ?
                    <span className='email'>
                        <Control.text
                            type='text'
                            model='emailNotifications'
                            id='emailNotifications'
                            placeholder='Your E-mail'/>
                    </span>
                    : null
                }
                <div>
                    <CheckboxControlled
                        label='Mobile Notifications'
                        name='mobileNotifications'
                        onChange={() => this.setState({
                            checkbox: {
                                mobile: !this.state.checkbox.mobile
                            }
                        })}
                        onClick={() => {}}
                    />
                </div>
                <div>
                    <CheckboxControlled
                        label='System Notifications'
                        name='systemNotifications'
                        onChange={() => this.setState({
                            checkbox: {
                                system: !this.state.checkbox.system
                            }
                        })}
                        onClick={() => {}}
                    />
                </div>
                {saveFilter}
            </div>
        );
    };

    renderNotification = () => {
        return (
            <div>
                <h6>Notifications</h6>
                <span>Enable notifications</span>
                <div className="brc-radio-wrapper">
                    <div className="label">{this.state.active ? "On" : "Off"}</div>
                    <div className="switch-container">
                        <label className="switch">
                        <span
                            onClick={() => this.setState({active: !this.state.active})}
                            className={`slider round ${this.state.active ? "brc-radio active" : "brc-radio"} `}
                        />
                        </label>
                    </div>
                </div>
                {this.state.active ? this.renderInputs() : null}
            </div>
        );
    };

    render() {
        return (
            <li>
                <div
                    onClick={() => this.fillFilter()}
                    onMouseEnter={() => this.setState({showTooltip: true})}
                    onMouseLeave={() => this.setState({showTooltip: false})}
                    className="filter-name">
                        <TooltipFilter
                            selected={this.state.selected}
                            name={this.props.filterName}
                            isVisible={this.state.showTooltip}
                            content={this.props.toolTipContent}/>
                </div>
                <div
                    className='filter-delete'>
                    <span
                        className='bell'
                        onMouseEnter={() => this.setState({bell: Bell})}
                        onMouseLeave={() => this.setState({bell: BellTrans})}
                        onClick={() => this.setState({
                            selected: !this.state.selected,
                            notification: !this.state.notification
                        })}
                    >
                        <img src={this.state.bell} alt='bell'/>
                    </span>
                    <span
                        className="close test"
                        onClick={() => this.props.deleteSaveFilter(this.props.id)}>
                        <img src={close}  alt='close'/>
                    </span>
                </div>
                {this.state.notification ? this.renderNotification() : null}
            </li>
        )
    }
}

export default SaveFilterItem