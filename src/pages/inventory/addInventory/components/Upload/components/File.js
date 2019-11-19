import React, {Component} from 'react'
import './file.scss'
import PropTypes from 'prop-types'
import {Icon} from 'semantic-ui-react'

class File extends Component {
  render() {
    return (
      <React.Fragment>
        <span
          key={this.props.index}
          className={this.props.className}
          style={{opacity: this.props.disabled ? '0.45' : '1'}}>
          <Icon
            name='times circle outline'
            size='big'
            disabled={this.props.disabled === true}
            onClick={() => this.props.onRemove()}
            data-test='add_inventory_upload_file_remove'
          />
          {this.props.name}
        </span>
      </React.Fragment>
    )
  }
}

File.propTypes = {
  name: PropTypes.string,
  close: PropTypes.func,
  onRemove: PropTypes.func,
  className: PropTypes.string
}

export default File
