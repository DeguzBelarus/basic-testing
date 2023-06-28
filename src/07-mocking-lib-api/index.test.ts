// import axios from 'axios';
// import { throttledGetDataFromApi } from './index';

// const mockURL = 'https://jsonplaceholder.typicode.com/todos/1';
// const providedBasesURL = 'https://jsonplaceholder.typicode.com';
// const oneCall = 1;
// const twoCalls = 2;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should create instance with provided base url', async () => {
    // const axiosCreateSpy = jest.spyOn(axios, 'create');
    // const axiosClient = axios.create({
    //   baseURL: mockURL,
    // });
    // await throttledGetDataFromApi(mockURL);
    // expect(axiosCreateSpy).toBeCalledTimes(twoCalls);
    // expect(axiosCreateSpy).toBeCalledWith({ baseURL: providedBasesURL });
    // expect(axiosClient.getUri()).toBe(mockURL);
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    // const result = await throttledGetDataFromApi(mockURL);
  });

  test('should return response data', async () => {
    // jest.mock('axios');
    // axios.create = jest.fn().mockImplementation(({ options }) => ({
    //   ...options,
    //   get: jest.fn().mockReturnValue({ hello: 'hello' }),
    // }));
    // axios.get = jest.fn().mockReturnValue({ hello: 'hello' });
    // const result = await throttledGetDataFromApi(mockURL);
    // expect(result).toMatchObject({ hello: 'hello' });
  });
});
