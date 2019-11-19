import React, {Component} from 'react'
import './SavedFilters.scss'
import TooltipFilter from './TooltipFilter'
import Bell from '../../../../images/bell.png'
import BellTrans from '../../../../images/bell_transparent.png'
import close from '../../../../images/remove.png'
import {FormattedMessage} from 'react-intl'
import {Control} from 'react-redux-form'
import CheckboxControlled from '../../../Checkbox/CheckboxControlled'
import {display} from './actions/SaveFilterItem.actions'
import {connect} from 'react-redux'

const mapStateToProps = state => {
  const {
    bellKey,
    [`bell${bellKey}`]: bell,
    notificationsKey,
    [`notifications${notificationsKey}`]: notifications,
    selectedKey,
    [`selected${selectedKey}`]: selected,
    activeKey,
    [`active${activeKey}`]: active,
    emailKey,
    [`email${emailKey}`]: email,
    mobileKey,
    [`mobile${mobileKey}`]: mobile,
    systemKey,
    [`system${systemKey}`]: system,
    toolTipKey,
    [`toolTip${toolTipKey}`]: toolTip
  } = state.saveFilterItem

  return {
    functionality: {
      [`bell${bellKey}`]: bell,
      [`notifications${notificationsKey}`]: notifications,
      [`selected${selectedKey}`]: selected,
      [`active${activeKey}`]: active,
      [`email${emailKey}`]: email,
      [`mobile${mobileKey}`]: mobile,
      [`system${systemKey}`]: system,
      [`toolTip${toolTipKey}`]: toolTip
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    show: (data, key) => dispatch(display(data, key))
  }
}

class SaveFilterItem extends Component {
  constructor(props) {
    super(props)
    this.toolTip = false
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

  state = {showTooltip: false}

  formatNameToStore(name) {
    switch (name) {
      case 'chemicalName':
        return 'search'
      case 'quantityFrom':
        return 'qntylb'
      case 'quantityTo':
        return 'qntyub'
      case 'priceFrom':
        return 'prclb'
      case 'priceTo':
        return 'prcub'
      case 'distanceLimit':
        return 'Distance limit'
      case 'containers':
        return 'pckgs'
      case 'grades':
        return 'grade'
      case 'forms':
        return 'form'
      case 'conditions':
        return 'condition'
      case 'origin':
        return 'origin'
      case 'manufacturer':
        return 'manufacturer'
      case 'zip':
        return 'zip'
      default:
        return name
    }
  }

  fillFilter() {
    let inputs = this.props.toolTipContent.reduce(
      (ac, item) => ({
        ...ac,
        [this.formatNameToStore(item.name)]: Array.isArray(item.value)
          ? item.value.reduce((acc, cur) => ({...acc, [cur.id]: true}), {})
          : typeof item.value === 'object'
          ? item.value.id
          : item.value
      }),
      {}
    )
    this.props.fillFilter(inputs)
    this.props.filterFunc(inputs)
  }

  renderInputs = () => {
    //:TODO when BE is done finish save and saved button
    let saveFilter = this.state.saveFilter ? (
      <span className='savedButton' onClick={() => {}}>
        <FormattedMessage id='filter.saved' defaultMessage='Saved' />
      </span>
    ) : (
      <span className='saveButton' onClick={() => {}}>
        <FormattedMessage id='global.save' defaultMessage='Save' />
      </span>
    )
    return (
      <div className='inputs'>
        <CheckboxControlled
          label='Email Notifications'
          name='emailNotifications'
          onChange={() => {}}
          onClick={() => {}}
        />
        <span className='email'>
          <Control.text type='text' model='emailNotifications' id='emailNotifications' placeholder='Your E-mail' />
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
    )
  }

  renderNotification = () => {
    const {show, index} = this.props
    const {[`active${index}`]: active} = this.props.functionality
    return (
      <div>
        <h6>Notifications</h6>
        <span>Enable notifications</span>
        <div className='brc-radio-wrapper'>
          <div className='label'>{active ? 'On' : 'Off'}</div>
          <div className='switch-container'>
            <label className='switch'>
              <span
                onClick={() => {
                  show('active', index)
                }}
                className={`slider round ${active ? 'brc-radio active' : 'brc-radio'} `}
                data-test='saved_filters_notifications_toggle'
              />
            </label>
          </div>
        </div>
        {active ? this.renderInputs() : null}
      </div>
    )
  }

  render() {
    const {show, index, toolTipContent, filterName, deleteSaveFilter} = this.props
    const {
      [`selected${index}`]: selected,
      [`toolTip${index}`]: toolTip,
      [`bell${index}`]: bell,
      [`notifications${index}`]: notifications
    } = this.props.functionality

    return (
      <li>
        <div
          onClick={() => this.fillFilter()}
          onMouseEnter={() => {
            show('toolTip', index)
          }}
          onMouseLeave={() => {
            show('toolTip', index)
          }}
          className='filter-name'
          data-test='filter_fill'
          data-test='saved_filters_fill_filter'>
          <TooltipFilter
            selected={selected}
            index={index}
            name={filterName}
            isVisible={toolTip}
            content={toolTipContent}
          />
        </div>
        <div className='filter-delete' data-test='filter_delete'>
          <span
            className='bell'
            onMouseEnter={() => {
              show('bell', index)
            }}
            onMouseLeave={() => {
              show('bell', index)
            }}
            onClick={() => {
              show('selected', index)
              show('notifications', index)
            }}>
            <img src={bell ? Bell : BellTrans} alt='bell' />
          </span>
          <span
            className='close test'
            onClick={() => deleteSaveFilter(this.props.id)}
            data-test='saved_filters_delete_filter'>
            <img src={close} alt='close' />
          </span>
        </div>
        {notifications ? this.renderNotification() : null}
      </li>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveFilterItem)
