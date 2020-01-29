const dateTime = require('date-and-time');
const child_process = require('child_process');

const argv = require('yargs')
    .usage('Usage: node $0 --startDate 2019-10-01')
    .option('startDate', {
        describe: 'Start date for data extraction (e.g. 2019-10-01)',
        demandOption: true
    })
    .option('environment', {
        default: 'aat'
    })
    .help()
    .version(false)
    .argv;

const startDate = dateTime.parse(argv.startDate, 'YYYY-MM-DD');
const today = new Date();
const status = 'DA';

const environment = argv.environment;
const hostnameAndPort = getHostnameAndPortPerEnvironment(environment);
console.log(`Extracting data from ${dateTime.format(startDate, 'YYYY-MM-DD')} to ${dateTime.format(today, 'YYYY-MM-DD')} for ${environment} environment...`);

let dateToProcess = startDate;
while (dateToProcess <= today) {
    const formattedDateToProcess = dateTime.format(dateToProcess, 'YYYY-MM-DD');

    const commandLineToRun = `export http_proxy="http://proxyout.reform.hmcts.net:8080" && curl -k -d '' http://${hostnameAndPort}/cases/data-extraction/family-man/status/${status}/lastModifiedDate/${formattedDateToProcess}`;
    child_process.exec(commandLineToRun, (error, stout, sterr) => {
        if (error) {
            console.log(`Error for ${formattedDateToProcess}: ${error}`);
        } else {
            console.log(`Success for ${formattedDateToProcess}.`);
        }
    });

    dateToProcess = dateTime.addDays(dateToProcess, 1);
}

function getHostnameAndPortPerEnvironment(environment) {
    if (environment === 'aat') {
        return 'div-cos-aat.service.core-compute-aat.internal';
    } else if (environment === 'prod') {
        return 'div-cos-prod.service.core-compute-prod.internal';
    } else {
        throw new Error(`Unsupported environment ${environment}`);
    }
}