This is a tool that will find out any fields missing from your CCD definition files (fields and their authorisation), create files with the missing json and warn you about issues.

## Requirements
- NodeJS

## Converting OCR JSON to BSP metadata format
Start by installing the project with ```npm install```.

Add you CaseField.json and your AuthorisationCaseField.json to the input folder.
Put your full transformed example payload into the fullTransformedJsonExample.json file
The script has a variable called userRole. You can use it to check for a specific CCD role.

Then you can run ```node checkFieldExistsInCCD.js```.

This will print a few warning on screen and will create the files you can use to add the missing parts to your CCD definition files in the output folder.