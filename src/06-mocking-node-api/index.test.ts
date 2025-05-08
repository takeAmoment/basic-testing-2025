import { existsSync } from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { readFile } from 'fs/promises';
import path from 'path';

const timeout = 1000;
const testFileContent = 'Hello, Developer!';

jest.mock('fs');
jest.mock('path');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    // replaces all real timers
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    const mockTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, timeout);

    expect(mockTimeout).toHaveBeenCalledWith(cb, timeout);
    mockTimeout.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, timeout);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(cb).toHaveBeenCalled();
    expect(cb).toHaveBeenCalledTimes(1);
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
    const cb = jest.fn();
    const mockTimeout = jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, timeout);

    expect(mockTimeout).toHaveBeenCalledWith(cb, timeout);
    mockTimeout.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, timeout);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout * 3);

    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'testFilee.txt';

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(pathToFile);

    expect(path.join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(testFileContent);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(testFileContent);
  });
});
