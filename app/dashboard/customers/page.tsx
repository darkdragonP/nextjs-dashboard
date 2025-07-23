import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page( prop :{
    searchParams?: Promise<{ 
      query?: string,
    }>;
  }) {

  const searchParams = await prop.searchParams;
  const query = searchParams?.query || '';
  const formattedCustomersTable = await fetchFilteredCustomers(query);
  
  return (
      <div className="w-full">
        <Suspense key={query}>
          <Table customers={ formattedCustomersTable } />
        </Suspense>
      </div>
    );
}