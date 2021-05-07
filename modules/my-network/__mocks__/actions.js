module.exports = {
  ...jest.requireActual('..'),
  __esMOdule: true,
  search: jest.fn().mockReturnValue(Promise.resolve({ connectedCompany: 'some values' }))
}
