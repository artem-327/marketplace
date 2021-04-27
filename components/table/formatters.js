import { useRef } from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import { MoreVertical } from 'react-feather'
import { getSafe } from '~/utils/functions'
import styled from 'styled-components'

const DropdownActions = styled(Dropdown)`
  display: inline-block !important;
  height: 30px !important;
  vertical-align: top;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }

  svg {
    width: 16px !important;
    height: 16px !important;
    margin: 7px 8px 7px -2px !important;
  }
  
  &[aria-expanded="true"].active.visible .menu.transition.visible {
    position: fixed !important;
    top: auto !important;
    left: auto !important;
    margin-top: 25px !important;
  }
  
  &[aria-expanded="true"].active.visible.upward .menu.transition.visible {
    bottom: auto !important;
    transform: translateY(-100%) !important;
    margin-top: 5px !important;
  }
`

const DivName = styled.div`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: top;
  text-overflow: ellipsis;

  .group-name {
    font-weight: 400;
    color: #20273a;

    > span {
      color: #848893;
    }
  }

  &.has-actions:hover {
    .group-name {
      font-weight: bold;
      color: #2599d5;
      > span {
        font-weight: bold;
        color: #2599d5;
      }
    }
  }
`

const SpanBankName = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.11;
  color: #20273a;
`

const getDropdownItems = (actions = [], row) => {
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

function getContainerDimensions(element) {
  let parentEl = element.parentElement
  while (parentEl !== null && !parentEl.classList.contains('table-responsive')) {
    parentEl = parentEl.parentElement
  }

  const width = parentEl ? parentEl.clientWidth : null
  const height = parentEl ? parentEl.clientHeight : null

  return {
    container: parentEl,
    width,
    height
  }
}

function repositionMenu(dropdownRef) {
  const dropdownElement = dropdownRef.current.ref.current
  const dropdownList = dropdownElement.querySelector('.menu')
  const tableResponsive = dropdownElement.closest('div.table-responsive')
  dropdownList.setAttribute('style', `top: ${dropdownElement.getBoundingClientRect().top}px !important;`)

  tableResponsive.addEventListener("scroll", () => {
    dropdownRef.current?.close()
  })
}

function closeMenu(dropdownRef) {
  const dropdownElement = dropdownRef.current.ref.current
  const dropdownList = dropdownElement.querySelector('.menu')
  const tableResponsive = dropdownElement.closest('div.table-responsive')
  dropdownList.setAttribute('style', ``)

  tableResponsive.removeEventListener("scroll", () => {
    dropdownRef.current?.close()
  })
}

export function rowActionsCellFormatter({ column: { actions, name }, row, groupLength, isBankTable, menuIcon }) {
  const dropdownItems = getDropdownItems(actions, row)
  const dropdownRef = useRef(null)

  // Don't display if all dropdownItems are null
  const displayMenu = getSafe(() => dropdownItems.length, false) ? dropdownItems.findIndex(p => p !== null) >= 0 : false

  let trigger = row[name]
  if (row.groupedBy && row.key) {
    const nameGroup = row.key.split('_')[0]
    trigger = isBankTable ? (
      <SpanBankName>{nameGroup ? nameGroup : 'Unmapped'}</SpanBankName>
    ) : (
      <span className='group-name'>
        {nameGroup ? nameGroup : 'Unmapped'} <span>({groupLength})</span>
      </span>
    )
  }

  return displayMenu ? (
    menuIcon ? (
      <>
        <DropdownActions
          ref={dropdownRef}
          icon=''
          trigger={
            <>
              <MoreVertical />
              <DivName className={actions && actions.length ? 'has-actions' : ''}>{trigger}</DivName>
            </>
          }
          onOpen={() => repositionMenu(dropdownRef)}>
          <Dropdown.Menu>{dropdownItems}</Dropdown.Menu>
        </DropdownActions>
      </>
    ) : (
      <DropdownActions
        ref={dropdownRef}
        icon=''
        trigger={<DivName className={actions && actions.length ? 'has-actions' : ''}>{trigger}</DivName>}
        onOpen={() => repositionMenu(dropdownRef)}>
        <Dropdown.Menu>{dropdownItems}</Dropdown.Menu>
      </DropdownActions>
    )
  ) : (
    <DivName>{trigger}</DivName>
  )
}

export const dropdownFormatter = ({ column: { options }, row }) => {
  const opts = options.map(p => ({
    text: p.text,
    value: p.value,
    key: p.value,
    callback: p.callback
  }))

  return (
    <Dropdown
      style={{ margin: '-6px' }}
      placeholder='Select permission'
      selection
      fluid
      defaultValue={opts[0].value}
      options={opts}
    />
  )
}
