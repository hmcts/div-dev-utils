const fs = require('fs');
const fieldsInCcdDefinitionsFile = require('./input/CaseField.json');
const authorisedFields = require('./input/AuthorisationCaseField.json');
const fieldsBeingInputIntoCcd = require('./input/fullTransformedJsonExample.json');

const userRole = "caseworker-divorce-financialremedy-courtadmin";

const runAnalysis = (keysBeingInserted) => {
    let amountOfFieldsNotFound = 0;
    let ccdNewFields = [];
    let ccdNewFieldsAuthorisation = [];

    for (let i = 0; i < keysBeingInserted.length; i++) {
        const formField = keysBeingInserted[i];

        const fieldFoundInCCD = fieldsInCcdDefinitionsFile.filter(f => f.ID === formField).length > 0;
        if (!fieldFoundInCCD) {
            amountOfFieldsNotFound++;

            console.log(`Could not find field ${formField} in CCD fields list`);

            ccdNewFields.push(
                {
                    LiveFrom: "01/01/2017",
                    CaseTypeID: "DIVORCE",
                    ID: formField,
                    Label: formField,
                    FieldType: "Text",
                    SecurityClassification: "Public"
                }
            );
        }

        const foundAuthorisationField = authorisedFields.filter(f => f.CaseFieldID === formField && f.UserRole === userRole);
        if (foundAuthorisationField.length > 0){
            //Authorisation found
            if (!foundAuthorisationField[0].CRUD.includes('C')){
                console.log(`Field ${formField} has authorisation but is missing "C"`);
            }
        } else {
            ccdNewFieldsAuthorisation.push(
                {
                    LiveFrom: "01/01/2017",
                    CaseTypeID: "DIVORCE",
                    CaseFieldID: formField,
                    UserRole: userRole,
                    CRUD: "CRU"
                }
            );
        }
    }

    console.log(`Created authorisation file. Could not find ${amountOfFieldsNotFound} fields from a list of ${keysBeingInserted.length} fields`);
    const ccdFieldFile = fs.createWriteStream('./output/ccdFieldsToAdd.txt');
    ccdFieldFile.write(JSON.stringify(ccdNewFields, '\n', 2));

    const ccdFieldAuthorisationFile = fs.createWriteStream('./output/ccdFieldAuthorisationFile.txt');
    ccdFieldAuthorisationFile.write(JSON.stringify(ccdNewFieldsAuthorisation, '\n', 2));
};

const keysBeingInserted = Object.keys(fieldsBeingInputIntoCcd.case_creation_details.case_data);
runAnalysis(keysBeingInserted);