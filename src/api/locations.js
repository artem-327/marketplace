import axios from 'axios';

const api = {
    fetchRegions: () => axios.get('/api/r1prnp/regions/').then(response => response.data.data.regions),
    fetchRegionDetail: (id) => axios.get(`/api/eq0kii/countries/?regionId=${id}`).then(response => response.data.data),
    fetchStates: () => axios.get(`/api/eq0kii/countries/`).then(response => response.data.data.countries),
    fetchStateDetail: (id) => axios.get(`/api/9o9w90/companies/?entityId=${id}&entityType=country`).then(response => response.data.data),
    
    //fetchRegionDetail: (id) => fakeRegion[id-1],
    //fetchStates: () => fakeStates,
    //fetchStateDetail: (id) => fakeState[id-1],
};

const fakeStates = [
    {id: 1, name: "Utah"},
    {id: 2, name: "Arizona"}
]

const fakeState = [
    {id: 1, name: "Utah", companies: [
        {id: 1, name: "Company A"}, 
        {id: 2, name: "Company B"}
    ]},
    {id: 2, name: "Arizona", companies: [
        {id: 3, name: "Company C"}, 
        {id: 4, name: "Company D"},
        {id: 5, name: "Company E"}, 
        {id: 6, name: "Company F"}
    ]}
]

const fakeRegion = [
    {id: 1, name: "South America", countries: [
    {id: 1, name: "Utah"}, 
    {id: 2, name: "Arizona"}
    ]}
]

export default api;
