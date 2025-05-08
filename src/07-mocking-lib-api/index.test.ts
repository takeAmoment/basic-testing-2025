import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios');

const relativePath = '/post/1';
const baseURL = 'https://jsonplaceholder.typicode.com';
const mockedResponse = {
  data: { id: '1', post: 'hello' },
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockedResponse }),
    });
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockedGet = jest.fn().mockResolvedValue({ data: mockedResponse });
    (axios.create as jest.Mock).mockReturnValue({
      get: mockedGet,
    });

    await throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(mockedGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockedResponse }),
    });

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toBe(mockedResponse);
  });
});
