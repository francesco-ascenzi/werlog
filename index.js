/** WERLOG
 * 
 * Lightweigth error handling routines for nodejs by Francesco "Frash" Ascenzi
 * 
 * @desc Lightweigth error handling routines for nodejs
 * @author Francesco "Frash" Ascenzi
 * 
 * @param {String} message pass the catch error message
 * 
 * @version 1.0.0
 * @license Apache 2.0
**/

'use strict'

function werlog(message) {
    let mess;
    if (message.length >= 2048) {
        mess = message.substr(0, 2048);
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