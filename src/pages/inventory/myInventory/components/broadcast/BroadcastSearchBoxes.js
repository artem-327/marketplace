import React from 'react';
import { required } from "../../../../../utils/validation";
import RemoteComboBoxRedux from "../../../../../components/ComboBox/RemoteComboBoxRedux";

export const RegionsSearchBox = ({ regions, fetchRegions,isFetching, dispatch }) => (
    <RemoteComboBoxRedux
        items={regions}
        api={text => fetchRegions(text)}
        limit={6}
        placeholder="Search For a Region"
        isFetching={isFetching}
        saveObj={obj => {return {type: "region", ...obj}}}
        validators={{ required }}
        dispatch={dispatch}
        model="forms.brcRules.search"
    />
);

export const StatesSearchBox = ({ states, fetchStates, isFetching, dispatch }) => (
    <RemoteComboBoxRedux
        items={states}
        api={text => fetchStates(text)}
        limit={6}
        placeholder="Search For a State"
        isFetching={isFetching}
        saveObj={obj => {return {type: "state", ...obj}}}
        validators={{ required }}
        dispatch={dispatch}
        model="forms.brcRules.search"
    />
);

export const CompaniesSearchBox = ({ companies, fetchCompanies, isFetching, dispatch }) => (
    <RemoteComboBoxRedux
        items={companies}
        api={text => fetchCompanies(text)}
        limit={6}
        placeholder="Search For a Company"
        isFetching={isFetching}
        saveObj={obj => {return {type: "company", ...obj}}}
        validators={{ required }}
        dispatch={dispatch}
        model="forms.brcRules.search"
    />
);

export const DefaultSearchBox = () => (
    <RemoteComboBoxRedux
        disabled
        items={[]}
        limit={20}
        placeholder="Search Company or Region"
        model="forms.brcRules.search"
    />
);


