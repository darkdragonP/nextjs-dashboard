'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter }  from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectValue, setSelectValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearch = useDebouncedCallback((term: string, type: string) => {
    console.log("클릭됨");
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    console.log("type", type);
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
   
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    console.log("type", term);

    replace(`${pathname}?${ params.toString()}`);
  }, 300)

  return (
    <> 
      <div className="relative flex">
        조회
      </div>
      <div className="relative flex flex-1 flex-shrink-0 rounded-lg bg-gray-50">
        <div className='relative flex flex-5 flex-shrink-0'>
          <p className="inline-block mt-3 text-red-400 pl-3">*</p>
          <p className="block inline-block outline-2 mt-3 pr-3 pl-1 text-gray-500">검색항목</p>
        </div>
        <div className='relative flex flex-shrink-0 mr-2 mt-1 mb-1'>
          <input
            className="peer block rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder={placeholder}
            onChange={(e) => {setInputValue(e.target.value);}}
            value={inputValue}
            />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        <div className='relative flex flex-1 mt-1 mb-1'>
          <select
              id="typea"
              name="typea"
              className="rounded-md border border-gray-200 text-gray-500 text-sm"
              aria-describedby='typea-error'
              onChange={e => {setSelectValue(e.target.value);}}
              value={selectValue}
              >
            <option id={''}  value={''}>-전체-</option>
            <option id={'S'} value={'S'}>시리얼넘버</option>
            <option id={'S'} value={'M'}>모델명</option>
            <option id={'S'} value={'E'}>사용자명</option>
          </select>
        </div>
        <div className="inline-block right"> 
          <button 
             type="button" 
             className="flex h-10 items-center rounded-lg bg-blue-600 px-4 font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mt-1 mr-1 mb-1"
             onClick={ ()=> { handleSearch(inputValue, selectValue)} } 
          >
            <p className='mr-2 ml-2'>조회 </p>
          </button>
        </div>
      </div>
    </>
  );
}
