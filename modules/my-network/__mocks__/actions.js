module.exports = {
  ...jest.requireActual('..'),
  __esMOdule: true,
  search: jest.fn().mockReturnValue({ type: 'mock' })
}
