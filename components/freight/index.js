import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Icon, Button } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
//Styled
import { CustomMessage } from '~/modules/cart/components/StyledComponents'
import styled from 'styled-components'

const DivLine = styled.div`
  border-bottom: solid 1px #dee2e6;
`

const ColumnWithLine = styled(Grid.Column)`
  padding: 0 !important;
  align-self: center !important;
`

const RowWithLine = styled(Grid.Row)`
  padding-bottom: 0 !important;
`

const RowWithRectangle = styled(Grid.Row)`
  padding-top: 0 !important;
`

const ColumnWithRectangle = styled(Grid.Column)`
  padding-top: 0 !important;
`

const FREIGHT_TYPES = {
  ECHO: 'ECHO_FREIGHT',
  OWN: 'OWN_FREIGHT'
}
const FreightLabel = ({ echoFreight, setFieldValue }) => (
  <>
    <RowWithLine>
      <ColumnWithLine width={7}>
        <DivLine />
      </ColumnWithLine>
      <Grid.Column textAlign='center' width={2}>
        <FormattedMessage id='cart.or' defaultMessage='OR' />
      </Grid.Column>
      <ColumnWithLine width={7}>
        <DivLine />
      </ColumnWithLine>
    </RowWithLine>
    <RowWithRectangle>
      <ColumnWithRectangle>
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
      </ColumnWithRectangle>
    </RowWithRectangle>
  </>
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
