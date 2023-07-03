import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const SOURCE_PATH = '/users';
const RESPONSE_DATA = 'mock-response';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: RESPONSE_DATA }),
    });

    await throttledGetDataFromApi(SOURCE_PATH);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: BASE_URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: RESPONSE_DATA }),
    });

    await throttledGetDataFromApi(SOURCE_PATH);
    jest.runAllTimers();
    expect(axios.create().get).toHaveBeenCalledWith(SOURCE_PATH);
  });

  test('should return response data', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: RESPONSE_DATA }),
    });

    const response = await throttledGetDataFromApi(SOURCE_PATH);
    jest.runAllTimers();
    expect(response).toBe(RESPONSE_DATA);
  });
});
