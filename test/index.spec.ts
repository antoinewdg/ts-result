import * as Result from '../src';
import { expect } from 'chai';
import 'mocha';

describe('Result.ok', () => {
  it('should return a successful result', () => {
    const result : Result<number, string> = Result.ok(3);
    expect(result).to.deep.equal({success: true, value: 3});
  });

});

describe('Result.err', () => {
  it('should return a failed result', () => {
    const result : Result<number, string> = Result.err('I failed');
    expect(result).to.deep.equal({success: false, error: 'I failed'});
  });
});


describe('Result.unwrap', () => {
  it('should succeed on a successful result', () => {
    const result : Result<number, string> = Result.ok(3);
    const unwrapped = Result.unwrap(result);
    expect(unwrapped).to.equal(3);
  });

  it('should throw on a failed result', () => {
    const result : Result<number, string> = Result.err('I failed');
    expect(() => Result.unwrap(result)).to.throw();
  });
});


describe('Result.unwrap', () => {
  it('should return value of a successful result', () => {
    const result : Result<number, string> = Result.ok(3);
    const unwrapped = Result.unwrapOr(result, 5);
    expect(unwrapped).to.equal(3);
  });

  it('should return substitute on a failed result', () => {
    const result : Result<number, string> = Result.err('I failed');
    const unwrapped = Result.unwrapOr(result, 5);
    expect(unwrapped).to.equal(5);
  });
});

describe('Result.map', () => {
  it('should return mapped value of a successful result', () => {
    const result : Result<number, string> = Result.ok(3);
    const mapped = Result.map(result, (x) => '' + x);
    expect(mapped).to.deep.equal({success: true, value: '3'});
  });

  it('should return original error of a failed result', () => {
    const result : Result<number, string> = Result.err('I failed');
    const mapped = Result.map(result, (x) => '' + x);
    expect(mapped).to.deep.equal({success: false, error: 'I failed'});
  });
});
