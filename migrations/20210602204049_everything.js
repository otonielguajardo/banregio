
exports.up = function (knex) {
	return knex.schema
		.createTable("accounts", (table) => {
			table.increments('id').primary();
			table.string('client_id');
			table.decimal('amount');
			table.string('status');
		})
		.createTable("loans", (table) => {
			table.increments('id').primary();
			table.string('client_id');
			table.dateTime('date');
			table.decimal('amount');
			table.string('status');
		});
};

exports.down = function (knex) {
	return knex.schema.dropTable('accounts').dropTable('loans')
};
