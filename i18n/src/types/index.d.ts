import type { BaseRecordDict, Translator } from "../module"
import type { NullableTranslatorByCode } from "./props"

// Расширяем глобальное пространство имен с помощью `declare global`
declare global {
  const i18n: {
    setLanguage: (value: string) => void
    get: Translator<BaseRecordDict, string>
    getLanguage: () => string
    getByCode: NullableTranslatorByCode<any>
  }
}
