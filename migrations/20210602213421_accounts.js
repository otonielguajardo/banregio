
exports.up = function (knex) {
	return knex.schema
		.dropTableIfExists("accounts")
		.createTable("accounts", (table) => {
			table.increments('id').primary();
			table.string('client_id');
			table.decimal('amount');
			table.string('status');
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('accounts');
};
