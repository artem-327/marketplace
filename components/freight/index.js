import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Icon, Button } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
//Styled
import { CustomMessage } from '~/modules/cart/components/StyledComponents'

const FREIGHT_TYPES = {
  ECHO: 'ECHO_FREIGHT',
  OWN: 'OWN_FREIGHT'
}
const FreightLabel = ({ echoFreight, setFieldValue }) => (
  <Grid.Row>
    <Grid.Column>
      <CustomMessage informative={echoFreight} ownFreight={!echoFreight}>
        <Icon size='large' name={echoFreight ? 'info circle' : 'check circle outline'} />
        {echoFreight ? (
          <FormattedMessage id='cart.useOwnFreight' defaultMessage='Use my own freight' />
        ) : (
          <FormattedMessage id='cart.usingOwnFreight' defaultMessage='You are using your own freight' />
        )}
        <Button
          type='button'
          color={echoFreight && 'blue'}
          basic
          onClick={() => setFieldValue('freightType', echoFreight ? FREIGHT_TYPES.OWN : FREIGHT_TYPES.ECHO)}>
          {echoFreight ? (
            <>
              <Icon name='archive' />
              <FormattedMessage id='cart.ownFreight' defaultMessage='Own Freight'>
                {text => text}
              </FormattedMessage>
            </>
          ) : (
            <FormattedMessage id='global.cancel' defaultMessage='!Cancel'>
              {text => text}
            </FormattedMessage>
          )}
        </Button>
      </CustomMessage>
    </Grid.Column>
  </Grid.Row>
)

FreightLabel.propTypes = {
  echoFreight: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired
}

FreightLabel.defaultProps = {
  echoFreight: 'ECHO_FREIGHT',
  setFieldValue: () => {}
}

export default injectIntl(FreightLabel)
