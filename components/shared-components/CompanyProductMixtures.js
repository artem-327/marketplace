import { Component } from 'react'
import { array, string } from 'prop-types'
import styled from 'styled-components'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { Input } from 'formik-semantic-ui-fixed-validation'

const StyledGrid = styled(Grid)`
  &.ui.grid {
    margin: -10px 0 -5px;
   
    >.row {
      padding: 0 !important;
      .column {
        padding: 0 10px !important;
      } 
    }
    
    >.row:nth-child(2){
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-top: 1px solid #dde2e6 !important;
    }
    
    >.row:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    
    >.row:not(:first-child) {
      border-left: 1px solid #dde2e6 !important;    
      border-right: 1px solid #dde2e6 !important;
      border-bottom: 1px solid #dde2e6 !important;
    }
  }
`

const BottomUnpaddedRow = styled(GridRow)`
  &.row {
    padding-bottom: 10px !important;
    font-size: 12px;
    font-weight: bold;
    color: #848893;
    line-height: 1.67;
    
    >.column:first-child {
      padding-left: 0 !important;
    }
  }
`

const DivBoolWrapper = styled.div`
  padding: 5.5px 0;
  color: #20273a;
`

export default class CompanyProductMixtures extends Component {
  render() {
    let { casProducts, prefix } = this.props

    return (
      <StyledGrid>
        {casProducts.length > 0 && (
          <BottomUnpaddedRow>
            <GridColumn width={4}>
                <FormattedMessage id='global.casIndexNumber' defaultMessage='CAS Index Number' />
            </GridColumn>

            <GridColumn width={4}>
                <FormattedMessage id='global.casIndexName' defaultMessage='CAS Index Name' />
            </GridColumn>

            <GridColumn width={2}>
                <FormattedMessage id='global.assayMin' defaultMessage='Assay Min' />
            </GridColumn>

            <GridColumn width={2}>
                <FormattedMessage id='global.assayMax' defaultMessage='Assay Max' />
            </GridColumn>

            <GridColumn width={2}>
                <FormattedMessage id='global.caProp65' defaultMessage='CA PROP 65' />
            </GridColumn>

            <GridColumn width={2}>
                <FormattedMessage id='global.regulatoryReach' defaultMessage='REACH' />
            </GridColumn>
          </BottomUnpaddedRow>
        )}
        {casProducts.map((el, i) => {
          return (
            <GridRow key={i}>
              <GridColumn width={4}>
                <Input name={`${prefix}[${i}].casIndexNumber`} inputProps={{ transparent: true, readOnly: true }} />
              </GridColumn>
              <GridColumn width={4}>
                <Input name={`${prefix}[${i}].casIndexName`} inputProps={{ transparent: true, readOnly: true }} />
              </GridColumn>

              <GridColumn width={2}>
                <Input name={`${prefix}[${i}].min`} inputProps={{ transparent: true, readOnly: true }} />
              </GridColumn>

              <GridColumn width={2}>
                <Input name={`${prefix}[${i}].max`} inputProps={{ transparent: true, readOnly: true }} />
              </GridColumn>

              <GridColumn width={2}>
                <DivBoolWrapper>
                  {el?.casProduct?.caprop65 === true
                    ? <FormattedMessage id='global.yes' defaultMessage='Yes' />
                    : (el?.casProduct?.caprop65 === false ? <FormattedMessage id='global.no' defaultMessage='No' /> : '')
                  }
                </DivBoolWrapper>
              </GridColumn>

              <GridColumn width={2}>
                <DivBoolWrapper>
                  {el?.casProduct?.reach === true
                    ? <FormattedMessage id='global.yes' defaultMessage='Yes' />
                    : (el?.casProduct?.reach === false ? <FormattedMessage id='global.no' defaultMessage='No' /> : '')
                  }
                </DivBoolWrapper>
              </GridColumn>
            </GridRow>
          )
        })}
      </StyledGrid>
    )
  }
}

CompanyProductMixtures.propTypes = {
  casProducts: array,
  prefix: string
}

CompanyProductMixtures.defaultProps = {
  casProducts: [],
  prefix: 'casProducts'
}
