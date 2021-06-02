
exports.up = function (knex) {

};

exports.down = function (knex) {

};

exports.up = function (knex) {
	return knex.schema
		.dropTableIfExists("payments")
		.createTable("payments", (table) => {
			table.increments('id').primary();
			table.integer('account_id');
			table.string('client_id');
			table.decimal('amount');
			table.decimal('interest');
			table.decimal('tax');
			table.integer('term');
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('payments');
};
