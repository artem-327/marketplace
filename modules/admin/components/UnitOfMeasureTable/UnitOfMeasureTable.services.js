export const makeRows = datagrid => datagrid.rows.map(d => {
    return {
        id: d.id,
        name: d.name,
        nameAbbreviation: d.nameAbbreviation,
        measureType: d.measureType.name,
        measureTypeId: d.measureType.id,
        ratioToBaseSiUnit: d.ratioToBaseSiUnit,
        system: d.system
    }
})