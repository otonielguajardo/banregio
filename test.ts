import moment from 'moment';
moment.locale('es');
const BAN_DATE_FORMAT = 'DD-MMM-YY';
const SQL_DATE_FORMAT = 'YYYY-MM-DD H:mm:ss';

let date = moment('31-ene-21', BAN_DATE_FORMAT);

console.log(date);
console.log(date.format(SQL_DATE_FORMAT));

let term = moment('5-ene-21', BAN_DATE_FORMAT).diff(moment('2021-01-31 0:00:00', SQL_DATE_FORMAT), 'days');

console.log(term);
