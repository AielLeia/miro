'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

import { Input } from '@/components/ui/input';

const SearchInput = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue] = useDebounceValue(searchValue, 500);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder={'Search board'}
        onChange={handleChange}
        value={searchValue}
      />
    </div>
  );
};

export default SearchInput;
