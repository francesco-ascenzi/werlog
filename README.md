# Werlog
Send an error message to the defined lightweigth error handling routines, based on PHP error_log()

# Description
```
werLog(string message)
```
Sends an error message to the web server's error log file.

# Parameters
### string message
The error message that should be logged

# Error_log.txt
The error_log.txt file will be created and it will contain the error date, and the message passed through the function.

# Example
Example of error_log.txt:
```
[Sun, 26 Mar 2023 01:02:06 GMT]Error: There was an error!
[Sun, 28 Mar 2023 10:01:00 GMT]Error: RangeError: invalid date!
[Sun, 1 Apr 2023 03:02:01 GMT]Error: TypeError: "x" is read-only
```