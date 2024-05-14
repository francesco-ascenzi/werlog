# Werlog
Fast, lightweigth, customizable, and asynchronous function that appends logs to a file or prints them out to the console.

### Key features:
- **Fast and lightweight**: Werlog is designed to be efficient and have minimal impact on your application's performance.
- **Customizable**: You can easily customize the format and output of your logs to meet your specific needs.
- **Asynchronous**: Werlog works in the background so it won't block your application's main thread.
- **Flexible**: Werlog can be used to log to a file, the console, or both.

# Summary
- [Install](#install)
- [Import](#import)
- [Usage](#usage)
- [Parameters](#parameters)
- [Results](#results)
- [License](#license)


# Install
To get started with Werlog, simply install the npm package:
```
npm i werlog
```

# Import
```
// ES6
import werlog from 'werlog';

// CommonJS
const werlog = require('werlog');

const wlogOpts = {
   filePath: './werlog.txt',
   print: true,
   printType: 'i',
   maxFileChars: 500,
   maxPrintChars: 500
}
```

# Usage
Common usage:
```
werlog(e, wlogOpts);
```
Using with ```try-catch```:
```
try {
   ...
} catch(e) {
   werlog(e, wlogOpts);
}
```
Using with promise-based ```then-catch```:
```
fetch(...)
.then(...)
.catch(e => {
   werlog(e, wlogOpts);
})
```
Using with ```if``` condition:
```
if (...) {
   werlog('Sentence', wlogOpts);
}
```

# Parameters
### any data | required
Every type of data allowed

### (optional) object options | default = {}
```
let wlogOpts = {
```
### (optional) string options.filePath | default = './werlog.txt'
```
   filePath: './werlog.txt' // Output file path
}
```

### (optional) boolean options.print | default = false
```
   print: false // May will be printed to console?
```

### (optional) string options.printType | default = ''
Accepts: 'f' = fatal || 'w' = warning/error || 'd' = debug || '' = info
```
   printType: '' // Console type message
```

### (optional) number options.maxFileChars | default = 1kkk characters
```
   maxFileChars: 3600 // Max text chars length can be logged
```

### (optional) number options.maxPrintChars | default = 3.6k characters
```
   maxPrintChars: 1000000 // Max printable text chars length on console
```

# Results
Werlog will create a file ( default: werlog.txt ) or a formatted console text that contains the log date and the stringified data passed to it.

### Results example:
```
[02/19/2024, 10:35:06.063 PM] There was an error!
[02/13/2024, 03:10:46.009 AM] TypeError: "x" is read-only
[01/24/2024, 05:00:20.100 PM] [Hello, world!]
```

# License
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.