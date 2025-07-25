'use client';

import { CustomerField, SbordForm } from '@/app/lib/definitions';
import {
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { PiCurrencyKrwFill } from "react-icons/pi";
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateSboard, SboardUState } from '@/app/lib/actions';
import { ChangeEvent, useActionState, useState } from 'react';

export default function EditSboardForm({
  sboard,
  customers,
}: {
  sboard: SbordForm;
  customers: CustomerField[];
}) {
  const initialState: SboardUState = { message: null, errors: {} };
  const updateSboardWithId = updateSboard.bind(null, sboard.id);
  const [state, formAction] = useActionState(updateSboardWithId, initialState);
  const [taaAmt, setTaaAmt] = useState<string>(sboard.tAmt.toLocaleString('ko-KR'));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const confirmed = confirm("수정 하시겠습니까?");
    if (confirmed) e.currentTarget.requestSubmit();
    else e.preventDefault();
  }
  const changeEnteredNum = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    const removedCommaValue: number = Number(value.replaceAll(",", ""));
    setTaaAmt(removedCommaValue.toLocaleString());
 };

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            고객입력
          </label>
          <div className="relative">
            <select
              id="custId"
              name="custId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={sboard.custId}
              disabled= {true}  // Disable selection for editing
            >
              <option value="" disabled>
                고객을 선택하세요.
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="pAmt" className="mb-2 block text-sm font-medium">
            가입금액 입력
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="pAmt"
                name="pAmt"
                type="text"
                step="0"
                maxLength={20} // Limit input length
                defaultValue={sboard.pAmt.toLocaleString('ko-KR')}
                placeholder="가입금액을 입력하세요."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                disabled= {true}  // Disable selection for editing
              />
              <p className="pointer-events-none absolute right-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">원</p>
              <PiCurrencyKrwFill className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tAmt" className="mb-2 block text-sm font-medium">
            지급금액 입력
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="tAmt"
                name="tAmt"
                type="text"
                step="0"
                maxLength={20} // Limit input length
                value={ taaAmt }
                onChange={changeEnteredNum} // Remove commas for processing
                placeholder="가입금액을 입력하세요."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <p className="pointer-events-none absolute right-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">원</p>
              <PiCurrencyKrwFill className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4 md:hidden">
          <label htmlFor="tDate" className="mb-2 block text-sm font-medium">
            지급일
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="tDate"
                name="tDate"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]} // Format date for input
                className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/s-board"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          취소
        </Link>
        <Button type="submit">수정</Button>
      </div>
    </form>
  );
}
