const dateTime = require('date-and-time');

const today = new Date();
const startDate = dateTime.parse('2019-10-01', 'YYYY-MM-DD');

console.log(dateTime.format(startDate, 'YYYY-MM-DD'));
console.log(dateTime.format(today, 'YYYY-MM-DD'));


let dateToProcess = startDate;
while (dateToProcess <= today){
    const formattedDateToProcess = dateTime.format(dateToProcess, 'YYYY-MM-DD');
    console.log(`Will process ${formattedDateToProcess}`);
    
    dateToProcess = dateTime.addDays(dateToProcess, 1);
}