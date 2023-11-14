'use strict';

/** WERLOG 4.0.0
 *
 * Lightweigth error handling routines for Node
 *
 * @param {String} message error message string
 * @param {Number} maxLength max string length (default = 3600)
 *
 * @author Francesco "Frash" Ascenzi
 *
 * @version 4.0.0
 * @license Apache 2.0
**/
function werlog(message, maxLength = 3600) {
    try {
        if (typeof message != 'string' && message.trim() == '') {
            throw new Error('Error is not a string or its value is empty');
        }

        let fs = require('fs');

        let mess = '';
        if (message.length > maxLength) {
            mess = message.substring(0, maxLength);
        }

        let dateFormat = new Date().toLocaleString();
        let content = "[".concat(dateFormat, "]Error: ").concat(mess) + '\r\n';

        fs.appendFile('werlog.txt', content, 'utf-8');
    } catch (e) {
        console.error(e);
    }
}

module.exports = werlog;