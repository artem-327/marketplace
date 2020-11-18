import React, { Component } from 'react'
import './inputEdit.scss'
import PropTypes from 'prop-types'

class InputEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.value || '',
      edit: false
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.text !== nextProps) this.setState({ text: nextProps.value })
  }

  save() {
    this.setState({ edit: false }, () => {
      if (this.props.onSave) this.props.onSave(this.state.text)
    })
  }

  render() {
    let { text, edit } = this.state
    return (
      <div className='input-edit'>
        {edit ? (
          <React.Fragment data-test='InputEdit_value_inp'>
            <span onClick={this.save.bind(this)}>
              <i className='fas fa-save' />
            </span>
            <input value={text} onChange={e => this.setState({ text: e.target.value })} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span onClick={() => this.setState({ edit: true })} data-test='InputEdit_edit_set'>
              <i className='fas fa-edit' />
            </span>
            <p>{text}</p>
          </React.Fragment>
        )}
      </div>
    )
  }
}

InputEdit.propTypes = {
  onSave: PropTypes.func,
  value: PropTypes.string
}

export default InputEdit
