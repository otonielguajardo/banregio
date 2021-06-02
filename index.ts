import { AccountModel, asyncForEach, database, LoanModel, PaymentModel } from './utils';
import moment from 'moment';
const SQL_DATE_FORMAT = 'YYYY-MM-DD H:mm:ss';
const BAN_DATE_FORMAT = 'DD-MMM-YY';

const start = async () => {
    //
    const x_current_date = '15-feb-21';
    const x_interest = 7.5;
    const x_tax = 16;
    const x_commercial_year_days = 360;
    let affected_accounts: Array<number> = [];

    console.log('\x1b[33m%s\x1b[0m', '# Inicialización de Base de Datos completada');

    console.log('\x1b[33m%s\x1b[0m', '# Todas las cuentas');
    let all_accounts: Array<AccountModel> = await database('accounts').select('*');
    console.table(all_accounts);

    // recorrer la tabla de Cuentas de Débito que están Activas
    let accounts: Array<AccountModel> = await database('accounts').select('*').where('status', 'active');

    await asyncForEach(accounts, async (account: AccountModel) => {
        //
        let account_balance = account.amount;

        let loans: Array<LoanModel> = await database('loans')
            .select('*')
            .where('status', 'pending')
            .andWhere('client_id', account.client_id)
            .orderBy('amount', 'desc');

        // realizar el cobro de Pagos con Estado Pendiente de la tabla de Préstamos
        await asyncForEach(loans, async (loan: LoanModel) => {
            //
            let term = moment(x_current_date, BAN_DATE_FORMAT).diff(moment(loan.date, SQL_DATE_FORMAT), 'days');
            let interest = loan.amount * term * (x_interest / x_commercial_year_days);
            let tax = interest * x_tax;
            let loan_amount = loan.amount + interest + tax;

            // Considera que se realiza el cobro solo de los Pagos que se puedan realizar completos, es decir que el saldo en la Cuenta sea mayor al Pago.
            if (account_balance > loan_amount) {
                //
                // Si se aplica el Pago es necesario cambiar el Estado del Préstamo de Pendiente a Pagado
                await database('loans')
                    .update({ status: 'paid' })
                    .where('id', loan.id)
                    .then(async () => {
                        //
                        console.log(
                            `# ${account.id} pagó el préstamo ${loan.id} (${loan.amount.toFixed(
                                2
                            )}) | ${account_balance.toFixed(2)} - ${loan_amount.toFixed(2)} = ${(
                                account_balance - loan_amount
                            ).toFixed(2)}`
                        );

                        account_balance = account_balance - loan_amount;
                        affected_accounts.push(account.id);

                        let payload = {
                            account_id: account.id,
                            client_id: account.client_id,
                            term,
                            amount: loan_amount.toFixed(2),
                            interest: interest.toFixed(2),
                            tax: tax.toFixed(2),
                        };

                        await database('payments').insert(payload);
                    });
            }
        });

        // y en la Cuenta de Débito se debe reducir el Monto descontando el Pago.
        await database('accounts')
            .update({ amount: account_balance.toFixed(2) })
            .where('id', account.id);
    });

    let result_accounts: Array<AccountModel> = await database('accounts').select('*').whereIn('id', affected_accounts);
    let result_payments: Array<PaymentModel> = await database('payments').select('*');

    console.log('\x1b[33m%s\x1b[0m', `# Cuentas afectadas`);
    console.table(result_accounts);

    console.log('\x1b[33m%s\x1b[0m', `# Todos los Pagos`);
    console.table(result_payments);
};

start();
