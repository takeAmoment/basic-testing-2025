import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const value = 'hello';
const msg = 'Something went wrong';
const defaultMessage = 'Oops!';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(value);

    expect(result).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () =>
    expect(() => throwError(msg)).toThrow(msg));

  test('should throw error with default message if message is not provided', () =>
    expect(() => throwError()).toThrow(defaultMessage));
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
