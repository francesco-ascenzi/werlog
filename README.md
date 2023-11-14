# Werlog
Send an error message to the defined lightweigth error handling routines. It's based on PHP error_log().

# Description
```
werlog(message: string) {}
```
Sends an error message to the web server's error log file.

# Install
Install werlog with:
```
npm i werlog
```

# Import
Assign to a const variable:
```
const werlog = require('werlog');
```

# Usage
Using with ```try-catch```:
```
try {
    ...
} catch(e) {
    werlog(e);
}
```
Using with promise-based ```then-catch```:
```
const werlog = require('werlog');

fetch(...)
.then(...)
.catch(e => {
    werlog(e);
})
```
Using with ```if``` condition:
```
const werlog = require('werlog');

if (...) {
    werlog(e);
}
```

# Parameters
### string message
The error message that should be logged.

### number maxLength
The maximum allowed length for the error message. If the length of the message exceeds this value, it will be trimmed (default 3600 characters).

# Results
The werlog.txt file will be created, containing the error date and the message passed to the function.

### Results example:
```
[Sun, 26 Mar 2023 01:02:06 GMT]Error: There was an error!
[Tue, 28 Mar 2023 10:01:00 GMT]Error: RangeError: invalid date!
[Sat, 1 Apr 2023 03:02:01 GMT]Error: TypeError: "x" is read-only
```

# License
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.