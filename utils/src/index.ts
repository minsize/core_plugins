import { Plugin, PluginProps } from "@minsize/core" // Импорт типов `Plugin` и `PluginProps` из модуля ядра
import plugin from "../plugin.json" // Импорт метаданных плагина из JSON-файла
import * as utils from "@minsize/utils" // Импорт всех утилит из пакета `@minsize/utils`

/**
 * Функция инициализации плагина
 *
 * @param props - Свойства, предоставляемые ядром, в том числе проверки безопасности и другие функции.
 */
function init(props: PluginProps) {
  // Проверка плагина с помощью механизма проверки из предоставленных свойств
  if (props.checker.verify(init, plugin.uid)) return

  // Добавляем каждую утилиту в глобальное пространство
  globalThis.clamp = utils.clamp
  globalThis.decWord = utils.decWord
  globalThis.alignTo = utils.alignTo
  globalThis.toShort = utils.toShort
  globalThis.timeAgo = utils.timeAgo
  globalThis.formatNumber = utils.formatNumber
  globalThis.random = utils.random
  globalThis.randomByWeight = utils.randomByWeight
  globalThis.isType = utils.isType
  globalThis.omit = utils.omit
  globalThis.pick = utils.pick
  globalThis.sleep = utils.sleep
  globalThis.copyText = utils.copyText
  globalThis.createLinksFromText = utils.createLinksFromText
  globalThis.comparison = utils.comparison
  globalThis.generateUniqueKey = utils.generateUniqueKey
  globalThis.unlink = utils.unlink
  globalThis.textParserUrl = utils.textParserUrl
  globalThis.memoize = utils.memoize
  globalThis.retry = utils.retry
  globalThis.parseQueryString = utils.parseQueryString
  globalThis.parseVersionString = utils.parseVersionString
  globalThis.chunks = utils.chunks
  globalThis.shuffle = utils.shuffle
  globalThis.unique = utils.unique
  globalThis.groupBy = utils.groupBy
  globalThis.orderBy = utils.orderBy
  globalThis.HSVtoRGB = utils.HSVtoRGB
  globalThis.RGBtoHEX = utils.RGBtoHEX
  globalThis.RGBtoHSV = utils.RGBtoHSV
  globalThis.HEXtoRGB = utils.HEXtoRGB
}

/**
 * Функция установки плагина
 * Возвращает объект плагина с метаданными и логикой инициализации.
 */
function install(): Plugin {
  return {
    ...plugin, // Включает все метаданные из plugin.json
    init, // Связывает метод инициализации с объектом плагина
  }
}

export default install // Экспортируем функцию установки как модуль по умолчанию
