import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import { MoreVertical } from 'react-feather'
import { Dropdown } from 'semantic-ui-react'
import { getSafe } from '~/utils/functions'
import { connect } from 'react-redux'

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
  margin: 0;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }

  .dropdown.icon {
    display: none;
  }
  
  &[aria-expanded="true"].active.visible .menu.transition.visible {
    position: fixed !important;
    top: auto !important;
    left: auto !important;
    margin-top: 20px !important;
  }
  
  &[aria-expanded="true"].active.visible.upward .menu.transition.visible {
    bottom: auto !important;
    transform: translateY(-100%) !important;
    margin-top: 0 !important;
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

  .settings_bankaccounts & {
    margin-left: -6px;
    margin-right: 0;
  }
`

class ActionCell extends Component {
  constructor(props) {
    super(props)
    this.actionRef = React.createRef()
  }

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
    const { getActions, leftContent, content, onContentClick, row, rightAlignedContent, takeover } = this.props
    const actions = getActions ? getActions(row) : null
    const takeoverWidth = takeover ? 30 : 0
    return (
      <DivRow>
        {getActions ? (
          <RowDropdown
            ref={this.actionRef}
            onOpen={(e, data) => {
              const dropdownElement = this.actionRef.current.ref.current
              const dropdownList = dropdownElement.querySelector('.menu')
              const tableResponsive = dropdownElement.closest('div.table-responsive')
              dropdownList.setAttribute('style', `top: ${dropdownElement.getBoundingClientRect().top - takeoverWidth}px !important;`)

              tableResponsive.addEventListener("scroll", () => {
                this.actionRef.current?.close()
              })
            }}
            onClose={(e, data) => {
              const dropdownElement = this.actionRef.current.ref.current
              const dropdownList = dropdownElement.querySelector('.menu')
              const tableResponsive = dropdownElement.closest('div.table-responsive')
              dropdownList.setAttribute('style', ``)

              tableResponsive.removeEventListener("scroll", () => {
                this.actionRef.current?.close()
              })
            }}
            disabled={!actions.length}
            trigger={<RowDropdownIcon>{actions && actions.length ? <MoreVertical /> : null}</RowDropdownIcon>}>
            <Dropdown.Menu>{this.getActionItems(actions, row)}</Dropdown.Menu>
          </RowDropdown>
        ) : null}
        {leftContent ? <div style={{ marginRight: '8px' }}>{leftContent}</div> : null}
        <SpanText {...(!!onContentClick && { onClick: e => onContentClick(e), className: 'clickable' })}>
          {content}
        </SpanText>
        {rightAlignedContent ? <DivIcons>{rightAlignedContent}</DivIcons> : null}
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
  rightAlignedContent: PropTypes.object,
  takeover: PropTypes.bool
}

ActionCell.defaultProps = {
  row: {},
  getActions: null,
  leftContent: null,
  content: '',
  onContentClick: null,
  rightAlignedContent: null,
  takeover: false
}

const mapStateToProps = state => {
  return {
    takeover: getSafe(() => !!state.auth.identity.company.id, false) && getSafe(() => state.auth.identity.isAdmin, false),
  }
}

export default connect(mapStateToProps, {})(ActionCell)