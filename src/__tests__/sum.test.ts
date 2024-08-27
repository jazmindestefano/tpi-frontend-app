// src/__tests__/sum.test.ts
import { describe, it, expect } from '@jest/globals';
import { sum } from '../sum';

describe('sum function', () => {
  it('should add two numbers correctly', () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
  });

  it('should handle negative numbers', () => {
    const result = sum(-2, -3);
    expect(result).toBe(-5);
  });

  it('should handle zero', () => {
    const result = sum(0, 5);
    expect(result).toBe(5);
  });

  it('should handle zero', () => {
    const result = sum(0, 4);
    expect(result).toBe(4);
  });

  it('should handle zero', () => {
    const result = sum(0, 2);
    expect(result).toBe(2);
  });
});
