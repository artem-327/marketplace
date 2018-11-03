import axios from 'axios';

const api = {
  fetchBroadcast: () => fakeBroadcast,
};

export default api;


const fakeBroadcast = {
  root: {
    type: "root",
    id: 1,
    broadcast: 0, 
    anonymous: 2, 
    priceAddition: null, 
    priceMultiplier: null,
    regions: [
      { 
        type: "region", 
        id: 1, 
        name: "Europe", 
        broadcast: 0, 
        anonymous: 2, 
        priceAddition: 150, 
        priceMultiplier: null, 
        states: [
          {
            type: "country", 
            id: 1, 
            name: "Czech Republic", 
            broadcast: 0, 
            anonymous: 2, 
            priceAddition: 150, 
            priceMultiplier: null,
            companies: [
              {
                type: "company", 
                id: 1, 
                name: "Company A", 
                broadcast: 0, 
                anonymous: 2, 
                priceAddition: 150, 
                priceMultiplier: null,
                offices: [
                  {
                    type: "office", 
                    id: 1, 
                    name: "Office AA", 
                    broadcast: 0, 
                    anonymous: 2, 
                    priceAddition: 150, 
                    priceMultiplier: null,
                  }
                ]
              },
              {
                type: "company", 
                id: 2, 
                name: "Company B", 
                broadcast: 2, 
                anonymous: 2, 
                priceAddition: 150, 
                priceMultiplier: null,
                offices: [
                  {
                    type: "office", 
                    id: 2, 
                    name: "Office BA", 
                    broadcast: 2, 
                    anonymous: 2, 
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
        broadcast: 2, 
        anonymous: 2, 
        priceAddition: 200, 
        priceMultiplier: null, 
        states: [{
          type: "country", 
          id: 2, 
          name: "Utah", 
          broadcast: 2, 
          anonymous: 2, 
          priceAddition: 200, 
          priceMultiplier: null,
          companies: [{
            type: "company", 
            id: 3, 
            name: "Company C", 
            broadcast: 2, 
            anonymous: 2, 
            priceAddition: 150, 
            priceMultiplier: null,
            offices: [
              {
                type: "office", 
                id: 3, 
                name: "Office CA", 
                broadcast: 2, 
                anonymous: 2, 
                priceAddition: 150, 
                priceMultiplier: null,
              }
            ]
          }]
        }]
      }
    ]
  }
}

