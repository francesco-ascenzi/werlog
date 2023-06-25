'use strict'

/** WERLOG 1.0.0
 * 
 * Lightweigth error handling routines for nodejs by Francesco "Frash" Ascenzi
 * 
 * @param {String} message string | Log error
 * @return {Txt} file | A file that contains the full error code
 * 
 * @author Francesco "Frash" Ascenzi
 * 
 * @version 1.0.0
 * @license Apache 2.0
**/
function werlog(message) {
    if (typeof message != 'string')
        return console.error("Error text is not a string");

    let mess = message;
    if (message.length >= 3600) // Max string length
        mess = message.substring(0, 3600);

    let reqFile = require('fs');

    let dateFormat = new Date().toLocaleString();
    let content = `[${dateFormat}]Error: ${mess}` + '\r\n';
    let encoding = 'utf8';

    reqFile.appendFile('werlog.txt', content, encoding, err => {
        if (err) {
            console.error(err);
        }
    });
}

module.exports = werlog;