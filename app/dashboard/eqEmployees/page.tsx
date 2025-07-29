import Pagination from '@/app/ui/eqEmployees/pagination';
import Table from '@/app/ui/eqEmployees/table';
import Tabpage from '@/app/ui/eqEmployees/tabpage';
import Search from '@/app/ui/eqEmployees/search';
import { EqEmployeesTableSkeleton } from '@/app/ui/skeletons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchEqEmployeesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '직원장비관리',
};

export default async function Page(
  prop :{
    searchParams?: Promise<{ 
      query?: string,
      type?: string;
      page?: string;
    }>;
  }
) {
  const searchParams = await prop.searchParams;
  const query = searchParams?.query || '';
  const type = searchParams?.type || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchEqEmployeesPages(query, type);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>직원장비관리</h1>
      </div>
      <div className="mt-4 justify-between gap-2 md:mt-3">
         <Search placeholder="검색어" />
      </div>
      <Suspense key={query + currentPage} fallback={<EqEmployeesTableSkeleton />}>
        <Table query={query} type={type} currentPage={currentPage}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      <div className="mt-5 flex w-full justify-between">
        <div>
        대여 상세 내역
        </div>
      </div>
      <div className="mt-1 justify-between gap-2 md:mt-3">
        <Tabpage query={query}/>
      </div>
    </div>
  );
}