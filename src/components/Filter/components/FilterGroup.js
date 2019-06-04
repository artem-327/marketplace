import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Control, Errors } from 'react-redux-form'
import { isNumber, min, messages, maxPercent, bigger } from '../../../utils/validation'
import classnames from 'classnames'
import DropdownRedux from '../../Dropdown/DropdownRedux'
import RadioRedux from '../../Radio/RadioRedux'
import DatepickerRedux from '../../Datepicker/DatepickerRedux'
import ComboBoxRedux from '../../ComboBox/ComboBoxRedux'
import RemoteComboBoxRedux from '../../ComboBox/RemoteComboBoxRedux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Icon, Input, Checkbox } from 'semantic-ui-react';


class FilterGroup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: this.props.isOpen

    }
  }

  componentDidMount() {

    for (let i = 0; i < this.props.inputs.length; i++) {
      if (this.props.inputs[i].type === 'checkbox') {
        if (this.props.data[this.props.checkboxModel] && this.props.data[this.props.checkboxModel][this.props.inputs[i].id]) {
          this.props.onOpen(true)
        }
      } else {
        if (this.props.data[this.props.inputs[i].model.substring(1)] && this.props.data[this.props.inputs[i].model.substring(1)] !== '') {
          this.props.onOpen(true)
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) this.setState({ isOpen: nextProps.isOpen })
  }

  renderInputs() {
    if (!this.props.inputs) return

    let errorWrapper = (props) => props.children.map((prop, index) => <div className="error" key={index}>{prop}</div>)

    return (
      this.state.isOpen ?
        this.props.inputs.map((input, index) => {
          switch (input.type) {
            case 'checkbox': {
              return (
                <div className='input-checkbox' key={index}>
                  <Control id={index} label={
                    <label>
                      <FormattedMessage
                        id={'filter.' + input.label.split(' ').join('')}
                        defaultMessage={input.label}
                      />
                    </label>
                  } component={Checkbox} model={input.model} id={input.model} value={false} onChange={(e) => {e.target.value = e.target.checked ? true : false}} />
                </div>
              )
            }
            case 'radio': {
              return (
                <div key={index} className='filter-input-radio' >
                  <label className='input-label' htmlFor={input.model}>{input.label}</label>
                  <RadioRedux
                    dispatch={this.props.dispatch}
                    model={input.model}
                    opns={
                      [
                        { label: '0-3 months', value: '100' },
                        { label: '3-6 months', value: '500' },
                        { label: '6-9 months', value: '1000' },
                        { label: 'Custom Product Age', value: '10000' }
                      ]
                    }
                    productAgeModel={this.props.productAgeModel}
                    productAgeCustomModel={this.props.productAgeCustomModel}
                  />
                </div>
              )
            }
            case 'dropdown': {
              return (
                <div key={index} className='filter-input-dropdown'>
                  <label className='input-label' htmlFor={input.model}>
                    <FormattedMessage
                      id={'filter.' + input.label.split(' ').join('')}
                      defaultMessage={input.label}
                    />
                  </label>
                  <DropdownRedux
                    clearable={true}
                    selection={true}
                    dispatch={this.props.dispatch}
                    model={input.model}
                    options={input.data}
                  />
                </div>
              )
            }
            case 'comboBox': {
              return (
                <div key={index} className='filter-input-dropdown'>
                  <label
                    className='input-label'
                    htmlFor={input.model}>
                    <FormattedMessage
                      id={input.label.split(' ').join('')}
                      defaultMessage={input.label + '1'}
                    />
                  </label>
                  <ComboBoxRedux
                    dispatch={this.props.dispatch}
                    model={input.model}
                    limit={input.limit}
                    placeholder='Select Condition'
                    items={input.data}
                  />
                </div>
              )
            }
            case 'search': {
              return (
                <div key={index} className='filter-input-dropdown'>
                  <label
                    className='input-label'
                    htmlFor={input.model}>
                    <FormattedMessage
                      id={'filter.' + input.label.split(' ').join('')}
                      defaultMessage={input.label + '1'}
                    />
                  </label>
                  <RemoteComboBoxRedux
                    dispatch={this.props.dispatch}
                    model={input.model}
                    placeholder={input.placeholder}
                    items={input.data}
                    api={(text) => text.length > 2 && input.search(text)}
                  />
                </div>
              )
            }
            case 'date': {
              return (
                <div key={index} className='filter-input-date'>
                  <label
                    className='input-label'
                    htmlFor={input.model}>
                    <FormattedMessage
                      id={'filter.' + input.label.split(' ').join('')}
                      defaultMessage={input.label + '1'}
                    />
                  </label>
                  <DatepickerRedux
                    dispatch={this.props.dispatch}
                    model={input.model}
                  />
                </div>
              )
            }
            case 'text': {
              return (
                <div key={index} className='filter-input-text'>
                  <label
                    className='input-label'
                    htmlFor={input.model}>
                    <FormattedMessage
                      id={'filter.' + input.label.split(' ').join('')}
                      defaultMessage={input.label + '1'}
                    />
                  </label>
                  <Control component={Input} type={input.type} model={input.model} id={input.model} placeholder={input.placeholder} />
                </div>
              )
            }
            case 'number': {
              return (
                <div key={index} className='filter-input-text'>
                  <label className='input-label' htmlFor={input.model}>
                    <FormattedMessage
                      id={'filter.' + input.label}
                      defaultMessage={input.label + '1'}
                    />
                  </label>
                  <Control
                    component={Input}
                    validateOn='change'
                    type={input.type}
                    model={input.model}
                    id={input.model}
                    placeholder={this.props.intl.formatMessage({ id: 'filter.' + input.label })}
                    validators={{ min: (val) => min(val, 0) || !val }}
                  />

                  <Errors
                    wrapper={errorWrapper}
                    model={input.model}
                    show='touched'
                    messages={{
                      isNumber: messages.isNumber,
                      min: messages.min
                    }}
                  />
                </div>
              )
            }
            case 'assay': {

              let validator = input.bigger ?
                { bigger: (val) => bigger(val, this.props.data.assaylb), min: (val) => min(val, 0), maxPercent, isNumber }
                : { min: (val) => min(val, 0), maxPercent, isNumber }
              return (
                <div key={index} className='filter-input-text'>
                  <label
                    className='input-label'
                    htmlFor={input.model}>
                    <FormattedMessage
                      id={'filter.' + input.label}
                      defaultMessage={input.label}
                    />
                  </label>
                  <Control
                    component={Input}
                    type={input.type}
                    validateOn='change'
                    model={input.model}
                    id={input.model}
                    placeholder={input.placeholder}
                    validators={validator}
                  />

                  <Errors
                    wrapper={errorWrapper}
                    model={input.model}
                    show='touched'
                    messages={{
                      bigger: input.bigger ? messages.bigger : null,
                      maxPercent: messages.maxPercent,
                      isNumber: messages.isNumber,
                      min: messages.min,
                    }}
                  />
                </div>
              )
            }
            default: {
              return null
            }
          }
        })
        : null
    )
  }


  render() {
    if (!this.props.isVisible) return null
    let { isOpen } = this.state

    return (
      <div className={classnames('filter-group', { 'split': (this.props.split) })}>
        <div
          className='header'
          onClick={() => this.props.onOpen(!this.state.isOpen)}>
          <div className='dropdown-icon'>
            <Icon name={isOpen ? 'chevron down' : 'chevron up'} color={isOpen ? 'blue' : 'black'} />
          </div>
          <FormattedMessage
            id={'filter.' + this.props.header}
            defaultMessage={this.props.header}
          />
        </div>
        {this.renderInputs()}
        <div className='clearfix' />
      </div>
    )
  }
}

FilterGroup.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      placeholder: PropTypes.string,
      model: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      filterValue: PropTypes.string
    })
  ),
  split: PropTypes.bool,
  open: PropTypes.bool,
  location: PropTypes.string
}


export default injectIntl(FilterGroup)