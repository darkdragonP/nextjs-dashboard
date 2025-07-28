"use client";

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteSboard } from '@/app/lib/actions';
import { useActionState } from "react";

export function CreateSboard() {
  return (
    <Link
      href="/dashboard/s-board/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">보증생성</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateSboard({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/s-board/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteSboard({ id }: { id: string }) {
  const deletedSboard = deleteSboard.bind(null, id) ;
  const [state, formAction, isPending] = useActionState(
    deletedSboard ,
    null
  );
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const confirmed = confirm("정말로 삭제하시겠습니까?");
    if (confirmed) e.currentTarget.requestSubmit();
    else e.preventDefault();
  }
  
  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100" >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
