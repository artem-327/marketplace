import { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const SpanText = styled.span`
  .file {
    color: #b0b0b0;
    font-size: 0.9rem;
    padding: 4px 4px 4px 15px;
    border-radius: 25px;
    position: relative;
    display: inline-block;
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &.lot {
      padding: 6px 4px 6px 13px;
      font-size: 0.875rem;
      color: black;
      border-radius: 25px;
      max-width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 2;
    }
    span {
      padding-top: 5px;
    }
  }
`
class File extends Component {
  render() {
    return (
      <Fragment>
        <SpanText
          key={this.props.index}
          className={this.props.className}
          style={{ opacity: this.props.disabled ? '0.45' : '1' }}>
          <Icon
            name='times circle outline'
            size='big'
            disabled={this.props.disabled === true}
            onClick={() => this.props.onRemove()}
            data-test='add_inventory_upload_file_remove'
          />
          {this.props.name}
        </SpanText>
      </Fragment>
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
