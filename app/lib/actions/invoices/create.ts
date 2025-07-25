'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/app/db/connection';
import { FormSchema } from '@/app/types/invoices';

export const CreateInvoice = FormSchema.omit({ id: true, date: true });

// biome-ignore lint/style/noNonNullAssertion: <explanation>

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
