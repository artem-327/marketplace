import { Component } from 'react'
import PropTypes from 'prop-types'
// @ts-ignore
import { FormattedMessage } from 'react-intl'
//Components
import { setupPages } from '../constants'
//Styles
import { Rectangle, Title, Content, OvalEmpty, OvalFocus, Icons } from './styles'

class SetupIndicator extends Component {
  getIcons = () => {
    const { activeStep } = this.props

    return (
      <Icons>
        {setupPages.map((_, index) => {
          if (index <= activeStep) {
            return <OvalFocus key={index} />
          } else {
            return <OvalEmpty key={index} />
          }
        })}
      </Icons>
    )
  }

  render() {
    const { activeStep = 0 } = this.props
    if (!setupPages.length) return
    else {
      return (
        <Rectangle>
          <div>
            <Title>
              <FormattedMessage
                id={setupPages ? setupPages[activeStep].title : 'global.title'}
                defaultMessage={'Title'}>
                {
                  // @ts-ignore
                  text => text
                }
              </FormattedMessage>
            </Title>
            <Content>
              <FormattedMessage id={setupPages[activeStep].content} defaultMessage={'Content'}>
                {
                  // @ts-ignore
                  text => text
                }
              </FormattedMessage>
            </Content>
          </div>
          {this.getIcons()}
        </Rectangle>
      )
    }
  }
}

SetupIndicator.propTypes = {
  activeStep: PropTypes.number
}

SetupIndicator.defaultProps = {
  activeStep: 0
}

export default SetupIndicator
