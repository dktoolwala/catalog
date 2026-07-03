/**
 * Utility Types
 *
 * Reusable TypeScript utility types used across the application.
 * Zero Angular imports — pure TypeScript type definitions.
 * These supplement built-in utility types (Partial, Readonly, Record, etc.).
 */

/** A value that may be null */
export type Nullable<T> = T | null;

/** A value that may be undefined */
export type Optional<T> = T | undefined;

/** A value that may be null or undefined */
export type Maybe<T> = T | null | undefined;

/** JavaScript primitive types */
export type Primitive = string | number | boolean | null | undefined;

/** A string-keyed dictionary (alias for Record<string, T>) */
export type ApiDictionary<T> = Record<string, T>;

/** A readonly string-keyed dictionary */
export type ReadonlyDictionary<T> = Readonly<Record<string, T>>;

/** Deep readonly — recursively marks all properties as readonly */
export type DeepReadonly<T> = T extends Primitive
  ? T
  : T extends readonly (infer U)[]
    ? readonly DeepReadonly<U>[]
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;

/** Extract the element type from an array type */
export type ArrayElement<T extends readonly unknown[]> = T[number];

/** Make specific properties of T required */
export type RequireKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Make specific properties of T optional */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** A type-safe string literal union check */
export type StrictExtract<T, U extends T> = U;
