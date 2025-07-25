'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((field: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('query', '1');
    if (field) {
      params.set('query', field);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label className="sr-only" htmlFor="search">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="-translate-y-1/2 absolute top-1/2 left-3 h-[18px] w-[18px] text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
