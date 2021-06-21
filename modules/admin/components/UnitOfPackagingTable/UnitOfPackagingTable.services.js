export const makeRows = datagrid => datagrid.rows.map(d => {
    return {
    id: d.id,
    name: d.name,
    nameAbbreviation: d.nameAbbreviation,
    measureType: d.measureType.name,
    measureTypeId: d.measureType.id,
    length: d.length,
    width: d.width,
    height: d.height,
    palletPkgMax: d.palletPkgMax,
    palletPkgMin: d.palletPkgMin,
    weight: d.weight,
    weightUnit: d.weightUnit,
    dimensionUnit: d.dimensionUnit
    }
})