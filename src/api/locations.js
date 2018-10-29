import axios from 'axios';

const api = {
    fetchRegions: () => axios.get('/api/r1prnp/regions/').then(response => response.data.data.regions),
    fetchRegionDetail: (id) => fakeRegion[id-1],
    fetchStates: () => fakeStates,
    fetchStateDetail: (id) => fakeState[id-1],
};

const fakeStates = [
    {id: 1, name: "Utah"},
    {id: 2, name: "Arizona"}
]

const fakeState = [
    {id: 1, name: "Utah", companies: [{id: 1, name: "Company A", include: false, anonymous: false}, {id: 2, name: "Company B", include: false, anonymous: false}]},
    {id: 2, name: "Arizona", companies: [
        {id: 3, name: "Company C", include: false, anonymous: false}, 
        {id: 4, name: "Company D", include: false, anonymous: false},
        {id: 5, name: "Company E", include: false, anonymous: false}, 
        {id: 6, name: "Company F", include: false, anonymous: false}
    ]}
]

const fakeRegion = [
    {id: 1, name: "South America", states: [
    {id: 1, name: "Utah", include: false, anonymous: false}, 
    {id: 2, name: "Arizona", include: false, anonymous: false}
    ]}
]

export default api;
