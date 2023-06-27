import { simpleCalculator, Action } from './index';

const a = 1;
const b = 2;
const invalidA = 'invalid a';
const invalidB = 'invalid b';
const invalidAction = 'invalid-action';
const addingResult = 3;
const subtractingResult = -1;
const multiplyingResult = 2;
const dividingResult = 0.5;
const exponentiationResult = 1;

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Add });
    expect(result).toBe(addingResult);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Subtract });
    expect(result).toBe(subtractingResult);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Multiply });
    expect(result).toBe(multiplyingResult);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Divide });
    expect(result).toBe(dividingResult);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Exponentiate });
    expect(result).toBe(exponentiationResult);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a, b, action: invalidAction });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: invalidA,
      b: invalidB,
      action: Action.Divide,
    });
    expect(result).toBe(null);
  });
});
