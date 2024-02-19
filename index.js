'use strict';

/** CREDITS
 * 
 * @author Francesco "Frash" Ascenzi 
 * @license Apache 2.0
 */

const fs = require('fs');
const path = require('path');

/** WERLOG
 * 
 * Lightweigth async utility that prints or writes logs to the console or to a file
 * 
 * @param {any} data Any input data
 * @param {string} options.type Type of console message ( 'f' = fatal || 'w' = warning/error || 'd' = debug || undefined|null|empty|default = info )
 * @param {boolean} options.console Also print string to the console (default = false)
 * @param {number} options.consoleStringLength Max string length on console (default = 1000000 characters)
 * @param {number} options.fileStringLength Max string length in file (default = 3600 characters)
 * @param {string} options.path Output file path (default = './werlog.txt')
 * 
 * @returns {promise<file|error>} File || Console logs 
 */
async function werlog(data, options = {}) {

  // DATA CONVERT | Converts all data types to string
  if (typeof data == 'object') {
    try {
      // Handle circular reference error
      data = JSON.stringify(data, { circular: true });
    } catch (catchError) {
      data = catchError.message;
    }
  } else if (data && data.stack) {
    data = `Stack trace error: ${data.stack}`;
  } else if (data == undefined) {
    data = 'undefined';
  } else if (data == null) {
    data = 'null';
  } else {
    data = data.toString();
  }

  // USER OPTIONS | Initialize options variables
  const currDate = new Date().toLocaleString({}, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3
  });

  let consoleErrorString = '';
  let fileErrorString = '';

  let consoleError = true;
  let useConsole = false;
  let consoleFormat = `[${currDate}]`;
  let outputFilePath = '';

  // Format given user options
  if (typeof options == 'object') {

    // f = fatal | w = warning/error | d = debug (default: info)
    if (('type' in options) && typeof options.type == 'string') {
      if (options.type == 'f') {
        consoleFormat = `\x1b[31m[${currDate}]\x1b[0m`;
      } else if (options.type == 'w') {
        consoleFormat = `\x1b[33m[${currDate}]\x1b[0m`;
      } else if (options.type == 'd') {
        consoleError = false;
        consoleFormat = `\x1b[90m[${currDate}]\x1b[0m`;
      } else {
        consoleError = false;
      }
    }

    // Prints on console?
    if (('console' in options) && options.console) {
      useConsole = true;
    }

    // Truncate data string for logging on the console
    if (('consoleStringLength' in options) && !isNaN(Number(options.consoleStringLength))) {
      consoleErrorString = data.substring(0, parseInt(options.consoleStringLength));
    } else {
      consoleErrorString = data.substring(0, 1000000);
    }

    // Truncate data string for logging to a file
    if (('fileStringLength' in options) && !isNaN(Number(options.fileStringLength))) {
      fileErrorString = data.substring(0, parseInt(options.fileStringLength));
    } else {
      fileErrorString = data.substring(0, 3600);
    }

    // Check and format output file path
    if (('path' in options) &&
      options.path &&
      typeof options.path == 'string' &&
      options.path.trim() != ''
    ) {
      try {
        outputFilePath = path.join(options.path);
      } catch (catchError) {
        console.error(consoleFormat, `Path value error:`, catchError.message);
        return;
      }
    } else {
      outputFilePath = path.join('./werlog.txt');
    }
  }

  // WRITE FILE/CONSOLE LOGS | Print them on choosen format
  try {
    if (useConsole) {
      if (consoleError) {
        console.error(consoleFormat, consoleErrorString);
      } else {
        console.log(consoleFormat, consoleErrorString);
      }
    }

    await fs.promises.appendFile(outputFilePath, `[${currDate}] ${fileErrorString}\r\n`, 'utf8');
  } catch (catchError) {
    console.error(consoleFormat, catchError.message);
  }
};

module.exports = werlog;