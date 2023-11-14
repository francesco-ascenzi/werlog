'use strict';

// Required packages
const fs = require('fs');

/** WERLOG 4.0 | Lightweigth error handling routines for Node
 *
 * @param {String} message error message string
 * @param {Number} maxLength max string length (default = 3600)
 *
 * @author Francesco "Frash" Ascenzi
 *
 * @version 4.0
 * @license Apache 2.0
 */
async function werlog(message, maxLength = 3600) {
    // Convert it to a string
    message = message.toString();

    if (message.trim() == '') {
        console.error('Error string is empty');
        return;
    }

    if (message.length > maxLength) {
        message = message.substring(0, maxLength);
        return;
    }

    // Assign date and file text
    const date = new Date().toLocaleString();
    const text = `[${date}]${message}\r\n`;

    // Create and append line on the last line
    await fs.promises.appendFile('werlog.txt', text, 'utf-8', err => {
        if (err) {
            console.error("It may not be possible to create the 'werlog' file");
            return;
        }
    });
}

module.exports = werlog;