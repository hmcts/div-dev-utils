This is a tool that is used to convert OCR JSON into the metadata format expected by the BSP tool.
This is intended to be used as a testing tool for simulating what happens when Exela sends an OCR JSON to BSP.

## Requirements
- NodeJS

## Converting OCR JSON to BSP metadata format
Start by installing the project with ```npm install```.

There's already an example of ocrForm in the input folder. You can change this to match the OCR JSON you want to convert.

Then you can run ```node createMetadataJsonFromOcrFields.js```. This will print the converted format that the BSP upload tool expects.

The BSP upload tools expects this value to be base64 encoded. To do that, just run ```node createMetadataJsonFromOcrFields.js```. Then, you just have to paste this content into the "ocr_data" attribute of the BSP metadata file.