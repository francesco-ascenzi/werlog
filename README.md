# Werlog
Send an error message to the defined lightweigth error handling routines, based on PHP error_log().

# Description
```
werlog(string message)
```
Sends an error message to the web server's error log file.

# Install
Get werlog from npm:
```
npm i werlog
```

# Usage
Using with ```catch``` function:
```
const werlog = require('werlog');

fetch(/* url here */)
.then(/* action here */)
.catch(e => {
    werlog(e);
})
```
Using with ```if``` condition:
```
const werlog = require('werlog');

if (/* condition */) {
    werlog(e);
}
```

# Import
Werlog can be imported with the require function.

```
const werlog = require('werlog');
```

# Parameters
### string message
The error message that should be logged.

# Werlog.txt
The werlog.txt file will be created and it will contain the error date, and the message passed through the function.

# Results
Example of werlog.txt:
```
[Sun, 26 Mar 2023 01:02:06 GMT]Error: There was an error!
[Tue, 28 Mar 2023 10:01:00 GMT]Error: RangeError: invalid date!
[Sat, 1 Apr 2023 03:02:01 GMT]Error: TypeError: "x" is read-only
```

# License
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
