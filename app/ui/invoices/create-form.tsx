'use client';

import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useActionState } from 'react';
import { createInvoice } from '@/app/lib/actions/invoices/create';
import type { CustomerField } from '@/app/lib/definitions';
import type { State } from '@/app/types/invoices';
import { Button } from '@/app/ui/button';
import { ErrorLabel } from '../error-label';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label className="mb-2 block font-medium text-sm" htmlFor="customer">
            Choose customer
          </label>
          <div className="relative">
            <select
              // aria-describedby="customer-error"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              id="customer"
              name="customerId"
            >
              <option disabled value="">
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] text-gray-500" />
          </div>
          <ErrorLabel state={state} />
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label className="mb-2 block font-medium text-sm" htmlFor="amount">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="amount"
                name="amount"
                placeholder="Enter USD amount"
                // required
                step="0.01"
                type="number"
              />
              <CurrencyDollarIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <ErrorLabel state={state} />
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block font-medium text-sm">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                />
                <label
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 text-xs"
                  htmlFor="pending"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                />
                <label
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 font-medium text-white text-xs"
                  htmlFor="paid"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
            <ErrorLabel state={state} />
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 font-medium text-gray-600 text-sm transition-colors hover:bg-gray-200"
          href="/dashboard/invoices"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
