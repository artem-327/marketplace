import { FormattedNumber, FormattedMessage } from 'react-intl'
import { Popup } from 'semantic-ui-react'
import { debounce } from 'lodash'
// Components
import { UnitOfPackaging } from '../../../../components/formatted-messages'
import ActionCell from '../../../../components/table/ActionCell'
import confirm from '../../../../components/Confirmable/confirm'
// Styles
import { FileTextIcon, DivCircle } from './MyProducts.styles'
// Services
import { getSafe } from '../../../../utils/functions'

export const getMappedRows = datagrid => datagrid.rows.map(product => {
    return {
    ...product,
    rawData: product,
    intProductName: product.intProductName,
    packagingTypeName: getSafe(() => product.packagingType.name) ? (
        <UnitOfPackaging value={product.packagingType.name} />
    ) : (
        'N/A'
    ),
    packagingType: getSafe(() => product.packagingType.id),
    packagingSize: getSafe(() => product.packagingSize, 'N/A'),
    packagingSizeFormatted: product.packagingSize ? (
        <FormattedNumber value={product.packagingSize} minimumFractionDigits={0} />
    ) : (
        'N/A'
    ),
    //packagingGroup: getSafe(() => product.packagingGroup.id),
    genericProductCode: getSafe(() => product.companyGenericProduct.code, 'N/A'),
    genericProductName: getSafe(() => product.companyGenericProduct.name, 'N/A'),
    unit: getSafe(() => product.packagingUnit.nameAbbreviation, 'N/A'),
    packagingUnit: getSafe(() => product.packagingUnit.id),
    productStatusTmp:
        product.companyGenericProduct && !product.companyGenericProduct.isPublished ? (
        <Popup
            size='small'
            header={
            <FormattedMessage
                id='global.notPublished'
                defaultMessage='This echo product is not published and will not show on the Marketplace.'
            />
            }
            trigger={
            <div>
                <FileTextIcon />
            </div>
            } // <div> has to be there otherwise popup will be not shown
        />
        ) : null,
    productGroup: getSafe(
        () => product.companyGenericProduct.productGroup.name,
        <FormattedMessage id='global.unmapped.cptlz' defaultMessage='Unmapped' />
    )
    }
})


export const handleFiltersValue = debounce((filter, props) => {
    const { datagrid } = props
    datagrid.setSearch(filter, true, 'pageFilters')
}, 300)

export const handleFilterChangeInputSearch = (data, props, state, setState) => {
    const filter = {
    ...state.filterValue,
    [data.name]: data.value
    }
    setState({ ...state, filterValue: filter })
    handleFiltersValue(filter, props)
}

export const handleFilterChangeMappedUnmapped = (data, props, state, setState) => {
    props.handleProductCatalogUnmappedValue(data.value)

    const filter = {
    ...state.filterValue,
    [data.name]: data.value
    }
    setState({ ...state, filterValue: filter })
    handleFiltersValue(filter, props)
}

const getActions = props => {
    const { openPopup, deleteProduct, intl, datagrid } = props
    const { formatMessage } = intl
    return [
    {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openPopup(row.rawData)
    },
    {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        disabled: row => props.editedId === row.id,
        callback: row => {
        return confirm(
            formatMessage({ id: 'confirm.deleteProduct', defaultMessage: 'Delete Product' }),
            formatMessage(
            {
                id: 'confirm.deleteItem',
                defaultMessage: `Do you really want to delete '${row.rawData.intProductName}'?`
            },
            { item: row.rawData.intProductName }
            )
        ).then(async () => {
            try {
            await deleteProduct(row.id, row.intProductName)
            datagrid.removeRow(row.id)
            } catch (e) {
            console.error(e)
            }
        })
        }
    }
    ]
}

const getProductStatus = product => {
    let status = product.companyGenericProduct
    ? !product.companyGenericProduct.isPublished
        ? 'Unpublished'
        : ''
    : 'Unmapped'

    let popupText, dispIcon

    switch (status) {
    case 'Unpublished':
        popupText = (
        <FormattedMessage
            id='global.notPublished'
            defaultMessage='This Company Generic Product is not published and will not be shown on the Marketplace.'
        />
        )
        dispIcon = <DivCircle className='red' />
        break

    case 'Unmapped':
        popupText = (
        <FormattedMessage
            id='settings.product.unmapped'
            defaultMessage='This product is not mapped and will not show on the Marketplace.'
        />
        )
        dispIcon = <DivCircle className='red' />
        break

    default:
        popupText = (
        <FormattedMessage
            id='global.productOk'
            defaultMessage='This product is being broadcasted to the marketplace'
        />
        )
        dispIcon = <DivCircle />
    }

    return (
    <Popup
        size='small'
        header={popupText}
        trigger={<div>{dispIcon}</div>} // <div> has to be there otherwise popup will be not shown
    />
    )
}

export const getRows = (rows, props) => {
    const { openPopup } = props

    return rows.map(r => {
    return {
        ...r,
        intProductName: (
        <ActionCell
            row={r}
            getActions={() => getActions(props)}
            content={r.intProductName}
            onContentClick={() => openPopup(r.rawData)}
            leftContent={getProductStatus(r.rawData)}
        />
        )
    }
    })
}

export const columns = [
    {
      name: 'intProductName',
      title: (
        <FormattedMessage id='global.intProductName' defaultMessage='Internal Product Name' />
      ),
      width: 250,
      sortPath: 'CompanyProduct.intProductName',
      allowReordering: false
    },
    {
      name: 'intProductCode',
      title: (
        <FormattedMessage id='global.intProductCode' defaultMessage='Internal Product Code' />
      ),
      width: 190,
      sortPath: 'CompanyProduct.intProductCode'
    },
    {
      name: 'genericProductName',
      title: (
        <FormattedMessage id='global.genericProductName' defaultMessage='Generic Product Name!' />
      ),
      width: 230,
      sortPath: 'CompanyProduct.companyGenericProduct.name'
    },
    {
      name: 'genericProductCode',
      title: (
        <FormattedMessage id='global.genericProductCode' defaultMessage='Generic Product Code!' />
      ),
      width: 200,
      sortPath: 'CompanyProduct.companyGenericProduct.code'
    },
    {
      name: 'packagingSizeFormatted',
      title: (
        <FormattedMessage id='global.packagingSize' defaultMessage='Packaging Size' />
      ),
      width: 140,
      sortPath: 'CompanyProduct.packagingSize'
    },
    {
      name: 'unit',
      title: (
        <FormattedMessage id='global.packagingUnit' defaultMessage='Packaging Unit' />
      ),
      width: 140,
      sortPath: 'CompanyProduct.packagingUnit.nameAbbreviation'
    },
    {
      name: 'packagingTypeName',
      title: (
        <FormattedMessage id='global.packagingType' defaultMessage='Packaging Type' />
      ),
      width: 150,
      sortPath: 'CompanyProduct.packagingType.name'
    },
    {
      name: 'productGroup',
      title: (
        <FormattedMessage id='global.productGroup' defaultMessage='Product Group' />
      ),
      width: 200,
      sortPath: 'CompanyProduct.companyGenericProduct.name'
    }
]
