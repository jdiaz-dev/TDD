import { childFunction } from 'src/function call another function/child-funcion';
import { ChildClass } from './child-class';

export const parentFunction = ():number => {
  childFunction()
  const childClass = new ChildClass()
  childClass.callingMethod()
  return 0;
}

