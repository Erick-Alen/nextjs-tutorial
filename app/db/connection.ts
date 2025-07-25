import postgres from 'postgres';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
export const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
