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
 * 
 * @author Francesco 'Frash' Ascenzi
 * @license Apache 2.0
 */
declare module 'werlog' {
  type werlogOptions = {
    filePath?: string,
    print?: boolean,
    printType?: string,
    maxFileChars?: number,
    maxPrintChars?: number
  };

  export default function werlog(data: any, options?: werlogOptions): Promise<boolean>;
}