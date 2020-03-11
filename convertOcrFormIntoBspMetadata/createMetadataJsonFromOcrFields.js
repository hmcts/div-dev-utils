const ocrData = require('./input/ocrFormToConvert.json');

const metadataElements = ocrData.ocr_data_fields.map(element => {
    return {
        metadata_field_name: element.name,
        metadata_field_value: element.value
    }
});

const metadataFileContent = {
    Metadata_file: metadataElements
};

const jsonOutput = JSON.stringify(metadataFileContent, null, 4);
console.log(jsonOutput);