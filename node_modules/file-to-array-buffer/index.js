/* global FileReader */

'use strict'

module.exports = function fileToArrayBuffer (file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()

    reader.onerror = function onerror (ev) {
      reject(ev.target.error)
    }

    reader.onload = function onload (ev) {
      resolve(ev.target.result)
    }

    reader.readAsArrayBuffer(file)
  })
}
