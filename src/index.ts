namespace Result {
  export interface Ok<T> {
    success: true;
    value: T;
  }

  export interface Err<E> {
    success: false;
    error: E;
  }

  export type Result<T, E> = Ok<T> | Err<E>;

  export function ok<T>(value: T): Ok<T> {
    return {success: true, value};
  }

  export function err<E>(error: E): Err<E> {
    return {success: false, error};
  }

  export class UnwrapException<E> {
    name = 'Unwrap Exception';
    message: string;

    constructor(error: E) {
      this.message = 'Error: ' + JSON.stringify(error);
    }
  }

  export function unwrap<T, E>(result: Result<T, E>): T {
    if (result.success) {
      return result.value;
    }
    throw new UnwrapException(result.error);
  }

  export function unwrapOr<T, E>(result: Result<T, E>, substitute: T): T {
    return result.success ? result.value : substitute;
  }

  export function map<T, U, E>( result: Result<T, E>, f: (v: T) => U): Result<U, E> {
    if (result.success) {
      return {success: true, value: f(result.value)};
    }
    return result;
  }
}

type Result<T, E> = Result.Result<T, E>;

export = Result;
