import { simpleCalculator, Action } from './index';

const a = 10;
const b = 5;

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Add });

    expect(result).toBe(15);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Subtract });

    expect(result).toBe(5);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Multiply });

    expect(result).toBe(50);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Divide });

    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Exponentiate });

    expect(result).toBe(100000);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a, b, action: 'inValide' });

    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 'a',
      b: 'b',
      action: Action.Multiply,
    });

    expect(result).toBeNull();
  });
});
