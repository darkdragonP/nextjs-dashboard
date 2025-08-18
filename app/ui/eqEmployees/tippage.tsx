"use client";

import Table from '@/app/ui/eqEmployees/table';
import Search from '@/app/ui/eqEmployees/search';
import Pagination from '@/app/ui/eqEmployees/pagination';
import Tabpage from '@/app/ui/eqEmployees/tabpage';
import { EqEmployeesTableSkeleton } from '@/app/ui/skeletons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense, useState } from 'react';
import { EqEmployeesField } from '@/app/lib/definitions';
import postgres from 'postgres';
import store from '@/redux/store';

export default function Page({
    query,
    currentPage,
    totalPages,
    eqemployees,
  } : {
    query:string;
    currentPage:number;
    totalPages:number;
    eqemployees:postgres.RowList<EqEmployeesField[]>;
  }
) {
    const [state, setstate] = useState<EqEmployeesField>({seq :"",
                                                        eq_id : "",
                                                        eq_sn :"",
                                                        manu_nm :"",
                                                        model_id :"",
                                                        model_nm :"",
                                                        model_class :"",
                                                        model_spec:"",
                                                        eq_state:"",
                                                        eq_state_detail:"",
                                                        eq_use:"",
                                                        emp_id :"",
                                                        emp_nm :"",
                                                        purc_dt :"",
                                                        dest_dt:"",});

    const testDatafill = (e:any) => {
        setstate( eqemployees[e] );
        console.log("동작함", store.getState())
    }

  return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>직원장비관리</h1>
        </div>
        <div className="mt-4 items-center justify-between gap-2 md:mt-3">
          <Search placeholder="검색어" />
        </div>
        <div className="mtx-6 grid grid-cols-1 gap-6">
        <Suspense key={query + currentPage} fallback={<EqEmployeesTableSkeleton />}>
          <Table eqemployees={eqemployees} testDatafill={testDatafill} />
        </Suspense>
        <div>
            대여 상세 내역
        </div>
        <div className="mt-1 flex w-full justify-center">
         <Pagination totalPages={totalPages}/>
        </div>
        <Tabpage query={query} eqemployees={ state }/>
        </div>
      </div>
  );
}

