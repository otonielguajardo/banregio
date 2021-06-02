import { AccountModel, asyncForEach, database, LoanModel, PaymentModel } from './utils';
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const start = async () => {
    let current_date = '15-feb-21';

    rl.question('Fecha (en formato 15-feb-21)', (response) => {
        console.log(response);
    });
    rl.close();

    console.log('helo');
    const hello = true;
    if (hello) return false;

    // recorrer la tabla de Cuentas de Débito que están Activas
    let accounts: Array<AccountModel> = await database('accounts').select('*').where('status', 'active');

    await asyncForEach(accounts, async (account: AccountModel) => {
        //
        let amount = account.amount;

        let loans: Array<LoanModel> = await database('loans')
            .select('*')
            .where('status', 'pending')
            .andWhere('client_id', account.client_id)
            .orderBy('amount', 'desc');

        // realizar el cobro de Pagos con Estado Pendiente de la tabla de Préstamos
        await asyncForEach(loans, async (loan: LoanModel) => {
            //
            // Considera que se realiza el cobro solo de los Pagos que se puedan realizar completos, es decir que el saldo en la Cuenta sea mayor al Pago.
            if (amount > loan.amount) {
                //
                // Si se aplica el Pago es necesario cambiar el Estado del Préstamo de Pendiente a Pagado
                await database('loans')
                    .update({ status: 'paid' })
                    .where('id', loan.id)
                    .then(async () => {
                        //
                        amount = amount - loan.amount;

                        let payload: PaymentModel = {
                            account_id: account.id,
                            term: '',
                            amount: 0,
                            interest: 0,
                            tax: 0,
                        };

                        database('payments').insert(payload);
                    });
            }
        });

        // y en la Cuenta de Débito se debe reducir el Monto descontando el Pago.
        await database('accounts').update({ amount }).where('id', account.id);
    });
};

start();
