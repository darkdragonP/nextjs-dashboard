import Pagination from '@/app/ui/s-board/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/s-board/table';
//import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { SboardTableSkeleton } from '@/app/ui/skeletons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
//import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'S-Board',
};

export default async function Page(
  prop :{
    searchParams?: Promise<{ 
      query?: string,
      page?: string;
    }>;
  }
) {
  //const searchParams = await prop.searchParams;
  //const query = searchParams?.query || '';
  //const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 1; //await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>S-Board</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
       <Search placeholder="거래내역 조회..." />
        {/*
        <CreateInvoice />
        */}
      </div>
        
      <Suspense  fallback={<SboardTableSkeleton />}>
        {/* key={query + currentPage}
        */}
        <Table query={""} currentPage={1} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}