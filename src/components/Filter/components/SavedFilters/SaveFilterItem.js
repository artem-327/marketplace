import React, {Component} from 'react';
import './SavedFilters.css';
import TooltipFilter from "./TooltipFilter";
import Bell from '../../../../images/bell.png';
import BellTrans from '../../../../images/bell_transparent.png';
import close from '../../../../images/remove.png';
import {FormattedMessage} from 'react-intl';
import {Control} from 'react-redux-form';
import CheckboxControlled from '../../../Checkbox/CheckboxControlled';
import {display} from './actions/SaveFilterItem.actions';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        functionality: {
            bell: state.saveFilterItem.bell,
            notifications: state.saveFilterItem.notifications,
            selected: state.saveFilterItem.selected,
            active: state.saveFilterItem.active,
            email: state.saveFilterItem.email,
            mobile: state.saveFilterItem.mobile,
            system: state.saveFilterItem.system,
            toolTip: state.saveFilterItem.toolTip
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        show: (data) => dispatch(display(data))
    };
};


class SaveFilterItem extends Component {
    constructor(props) {
        super(props);
        this.toolTip = false;
        this.state = {
            bell: false,
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
        //:TODO when BE is done finish save and saved button
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
                    onChange={() => {}}
                    onClick={() => {}}
                />
                <span className='email'>
                    <Control.text
                        type='text'
                        model='emailNotifications'
                        id='emailNotifications'
                        placeholder='Your E-mail'/>
                </span>
                <div>
                    <CheckboxControlled
                        label='Mobile Notifications'
                        name='mobileNotifications'
                        onChange={() => {}}
                        onClick={() => {}}
                    />
                </div>
                <div>
                    <CheckboxControlled
                        label='System Notifications'
                        name='systemNotifications'
                        onChange={() => {}}
                        onClick={() => {}}
                    />
                </div>
                {saveFilter}
            </div>
        );
    };

    renderNotification = () => {
        const {active} = this.props.functionality;
        const { show } = this.props;
        return (
            <div>
                <h6>Notifications</h6>
                <span>Enable notifications</span>
                <div className="brc-radio-wrapper">
                    <div className="label">{active && this.active ? "On" : "Off"}</div>
                    <div className="switch-container">
                        <label className="switch">
                        <span
                            onClick={() => {
                                show('active');
                                this.active = !this.active;
                            }}
                            className={`slider round ${active && this.active ? "brc-radio active" : "brc-radio"} `}
                        />
                        </label>
                    </div>
                </div>
                {active && this.active ? this.renderInputs() : null}
            </div>
        );
    };

    render() {
        console.log(this.props);
        const { selected, toolTip, bell, notifications } = this.props.functionality;
        const { show } = this.props;
        return (
            <li>
                <div
                    onClick={() => this.fillFilter()}
                    onMouseEnter={() => {
                        show('toolTip');
                        this.toolTip = !this.toolTip;
                    }}
                    onMouseLeave={() => {
                        show('toolTip');
                        this.toolTip = !this.toolTip;
                    }}
                    className="filter-name">
                        <TooltipFilter
                            selected={selected}
                            name={this.props.filterName}
                            isVisible={toolTip && this.toolTip}
                            content={this.props.toolTipContent}/>
                </div>
                <div
                    className='filter-delete'>
                    <span
                        className='bell'
                        onMouseEnter={() => {
                            show('bell');
                            this.bell = !this.bell;
                        }}
                        onMouseLeave={() => {
                            show('bell');
                            this.bell = !this.bell;
                        }}
                        onClick={() => {
                            show('selected');
                            show('notifications');
                            this.selected = !this.selected;
                            this.notifications = !this.notifications;
                        }}
                    >
                        <img src={bell && this.bell  ? Bell : BellTrans} alt='bell'/>
                    </span>
                    <span
                        className="close test"
                        onClick={() => this.props.deleteSaveFilter(this.props.id)}>
                        <img src={close}  alt='close'/>
                    </span>
                </div>
                {notifications && this.notifications ? this.renderNotification() : null}
            </li>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveFilterItem);