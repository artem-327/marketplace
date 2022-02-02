import { Input, Dropdown, Button  } from "semantic-ui-react"
import { ChangeEvent, useState } from 'react'
import { InputOnChangeData } from "semantic-ui-react/dist/commonjs/elements/Input/Input"
import api from "../api"
import { BroadcastCalculationHistory, CalculationTarget} from "./Model"
import { getRows } from './BroadcastCalculationsService'
import * as React from "react"
import { DropdownProps } from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown"
import { DropdownItemProps } from "semantic-ui-react/dist/commonjs/modules/Dropdown/DropdownItem"

const CalculationsTableHandlers  = (props) => {
    const [entityId, setEntityId] = useState<number>()
    const [entityType, setEntityType] = useState<CalculationTarget>()

    const changedFilterEntityId = (data: InputOnChangeData): void => {
        setEntityId(Number(data.value))
        loadAndUpdateRows(Number(data.value), entityType)
    }

    const changedFilterEntityType = (data: DropdownProps): void => {
        if (data.value == "") {
            setEntityType(null)
            loadAndUpdateRows(entityId, null)
            return
        }
        setEntityType(CalculationTarget[String(data.value)])
        loadAndUpdateRows(entityId, CalculationTarget[String(data.value)])
    }

    const loadAndUpdateRows = async (entityId: number, entityType: CalculationTarget): Promise<void> => {
        const records: BroadcastCalculationHistory[] = await api.getBroadcastCalculationsHistory({ entityId, entityType})
        props.updateRows(getRows(records))
    }

    const entityTypes: DropdownItemProps[] = [
        { text: 'Branch', value: CalculationTarget.BRANCH, key: 0 },
        { text: 'Product Offer', value: CalculationTarget.PRODUCT_OFFER, key: 1}
    ]

    return (
        <div>
            <Input
                style={{ width: 150, marginRight: 40 }}
                type={'number'}
                icon='search'
                name='filterEntityType'
                placeholder={'Entity ID'}
                onChange={(event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => changedFilterEntityId(data)}
            />
            <Dropdown
                style={{ width: '220px', marginRight: 40 }}
                clearable={true}
                placeholder={'Entity Type'}
                name='status'
                selection
                value={entityType}
                options={entityTypes}
                onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => changedFilterEntityType(data)}
            />
            <Button
                icon={'refresh'}
                onClick={() => loadAndUpdateRows(entityId, entityType)}>
            </Button>
        </div>
    )
}

export default CalculationsTableHandlers