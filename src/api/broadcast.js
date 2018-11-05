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
    anonymous: 1, 
    priceAddition: 150, 
    priceMultiplier: null,
    regions: [
      { 
        type: "region", 
        id: 1, 
        name: "Europe", 
        broadcast: 0, 
        anonymous: 1, 
        priceAddition: 150, 
        priceMultiplier: null, 
        states: [
          {
            type: "country", 
            id: 1, 
            name: "Czech Republic", 
            broadcast: 0, 
            anonymous: 1, 
            priceAddition: 150, 
            priceMultiplier: null,
            companies: [
              {
                type: "company", 
                id: 1, 
                name: "Company A", 
                broadcast: 0, 
                anonymous: 1, 
                priceAddition: 150, 
                priceMultiplier: null,
                offices: [
                  {
                    type: "office", 
                    id: 1, 
                    name: "Office AA", 
                    broadcast: 0, 
                    anonymous: 1, 
                    priceAddition: 150, 
                    priceMultiplier: null,
                  }
                ]
              },
              {
                type: "company", 
                id: 2, 
                name: "Company B", 
                broadcast: 0, 
                anonymous: 1, 
                priceAddition: 150, 
                priceMultiplier: null,
                offices: [
                  {
                    type: "office", 
                    id: 2, 
                    name: "Office BA", 
                    broadcast: 0, 
                    anonymous: 1, 
                    priceAddition: 150, 
                    priceMultiplier: null,
                  }
                ]
              }
            ]
          }, {
            type: "country", 
            id: 3, 
            name: "Slovakia", 
            broadcast: 0, 
            anonymous: 1, 
            priceAddition: 150, 
            priceMultiplier: null,
            companies: [{
              type: "company", 
              id: 2, 
              name: "Company B", 
              broadcast: 0, 
              anonymous: 1, 
              priceAddition: 150, 
              priceMultiplier: null,
              offices: [
                {
                  type: "office", 
                  id: 8, 
                  name: "Office BB", 
                  broadcast: 0, 
                  anonymous: 1, 
                  priceAddition: 150, 
                  priceMultiplier: null,
                }
              ]
            }]
          }
        ]
      },
      { 
        type: "region", 
        id: 2, 
        name: "North America", 
        broadcast: 0, 
        anonymous: 1, 
        priceAddition: 200, 
        priceMultiplier: null, 
        states: [{
          type: "country", 
          id: 2, 
          name: "Utah", 
          broadcast: 0, 
          anonymous: 1, 
          priceAddition: 200, 
          priceMultiplier: null,
          companies: [{
            type: "company", 
            id: 3, 
            name: "Morgoth's company a.s.", 
            broadcast: 0, 
            anonymous: 1, 
            priceAddition: 150, 
            priceMultiplier: null,
            offices: [
              {
                type: "office", 
                id: 3, 
                name: "Office CA", 
                broadcast: 0, 
                anonymous: 1, 
                priceAddition: 150, 
                priceMultiplier: null,
              },
              {
                type: "office", 
                id: 6, 
                name: "Office CX", 
                broadcast: 0, 
                anonymous: 1, 
                priceAddition: 150, 
                priceMultiplier: null,
              }
            ]
          }]
        }]
      },       { 
        type: "region", 
        id: 31, 
        name: "Middle Earth", 
        broadcast: 0, 
        anonymous: 1, 
        priceAddition: 200, 
        priceMultiplier: null, 
        states: [{
          type: "country", 
          id: 32, 
          name: "Mordor", 
          broadcast: 0, 
          anonymous: 1, 
          priceAddition: 200, 
          priceMultiplier: null,
          companies: [{
            type: "company", 
            id: 3, 
            name: "Morgoth's company a.s.", 
            broadcast: 0, 
            anonymous: 1, 
            priceAddition: 150, 
            priceMultiplier: null,
            offices: [
              {
                type: "office", 
                id: 36, 
                name: "Office Barad-dûr", 
                broadcast: 0, 
                anonymous: 1, 
                priceAddition: 150, 
                priceMultiplier: null,
              }
            ]
          }]
        }, {
          type: "country", 
          id: 39, 
          name: "Eriador", 
          broadcast: 0, 
          anonymous: 1, 
          priceAddition: 200, 
          priceMultiplier: null,
          companies: []
        }]
      }
    ]
  }
}

