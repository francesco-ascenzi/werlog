'use strict';

const fs = require('fs').promises;

/** WERLOG | Lightweigth error handling routines for Node
 *
 * @param {String} errorString error message
 * @param {Number} maxLength max string length (default 3600)
 * @param {String} filePath error log file path (default './werlog.txt')
 * 
 * @returns {File|Error} an error log file or a console.error warning
 * 
 * @author Francesco "Frash" Ascenzi
 * @license Apache 2.0
 */
async function werlog(errorString, maxLength = 3600, filePath = './werlog.txt') {

  if (typeof errorString == 'object') {
    errorString = JSON.stringify(errorString);
  } else if (errorString == undefined) {
    errorString = 'undefined';
  } else if (errorString == null) {
    errorString = 'null';
  } else {
    errorString = errorString.toString();
  }

  if (Number(maxLength) > 0) {
    errorString = errorString.substring(0, Number(maxLength));
  } else {
    errorString = errorString.substring(0, 3600);
  }

  const date = new Date().toLocaleString();
  const text = `[${date}]${errorString}\r\n`;

  if (typeof filePath != 'string') {
    console.error('[ERR]Werlog: Output file path is not a string');
    return;
  }

  try {
    await fs.appendFile(filePath, text, 'utf-8');
  } catch (e) {
    console.error(e);
  }

}

module.exports = werlog;