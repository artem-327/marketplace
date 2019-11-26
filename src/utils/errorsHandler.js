import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { closeMessage } from '../modules/errors'

class errorWrapper extends React.Component {
  renderErrors() {
    let errors = this.props.messages.map((message, index) => {
      return (
        <div key={index} className='error-item'>
          <p>
            <span
              className='error-close'
              onClick={() => this.props.closeMessage(index)}
              data-test='error_handler_close_message'
            />
            {message}
          </p>
        </div>
      )
    })
    return <div className='errors-handler'>{errors}</div>
  }

  render() {
    return <div className='main-wr'>{this.renderErrors()}</div>
  }
}

function mapStateToProps(store) {
  return {
    messages: store.errors.messages
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeMessage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(errorWrapper)
