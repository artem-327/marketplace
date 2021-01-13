import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import { MoreVertical } from 'react-feather'
import { Dropdown } from 'semantic-ui-react'
import { getSafe } from '~/utils/functions'

export const DivRow = styled.div`
  display: flex !important;

  > div {
    flex-grow: 0;
    flex-shrink: 0;
  }

  > span {
    flex-grow: 1;
    flex-shrink: 1;
  }
`

export const SpanText = styled.span`
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  font-weight: 500;

  &.clickable {
    cursor: pointer;

    &:hover {
      font-weight: bold;
      color: #2599d5;
    }
  }
`

const DivIcons = styled.div`
  position: -webkit-sticky !important;
  position: sticky !important;
  right: 0px !important;
  float: right !important;
  display: flex !important;
  margin-left: 10px !important;
`

export const RowDropdown = styled(Dropdown)`
  display: block !important;
  height: 100% !important;
  margin: auto 0;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }

  .dropdown.icon {
    display: none;
  }
`

export const RowDropdownIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 2px 8px 2px -2px;

  svg {
    width: 16px !important;
    height: 16px !important;
    color: #848893 !important;
  }
`

class ActionCell extends Component {
  getActionItems = (actions = [], row) => {
    if (!getSafe(() => actions.length, false)) return
    return actions.map((a, i) =>
      'hidden' in a && typeof a.hidden === 'function' && a.hidden(row) ? null : (
        <Dropdown.Item
          data-test={`action_${row.id}_${i}`}
          key={i}
          text={typeof a.text !== 'function' ? a.text : a.text(row)}
          disabled={getSafe(() => a.disabled(row), false)}
          onClick={() => a.callback(row)}
        />
      )
    )
  }

  render() {
    const { getActions, leftContent, content, onContentClick, row, rightAlignedContent } = this.props
    const actions = getActions ? getActions(row) : null
    return (
      <DivRow>
        {getActions ? (
          <RowDropdown
            disabled={!actions.length}
            trigger={
              <RowDropdownIcon>
                {actions && actions.length ? (<MoreVertical />) : null}
              </RowDropdownIcon>
            }>
            <Dropdown.Menu>{this.getActionItems(actions, row)}</Dropdown.Menu>
          </RowDropdown>
        ) : null}
        {leftContent ? (<div style={{ marginRight: '8px' }}>{leftContent}</div>) : null}
        <SpanText
          {...(!!onContentClick && { onClick: (e) => onContentClick(e), className: 'clickable' })}
        >
          {content}
        </SpanText>
        {rightAlignedContent ? (<DivIcons>{rightAlignedContent}</DivIcons>) : null}
      </DivRow>
    )
  }
}

ActionCell.propTypes = {
  row: PropTypes.object,
  getActions: PropTypes.func,
  leftContent: PropTypes.object,
  content: PropTypes.object,
  onContentClick: PropTypes.func,
  rightAlignedContent: PropTypes.object
}

ActionCell.defaultProps = {
  row: {},
  getActions: null,
  leftContent: null,
  content: '',
  onContentClick: null,
  rightAlignedContent: null
}

export default ActionCell