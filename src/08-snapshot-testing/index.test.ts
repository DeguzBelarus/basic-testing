import { generateLinkedList } from './index';

const mockArrayOfNumbers = [1, 2, 3];
const listFromMockedArrayOfNumbers = {
  next: { next: { next: { next: null, value: null }, value: 3 }, value: 2 },
  value: 1,
};

describe('generateLinkedList', () => {
  const list = generateLinkedList<number>(mockArrayOfNumbers);

  test('should generate linked list from values 1', () => {
    expect(list).toStrictEqual(listFromMockedArrayOfNumbers);
  });

  test('should generate linked list from values 2', () => {
    expect(list).toMatchSnapshot(listFromMockedArrayOfNumbers);
  });
});
