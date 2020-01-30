# div-dev-utils
Tools to make developers' lives easier when working with Divorce

## Requirements
- NodeJS
- Curl

## Extracting data to family man since a given date
This is meant to be run from the local command line. You'll have to be connected to the VPN for this.

Start by installing the project with ```npm install```.

Then you can run ```node runDataExtractionToFamilyMan.js --startDate 2019-10-01```. This will run extract the files in the **AAT** environment (by default).

To extract in the PROD environment, just use ```node runDataExtractionToFamilyMan.js --startDate 2019-10-01 --environment prod```