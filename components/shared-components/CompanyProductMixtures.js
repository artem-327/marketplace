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
      padding: 5px 0 !important;
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


const StyledRow = styled(GridRow)`

`

export default class CompanyProductMixtures extends Component {
  render() {
    let { casProducts, prefix } = this.props

    return (
      <StyledGrid>
        {casProducts.length > 0 && (
          <BottomUnpaddedRow columns={6}>
            <GridColumn>
                <FormattedMessage id='global.casIndexNumber' defaultMessage='CAS Index Number' />
            </GridColumn>

            <GridColumn>
                <FormattedMessage id='global.casIndexName' defaultMessage='CAS Index Name' />
            </GridColumn>

            <GridColumn>
                <FormattedMessage id='global.assayMin' defaultMessage='Assay Min' />
            </GridColumn>

            <GridColumn>
                <FormattedMessage id='global.assayMax' defaultMessage='Assay Max' />
            </GridColumn>

            <GridColumn>
                <FormattedMessage id='global.caProp65' defaultMessage='CA PROP 65' />
            </GridColumn>

            <GridColumn>
                <FormattedMessage id='global.regulatoryReach' defaultMessage='REACH' />
            </GridColumn>
          </BottomUnpaddedRow>
        )}
        {casProducts.map((el, i) => {
          return (
            <StyledRow columns={6} key={i}>
              <GridColumn>
                <Input name={`${prefix}[${i}].casIndexNumber`} inputProps={{ transparent: true, readOnly: true }} />
              </GridColumn>
              <GridColumn>
                <Input name={`${prefix}[${i}].casIndexName`} inputProps={{ transparent: true, readOnly: true }} />
              </GridColumn>

              <GridColumn>
                <Input name={`${prefix}[${i}].min`} inputProps={{ transparent: true, readOnly: true }} />
              </GridColumn>

              <GridColumn>
                <Input name={`${prefix}[${i}].max`} inputProps={{ transparent: true, readOnly: true }} />
              </GridColumn>

              <GridColumn>
                {el?.casProduct?.caprop65 === true
                  ? <FormattedMessage id='global.yes' defaultMessage='Yes' />
                  : (el?.casProduct?.caprop65 === false ? <FormattedMessage id='global.no' defaultMessage='No' /> : '')
                }
              </GridColumn>

              <GridColumn>
                {el?.casProduct?.reach === true
                  ? <FormattedMessage id='global.yes' defaultMessage='Yes' />
                  : (el?.casProduct?.reach === false ? <FormattedMessage id='global.no' defaultMessage='No' /> : '')
                }
              </GridColumn>
            </StyledRow>
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
