'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { Button } from '@/app/ui/button';
import { lusitana } from '@/app/ui/fonts';
import { authenticate } from '../lib/actions/invoices/auth';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pt-8 pb-4">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mt-5 mb-3 block font-medium text-gray-900 text-xs"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                name="email"
                placeholder="Enter your email address"
                required
                type="email"
              />
              <AtSymbolIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mt-5 mb-3 block font-medium text-gray-900 text-xs"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                minLength={6}
                name="password"
                placeholder="Enter password"
                required
                type="password"
              />
              <KeyIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <input name="redirectTo" type="hidden" value={callbackUrl} />
        <Button aria-disabled={isPending} className="mt-4 w-full">
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          aria-atomic="true"
          aria-live="polite"
          className="flex h-8 items-end space-x-1"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-red-500 text-sm">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
