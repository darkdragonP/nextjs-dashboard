"use client";
import { fetchEqEmployeesSerch } from '@/app/lib/data';

export default function tap2_view({
    query,
    type,
}: {
  query: string;
  type: string;
}) {
  const eqemployees = [{eq_id:"",eq_sn:"",model_id:"",model_nm:"",emp_id:"", model_class:"",emp_nm:"",purc_dt:""}];
  return (
    <div className="inline-block min-w-full align-middle">
      <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
        <div className="md:hidden">
          {eqemployees?.map((eqemployees) => (
            <div key={eqemployees.eq_id}
                 className="mb-2 w-full rounded-md bg-white p-4"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="text-sm text-gray-500">{ eqemployees.eq_id }</p>
                  <p className="text-sm text-gray-500">{ eqemployees.eq_sn }</p>
                </div>
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <div>
                  <p className="text-xl font-medium">{ eqemployees.model_id }</p>
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
                장비ID
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                기록일
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                시리얼넘버
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                모델ID
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                장비운영상세
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                장비사용용도
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                장비소유주
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                구매일
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                파기일
              </th>
              <th scope="col" className="px-3 py-2 font-medium">
                사용여부
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
          {eqemployees?.map((eqemployees) => (
            <tr key={eqemployees.eq_id}
                className="w-full border-b px-2 py-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
              <td className="whitespace-nowrap px-3 py-2">
                <p className='text-center'>{ eqemployees.eq_id }</p>
              </td>
              <td className="whitespace-nowrap px-3 py-2">
                <p>{ eqemployees.eq_sn }</p>
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
  )
}