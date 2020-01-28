const dateTime = require('date-and-time');
const child_process = require('child_process');

const hostnameAndPort = 'div-cos-aat.service.core-compute-aat.internal';
const startDate = dateTime.parse('2020-01-28', 'YYYY-MM-DD');

const today = new Date();
const status = 'DA';

console.log(`Extracting data from ${dateTime.format(startDate, 'YYYY-MM-DD')} to ${dateTime.format(today, 'YYYY-MM-DD')}`);

// child_process.exec('export http_proxy="http://proxyout.reform.hmcts.net:8080"', (error, stout, sterr) => {
    // if (error) throw error;

    let dateToProcess = startDate;
    while (dateToProcess <= today) {
        const formattedDateToProcess = dateTime.format(dateToProcess, 'YYYY-MM-DD');

        const commandLineToRun = `export http_proxy="http://proxyout.reform.hmcts.net:8080" && curl -k -d '' http://${hostnameAndPort}/cases/data-extraction/family-man/status/${status}/lastModifiedDate/${formattedDateToProcess}`;
        console.log(`command line is: ${commandLineToRun}`);
        child_process.exec(commandLineToRun, (error, stout, sterr) => {
            console.log(error);

            if (error) {
                console.log(`Error for ${formattedDateToProcess}: ${error}`);
            } else {
                console.log(`Success for ${formattedDateToProcess}. Response is: ${stout}`);
            }

        });

        dateToProcess = dateTime.addDays(dateToProcess, 1);
    }

// });