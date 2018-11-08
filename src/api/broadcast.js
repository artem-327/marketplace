import axios from "axios";

const api = {
  fetchBroadcast: () => axios.get('/api/broadcast-rules/1').then(response => response.data),
};

export default api;

const fakeBroadcast = {
  root: {
    type: "root",
    id: 1,
    broadcast: 0,
    anonymous: 1,
    priceAddition: 150,

    regions: [
      {
        type: "region",
        id: 1,
        name: "Europe",
        broadcast: 0,
        anonymous: 1,
        priceAddition: 150,

        states: [
          {
            type: "country",
            id: 1,
            name: "Czech Republic",
            broadcast: 0,
            anonymous: 1,
            priceAddition: 150,

            companies: [
              {
                type: "company",
                id: 1,
                name: "Company A",
                broadcast: 0,
                anonymous: 1,
                priceAddition: 150,
                offices: [
                  {
                    type: "office",
                    id: 1,
                    name: "Office AA Czech",
                    broadcast: 0,
                    anonymous: 1,
                    priceAddition: 150
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
                offices: [
                  {
                    type: "office",
                    id: 2,
                    name: "Office BA Czech",
                    broadcast: 0,
                    anonymous: 1,
                    priceAddition: 150
                  }
                ]
              }
            ]
          },
          {
            type: "country",
            id: 3,
            name: "Slovakia",
            broadcast: 0,
            anonymous: 1,
            priceAddition: 150,
            priceMultiplier: null,
            companies: [
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
                    id: 8,
                    name: "Office BB Slovakia",
                    broadcast: 0,
                    anonymous: 1,
                    priceAddition: 150
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
        broadcast: 0,
        anonymous: 1,
        priceAddition: 150,
        priceMultiplier: null,
        states: [
          {
            type: "country",
            id: 2,
            name: "Utah",
            broadcast: 0,
            anonymous: 1,
            priceAddition: 150,
            priceMultiplier: null,
            companies: [
              {
                type: "company",
                id: 3,
                name: "ABC a.s.",
                broadcast: 0,
                anonymous: 1,
                priceAddition: 150,
                priceMultiplier: null,
                offices: [
                  {
                    type: "office",
                    id: 3,
                    name: "Office Utah B",
                    broadcast: 0,
                    anonymous: 1,
                    priceAddition: 150
                  },
                  {
                    type: "office",
                    id: 6,
                    name: "Office Utah A",
                    broadcast: 0,
                    anonymous: 1,
                    priceAddition: 150
                  }
                ]
              }, {
                type: "company",
                id: 93,
                name: "XZ s.r.o.",
                broadcast: 0,
                anonymous: 1,
                priceAddition: 150,
                priceMultiplier: null,
                offices: [
                  {
                    type: "office",
                    id: 943,
                    name: "Kancl v Utahu",
                    broadcast: 0,
                    anonymous: 1,
                    priceAddition: 150
                  },
                ]
              }
            ]
          }
        ]
      },
      {
        type: "region",
        id: 31,
        name: "Oceania",
        broadcast: 0,
        anonymous: 1,
        priceAddition: 150,
        priceMultiplier: null,
        states: [
          {
            type: "country",
            id: 32,
            name: "New Guinea",
            broadcast: 0,
            anonymous: 1,
            priceAddition: 150,
            priceMultiplier: null,
            companies: [
              {
                type: "company",
                id: 3,
                name: "ABC a.s.",
                broadcast: 0,
                anonymous: 1,
                priceAddition: 150,
                priceMultiplier: null,
                offices: [
                  {
                    type: "office",
                    id: 36,
                    name: "New Guinea office",
                    broadcast: 0,
                    anonymous: 1,
                    priceAddition: 150
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
