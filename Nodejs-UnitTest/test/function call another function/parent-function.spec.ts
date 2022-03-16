import { parentFunction } from "src/function call another function/parent-function";

const childFn = jest.mock('src/function call another function/child-funcion', () => jest.fn())
let mockCallingMethod = jest.fn();
jest.mock('src/function call another function/child-class', () => {
  return {
    ChildClass: jest.fn().mockImplementation(() => {
      return {
        callingMethod: mockCallingMethod,
      };
    }),
  };
})

describe('resetModal', () => {
  it('calls the childFunction function', () => {
    parentFunction();
    expect(childFn.mock.call.length).toBe(1);
  })

  it('calls the childFunction function', () => {
    parentFunction();
    expect(mockCallingMethod.mock.calls.length).toBe(2); //twice due the previous test
  })
})