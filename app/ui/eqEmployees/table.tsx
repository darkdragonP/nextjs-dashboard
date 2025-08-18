"use client";

import { EqEmployeesField } from "@/app/lib/definitions";
import { RowList } from "postgres";
import { useState } from "react";

export default function EqEmpleyTable( {
  eqemployees,
  testDatafill,
}: {
  eqemployees: RowList<EqEmployeesField[]> | [];
  testDatafill: Function;
}) {
  const [fucus, setFucus] = useState<number>(0);
  const clickEvent = (e: React.MouseEvent<HTMLTableRowElement>) => {
    setFucus(e.currentTarget.rowIndex);
    testDatafill(fucus);
  }

  return (
    <div className="mt-6 flow-root">
      <div>
        대여목록
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {eqemployees?.map((eqemployees) => (
              <div key={eqemployees.seq}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{ eqemployees.seq }</p>
                    <p className="text-sm text-gray-500">{ eqemployees.eq_id }</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{ eqemployees.eq_sn }</p>
                    <p>{ eqemployees.model_nm }</p>
                  </div>
                  <div>
                    <p className="text-xl font-medium">{ eqemployees.model_class }</p>
                    <p>{ eqemployees.emp_id }</p>
                  </div>
                  <div>
                    <p className="text-xl font-medium">{ eqemployees.emp_nm }</p>
                    <p>{ eqemployees.purc_dt }</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-2 py-2 font-medium sm:pl-6">
                  순서
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  장비ID
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  시리얼넘버
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  장비명
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  장비종류
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  소유주ID
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  소유주명
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  구매일
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {eqemployees?.map((eqemployees) => (
                <tr
                  key={eqemployees.seq}
                  className={"w-full border-b px-2 py-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"+(fucus == Number(eqemployees.seq) ? " bg-blue-50" : "")}
                  onClick={e=>{clickEvent(e)}}
                >
                  <td className="whitespace-nowrap px-3 py-2">
                      <p className='text-center'>{ eqemployees.seq }</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                      <p>{ eqemployees.eq_id }</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                      <p>{ eqemployees.eq_sn }</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <p>{ eqemployees.model_nm }</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    { (eqemployees.model_class==='N'?'노트북':eqemployees.model_class==='M'?'모니터':'기타') 
                      + ' ( ' + eqemployees.model_class + ' )'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    { eqemployees.emp_id }
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    { eqemployees.emp_nm }
                  </td>
                  <td className="whitespace-nowrap py-3 py-2 pl-6 pr-3">
                    { eqemployees.purc_dt }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
