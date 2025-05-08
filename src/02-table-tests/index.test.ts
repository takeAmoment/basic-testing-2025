import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 1, action: Action.Subtract, expected: 2 },
  { a: 10, b: 6, action: Action.Subtract, expected: 4 },
  { a: 7, b: 2, action: Action.Subtract, expected: 5 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 2, b: 1, action: Action.Divide, expected: 2 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 2, b: 7, action: Action.Multiply, expected: 14 },
  { a: 3, b: 5, action: Action.Multiply, expected: 15 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: '2', b: 3, action: Action.Add, expected: null },
  { a: 4, b: true, action: Action.Subtract, expected: null },
  { a: 2, b: function () {}, action: Action.Multiply, expected: null },
  { a: 2, b: 3, action: 'unknown', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `should return $expected by operation $action on $a and $b`,
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });

      expect(result).toBe(expected);
    },
  );
});
