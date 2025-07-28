'use client';

import { CustomerField, ProductsField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CalendarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { PiCurrencyKrwFill } from "react-icons/pi";
import { Button } from '@/app/ui/button';
import { createSboard, SboardState } from '@/app/lib/actions';
import { useActionState , useState } from 'react';


export default function Form({ customers , products }: { customers: CustomerField[] , products: ProductsField[] }) {
  const initialState: SboardState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createSboard, initialState);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSubProduct, setSelectedSubProduct] = useState('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const confirmed = confirm("해당 계약을 생성 하시겠습니까?");
    if (confirmed) e.currentTarget.requestSubmit();
    else e.preventDefault();
  }

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="custId" className="mb-2 block text-sm font-medium">
            고객입력
          </label>
          <div className="relative">
            <select
              id="custId"
              name="custId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby='customer-error'
              required
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
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.custId &&
              state.errors.custId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* 상품 */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
                상품선택
          </label>
        </div>
        <div className="flex gap-2">
          <div className="mb-4 w-1/2">
            <label htmlFor="product_id" className="mb-2 block text-sm font-medium">
              상품분류
            </label>
            <div className='relative flex items-center'>
              <select
                id="product_id"
                name="product_id"
                className="peer block cursor-pointer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby='customer-error'
                onChange={e => {setSelectedProduct(e.target.value); setSelectedSubProduct("");}}
                required
              >
                <option value="" disabled>
                  상품 분류를 선택하세요.
                </option>
                {products.map((product, i, arr) => (
                  i === 0 ? (
                    <option key={product.product_id} value={product.product_id}>
                      {product.product_name}
                    </option>
                  ) : 
                  product.product_id !== arr[i-1].product_id ? (
                    <option key={product.product_id} value={product.product_id}>
                      {product.product_name}
                    </option>
                  ) : null
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="mb-4 w-1/2">
            <label htmlFor="product_subid" className="mb-2 block text-sm font-medium">
              상품명
            </label>
            <div className='relative flex items-center'>
              <select
                id="product_subid"
                name="product_subid"
                className="peer block cursor-pointer w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby='product_subid-error'
                onChange={e => setSelectedSubProduct(e.target.value)}
                value={selectedSubProduct}
                required
              >
                <option value="" disabled>
                  상품을 선택하세요.
                </option>
                {products.map((product) => (
                  selectedProduct === '' ? null : //선택한것이 없다면 셀렉트박스 비움
                  product.product_id === selectedProduct ? (
                    <option key={product.product_subid} value={product.product_subid}>
                      {product.product_subname}
                    </option>
                  ) : null
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="product_subid-error" aria-live="polite" aria-atomic="true">
            {state.errors?.product_subid &&
              state.errors.product_subid.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* 일자 */}
        <div className="flex gap-2">
          <div className="mb-4 w-1/2">
            <label htmlFor="pDate" className="mb-2 block text-sm font-medium">
              가입일
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="pDate"
                  name="pDate"
                  type="date"
                  className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue={new Date().toISOString().split('T')[0]} // Set today's date as default
                  required
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <div className="mb-4 w-1/2">
            <label htmlFor="tDate" className="mb-2 block text-sm font-medium">
              지급일
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="tDate"
                  name="tDate"
                  type="date"
                  className="peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
        </div>

        {/* 금액*/}
        <div className="mb-4">
          <label htmlFor="pAmt" className="mb-2 block text-sm font-medium">
            가입 금액입력
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="pAmt"
                name="pAmt"
                type="number"
                step="0"
                defaultValue="0"
                placeholder="금액을 입력하세요."
                onClick={(e) => e.currentTarget.select()} // Select input value on click
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <p className="pointer-events-none absolute right-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">원</p>
              <PiCurrencyKrwFill className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="tAmt" className="mb-2 block text-sm font-medium">
            지급 금액입력
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="tAmt"
                name="tAmt"
                type="number"
                step="0"
                defaultValue="0"
                placeholder="금액을 입력하세요."
                onClick={(e) => e.currentTarget.select()} // Select input value on click
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <p className="pointer-events-none absolute right-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900">원</p>
              <PiCurrencyKrwFill className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
        <Button type="submit">생성</Button>
      </div>
    </form>
  );
}
