import axios from 'axios';

const api = {
  fetchBroadcast: () => fakeBroadcast,
};

export default api;


const fakeBroadcast = {
  root: {
    type: "root", 
    broadcast: false, 
    anonymous: true, 
    priceAddition: null, 
    priceMultiplier: null,
    regions: [
      { 
        type: "region", 
        id: 1, 
        name: "Europe", 
        broadcast: false, 
        anonymous: true, 
        priceAddition: 150, 
        priceMultiplier: null, 
        states: [
          {
            type: "country", 
            id: 1, 
            name: "Czech Republic", 
            broadcast: false, 
            anonymous: true, 
            priceAddition: 150, 
            priceMultiplier: null,
            companies: [
              {
                type: "company", 
                id: 1, 
                name: "Company A", 
                broadcast: false, 
                anonymous: true, 
                priceAddition: 150, 
                priceMultiplier: null,
                offices: [
                  {
                    type: "office", 
                    id: 1, 
                    name: "Office AA", 
                    broadcast: false, 
                    anonymous: true, 
                    priceAddition: 150, 
                    priceMultiplier: null,
                  }
                ]
              },
              {
                type: "company", 
                id: 2, 
                name: "Company B", 
                broadcast: true, 
                anonymous: true, 
                priceAddition: 150, 
                priceMultiplier: null,
                offices: [
                  {
                    type: "office", 
                    id: 2, 
                    name: "Office BA", 
                    broadcast: true, 
                    anonymous: true, 
                    priceAddition: 150, 
                    priceMultiplier: null,
                  }
                ]
              }
            ]
          }
        ]
      },
      { 
        type: "region", 
        id: 2, 
        name: "North America", 
        broadcast: true, 
        anonymous: true, 
        priceAddition: 200, 
        priceMultiplier: null, 
        states: []
      }
    ]
  }
}

