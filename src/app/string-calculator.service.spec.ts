import { TestBed } from '@angular/core/testing';
import { StringCalculatorService } from './string-calculator.service';

describe('StringCalculatorService', () => {
  let service: StringCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringCalculatorService);
  });

  it('should return 0 for empty string', () => {
    expect(service.add('')).toBe(0);
  });

  it('should return the number itself for a single number', () => {
    expect(service.add('1')).toBe(1);
    expect(service.add('5')).toBe(5);
  });

  it('should return the sum for two numbers', () => {
    expect(service.add('1,2')).toBe(3);
    expect(service.add('10,20')).toBe(30);
  });

  it('should handle an unknown amount of numbers', () => {
    expect(service.add('1,2,3,4')).toBe(10);
    expect(service.add('1,2,3,4,5,6,7,8,9,10')).toBe(55);
  });

  it('should handle new lines between numbers', () => {
    expect(service.add('1\n2,3')).toBe(6);
    expect(service.add('1\n2\n3')).toBe(6);
  });

  it('should support different delimiters', () => {
    expect(service.add('//;\n1;2')).toBe(3);
    expect(service.add('//|\n1|2|3')).toBe(6);
  });

  it('should throw an exception for negative numbers', () => {
    expect(() => service.add('1,-2')).toThrow(new Error('negative numbers not allowed: -2'));
    expect(() => service.add('-1,-2,3')).toThrow(new Error('negative numbers not allowed: -1, -2'));
  });

  it('should ignore numbers bigger than 1000', () => {
    expect(service.add('2,1001')).toBe(2);
    expect(service.add('1000,1001,2')).toBe(1002);
  });

  it('should support delimiters of any length', () => {
    expect(service.add('//[***]\n1***2***3')).toBe(6);
  });

  it('should support multiple delimiters', () => {
    expect(service.add('//[*][%]\n1*2%3')).toBe(6);
    expect(service.add('//[***][%%%]\n1***2%%%3')).toBe(6);
  });
});
