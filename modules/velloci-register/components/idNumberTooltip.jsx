import PropTypes from 'prop-types'
import { Info } from 'react-feather'
import { GridColumn } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Rectangle, CustomDivContent, CustomDivInTitle, CustomDivTitle } from '~/modules/cart/components/StyledComponents'

function IdNumberTooltip(props) {
  return (
    <GridColumn {...props}>
      <Rectangle style={{ margin: '24px 0px 10px 0px' }}>
        <CustomDivTitle>
          <Info size={20} style={{ color: '#3bbef6' }} />
          <CustomDivInTitle style={{ color: '#3bbef6' }}>
            <FormattedMessage
              id='velloci.personalInfo.infoTitle'
              defaultMessage='Valid ID Numbers include:'
            />
          </CustomDivInTitle>
        </CustomDivTitle>
        <CustomDivContent style={{ color: '#848893', padding: '4px 30px' }}>
          <FormattedMessage
            id='velloci.personalInfo.infoContent'
            defaultMessage={`This is the number on your current government issued identification card or document. 
              <br>For example:</br> 
              <br>- Social Security Number (U.S.)</br>
              <br>- Social Insurance Number (Canada)</br>
              <br>- National ID Number (Singapore, Vietnam, China)</br>
              <br>- Passport Number</br>
              <br>- Driver's License Number</br>`}
            values={{
              br: chunks => <><br/>{chunks}</>
            }}
          />
        </CustomDivContent>
      </Rectangle>
    </GridColumn>
  )
}

IdNumberTooltip.propTypes = {
  computer: PropTypes.number,
  tablet: PropTypes.number,
  mobile: PropTypes.number,
}

IdNumberTooltip.defaultProps = {
  computer: 6,
  tablet: 6,
  mobile: 16
}

export default injectIntl(IdNumberTooltip)
