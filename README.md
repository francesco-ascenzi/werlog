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
const err = require('werlog');

fetch(/* url here */)
.then(/* action here */)
.catch(e => {
    err.werlog(e);
})
```
Using with ```if``` condition:
```
const err = require('werlog');

if (/* condition */) {
    err.werlog(e);
}
```

# Import
Werlog can be imported with the require function.

```
const err = require('werlog')
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
