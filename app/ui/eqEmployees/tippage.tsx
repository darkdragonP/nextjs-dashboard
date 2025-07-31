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
import store, { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setTokenDataset, setTokenList } from '@/redux/redux';

//redux
const dispatch: AppDispatch = useDispatch();
const tokenList=useSelector((state: RootState)=> state.token.tokenList);
const tokenSet=useSelector((state: RootState)=> state.token.tokenSet);
const aa = [{eq_id:""}];
const updataTokenList = (newTokenlist:any) =>{
  const newTokenlista: postgres.RowList<EqEmployeesField[]> =  newTokenlist;
  const aa = [];
  for(var i=0; newTokenlista.length = i; i++ ) {
    aa.push(newTokenlista[i]);
  }
  if(aa.length == 0) {
    aa.push({eq_id:""})
  }
  dispatch(setTokenList(aa));
}

const updataTokenDataset = (newTokenSet:any) =>{
  dispatch(setTokenDataset(newTokenSet));
}

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
    const [state, setstate] = useState<EqEmployeesField>();

    const asd = (e:any) => {
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
          <Table eqemployees={eqemployees} asd={asd} />
        </Suspense>
        <div>
            대여 상세 내역
        </div>
        <div className="mt-1 flex w-full justify-center">
         <Pagination totalPages={totalPages}/>
        </div>
        <Tabpage query={query} eqemployees={ tokenList }/>
        </div>
      </div>
  );
}

