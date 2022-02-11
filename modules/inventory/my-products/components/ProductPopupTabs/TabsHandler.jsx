/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { Menu } from 'semantic-ui-react'

// Styles
import { StyledMenu } from './styles'

// Constants
import { tabs } from './constants'

const TabsHandler = props => {
  const { intl: { formatMessage }, actualTab, onChange } = props

  return (
    <StyledMenu pointing secondary>
      {tabs.map((tab, i) =>
        <Menu.Item key={i} onClick={() => onChange(tab.key)} active={actualTab === tab.key}>
          {formatMessage(tab.text)}
        </Menu.Item>
      )}
    </StyledMenu>
  )
}

TabsHandler.propTypes = {
  actualTab: PropTypes.string,
  onChange: PropTypes.func
}

TabsHandler.defaultProps = {
  actualTab: 'edit',
  onChange: () => { }
}

export default injectIntl(TabsHandler)