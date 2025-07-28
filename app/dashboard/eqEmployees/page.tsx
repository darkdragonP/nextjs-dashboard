import Pagination from '@/app/ui/eqEmployees/pagination';
import Table from '@/app/ui/eqEmployees/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '직원장비관리',
};

export default async function Page(
  prop :{
    searchParams?: Promise<{ 
      query?: string,
      page?: string;
    }>;
  }
) {
  const searchParams = await prop.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>직원장비관리</h1>
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <p className="red inline-block">*</p>
          <p className="red inline-block">검색항목</p>
          <input placeholder='검색어'></input>
          <select>
            <option>-전체-</option>
            <option>-전체-</option>
            <option>-전체-</option>
          </select>
          <div className="inline-block right"> 
            <button className="">검색</button>
          </div>
        </div>
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      <div className="mt-5 flex w-full justify-between">
        <div>
        대여 상세 내역
        </div>
      </div>

    </div>
  );
}