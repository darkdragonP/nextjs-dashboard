"use client";

import { EqEmployeesField } from '@/app/lib/definitions';

export default function tap1_view({
  eqemployees,
}: {
  eqemployees:EqEmployeesField;
}) {
    console.log('eqemployeetap1' ,eqemployees)
    
  return (
    <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
        <tr>
            <th scope="col" className="px-2 py-2 font-medium sm:pl-6"></th>
            <th scope="col" className="px-3 py-2 font-medium"></th>
            <th scope="col" className="px-3 py-2 font-medium"></th>
            <th scope="col" className="px-3 py-2 font-medium"></th>
            <th scope="col" className="px-3 py-2 font-medium"></th>
            <th scope="col" className="px-3 py-2 font-medium"></th>
        </tr>
        </thead>
        <tbody className="bg-white">
            <tr
            className="w-full border-b px-2 py-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
                <td className="whitespace-nowrap px-3 py-2 bg-gray-50">
                    <p>장비ID</p>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                    <input 
                        className='bg-gray-100 rounded-md border-gray-200' 
                        defaultValue={ eqemployees.eq_id } 
                        readOnly
                    />
                </td>
                <td className="whitespace-nowrap px-3 py-2 bg-gray-50">
                    <p>장비SN</p>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                    <input 
                        className='bg-gray-100 rounded-md border-gray-200' 
                        defaultValue={ eqemployees.eq_sn }
                        readOnly
                    />
                </td>
                <td className="whitespace-nowrap px-3 py-2 bg-gray-50">
                    <p>장비 사용 직원</p>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                    <input 
                        className='bg-gray-100 rounded-md border-gray-200' 
                        defaultValue={ eqemployees.emp_nm }
                        readOnly 
                    />
                </td>
            </tr>
            <tr
            className="w-full border-b px-2 py-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
                <td className="whitespace-nowrap px-3 py-2 bg-gray-50">
                    <p>장비 운용 상태</p>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                    <input 
                        className='bg-gray-100 rounded-md border-gray-200' 
                        defaultValue={ eqemployees.eq_state }
                        readOnly 
                    />
                </td>
                <td className="whitespace-nowrap px-3 py-2 bg-gray-50">
                    <p>장비 운용 세부 상태</p>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                    <input 
                        className='bg-gray-100 rounded-md border-gray-200' 
                        defaultValue={ eqemployees.eq_state_detail }
                        readOnly
                    />
                </td>
                <td className="whitespace-nowrap px-3 py-2 bg-gray-50">
                    <p>장비 사용 용도</p>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                    <input 
                        className='bg-gray-100 rounded-md border-gray-200' 
                        defaultValue={eqemployees.eq_use}
                        readOnly
                    />
                </td>
            </tr>
            <tr
            className="w-full border-b px-2 py-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
                <td className="whitespace-nowrap px-3 py-2 bg-gray-50">
                    <p>장비 구매 일자</p>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                <input
                    id="pDate"
                    name="pDate"
                    type="date"
                    className="peer block rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500 bg-gray-100"
                    defaultValue={ eqemployees.dest_dt }
                />
                </td>
                <td className="whitespace-nowrap px-3 py-2 bg-gray-50">
                    <p>장비 파기 일자</p>
                </td>
                <td colSpan={3} className="whitespace-nowrap px-3 py-2">
                    <input
                    id="pDate"
                    name="pDate"
                    type="date"
                    className="peer block rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500 bg-gray-100"
                    defaultValue={ eqemployees.purc_dt }
                />
                </td>
            </tr>
            <tr
            className="w-full border-b px-2 py-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
                <td className="whitespace-nowrap px-3 py-2 border bg-gray-50">
                    <p>모델 정보</p>
                </td>
                <td className="whitespace-nowrap px-3 py-2 border">
                    <input 
                        className='bg-gray-100 rounded-md border-gray-200'
                        defaultValue={ eqemployees.model_id }
                    />
                </td>
                <td className="whitespace-nowrap px-3 py-2 bg-gray-50">
                    <p>장비 종류</p>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                    <input 
                        className='bg-gray-100 rounded-md border-gray-200'
                        defaultValue={ eqemployees.model_class }
                    />
                </td>
                <td className="whitespace-nowrap px-3 py-2 bg-gray-50">
                    <p>제조사 명</p>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                    <input 
                        className='bg-gray-100 rounded-md border-gray-200' 
                        defaultValue={ eqemployees.model_nm }
                    />
                </td>
            </tr>
            <tr
            className="w-full border-b px-2 py-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
            >
            <td className="whitespace-nowrap px-3 py-2 bg-gray-50">
                <p>상세 스펙</p>
            </td>
            <td colSpan={5} className="whitespace-nowrap px-3 py-2">
                <textarea 
                    cols={112} 
                    rows={5} 
                    className='bg-gray-100 rounded-md border-gray-200'
                    defaultValue={ eqemployees.model_spec }
                />
            </td>
            </tr>
        </tbody>
    </table>
  )
}
