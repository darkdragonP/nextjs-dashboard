import { UpdateSboard, DeleteSboard } from '@/app/ui/s-board/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchSgciserch } from '@/app/lib/data';

export default async function SboardTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const sgciserchs = await fetchSgciserch(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {sgciserchs?.map((sgciserch) => (
              <div key={sgciserch.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{sgciserch.product_subname}</p>
                    <p className="text-sm text-gray-500">{sgciserch.name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(sgciserch.pAmt, 'ko-KR')}
                    </p>
                    <p>{formatDateToLocal(sgciserch.pDate)}</p>
                  </div>
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(sgciserch.tAmt, 'ko-KR')}
                    </p>
                    <p>{formatDateToLocal(sgciserch.tDate)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateSboard id={sgciserch.id} />
                    <DeleteSboard id={sgciserch.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  상품명
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  고객명
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  가입금액
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  가입일
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  지급금액
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  지급일
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sgciserchs?.map((sgciserch) => (
                <tr
                  key={sgciserch.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                      <p>{sgciserch.product_subname}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                      <p>{sgciserch.name}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(sgciserch.pAmt, 'ko-KR')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(sgciserch.pDate, 'ko-KR')}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(sgciserch.tAmt, 'ko-KR')}
                  </td>
                   <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(sgciserch.tDate, 'ko-KR')}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSboard id={sgciserch.id} />
                      <DeleteSboard id={sgciserch.id} />
                    </div>
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
