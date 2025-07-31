import Tibpage from '@/app/ui/eqEmployees/tippage';

import { fetchEqEmployeesPages } from '@/app/lib/data';
import { fetchEqEmployeesSerch } from '@/app/lib/data';
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
  const eqemployees = await fetchEqEmployeesSerch(query, currentPage, type);

  return (
    <main>
        <Tibpage query={query} currentPage={currentPage} totalPages={totalPages} eqemployees={eqemployees}/>
    </main>
  );
}