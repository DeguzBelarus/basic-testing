import fs from 'fs';
import path from 'path';

import {
  readFileAsynchronously,
  doStuffByTimeout,
  doStuffByInterval,
} from './index';

const mockedTimerValue = 1000;
const mockedIntervalDuration = 2000;
const oneTimer = 1;
const oneCall = 1;
const twoCalls = 2;
const mockFileText = 'this is just mock text';
const mockFilePath = 'my-directory\\my-file.txt';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, mockedTimerValue);
    expect(jest.getTimerCount()).toBe(oneTimer);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, mockedTimerValue);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalledTimes(oneCall);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, mockedTimerValue);
    expect(jest.getTimerCount()).toBe(oneTimer);
    jest.clearAllTimers();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, mockedTimerValue);
    expect(jest.getTimerCount()).toBe(oneTimer);
    jest.advanceTimersByTime(mockedIntervalDuration);
    expect(callback).toBeCalledTimes(mockedIntervalDuration / mockedTimerValue);
    jest.clearAllTimers();
  });
});

describe('readFileAsynchronously', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(mockFilePath);
    expect(joinSpy).toBeCalledTimes(oneCall);
  });

  test('should return null if file does not exist', async () => {
    jest.mock('fs');
    fs.existsSync = jest.fn().mockReturnValue(false);
    fs.promises.readFile = jest.fn().mockReturnValue(mockFileText);

    const existSpy = jest.spyOn(fs, 'existsSync');
    const readFileSpy = jest.spyOn(fs.promises, 'readFile');

    const isExists = fs.existsSync(mockFilePath);
    expect(isExists).toBe(false);
    const fileContent = await readFileAsynchronously(mockFilePath);
    expect(existSpy).toBeCalledTimes(twoCalls);
    expect(readFileSpy).not.toBeCalled();
    expect(fileContent).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.mock('fs');
    fs.existsSync = jest.fn().mockReturnValue(true);
    fs.promises.readFile = jest.fn().mockReturnValue(mockFileText);

    const existSpy = jest.spyOn(fs, 'existsSync');
    const readFileSpy = jest.spyOn(fs.promises, 'readFile');

    const isExists = fs.existsSync(mockFilePath);
    expect(isExists).toBe(true);
    const fileContent = await readFileAsynchronously(mockFilePath);
    expect(existSpy).toBeCalledTimes(twoCalls);
    expect(readFileSpy).toBeCalledTimes(oneCall);
    expect(fileContent).toBe(mockFileText);
  });
});
