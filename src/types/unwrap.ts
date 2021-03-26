export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type UnwrapPromise<T> = T extends Promise<infer U>
  ? U
  : T extends (..._args: any) => Promise<infer U>
  ? U
  : T extends (..._args: any) => infer U
  ? U
  : T;
