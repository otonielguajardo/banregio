
exports.seed = function (knex) {
  //
  return knex('accounts').del()
    .then(function () {
      //
      return knex('accounts').insert([
        { client_id: '00103228', amount: 15375.28, status: 'active' },
        { client_id: '70099925', amount: 3728.51, status: 'blocked' },
        { client_id: '00298185', amount: 0, status: 'cancelled' },
        { client_id: '15000125', amount: 235.28, status: 'active' },
      ]);
    });
};
