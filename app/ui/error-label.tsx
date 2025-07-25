import type { State } from '../types/invoices';

export const ErrorLabel = ({ state }: { state: State }) => {
  return (
    <div aria-atomic="true" aria-live="polite" id="customer-error">
      {state.errors?.customerId?.map((error: string) => (
        <p className="mt-2 text-red-500 text-sm" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
};
