import type { BaseDict, BaseRecordDict, ResolveArgs, Resolved } from "../module"

export type Props<T extends string = string, D extends BaseDict = BaseDict> = {
  dictionaries: Record<T, D>
  default: T
  signal: [get: () => T, set: (value: T) => void]
}

export type NullableTranslatorByCode<
  T extends BaseRecordDict,
  O = string,
  L extends string = string,
> = <K extends keyof T>(
  code: L,
  path: K,
  ...args: ResolveArgs<T[K], O>
) => Resolved<T[K], O> | undefined
