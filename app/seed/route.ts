import { sql } from '../db/connection';
import {
  seedCustomers,
  seedInvoices,
  seedRevenue,
  seedUsers,
} from '../db/utils';

export async function GET() {
  try {
    const _result = await sql.begin((_sql) => [
      seedUsers(sql),
      seedCustomers(sql),
      seedInvoices(sql),
      seedRevenue(sql),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
