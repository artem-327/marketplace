import { Component } from 'react'
import { array, string } from 'prop-types'
import styled from 'styled-components'
import { GridColumn, GridRow } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { Input } from 'formik-semantic-ui-fixed-validation'

const BottomUnpaddedRow = styled(GridRow)`
  padding-bottom: 0px !important;
`

const BoldLabel = styled.label`
  font-weight: bolder;
`

export default class CompanyProductMixtures extends Component {
  render() {
    let { casProducts, prefix } = this.props

    return (
      <>
        {casProducts.length > 0 && (
          <BottomUnpaddedRow columns={6}>
            <GridColumn>
              <BoldLabel>
                <FormattedMessage id='global.casIndexNumber' defaultMessage='CAS Index Number' />
              </BoldLabel>
            </GridColumn>

            <GridColumn>
              <BoldLabel>
                <FormattedMessage id='global.casIndexName' defaultMessage='CAS Index Name' />
              </BoldLabel>
            </GridColumn>

            <GridColumn>
              <BoldLabel>
                <FormattedMessage id='global.assayMin' defaultMessage='Assay Min' />
              </BoldLabel>
            </GridColumn>

            <GridColumn>
              <BoldLabel>
                <FormattedMessage id='global.assayMax' defaultMessage='Assay Max' />
              </BoldLabel>
            </GridColumn>

            <GridColumn>
              <BoldLabel>
                <FormattedMessage id='global.caProp65' defaultMessage='CA PROP 65' />
              </BoldLabel>
            </GridColumn>

            <GridColumn>
              <BoldLabel>
                <FormattedMessage id='global.regulatoryReach' defaultMessage='REACH' />
              </BoldLabel>
            </GridColumn>
          </BottomUnpaddedRow>
        )}
        {casProducts.map((el, i) => {
          return (
            <GridRow columns={6}>
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
                {el.caprop65 === true
                  ? <FormattedMessage id='global.yes' defaultMessage='Yes' />
                  : (el.caprop65 === false ? <FormattedMessage id='global.no' defaultMessage='No' /> : '')
                }
              </GridColumn>

              <GridColumn>
                {el.reach === true
                  ? <FormattedMessage id='global.yes' defaultMessage='Yes' />
                  : (el.reach === false ? <FormattedMessage id='global.no' defaultMessage='No' /> : '')
                }
              </GridColumn>
            </GridRow>
          )
        })}
      </>
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
