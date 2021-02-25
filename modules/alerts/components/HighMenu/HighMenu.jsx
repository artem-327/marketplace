import { createRef, Component } from 'react'
import { connect } from 'react-redux'
import { Container, Menu, Dropdown } from 'semantic-ui-react'
import { injectIntl } from 'react-intl'
import { MoreHorizontal } from 'react-feather'
//Actions
import * as Actions from '../../actions'
//Components
import { withDatagrid } from '../../../datagrid'
//Styles
import { StyledMenu, CircularLabel } from './HighMenu.styles'
import {getSafe} from "../../../../utils/functions";

/**
 * Show menu items in header Notification.
 * @category Alert
 * @component
 */
class HighMenu extends Component {
  state = {
    categories: [],
    menuItems: [],
    menuSpace: 0
  }

  constructor(props) {
    super(props)

    this.refMenu = createRef()
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount = async () => {
    window.addEventListener('resize', this.handleResize)

    await this.props.getCategories()
    this.handleResize()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps.categories) !== JSON.stringify(this.props.categories)) {
      this.updateCategories(this.props.categories)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    if (!(this.refMenu && this.refMenu.current)) return
    let notificationsMenu = this.refMenu.current.children[0]
    const dotsSpace = 20
    const menuStyles = window.getComputedStyle(notificationsMenu)
    let freeSpace = notificationsMenu.offsetWidth - parseInt(menuStyles.paddingLeft) - parseInt(menuStyles.paddingRight)
    let nIndex = 0

    for (nIndex = 0; nIndex < notificationsMenu.children.length; nIndex++) {
      let notificationItem = notificationsMenu.children[nIndex]
      if (notificationItem.tagName.toLowerCase() !== 'a') continue

      const itemStyles = window.getComputedStyle(notificationItem)
      let itemWidth = notificationItem.clientWidth + parseInt(itemStyles.marginLeft) + parseInt(itemStyles.marginRight)

      if (parseInt(itemWidth) + dotsSpace < parseInt(freeSpace)) {
        freeSpace -= parseInt(itemWidth)
      } else {
        break
      }
    }

    this.setState({ menuSpace: nIndex })
  }

  updateCategories = value => {
    const {
      intl: { formatMessage },
      topMenuTab
    } = this.props

    // Generate menu items from returned Categories
    const menuItems = value.map(cat => {
      return {
        key: cat.category,
        name: cat.category,
        content: (
          <>
            {formatMessage({
              id: `alerts.menu.${cat.category.toLowerCase()}`,
              defaultMessage: cat.category.replace(/_/g, ' ')
            })}
            <CircularLabel circular>{cat.newMessages}</CircularLabel>
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
      }
    )
  }

  loadData(category) {
    const { isAdmin, topMenuTab } = this.props
    this.props.loadData(isAdmin ? topMenuTab : category)
    if (this.props.onDatagridUpdate) this.props.onDatagridUpdate([])
  }

  render() {
    const { topMenuTab, isAdmin } = this.props

    const { categories, menuItems, menuSpace } = this.state

    const activeIndex = categories.findIndex(cat => cat.category === topMenuTab)

    return isAdmin ? null : (
      <Container fluid style={{ padding: '0 32px' }}>
        <div ref={this.refMenu}>
          <StyledMenu pointing secondary activeIndex={activeIndex}>
            {menuItems.map((item, itemIndex) => (
              <>
                {menuSpace === 0 || menuSpace > itemIndex ? (
                  <Menu.Item
                    key={item.key}
                    active={itemIndex === activeIndex}
                    onClick={item.onClick}
                    data-test={item['data-test']}
                    style={{ textTransform: 'uppercase' }}>
                    {item.content}
                  </Menu.Item>
                ) : (
                  <Menu.Item
                    key={item.key}
                    active={itemIndex === activeIndex}
                    onClick={item.onClick}
                    data-test={item['data-test']}
                    style={{ position: 'absolute', top: '-20000px', left: '-20000px', textTransform: 'uppercase' }}>
                    {item.content}
                  </Menu.Item>
                )}
              </>
            ))}
            {menuSpace > 0 && menuSpace < menuItems.length ? (
              <Dropdown text={<MoreHorizontal />} direction='left'>
                <Dropdown.Menu>
                  {menuItems.map((item, itemIndex) =>
                    menuSpace <= itemIndex ? (
                      <Dropdown.Item
                        key={item.key}
                        active={itemIndex === activeIndex}
                        onClick={item.onClick}
                        data-test={item['data-test']}>
                        {item.content}
                      </Dropdown.Item>
                    ) : null
                  )}
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
          </StyledMenu>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  const { alerts } = state
  return {
    isAdmin: getSafe(() => state.auth.identity.isAdmin, false),
    topMenuTab: alerts.topMenuTab,
    /**
     * Categories from api/messaging-center/message-categories
     * Removed all Wanted_Board categories based on https://bluepallet.atlassian.net/browse/DT-88
     */
    categories: alerts.categories.filter(cat => cat.category.indexOf('Wanted_Board') < 0)
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(HighMenu)))
