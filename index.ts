/// <reference path="./types/index.d.ts" />

import fs from 'fs';
import path from 'path';

type werlogOptions = {
  filePath?: string,
  print?: boolean,
  printType?: string,
  maxFileChars?: number,
  maxPrintChars?: number
}

// Remove circular references to prevent infinite loops
function removeCircular(obj: any) {
  const seen = new Map();

  const recurse = (passedObj: any) => {
    seen.set(passedObj, true);
    for (let [k, v] of Object.entries(passedObj)) {
      if (typeof v !== "object") continue;
      if (seen.has(v)) delete passedObj[k];
      else recurse(v);
    }
  }

  recurse(obj);
}

/** WERLOG
 * 
 * Lightweigth async utility that prints or writes logs to the console or to a file
 * 
 * @param {any} data Any input data
 * @param {string} options.filePath Output file path (default = './werlog.txt')
 * @param {boolean} options.print Also print string to the console (default = false)
 * @param {string} options.printType Type of console message ( 'f' = fatal || 'w' = warning/error || 'd' = debug || undefined|null|empty|default = info )
 * @param {number} options.maxFileChars Max string length in file (default = 3600 characters)
 * @param {number} options.maxPrintChars Max string length on console (default = 1000000 characters)
 * 
 * @return {Promise<boolean>} Boolean return and console.error message if there was something went wrong
 */
async function werlog(data: any, options: werlogOptions = {}): Promise<boolean> {

  // DATA CONVERT | Converts all data types to string
  if (typeof data == 'object') {
    try {
      // Handle circular reference error
      removeCircular(data);

      data = JSON.stringify(data);
    } catch (err) {
      data = err;
    }
  } else if (data && data.stack) {
    data = `Stack trace error: ${data.stack}`;
  } else if (data === undefined) {
    data = 'undefined';
  } else if (data === null) {
    data = 'null';
  } else {
    data = data.toString();
  }

  // DATE | Initialize current date
  let currDate: string = new Date().toLocaleString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Add milliseconds
  currDate = `${currDate}.${new Date().getMilliseconds().toFixed(4)}`

  // FUNCTION/OPTIONS VARIABLES | Initialize function/options variables
  let consoleErrorText: string = '';
  let fileErrorText: string = '';

  let consoleError: boolean = true;
  let printFormat: string = `[${currDate}]`;

  let defMaxPrintChars = Number.MAX_SAFE_INTEGER;
  let defMaxFileChars = 3600;

  // FORMAT DATA | Output file path
  let outputFilePath: string = path.join('./werlog.txt');
  if (typeof options['filePath'] == 'string') {
    try {
      outputFilePath = path.join(options.filePath);
    } catch (err) {
      console.error(printFormat, `Path value error:`, err);
      return false;
    }
  }

  // Prints it on console?
  if (typeof options['print'] == 'boolean' && options.print == true) {
    // Print with different colors: f = fatal | w = warning/error | d = debug (default: info)
    if (typeof options['printType'] == 'string') {
      if (options.printType == 'f') {
        printFormat = `\x1b[31m[${currDate}]\x1b[0m`;
      } else if (options.printType == 'w') {
        printFormat = `\x1b[33m[${currDate}]\x1b[0m`;
      } else if (options.printType == 'd') {
        consoleError = false;
        printFormat = `\x1b[90m[${currDate}]\x1b[0m`;
      } else {
        consoleError = false;
      }
    }

    // Max print length
    if (typeof options['maxPrintChars'] == 'number' && options.maxPrintChars > 0) {
      consoleErrorText = data.substring(0, options.maxPrintChars);
    } else {
      consoleErrorText = data.substring(0, defMaxPrintChars);
    }

    // Prints it
    if (consoleError) {
      console.error(printFormat, consoleErrorText);
    } else {
      console.log(printFormat, consoleErrorText);
    }
  }

  // Substring file error text
  if (typeof options['maxFileChars'] == 'number' && options.maxFileChars > 0) {
    fileErrorText = data.substring(0, options.maxFileChars);
  } else {
    fileErrorText = data.substring(0, defMaxFileChars);
  }

  // WRITE LOGS | Write logs at outputFilePath
  try {
    await fs.promises.appendFile(outputFilePath, `[${currDate}] ${fileErrorText}\r\n`, 'utf8');
  } catch (err) {
    console.error(printFormat, err);
    return false;
  }

  return true;
}

module.exports = werlog;