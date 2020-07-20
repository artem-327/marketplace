import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Container, Label, Menu, Dropdown} from 'semantic-ui-react'
import * as Actions from '../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { debounce } from 'lodash'
import styled from 'styled-components'
import { MoreHorizontal } from 'react-feather'

const StyledMenu = styled(Menu)`
  &.ui.menu {
    height: 50px !important;
    min-height: 50px !important;
  
    > .item {
      box-sizing: content-box !important;
      height: 17px !important;
      padding-top: 16px !important;
      padding-bottom: 17px !important;
      
      > div.ui.circular.label {
        box-sizing: border-box !important;
        height: 20px !important;
        padding-top: 4px !important;
        padding-bottom: 4px !important;
      }
      
      &.active {
        font-weight: 400 !important;
      
        > div.ui.circular.label {
          padding-top: 5px !important;
          padding-bottom: 5px !important;
        }
      }
    }
  
    > .item:not(.active) .ui.circular.label {
      border: solid 1px #dee2e6;
      background-color: #f8f9fb;
      color: #848893;
    }
    
    > .active.item .ui.circular.label {
      background-color: #f16844;
      color: #ffffff;
    }
    
    .ui.dropdown {
    
      .text {
        height: 50px;
        line-height: 50px;
      
        svg {
          width: 20px;
          height: 20px;
          margin: 0 10px;
          vertical-align: middle;
        }
      }
    
      i.dropdown.icon {
        display: none;
      }
    
      .menu {
        width: 280px !important;
        min-width: 280px !important;
        padding-top: 11px !important;
        padding-bottom: 9px !important;
      
        > .item {
          box-sizing: content-box !important;
          height: 20px !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          margin-bottom: 0 !important;
          border-width: 0 0 0 3px !important;
          border-style: none none none solid !important;
          border-color: transparent !important;
          padding: 10px 10px 10px 17px !important;
          text-transform: uppercase !important;
          line-height: 20px;
          
          > div.ui.circular.label {
            float: right;
            box-sizing: border-box !important;
            height: 20px !important;
            margin-right: 0 !important;
            border: solid 1px #dee2e6;
            padding-top: 4px !important;
            padding-bottom: 4px !important;
            background-color: #f8f9fb;
            color: #848893;
          }
          
          &.active {
            border-color: #2599d5 !important;
            font-weight: 400;
        
            > div.ui.circular.label {
              padding-top: 5px !important;
              padding-bottom: 5px !important;
            }
          }
        }
      }
    }
  }
`

const CircularLabel = styled(Label)`
  margin-left: 5px !important;
  bottom: auto;
  font-size: 0.7142857rem !important;
  font-style: normal !important;
  font-weight: 400 !important;
`

class HighMenu extends Component {
  state = {
    categories: [],
    menuItems: [],
    menuSpace: 0
  }

  constructor(props) {
    super(props)

    this.refMenu = React.createRef()
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount = async () => {
    window.addEventListener('resize', this.handleResize)

    await this.props.getCategories()
    this.handleResize()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.categories !== this.props.categories) {
      this.updateCategories(this.props.categories)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    let notificationsMenu = this.refMenu.current.children[0]
    const dotsSpace = 20
    const menuStyles = window.getComputedStyle(notificationsMenu)
    let freeSpace = notificationsMenu.offsetWidth - parseInt(menuStyles.paddingLeft) - parseInt(menuStyles.paddingRight)
    let nIndex = 0;

    for (nIndex = 0; nIndex < notificationsMenu.children.length; nIndex++) {
      let notificationItem = notificationsMenu.children[nIndex]
      if (notificationItem.tagName.toLowerCase() !== 'a')
        continue

      const itemStyles = window.getComputedStyle(notificationItem)
      let itemWidth = notificationItem.clientWidth
                    + parseInt(itemStyles.marginLeft)
                    + parseInt(itemStyles.marginRight)

      if ((parseInt(itemWidth) + dotsSpace) < parseInt(freeSpace)) {
        freeSpace -= parseInt(itemWidth)
      } else {
        break
      }
    }

    this.setState({menuSpace: nIndex})
  }

  updateCategories = value => {
    const { intl: { formatMessage }, topMenuTab } = this.props

    // Generate menu items from returned Categories
    const menuItems = value.map(cat => {
      return {
        key: cat.category,
        name: cat.category,
        content:
          (
            <>
              {formatMessage({
                id: `alerts.menu.${cat.category.toLowerCase()}`,
                defaultMessage: cat.category.replace(/_/g, ' ')
              })}
              <CircularLabel
                circular
              >
                {cat.newMessages}
              </CircularLabel>
            </>
          ),
        onClick: () => this.loadData(cat.category),
        style: { textTransform: 'uppercase' },
        'data-test': `menu_alerts_${cat.category}`
      }
    })

    this.setState(
      {
        categories: value,
        menuItems
      },
      () => {
        if (value.length && value.findIndex(cat => cat.category === topMenuTab) === -1) {
          this.loadData(value[0].category)
        }
      })
  }

  loadData(category) {
    this.props.loadData(category)
  }

  render() {
    const {
      topMenuTab
    } = this.props

    const {
      categories,
      menuItems,
      menuSpace
    } = this.state

    const activeIndex = categories.findIndex(cat => cat.category === topMenuTab)

    return (
      <Container fluid style={{ padding: '0 32px' }}>
        <div ref={this.refMenu}>
          <StyledMenu
            pointing
            secondary
            activeIndex={activeIndex}
            >
            {menuItems.map((item, itemIndex) =>
              <>
                {menuSpace === 0 || menuSpace > itemIndex
                  ? (
                    <Menu.Item key={item.key} active={itemIndex === activeIndex} onClick={item.onClick} data-test={item['data-test']} style={{ textTransform: 'uppercase' }}>
                      {item.content}
                    </Menu.Item>
                  )
                  : (
                    <Menu.Item key={item.key} active={itemIndex === activeIndex} onClick={item.onClick} data-test={item['data-test']} style={{ position: 'absolute', top: '-20000px', left: '-20000px', textTransform: 'uppercase' }}>
                      {item.content}
                    </Menu.Item>
                  )
                }
              </>
            )}
            {menuSpace > 0 && menuSpace < menuItems.length
              ? (
                <Dropdown text={<MoreHorizontal />} direction='left'>
                  <Dropdown.Menu>
                    {menuItems.map((item, itemIndex) => menuSpace <= itemIndex
                      ? (
                        <Dropdown.Item key={item.key} active={itemIndex === activeIndex} onClick={item.onClick} data-test={item['data-test']}>
                          {item.content}
                        </Dropdown.Item>
                      )
                      : null)}
                  </Dropdown.Menu>
                </Dropdown>
              )
              : null
            }
          </StyledMenu>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { alerts } = state
  return {
    topMenuTab: alerts.topMenuTab,
    categories: alerts.categories
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(HighMenu)))

