import { checker, Plugin, PluginProps } from "@minsize/core" // Импортируем необходимые типы и инструменты из ядра
import plugin from "../plugin.json" // Импортируем метаданные плагина из JSON-файла
import { NullableTranslatorByCode, Props } from "./types/props" // Импортируем пользовательские типы из локальных определений

import { flatten, resolveTemplate, translator } from "./module" // Импортируем необходимые утилиты из модуля

/**
 * Функция инициализации плагина
 *
 * @param coreProps - Свойства, предоставляемые ядром, включая проверки безопасности и другие функции.
 */
function init(this: Props, coreProps: PluginProps) {
  // Проверяем изменения в функции инициализации с помощью механизма проверки
  if (checker.verify(init, plugin.uid)) {
    return // Если проверка показывает изменения, выходим из функции
  }

  // Получаем функции-геттер и сеттер из this.signal и устанавливаем язык по умолчанию
  const [getter, setter] = this.signal
  setter(this.default) // Устанавливаем язык по умолчанию

  // Создаем функцию для сглаживания текущего словаря в зависимости от текущей локали
  const dict = () => flatten(this.dictionaries[getter()])

  // Определение функции для получения переводов по языковому коду
  const getByCode: NullableTranslatorByCode<any> = (code, path, ...args) => {
    const dict = () => flatten(this.dictionaries[code]) as any

    return translator(dict, resolveTemplate)(path, ...args) as any // Возвращаем переведенную строку
  }

  // Добавляем объект i18n в глобальное пространство, чтобы сделать его доступным для всего приложения
  globalThis.i18n = {
    setLanguage: (value) => {
      if (!this.dictionaries[value]) value = "en" // Если язык не поддерживается, устанавливаем "en"
      setter(value) // Устанавливаем текущий язык
    },
    getLanguage: getter, // Получаем текущий язык
    get: translator(dict, resolveTemplate), // Используем локальный словарь для получения перевода
    getByCode: getByCode, // Получаем перевод по коду языка
  }
}

/**
 * Функция установки плагина
 *
 * @returns объект плагина с метаданными и логикой инициализации.
 */
function install(props: Props): Plugin {
  return {
    ...plugin, // Добавляем метаданные плагина из JSON
    init: init.bind(props), // Связываем функцию инициализации с контекстом props
    restart: init.bind(props), // Добавляем функцию перезапуска
  }
}

export default install // Экспортируем функцию установки как модуль по умолчанию
