
exports.seed = function (knex) {
  //
  return knex('payments').del();
};
