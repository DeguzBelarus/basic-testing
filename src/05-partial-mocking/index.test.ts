import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn().mockImplementation(() => null),
    mockTwo: jest.fn().mockImplementation(() => null),
    mockThree: jest.fn().mockImplementation(() => null),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    mockOne();
    mockTwo();
    mockThree();
    expect(logSpy).toBeCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    unmockedFunction();
    expect(logSpy).toBeCalledTimes(1);
  });
});
