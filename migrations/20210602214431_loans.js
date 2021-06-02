
exports.up = function (knex) {
	return knex.schema
		.dropTableIfExists("loans")
		.createTable("loans", (table) => {
			table.increments('id').primary();
			table.string('client_id');
			table.datetime('date');
			table.decimal('amount');
			table.string('status');
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('loans');
};
