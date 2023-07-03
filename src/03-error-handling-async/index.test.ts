import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const resolvedValue = 5;
const errorMessage = 'This is error';
const defaultErrorMessage = 'Oops!';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(resolvedValue);
    expect(result).toBe(resolvedValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(errorMessage)).toThrowError(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError(defaultErrorMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
