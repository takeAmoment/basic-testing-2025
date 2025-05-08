import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values = [1];
    const expectedList = {
      next: {
        next: null,
        value: null,
      },
      value: 1,
    };

    expect(generateLinkedList(values)).toStrictEqual(expectedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = [4, 5];
    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();
  });
});
