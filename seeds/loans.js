var moment = require('moment');
moment.locale('es');
const SQL_DATE_FORMAT = 'YYYY-MM-DD H:mm:ss';
const BAN_DATE_FORMAT = 'DD-MMM-YY';

exports.seed = function (knex) {
  // 
  return knex('loans').del()
    .then(function () {
      // 
      return knex('loans').insert([
        { client_id: "00103228", date: moment('10-ene-21', BAN_DATE_FORMAT).format(SQL_DATE_FORMAT), amount: 37500, status: 'pending' },
        { client_id: "00103228", date: moment('19-ene-21', BAN_DATE_FORMAT).format(SQL_DATE_FORMAT), amount: 725.18, status: 'pending' },
        { client_id: "00103228", date: moment('31-ene-21', BAN_DATE_FORMAT).format(SQL_DATE_FORMAT), amount: 1578.22, status: 'pending' },
        { client_id: "00103228", date: moment('04-feb-21', BAN_DATE_FORMAT).format(SQL_DATE_FORMAT), amount: 380, status: 'pending' },

        { client_id: "70099925", date: moment('07-ene-21', BAN_DATE_FORMAT).format(SQL_DATE_FORMAT), amount: 2175.25, status: 'paid' },
        { client_id: "70099925", date: moment('13-ene-21', BAN_DATE_FORMAT).format(SQL_DATE_FORMAT), amount: 499.99, status: 'paid' },
        { client_id: "70099925", date: moment('24-ene-21', BAN_DATE_FORMAT).format(SQL_DATE_FORMAT), amount: 5725.18, status: 'pending' },
        { client_id: "70099925", date: moment('07-feb-21', BAN_DATE_FORMAT).format(SQL_DATE_FORMAT), amount: 876.13, status: 'pending' },

        { client_id: "00298185", date: moment('04-feb-21', BAN_DATE_FORMAT).format(SQL_DATE_FORMAT), amount: 545.55, status: 'pending' },

        { client_id: "15000125", date: moment('31-dic-20', BAN_DATE_FORMAT).format(SQL_DATE_FORMAT), amount: 15220, status: 'paid' },
      ]);
    });
};
