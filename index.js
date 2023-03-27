/** Werlog 2.0.0
 * 
 * Lightweigth error handling routines for nodejs by Francesco "Frash" Ascenzi
 * 
 * @author Francesco "Frash" Ascenzi
 * 
 * @version 2.0.0
 * @license Apache 2.0
**/

'use strict'

/** You can handle your errors saving them on a file
 * 
 * @param {String} message string | Log error message
 * @return {Txt} file | A file that contains the full error code
**/
function werlog(message) {
    let mess = message;
    // Max string length
    if (message.length >= 2048) {
        mess = message.substring(0, 2048);
    }

    let reqFile = require('fs');

    // Date format type
    let dateFormat = new Date().toUTCString();
    // Error string content
    let content = "[" + dateFormat + "]Error: " + mess + "\r\n";
    // Encoding type
    let encoding = "utf8";

    reqFile.appendFile('werlog.txt', content, encoding, err => {
        if (err) {
            console.error(err);
        }
    });
}

module.exports = {
    werlog: werlog
}