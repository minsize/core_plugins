import { Plugin, PluginProps } from "@minsize/core" // Импортируем типы Plugin и PluginProps из ядра
import plugin from "../plugin.json" // Импортируем метаданные плагина из JSON-файла
import * as utils from "@minsize/utils" // Импортируем все утилиты из пакета @minsize/utils
import { Props } from "./types/props" // Импортируем типы Props

/**
 * Функция инициализации плагина
 *
 * @param props - Свойства, предоставляемые ядром, включая проверки безопасности и другие функции.
 */
function init(this: Props, props: PluginProps) {
  // Проверяем плагин с помощью механизма проверки из предоставленных свойств
  if (props.checker.verify(init, plugin.uid)) {
    return // Если проверка проходит успешно, функция возвращается
  }

  // Добавляем каждую утилиту в глобальное пространство имен
  for (const key of Object.keys(utils)) {
    switch (key) {
      case "random": {
        globalThis[key] = (
          min: number,
          max: number,
          seed: number | undefined = this.seed,
        ) => utils[key](min, max, seed)
        break
      }
      case "randomByWeight": {
        globalThis[key] = (
          items: Record<string, number>,
          seed: number | undefined = this.seed,
        ) => utils[key](items, seed)
        break
      }
      case "shuffle": {
        globalThis[key] = (
          array: unknown[],
          seed: number | undefined = this.seed,
        ) => utils[key].bind(this)(array, seed)
        break
      }
      default: {
        globalThis[key] = utils[key]
      }
    }
  }
}

/**
 * Функция установки плагина
 *
 * @returns объект плагина с метаданными и логикой инициализации.
 */
function install(props?: Props): Plugin {
  return {
    ...plugin, // Включает все метаданные из plugin.json
    init: init.bind(props), // Связывает метод инициализации с объектом плагина
    restart: init.bind(props), // Добавляет поддержку перезапуска, связывая init
  }
}

export default install // Экспортируем функцию установки как модуль по умолчанию
