import { memo } from 'react'
import PropTypes from 'prop-types'
import { GridColumn, GridRow } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

//Styles
import {
  DivTableWrapper,
  GridStyledTds,
  GridColumnCustom,
  DivTdsTableHeader,
  DivTdsPropertyText,
  DivNormalText
} from '../ListingDetail.styles'

const TDSTab = ({ row }) => {
  let elementsTdsFields = row?.elementsTdsFields?.elements ? row?.elementsTdsFields?.elements : []
  elementsTdsFields = elementsTdsFields.filter(el => el.property !== '' && el.specifications !== '')

  return (
    <DivTableWrapper>
      {elementsTdsFields.length > 0 && (
        <>
          <GridStyledTds>
            <GridRow>
              <GridColumnCustom width={2} value='padding: 0 12px 0 0 !important;'>
                <DivTdsTableHeader>
                  <FormattedMessage id='global.property' defaultMessage='Property'/>
                </DivTdsTableHeader>
              </GridColumnCustom>
              <GridColumn width={14}>
                <DivTdsTableHeader>
                  <FormattedMessage id='global.specifications' defaultMessage='Specifications'/>
                </DivTdsTableHeader>
              </GridColumn>
            </GridRow>
          </GridStyledTds>
          <GridStyledTds bordered='true'>
            {elementsTdsFields.map((el, index) => (
              <GridRow key={index}>
                <GridColumn width={2}>
                  <DivTdsPropertyText>
                    {el.property}
                  </DivTdsPropertyText>
                </GridColumn>
                <GridColumn width={14}>
                  <DivNormalText>
                    {el.specifications}
                  </DivNormalText>
                </GridColumn>
              </GridRow>
            ))}
          </GridStyledTds>
        </>
      )}
    </DivTableWrapper>
  )
}

TDSTab.propTypes = {}
TDSTab.defaultProps = {}

function areEqual(prevProps, nextProps) {
  return prevProps?.row?.id === nextProps?.row?.id
}

const MemoTDSTab = memo(TDSTab, areEqual)

export default MemoTDSTab
