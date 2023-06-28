import { generateLinkedList } from './index';

const mockArrayOfNumbers = [1, 2, 3];
const listFromMockedArrayOfNumbers = {
  next: { next: { next: { next: null, value: null }, value: 3 }, value: 2 },
  value: 1,
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList<number>(mockArrayOfNumbers);
    expect(list).toStrictEqual(listFromMockedArrayOfNumbers);
  });

  test('should generate linked list from values 2', () => {
    const list = generateLinkedList<number>(mockArrayOfNumbers);
    expect(list).toMatchSnapshot(listFromMockedArrayOfNumbers);
  });
});
